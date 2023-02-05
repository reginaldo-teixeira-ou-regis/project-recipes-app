import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

describe('Testa o componente SearchBar', () => {
  test('Verifica se, ao clicar no botão, aparece a barra de pesquisa', () => {
    renderWithRouter(<App />);
    const email = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');
    const buttonEnt = screen.getByTestId('login-submit-btn');

    userEvent.type(email, 'grupo10@gmail.com');
    userEvent.type(password, '1234567');
    userEvent.click(buttonEnt);

    const searchIcon = screen.getByRole('img', {
      name: /searchicon/i,
    });

    userEvent.click(searchIcon);

    const searchInput = screen.getByTestId('search-input');

    expect(searchInput).toBeInTheDocument();
  });

  test('Verifica se, ao escrever e apertar o botão Search, aparece as respectivas receitas da página Meals', async () => {
    renderWithRouter(<App />);

    const buttonMeal = screen.getByTestId('meals-bottom-btn');

    userEvent.click(buttonMeal);

    const searchIcon = screen.getByRole('img', {
      name: /searchicon/i,
    });

    userEvent.click(searchIcon);

    const radio1letter = screen.getByTestId('first-letter-search-radio');
    const searchBtn = screen.getByTestId('exec-search-btn');
    const searchInput = screen.getByTestId('search-input');

    userEvent.type(searchInput, 'n');
    userEvent.click(radio1letter);
    userEvent.click(searchBtn);

    const nyCheeseCake = await screen.findByRole('img', {
      name: /New York cheesecake/i,
    });

    expect(nyCheeseCake).toBeInTheDocument();
  });
  test('Verifica se, ao escrever e apertar o botão Search, aparece as respectivas receitas da página Drinks', async () => {
    renderWithRouter(<App />);
    const buttonDrink = screen.getByTestId('drinks-bottom-btn');

    userEvent.click(buttonDrink);

    const searchIcon = screen.getByRole('img', {
      name: /searchicon/i,
    });

    userEvent.click(searchIcon);

    const radio1letter = screen.getByTestId('first-letter-search-radio');
    const searchBtn = screen.getByTestId('exec-search-btn');
    const searchInput = screen.getByTestId('search-input');

    userEvent.type(searchInput, 'n');
    userEvent.click(radio1letter);
    userEvent.click(searchBtn);

    const negroni = await screen.findByRole('img', {
      name: /Negroni/i,
    });

    expect(negroni).toBeInTheDocument();
  });
  test('Verifica se, ao buscar uma receita que só possui um resultado, redireciona para a tela de detalhes da receita da página Drinks', async () => {
    renderWithRouter(<App />);
    const buttonDrink = screen.getByTestId('drinks-bottom-btn');

    userEvent.click(buttonDrink);

    const searchIcon = screen.getByRole('img', {
      name: /searchicon/i,
    });

    userEvent.click(searchIcon);

    const radioName = screen.getByTestId('name-search-radio');
    const searchBtn = screen.getByTestId('exec-search-btn');
    const searchInput = screen.getByPlaceholderText('Search');

    userEvent.type(searchInput, 'n');
    userEvent.click(radioName);
    userEvent.click(searchBtn);

    const negroni = await screen.findByRole('img', {
      name: /Negroni/i,
    });

    expect(negroni).toBeInTheDocument();
  });
});
