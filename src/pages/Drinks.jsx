import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Drinks() {
  const HasTheSearch = true;
  return (
    <div>
      <Header
        title="Drinks"
        HasTheSearch={ HasTheSearch }
      />
      <Footer />
    </div>
  );
}

export default Drinks;
