import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Play, Plus, ThumbsUp, VolumeX, Volume2 } from 'lucide-react';
import { Movie } from '../types';
import { movies, categories } from '../data/mockData';
import MovieRow from '../components/home/MovieRow';

const MovieDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [showVideo, setShowVideo] = useState(false);
  const [relatedCategory, setRelatedCategory] = useState<any>(null);
  
  useEffect(() => {
    // Find movie by id
    if (id) {
      const movieId = parseInt(id);
      const foundMovie = movies.find(m => m.id === movieId);
      if (foundMovie) {
        setMovie(foundMovie);
        
        // Find a category this movie belongs to
        const category = categories.find(cat => 
          cat.movies.some(m => m.id === movieId)
        );
        if (category) {
          setRelatedCategory(category);
        }
        
        // Show mock trailer after 1 second
        const timer = setTimeout(() => {
          setShowVideo(true);
        }, 1000);
        
        return () => clearTimeout(timer);
      }
    }
  }, [id]);
  
  if (!movie) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-netflix-black">
        <div className="animate-spin h-10 w-10 border-4 border-netflix-red border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="bg-netflix-black min-h-screen">
      {/* Hero Section */}
      <div className="relative w-full" style={{ height: '80vh' }}>
        {/* Backdrop/Video */}
        <div className="absolute inset-0">
          {showVideo ? (
            <div className="w-full h-full bg-black flex items-center justify-center">
              {/* This would be a real video in a production app */}
              <div className="relative w-full h-full">
                <img 
                  src={movie.backdropUrl} 
                  alt={`${movie.title} trailer`} 
                  className="w-full h-full object-cover opacity-50"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-netflix-black"></div>
                
                {/* Video Controls */}
                <div className="absolute bottom-8 right-8 flex items-center space-x-3">
                  <button 
                    onClick={() => setIsMuted(!isMuted)}
                    className="bg-gray-900/80 hover:bg-gray-800 text-white p-2 rounded-full transition"
                    aria-label={isMuted ? "Unmute" : "Mute"}
                  >
                    {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                  </button>
                  
                  <div className="text-white/80 text-xs bg-gray-900/80 px-2 py-1 rounded-md">
                    Preview
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              <img 
                src={movie.backdropUrl} 
                alt={movie.title} 
                className="w-full h-full object-cover" 
              />
              <div className="absolute inset-0 bg-gradient-to-r from-netflix-black/90 via-netflix-black/70 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-netflix-black"></div>
            </>
          )}
        </div>
        
        {/* Content */}
        <div className="absolute bottom-16 md:bottom-24 left-0 w-full px-4 md:px-16">
          <div className="w-full md:w-2/3 lg:w-1/2">
            <h1 className="text-white text-3xl md:text-5xl font-bold mb-3">
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
            
            <p className="text-white/90 text-sm md:text-base mb-6 max-w-xl">
              {movie.description}
            </p>
            
            <div className="flex flex-wrap space-x-3">
              <Link 
                to={`/watch/${movie.id}`}
                className="bg-white text-black py-2 px-6 rounded flex items-center justify-center font-semibold text-sm md:text-base hover:bg-white/90 transition mb-2 md:mb-0"
              >
                <Play className="h-5 w-5 mr-1" /> Play
              </Link>
              
              <button 
                className="bg-gray-600/60 text-white py-2 px-4 rounded flex items-center justify-center font-medium text-sm md:text-base hover:bg-gray-700/60 transition"
              >
                <Plus className="h-5 w-5 mr-1" /> My List
              </button>
              
              <button 
                className="bg-gray-600/60 text-white py-2 px-4 rounded flex items-center justify-center font-medium text-sm md:text-base hover:bg-gray-700/60 transition"
              >
                <ThumbsUp className="h-5 w-5 mr-1" /> Rate
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Details Section */}
      <div className="px-4 md:px-16 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Details */}
        <div className="col-span-2">
          <div className="mb-8">
            <h2 className="text-white text-xl font-semibold mb-4">About {movie.title}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="mb-4">
                  <span className="text-gray-400 text-sm">Director: </span>
                  <span className="text-white text-sm">Jane Director</span>
                </div>
                
                <div className="mb-4">
                  <span className="text-gray-400 text-sm">Cast: </span>
                  <span className="text-white text-sm">Actor One, Actor Two, Actor Three, Actor Four</span>
                </div>
                
                <div className="mb-4">
                  <span className="text-gray-400 text-sm">Writer: </span>
                  <span className="text-white text-sm">Writer Person</span>
                </div>
              </div>
              
              <div>
                <div className="mb-4">
                  <span className="text-gray-400 text-sm">Genres: </span>
                  <span className="text-white text-sm">{movie.genre.join(', ')}</span>
                </div>
                
                <div className="mb-4">
                  <span className="text-gray-400 text-sm">This movie is: </span>
                  <span className="text-white text-sm">Suspenseful, Dark, Gritty</span>
                </div>
                
                <div>
                  <span className="text-gray-400 text-sm">Maturity rating: </span>
                  <span className="text-white text-sm">{movie.rating} (may contain violence, language, nudity)</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Scene Finder Promo */}
          {movie.scenes && movie.scenes.length > 0 && (
            <div className="bg-netflix-dark p-4 rounded-md mb-8 border-l-4 border-netflix-red">
              <div className="flex items-start">
                <div className="flex-1">
                  <h3 className="text-white text-lg font-medium mb-2">Looking for a specific scene?</h3>
                  <p className="text-white/80 text-sm mb-3">
                    Try our new Scene Finder feature to quickly jump to memorable moments in {movie.title}.
                  </p>
                  <Link 
                    to="/scene-finder"
                    className="text-netflix-red hover:text-red-500 text-sm font-medium inline-block transition"
                  >
                    Try Scene Finder
                  </Link>
                </div>
                
                <div className="ml-4 bg-black/40 rounded overflow-hidden" style={{width: '100px', height: '60px'}}>
                  {movie.scenes[0] && (
                    <img 
                      src={movie.scenes[0].screenshotUrl} 
                      alt="Scene preview" 
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Right Column - Additional Info */}
        <div>
          <div className="mb-6">
            <h3 className="text-gray-400 text-sm mb-2">Watch offline</h3>
            <p className="text-white text-sm">
              Download and watch anywhere, anytime
            </p>
          </div>
          
          <div className="mb-6">
            <h3 className="text-gray-400 text-sm mb-2">Available in</h3>
            <p className="text-white text-sm">
              Available to watch in HD, Ultra HD
            </p>
          </div>
          
          <div>
            <h3 className="text-gray-400 text-sm mb-2">Share to</h3>
            <div className="flex space-x-4">
              <button className="text-white hover:text-netflix-red transition">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                </svg>
              </button>
              <button className="text-white hover:text-netflix-red transition">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path>
                </svg>
              </button>
              <button className="text-white hover:text-netflix-red transition">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Similar Content */}
      {relatedCategory && (
        <div className="mt-4">
          <h2 className="text-white text-xl font-bold ml-4 md:ml-16 mb-2">
            More Like This
          </h2>
          <MovieRow category={relatedCategory} />
        </div>
      )}
    </div>
  );
};

export default MovieDetail;