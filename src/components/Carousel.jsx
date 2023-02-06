import PropTypes from 'prop-types';
import React from 'react';

const number = 6;

function Carousel({ recommendationsDrinks, recommendationsMeals }) {
  return (
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
  );
}

Carousel.propTypes = {
  recommendationsDrinks: PropTypes.arrayOf(),
  recommendationsMeals: PropTypes.arrayOf(),
}.isRequired;

export default Carousel;
