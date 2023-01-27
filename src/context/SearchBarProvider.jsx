import React, { createContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import useFetch from '../hooks/usefetch';

export const SearchBarContext = createContext();
function SearchBarProvider({ children }) {
  const [search, setSearch] = useState('');
  const [radios, setRadios] = useState('ingredient');
  // const [url, setUrl] = useState('');
  const { makeFetch } = useFetch();
  const handleClick = async () => {
    switch (radios) {
    case 'ingredient':
      await makeFetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${search}`);
      break;
    case 'Name':
      await makeFetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${search}`);
      break;
    case 'First letter':
      await makeFetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${search}`);
      break;
    default:
      break;
    }
  };
  console.log(handleClick);
  const values = useMemo(() => ({
    search,
    setSearch,
    radios,
    setRadios,
    handleClick,
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [search, radios]);
  return (
    <SearchBarContext.Provider value={ values }>
      {children}
    </SearchBarContext.Provider>
  );
}
SearchBarProvider.propTypes = { children: PropTypes.instanceOf(Object).isRequired };
export default SearchBarProvider;
