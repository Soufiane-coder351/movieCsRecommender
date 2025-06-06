export default function MovieGenres({ genres }) {
  return (
    <div className="flex flex-wrap gap-3 text-sm font-medium">
      {genres.map(
        (name, idx) =>
          name && (
            <span key={idx} className="bg-orange-500 px-3 py-1 rounded-full">
              {name}
            </span>
          )
      )}
    </div>
  );
}