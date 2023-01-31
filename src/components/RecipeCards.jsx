import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import useFetch from '../hooks/useFetch';

function RecipesCards() {
  const [recipeCards, setRecipeCards] = useState([]);
  const [food, setFood] = useState(false);
  const history = useHistory();
  const { makeFetch } = useFetch();
  const magicNumber = 12;

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
    };
    fetch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {food
        ? recipeCards.map((element, index) => (
          index < magicNumber && (
            <li
              key={ element.id }
              data-testid={ `${index}-recipe-card` }
            >
              <img
                alt={ element.strMeal }
                data-testid={ `${index}-card-img` }
                src={ element.strMealThumb }
                style={ { width: '100px' } }
              />
              <p
                data-testid={ `${index}-card-name` }
              >
                {element.strMeal}

              </p>
              <button
                type="button"
                data-testid={ `${element.categoryName}-category-filter` }
              />
            </li>
          )
        ))
        : recipeCards.map((element, index) => (
          index < magicNumber && (
            <li
              key={ element.id }
              data-testid={ `${index}-recipe-card` }
            >
              <img
                alt={ element.strDrink }
                data-testid={ `${index}-card-img` }
                src={ element.strDrinkThumb }
                style={ { width: '100px' } }
              />
              <p
                data-testid={ `${index}-card-name` }
              >
                {element.strDrink}

              </p>
              <button type="button" data-testid={ `${categoryName}-category-filter` } />
            </li>
          )
        ))}
    </div>
  );
}

export default RecipesCards;
