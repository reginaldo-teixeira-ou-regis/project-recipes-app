import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

export default function SearchBar() {
  const { handleChange, searchSelected, handleClick } = useContext(AppContext);

  return (
    <form>
      <input
        type="text"
        placeholder="Search"
        name="typeSearch"
        data-testid="search-input"
        onChange={ handleChange }
        value={ searchSelected.typeSearch }
      />
      <div>
        <label htmlFor="ingredient">
          Ingredients
          <input
            type="radio"
            data-testid="ingredient-search-radio"
            name="searchSelected"
            id="ingredient"
            value="ingredient"
            onChange={ handleChange }
          />
        </label>

        <label htmlFor="name">
          Name
          <input
            type="radio"
            data-testid="name-search-radio"
            name="searchSelected"
            id="name"
            value="name"
            onChange={ handleChange }
          />
        </label>

        <label htmlFor="First letter">
          First Letter
          <input
            type="radio"
            data-testid="first-letter-search-radio"
            name="searchSelected"
            id="First letter"
            value="letter"
            onChange={ handleChange }
          />
        </label>
      </div>
      <div>
        <button
          type="button"
          data-testid="exec-search-btn"
          onClick={ handleClick }
        >
          Search
        </button>
      </div>
    </form>
  );
}
