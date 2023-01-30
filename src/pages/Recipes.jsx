import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Recipes() {
  const HasTheSearch = true;
  return (
    <div>
      <Header
        title="Meals"
        HasTheSearch={ HasTheSearch }
      />
      <Footer />
    </div>
  );
}

export default Recipes;
