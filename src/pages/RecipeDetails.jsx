/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import useFetch from '../hooks/useFetch';

function RecipeDetails() {
  const { makeFetch } = useFetch();
  const [meals, setMeals] = useState([]);
  const [drink, setDrink] = useState([]);
  const history = useHistory();
  const match = useRouteMatch();
  const { location: { pathname } } = history;
  const { params: { id } } = match;

  useEffect(() => {
    const fetch = async () => {
      if (pathname.includes('/meals')) {
        const mealsReq = await makeFetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        setMeals(mealsReq);
      }
      if (pathname.includes('/drinks')) {
        const drinkReq = await makeFetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
        setDrink(drinkReq);
      }
    };
    fetch();
  }, []);
  return (
    <>
      {(pathname.includes('/meals') && (
        meals.map((el, i) => (
          <div key={ i }>
            <img src={ el } alt={ el } data-testid="recipe-photo" />
            <h1 data-testid="recipe-title">{el}</h1>
            <p data-testid="recipe-category">{el}</p>
            <ul data-testid={ `${i}-ingredient-name-and-measure` }>
              <li>{el}</li>
            </ul>
            <p data-testid="instructions">{el}</p>
            <iframe
              width="500"
              height="500"
              src={ el }
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;
               picture-in-picture"
              allowFullScreen
              title="Embedded youtube"
              data-testid="video"
            />
          </div>
        ))
      ))}
      {(pathname.includes('/drinks') && (
        drink.map((el, i) => (
          <div key={ i }>
            <img src={ el } alt={ el } data-testid="recipe-photo" />
            <h1 data-testid="recipe-title">{el}</h1>
            <p data-testid="recipe-category">{el}</p>
            <ul data-testid={ `${i}-ingredient-name-and-measure` }>
              <li>{el}</li>
            </ul>
            <p data-testid="instructions">{el}</p>
          </div>
        ))
      ))}
    </>
  );
}
export default RecipeDetails;
