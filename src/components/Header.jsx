import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import { SearchBarContext } from '../context/SearchBarProvider';

function Header({ title, HasTheSearch }) {
  const [searchBar, setSearchBar] = useState(false);
  const { search, setSearch } = useContext(SearchBarContext);

  const changeSearch = () => {
    if (searchBar === true) {
      setSearchBar(false);
    } else {
      setSearchBar(true);
    }
  };

  return (
    <header>
      <Link to="/profile">
        <img
          src={ profileIcon }
          alt="profileIcon"
          data-testid="profile-top-btn"
        />
      </Link>
      { HasTheSearch && (
        <button onClick={ changeSearch }>
          <img
            src={ searchIcon }
            alt="searchIcon"
            data-testid="search-top-btn"
          />
        </button>)}
      { searchBar && (
        <input
          name="searchBar"
          data-testid="search-input"
          type="text"
          value={ search }
          onChange={ (e) => setSearch(e.target.value) }
        />)}
      <h1 data-testid="page-title">
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
