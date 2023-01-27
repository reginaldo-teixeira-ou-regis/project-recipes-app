import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';

export default function Recipes() {
  const HasTheSearch = true;
  return (
    <div>
      <Header
        title="Meals"
        HasTheSearch={ HasTheSearch }
      />
      <SearchBar />
      <Footer />
    </div>
  );
}
