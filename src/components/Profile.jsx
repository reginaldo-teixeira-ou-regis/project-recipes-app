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
      <div className="line" />
      <div className="line2" />
      <h4 data-testid="profile-email" className="profile-email">{ storage.email }</h4>
      <div>
        <button
          onClick={ handleClick }
          name="buttonProfile"
          value="doneRecipes"
          type="button"
          data-testid="profile-done-btn"
          className="profile-done-btn"
        >
          Done Recipes
        </button>

      </div>
      <button
        onClick={ handleClick }
        name="buttonProfile"
        value="favoriteRecipes"
        type="button"
        data-testid="profile-favorite-btn"
        className="profile-favorite-btn"
      >
        Favorite Recipes
      </button>
      <button
        onClick={ handleClick }
        name="buttonProfile"
        value="logout"
        type="button"
        data-testid="profile-logout-btn"
        className="profile-logout-btn"
      >
        Logout
      </button>
    </div>
  );
}
