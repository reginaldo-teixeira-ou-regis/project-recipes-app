/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import '../css/carousel.css';
import { useRouteMatch, useHistory } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import 'bootstrap/dist/css/bootstrap.css';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

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
  const [receitasInProgress, setReceitasInProgress] = useState({});
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
    // "https://www.youtube.com/embed/U9JYm5KSipM"
    // https://www.youtube.com/watch?v=VVnZd8A84z4
  };
  useEffect(() => {
    const fetchRecipesDT = async () => {
      if (pathname.includes('/meals')) {
        const mealsReq = await makeFetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        const recommendationMealss = await makeFetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
        setRecommendationsMeals(recommendationMealss.drinks);
        setMeals(mealsReq.meals);
      }
      if (pathname.includes('/drinks')) {
        const drinkReq = await makeFetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
        const recommendationsDrinkss = await makeFetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
        setRecommendationsDrinks(recommendationsDrinkss.meals);
        setDrink(drinkReq.drinks);
      }
    };
    fetchRecipesDT();
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
    const storage = JSON.parse(localStorage.getItem('doneRecipes'));
    const storageInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const storageFavorite = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setReceitasFeitas(storage);
    setReceitasInProgress(storageInProgress);
    const receitaDaPagina = history.location.pathname;
    const idDaReceitaDaPagina = receitaDaPagina.split('/')[2];
    const fav = storageFavorite?.some((e) => e.id === idDaReceitaDaPagina);
    if (fav === true) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }

    // receitasFeitas?.map((e) => e.id === idDaReceitaDaPagina && setBtnAtt(true));
    // if (Object.keys(receitasInProgress).includes('meals')) {
    //  Object.keys(receitasInProgress.meals)
    //    .map((e) => e === idDaReceitaDaPagina && setBtnAtt2(true));
    // }
    // if (Object.keys(receitasInProgress).includes('drinks')) {
    //  Object.keys(receitasInProgress.drinks)
    //    .map((e) => e === idDaReceitaDaPagina && setBtnAtt2(true));
  //  }
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
    if (singularMealsOrDrink === 'meal') {
      const getDrindsAndMeals = {
        id: meals[0].idMeal,
        type: singularMealsOrDrink,
        image: meals[0].strMealThumb,
        category: meals[0].strCategory,
        alcoholicOrNot: '',
        name: meals[0].strMeal,
        nationality: meals[0].strArea,
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
    }
    if (singularMealsOrDrink === 'drink') {
      const getDrindsAndMeals = {
        id: drink[0].idDrink,
        type: singularMealsOrDrink,
        image: drink[0].strDrinkThumb,
        category: drink[0].strCategory,
        alcoholicOrNot: drink[0].strAlcoholic,
        name: drink[0].strDrink,
        nationality: '',
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
    }
    console.log(getDrindsAndMeals);
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
            <button type="button" onClick={ toggleFavorite }>
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
                  {' '}
                </li>
              </ul>
            )) }
            <iframe
              data-testid="video"
              width="300"
              height="315"
              src={ `https://www.youtube.com/embed/${youtubeID}` }
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer;
              autoplay;
              clipboard-write;
              encrypted-media;
              gyroscope;
              picture-in-picture;
              web-share"
              allowfullscreen
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
            <button type="button" onClick={ toggleFavorite }>
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
      <div className="carousel-external">
        {
          recommendationsMeals.map((e, index) => (
            index < number && (
              <div key={ index }>
                <div className="carousel-itens">
                  <img
                    alt="img"
                    data-testid={ `${index}-recommendation-card` }
                    src={ e.strDrinkThumb }
                    width="150px"
                  />
                </div>
                <p data-testid={ `${index}-recommendation-title` }>{ e.strDrink }</p>
              </div>
            )
          ))
        }
        {
          recommendationsDrinks.map((e, index) => (
            index < number && (
              <div key={ index }>
                <div className="carousel-itens">
                  <img
                    alt="img"
                    data-testid={ `${index}-recommendation-card` }
                    src={ e.strMealThumb }
                    width="150px"
                  />
                </div>
                <p data-testid={ `${index}-recommendation-title` }>{ e.strMeal }</p>
              </div>
            )
          ))
        }
      </div>
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
