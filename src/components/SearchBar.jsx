import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import AppContext from '../context/AppContext';

export default function SearchBar() {
  const { handleChange, searchSelected, mealsAPI,
    drinksAPI, meals, drinks } = useContext(AppContext);
  const history = useHistory();
  const requestApiByTitl = async () => {
    if (history.location.pathname === '/meals') {
      mealsAPI();
    }
    if (history.location.pathname === '/drinks') {
      drinksAPI();
    }
  };

  useEffect(() => {
    if (meals.length === 1) {
      const idMeals = meals[0].idMeal;
      history.push(`/meals/${idMeals}`);
    }
    if (drinks.length === 1) {
      const idDrinks = drinks[0].idDrink;
      history.push(`/drinks/${idDrinks}`);
    }
  }, [meals, drinks]);

  // console.log(recipesFound);
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
          onClick={ () => requestApiByTitl() }
        >
          Search
        </button>
      </div>
    </form>
  );
}
