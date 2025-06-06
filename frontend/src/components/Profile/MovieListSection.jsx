import SmallMovieCard from "./SmallMovieCard";

const MovieListSection = ({ title, movies, emptyText }) => (
  <div className="flex-1 bg-[#18243a] rounded-xl p-5 shadow-lg flex flex-col">
    <h3 className="text-xl font-semibold mb-4 text-orange-400">{title}</h3>
    <div className="overflow-y-auto scrollbar-thin scrollbar-thumb-[#223355] scrollbar-track-[#18243a]" style={{ maxHeight: 400 }}>
      {movies.length === 0 ? (
        <div className="text-gray-400 text-center py-10">{emptyText}</div>
      ) : (
        movies.map((movie) => <SmallMovieCard key={movie.id} movie={movie} />)
      )}
    </div>
  </div>
);

export default MovieListSection;