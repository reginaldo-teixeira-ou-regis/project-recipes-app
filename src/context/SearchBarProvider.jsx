import React, { createContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import useFetch from '../hooks/usefetch';

export const SearchBarContext = createContext();

function SearchBarProvider({ children }) {
  const [search, setSearch] = useState('');
  const [radios, setRadios] = useState('ingredient');
  const values = useMemo(() => ({
    search,
    setSearch,
    radios,
    setRadios,
  }), [search, radios]);
  const handleClick = () => {
    /// const makeFech = useFetch();
  };
  return (
    <SearchBarContext.Provider value={ values }>
      {children}
    </SearchBarContext.Provider>
  );
}

SearchBarProvider.propTypes = { children: PropTypes.instanceOf(Object).isRequired };

export default SearchBarProvider;
