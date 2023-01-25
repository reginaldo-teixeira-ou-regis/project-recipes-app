import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

function Login() {
  return (
    <form>
      <label htmlFor="email">
        <input
          type="email"
          data-testid="email-input"
          placeholder="Digite seu Email"
          className="input-group mb-3"
        />  
      </label>
      <label htmlFor="password">
        <input
          type="password"
          data-testid="password-input"
          placeholder="Digite sua senha"
        />
      </label>
      <button
        type="button"
        data-testid="login-submit-btn"
      >
        Enter
      </button>
    </form>
  )
}

export default Login;
