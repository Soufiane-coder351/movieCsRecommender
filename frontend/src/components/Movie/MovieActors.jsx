export default function MovieActors({ actors }) {
  if (!actors || actors.length === 0) return null;
  return (
    <div className="mt-2">
      <p className="text-orange-300 font-semibold mb-1">Popular actors</p>
      <div className="flex flex-wrap gap-2">
        {actors.map((actor, idx) => (
          <span
            key={idx}
            className="bg-[#2d3e50] text-orange-200 px-3 py-1 rounded-full text-sm font-medium shadow"
          >
            {actor}
          </span>
        ))}
      </div>
    </div>
  );
}