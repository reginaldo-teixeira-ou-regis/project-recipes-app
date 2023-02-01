import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function Profile() {
  const [storage, setStorage] = useState({ email: '' });
  useEffect(() => {
    const storaage = JSON.parse(localStorage.getItem('user'));
    if (storaage) {
      setStorage(storaage);
    }
  }, []);
  const history = useHistory();
  const handleClick = ({ target }) => {
    if (target.value === 'doneRecipes') {
      history.push('/done-recipes');
    }
    if (target.value === 'favoriteRecipes') {
      history.push('/favorite-recipes');
    }
    if (target.value === 'logout') {
      localStorage.clear();
      history.push('/');
    }
  };
  return (
    <div>
      <h4 data-testid="profile-email">{ storage.email }</h4>
      <button
        onClick={ (e) => handleClick(e) }
        name="buttonProfile"
        value="doneRecipes"
        type="button"
        data-testid="profile-done-btn"
      >
        Done Recipes
      </button>
      <button
        onClick={ (e) => handleClick(e) }
        name="buttonProfile"
        value="favoriteRecipes"
        type="button"
        data-testid="profile-favorite-btn"
      >
        Favorite Recipes
      </button>
      <button
        onClick={ (e) => handleClick(e) }
        name="buttonProfile"
        value="logout"
        type="button"
        data-testid="profile-logout-btn"
      >
        Logout
      </button>
    </div>
  );
}
