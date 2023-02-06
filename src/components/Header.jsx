import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import '../css/header.css';

function Header({ title, HasTheSearch }) {
  const [searchBar, setSearchBar] = useState(false);
  const changeSearch = () => {
    if (searchBar === true) {
      setSearchBar(false);
    } else {
      setSearchBar(true);
    }
  };
  return (
    <header id="headerpage">
      <Link to="/profile">
        <img
          src={ profileIcon }
          alt="profileIcon"
          data-testid="profile-top-btn"
          id="profile-top-btn"
        />
      </Link>
      { HasTheSearch && (
        <div>
          <button onClick={ changeSearch }>
            <img
              src={ searchIcon }
              alt="searchIcon"
              data-testid="search-top-btn"
              id="search-top-btn"
            />
          </button>
        </div>
      )}
      { searchBar && (
        <SearchBar />
      )}
      <h1 data-testid="page-title" id="page-title">
        {' '}
        { title }
      </h1>
    </header>
  );
}
Header.propTypes = {
  title: PropTypes.string.isRequired,
  HasTheSearch: PropTypes.bool.isRequired,
};
export default Header;
