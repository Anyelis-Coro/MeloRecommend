-- Cassandra Schema for Music Recommendation System

-- Create keyspace
CREATE KEYSPACE IF NOT EXISTS music_recommendation
WITH REPLICATION = { 'class' : 'SimpleStrategy', 'replication_factor' : 1 };

USE music_recommendation;

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id uuid PRIMARY KEY,
    username text,
    email text,
    password text, -- In production, store hashed passwords
    created_at timestamp DEFAULT toTimestamp(now())
);

-- Create index on email for login queries
CREATE INDEX IF NOT EXISTS ON users (email);

-- Songs table
CREATE TABLE IF NOT EXISTS songs (
    id uuid PRIMARY KEY,
    title text,
    artist text,
    album text,
    genre text,
    duration text,
    release_year int,
    cover_image text,
    popularity int,
    created_at timestamp DEFAULT toTimestamp(now())
);

-- Create indices for common queries
CREATE INDEX IF NOT EXISTS ON songs (artist);
CREATE INDEX IF NOT EXISTS ON songs (genre);
CREATE INDEX IF NOT EXISTS ON songs (popularity);

-- User preferences table (for genre preferences)
CREATE TABLE IF NOT EXISTS user_preferences (
    user_id uuid,
    genre text,
    PRIMARY KEY (user_id, genre)
);

-- User favorites table
CREATE TABLE IF NOT EXISTS favorites (
    user_id uuid,
    song_id uuid,
    added_at timestamp DEFAULT toTimestamp(now()),
    PRIMARY KEY (user_id, song_id)
);

-- User listening history
CREATE TABLE IF NOT EXISTS listening_history (
    user_id uuid,
    song_id uuid,
    listened_at timestamp,
    PRIMARY KEY ((user_id), listened_at, song_id)
) WITH CLUSTERING ORDER BY (listened_at DESC);

-- Playlists table
CREATE TABLE IF NOT EXISTS playlists (
    id uuid,
    user_id uuid,
    name text,
    created_at timestamp DEFAULT toTimestamp(now()),
    PRIMARY KEY (id)
);

-- Playlist songs
CREATE TABLE IF NOT EXISTS playlist_songs (
    playlist_id uuid,
    song_id uuid,
    added_at timestamp DEFAULT toTimestamp(now()),
    PRIMARY KEY (playlist_id, song_id)
);

-- Sample data for testing
INSERT INTO songs (id, title, artist, album, genre, duration, release_year, cover_image, popularity)
VALUES (uuid(), 'Blinding Lights', 'The Weeknd', 'After Hours', 'Pop', '3:20', 2020, 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg', 100);

INSERT INTO songs (id, title, artist, album, genre, duration, release_year, cover_image, popularity)
VALUES (uuid(), 'Shape of You', 'Ed Sheeran', '÷ (Divide)', 'Pop', '3:53', 2017, 'https://images.pexels.com/photos/1389429/pexels-photo-1389429.jpeg', 95);

INSERT INTO songs (id, title, artist, album, genre, duration, release_year, cover_image, popularity)
VALUES (uuid(), 'Dance Monkey', 'Tones and I', 'The Kids Are Coming', 'Pop', '3:29', 2019, 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg', 90);

INSERT INTO songs (id, title, artist, album, genre, duration, release_year, cover_image, popularity)
VALUES (uuid(), 'Watermelon Sugar', 'Harry Styles', 'Fine Line', 'Pop', '2:54', 2019, 'https://images.pexels.com/photos/1699161/pexels-photo-1699161.jpeg', 85);

INSERT INTO songs (id, title, artist, album, genre, duration, release_year, cover_image, popularity)
VALUES (uuid(), 'Bohemian Rhapsody', 'Queen', 'A Night at the Opera', 'Rock', '5:55', 1975, 'https://images.pexels.com/photos/167092/pexels-photo-167092.jpeg', 99);

INSERT INTO songs (id, title, artist, album, genre, duration, release_year, cover_image, popularity)
VALUES (uuid(), 'Dreams', 'Fleetwood Mac', 'Rumours', 'Rock', '4:14', 1977, 'https://images.pexels.com/photos/96380/pexels-photo-96380.jpeg', 97);

INSERT INTO songs (id, title, artist, album, genre, duration, release_year, cover_image, popularity)
VALUES (uuid(), 'Billie Jean', 'Michael Jackson', 'Thriller', 'Pop', '4:54', 1982, 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg', 98);

INSERT INTO songs (id, title, artist, album, genre, duration, release_year, cover_image, popularity)
VALUES (uuid(), 'Smells Like Teen Spirit', 'Nirvana', 'Nevermind', 'Rock', '5:01', 1991, 'https://images.pexels.com/photos/7148384/pexels-photo-7148384.jpeg', 96);