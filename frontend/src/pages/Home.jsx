import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import GenreFilter from "../components/Home/GenreFilter";
import HeroSection from "../components/HeroSection";
import useFetchMovies from "../scripts/useFetchMovies";
import SearchBar from "../components/Home/SearchBar";
import MoviesGrid from "../components/Home/MoviesGrid";
import Pagination from "../components/Home/Pagination";

const Home = () => {
  const [search, setSearch] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 10;

  const { movies, error } = useFetchMovies();

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

        <SearchBar search={search} setSearch={setSearch} />

        {/* <div className="flex justify-center mb-6">
          <GenreFilter selectedGenre={selectedGenre} setSelectedGenre={setSelectedGenre} />
        </div> */}

        <MoviesGrid movies={currentMovies} />

        <Pagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
      </div>
    </div>
  );
};

export default Home;