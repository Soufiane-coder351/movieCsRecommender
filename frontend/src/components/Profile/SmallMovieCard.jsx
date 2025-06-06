import useFetchGenre from "../../scripts/useFetchGenre";

const SmallMovieCard = ({ movie }) => (
  <div
    className="flex items-center gap-4 bg-[#1f2d45] rounded-lg shadow p-3 mb-3 hover:bg-[#223355] transition cursor-pointer"
    onClick={() => (window.location.href = `/movie/${movie.id}`)}
  >
    <img
      src={movie.poster_path || movie.image}
      alt={movie.title}
      className="w-16 h-24 object-cover rounded-md shadow"
    />
    <div>
      <div className="font-semibold text-base">{movie.title}</div>
      <div className="text-sm text-gray-300">
        {useFetchGenre(movie.genre[0]).genre}{" "}
        {movie.year ? `• ${movie.year}` : ""}
      </div>
    </div>
  </div>
);

export default SmallMovieCard;