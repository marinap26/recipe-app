import { RecipeType } from "../pages/RecipeAppPage";

const useAPIService = () => {
  const searchRecipes = async (searchTerm: string, page: number) => {
    const url = new URL("http://localhost:5000/api/recipe/search");
    url.searchParams.append("searchTerm", searchTerm);
    url.searchParams.append("page", page.toString());

    const response = await fetch(url.toString());

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    return response.json();
  };

  const getRecipeSummary = async (recipeId: string) => {
    const url = new URL(`http://localhost:5000/api/recipe/${recipeId}/summary`);
    const response = await fetch(url.toString());

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    return response.json();
  };

  const getFavoriteRecepies = async () => {
    const url = new URL("http://localhost:5000/api/recipe/favorite");
    const response = await fetch(url.toString());

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    return response.json();
  };

  const addFavoriteRecipe = async (recipe: RecipeType) => {
    const url = new URL("http://localhost:5000/api/recipe/favorite");
    const body = {
      recipeId: recipe.id
    }

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  }

  const deleteFavoriteRecipe = async (recipe: RecipeType) => {
    const url = new URL("http://localhost:5000/api/recipe/favorite");
    const body = {
      recipeId: recipe.id
    }
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  }

  return {
    searchRecipes,
    getRecipeSummary,
    getFavoriteRecepies,
    addFavoriteRecipe, 
    deleteFavoriteRecipe
  };
};

export default useAPIService;
