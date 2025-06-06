import { useEffect, useState } from "react";
import axios from "axios";

export default function useUserMovieReaction(userId, movieId) {
  const [userReaction, setUserReaction] = useState(null);

  useEffect(() => {
    if (!userId || !movieId) return;
    axios
      .get(`http://localhost:3000/ratings/${userId}/${movieId}`)
      .then((res) => {
        if (res.data.rating === 1) setUserReaction("like");
        else if (res.data.rating === -1) setUserReaction("dislike");
        else setUserReaction(null);
      })
      .catch(() => setUserReaction(null));
  }, [userId, movieId]);

  return [userReaction, setUserReaction];
}