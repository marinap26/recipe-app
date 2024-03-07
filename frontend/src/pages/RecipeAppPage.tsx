import "../App.css";

import { Button, Tabs } from "antd";
import React, { useEffect, useRef, useState } from "react";

import FavRecipeCard from "../components/FavRecipeCard";
import RecipeCard from "../components/RecipeCard";
import RecipeModal from "../components/RecipeModal";
import Search from "antd/es/input/Search";
import type { TabsProps } from "antd";
import { Typography } from "antd";
import useAPIService from "../services/APIService";

export interface RecipeType {
  id: number;
  title: string;
  image: string;
  imageType: string;
}

export interface RecipeSummaryType {
  id: number;
  title: string;
  summary: string;
}

const RecipeAppPage: React.FC = () => {
  const {
    searchRecipes,
    getRecipeSummary,
    getFavoriteRecepies,
    addFavoriteRecipe,
    deleteFavoriteRecipe,
  } = useAPIService();
  const { Title } = Typography;
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [recipes, setRecipes] = useState<RecipeType[]>([]);
  const [favoriteRecipes, setFavoriteRecipes] = useState<RecipeType[]>([]);
  const [recipeSummary, setRecipeSummary] = useState<RecipeSummaryType>();
  const [selectedTab, setSelectedTab] = useState<string>("search");
  const [viewRecipe, setViewRecipe] = useState<boolean>(false);
  const pageNumber = useRef(1);

  const handleSearchRecipe = async () => {
    try {
      const { results } = await searchRecipes(searchTerm, 1);
      setRecipes(results);
      pageNumber.current = 1;
    } catch (error) {
      console.error(error);
    }
  };
  
  const handleViewMore = async () => {
    try {
      const nextPage = pageNumber.current + 1;
      const nextRecipes = await searchRecipes(searchTerm, nextPage);
      setRecipes((prevRecipes) => [...prevRecipes, ...nextRecipes.results]);
      pageNumber.current = nextPage;
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  const handleGetRecipeSumamry = async (recipeId: string) => {
    try {
      const data = await getRecipeSummary(recipeId);
      setRecipeSummary(data);
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  const handleGetFavoriteRecipes = async () => {
    try {
      const data = await getFavoriteRecepies();
      setFavoriteRecipes(data);
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  const handleAddFavoriteRecipe = async (recipe: RecipeType) => {
    try {
      await addFavoriteRecipe(recipe);
      setFavoriteRecipes([...favoriteRecipes, recipe]);
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  const handleDeleteFavoriteRecipe = async (recipe: RecipeType) => {
    try {
      await deleteFavoriteRecipe(recipe);
      setFavoriteRecipes(favoriteRecipes.filter((rec) => rec.id !== recipe.id));
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  useEffect(() => {
    if (searchTerm === "") {
      setRecipes([]);
    }
  }, [searchTerm]);

  const recipeElements = recipes?.map((recipe) => {
    const isFavourite = favoriteRecipes.some(
      (favRecipe) => favRecipe.id === recipe.id
    );
    return (
      <RecipeCard
        key={recipe.id}
        recipe={recipe}
        id={recipe.id}
        title={recipe.title}
        image={recipe.image}
        imageType={recipe.imageType}
        setViewRecipe={setViewRecipe}
        isFavourite={isFavourite}
        handleGetRecipeSumamry={handleGetRecipeSumamry}
        handleAddFavoriteRecipe={handleAddFavoriteRecipe}
      />
    );
  });

  const favRecipeElements = favoriteRecipes?.map((recipe) => {
    return (
      <FavRecipeCard
        key={recipe.id}
        recipe={recipe}
        id={recipe.id}
        title={recipe.title}
        image={recipe.image}
        imageType={recipe.imageType}
        isFavourite={true}
        handleDeleteFavoriteRecipe={handleDeleteFavoriteRecipe}
      />
    );
  });

  const items: TabsProps["items"] = [
    {
      key: "search",
      label: "Search",
      children: (
        <>
          <Search
            placeholder="Search recipe"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onSearch={handleSearchRecipe}
            allowClear
          />
          <div className="recipes-grid">{recipeElements}</div>
          {recipes?.length > 0 && (
            <Button type="primary" size="small" onClick={handleViewMore}>
              View more
            </Button>
          )}
        </>
      ),
    },
    {
      key: "favourites",
      label: "Favourites",
      children: <div className="recipes-grid">{favRecipeElements}</div>,
    },
  ];

  const onChange = async (activeKey: string) => {
    setSelectedTab(activeKey);
    if (activeKey === "favourites") {
      await getFavoriteRecepies();
    }
  };

  return (
    <div className="app-container">
      <Title
        style={{
          textAlign: "center",
          fontWeight: "bold",
          padding: "10px 20px",
          borderRadius: "5px",
          marginBottom: "20px",
          textTransform: "uppercase",
          letterSpacing: "2px",
        }}
      >
        Recipe App
      </Title>
      <Tabs
        defaultActiveKey="1"
        items={items}
        onChange={(activeKey) => onChange(activeKey)}
      />
      {viewRecipe && (
        <RecipeModal
          viewRecipe={viewRecipe}
          setViewRecipe={setViewRecipe}
          recipeSummary={recipeSummary}
          setRecipeSummary={setRecipeSummary}
        />
      )}
    </div>
  );
};

export default RecipeAppPage;
