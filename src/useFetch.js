import { useState, useEffect } from "react";
import { routes } from "./helpers/constants";

function useFetch(partialUrl) {
  const url = routes.baseURL + partialUrl;

  const [data, setData] = useState(null);
  const [loading, setloading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setData(data);
        setloading(false);
      } catch (error) {
        setError(error.message);
        setloading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
}

export { useFetch };
