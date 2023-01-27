import React, { createContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import useFetch from '../hooks/usefetch';

export const SearchBarContext = createContext();

function SearchBarProvider({ children }) {
  const [search, setSearch] = useState('');
  const [radios, setRadios] = useState('ingredient');
  const [url, setUrl] = useState('');
  const { makeFetch } = useFetch();

  const handleClick = () => {
    switch (radios) {
    case 'ingredient':
      return setUrl(`ttps://www.themealdb.com/api/json/v1/1/filter.php?i=${search}`);
    case 'Name':
      return setUrl(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`);
    case 'First letter':
      return setUrl(`https://www.themealdb.com/api/json/v1/1/search.php?f=${search}`);
    default:
      break;
    }
    const requestApi = makeFetch(url);
    console.log(requestApi);
  };
  const values = useMemo(() => ({
    search,
    setSearch,
    radios,
    setRadios,
    handleClick,
  }), [search, radios]);
  return (
    <SearchBarContext.Provider value={ values }>
      {children}
    </SearchBarContext.Provider>
  );
}

SearchBarProvider.propTypes = { children: PropTypes.instanceOf(Object).isRequired };

export default SearchBarProvider;
