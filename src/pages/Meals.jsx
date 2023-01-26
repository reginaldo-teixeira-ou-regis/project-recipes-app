import React from 'react';
import Header from '../components/Header';

function Meals() {
  const HasTheSearch = true;
  return (
    <div>
      <Header
        title="Meals"
        HasTheSearch={ HasTheSearch }
      />
    </div>
  );
}

export default Meals;
