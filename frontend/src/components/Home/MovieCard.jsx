import React from "react";
import { Link } from "react-router-dom";
import useFetchGenre from "../../scripts/useFetchGenre";

const MovieCard = ({ movie }) => {
  const firstGenre = useFetchGenre(movie.genre[0]).genre;
  return (
    <Link
      to={`/movie/${movie.id}`}
      className="bg-[#102040] rounded-lg overflow-hidden text-white shadow-lg flex flex-col hover:scale-105 transition-transform duration-200"
    >
      <img
        src={movie.poster_path}
        alt={movie.title}
        className="w-full h-auto object-contain"
      />
      <div className="p-3 flex flex-col flex-1">
        <h3 className="font-semibold text-lg">{movie.title}</h3>
        <p className="text-sm text-gray-300 mt-auto">
          {firstGenre} • {movie.date}
        </p>
      </div>
    </Link>
  );
};

export default MovieCard;
