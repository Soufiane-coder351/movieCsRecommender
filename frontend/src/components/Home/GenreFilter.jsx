import React, { useEffect, useState } from "react";
import axios from "axios";

const GenreFilter = ({ selectedGenres, setSelectedGenres }) => {
  const [allGenres, setAllGenres] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/genres")
      .then(res => setAllGenres(res.data.genres || []));
  }, []);

  const handleToggle = (id) => {
    id = Number(id); // Ensure id is a number
    if (selectedGenres.includes(id)) {
      setSelectedGenres(selectedGenres.filter((gid) => gid !== id));
    } else {
      setSelectedGenres([...selectedGenres, id]);
    }
  };

  const handleAll = () => setSelectedGenres([]);

  return (
    <div className="flex gap-2 overflow-x-auto py-2 scrollbar-thin scrollbar-thumb-[#223355] scrollbar-track-transparent">
      <button
        onClick={handleAll}
        className={`px-4 py-2 rounded-full border transition font-semibold whitespace-nowrap ${
          selectedGenres.length === 0
            ? "bg-orange-500 text-white border-orange-500 shadow"
            : "bg-[#1f2d45] text-white border-[#223355] hover:bg-orange-400 hover:text-white"
        }`}
      >
        All
      </button>
      {allGenres.map((genre) => (
        <button
          key={genre.id}
          onClick={() => handleToggle(genre.id)}
          className={`px-4 py-2 rounded-full border transition font-semibold whitespace-nowrap ${
            selectedGenres.includes(Number(genre.id))
              ? "bg-orange-500 text-white border-orange-500 shadow"
              : "bg-[#1f2d45] text-white border-[#223355] hover:bg-orange-400 hover:text-white"
          }`}
        >
          {genre.name}
        </button>
      ))}
    </div>
  );
};

export default GenreFilter;