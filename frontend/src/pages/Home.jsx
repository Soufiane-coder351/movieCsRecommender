import React from 'react'

import { useState, useEffect } from "react";
import { movies } from "../data/movies";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import GenreFilter from "../components/GenreFilter";
import MovieCard from "../components/MovieCard";
import HeroSection from '../components/HeroSection';


const Home = () => {
  const [search, setSearch] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 8;

  const filteredMovies = movies.filter((movie) => {
    const matchesSearch = movie.title.toLowerCase().includes(search.toLowerCase());
    const matchesGenre = selectedGenre === "All" || movie.genre === selectedGenre;
    return matchesSearch && matchesGenre;
  });

  // Reset to page 1 when filters/search change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, selectedGenre]);

  const totalPages = Math.ceil(filteredMovies.length / moviesPerPage);
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = filteredMovies.slice(indexOfFirstMovie, indexOfLastMovie);


  return (
    <div className="bg-[#0b1a33] min-h-screen text-white ">
      <HeroSection />
      <div className="w-full px-4 py-10">
        <h1 className="text-4xl font-bold text-center mb-6">
          Discover Your <br /> Next Favorite Film
        </h1>

        <div className="flex justify-center">
          <input
            type="text"
            placeholder="Search for a film..."
            className="w-full max-w-xl px-5 py-3 rounded-lg bg-[#1f2d45] text-white placeholder-gray-400 outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex justify-center">
          <GenreFilter selectedGenre={selectedGenre} setSelectedGenre={setSelectedGenre} />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mt-6" id="movie-grid">
          {currentMovies.map((movie) => (
            <MovieCard key={movie.title} movie={movie} />
          ))}
        </div>
        {/* Pagination controls below the grid */}
        {totalPages > 1 && (
        <div className="flex justify-center mt-8 gap-2 items-center">
          {/* Left Arrow */}
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-2 rounded bg-[#1f2d45] text-white disabled:opacity-50 flex items-center justify-center"
            aria-label="Previous Page"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          {/* Page Numbers */}
          {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-4 py-2 rounded 
              ${currentPage === i + 1
                ? "bg-orange-500 text-white"
                : "bg-[#1f2d45] text-white hover:bg-orange-500 hover:text-white"}
              transition-all duration-200`}
          >
            {i + 1}
          </button>
        ))}
          {/* Right Arrow */}
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-2 rounded bg-[#1f2d45] text-white disabled:opacity-50 flex items-center justify-center"
            aria-label="Next Page"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}
      </div>
    </div>
  );
}

export default Home