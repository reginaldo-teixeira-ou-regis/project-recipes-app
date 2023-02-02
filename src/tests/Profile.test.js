import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Profile from '../pages/UserProfile';
import renderWithRouter from './helpers/renderWithRouter';

describe('Testa o componente Profile', () => {
  test('Verifica há os atributos da página Profile', () => {
    renderWithRouter(<Profile />);
    const email = screen.getByTestId('profile-email');
    const img = screen.getByRole('img', {
      name: /profileicon/i,
    });
    const doneButton = screen.getByText('Done Recipes');
    const favoriteButton = screen.getByText('Favorite Recipes');
    const logoutButton = screen.getByText('Logout');

    expect(email).toBeInTheDocument();
    expect(img).toBeInTheDocument();
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
