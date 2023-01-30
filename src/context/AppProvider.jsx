/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';
import useFetch from '../hooks/useFetch';

function AppProvider({ children }) {
  const [searchSelected, setSearchSelected] = useState({ typeSearch: '' });
  const [meals, setMeals] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const { errors, isLoading, makeFetch } = useFetch();
  const handleChange = (e) => {
    const { value, name } = e.target;
    setSearchSelected({ ...searchSelected, [name]: value });
  };

  const mealsAPI = async () => {
    if (searchSelected.searchSelected === 'ingredient') {
      const fetchMeals = await makeFetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchSelected.typeSearch}`);
      setMeals(fetchMeals.meals);
    } else if (searchSelected.searchSelected === 'name') {
      const fetchMeals = await makeFetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchSelected.typeSearch}`);
      setMeals(fetchMeals.meals);
    } else if (searchSelected.typeSearch.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    } else {
      const fetchMeals = await makeFetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${searchSelected.typeSearch}`);
      setMeals(fetchMeals.meals);
    }
    // return fetchMeals.meals;
  };

  const drinksAPI = async () => {
    if (searchSelected.searchSelected === 'ingredient') {
      const fetchDrinks = await makeFetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchSelected.typeSearch}`);
      setDrinks(fetchDrinks.drinks);
    } else if (searchSelected.searchSelected === 'name') {
      const fetchDrinks = await makeFetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchSelected.typeSearch}`);
      setDrinks(fetchDrinks.drinks);
    } else if (searchSelected.typeSearch.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    } else {
      const fetchDrinks = await makeFetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${searchSelected.typeSearch}`);
      setDrinks(fetchDrinks.drinks);
    }
  };
  // console.log(meals);
  // const requestApiByTitle = (drinkOrMeals) => {
  // if (drinkOrMeals === 'Meals') {
  //   mealsAPI();
  // }
  // if (drinkOrMeals === 'Drinks') {
  //   drinksAPI();
  // }
  // };

  //   useEffect(() => {
  //     const responseApi = async (url) => {
  //       const resposta = await makeFetch(url);
  //     };
  //     responseApi(url);
  //   }, []);

  const values = useMemo(() => ({
    searchSelected,
    handleChange,
    mealsAPI,
    drinksAPI,
    errors,
    isLoading,
    meals,
    drinks,
  }), [searchSelected, meals, drinks]);

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
