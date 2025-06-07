import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Music, TrendingUp, Radio } from 'lucide-react';
import SongCard from '../components/music/SongCard';
import { useAuth } from '../context/AuthContext';

// Datos de ejemplo
const popularSongs = [
  {
    id: '1',
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    coverImage: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', // Sample de reemplazo
    duration: '3:20',
    isFavorite: false,
  },
  {
    id: '2',
    title: 'Shape of You',
    artist: 'Ed Sheeran',
    coverImage: 'https://images.pexels.com/photos/1389429/pexels-photo-1389429.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', // Sample de reemplazo
    duration: '3:53',
    isFavorite: true,
  },
  {
    id: '3',
    title: 'Dance Monkey',
    artist: 'Tones and I',
    coverImage: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3', // Sample de reemplazo
    duration: '3:29',
    isFavorite: false,
  },
  {
    id: '4',
    title: 'Watermelon Sugar',
    artist: 'Harry Styles',
    coverImage: 'https://images.pexels.com/photos/1699161/pexels-photo-1699161.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3', // Sample de reemplazo
    duration: '2:54',
    isFavorite: false,
  },
];

const genres = [
  { id: '1', name: 'Pop', icon: <Music size={24} /> },
  { id: '2', name: 'Rock', icon: <TrendingUp size={24} /> },
  { id: '3', name: 'Electronic', icon: <Radio size={24} /> },
  { id: '4', name: 'Hip Hop', icon: <Music size={24} /> },
  { id: '5', name: 'Classical', icon: <Music size={24} /> },
  { id: '6', name: 'Jazz', icon: <Music size={24} /> },
];

const HomePage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [recommendations, setRecommendations] = useState<any[]>([]);

  useEffect(() => {
    if (isAuthenticated) {
  // Recomendaciones personalizadas de ejemplo con enlaces de audio demo
  setRecommendations([
    {
      id: '5',
      title: 'Bohemian Rhapsody',
      artist: 'Queen',
      coverImage: 'https://images.pexels.com/photos/167092/pexels-photo-167092.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      audioUrl: 'https://assets.mixkit.co/music/preview/mixkit-queen-1247.mp3', // Versión demo libre
      duration: '5:55',
      isFavorite: true,
    },
    {
      id: '6',
      title: 'Dreams',
      artist: 'Fleetwood Mac',
      coverImage: 'https://images.pexels.com/photos/96380/pexels-photo-96380.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      audioUrl: 'https://assets.mixkit.co/music/preview/mixkit-dreams-108.mp3', // Versión instrumental libre
      duration: '4:14',
      isFavorite: false,
    },
    {
      id: '7',
      title: 'Billie Jean',
      artist: 'Michael Jackson',
      coverImage: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      audioUrl: 'https://assets.mixkit.co/music/preview/mixkit-billie-jean-108.mp3', // Versión cover libre
      duration: '4:54',
      isFavorite: false,
    },
    {
      id: '8',
      title: 'Smells Like Teen Spirit',
      artist: 'Nirvana',
      coverImage: 'https://images.pexels.com/photos/7148384/pexels-photo-7148384.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      audioUrl: 'https://assets.mixkit.co/music/preview/mixkit-smells-like-teen-spirit-1245.mp3', // Versión demo
      duration: '5:01',
      isFavorite: false,
    },
  ]);
}
  }, [isAuthenticated]);

  const handlePlaySong = (id: string) => {
    console.log(`Reproduciendo canción con id: ${id}`);
    
  };

  const handleFavoriteSong = (id: string) => {
    console.log(`Alternando favorito para canción con id: ${id}`);
    
  };

  return (
    <div className="space-y-10 fade-in">
      {/* Sección Hero */}
      <section className="relative rounded-xl overflow-hidden h-80 md:h-96">
        <img
          src="https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Música Hero"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent">
          <div className="h-full flex flex-col justify-center p-8 md:p-12 max-w-xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Descubre Tu Sonido Perfecto</h1>
            <p className="text-lg mb-6 text-text-secondary">
              Recomendaciones musicales personalizadas según tu gusto.
            </p>
            {!isAuthenticated && (
              <Link to="/register" className="btn-primary self-start">
                Regístrate Gratis
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Canciones Populares */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Canciones Populares</h2>
          <Link to="/search" className="text-primary hover:text-primary-dark">
            Ver Todas
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {popularSongs.map((song) => (
            <SongCard
              key={song.id}
              id={song.id}
              title={song.title}
              artist={song.artist}
              coverImage={song.coverImage}
              isFavorite={song.isFavorite}
              onPlay={() => handlePlaySong(song.id)}
              onFavorite={() => handleFavoriteSong(song.id)}
            />
          ))}
        </div>
      </section>

      {/* Géneros */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Explorar Géneros</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {genres.map((genre) => (
            <div
              key={genre.id}
              className="card flex flex-col items-center justify-center py-6 hover:bg-gray-800 transition-colors cursor-pointer"
            >
              <div className="bg-primary/20 p-4 rounded-full mb-3">{genre.icon}</div>
              <h3 className="font-medium">{genre.name}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Recomendaciones Personalizadas (solo para usuarios autenticados) */}
      {isAuthenticated && recommendations.length > 0 && (
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Recomendado Para Ti</h2>
            <Link to="/profile" className="text-primary hover:text-primary-dark">
              Personalizar
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {recommendations.map((song) => (
              <SongCard
                key={song.id}
                id={song.id}
                title={song.title}
                artist={song.artist}
                coverImage={song.coverImage}
                isFavorite={song.isFavorite}
                onPlay={() => handlePlaySong(song.id)}
                onFavorite={() => handleFavoriteSong(song.id)}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default HomePage;