import { useEffect, useState } from 'react';
import axios from 'axios';

function useFetchGenre(id) {
  const [genre, setGenre] = useState("");
  const [error, setError] = useState(null);

  
  useEffect(() => {
    console.log('useFetchGenre called with id:', id);
    axios
      .get(`http://localhost:3000/genres/${id}`)
      .then((response) => {
        
        console.log(response.data.name);
        setGenre(response.data.name);
      })
      .catch((e) => {
        console.error('Error fetching genre:', e);
        setError(e);
      });
  }, []);


  return { genre, error };
}

export default useFetchGenre;