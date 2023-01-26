import React from 'react';

function SearchBar() {
  return (
    <form>
      <label htmlFor="searchBar">
        Ingredient
        <input
          name="searchBar"
          data-testid="search-input"
          type="text"
        />
      </label>
      <label htmlFor="ingredient">
        Ingredient
        <input
          name="ingredient"
          data-testid="ingredient-search-radio"
          type="radio"
        />
      </label>
      <label htmlFor="name">
        Name
        <input
          name="name"
          data-testid="name-search-radio"
          type="radio"
        />
      </label>
      <label htmlFor="frist-letter">
        Frist letter
        <input
          name="frist-letter"
          data-testid="first-letter-search-radio"
          type="radio"
        />
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
      >
        Pesquisar
      </button>
      <button
      // ainda n sei o motivo da existencia desse botaõ
        type="button"
        data-testid="search-top-btn"
      >
        Sla;-;
      </button>
    </form>
  );
}

export default SearchBar;
