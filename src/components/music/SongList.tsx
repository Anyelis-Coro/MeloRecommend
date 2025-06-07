import React from 'react';
import { Play, Heart, Clock } from 'lucide-react';

interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: string;
  isFavorite?: boolean;
}

interface SongListProps {
  songs: Song[];
  onPlay: (id: string) => void;
  onFavorite: (id: string) => void;
}

const SongList: React.FC<SongListProps> = ({ songs, onPlay, onFavorite }) => {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full min-w-full">
        <thead>
          <tr className="border-b border-gray-800 text-left text-sm text-gray-400">
            <th className="px-4 py-3 w-12">#</th>
            <th className="px-4 py-3">Title</th>
            <th className="px-4 py-3">Artist</th>
            <th className="px-4 py-3 hidden md:table-cell">Album</th>
            <th className="px-4 py-3 text-right">
              <Clock size={16} />
            </th>
            <th className="px-4 py-3 w-12"></th>
          </tr>
        </thead>
        <tbody>
          {songs.map((song, index) => (
            <tr
              key={song.id}
              className="border-b border-gray-800 hover:bg-gray-800/30 transition-colors text-sm"
            >
              <td className="px-4 py-3 text-gray-400">
                <div className="group relative">
                  <span className="group-hover:hidden">{index + 1}</span>
                  <button
                    className="hidden group-hover:block focus:outline-none"
                    onClick={() => onPlay(song.id)}
                  >
                    <Play size={16} className="text-white" />
                  </button>
                </div>
              </td>
              <td className="px-4 py-3 font-medium">{song.title}</td>
              <td className="px-4 py-3 text-text-secondary">{song.artist}</td>
              <td className="px-4 py-3 text-text-secondary hidden md:table-cell">
                {song.album}
              </td>
              <td className="px-4 py-3 text-text-secondary text-right">
                {song.duration}
              </td>
              <td className="px-4 py-3 text-right">
                <button
                  onClick={() => onFavorite(song.id)}
                  className={`focus:outline-none ${
                    song.isFavorite ? 'text-red-500' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Heart size={16} fill={song.isFavorite ? "#ef4444" : "none"} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SongList;