import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

describe('Testa o componente Recipes', () => {
  // beforeEach(() => {
  //   renderWithRouter(<App />);
  //   const email = screen.getByTestId('email-input');
  //   const password = screen.getByTestId('password-input');
  //   const buttonEnt = screen.getByTestId('login-submit-btn');

  //   userEvent.type(email, 'grupo10@gmail.com');
  //   userEvent.type(password, '1234567');
  //   userEvent.click(buttonEnt);
  // });
  test('Verifica se há os botões de categoria na página meals e drinks', async () => {
    renderWithRouter(<App />);
    const email = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');
    const buttonEnt = screen.getByTestId('login-submit-btn');

    userEvent.type(email, 'grupo10@gmail.com');
    userEvent.type(password, '1234567');
    userEvent.click(buttonEnt);

    const beef = await screen.findByText('Beef');
    const breakfast = await screen.findByText('Breakfast');
    const chicken = await screen.findByText('Chicken');
    const dessert = await screen.findByText('Dessert');
    const goat = await screen.findByText('Goat');
    const all = await screen.findByText('All');

    expect(beef).toBeInTheDocument();
    expect(breakfast).toBeInTheDocument();
    expect(chicken).toBeInTheDocument();
    expect(dessert).toBeInTheDocument();
    expect(goat).toBeInTheDocument();
    expect(all).toBeInTheDocument();

    const buttonDrink = screen.getByTestId('drinks-bottom-btn');

    userEvent.click(buttonDrink);

    const ordyDrinks = await screen.findByText('Ordinary Drink');
    const cocktail = await screen.findByText('Cocktail');
    const shake = await screen.findByText('Shake');
    const others = await screen.findByText('Other / Unknown');
    const cocoa = await screen.findByText('Cocoa');
    const allDrinks = await screen.findByText('All');

    expect(ordyDrinks).toBeInTheDocument();
    expect(cocktail).toBeInTheDocument();
    expect(shake).toBeInTheDocument();
    expect(others).toBeInTheDocument();
    expect(cocoa).toBeInTheDocument();
    expect(allDrinks).toBeInTheDocument();
  });

  test('Verifica a funcionalidade dos botões de categoria na página Drinks ', async () => {
    renderWithRouter(<App />);
    const buttonDrink = screen.getByTestId('drinks-bottom-btn');

    userEvent.click(buttonDrink);

    const cocktail = await screen.findByText('Cocktail');

    userEvent.click(cocktail);

    const belmont155 = await screen.findByRole('img', {
      name: /155 Belmont/i,
    });

    expect(belmont155).toBeInTheDocument();

    userEvent.click(cocktail);

    const gG = await screen.findByRole('img', {
      name: /GG/i,
    });

    expect(gG).toBeInTheDocument();
  });
  test('Verifica a funcionalidade dos botões de categoria na página Meals ', async () => {
    renderWithRouter(<App />);

    const buttonMeal = screen.getByTestId('meals-bottom-btn');

    userEvent.click(buttonMeal);

    const breakfast = await screen.findByText('Breakfast');

    userEvent.click(breakfast);

    const brfsPotatoes = await screen.findByRole('img', {
      name: /Breakfast Potatoes/i,
    });

    expect(brfsPotatoes).toBeInTheDocument();

    userEvent.click(breakfast);

    const corba = await screen.findByRole('img', {
      name: /Corba/i,
    });

    expect(corba).toBeInTheDocument();
  });

  test('Verifica se, ao clicar no botão All, retorna às receitas iniciais ', async () => {
    renderWithRouter(<App />);

    const buttonMeal = screen.getByTestId('meals-bottom-btn');

    userEvent.click(buttonMeal);

    const allButton = await screen.findByText('All');
    const chicken = await screen.findByText('Chicken');

    userEvent.click(chicken);
    userEvent.click(allButton);

    const corba = await screen.findByRole('img', {
      name: /Corba/i,
    });

    expect(corba).toBeInTheDocument();
  });
});
