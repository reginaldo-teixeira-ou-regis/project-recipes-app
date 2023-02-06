/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useLocation, useParams, useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';
import useFetch from '../hooks/useFetch';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import '../css/recipedetails.css';

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
  const history = useHistory();

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
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (!inProgressRecipes || !inProgressRecipes[mealsOrDrink][id]) {
      localStorage.setItem('inProgressRecipes', '{}');
    } else { setCheckedIngredients(inProgressRecipes[mealsOrDrink][id]); }
  }, []);

  useEffect(() => {
    const favoritesStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    favoritesStorage[mealsOrDrink] = { [id]: checkedIngredients };
    localStorage.setItem('inProgressRecipes', JSON.stringify(favoritesStorage));
  }, [checkedIngredients]);

  useEffect(() => {
    if (localStorage.getItem('favoriteRecipes')) {
      setIsFavorite(JSON.parse(localStorage
        .getItem('favoriteRecipes')).some((idEl) => idEl.id === id));
    } else {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    }
  }, []);

  const toggleFavorite = ({ target }) => {
    setIsFavorite(!isFavorite);
    const singularMealsOrDrink = mealsOrDrink.replace('s', '');
    const getDrindsAndMeals = {
      id,
      type: singularMealsOrDrink,
      image: recipe.strDrinkThumb || recipe.strMealThumb,
      category: recipe.strCategory,
      alcoholicOrNot: recipe.strAlcoholic || '',
      name: recipe.strMeal || recipe.strDrink,
      nationality: recipe.strArea || '',
    };
    const savedFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (!isFavorite) {
      savedFavorites.push(getDrindsAndMeals);
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

  if (!recipe) {
    return <h3>Loading...</h3>;
  }

  const filteredIngredients = Object.keys(recipe)
    .filter((key) => key.startsWith('strIngredient'))
    .filter((key) => recipe[key]);

  const handleFinishedRecipe = () => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    const singularMealsOrDrink = mealsOrDrink.replace('s', '');
    doneRecipes.push({
      id,
      type: singularMealsOrDrink,
      image: recipe.strDrinkThumb || recipe.strMealThumb,
      category: recipe.strCategory,
      alcoholicOrNot: recipe.strAlcoholic || '',
      name: recipe.strMeal || recipe.strDrink,
      nationality: recipe.strArea || '',
      tags: recipe.strTags ? recipe.strTags.split(',') : [],
      doneDate: new Date(),
    });
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
    history.push('/done-recipes');
  };

  return (
    <div>
      {recipe && (
        <>
          <img
            data-testid="recipe-photo"
            src={ recipe.strDrinkThumb || recipe.strMealThumb }
            alt="recipe"
            className="recipesimg"
          />
          <h3 data-testid="recipe-title">
            {recipe.strDrink || recipe.strMeal}
          </h3>
          <button
            className="recipeButtons"
            data-testid="share-btn"
            type="button"
            onClick={ () => copyUrl(window.location.href) }
          >
            {linkCopied ? 'Link copied!' : <img src={ shareIcon } alt="shareIcon" />}
          </button>
          <button
            className="recipeButtons"
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
          <p className="instructions" data-testid="instructions">
            {recipe.strInstructions}
          </p>
          <h4 data-testid="recipe-ingredients-list-title">Ingredients:</h4>
          <ul className="ingredients" data-testid="recipe-ingredients-list">
            {
              filteredIngredients.map((ingredientKey, index) => (
                <li key={ recipe[ingredientKey] }>
                  <label
                    htmlFor={ `${index + 1}-ingredient-step` }
                    data-testid={ `${index}-ingredient-step` }
                    className={
                      checkedIngredients.includes(recipe[ingredientKey]) ? 'striked' : ''
                    }
                  >
                    <input
                      type="checkbox"
                      id={ `${index + 1}-ingredient-step` }
                      checked={ checkedIngredients.includes(recipe[ingredientKey]) }
                      onChange={ () => {
                        if (checkedIngredients.includes(recipe[ingredientKey])) {
                          setCheckedIngredients(
                            checkedIngredients
                              .filter((key) => key !== recipe[ingredientKey]),
                          );
                        } else {
                          setCheckedIngredients([...checkedIngredients,
                            recipe[ingredientKey]]);
                        }
                      } }
                    />
                    {recipe[ingredientKey]}
                  </label>
                </li>
              ))
            }
          </ul>
          <button
            disabled={ filteredIngredients.length !== checkedIngredients.length }
            data-testid="finish-recipe-btn"
            type="button"
            onClick={ handleFinishedRecipe }
          >
            Finalizar Receita
          </button>
        </>
      )}
    </div>
  );
}

export default RecipeInProgress;
