import Footer from '../components/Footer';
import renderWithRouter from './helpers/renderWithRouter';

describe('testes no componente Footer', () => {
  it('testa o footer', () => {
    renderWithRouter(<Footer />);
    const drinkImg = '../images/mealIcon.svg';
    const mealImg = '../images/mealIcon.svg';
    expect(mealImg).toBeInTheDocument();
    expect(drinkImg).toBeInTheDocument();
  });
});
