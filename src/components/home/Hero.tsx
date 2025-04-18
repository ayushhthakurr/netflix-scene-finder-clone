import React, { useState, useEffect } from 'react';
import { Play, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Movie } from '../../types';

interface HeroProps {
  movie: Movie;
}

const Hero: React.FC<HeroProps> = ({ movie }) => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  
  // Reset video state when movie changes
  useEffect(() => {
    setIsVideoPlaying(false);
  }, [movie]);

  return (
    <div className="relative w-full h-[56.25vw] max-h-[800px] min-h-[400px]">
      {/* Background Image/Video */}
      <div className="absolute inset-0 w-full h-full">
        {isVideoPlaying ? (
          <div className="w-full h-full bg-black">
            {/* This would be a real video in a production app */}
            <div className="absolute inset-0 flex items-center justify-center text-white">
              <p className="text-xl">Trailer Playing...</p>
            </div>
          </div>
        ) : (
          <>
            <img 
              src={movie.backdropUrl} 
              alt={movie.title} 
              className="w-full h-full object-cover" 
            />
            <div className="absolute inset-0 bg-gradient-to-r from-netflix-black/80 via-netflix-black/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-netflix-black via-transparent to-transparent" />
          </>
        )}
      </div>
      
      {/* Content */}
      <div className="absolute bottom-1/4 left-0 w-full px-4 md:px-16 z-10">
        <div className="w-full md:w-2/3 lg:w-1/2 animate-slide-up">
          <h1 className="text-white text-3xl md:text-5xl font-bold mb-3 drop-shadow-lg">
            {movie.title}
          </h1>
          
          <div className="flex items-center text-sm text-white/80 space-x-4 mb-4">
            <span className="text-green-500 font-semibold">
              {Math.floor(Math.random() * 30) + 70}% Match
            </span>
            <span>{movie.releaseYear}</span>
            <span className="border border-white/40 px-1 text-xs">
              {movie.rating}
            </span>
            <span>{movie.duration}</span>
          </div>
          
          <p className="text-white/90 text-sm md:text-base mb-6 line-clamp-3 max-w-md drop-shadow-md">
            {movie.description}
          </p>
          
          <div className="flex flex-wrap space-x-3">
            <Link 
              to={`/watch/${movie.id}`}
              className="bg-white text-black py-2 px-6 rounded flex items-center justify-center font-semibold text-sm md:text-base hover:bg-white/90 transition mb-2 md:mb-0"
            >
              <Play className="h-5 w-5 mr-1" /> Play
            </Link>
            
            <Link 
              to={`/movie/${movie.id}`}
              className="bg-gray-500/70 text-white py-2 px-6 rounded flex items-center justify-center font-medium text-sm md:text-base hover:bg-gray-600/70 transition"
            >
              <Info className="h-5 w-5 mr-1" /> More Info
            </Link>
          </div>
        </div>
      </div>
      
      {/* Age Rating */}
      <div className="absolute bottom-0 right-0 px-4 py-1 bg-netflix-black/80 text-white text-xs md:text-sm flex items-center mr-4 md:mr-16 mb-4 md:mb-6">
        <span className="text-gray-400 mr-2">Rating:</span>
        <span>{movie.rating}</span>
      </div>
    </div>
  );
};

export default Hero;