import React from 'react';
import Header from '../components/Header';
import FavoriteRecipes from '../components/FavoriteRecipes';

export default function FavoriteRecipesCard() {
  return (
    <div>
      <Header
        title="Favorite Recipes"
      />
      <FavoriteRecipes />
    </div>
  );
}
