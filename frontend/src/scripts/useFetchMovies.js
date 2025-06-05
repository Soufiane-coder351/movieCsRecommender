import { useEffect, useState } from 'react';
import axios from 'axios';

function useFetchMovies() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    axios
      .get('http://localhost:8000/movies/')
      .then((response) => { 
        // Do something if call succeeded
        setMovies(response.data.movies);
      })
      .catch((e) => {
        // Do something if call failed
        console.log(e);
        setError(e);
      });
  }, []);

  return { movies, error };
}
export default useFetchMovies;