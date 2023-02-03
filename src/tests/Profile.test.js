import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import Profile from '../pages/UserProfile';
import renderWithRouter from './helpers/renderWithRouter';

describe('Testa o componente Profile', () => {
  test('Verifica há os atributos da página Profile', () => {
    renderWithRouter(<App />);
    const email = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');
    const buttonEnt = screen.getByTestId('login-submit-btn');

    userEvent.type(email, 'grupo10@gmail.com');
    userEvent.type(password, '1234567');
    userEvent.click(buttonEnt);

    const img = screen.getByRole('img', {
      name: /profileicon/i,
    });

    userEvent.click(img);

    const emailExists = screen.getByTestId('profile-email');
    const { getByText } = within(emailExists);
    const doneButton = screen.getByText('Done Recipes');
    const favoriteButton = screen.getByText('Favorite Recipes');
    const logoutButton = screen.getByText('Logout');

    expect(emailExists).toBeInTheDocument();
    expect(getByText('grupo10@gmail.com')).toBeInTheDocument();
    expect(doneButton).toBeInTheDocument();
    expect(favoriteButton).toBeInTheDocument();
    expect(logoutButton).toBeInTheDocument();
  });

  test('Verifica se, ao clicar nos botões, eles redirecionam para suas respectivas páginas', () => {
    const { history } = renderWithRouter(<Profile />);

    const doneButton = screen.getByText('Done Recipes');
    const favoriteButton = screen.getByText('Favorite Recipes');
    const logoutButton = screen.getByText('Logout');

    userEvent.click(doneButton);
    expect(history.location.pathname).toBe('/done-recipes');

    userEvent.click(favoriteButton);
    expect(history.location.pathname).toBe('/favorite-recipes');

    userEvent.click(logoutButton);
    expect(history.location.pathname).toBe('/');
  });
});
