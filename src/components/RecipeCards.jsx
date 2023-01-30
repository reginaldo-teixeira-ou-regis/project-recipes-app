import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import useFetch from '../hooks/useFetch';

function RecipesCards() {
  const [recipeCards, setRecipeCards] = useState([]);
  const [recipeCategories, setRecipeCategories] = useState([]);
  const [food, setFood] = useState(false);
  const history = useHistory();
  const { makeFetch } = useFetch();
  const magicNumber12 = 12;
  const magicNumber5 = 5;

  useEffect(() => {
    const fetch = async () => {
      if (history.location.pathname === '/meals') {
        const meals = await makeFetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
        setRecipeCards(meals.meals);
        setFood(true);
      }
      if (history.location.pathname === '/drinks') {
        const drinks = await makeFetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
        setRecipeCards(drinks.drinks);
      }
      if (history.location.pathname === '/meals') {
        const catMeals = await makeFetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
        setRecipeCategories(catMeals.meals);
      }
      if (history.location.pathname === '/drinks') {
        const catDrinks = await makeFetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
        setRecipeCategories(catDrinks.drinks);
      }
    };
    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {recipeCategories.map((element, index) => (
        index < magicNumber5 && (
          <button
            key={ element.id }
            type="button"
            data-testid={ `${element.strCategory}-category-filter` }
            onClick={ () => {} }
          >
            {element.strCategory}

          </button>
        )
      ))}
      {food
        ? recipeCards.map((element, index) => (
          index < magicNumber12 && (
            <li
              key={ element.id }
              data-testid={ `${index}-recipe-card` }
            >
              <img
                key={ element.id }
                alt={ element.strMeal }
                data-testid={ `${index}-card-img` }
                src={ element.strMealThumb }
                style={ { width: '100px' } }
              />
              <p
                key={ element.id }
                data-testid={ `${index}-card-name` }
              >
                {element.strMeal}

              </p>
            </li>
          )
        ))
        : recipeCards.map((element, index) => (
          index < magicNumber12 && (
            <li
              key={ element.id }
              data-testid={ `${index}-recipe-card` }
            >
              <img
                key={ element.id }
                alt={ element.strDrink }
                data-testid={ `${index}-card-img` }
                src={ element.strDrinkThumb }
                style={ { width: '100px' } }
              />
              <p
                key={ element.id }
                data-testid={ `${index}-card-name` }
              >
                {element.strDrink}

              </p>
            </li>
          )
        ))}
    </div>
  );
}

export default RecipesCards;
