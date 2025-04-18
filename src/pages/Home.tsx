import React from 'react';
import Hero from '../components/home/Hero';
import MovieRow from '../components/home/MovieRow';
import { featuredContent, categories } from '../data/mockData';

const Home: React.FC = () => {
  return (
    <div className="bg-netflix-black min-h-screen">
      {/* Hero Banner */}
      <Hero movie={featuredContent} />
      
      {/* Content Rows */}
      <div className="mt-5 md:mt-8 pb-10">
        {/* Netflix Originals - First row with larger cards */}
        {categories.filter(cat => cat.name === "Netflix Originals").map(category => (
          <MovieRow 
            key={category.id} 
            category={category}
            isOriginals={true}
          />
        ))}
        
        {/* Regular categories */}
        {categories.filter(cat => cat.name !== "Netflix Originals").map(category => (
          <MovieRow 
            key={category.id} 
            category={category}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;