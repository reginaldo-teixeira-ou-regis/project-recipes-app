import React from 'react';
import '../css/footer.css';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer data-testid="footer" className="footer">
      <Link to="/drinks">
        <img
          src="../images/drinkIcon.svg"
          data-testid="drinks-bottom-btn"
          alt="ícone de bebida"
        />
      </Link>
      <Link to="/meals">
        <img
          src="../images/mealIcon.svg"
          data-testid="meals-bottom-btn"
          alt="ícone de comida"
        />
      </Link>
    </footer>
  );
}

export default Footer;
