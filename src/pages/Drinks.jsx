import React, { useContext } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AppContext from '../context/AppContext';
import RecipesCards from '../components/RecipeCards';

function Drinks() {
  const number = 12;
  const HasTheSearch = true;
  const { recipesFound } = useContext(AppContext);
  return (
    <div>
      <Header
        title="Drinks"
        HasTheSearch={ HasTheSearch }
      />
      {
        recipesFound?.map((e, index) => (
          index < number && (
            <div key={ e.idDrink } data-testid={ `${index}-recipe-card` }>
              <img
                style={ { width: '100px' } }
                alt={ e.srtDrink }
                data-testid={ `${index}-card-img` }
                src={ e.strDrinkThumb }
              />
              <p data-testid={ `${index}-card-name` }>{ e.strDrink }</p>
            </div>
          )
        ))
      }
      <RecipesCards />
      <Footer />
    </div>
  );
}

export default Drinks;
