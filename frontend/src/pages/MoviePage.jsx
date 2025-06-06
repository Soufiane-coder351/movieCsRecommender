import React, { useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import heroBg from "../assets/hero_background.png";
import useFetchMovie from "../scripts/useFetchMovie";
import useFetchGenres from "../scripts/useFetchGenres";
import useMovieReactions from "../scripts/useMovieReactions";
import useUserMovieReaction from "../scripts/useUserMovieReaction";
import useLikeDislikeActions from "../scripts/useLikeDislikeActions";

import MoviePoster from "../components/Movie/MoviePoster";
import MovieGenres from "../components/Movie/MovieGenres";
import MovieBadges from "../components/Movie/MovieBadges";
import MovieDescription from "../components/Movie/MovieDescription";
import MovieKeywords from "../components/Movie/MovieKeywords";
import LikeDislikeButtons from "../components/Movie/LikeDislikeButtons";
import BackToHomeButton from "../components/Movie/BackToHomeButton";

const MoviePage = () => {
  const { id } = useParams();
  const { movie, error } = useFetchMovie(id);

  const userId = localStorage.getItem("userId");
  const [refreshKey, setRefreshKey] = useState(0);

  const genreNames = useFetchGenres(movie?.genre || []).genres || [];
  const { likes, dislikes } = useMovieReactions(id, refreshKey);
  const [userReaction, setUserReaction] = useUserMovieReaction(userId, id);

  // Like dislike handler
    const { handleLike, handleDislike } = useLikeDislikeActions({
    userId,
    movieId: id,
    userReaction,
    setUserReaction,
    setRefreshKey,
  });
  
  if (error || !movie) {
    return <Navigate to="/notfound" replace />;
  }

  // Parse keywords (comma separated string), show only first 10
  const keywords = movie.keywords
    ? movie.keywords.split(" ").map((k) => k.trim()).filter(Boolean).slice(0, 10)
    : [];

  return (
    <div
      className="relative bg-cover bg-center min-h-screen text-white px-4 py-10"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      <div className="absolute inset-0 bg-black/70 z-0" />
      <div className="relative z-10 flex justify-center">
        <div className="w-full max-w-5xl backdrop-blur-xl bg-[#1f2d45]/80 border border-[#2c3e50] rounded-2xl shadow-2xl overflow-hidden transform transition duration-300 hover:scale-[1.01]">
          <div className="flex flex-col md:flex-row">
            <MoviePoster src={movie.poster_path} alt={movie.title} />
            <div className="md:w-2/3 p-6 flex flex-col gap-4">
              <h1 className="text-4xl font-extrabold tracking-tight">{movie.title}</h1>
              <MovieGenres genres={genreNames} />
              <MovieBadges likes={likes} dislikes={dislikes} date={movie.date || movie.year} />
              <MovieDescription description={movie.description} />
              <MovieKeywords keywords={keywords} />
              {movie.imdbLink && (
                <a
                  href={movie.imdbLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-orange-400 hover:text-orange-500 underline font-medium"
                >
                  → View on IMDb
                </a>
              )}
              <LikeDislikeButtons
                userReaction={userReaction}
                handleLike={handleLike}
                handleDislike={handleDislike}
              />
              <BackToHomeButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoviePage;