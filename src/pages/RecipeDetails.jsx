import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import useFetch from '../hooks/useFetch';

function RecipeDetails() {
  const { makeFetch } = useFetch();
  const [datails, setDetails] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const fetch = async () => {
      if (history.location.pathname === `/meals/:${id}`) {
        const meals = await makeFetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        setDetails(meals);
      }
      if (history.location.pathname === `/drinks/:${id}`) {
        const drink = await makeFetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
        setDetails(drink);
      }
    };
    fetch();
  }, []);
  return (
    <div>
      {<>
        datails.map((el) => (
        <h1 data-testid="recipe-title">{el.}</h1>
        <img data-testid="recipe-photo" src={el.} alt={el} />
        <p data-testid="recipe-category">{el.}</p>
        <p data-testid=`${index}-ingredient-name-and-measure`>{el.}</p>
        <p data-testid="instructions">{el.}</p>
        </>
    ))}</div>
  );
}
export default RecipeDetails;
