import React, { useEffect, useState } from 'react';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const copy = require('clipboard-copy');

export default function FavoriteRecipes() {
  const [itensDoStorage, setItensDoStorage] = useState([]);
  const [itensDoStorage2, setItensDoStorage2] = useState([]);
  const [mensagem, setMensagem] = useState('');

  useEffect(() => {
    const storageRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setItensDoStorage(storageRecipes);
    setItensDoStorage2(storageRecipes);
  }, []);

  const copyUrl = (url) => {
    copy(`http://localhost:3000${url}`);
    setMensagem('Link copied!');
  };

  const attLocalStorage = (e) => {
    const storageAtualizado = itensDoStorage.filter((el) => el.id !== e);
    localStorage.setItem('favoriteRecipes', JSON
      .stringify(storageAtualizado));
    const storageRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setItensDoStorage(storageRecipes);
  };

  const filters = (e) => {
    if (e.target.name === 'Meals') {
      const arrayFiltrado = itensDoStorage.filter((el) => el.type === 'meal');
      setItensDoStorage(arrayFiltrado);
    }
    if (e.target.name === 'Drinks') {
      const arrayFiltrado = itensDoStorage.filter((el) => el.type === 'drink');
      setItensDoStorage(arrayFiltrado);
    }
    if (e.target.name === 'All') {
      setItensDoStorage(itensDoStorage2);
    }
  };
  return (
    <div>
      <button
        onClick={ filters }
        name="All"
        type="button"
        data-testid="filter-by-all-btn"
      >
        All
      </button>
      <button
        onClick={ filters }
        name="Meals"
        type="button"
        data-testid="filter-by-meal-btn"
      >
        Meal
      </button>
      <button
        onClick={ filters }
        name="Drinks"
        type="button"
        data-testid="filter-by-drink-btn"
      >
        Drink
      </button>
      {
        itensDoStorage?.map((e, index) => (
          <div key={ e.id }>
            <img
              data-testid={ `${index}-horizontal-image` }
              alt={ e.name }
              src={ e.image }
              style={ { width: '200px' } }
            />
            <p data-testid={ `${index}-horizontal-top-text` }>{ e.category }</p>
            <p data-testid={ `${index}-horizontal-name` }>{ e.name }</p>
            {
              e.type === 'meal'
                ? (
                  <p
                    data-testid={ `${index}-horizontal-top-text` }
                  >
                    { `${e.nationality} - ${e.category}` }
                  </p>
                )
                : (
                  <p
                    data-testid={ `${index}-horizontal-top-text` }
                  >
                    { e.alcoholicOrNot }
                  </p>
                )
            }
            <button onClick={ () => copyUrl(`/${e.type}s/${e.id}`) } type="button">
              <img
                alt="shareIcon"
                src={ shareIcon }
                data-testid={ `${index}-horizontal-share-btn` }
              />
            </button>
            <span>{ mensagem }</span>
            <button onClick={ () => attLocalStorage(e.id) } type="button">
              <img
                data-testid={ `${index}-horizontal-favorite-btn` }
                alt="favoriteIcon"
                src={ blackHeartIcon }
              />
            </button>
          </div>
        ))
      }
    </div>
  );
}
