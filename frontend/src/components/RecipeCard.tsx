import { HeartFilled, HeartOutlined, MenuOutlined } from "@ant-design/icons";
import React, { useEffect } from "react";

import { Card } from "antd";
import { RecipeType } from "../pages/RecipeAppPage";
import useAPIService from "../services/APIService";

const { Meta } = Card;

interface Props {
  recipe: RecipeType,
  id: number;
  title: string;
  image: string;
  imageType: string;
  setViewRecipe: (viewRecipe: boolean) => void;
  isFavourite: boolean;
  handleGetRecipeSumamry: (recipeId: string) => Promise<void>;
  handleAddFavoriteRecipe: (recipe: RecipeType) => Promise<void>
}

const RecipeCard: React.FC<Props> = ({
  recipe,
  id,
  title,
  image,
  imageType,
  setViewRecipe,
  isFavourite,
  handleGetRecipeSumamry,
  handleAddFavoriteRecipe
}) => {
  return (
    <Card
      style={{ width: 300 }}
      cover={<img alt={imageType} src={image} />}
      actions={[
        isFavourite ? (
          <HeartFilled style={{ color: "red" }} />
        ) : (
          <HeartOutlined
            onClick={async () => {
              await handleAddFavoriteRecipe(recipe);
            }}
          />
        ),
        <MenuOutlined
          onClick={async () => {
            await handleGetRecipeSumamry(id.toString());
            setViewRecipe(true);
          }}
        />,
      ]}
    >
      <Meta title={title} />
    </Card>
  );
};

export default RecipeCard;
