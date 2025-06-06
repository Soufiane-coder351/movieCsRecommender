import MovieCard from "./MovieCard";

export default function MoviesGrid({ movies }) {
  return (
    <div
      className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-6"
      id="movie-grid"
    >
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}
