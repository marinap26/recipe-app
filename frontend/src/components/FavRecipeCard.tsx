import { DeleteOutlined, HeartFilled, HeartOutlined } from "@ant-design/icons";

import { Card } from "antd";
import React from "react";
import { RecipeType } from "../pages/RecipeAppPage";
import useAPIService from "../services/APIService";

const { Meta } = Card;

interface Props {
  recipe: RecipeType;
  id: number;
  title: string;
  image: string;
  imageType: string;
  isFavourite: boolean;
  handleDeleteFavoriteRecipe: (recipe: RecipeType) => Promise<void>

}

const FavRecipeCard: React.FC<Props> = ({
  recipe,
  id,
  title,
  image,
  imageType,
  isFavourite,
  handleDeleteFavoriteRecipe
}) => {
  return (
    <Card
      style={{ width: 300 }}
      cover={<img alt={imageType} src={image} />}
      actions={[
        isFavourite ? (
          <HeartFilled style={{ color: "red" }} />
        ) : (
          <HeartOutlined />
        ),
        <DeleteOutlined
          onClick={async () => {
            await handleDeleteFavoriteRecipe(recipe);
          }}
        />,
      ]}
    >
      <Meta title={title} />
    </Card>
  );
};

export default FavRecipeCard;
