import { screen, act, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from '../components/Header';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

describe('Testa o componente Header', () => {
  test('Verifica se ao clicar no icone profile a página é redirecionada para o Login', () => {
    const { history } = renderWithRouter(<Header />);
    const iconProfile = screen.getByRole('img', {
      name: /profileicon/i,
    });
    userEvent.click(iconProfile);
    expect(history.location.pathname).toBe('/profile');
  });

  test('Verifica a página Meals renderiza o componente Header', () => {
    const { history } = renderWithRouter(<Header />);
    act(() => {
      history.push('/meals');
    });
    const titleMeals = screen.getByRole('heading', {
      name: /meals/i,
    });
    expect(titleMeals).toBeInTheDocument();
  });

  test('Verifica a página Drinks renderiza o componente Header', () => {
    const { history } = renderWithRouter(<Header />);
    act(() => {
      history.push('/drinks');
    });
    const titleDrinks = screen.getByRole('heading', {
      name: /drinks/i,
    });
    expect(titleDrinks).toBeInTheDocument();
  });

  test('Verifica a página Profile renderiza o componente Header', () => {
    const { history } = renderWithRouter(<Header />);
    act(() => {
      history.push('/proflie');
    });
    const titleProfile = screen.getByRole('heading', {
      name: /profile/i,
    });
    expect(titleProfile).toBeInTheDocument();
  });

  test('Verifica a página Done Recipes renderiza o componente Header', () => {
    const { history } = renderWithRouter(<Header />);
    act(() => {
      history.push('/done-recipes');
    });
    const titleDoneRecipes = screen.getByRole('heading', {
      name: /done recipes/i,
    });
    expect(titleDoneRecipes).toBeInTheDocument();
  });

  test('Verifica a página Favorite Recipes renderiza o componente Header', () => {
    const { history } = renderWithRouter(<Header />);
    act(() => {
      history.push('/favorite-recipes');
    });
    const titleFavoriteRecipes = screen.getByRole('heading', {
      name: /favorite recipes/i,
    });
    expect(titleFavoriteRecipes).toBeInTheDocument();
  });

  test('Verifica a página Login não renderiza o componente Header', () => {
    renderWithRouter(<Header />);
    const title = screen.queryByTestId('page-title');
    expect(title).not.toBeInTheDocument();
  });

  test('Verifica se os componentes estão sendo renderizados na tela', () => {
    const { history } = renderWithRouter(<Header />);
    act(() => {
      history.push('/meals');
    });
    const iconProfile = screen.getByRole('img', {
      name: /profileicon/i,
    });
    const iconSearch = screen.getByRole('img', {
      name: /searchicon/i,
    });
    const titleHeader = screen.queryByTestId('page-title');

    expect(iconProfile).toBeInTheDocument();
    expect(iconSearch).toBeInTheDocument();
    expect(titleHeader).toBeInTheDocument();
  });

  test('Verifica se a Barra de Busca aparece ao clicar no icone de busca', () => {
    renderWithRouter(<App />);
    const inputEmail = screen.getByTestId('email-input');
    const inputPass = screen.getByTestId('password-input');
    const btnEnter = screen.getByRole('button', {
      name: /enter/i,
    });

    userEvent.type(inputEmail, 'teste@test.com.br');
    userEvent.type(inputPass, '123456789');
    userEvent.click(btnEnter);

    const btnSearchBar = screen.getByRole('button', {
      name: /searchicon/i,
    });
    fireEvent.click(btnSearchBar);
    const searchBar = screen.getByRole('textbox');
    expect(searchBar).toBeInTheDocument();
    fireEvent.click(btnSearchBar);
    expect(searchBar).not.toBeInTheDocument();
  });
});
