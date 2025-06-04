import { useEffect, useState } from 'react';
import axios from 'axios';

function useFetchMovie(id) {
  const [movie, setMovie] = useState([]);
  const [error, setError] = useState(null);

  
  useEffect(() => {
    console.log('useFetchMovie called with id:', id);
    if (!id) return;
    axios
      .get(`http://localhost:8000/movies/${id}`)
      .then((response) => {
        
        console.log(response.data);
        setMovie(response.data);
      })
      .catch((e) => {
        console.error('Error fetching movie:', e);
        setError(e);
      });
  }, []);


  return { movie, error };
}

export default useFetchMovie;