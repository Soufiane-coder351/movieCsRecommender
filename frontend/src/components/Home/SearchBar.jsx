export default function SearchBar({ search, setSearch }) {
  return (
    <div className="flex justify-center mb-6">
      <input
        type="text"
        placeholder="Search for a film..."
        className="w-full max-w-xl px-5 py-3 rounded-lg bg-[#1f2d45] text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-orange-500 transition"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}