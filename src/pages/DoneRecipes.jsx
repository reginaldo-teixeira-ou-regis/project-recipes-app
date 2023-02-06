import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import '../css/doneRecipes.css';

const copy = require('clipboard-copy');

function DoneRecipes() {
  const history = useHistory();
  const [recipes, setRecipes] = useState([]);
  const [recipesBoard, setRecipesBoard] = useState('');
  const [btnFilter, setBtnFilter] = useState(['meal', 'drink']);
  useEffect(() => {
    const doneRecipesStorage = JSON.parse(localStorage.getItem('doneRecipes'));
    setRecipes(!doneRecipesStorage ? [] : doneRecipesStorage);
  }, []);
  const copyUrlClipboard = (url) => {
    copy(`http://localhost:3000${url}`);
    setRecipesBoard('Link copied!');
  };
  const showTags = (tags, i) => {
    if (tags.length === 0) return '';
    if (tags.length === 1) {
      return (
        <p data-testid={ `${i}-${tags[0]}-horizontal-tag` }>{tags[0]}</p>
      );
    }
    return (
      <p>
        <span data-testid={ `${i}-${tags[0]}-horizontal-tag` }>{tags[0]}</span>
        <span data-testid={ `${i}-${tags[1]}-horizontal-tag` }>{tags[1]}</span>
      </p>
    );
  };
  return (
    <div>
      <Header
        title="Done Recipes"
      />
      <button
        data-testid="filter-by-meal-btn"
        type="button"
        onClick={ () => setBtnFilter(['meal']) }
      >
        Meals
      </button>
      <button
        data-testid="filter-by-drink-btn"
        type="button"
        onClick={ () => setBtnFilter(['drink']) }
      >
        Drinks
      </button>
      <button
        data-testid="filter-by-all-btn"
        type="button"
        onClick={ () => setBtnFilter(['meal', 'drink']) }
      >
        All
      </button>
      <div>
        { recipes.filter((recipe) => btnFilter.includes(recipe.type))
          .map((recipe, index) => {
            const tagsFood = showTags(recipe.tags, index);
            return (
              <div className="card-done-recipes" key={ index }>
                <button
                  type="button"
                  onClick={ () => history.push(`/${recipe.type}s/${recipe.id}`) }
                >
                  <img
                    src={ recipe.image }
                    alt="recipeImage"
                    data-testid={ `${index}-horizontal-image` }
                    className="recipesimg"
                  />
                  <p
                    className="recipename"
                    data-testid={ `${index}-horizontal-name` }
                  >
                    {recipe.name}
                  </p>
                  {' '}
                </button>
                <p data-testid={ `${index}-horizontal-top-text` }>
                  {recipe.type === 'drink' ? recipe.alcoholicOrNot
                    : `${recipe.nationality} - ${recipe.category}`}
                </p>
                <p data-testid={ `${index}-horizontal-done-date` }>{ recipe.doneDate }</p>
                { tagsFood }
                <button
                  className="btn-share"
                  type="button"
                  onClick={ () => copyUrlClipboard(`/${recipe.type}s/${recipe.id}`) }
                >
                  <img
                    src={ shareIcon }
                    alt="shareIcon"
                    data-testid={ `${index}-horizontal-share-btn` }
                  />
                </button>
                <span>{ recipesBoard }</span>
              </div>
            );
          })}
      </div>
    </div>
  );
}
export default DoneRecipes;
