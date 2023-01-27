import React, { useContext } from 'react';
import { SearchBarContext } from '../context/SearchBarProvider';

function SearchBar() {
  const {
    search,
    setSearch,
    radios,
    setRadios,
    handleClick } = useContext(SearchBarContext);
  return (
    <form>
      <label htmlFor="searchBar">
        <input
          name="searchBar"
          data-testid="search-input"
          type="text"
          value={ search }
          onChange={ (e) => setSearch(e.target.value) }
        />
      </label>
      <label htmlFor="ingredient">
        <input
          name="ingredient"
          data-testid="ingredient-search-radio"
          type="radio"
          value="ingredient"
          checked={ radios === 'ingredient' }
          onChange={ (e) => setRadios(e.target.value) }
        />
        {' '}
        Ingredient
      </label>
      <label htmlFor="name">
        <input
          name="name"
          data-testid="name-search-radio"
          type="radio"
          value="name"
          checked={ radios === 'name' }
          onChange={ (e) => setRadios(e.target.value) }
        />
        {' '}
        Name
      </label>
      <label htmlFor="first-letter">
        <input
          name="first-letter"
          data-testid="first-letter-search-radio"
          type="radio"
          value="first letter"
          checked={ radios === 'first letter' }
          onChange={ (e) => setRadios(e.target.value) }
        />
        Frist letter
      </label>
      <button
        type="button"
        data-testid="search-top-btn"
        onClick={ handleClick }
      >
        Pesquisar
      </button>
    </form>
  );
}

export default SearchBar;
