import React from 'react';

const HeroSection = () => {
  const urlpath =
    "https://sdmntprnortheu.oaiusercontent.com/files/00000000-25c4-61f4-af7e-7d8b95516cbd/raw?se=2025-06-03T20%3A37%3A07Z&sp=r&sv=2024-08-04&sr=b&scid=f7fe1bc5-4ced-5106-9772-168f6abed617&skoid=82a3371f-2f6c-4f81-8a78-2701b362559b&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-06-03T18%3A26%3A25Z&ske=2025-06-04T18%3A26%3A25Z&sks=b&skv=2024-08-04&sig=rVEzIQ7XnInG3XVQMk0nqPZ8dxcSdJViTZ6XddsVe%2BI%3D";

  const handleBrowseClick = () => {
    const grid = document.getElementById("movie-grid");
    if (grid) {
      grid.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      className="relative h-[90vh] bg-cover bg-center"
      style={{ backgroundImage: `url(${urlpath})` }}
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