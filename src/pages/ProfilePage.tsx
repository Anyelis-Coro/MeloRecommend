import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Music, Edit2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import SongList from '../components/music/SongList';


const favoriteGenres = ['Pop', 'Rock', 'Electronic', 'Hip Hop', 'R&B'];

const favoriteSongs = [
  {
    id: '1',
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    album: 'After Hours',
    duration: '3:20',
    isFavorite: true,
  },
  {
    id: '2',
    title: 'Shape of You',
    artist: 'Ed Sheeran',
    album: '÷ (Divide)',
    duration: '3:53',
    isFavorite: true,
  },
  {
    id: '5',
    title: 'Bohemian Rhapsody',
    artist: 'Queen',
    album: 'A Night at the Opera',
    duration: '5:55',
    isFavorite: true,
  },
];

const ProfilePage: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState<string[]>(favoriteGenres);
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handlePlaySong = (id: string) => {
    console.log(`Reproduciendo canción con id: ${id}`);
   
  };

  const handleFavoriteSong = (id: string) => {
    console.log(`Alternando favorito para canción con id: ${id}`);
   
  };

  const handleGenreToggle = (genre: string) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter(g => g !== genre));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  const handleSavePreferences = () => {
    
    console.log('Guardando preferencias:', selectedGenres);
    setIsEditing(false);
  };

  if (!user) {
    return null; // Redirigirá debido al useEffect
  }

  return (
    <div className="max-w-4xl mx-auto fade-in">
      {/* Encabezado del Perfil */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-10">
        <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center">
          <User size={48} className="text-primary" />
        </div>
        
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-2xl font-bold mb-2">{user.username}</h1>
          <p className="text-text-secondary mb-4">{user.email}</p>
          
          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="btn-secondary flex items-center gap-2"
            >
              <Edit2 size={16} />
              {isEditing ? 'Cancelar edición' : 'Editar preferencias'}
            </button>
            
            <button onClick={logout} className="btn-secondary">
              Cerrar sesión
            </button>
          </div>
        </div>
      </div>

      {/* Preferencias musicales */}
      <div className="card mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Music size={20} className="text-primary" />
          <h2 className="text-xl font-bold">Preferencias musicales</h2>
        </div>
        
        {isEditing ? (
          <div>
            <p className="mb-4 text-text-secondary">Selecciona tus géneros favoritos para mejorar las recomendaciones:</p>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mb-6">
              {['Pop', 'Rock', 'Hip Hop', 'R&B', 'Electronic', 'Jazz', 'Classical', 'Country', 'Folk', 'Metal', 'Indie', 'Blues'].map((genre) => (
                <label 
                  key={genre}
                  className={`flex items-center p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedGenres.includes(genre) 
                      ? 'border-primary bg-primary/10' 
                      : 'border-gray-700 hover:border-gray-600'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedGenres.includes(genre)}
                    onChange={() => handleGenreToggle(genre)}
                    className="sr-only"
                  />
                  <span>{genre}</span>
                </label>
              ))}
            </div>
            
            <button onClick={handleSavePreferences} className="btn-primary">
              Guardar preferencias
            </button>
          </div>
        ) : (
          <div>
            <p className="mb-2 text-text-secondary">Géneros favoritos:</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedGenres.map((genre) => (
                <span key={genre} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                  {genre}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Canciones favoritas */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Canciones favoritas</h2>
        </div>
        
        <SongList 
          songs={favoriteSongs}
          onPlay={handlePlaySong}
          onFavorite={handleFavoriteSong}
        />
      </div>
    </div>
  );
};

export default ProfilePage;