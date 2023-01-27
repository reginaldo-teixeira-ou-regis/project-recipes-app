import React, { useContext } from 'react';
import { SearchBarContext } from '../context/SearchBarProvider';

export function SearchBar() {
  const { radios, setRadios, handleClick } = useContext(SearchBarContext);
  return (
    <form>
      <label htmlFor="ingredient">
        <input
          name="ingredient"
          data-testid="ingredient-search-radio"
          type="radio"
          value="ingredient"
          checked={ radios === 'ingredient' }
          onChange={ (e) => setRadios(e.target.value) }
        />
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
        First letter
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ handleClick }
      >
        Pesquisar
      </button>
    </form>
  );
}
