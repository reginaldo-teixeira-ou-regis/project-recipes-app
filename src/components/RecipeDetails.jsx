/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import '../css/carousel.css';
import { useRouteMatch, useHistory } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import 'bootstrap/dist/css/bootstrap.css';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import fetchRecipesDT from '../helpers/fetchRecipesDT';
import Carousel from './Carousel';

const copy = require('clipboard-copy');

function RecipeDetails() {
  const { makeFetch } = useFetch();
  const [meals, setMeals] = useState([]);
  const [drink, setDrink] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  const [mesures, setMesure] = useState([]);
  const [youtubeID, setYoutubeId] = useState('');
  const [recommendationsMeals, setRecommendationsMeals] = useState([]);
  const [recommendationsDrinks, setRecommendationsDrinks] = useState([]);
  const [receitasFeitas, setReceitasFeitas] = useState([]);
  const [btnAtt, setBtnAtt] = useState(false);
  const [btnAtt2, setBtnAtt2] = useState(false);
  const [mensagem, setMensagem] = useState('');
  const history = useHistory();
  const match = useRouteMatch();
  const { location: { pathname } } = history;
  const { params: { id } } = match;
  const number = 6;
  const mealsOrDrink = pathname.slice(1, number);

  const separateIngredients = () => {
    const mealsORdrink = pathname.includes('/meals') ? meals : drink;
    const arrEntries = Object.entries(mealsORdrink[0]);
    const EntriesIngredients = arrEntries.filter((f) => f[0].includes('strIngredient'));
    const ingredientsValue = EntriesIngredients.map((el) => el[1]);
    const ingredientsArr = ingredientsValue.filter((i) => i !== null && i !== '');
    setIngredients(ingredientsArr);
  };

  const separateMesure = () => {
    const mealsORdrink = pathname.includes('/meals') ? meals : drink;
    const arrEntries = Object.entries(mealsORdrink[0]);
    const EntriesMesure = arrEntries.filter((f) => f[0].includes('strMeasure'));
    const MesureValue = EntriesMesure.map((el) => el[1]);
    const MesureArr = MesureValue.filter((i) => i !== null && i !== '');
    setMesure(MesureArr);
  };

  const IdYoutube = () => {
    const SrcYoutube = String(meals[0].strYoutube);
    const indexID = SrcYoutube.indexOf('=');
    const strArr = SrcYoutube.split('');
    const idArr = strArr.filter((l, i) => i > indexID);
    const idYou = idArr.join('');
    setYoutubeId(idYou);
  };

  useEffect(() => {
    fetchRecipesDT({ setRecommendationsMeals,
      setMeals,
      setRecommendationsDrinks,
      setDrink }, makeFetch, pathname, id);
  }, []);

  useEffect(() => {
    const mealsORdrink = pathname.includes('/meals') ? meals : drink;
    if (mealsORdrink.length && mealsORdrink !== null) {
      separateIngredients();
      separateMesure();
    } if (meals.length) {
      IdYoutube();
    }
  }, [meals, drink]);

  useEffect(() => {
    const storage = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    const storageInProgress = JSON.parse(localStorage.getItem('inProgressRecipes')) || {};
    const storageFavorite = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    setReceitasFeitas(storage);
    const fav = storageFavorite?.some((e) => e.id === id);
    setIsFavorite(fav);
    receitasFeitas?.map((e) => e.id === id && setBtnAtt(true));
    if (Object.keys(storageInProgress).length) {
      Object.keys(storageInProgress.meals || storageInProgress.drinks)
        .map((e) => e === id && setBtnAtt2(true));
    }
  }, []);

  const mudaRota = () => {
    const receitaDaPagina = history.location.pathname;
    history.push(`${receitaDaPagina}/in-progress`);
  };

  const copyUrl = (url) => {
    copy(`http://localhost:3000${url}`);
    setMensagem('Link copied!');
  };

  const toggleFavorite = ({ target }) => {
    setIsFavorite(!isFavorite);
    const singularMealsOrDrink = mealsOrDrink.replace('s', '');
    const getDrindsAndMeals = {
      id: meals[0]?.idMeal || drink[0]?.idDrink,
      type: singularMealsOrDrink,
      image: meals[0]?.strMealThumb || drink[0]?.strDrinkThumb,
      category: meals[0]?.strCategory || drink[0]?.strCategory,
      alcoholicOrNot: drink[0]?.strAlcoholic || '',
      name: meals[0]?.strMeal || drink[0]?.strDrink,
      nationality: meals[0]?.strArea || '',
    };
    const savedFavorites = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    if (!isFavorite) {
      savedFavorites.push(getDrindsAndMeals);
      localStorage.setItem('favoriteRecipes', JSON.stringify(savedFavorites));
    } else {
      const index = savedFavorites.findIndex((el) => el === target.id);
      savedFavorites.splice(index, 1);
      localStorage.setItem('favoriteRecipes', JSON.stringify(savedFavorites));
    }
  };

  return (
    <>
      {(pathname.includes('/meals') && (
        meals?.map((el, i) => (
          <div key={ i }>
            <img
              src={ el.strMealThumb }
              alt={ el.strMeal }
              width="300px"
              data-testid="recipe-photo"
            />
            <h1 data-testid="recipe-title">{el.strMeal}</h1>
            <p data-testid="recipe-category">{el.strCategory}</p>
            <button
              type="button"
              onClick={ () => copyUrl(history.location.pathname) }
            >
              <img
                alt="shareIcon"
                src={ shareIcon }
                data-testid="share-btn"
              />
            </button>
            <button id={ el.id } type="button" onClick={ toggleFavorite }>
              <img
                data-testid="favorite-btn"
                src={ isFavorite ? blackHeartIcon
                  : whiteHeartIcon }
                alt="whiteHeartIcon"
              />
            </button>
            <span>{ mensagem }</span>
            <p data-testid="instructions">{el.strInstructions}</p>
            { ingredients?.map((ingredient, indx) => (
              <ul key={ indx } data-testid={ `${indx}-ingredient-name-and-measure` }>
                <li>
                  {`${mesures[indx]} ${ingredient}`}
                </li>
              </ul>
            )) }
            <iframe
              data-testid="video"
              width="300"
              height="315"
              src={ `https://www.youtube.com/embed/${youtubeID}` }
              title="YouTube video player"
              allowFullScreen
            />
          </div>
        ))
      ))}
      {(pathname.includes('/drinks') && (
        drink?.map((el, i) => (
          <div key={ i }>
            <img
              src={ el.strDrinkThumb }
              alt={ el.strDrink }
              width="300"
              data-testid="recipe-photo"
            />
            <h1 data-testid="recipe-title">{el.strDrink}</h1>
            <p data-testid="recipe-category">{el.strAlcoholic}</p>
            <button
              type="button"
              onClick={ () => copyUrl(history.location.pathname) }
            >
              <img
                alt="shareIcon"
                src={ shareIcon }
                data-testid="share-btn"
              />
            </button>
            <button id={ el.id } type="button" onClick={ toggleFavorite }>
              <img
                data-testid="favorite-btn"
                src={ isFavorite ? blackHeartIcon
                  : whiteHeartIcon }
                alt="whiteHeartIcon"
              />
            </button>
            <span>{ mensagem }</span>
            { ingredients?.map((ingredient, indx) => (
              <ul key={ indx } data-testid={ `${indx}-ingredient-name-and-measure` }>
                <li>
                  {`${mesures[indx]} ${ingredient}`}
                  {' '}
                </li>
              </ul>
            )) }
            <p data-testid="instructions">{el.strInstructions}</p>
          </div>
        ))
      ))}
      <Carousel
        recommendationsDrinks={ recommendationsDrinks }
        recommendationsMeals={ recommendationsMeals }
      />
      {
        btnAtt === false && (
          <div>
            <button
              data-testid="start-recipe-btn"
              className="button-bottom"
              onClick={ mudaRota }
            >
              { btnAtt2 === true ? 'Continue Recipe' : 'Start Recipe' }
            </button>
          </div>
        )
      }
    </>
  );
}

export default RecipeDetails;
