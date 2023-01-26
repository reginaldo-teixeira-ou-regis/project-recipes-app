import React from 'react';
import Header from '../components/Header';

function Drinks() {
  const HasTheSearch = true;
  return (
    <div>
      <Header
        title="Drinks"
        HasTheSearch={ HasTheSearch }
      />
    </div>
  );
}

export default Drinks;
