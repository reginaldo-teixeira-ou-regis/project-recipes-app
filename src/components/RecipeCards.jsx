import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import AppContext from '../context/AppContext';
import useFetch from '../hooks/useFetch';
import '../css/recipes.css';

function RecipesCards() {
  const { makeFetch } = useFetch();
  const history = useHistory();
  const { recipesFound, setRecipesFound } = useContext(AppContext);
  const [recipeCategories, setRecipeCategories] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [button, setButton] = useState(false);
  const [food, setFood] = useState('');
  const [sameButton, setSameButton] = useState('');
  const magicNumber12 = 12;
  const magicNumber5 = 5;

  useEffect(() => {
    const fetch = async () => {
      if (history.location.pathname === '/meals') {
        const meals = await makeFetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
        const catMeals = await makeFetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
        setRecipesFound(meals.meals);
        setRecipeCategories(catMeals.meals);
        setFood('Meal');
      }
      if (history.location.pathname === '/drinks') {
        const drinks = await makeFetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
        const catDrinks = await makeFetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
        setRecipesFound(drinks.drinks);
        setRecipeCategories(catDrinks.drinks);
        setFood('Drink');
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
    <>
      { recipeCategories.map((element, index) => (
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

      <div
        className="recipes"
      >
        { button ? filteredRecipes.map((element, index) => (
          index < magicNumber12 && (
            <li
              className="columns"
              style={ { listStyleType: 'none' } }
              key={ element[`id${food}`] }
            >
              <Link
                className="column"
                data-testid={ `${index}-recipe-card` }
                to={ `/${food.toLowerCase()}s/${element[`id${food}`]}` }
              >
                <img
                  key={ element[`id${food}`] }
                  alt={ element[`str${food}`] }
                  data-testid={ `${index}-card-img` }
                  src={ element[`str${food}Thumb`] }
                  style={ { width: '120px' } }
                />
                <p
                  data-testid={ `${index}-card-name` }
                >
                  {element[`str${food}`]}
                </p>
              </Link>
            </li>
          )
        ))
          : recipesFound.map((element, index) => (
            index < magicNumber12 && (
              <ul
                key={ element[`id${food}`] }
              >
                <li
                  className="columns"
                  style={ { listStyleType: 'none' } }
                >
                  <Link
                    data-testid={ `${index}-recipe-card` }
                    to={ `/${food.toLowerCase()}s/${element[`id${food}`]}` }
                  >
                    <img
                      className="recipesimg"
                      key={ element[`id${food}`] }
                      alt={ element[`str${food}`] }
                      data-testid={ `${index}-card-img` }
                      src={ element[`str${food}Thumb`] }
                    />
                    <p
                      className="recipename"
                      data-testid={ `${index}-card-name` }
                    >
                      {element[`str${food}`]}
                    </p>
                  </Link>
                </li>
              </ul>
            )
          )) }
      </div>
    </>
  );
}

export default RecipesCards;
