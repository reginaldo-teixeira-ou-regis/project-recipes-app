import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function FormLogin() {
  const [login, setLogin] = useState({ email: '', password: '' });
  const history = useHistory();
  const MIN_PASSWORD = 6;
  const regex = /\S+@\S+\.\S+/;
  const KEY = 'user';
  const handleChange = (event) => {
    setLogin({
      ...login,
      [event.target.name]: event.target.value,
    });
  };

  const saveLocalStorage = (email) => {
    const emailJson = JSON.stringify({ email });
    localStorage.setItem(KEY, emailJson);
  };

  const handleSumit = () => {
    saveLocalStorage(login.email);
    history.push('/meals');
  };

  return (
    <form>
      <label htmlFor="email">
        <input
          onChange={ handleChange }
          value={ login.email }
          type="email"
          name="email"
          data-testid="email-input"
          placeholder="Digite seu Email"
          className="input-group mb-3"
        />
      </label>
      <label htmlFor="password">
        <input
          onChange={ handleChange }
          value={ login.password }
          type="password"
          name="password"
          data-testid="password-input"
          placeholder="Digite sua senha"
        />
      </label>
      <button
        type="button"
        data-testid="login-submit-btn"
        disabled={ login.password.length <= MIN_PASSWORD || !(regex.test(login.email)) }
        onClick={ handleSumit }
      >
        Enter
      </button>
    </form>
  );
}

FormLogin.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default FormLogin;
