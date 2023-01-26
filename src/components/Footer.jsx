import React from "react";
import "../App.css";

function Footer() {
return (
<footer data-testid="footer" className="footer">
<img 
src="../images/drinkIcon.svg" 
data-testid="drinks-bottom-btn"
alt="ícone de bebida"></img>
<img 
src="../images/mealIcon.svg" 
data-testid="meals-bottom-btn"
alt="ícone de comida"></img>
</footer>
)
}

export default Footer;