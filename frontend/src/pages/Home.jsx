import React from 'react'

import { useState } from "react";
import { movies } from "../data/movies";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import GenreFilter from "../components/GenreFilter";
import MovieCard from "../components/MovieCard";
import HeroSection from '../components/HeroSection';


const Home = () => {
  const [search, setSearch] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");

  const filteredMovies = movies.filter((movie) => {
    const matchesSearch = movie.title.toLowerCase().includes(search.toLowerCase());
    const matchesGenre = selectedGenre === "All" || movie.genre === selectedGenre;
    return matchesSearch && matchesGenre;
  });


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

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mt-6">
          {filteredMovies.map((movie) => (
            <MovieCard key={movie.title} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home