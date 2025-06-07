import React from 'react';
import { Play, Heart } from 'lucide-react';

interface SongProps {
  id: string;
  title: string;
  artist: string;
  coverImage: string;
  isFavorite?: boolean;
  onPlay?: () => void;
  onFavorite?: () => void;
}

const SongCard: React.FC<SongProps> = ({
  title,
  artist,
  coverImage,
  isFavorite = false,
  onPlay,
  onFavorite,
}) => {
  return (
    <div className="card group relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 scale-in">
      <div className="relative aspect-square overflow-hidden rounded-lg mb-3">
        <img
          src={coverImage}
          alt={`${title} by ${artist}`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <button
            onClick={onPlay}
            className="bg-primary hover:bg-primary-dark text-white rounded-full p-3 transform transition-all duration-300 hover:scale-110"
          >
            <Play size={24} fill="white" />
          </button>
        </div>
      </div>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium text-white truncate">{title}</h3>
          <p className="text-text-secondary text-sm">{artist}</p>
        </div>
        <button
          onClick={onFavorite}
          className={`focus:outline-none ${
            isFavorite ? 'text-red-500' : 'text-gray-400 hover:text-white'
          }`}
        >
          <Heart size={18} fill={isFavorite ? "#ef4444" : "none"} />
        </button>
      </div>
    </div>
  );
};

export default SongCard;