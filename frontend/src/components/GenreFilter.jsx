import React from 'react'

const GenreFilter = ({  selectedGenre, setSelectedGenre }) => {
  const genres = ["All", "Action", "Comedy", "Drama", "Sci-Fi"];


  return (
    <div className="flex gap-3 mt-4 mb-6">
      {genres.map((genre) => (
        <button
          key={genre}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            selectedGenre === genre
              ? "bg-orange-500 text-white"
              : "bg-[#1f2d45] text-white"
          }`}
          onClick={() => setSelectedGenre(genre)}
        >
          {genre}
        </button>
      ))}
    </div>
  );
}

export default GenreFilter