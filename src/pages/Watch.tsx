import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Play, Pause, Volume2, VolumeX, Maximize, Rewind, FastForward, Settings, Clock } from 'lucide-react';
import { movies } from '../data/mockData';

const Watch: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [controlsTimer, setControlsTimer] = useState<NodeJS.Timeout | null>(null);
  
  // Get the timestamp parameter (if provided)
  const timestamp = searchParams.get('t');
  
  useEffect(() => {
    if (id) {
      const movieId = parseInt(id);
      const foundMovie = movies.find(m => m.id === movieId);
      if (foundMovie) {
        setMovie(foundMovie);
        
        // Set initial progress based on timestamp parameter
        if (timestamp) {
          const [hours, minutes, seconds] = timestamp.split(':').map(Number);
          const totalSeconds = (hours * 3600) + (minutes * 60) + seconds;
          // Assuming a 2-hour movie (7200 seconds)
          const progressPercent = (totalSeconds / 7200) * 100;
          setProgress(progressPercent);
        }
      }
    }
    
    // Auto-hide controls after 3 seconds
    resetControlsTimer();
    
    // Set up progress simulation
    const interval = setInterval(() => {
      if (isPlaying) {
        setProgress(prev => {
          if (prev >= 100) return 100;
          return prev + 0.1;
        });
      }
    }, 500);
    
    return () => {
      if (controlsTimer) clearTimeout(controlsTimer);
      clearInterval(interval);
    };
  }, [id, timestamp, isPlaying]);
  
  const resetControlsTimer = () => {
    if (controlsTimer) clearTimeout(controlsTimer);
    
    setShowControls(true);
    const timer = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 3000);
    
    setControlsTimer(timer);
  };
  
  const handleMouseMove = () => {
    resetControlsTimer();
  };
  
  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };
  
  // Calculate current time and total time
  const totalDuration = 7200; // 2 hours in seconds
  const currentTime = (progress / 100) * totalDuration;

  if (!movie) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="animate-spin h-10 w-10 border-4 border-netflix-red border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div 
      className="h-screen w-full bg-black relative overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Video Display */}
      <div className="absolute inset-0 flex items-center justify-center bg-black">
        <video
          className="w-full h-full object-contain"
          poster={movie.backdropUrl}
          autoPlay
          muted={isMuted}
          playsInline
        >
          <source src="https://assets.nflxext.com/ffe/siteui/acquisition/home/thisIsNetflix/videos/video-devices-in.m4v" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      
      {/* Controls Overlay */}
      <div 
        className={`absolute inset-0 transition-opacity duration-300 ${
          showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Top Bar */}
        <div className="absolute top-0 left-0 w-full p-4 bg-gradient-to-b from-black/80 to-transparent">
          <div className="flex items-center">
            <button 
              onClick={() => navigate(-1)}
              className="text-white p-2 rounded-full hover:bg-white/10 transition"
              aria-label="Back"
            >
              <ArrowLeft className="h-6 w-6" />
            </button>
            <div className="ml-4">
              <h2 className="text-white text-xl font-bold">{movie.title}</h2>
              <p className="text-white/70 text-sm">S1:E1 "Pilot"</p>
            </div>
          </div>
        </div>
        
        {/* Center Play/Pause Button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="text-white bg-white/10 rounded-full p-5 hover:bg-white/20 transition transform hover:scale-110"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <Pause className="h-10 w-10 fill-white" />
            ) : (
              <Play className="h-10 w-10 fill-white" />
            )}
          </button>
        </div>
        
        {/* Bottom Controls Bar */}
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/90 to-transparent px-4 pb-4 pt-16">
          {/* Progress Bar */}
          <div className="w-full h-1 bg-gray-600 rounded-full mb-4 cursor-pointer relative">
            <div 
              className="h-full bg-netflix-red rounded-full absolute"
              style={{ width: `${progress}%` }}
            ></div>
            <div 
              className="absolute top-1/2 -translate-y-1/2 h-3 w-3 bg-netflix-red rounded-full -translate-x-1/2 shadow-sm"
              style={{ left: `${progress}%` }}
            ></div>
          </div>
          
          {/* Control Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className="text-white hover:text-gray-300 transition"
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? (
                  <Pause className="h-6 w-6" />
                ) : (
                  <Play className="h-6 w-6" />
                )}
              </button>
              
              <button 
                className="text-white hover:text-gray-300 transition"
                aria-label="Rewind 10 seconds"
              >
                <Rewind className="h-6 w-6" />
              </button>
              
              <button 
                className="text-white hover:text-gray-300 transition"
                aria-label="Forward 10 seconds"
              >
                <FastForward className="h-6 w-6" />
              </button>
              
              <button 
                onClick={() => setIsMuted(!isMuted)}
                className="text-white hover:text-gray-300 transition"
                aria-label={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? (
                  <VolumeX className="h-6 w-6" />
                ) : (
                  <Volume2 className="h-6 w-6" />
                )}
              </button>
              
              {/* Time Display */}
              <div className="text-white text-sm ml-2">
                {formatTime(currentTime)} / {formatTime(totalDuration)}
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button 
                className="text-white hover:text-gray-300 transition"
                aria-label="Settings"
              >
                <Settings className="h-6 w-6" />
              </button>
              
              <button 
                className="text-white hover:text-gray-300 transition"
                aria-label="Fullscreen"
              >
                <Maximize className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scene Timestamp Indicator */}
      {timestamp && (
        <div className={`absolute top-16 right-6 bg-netflix-red text-white py-2 px-4 rounded-md transition ${showControls ? 'opacity-100' : 'opacity-0'}`}>
          <div className="text-xs font-semibold mb-1">SCENE FINDER MATCH</div>
          <div className="flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            <span className="font-mono">{timestamp}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Watch;