import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import useFetch from '../hooks/useFetch';

function RecipesCards() {
  const [recipeCards, setRecipeCards] = useState([]);
  const [recipeCategories, setRecipeCategories] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [button, setButton] = useState(false);
  const [food, setFood] = useState('');
  const [sameButton, setSameButton] = useState('');
  const history = useHistory();
  const { makeFetch } = useFetch();
  // const { searching } = useSearch();
  const magicNumber12 = 12;
  const magicNumber5 = 5;

  useEffect(() => {
    const fetch = async () => {
      if (history.location.pathname === '/meals') {
        const meals = await makeFetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
        setRecipeCards(meals.meals);
        setFood('Meal');
        console.log(recipeCards);
      }
      if (history.location.pathname === '/drinks') {
        const drinks = await makeFetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
        setRecipeCards(drinks.drinks);
        setFood('Drink');
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
    setButton(true);

    if (history.location.pathname === '/meals') {
      const meals = await makeFetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${id}`);
      setFilteredRecipes(meals.meals);
      setFood('Meal');
      setSameButton(id);
    }

    if (history.location.pathname === '/drinks') {
      const drinks = await makeFetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${id}`);
      setFilteredRecipes(drinks.drinks);
      setFood('Drink');
      setSameButton(id);
    }

    if (sameButton === id && button) {
      setButton(false);
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
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ () => setButton(false) }
      >
        All
      </button>
      { button ? filteredRecipes.map((element, index) => (
        index < magicNumber12 && (
          <li
            key={ element[`id${food}`] }
          >
            <Link
              data-testid={ `${index}-recipe-card` }
              to={ `/${food.toLowerCase()}s/${element[`id${food}`]}` }
            >
              <img
                key={ element[`id${food}`] }
                alt={ element[`str${food}`] }
                data-testid={ `${index}-card-img` }
                src={ element[`str${food}Thumb`] }
                style={ { width: '100px' } }
              />
              <p
                data-testid={ `${index}-card-name` }
              >
                {element[`str${food}`]}
              </p>
            </Link>
          </li>
        )
      )) : recipeCards.map((element, index) => (
        index < magicNumber12 && (
          <li
            key={ element[`id${food}`] }
          >
            <Link
              data-testid={ `${index}-recipe-card` }
              to={ `/${food.toLowerCase()}s/${element[`id${food}`]}` }
            >
              <img
                key={ element[`id${food}`] }
                alt={ element[`str${food}`] }
                data-testid={ `${index}-card-img` }
                src={ element[`str${food}Thumb`] }
                style={ { width: '100px' } }
              />
              <p
                data-testid={ `${index}-card-name` }
              >
                {element[`str${food}`]}
              </p>
            </Link>
          </li>
        )
      ))}
    </div>
  );
}

export default RecipesCards;
