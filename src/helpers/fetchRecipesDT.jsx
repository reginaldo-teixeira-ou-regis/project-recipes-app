const fetchRecipesDT = async (
  states,
  makeFetch,
  pathname,
  id,
) => {
  const { setRecommendationsMeals,
    setMeals,
    setRecommendationsDrinks,
    setDrink } = states;
  if (pathname.includes('/meals')) {
    const mealsReq = await makeFetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const recommendationMealss = await makeFetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    setRecommendationsMeals(recommendationMealss.drinks);
    setMeals(mealsReq.meals);
  }
  if (pathname.includes('/drinks')) {
    const drinkReq = await makeFetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
    const recommendationsDrinkss = await makeFetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    setRecommendationsDrinks(recommendationsDrinkss.meals);
    setDrink(drinkReq.drinks);
  }
};

export default fetchRecipesDT;
