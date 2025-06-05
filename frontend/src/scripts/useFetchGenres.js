import { useEffect, useState } from 'react';
import axios from 'axios';

function useFetchGenres(ids) {
  const [genres, setGenres] = useState([]);
  const [error, setError] = useState(null);

  // Convert ids to a comma-separated string if it's an array
  const idsstr = Array.isArray(ids) ? ids.join(',') : ids;    
  
  console.log('useFetchGenres ids:', ids, 'idsstr:', idsstr);

  useEffect(() => {
    console.log('useFetchGenres called with id:', idsstr);
    axios
      .get(`http://localhost:8000/genres/multiple/${idsstr}`)
      .then((response) => {
        
        console.log(response.data.genres);
        setGenres(response.data.genres);
      })
      .catch((e) => {
        console.error('Error fetching genres:', e);
        setError(e);
      });
  }, [idsstr]);


  return { genres, error };
}

export default useFetchGenres;