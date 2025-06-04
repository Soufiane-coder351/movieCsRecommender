import React from "react";
import heroBg from "../assets/hero_background.png";
// Mock user data
const user = {
  name: "John Doe",
  email: "user@example.com",
  likedMovies: [
    {
      title: "The Dark Knight",
      image: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
      genre: "Action",
      year: 2008,
    },
    {
      title: "Parasite",
      image: "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
      genre: "Drama",
      year: 2019,
    },
  ],
  dislikedMovies: [
    {
      title: "Pulp Fiction",
      image: "https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
      genre: "Comedy",
      year: 1994,
    },
  ],
};

const SmallMovieCard = ({ movie }) => (
  <div
    className="flex items-center gap-4 bg-[#1f2d45] rounded-lg shadow p-3 mb-3 hover:bg-[#223355] transition cursor-pointer"
    onClick={() =>
      (window.location.href = `/movie/${encodeURIComponent(movie.title)}`)
    }
  >
    <img
      src={movie.image}
      alt={movie.title}
      className="w-16 h-24 object-cover rounded-md shadow"
    />
    <div>
      <div className="font-semibold text-base">{movie.title}</div>
      <div className="text-sm text-gray-300">
        {movie.genre} • {movie.year}
      </div>
    </div>
  </div>
);

const ProfilePage = () => {
  return (
    <div className="bg-gradient-to-br from-[#0b1a33] via-[#0e223f] to-[#08111c] min-h-screen text-white">
      
      {/* Hero-style Top Section */}
      <div
        className="relative h-[50vh] bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center px-6">
          <div className="max-w-5xl mx-auto">
            
            <h1 className="text-4xl md:text-5xl font-bold drop-shadow-md mb-2">
              {user.name}
            </h1>
            <p className="text-lg text-gray-300">{user.email}</p>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-black/30 pointer-events-none" />
      </div>

      {/* Content */}
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Liked Movies */}
          <div className="flex-1 bg-[#18243a] rounded-xl p-5 shadow-lg flex flex-col">
            <h3 className="text-xl font-semibold mb-4 text-orange-400">
              Liked Movies
            </h3>
            <div className="overflow-y-auto" style={{ maxHeight: 400 }}>
              {user.likedMovies.length === 0 ? (
                <div className="text-gray-400 text-center py-10">
                  No liked movies yet.
                </div>
              ) : (
                user.likedMovies.map((movie) => (
                  <SmallMovieCard key={movie.title} movie={movie} />
                ))
              )}
            </div>
          </div>

          {/* Disliked Movies */}
          <div className="flex-1 bg-[#18243a] rounded-xl p-5 shadow-lg flex flex-col">
            <h3 className="text-xl font-semibold mb-4 text-orange-400">
              Disliked Movies
            </h3>
            <div className="overflow-y-auto" style={{ maxHeight: 400 }}>
              {user.dislikedMovies.length === 0 ? (
                <div className="text-gray-400 text-center py-10">
                  No disliked movies yet.
                </div>
              ) : (
                user.dislikedMovies.map((movie) => (
                  <SmallMovieCard key={movie.title} movie={movie} />
                ))
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
