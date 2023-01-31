/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';
import useFetch from '../hooks/useFetch';

function AppProvider({ children }) {
  const [searchSelected, setSearchSelected] = useState({ typeSearch: '' });
  const [recipesFound, setRecipesFound] = useState([]);
  const [meals, setMeals] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const { errors, isLoading, makeFetch } = useFetch();
  const handleChange = (e) => {
    const { value, name } = e.target;
    setSearchSelected({ ...searchSelected, [name]: value });
  };

  const mealsAPI = async () => {
    const alerta = 'Sorry, we haven\'t found any recipes for these filters.';
    if (searchSelected.searchSelected === 'ingredient') {
      const fetchMeals = await makeFetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchSelected.typeSearch}`);
      console.log(fetchMeals);
      if (!fetchMeals.meals) {
        global.alert(alerta);
      }
      setMeals(fetchMeals.meals);
    } if (searchSelected.searchSelected === 'name') {
      const fetchMeals = await makeFetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchSelected.typeSearch}`);
      if (!fetchMeals.meals) {
        global.alert(alerta);
      }
      setMeals(fetchMeals.meals);
    } if (searchSelected.typeSearch.length > 1
      && searchSelected.searchSelected === 'letter') {
      global.alert('Your search must have only 1 (one) character');
    } if (searchSelected.searchSelected === 'letter') {
      const fetchMeals = await makeFetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${searchSelected.typeSearch}`);
      if (fetchMeals.length === 0) {
        global.alert(alerta);
      }
      setMeals(fetchMeals.meals);
    }
    // return fetchMeals.meals;
  };

  const drinksAPI = async () => {
    const alerta = 'Sorry, we haven\'t found any recipes for these filters.';
    if (searchSelected.searchSelected === 'ingredient') {
      const fetchDrinks = await makeFetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchSelected.typeSearch}`);
      console.log(fetchDrinks);
      if (!fetchDrinks.drinks) {
        global.alert(alerta);
      }
      setDrinks(fetchDrinks.drinks);
    } if (searchSelected.searchSelected === 'name') {
      const fetchDrinks = await makeFetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchSelected.typeSearch}`);
      if (!fetchDrinks.drinks) {
        global.alert(alerta);
      }
      setDrinks(fetchDrinks.drinks);
    } if (searchSelected.typeSearch.length > 1
      && searchSelected.searchSelected === 'letter') {
      global.alert('Your search must have only 1 (one) character');
    } if (searchSelected.searchSelected === 'letter') {
      const fetchDrinks = await makeFetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${searchSelected.typeSearch}`);
      if (!fetchDrinks.drinks) {
        global.alert(alerta);
      }
      setDrinks(fetchDrinks.drinks);
    }
  };

  useEffect(() => {
    if (meals && meals.length > 1) {
      setRecipesFound(meals);
    }

    if (drinks && drinks.length > 1) {
      setRecipesFound(drinks);
    }
  }, [meals, drinks]);

  const values = useMemo(() => ({
    searchSelected,
    handleChange,
    mealsAPI,
    drinksAPI,
    errors,
    isLoading,
    meals,
    drinks,
    recipesFound,
  }), [searchSelected, meals, drinks, recipesFound]);

  return (
    <AppContext.Provider value={ values }>
      { children }
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.instanceOf(Object).isRequired,
};

export default AppProvider;
