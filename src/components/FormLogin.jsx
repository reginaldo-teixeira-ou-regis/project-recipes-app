import React, { useState } from 'react';

function FormLogin() {
  const [login, setLogin] = useState({ email: '', password: '' });
  const MIN_PASSWORD = 6;
  const regex = /\S+@\S+\.\S+/;
  const handleChange = (event) => {
    setLogin({
      ...login,
      [event.target.name]: event.target.value,
    });
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
      >
        Enter
      </button>
    </form>
  );
}

export default FormLogin;
