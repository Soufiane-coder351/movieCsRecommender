import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import heroBg from "../assets/hero_background.png";
import useFetchUser from "../scripts/useFetchUser";
import MovieListSection from "../components/Profile/MovieListSection";

const ProfilePage = () => {
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) {
      window.location.href = "/login";
    }
  }, [userId]);

  const { user, error } = useFetchUser(userId);
  const [likedMovies, setLikedMovies] = useState([]);
  const [dislikedMovies, setDislikedMovies] = useState([]);

  useEffect(() => {
    if (!userId) return;
    fetch(`http://localhost:3000/ratings/liked/${userId}`)
      .then(res => res.json())
      .then(data => setLikedMovies(data.movies || []));
    fetch(`http://localhost:3000/ratings/disliked/${userId}`)
      .then(res => res.json())
      .then(data => setDislikedMovies(data.movies || []));
  }, [userId]);

  const handleLogout = () => {
    localStorage.removeItem("userId");
    window.location.href = "/login";
  };

  if (!userId) return null;

  if (error || user == null) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-400 bg-[#0b1a33]">
        Error fetching user profile.
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-[#0b1a33] via-[#0e223f] to-[#08111c] min-h-screen text-white">
      {/* Hero Section */}
      <div
        className="relative h-[50vh] bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center px-6">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold drop-shadow-md mb-2">
                {user.name}
              </h1>
              <p className="text-lg text-gray-300">{user.email}</p>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-black/30 pointer-events-none" />
      </div>

      {/* Content */}
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row gap-8">
          <MovieListSection
            title="Liked Movies"
            movies={likedMovies}
            emptyText="No liked movies yet."
          />
          <MovieListSection
            title="Disliked Movies"
            movies={dislikedMovies}
            emptyText="No disliked movies yet."
          />
        </div>
        <div className="mt-12 flex justify-center">
          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-[#223355] hover:bg-orange-500 transition rounded-lg text-white font-semibold shadow-md"
          >
            Log out
          </button>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;