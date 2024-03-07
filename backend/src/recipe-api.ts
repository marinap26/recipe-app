require("dotenv").config();
const fetch = require("node-fetch");
const API_KEY = process.env.API_KEY;

export const searchRecipes = async (searchTerm: string, page: number) => {
  if (!API_KEY) {
    throw new Error("APi key not found!");
  }

  const url = new URL("https://api.spoonacular.com/recipes/complexSearch");
  const queryParams = {
    apiKey: API_KEY,
    query: searchTerm,
    number: "10",
    offset: (page * 10).toString(),
  };
  url.search = new URLSearchParams(queryParams).toString();

  try {
    const searchResponse = await fetch(url.toString());
    const resultsJson = await searchResponse.json();
    return resultsJson;
  } catch (error) {
    console.error(error);
  }
};

export const getRecipeSummary = async (recipeId: string) => {
  if (!API_KEY) {
    throw new Error("APi key not found!");
  }

  const url = new URL(
    `https://api.spoonacular.com/recipes/${recipeId}/summary`
  );
  const queryParams = {
    apiKey: API_KEY,
  };
  url.search = new URLSearchParams(queryParams).toString();

  try {
    const searchResponse = await fetch(url.toString());
    const resultsJson = await searchResponse.json();
    return resultsJson;
  } catch (error) {
    console.log("error :>> ", error);
  }
};

export const getFavoriteRecipesByIds = async (ids: string[]) => {
  if (!API_KEY) {
    throw new Error("APi key not found!");
  }

  const url = new URL("https://api.spoonacular.com/recipes/informationBulk");
  const queryParams = {
    apiKey: API_KEY,
    ids: ids.join(","),
  };
  url.search = new URLSearchParams(queryParams).toString();

  try {
    const searchResponse = await fetch(url.toString());
    const resultsJson = await searchResponse.json();
    return resultsJson;
  } catch (error) {
    console.log("error :>> ", error);
  }
};
