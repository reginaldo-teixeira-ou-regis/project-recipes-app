import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';

function RecipeInProgress() {
  const { makeFetch } = useFetch();
  const number6 = 6;
  const [recipe, setRecipe] = useState(null);
  const { id } = useParams();
  const { pathname } = useLocation();
  const mealsOrDrink = pathname.slice(1, number6);
  /* const [checked, setChecked] = useState({}); */

  const fetchRecipeInProgress = async () => {
    if (mealsOrDrink === 'meals') {
      const data = await makeFetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      setRecipe(data.meals[0]);
    }

    if (mealsOrDrink === 'drink') {
      const data = await makeFetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
      setRecipe(data.drinks[0]);
    }
  };

  useEffect(() => {
    fetchRecipeInProgress();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* const handleChange = ({ target }) => {
    const check = {

      ...checked,
      [target.name]: target.checked,
    };
    setChecked(check);
  }; */

  return (
    <div>
      {recipe && (
        <>
          <img
            data-testid="recipe-photo"
            src={ recipe.strDrinkThumb || recipe.strMealThumb }
            alt="recipe"
            width="300px"
          />
          <h3 data-testid="recipe-title">
            {recipe.strDrink || recipe.strMeal}
          </h3>
          <button data-testid="share-btn" type="button">
            Compartilhar
          </button>
          <button data-testid="favorite-btn" type="button">
            Favoritar
          </button>
          <h4 data-testid="recipe-category">
            {recipe.strCategory}
          </h4>
          <p data-testid="instructions">
            {recipe.strInstructions}
          </p>
          <h4 data-testid="recipe-ingredients-list-title">Ingredients:</h4>
          <ul data-testid="recipe-ingredients-list">
            {Object.keys(recipe)
              .filter((key) => key.startsWith('strIngredient'))
              .filter((key) => recipe[key])
              .map((ingredientKey, index) => (
                <li key={ ingredientKey }>
                  <label
                    htmlFor={ `${index + 1}-ingredient-step` }
                    data-testid={ `${index + 1}-ingredient-step` }
                  >
                    <input
                      type="checkbox"
                      id={ `${index + 1}-ingredient-step` }
                    />
                    {recipe[ingredientKey]}
                  </label>
                </li>
              ))}
          </ul>
          <button data-testid="finish-recipe-btn" type="button">
            Finalizar Receita
          </button>
        </>
      )}
    </div>
  );
}

export default RecipeInProgress;
