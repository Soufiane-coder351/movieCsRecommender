import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import GenreFilter from "../components/GenreFilter";
import MovieCard from "../components/MovieCard";
import HeroSection from "../components/HeroSection";

import useFetchMovies from "../scripts/useFetchMovies";

const Home = () => {
  const [search, setSearch] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 10;

  const { movies, error } = useFetchMovies();
  // get the movies using axios
  

  const filteredMovies = movies.filter((movie) => {
    const matchesSearch = movie.title.toLowerCase().includes(search.toLowerCase());
    const matchesGenre = selectedGenre === "All" || movie.genre === selectedGenre;
    return matchesSearch && matchesGenre;
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [search, selectedGenre]);

  const totalPages = Math.ceil(filteredMovies.length / moviesPerPage);
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = filteredMovies.slice(indexOfFirstMovie, indexOfLastMovie);

  return (
    <div className="bg-[#0b1a33] min-h-screen text-white">
      <HeroSection />

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Title */}
        <h1 className="text-4xl sm:text-5xl font-extrabold text-center mb-10 leading-tight">
          Discover Your <br className="hidden sm:block" /> Next Favorite Film
        </h1>

        {/* Search Bar */}
        <div className="flex justify-center mb-6">
          <input
            type="text"
            placeholder="Search for a film..."
            className="w-full max-w-xl px-5 py-3 rounded-lg bg-[#1f2d45] text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-orange-500 transition"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Genre Filter */}
        <div className="flex justify-center mb-6">
          <GenreFilter selectedGenre={selectedGenre} setSelectedGenre={setSelectedGenre} />
        </div>

        {/* Movies Grid */}
        <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-6" id="movie-grid">

          {currentMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-10 gap-2 items-center flex-wrap">
            {/* Left Arrow */}
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-2 rounded bg-[#1f2d45] hover:bg-orange-500 transition text-white disabled:opacity-40"
              aria-label="Previous Page"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            {/* Page Numbers */}
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
                  currentPage === i + 1
                    ? "bg-orange-500 text-white"
                    : "bg-[#1f2d45] text-white hover:bg-orange-500"
                }`}
              >
                {i + 1}
              </button>
            ))}

            {/* Right Arrow */}
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-2 rounded bg-[#1f2d45] hover:bg-orange-500 transition text-white disabled:opacity-40"
              aria-label="Next Page"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
