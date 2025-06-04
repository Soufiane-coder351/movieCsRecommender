import React from 'react';

const MovieCard = ({ movie }) => {
  return (
    <div className="bg-[#102040] rounded-lg overflow-hidden text-white shadow-lg">
      <img
        src={movie.poster_path}
        alt={movie.title}
        className="w-full h-auto object-contain"
      />
      <div className="p-3">
        <h3 className="font-semibold text-lg">{movie.title}</h3>
        <p className="text-sm text-gray-300">{movie.genre} • {movie.year}</p>
      </div>
    </div>
  );
};

export default MovieCard;
