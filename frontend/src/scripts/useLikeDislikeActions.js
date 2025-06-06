import { useCallback } from "react";

export default function useLikeDislikeActions({ userId, movieId, userReaction, setUserReaction, setRefreshKey }) {
  const handleLike = useCallback(async () => {
    if (!userId) return;
    if (userReaction === "like") {
      await fetch("http://localhost:3000/ratings", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: Number(userId), movieId: Number(movieId) }),
      });
      setUserReaction(null);
    } else {
      await fetch("http://localhost:3000/ratings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: Number(userId),
          movieId: Number(movieId),
          ratingValue: 1,
        }),
      });
      setUserReaction("like");
    }
    setRefreshKey((k) => k + 1);
  }, [userId, movieId, userReaction, setUserReaction, setRefreshKey]);

  const handleDislike = useCallback(async () => {
    if (!userId) return;
    if (userReaction === "dislike") {
      await fetch("http://localhost:3000/ratings", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: Number(userId), movieId: Number(movieId) }),
      });
      setUserReaction(null);
    } else {
      await fetch("http://localhost:3000/ratings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: Number(userId),
          movieId: Number(movieId),
          ratingValue: -1,
        }),
      });
      setUserReaction("dislike");
    }
    setRefreshKey((k) => k + 1);
  }, [userId, movieId, userReaction, setUserReaction, setRefreshKey]);

  return { handleLike, handleDislike };
}