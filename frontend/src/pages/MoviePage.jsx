import React, { useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import heroBg from "../assets/hero_background.png";
import useFetchMovie from "../scripts/useFetchMovie";


const MoviePage = () => {
  const { id } = useParams();
  
  
  const { movie, error } = useFetchMovie(id);


  const [userReaction, setUserReaction] = useState(null);
  const [likes, setLikes] = useState(12);
  const [dislikes, setDislikes] = useState(2);

  const handleLike = () => {
    if (userReaction === "like") {
      setUserReaction(null);
      setLikes(likes - 1);
    } else {
      if (userReaction === "dislike") setDislikes(dislikes - 1);
      setUserReaction("like");
      setLikes(likes + 1);
    }
  };

  const handleDislike = () => {
    if (userReaction === "dislike") {
      setUserReaction(null);
      setDislikes(dislikes - 1);
    } else {
      if (userReaction === "like") setLikes(likes - 1);
      setUserReaction("dislike");
      setDislikes(dislikes + 1);
    }
  };



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

              <div className="flex flex-wrap gap-3 text-sm font-medium">
                <span className="bg-orange-500 px-3 py-1 rounded-full">{movie.genre}</span>
                <span className="bg-[#223355] px-3 py-1 rounded-full">{movie.date}</span>
                <span className="bg-[#223355] px-3 py-1 rounded-full text-yellow-300">
                  ⭐ 9 / 10
                </span>
              </div>

              <p>
                <span className="font-semibold">Director:</span> soufien el mazlouzi
              </p>
              <p>
                <span className="font-semibold">maoura el fathi, adam kodja, soufien el mazlouzi hh </span>
              </p>
              <p>
                <span className="font-semibold">Release Date:</span> {movie.date}
              </p>

              <a
                href={movie.imdbLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-400 hover:text-orange-500 underline font-medium"
              >
                → View on IMDb
              </a>

              {/* Like/Dislike */}
              <div className="flex gap-4 mt-4">
                <button
                  onClick={handleLike}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition ${
                    userReaction === "like" ? "bg-orange-500" : "bg-[#223355]"
                  } text-white`}
                >
                  👍 {likes}
                </button>

                <button
                  onClick={handleDislike}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition ${
                    userReaction === "dislike" ? "bg-orange-500" : "bg-[#223355]"
                  } text-white`}
                >
                  👎 {dislikes}
                </button>
              </div>

              {/* Back */}
              <button
                onClick={() => window.history.back()}
                className="mt-6 px-5 py-2 border border-[#223355] rounded-lg hover:bg-orange-500 transition w-max font-semibold"
              >
                ← Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoviePage;
