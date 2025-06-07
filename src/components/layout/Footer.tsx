import React from 'react';
import { Github, Twitter, Instagram, Music } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-surface py-8 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <Music className="h-6 w-6 text-primary mr-2" />
            <span className="text-lg font-bold">MeloRecommend</span>
          </div>
          
          <div className="flex space-x-6 mb-4 md:mb-0">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Github size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Twitter size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Instagram size={20} />
            </a>
          </div>
          
          <div className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} MeloRecommend. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;