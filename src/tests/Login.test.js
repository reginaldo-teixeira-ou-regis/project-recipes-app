import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from '../pages/Login';
import renderWithRouter from './helpers/renderWithRouter';

describe('Testa o componente Login', () => {
  test('Verifica se ao digitar email e senha corretamente, o usuário é redirecionado para a tela de Recipes', () => {
    const { history } = renderWithRouter(<Login />);
    const email = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');
    const enterButton = screen.getByTestId('login-submit-btn');

    userEvent.type(email, 'grupo10@gmail.com');
    userEvent.type(password, '1234567');
    userEvent.click(enterButton);
    expect(history.location.pathname).toBe('/meals');
  });
  test('Verifica se ao digitar email incorretamente ou a senha incorretamente, o botão permanece desabilitado', () => {
    renderWithRouter(<Login />);
    const email = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');
    const enterButton = screen.getByTestId('login-submit-btn');

    userEvent.type(email, 'grupo10gmail.com');
    userEvent.type(password, '1234567');
    userEvent.click(enterButton);
    expect(enterButton).toBeDisabled();
    userEvent.type(email, 'grupo10@gmail.com');
    userEvent.type(password, '123456');
    expect(enterButton).toBeDisabled();
  });
});
