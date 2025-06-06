export default function MovieBadges({ likes, dislikes, date }) {
  return (
    <div className="flex flex-wrap gap-3 text-sm font-medium mt-2">
      <span className="bg-[#223355] px-3 py-1 rounded-full flex items-center gap-1">
        👍 {likes}
      </span>
      <span className="bg-[#223355] px-3 py-1 rounded-full flex items-center gap-1">
        👎 {dislikes}
      </span>
      <span className="bg-[#223355] px-3 py-1 rounded-full">
        {date}
      </span>
    </div>
  );
}