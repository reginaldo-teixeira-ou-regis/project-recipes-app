import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';

function Drinks() {
  const HasTheSearch = true;
  return (
    <div>
      <Header
        title="Drinks"
        HasTheSearch={ HasTheSearch }
      />
      <SearchBar />
      <Footer />
    </div>
  );
}

export default Drinks;
