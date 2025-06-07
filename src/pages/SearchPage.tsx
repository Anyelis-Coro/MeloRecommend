import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Search as SearchIcon } from 'lucide-react';
import SongList from '../components/music/SongList';

// Datos de ejemplo
const allSongs = [
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
    id: '3',
    title: 'Dance Monkey',
    artist: 'Tones and I',
    album: 'The Kids Are Coming',
    duration: '3:29',
    isFavorite: false,
  },
  {
    id: '4',
    title: 'Watermelon Sugar',
    artist: 'Harry Styles',
    album: 'Fine Line',
    duration: '2:54',
    isFavorite: false,
  },
  {
    id: '5',
    title: 'Bohemian Rhapsody',
    artist: 'Queen',
    album: 'A Night at the Opera',
    duration: '5:55',
    isFavorite: true,
  },
  {
    id: '6',
    title: 'Dreams',
    artist: 'Fleetwood Mac',
    album: 'Rumours',
    duration: '4:14',
    isFavorite: false,
  },
  {
    id: '7',
    title: 'Billie Jean',
    artist: 'Michael Jackson',
    album: 'Thriller',
    duration: '4:54',
    isFavorite: false,
  },
  {
    id: '8',
    title: 'Smells Like Teen Spirit',
    artist: 'Nirvana',
    album: 'Nevermind',
    duration: '5:01',
    isFavorite: false,
  },
];

const SearchPage: React.FC = () => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  
  useEffect(() => {
    // Extraer término de búsqueda de la URL si está presente
    const params = new URLSearchParams(location.search);
    const query = params.get('q');
    if (query) {
      setSearchQuery(query);
      performSearch(query);
    }
  }, [location.search]);
  
  const performSearch = (query: string) => {
    // Por ahora, filtramos los datos de ejemplo
    const results = allSongs.filter(song => 
      song.title.toLowerCase().includes(query.toLowerCase()) || 
      song.artist.toLowerCase().includes(query.toLowerCase()) ||
      song.album.toLowerCase().includes(query.toLowerCase())
    );
    
    setSearchResults(results);
  };
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      performSearch(searchQuery);
    }
  };
  
  const handlePlaySong = (id: string) => {
    console.log(`Reproduciendo canción con id: ${id}`);
    // Esto activaría la reproducción
  };
  
  const handleFavoriteSong = (id: string) => {
    console.log(`Alternando favorito para canción con id: ${id}`);
    // Esto actualizaría el estado de favorito
  };

  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold mb-6">Buscar Música</h1>
      
      {/* Formulario de búsqueda */}
      <form onSubmit={handleSearch} className="mb-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar por canción, artista o álbum..."
            className="input w-full pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <SearchIcon className="absolute left-3 top-3 text-gray-400" size={18} />
          <button type="submit" className="btn-primary absolute right-1 top-1">
            Buscar
          </button>
        </div>
      </form>
      
      {/* Resultados de búsqueda */}
      <div className="card">
        <h2 className="text-xl font-bold mb-4">
          {searchResults.length > 0 
            ? `Resultados (${searchResults.length})` 
            : searchQuery 
              ? 'No se encontraron resultados' 
              : 'Todas las canciones'}
        </h2>
        
        <SongList 
          songs={searchResults.length > 0 ? searchResults : allSongs}
          onPlay={handlePlaySong}
          onFavorite={handleFavoriteSong}
        />
      </div>
    </div>
  );
};

export default SearchPage;