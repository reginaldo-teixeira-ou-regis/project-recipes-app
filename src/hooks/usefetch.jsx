import { useState } from 'react';

function useFetch() {
  const [isLoading, setIsLoading] = useState(false);
  const makeFetch = async (url) => {
    try {
      setIsLoading(true);
      const response = await fetch(url);
      const json = response.json();
      return json;
    } catch (err) {
      return err;
    } finally { setIsLoading(false); }
  };
  return { makeFetch, isLoading };
}
export default useFetch;
