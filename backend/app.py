#!/usr/bin/env python
# -*- coding: utf-8 -*-

from flask import Flask, request, jsonify
from flask_cors import CORS
from cassandra.cluster import Cluster
import jwt
import datetime
import json
import os
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Secret key for JWT
SECRET_KEY = "your-secret-key"  # In production, use an environment variable

# Connect to Cassandra
try:
    # Update these parameters based on your Cassandra setup
    cluster = Cluster(['127.0.0.1'])
    session = cluster.connect('music_recommendation')
    logger.info("Connected to Cassandra successfully")
except Exception as e:
    logger.error("Could not connect to Cassandra: %s", str(e))

# JWT token required decorator
def token_required(f):
    def decorated(*args, **kwargs):
        token = None
        auth_header = request.headers.get('Authorization')
        
        if auth_header and auth_header.startswith('Bearer '):
            token = auth_header.split(' ')[1]
            
        if not token:
            return jsonify({'message': 'Token is missing!'}), 401
            
        try:
            data = jwt.decode(token, SECRET_KEY)
            # Get user from Cassandra
            user_rows = session.execute("SELECT * FROM users WHERE id = %s", [data['user_id']])
            current_user = user_rows.one()
            if not current_user:
                return jsonify({'message': 'User not found!'}), 401
        except:
            return jsonify({'message': 'Token is invalid!'}), 401
            
        return f(current_user, *args, **kwargs)
    
    return decorated

# Routes
@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')  # In production, hash this password
    
    if not username or not email or not password:
        return jsonify({'message': 'Missing required fields!'}), 400
    
    # Check if user already exists
    existing_user = session.execute("SELECT * FROM users WHERE email = %s ALLOW FILTERING", [email]).one()
    if existing_user:
        return jsonify({'message': 'User already exists!'}), 409
    
    # Create user in Cassandra
    try:
        import uuid
        user_id = str(uuid.uuid4())
        session.execute(
            """
            INSERT INTO users (id, username, email, password)
            VALUES (%s, %s, %s, %s)
            """,
            (user_id, username, email, password)  # In production, hash the password
        )
        
        # Create token
        token = jwt.encode({
            'user_id': user_id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(days=30)
        }, SECRET_KEY)
        
        return jsonify({
            'message': 'User registered successfully!',
            'token': token,
            'user': {
                'id': user_id,
                'username': username,
                'email': email
            }
        }), 201
    except Exception as e:
        logger.error("Error creating user: %s", str(e))
        return jsonify({'message': 'Error creating user!'}), 500

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    
    email = data.get('email')
    password = data.get('password')
    
    if not email or not password:
        return jsonify({'message': 'Missing email or password!'}), 400
    
    # Verify user credentials
    user_rows = session.execute("SELECT * FROM users WHERE email = %s ALLOW FILTERING", [email])
    user = user_rows.one()
    
    if not user or user.password != password:  # In production, verify hashed password
        return jsonify({'message': 'Invalid credentials!'}), 401
    
    # Create token
    token = jwt.encode({
        'user_id': user.id,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(days=30)
    }, SECRET_KEY)
    
    return jsonify({
        'token': token,
        'user': {
            'id': user.id,
            'username': user.username,
            'email': user.email
        }
    }), 200

@app.route('/api/popular_songs', methods=['GET'])
def get_popular_songs():
    try:
        # Query the most popular songs from Cassandra
        rows = session.execute("SELECT * FROM songs ORDER BY popularity DESC LIMIT 10")
        songs = []
        
        for row in rows:
            songs.append({
                'id': str(row.id),
                'title': row.title,
                'artist': row.artist,
                'album': row.album,
                'cover_image': row.cover_image,
                'duration': row.duration
            })
        
        return jsonify(songs), 200
    except Exception as e:
        logger.error("Error fetching popular songs: %s", str(e))
        return jsonify({'message': 'Error fetching songs!'}), 500

@app.route('/api/recommendations', methods=['GET'])
@token_required
def get_recommendations(current_user):
    try:
        # Get user preferences from Cassandra
        preference_rows = session.execute(
            "SELECT genre FROM user_preferences WHERE user_id = %s", 
            [current_user.id]
        )
        
        genres = [row.genre for row in preference_rows]
        
        # Get song recommendations based on user preferences
        songs = []
        
        if genres:
            placeholders = ', '.join(['%s'] * len(genres))
            query = "SELECT * FROM songs WHERE genre IN ({}) LIMIT 10".format(placeholders)
            rows = session.execute(query, genres)
            
            for row in rows:
                songs.append({
                    'id': str(row.id),
                    'title': row.title,
                    'artist': row.artist,
                    'album': row.album,
                    'cover_image': row.cover_image,
                    'duration': row.duration
                })
        else:
            # If no preferences, return popular songs
            rows = session.execute("SELECT * FROM songs ORDER BY popularity DESC LIMIT 10")
            
            for row in rows:
                songs.append({
                    'id': str(row.id),
                    'title': row.title,
                    'artist': row.artist,
                    'album': row.album,
                    'cover_image': row.cover_image,
                    'duration': row.duration
                })
        
        return jsonify(songs), 200
    except Exception as e:
        logger.error("Error fetching recommendations: %s", str(e))
        return jsonify({'message': 'Error fetching recommendations!'}), 500

@app.route('/api/user/preferences', methods=['GET', 'PUT'])
@token_required
def user_preferences(current_user):
    if request.method == 'GET':
        try:
            # Get user preferences from Cassandra
            preference_rows = session.execute(
                "SELECT genre FROM user_preferences WHERE user_id = %s", 
                [current_user.id]
            )
            
            genres = [row.genre for row in preference_rows]
            return jsonify({'genres': genres}), 200
        except Exception as e:
            logger.error("Error fetching user preferences: %s", str(e))
            return jsonify({'message': 'Error fetching preferences!'}), 500
    
    elif request.method == 'PUT':
        data = request.get_json()
        genres = data.get('genres', [])
        
        try:
            # Delete existing preferences
            session.execute(
                "DELETE FROM user_preferences WHERE user_id = %s", 
                [current_user.id]
            )
            
            # Insert new preferences
            for genre in genres:
                session.execute(
                    "INSERT INTO user_preferences (user_id, genre) VALUES (%s, %s)",
                    (current_user.id, genre)
                )
            
            return jsonify({'message': 'Preferences updated successfully!'}), 200
        except Exception as e:
            logger.error("Error updating user preferences: %s", str(e))
            return jsonify({'message': 'Error updating preferences!'}), 500

@app.route('/api/search', methods=['GET'])
def search():
    query = request.args.get('q', '')
    
    if not query:
        return jsonify({'message': 'Search query is required!'}), 400
    
    try:
        # Search for songs in Cassandra (basic implementation)
        # In a real system, you might want to use a search engine like Elasticsearch
        rows = session.execute(
            "SELECT * FROM songs WHERE title LIKE %s OR artist LIKE %s OR album LIKE %s ALLOW FILTERING",
            ['%' + query + '%', '%' + query + '%', '%' + query + '%']
        )
        
        songs = []
        for row in rows:
            songs.append({
                'id': str(row.id),
                'title': row.title,
                'artist': row.artist,
                'album': row.album,
                'cover_image': row.cover_image,
                'duration': row.duration
            })
        
        return jsonify(songs), 200
    except Exception as e:
        logger.error("Error searching songs: %s", str(e))
        return jsonify({'message': 'Error searching songs!'}), 500

@app.route('/api/favorites', methods=['GET', 'POST', 'DELETE'])
@token_required
def favorites(current_user):
    if request.method == 'GET':
        try:
            # Get user's favorite songs from Cassandra
            rows = session.execute(
                "SELECT song_id FROM favorites WHERE user_id = %s", 
                [current_user.id]
            )
            
            song_ids = [row.song_id for row in rows]
            songs = []
            
            for song_id in song_ids:
                song_row = session.execute(
                    "SELECT * FROM songs WHERE id = %s", 
                    [song_id]
                ).one()
                
                if song_row:
                    songs.append({
                        'id': str(song_row.id),
                        'title': song_row.title,
                        'artist': song_row.artist,
                        'album': song_row.album,
                        'cover_image': song_row.cover_image,
                        'duration': song_row.duration
                    })
            
            return jsonify(songs), 200
        except Exception as e:
            logger.error("Error fetching favorites: %s", str(e))
            return jsonify({'message': 'Error fetching favorites!'}), 500
    
    elif request.method == 'POST':
        data = request.get_json()
        song_id = data.get('song_id')
        
        if not song_id:
            return jsonify({'message': 'Song ID is required!'}), 400
        
        try:
            # Add song to favorites
            session.execute(
                "INSERT INTO favorites (user_id, song_id) VALUES (%s, %s)",
                (current_user.id, song_id)
            )
            
            return jsonify({'message': 'Song added to favorites!'}), 201
        except Exception as e:
            logger.error("Error adding to favorites: %s", str(e))
            return jsonify({'message': 'Error adding to favorites!'}), 500
    
    elif request.method == 'DELETE':
        data = request.get_json()
        song_id = data.get('song_id')
        
        if not song_id:
            return jsonify({'message': 'Song ID is required!'}), 400
        
        try:
            # Remove song from favorites
            session.execute(
                "DELETE FROM favorites WHERE user_id = %s AND song_id = %s",
                (current_user.id, song_id)
            )
            
            return jsonify({'message': 'Song removed from favorites!'}), 200
        except Exception as e:
            logger.error("Error removing from favorites: %s", str(e))
            return jsonify({'message': 'Error removing from favorites!'}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)