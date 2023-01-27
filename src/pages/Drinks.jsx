import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

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
