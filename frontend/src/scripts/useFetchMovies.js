import { useEffect, useState } from 'react';
import axios from 'axios';

function useFetchMovies() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  const [userId, setUserId] = useState(localStorage.getItem("userId"));

  useEffect(() => {
    const handleStorage = () => setUserId(localStorage.getItem("userId"));
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  useEffect(() => {

    async function fetchMovies() {
      try {
        let movieIds = [];
        let movieList = [];

        if (userId) {
          // Try to get recommendations
          const recRes = await axios.get(`http://localhost:8000/recommendations/${userId}`);
          movieIds = (recRes.data.recommendations || []).map(
            rec => typeof rec === "object" ? rec.id : rec
          );
        } else {
          // Get top rated
          const topRes = await axios.get(`http://localhost:8000/top_rated_movies`);
          movieIds = (topRes.data.top_rated_movies || []).map(
            rec => typeof rec === "object" ? rec.id : rec
          );
        }

        // If no recommendations/top-rated, fallback to all movies
        if (!movieIds || movieIds.length === 0) {
          const allRes = await axios.get(`http://localhost:3000/movies/`);
          setMovies(allRes.data.movies || []);
          return;
        }

        // Fetch each movie object by id in parallel
        const moviePromises = movieIds.map(id =>
          axios.get(`http://localhost:3000/movies/${id}`).then(res => res.data)
        );
        movieList = await Promise.all(moviePromises);
        setMovies(movieList);
      } catch (e) {
        setError(e);
      }
    }

    fetchMovies();
  }, [userId]); // re-run if user logs in/out

  return { movies, error };
}

export default useFetchMovies;