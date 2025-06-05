import { useEffect, useState } from "react";
import axios from "axios";

function useFetchUser(userId) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) return;
    axios
      .get(`http://localhost:3000/users/${userId}`)
      .then((res) => setUser(res.data.user))
      .catch((err) => setError(err));
  }, [userId]);

  return { user, error };
}

export default useFetchUser;