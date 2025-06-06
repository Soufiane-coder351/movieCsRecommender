export default function Pagination({ totalPages, currentPage, setCurrentPage }) {
  if (totalPages <= 1) return null;
  return (
    <div className="flex justify-center mt-10 gap-2 items-center flex-wrap">
      <button
        onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
        disabled={currentPage === 1}
        className="px-3 py-2 rounded bg-[#1f2d45] hover:bg-orange-500 transition text-white disabled:opacity-40"
        aria-label="Previous Page"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      {[...Array(totalPages)].map((_, i) => (
        <button
          key={i}
          onClick={() => setCurrentPage(i + 1)}
          className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
            currentPage === i + 1 ? "bg-orange-500 text-white" : "bg-[#1f2d45] text-white hover:bg-orange-500"
          }`}
        >
          {i + 1}
        </button>
      ))}
      <button
        onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="px-3 py-2 rounded bg-[#1f2d45] hover:bg-orange-500 transition text-white disabled:opacity-40"
        aria-label="Next Page"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}