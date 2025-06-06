export default function MovieKeywords({ keywords }) {
  if (!keywords || keywords.length === 0) return null;
  return (
    <div className="mt-2 flex flex-wrap gap-2">
      {keywords.map((kw, idx) => (
        <span
          key={idx}
          className="bg-[#223355] text-orange-300 px-2 py-1 rounded-full text-xs font-medium"
        >
          #{kw}
        </span>
      ))}
    </div>
  );
}