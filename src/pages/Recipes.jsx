import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipesCards from '../components/RecipeCards';

function Recipes() {
  const HasTheSearch = true;
  return (
    <div>
      <Header
        title="Meals"
        HasTheSearch={ HasTheSearch }
      />
      <RecipesCards />
      <Footer />
    </div>
  );
}

export default Recipes;
