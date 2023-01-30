import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
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
  const handleClick = async (id) => {
    if (history.location.pathname === '/meals') {
      const meals = await makeFetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${id}`);
      const filteredMeals = meals.meals;
      console.log(filteredMeals);
      return filteredMeals.map((element, index) => (
        index < magicNumber12 && (
          <li
            key={ element.idMeal }
            data-testid={ `${index}-recipe-card` }
          >
            <Link to={ `/meals/${element.idMeal}` }>
              <img
                key={ element.idMeal }
                alt={ element.strMeal }
                data-testid={ `${index}-card-img` }
                src={ element.strMealThumb }
                style={ { width: '100px' } }
              />
              <p
                key={ element.idMeal }
                data-testid={ `${index}-card-name` }
              >
                {element.strMeal}
              </p>
            </Link>
          </li>
        )
      ));
    }
    if (history.location.pathname === '/drinks') {
      const drinks = await makeFetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${id}`);
      const filteredDrinks = drinks.drinks;
      console.log(filteredDrinks);
      return filteredDrinks.map((element, index) => (
        index < magicNumber12 && (
          <li
            key={ element.idDrink }
            data-testid={ `${index}-recipe-card` }
          >
            <Link to={ `/drinks/${element.idDrink}` }>
              <img
                key={ element.idDrink }
                alt={ element.strDrink }
                data-testid={ `${index}-card-img` }
                src={ element.strDrinkThumb }
                style={ { width: '100px' } }
              />
              <p
                key={ element.idDrink }
                data-testid={ `${index}-card-name` }
              >
                {element.strDrink}
              </p>
            </Link>
          </li>
        )
      ));
    }
  };
  return (
    <div>
      {recipeCategories.map((element, index) => (
        index < magicNumber5 && (
          <button
            key={ element.id }
            type="button"
            data-testid={ `${element.strCategory}-category-filter` }
            onClick={ () => handleClick(element.strCategory) }
          >
            {element.strCategory}

          </button>
        )
      ))}
      {food
        ? recipeCards.map((element, index) => (
          index < magicNumber12 && (
            <li
              key={ element.idMeal }
              data-testid={ `${index}-recipe-card` }
            >
              <Link to={ `/meals/${element.idMeal}` }>
                <img
                  key={ element.idMeal }
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
              </Link>
            </li>
          )
        ))
        : recipeCards.map((element, index) => (
          index < magicNumber12 && (
            <li
              key={ element.idDrink }
              data-testid={ `${index}-recipe-card` }
            >
              <Link to={ `/drinks/${element.idDrink}` }>
                <img
                  key={ element.idDrink }
                  alt={ element.strDrink }
                  data-testid={ `${index}-card-img` }
                  src={ element.strDrinkThumb }
                  style={ { width: '100px' } }
                />
                <p
                  key={ element.idDrink }
                  data-testid={ `${index}-card-name` }
                >
                  {element.strDrink}
                </p>
              </Link>
            </li>
          )
        ))}
    </div>
  );
}

export default RecipesCards;
