/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';
import useFetch from '../hooks/useFetch';

function AppProvider({ children }) {
  const [searchSelected, setSearchSelected] = useState({ typeSearch: '' });
  const { errors, isLoading, makeFetch } = useFetch();
  const handleChange = (e) => {
    const { value, name } = e.target;
    setSearchSelected({ ...searchSelected, [name]: value });
  };

  const mealsAPI = () => {
    if (searchSelected.searchSelected === 'ingredient') {
      makeFetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchSelected.typeSearch}`);
    } else if (searchSelected.searchSelected === 'name') {
      makeFetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchSelected.typeSearch}`);
    } else if (searchSelected.typeSearch.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    } else {
      makeFetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${searchSelected.typeSearch}`);
    }
  };

  const drinksAPI = () => {
    if (searchSelected.searchSelected === 'ingredient') {
      makeFetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchSelected.typeSearch}`);
    } else if (searchSelected.searchSelected === 'name') {
      makeFetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchSelected.typeSearch}`);
    } else if (searchSelected.typeSearch.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    } else {
      makeFetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${searchSelected.typeSearch}`);
    }
  };

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
  }), [searchSelected]);

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
