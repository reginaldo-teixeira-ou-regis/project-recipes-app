import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

describe('testes no componente Footer', () => {
  it('testa o footer', () => {
    renderWithRouter(<App />);
    const email = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');
    const buttonEnt = screen.getByTestId('login-submit-btn');

    userEvent.type(email, 'grupo10@gmail.com');
    userEvent.type(password, '1234567');
    userEvent.click(buttonEnt);

    const drinkImg = screen.getByText('ícone de bebida');
    const mealImg = screen.getByText('ícone de comida');
    expect(mealImg).toBeInTheDocument();
    expect(drinkImg).toBeInTheDocument();
  });
});
