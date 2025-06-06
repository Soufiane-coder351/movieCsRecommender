import React, { useState, useEffect } from "react";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import heroBg from "../assets/hero_background.png";
import useFetchMovie from "../scripts/useFetchMovie";
import useFetchGenres from "../scripts/useFetchGenres";
import useMovieReactions from "../scripts/useMovieReactions";

const MoviePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { movie, error } = useFetchMovie(id);

  const userId = localStorage.getItem("userId");
  const [userReaction, setUserReaction] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const genreNames = useFetchGenres(movie?.genre || []).genres || [];
  const { likes, dislikes } = useMovieReactions(id, refreshKey);

  // Fetch user's rating for this movie on load
  useEffect(() => {
    if (!userId || !id) return;
    axios
      .get(`http://localhost:3000/ratings/${userId}/${id}`)
      .then((res) => {
        if (res.data.rating === 1) setUserReaction("like");
        else if (res.data.rating === -1) setUserReaction("dislike");
        else setUserReaction(null);
      })
      .catch(() => setUserReaction(null));
  }, [userId, id]);

  // Like handler
  const handleLike = async () => {
    if (!userId) return;
    if (userReaction === "like") {
      await axios.delete("http://localhost:3000/ratings", {
        data: { userId: Number(userId), movieId: Number(id) },
      });
      setUserReaction(null);
    } else {
      await axios.post("http://localhost:3000/ratings", {
        userId: Number(userId),
        movieId: Number(id),
        ratingValue: 1,
      });
      setUserReaction("like");
    }
    setRefreshKey((k) => k + 1); // Refresh counts
  };

  // Dislike handler
  const handleDislike = async () => {
    if (!userId) return;
    if (userReaction === "dislike") {
      await axios.delete("http://localhost:3000/ratings", {
        data: { userId: Number(userId), movieId: Number(id) },
      });
      setUserReaction(null);
    } else {
      await axios.post("http://localhost:3000/ratings", {
        userId: Number(userId),
        movieId: Number(id),
        ratingValue: -1,
      });
      setUserReaction("dislike");
    }
    setRefreshKey((k) => k + 1); // Refresh counts
  };

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
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70 z-0" />

      {/* Movie Card */}
      <div className="relative z-10 flex justify-center">
        <div className="w-full max-w-5xl backdrop-blur-xl bg-[#1f2d45]/80 border border-[#2c3e50] rounded-2xl shadow-2xl overflow-hidden transform transition duration-300 hover:scale-[1.01]">
          <div className="flex flex-col md:flex-row">
            {/* Poster */}
            <div className="md:w-1/3 flex justify-center items-center p-4 bg-[#101c2c] hover:brightness-110 transition">
              <img
                src={movie.poster_path}
                alt={movie.title}
                className="rounded-xl shadow-lg max-h-96 object-cover"
              />
            </div>

            {/* Info */}
            <div className="md:w-2/3 p-6 flex flex-col gap-4">
              <h1 className="text-4xl font-extrabold tracking-tight">{movie.title}</h1>

              {/* Genres */}
              <div className="flex flex-wrap gap-3 text-sm font-medium">
                {genreNames.map(
                  (name, idx) =>
                    name && (
                      <span
                        key={idx}
                        className="bg-orange-500 px-3 py-1 rounded-full"
                      >
                        {name}
                      </span>
                    )
                )}
              </div>

              {/* Likes/Dislikes badges */}
              <div className="flex flex-wrap gap-3 text-sm font-medium mt-2">
                <span className="bg-[#223355] px-3 py-1 rounded-full flex items-center gap-1">
                  👍 {likes}
                </span>
                <span className="bg-[#223355] px-3 py-1 rounded-full flex items-center gap-1">
                  👎 {dislikes}
                </span>
                <span className="bg-[#223355] px-3 py-1 rounded-full">
                  {movie.date || movie.year}
                </span>
              </div>

              {/* Description */}
              {movie.description && (
                <div className="mt-2">
                  <h2 className="text-lg font-semibold mb-1 text-orange-400">Description</h2>
                  <p className="text-base text-gray-200">{movie.description}</p>
                </div>
              )}

              {/* Keywords */}
              {keywords.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {keywords.map((kw, idx) => (
                    <span
                      key={idx}
                      className="bg-[#223355] text-orange-300 px-2 py-1 rounded-full text-xs font-medium"
                    >
                      #{kw}
                    </span>
                  ))}
                </div>
              )}

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

              {/* Like/Dislike */}
              <div className="flex gap-4 mt-4">
                <button
                  onClick={handleLike}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition ${
                    userReaction === "like" ? "bg-orange-500" : "bg-[#223355]"
                  } text-white`}
                >
                  👍 Like
                </button>

                <button
                  onClick={handleDislike}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition ${
                    userReaction === "dislike" ? "bg-orange-500" : "bg-[#223355]"
                  } text-white`}
                >
                  👎 Dislike
                </button>
              </div>

              {/* Home Button */}
              <button
                onClick={() => {
                  window.location.href = "/";
                }}
                className="mt-6 px-5 py-2 border border-[#223355] rounded-lg hover:bg-orange-500 transition w-max font-semibold"
              >
                ← Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoviePage;