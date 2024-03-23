import { useState, useEffect } from "react";
import axios from "axios";

interface UseFetchOptions<T> {
  url: string | null;
  transform?: (data: any) => T[]; // It can accept any, it's controlled yet
}

interface FetchResult<T> {
  data: T[];
  isLoading: boolean;
  error: string | null;
}

function useFetch<T>({ url, transform }: UseFetchOptions<T>): FetchResult<T> {
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!url) {
      setIsLoading(false);
      setData([]);
      setError(null);

      return;
    }

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(url);
        const result = transform ? transform(response.data) : response.data;

        setData(result);
      } catch (error) {
        setError((error as Error).message || "An unexpected error occurred");
        console.error("Failed to fetch data:", (error as Error).message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url, transform]);

  return { data, isLoading, error };
}

export default useFetch;
