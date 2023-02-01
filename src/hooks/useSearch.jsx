import { useState } from 'react';

function useSearch() {
  const [searching, setSearching] = useState(false);

  return (searching, setSearching);
}

export default useSearch;
