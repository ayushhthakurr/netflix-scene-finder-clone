import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Play, Info, Plus, ThumbsUp } from 'lucide-react';
import { Movie } from '../../types';

interface MovieCardProps {
  movie: Movie;
  isOriginal?: boolean;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, isOriginal = false }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative flex-none transition-transform duration-300 ${
        isHovered ? 'scale-110 z-10' : 'scale-100 z-0'
      } ${isOriginal ? 'w-[220px] md:w-[280px]' : 'w-[180px] md:w-[220px]'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Basic Card Image */}
      <Link to={`/movie/${movie.id}`}>
        <img
          src={movie.thumbnailUrl}
          alt={movie.title}
          className={`rounded-md object-cover w-full transition-opacity duration-200 ${
            isHovered ? 'opacity-0' : 'opacity-100'
          } ${isOriginal ? 'h-[330px] md:h-[400px]' : 'h-[100px] md:h-[130px]'}`}
        />
      </Link>

      {/* Expanded Hover Card */}
      {isHovered && (
        <div className="absolute top-0 left-0 right-0 bg-netflix-dark rounded-md shadow-xl overflow-hidden animate-scale-in">
          {/* Card Image/Video */}
          <div className="relative">
            <img
              src={movie.thumbnailUrl}
              alt={movie.title}
              className={`w-full object-cover ${
                isOriginal ? 'h-[170px] md:h-[220px]' : 'h-[100px] md:h-[130px]'
              }`}
            />
            
            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Link
                to={`/watch/${movie.id}`}
                className="rounded-full bg-white/90 p-2 text-netflix-black hover:bg-white transition"
              >
                <Play className="h-6 w-6 fill-current" />
              </Link>
            </div>
          </div>

          {/* Card Content */}
          <div className="p-3">
            {/* Buttons */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex space-x-2">
                <Link
                  to={`/watch/${movie.id}`}
                  className="rounded-full border border-gray-400 p-1 text-white hover:border-white transition"
                >
                  <Play className="h-4 w-4" />
                </Link>
                <button 
                  className="rounded-full border border-gray-400 p-1 text-white hover:border-white transition"
                  aria-label="Add to My List"
                >
                  <Plus className="h-4 w-4" />
                </button>
                <button 
                  className="rounded-full border border-gray-400 p-1 text-white hover:border-white transition"
                  aria-label="I like this"
                >
                  <ThumbsUp className="h-4 w-4" />
                </button>
              </div>
              <Link
                to={`/movie/${movie.id}`}
                className="rounded-full border border-gray-400 p-1 text-white hover:border-white transition"
                aria-label="More info"
              >
                <Info className="h-4 w-4" />
              </Link>
            </div>

            {/* Movie Info */}
            <div className="text-xs text-white">
              <div className="flex items-center space-x-2 mb-1">
                <span className="text-green-500 font-semibold">
                  {Math.floor(Math.random() * 30) + 70}% Match
                </span>
                <span className="border border-white/40 px-1 text-[10px]">
                  {movie.rating}
                </span>
                <span>{movie.duration}</span>
              </div>
              
              {/* Genres */}
              <div className="flex flex-wrap text-white/80">
                {movie.genre.map((g, i) => (
                  <React.Fragment key={g}>
                    <span>{g}</span>
                    {i < movie.genre.length - 1 && (
                      <span className="mx-1 text-white/60">•</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Netflix Original Badge */}
      {isOriginal && movie.isOriginal && (
        <div className="absolute top-2 left-2 bg-netflix-red text-white text-xs px-1 py-0.5 rounded">
          N
        </div>
      )}
    </div>
  );
};

export default MovieCard;