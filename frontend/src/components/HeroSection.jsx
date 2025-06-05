import React from 'react';

import heroBg from '../assets/hero_background.png'; // Ensure you have a hero background image

const HeroSection = () => {  
  const handleBrowseClick = () => {
    const grid = document.getElementById("movie-grid");
    if (grid) {
      grid.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      className="relative h-[90vh] bg-cover bg-center"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
        <div className="flex flex-col items-center max-w-2xl mx-auto text-center gap-6">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg">
            Unlimited Movies, Curated For You
          </h1>
          <p className="text-lg md:text-2xl text-gray-200 font-medium">
            Browse, search, and discover your next favorite film from our handpicked collection.
          </p>
          <button
            onClick={handleBrowseClick}
            className="mt-2 px-8 py-3 rounded-lg bg-orange-500 text-white text-lg font-semibold shadow-lg hover:bg-orange-600 transition-all duration-200"
          >
            Browse Movies
          </button>
        </div>
      </div>
      {/* Optional: subtle gradient overlay for extra depth */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-black/40 pointer-events-none" />
    </div>
  );
};

export default HeroSection;