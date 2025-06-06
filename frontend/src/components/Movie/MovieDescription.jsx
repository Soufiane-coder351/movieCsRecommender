export default function MovieDescription({ description }) {
  if (!description) return null;
  return (
    <div className="mt-2">
      <h2 className="text-lg font-semibold mb-1 text-orange-400">Description</h2>
      <p className="text-base text-gray-200">{description}</p>
    </div>
  );
}