import { useState, useEffect } from "react";

function useFetch(partialUrl) {
  const baseUrl = "http://localhost:8000";
  const url = baseUrl + partialUrl;

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
