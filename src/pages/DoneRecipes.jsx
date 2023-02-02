import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

function DoneRecipes() {
  const history = useHistory();
  const [recipes, setRecipes] = useState([]);
  const [recipesBoard, setRecipesBoard] = useState('');
  const [btnFilter, setBtnFilter] = useState(['meal', 'drink']);
  useEffect(() => {
    const doneRecipesStorage = JSON.parse(localStorage.getItem('doneRecipes'));
    setRecipes(!doneRecipesStorage ? [] : doneRecipes);
  }, []);
  const copyUrlClipboard = (url) => {
    copy(`http://localhost:3000${url}`);
    setRecipesBoard('Link copied!');
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
        onClick={ () => setBtnFilter(['meal']) }
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
      { recipes.filter((recipe) => btnFilter.includes(recipe.type))
        .map((recipe, index) => (
          <div key={ index }>
            <button
              type="button"
              onClick={ () => history.push(`/${recipe.type}s/${recipe.id}`) }
            >
              <img
                src={ recipe.image }
                alt="recipeImage"
                data-testid={ `${index}-horizontal-image` }
              />
              <p data-testid={ `${index}-horizontal-name` }>{ recipe.name }</p>
            </button>
            <p data-testid={ `${index}-horizontal-top-text` }>
              {recipe.type === 'drink' ? recipe.alcoholicOrNot
                : `${recipe.nationality} - ${recipe.category}`}
            </p>
            <p data-testid={ `${index}-horizontal-done-date` }>{ recipe.doneDate }</p>
            <button
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
            <tag
              data-testid={ `${index}-${tagName}-horizontal-tag` }
            >
              { `${recipe.tags[0]} ${recipe.tags[1]}` }
            </tag>
          </div>
        ))}
    </div>
  );
}
export default DoneRecipes;
