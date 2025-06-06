export default function MoviePoster({ src, alt }) {
  return (
    <div className="md:w-1/3 flex justify-center items-center p-4 bg-[#101c2c] hover:brightness-110 transition">
      <img
        src={src}
        alt={alt}
        className="rounded-xl shadow-lg max-h-96 object-cover"
      />
    </div>
  );
}