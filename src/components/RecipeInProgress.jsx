import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import copy from 'clipboard-copy';
import useFetch from '../hooks/useFetch';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function RecipeInProgress() {
  const { makeFetch } = useFetch();
  const number6 = 6;
  const oneSecond = 1000;
  const [recipe, setRecipe] = useState(null);
  const { id } = useParams();
  const { pathname } = useLocation();
  const mealsOrDrink = pathname.slice(1, number6);
  const [checkedIngredients, setCheckedIngredients] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

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
    const inProgressRecipes = localStorage.getItem('inProgressRecipes');
    if (inProgressRecipes) {
      setCheckedIngredients(JSON.parse(inProgressRecipes));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    localStorage.setItem('inProgressRecipes', JSON.stringify(checkedIngredients));
  }, [checkedIngredients]);

  useEffect(() => {
    if (localStorage.getItem('favoriteRecipes')) {
      setIsFavorite(JSON.parse(localStorage
        .getItem('favoriteRecipes')).some((idEl) => idEl.id === id));
    } else {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleFavorite = ({ target }) => {
    setIsFavorite(!isFavorite);
    const singular = mealsOrDrink.replace('s', '');
    const obj = {
      id,
      type: singular,
      image: recipe.strDrinkThumb || recipe.strMealThumb,
      category: recipe.strCategory,
      alcoholicOrNot: recipe.strAlcoholic || '',
      name: recipe.strMeal || recipe.strDrink,
      nationality: recipe.strArea || '',
    };
    const savedFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (!isFavorite) {
      savedFavorites.push(obj);
      localStorage.setItem('favoriteRecipes', JSON.stringify(savedFavorites));
    } else {
      const index = savedFavorites.findIndex((el) => el === target.id);
      savedFavorites.splice(index, 1);
      localStorage.setItem('favoriteRecipes', JSON.stringify(savedFavorites));
    }
  };

  const copyUrl = (url) => {
    copy(url.replace('/in-progress', ''));
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), oneSecond);
  };

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
          <button
            data-testid="share-btn"
            type="button"
            onClick={ () => copyUrl(window.location.href) }
          >
            {linkCopied ? 'Link copied!' : <img src={ shareIcon } alt="shareIcon" />}
          </button>
          <button
            id={ id }
            type="button"
            onClick={ toggleFavorite }
          >
            <img
              data-testid="favorite-btn"
              src={ isFavorite ? blackHeartIcon
                : whiteHeartIcon }
              alt="whiteHeartIcon"
            />
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
                    data-testid={ `${index}-ingredient-step` }
                    className={
                      checkedIngredients.includes(ingredientKey) ? 'striked' : ''
                    }
                  >
                    <input
                      type="checkbox"
                      id={ `${index + 1}-ingredient-step` }
                      checked={ checkedIngredients.includes(ingredientKey) }
                      onChange={ () => {
                        if (checkedIngredients.includes(ingredientKey)) {
                          setCheckedIngredients(
                            checkedIngredients.filter((key) => key !== ingredientKey),
                          );
                        } else {
                          setCheckedIngredients([...checkedIngredients, ingredientKey]);
                        }
                      } }
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
