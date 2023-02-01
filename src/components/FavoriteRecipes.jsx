import React, { useEffect, useState } from 'react';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const copy = require('clipboard-copy');

export default function FavoriteRecipes() {
  const [itensDoStorage, setItensDoStorage] = useState([]);
  const [mensagem, setMensagem] = useState('');

  useEffect(() => {
    const storageRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setItensDoStorage(storageRecipes);
  }, []);

  const copyUrl = (url) => {
    copy(`http://localhost:3000${url}`);
    setMensagem('Link copied!');
  };

  const attLocalStorage = (e) => {
    const storageAtualizado = itensDoStorage.filter((el) => el.id !== e);
    localStorage.setItem('favoriteRecipes', JSON
      .stringify(storageAtualizado));
  };
  return (
    <div>
      <button
        type="button"
        data-testid="filter-by-all-btn"
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-meal-btn"
      >
        Meals
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
      >
        Meals
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
