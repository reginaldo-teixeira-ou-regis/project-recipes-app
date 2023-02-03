import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import userEvent from '@testing-library/user-event';
import SearchBar from '../components/SearchBar';
import renderWithRouter from './helpers/renderWithRouter';

describe('Testa o componente SearchBar', () => {
  test('Verifica se, ao clicar no botão, aparece a barra de pesquisa', () => {
    renderWithRouter(<SearchBar />);
    const searchIcon = screen.getByRole('img', {
      name: /searchicon/i,
    });
    const searchInput = screen.getByTestId('search-input');

    userEvent.click(searchIcon);
    expect(searchInput).toBeInTheDocument();
  });
});
