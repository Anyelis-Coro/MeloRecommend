import React, { useState } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Heart } from 'lucide-react';

const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  
// Datos de ejemplo para demostración
const currentSong = {
  title: "Midnight City",
  artist: "M83",
  album: "Hurry Up, We're Dreaming",
  cover: "https://images.pexels.com/photos/1626481/pexels-photo-1626481.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", // Enlace de audio real de ejemplo
  duration: "4:03",
};

const togglePlay = () => {
  setIsPlaying(!isPlaying);
  // const audioPlayer = document.getElementById('audio-player');
  // isPlaying ? audioPlayer.pause() : audioPlayer.play();
};

const toggleFavorite = () => {
  setIsFavorite(!isFavorite);

  console.log(`Canción ${isFavorite ? 'eliminada de' : 'añadida a'} favoritos`);
};

// Elemento de audio oculto para la reproducción real
{/* <audio id="audio-player" src={currentSong.audio} /> */}

return (
  <div className="fixed bottom-0 left-0 right-0 bg-surface bg-opacity-95 backdrop-blur-md border-t border-gray-800 py-3 px-4 z-20">
    <div className="container mx-auto">
      <div className="flex flex-col sm:flex-row items-center justify-between">
        {/* Información de la canción */}
        <div className="flex items-center mb-3 sm:mb-0">
          <img 
            src={currentSong.cover} 
            alt={`Portada de ${currentSong.title}`} 
            className="w-12 h-12 rounded-md object-cover mr-3"
          />
          <div>
            <h4 className="text-white font-medium">{currentSong.title}</h4>
            <p className="text-text-secondary text-sm">{currentSong.artist}</p>
          </div>
          <button 
            onClick={toggleFavorite}
            className={`ml-4 focus:outline-none ${isFavorite ? 'text-red-500' : 'text-gray-400 hover:text-white'}`}
            aria-label={isFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
          >
            <Heart size={20} fill={isFavorite ? "#ef4444" : "none"} />
          </button>
        </div>
        
        {/* Controles del reproductor */}
        <div className="flex items-center space-x-4">
          <button 
            className="text-gray-400 hover:text-white focus:outline-none"
            aria-label="Canción anterior"
          >
            <SkipBack size={20} />
          </button>
          <button 
            onClick={togglePlay}
            className="bg-primary hover:bg-primary-dark rounded-full p-2 focus:outline-none transition-colors"
            aria-label={isPlaying ? 'Pausar' : 'Reproducir'}
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </button>
          <button 
            className="text-gray-400 hover:text-white focus:outline-none"
            aria-label="Siguiente canción"
          >
            <SkipForward size={20} />
          </button>
        </div>
        
        {/* Barra de progreso y volumen */}
        <div className="hidden md:flex items-center space-x-4 w-1/4">
          <div className="audio-wave">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <Volume2 size={18} className="text-gray-400" aria-label="Control de volumen" />
          <div className="w-full bg-gray-700 rounded-full h-1.5">
            <div className="bg-primary h-1.5 rounded-full" style={{ width: '60%' }}></div>
          </div>
        </div>
      </div>
    </div>
  </div>

);
};

export default MusicPlayer;