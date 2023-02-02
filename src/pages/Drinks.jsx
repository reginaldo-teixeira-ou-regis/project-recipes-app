import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipesCards from '../components/RecipeCards';

function Drinks() {
  const HasTheSearch = true;
  return (
    <div>
      <Header
        title="Drinks"
        HasTheSearch={ HasTheSearch }
      />
      <RecipesCards />
      <Footer />
    </div>
  );
}

export default Drinks;
