import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Clock, ArrowLeft, Share2 } from 'lucide-react';
import { Scene, Movie } from '../../types';

interface SceneFinderResultsProps {
  scene: Scene;
  movie: Movie;
  onReset: () => void;
}

const SceneFinderResults: React.FC<SceneFinderResultsProps> = ({ 
  scene, 
  movie, 
  onReset 
}) => {
  return (
    <div className="w-full max-w-3xl mx-auto p-6 animate-fade-in">
      <div className="bg-netflix-dark rounded-lg shadow-lg overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-white text-2xl font-bold flex items-center">
              <span className="text-netflix-red mr-2">Scene</span> Found!
            </h2>
            <button
              onClick={onReset}
              className="text-white/80 hover:text-white flex items-center text-sm transition"
            >
              <ArrowLeft className="h-4 w-4 mr-1" /> Try Another Screenshot
            </button>
          </div>
          
          {/* Results Content */}
          <div className="space-y-6">
            {/* Content Top: Match Info */}
            <div className="flex flex-col md:flex-row gap-6">
              {/* Screenshot Preview */}
              <div className="w-full md:w-1/2 rounded-md overflow-hidden">
                <img 
                  src={scene.screenshotUrl} 
                  alt="Uploaded screenshot" 
                  className="w-full h-auto"
                />
              </div>
              
              {/* Match Details */}
              <div className="w-full md:w-1/2 flex flex-col">
                <div className="bg-black/30 p-4 rounded-md flex-1">
                  <div className="flex items-center mb-4">
                    <div className="relative w-16 h-16 mr-3 flex-shrink-0">
                      <img 
                        src={movie.thumbnailUrl} 
                        alt={movie.title}
                        className="w-full h-full object-cover rounded"
                      />
                      {movie.isOriginal && (
                        <div className="absolute top-1 left-1 bg-netflix-red text-white text-xs px-1 py-0.5 rounded">
                          N
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <h3 className="text-white font-bold">{movie.title}</h3>
                      <div className="flex items-center text-xs text-white/70 space-x-2 mt-1">
                        <span>{movie.releaseYear}</span>
                        <span>•</span>
                        <span>{movie.rating}</span>
                        <span>•</span>
                        <span>{movie.duration}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    {/* Scene Details */}
                    <div className="flex items-center text-white/90 mb-1">
                      <Clock className="h-4 w-4 mr-2 text-netflix-red flex-shrink-0" />
                      <div>
                        <span className="text-xs text-white/70 mr-2">Timestamp:</span>
                        <span className="font-mono font-semibold">{scene.timestamp}</span>
                      </div>
                    </div>
                    
                    {/* Scene Description */}
                    <p className="text-sm text-white/80 bg-black/20 p-3 rounded">
                      "{scene.description}"
                    </p>
                    
                    {/* Confidence */}
                    <div className="flex items-center">
                      <span className="text-xs text-white/70 mr-2">Match confidence:</span>
                      <div className="flex-1 bg-gray-800 h-2 rounded-full overflow-hidden">
                        <div 
                          className="bg-green-500 h-full rounded-full"
                          style={{ width: '92%' }}
                        ></div>
                      </div>
                      <span className="text-xs text-green-400 ml-2 font-semibold">92%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Content Bottom: Actions */}
            <div className="flex flex-col space-y-3">
              <Link 
                to={`/watch/${movie.id}?t=${scene.timestamp}`}
                className="bg-netflix-red hover:bg-red-700 text-white py-3 px-6 rounded flex items-center justify-center transition"
              >
                <Play className="h-5 w-5 mr-2" fill="currentColor" />
                Watch This Scene
              </Link>
              
              <div className="flex space-x-3">
                <Link 
                  to={`/movie/${movie.id}`}
                  className="bg-white/10 hover:bg-white/20 text-white flex-1 py-2 rounded flex items-center justify-center text-sm transition"
                >
                  View Details
                </Link>
                <button 
                  className="bg-white/10 hover:bg-white/20 text-white flex-1 py-2 rounded flex items-center justify-center text-sm transition"
                >
                  <Share2 className="h-4 w-4 mr-1" />
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Information Section */}
        <div className="bg-black/20 border-t border-gray-800 p-6">
          <h3 className="text-white text-lg font-semibold mb-3">Did you know?</h3>
          <p className="text-gray-300 text-sm">
            Our Scene Finder technology can identify over 100,000 Netflix titles and millions of scenes with incredible accuracy.
            Try it with TV shows, movies, documentaries, or even animation!
          </p>
        </div>
      </div>
    </div>
  );
};

export default SceneFinderResults;