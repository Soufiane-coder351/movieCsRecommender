export default function LikeDislikeButtons({
  userReaction,
  handleLike,
  handleDislike,
}) {
  return (
    <div className="flex gap-4 mt-4">
      <button
        onClick={handleLike}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition ${
          userReaction === "like" ? "bg-orange-500" : "bg-[#223355]"
        } text-white`}
      >
        👍 Like
      </button>
      <button
        onClick={handleDislike}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition ${
          userReaction === "dislike" ? "bg-orange-500" : "bg-[#223355]"
        } text-white`}
      >
        👎 Dislike
      </button>
    </div>
  );
}