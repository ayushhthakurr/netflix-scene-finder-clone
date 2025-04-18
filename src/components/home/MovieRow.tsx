import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import MovieCard from './MovieCard';
import { Category } from '../../types';

interface MovieRowProps {
  category: Category;
  isOriginals?: boolean;
}

const MovieRow: React.FC<MovieRowProps> = ({ category, isOriginals = false }) => {
  const [showControls, setShowControls] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const sliderRef = useRef<HTMLDivElement>(null);
  
  // Check if we can scroll in any direction
  const checkScroll = () => {
    if (!sliderRef.current) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5); // 5px tolerance
  };
  
  useEffect(() => {
    const slider = sliderRef.current;
    if (slider) {
      slider.addEventListener('scroll', checkScroll);
      // Initial check
      checkScroll();
    }
    
    return () => {
      if (slider) {
        slider.removeEventListener('scroll', checkScroll);
      }
    };
  }, []);
  
  const scroll = (direction: 'left' | 'right') => {
    if (!sliderRef.current) return;
    
    const slider = sliderRef.current;
    const scrollAmount = slider.clientWidth - 100; // Slightly less than the full width to show overlap
    
    slider.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  return (
    <div 
      className="mb-8 md:mb-12 relative group"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <h2 className="text-white text-xl md:text-2xl font-bold ml-4 md:ml-16 mb-2">
        {category.name}
      </h2>
      
      {/* Scroll Controls */}
      {showControls && canScrollLeft && (
        <button 
          onClick={() => scroll('left')}
          className="absolute left-0 md:left-6 z-10 top-1/2 transform -translate-y-1/2 bg-black/60 rounded-full p-1 md:p-2 text-white opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0"
          aria-label="Scroll left"
          disabled={!canScrollLeft}
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
      )}
      
      {showControls && canScrollRight && (
        <button 
          onClick={() => scroll('right')}
          className="absolute right-0 md:right-6 z-10 top-1/2 transform -translate-y-1/2 bg-black/60 rounded-full p-1 md:p-2 text-white opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0"
          aria-label="Scroll right"
          disabled={!canScrollRight}
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      )}
      
      {/* Slider */}
      <div 
        ref={sliderRef}
        className="flex overflow-x-auto space-x-2 md:space-x-4 py-4 px-4 md:px-16 no-scrollbar"
      >
        {category.movies.map((movie) => (
          <MovieCard 
            key={movie.id} 
            movie={movie} 
            isOriginal={isOriginals}
          />
        ))}
      </div>
    </div>
  );
};

export default MovieRow;