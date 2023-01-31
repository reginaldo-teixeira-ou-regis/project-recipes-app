import React, { useContext } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import AppContext from '../context/AppContext';

function Recipes() {
  const HasTheSearch = true;
  const number = 12;
  const { recipesFound } = useContext(AppContext);
  return (
    <div>
      <Header
        title="Meals"
        HasTheSearch={ HasTheSearch }
      />
      {
        recipesFound?.map((e, index) => (
          index < number && (
            <div key={ e.idMeal } data-testid={ `${index}-recipe-card` }>
              <img
                style={ { width: '100px' } }
                alt={ e.srtMeal }
                data-testid={ `${index}-card-img` }
                src={ e.strMealThumb }
              />
              <p data-testid={ `${index}-card-name` }>{ e.strMeal }</p>
            </div>
          )
        ))
      }
      <Footer />
    </div>
  );
}

export default Recipes;
