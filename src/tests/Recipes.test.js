import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import Recipes from '../pages/Recipes';
import renderWithRouter from './helpers/renderWithRouter';

describe('Testa o componente Recipes', () => {
  test('Verifica os botões de categoria', () => {
    renderWithRouter(<Recipes />);
    const ordyDrinks = screen.getByText('Ordinary Drink-category-filter');
    const cocktail = screen.getByText('Cocktail-category-filter');
    const shake = screen.getByText('Shake-category-filter');
    const others = screen.getByText('Other / Unknown-category-filter');
    const cocoa = screen.getByText('Cocoa-category-filter');
    const all = screen.getByText('All-category-filter');

    expect(ordyDrinks).toBeInTheDocument();
    expect(cocktail).toBeInTheDocument();
    expect(shake).toBeInTheDocument();
    expect(others).toBeInTheDocument();
    expect(cocoa).toBeInTheDocument();
    expect(all).toBeInTheDocument();
  });
});
