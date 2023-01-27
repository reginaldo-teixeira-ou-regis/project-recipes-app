import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import SearchBarProvider from './context/SearchBarProvider';
import Login from './pages/Login';
import Recipes from './pages/Recipes';

function App() {
  return (
    <SearchBarProvider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/meals" component={ Recipes } />
      </Switch>
    </SearchBarProvider>
  );
}

export default App;
