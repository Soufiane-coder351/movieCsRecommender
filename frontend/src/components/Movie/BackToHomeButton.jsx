export default function BackToHomeButton() {
  return (
    <button
      onClick={() => {
        window.location.href = "/";
      }}
      className="mt-6 px-5 py-2 border border-[#223355] rounded-lg hover:bg-orange-500 transition w-max font-semibold"
    >
      ← Home
    </button>
  );
}