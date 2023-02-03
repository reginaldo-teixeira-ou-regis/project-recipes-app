import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import SearchBar from '../components/SearchBar';
import renderWithRouter from './helpers/renderWithRouter';

describe('Testa o componente SearchBar', () => {
  test('Verifica se, ao clicar no botão, aparece ', () => {
    renderWithRouter(<SearchBar />);
  });
});
