import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Login from './pages/Login';
import Drinks from './pages/Drinks';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import AppProvider from './context/AppProvider';
import Recipes from './pages/Recipes';
import RecipeDetails from './pages/RecipeDetails';

// mudei o componente renderizado nas linhas 25 e 26 de login para RecipeDetails
function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/meals" component={ Recipes } />
          <Route exact path="/drinks" component={ Drinks } />
          <Route exact path="/profile" component={ Profile } />
          <Route exact path="/done-recipes" component={ DoneRecipes } />
          <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
          <Route exact path="/meals/:id-da-receita" component={ RecipeDetails } />
          <Route exact path="/drinks/:id-da-receita" component={ RecipeDetails } />
          <Route exact path="/meals/:id-da-receita/in-progress" component={ Login } />
          <Route exact path="/drinks/:id-da-receita/in-progress" component={ Login } />
        </Switch>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
