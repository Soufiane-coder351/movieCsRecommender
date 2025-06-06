import { useEffect, useState } from "react";
import axios from "axios";

export default function useMovieReactions(movieId, refreshKey = 0) {
  const [counts, setCounts] = useState({ likes: 0, dislikes: 0 });

  useEffect(() => {
    if (!movieId) return;
    axios
      .get(`http://localhost:3000/ratings/counts/${movieId}`)
      .then(res => setCounts(res.data))
      .catch(() => setCounts({ likes: 0, dislikes: 0 }));
  }, [movieId, refreshKey]);

  return counts;
}