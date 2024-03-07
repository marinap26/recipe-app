import { Button, Modal } from "antd";

import React from "react";
import { RecipeSummaryType } from "../pages/RecipeAppPage";

interface Props {
  viewRecipe: boolean;
  setViewRecipe: (viewRecipe: boolean) => void;
  recipeSummary: RecipeSummaryType | undefined;
  setRecipeSummary: (recipeSummary: RecipeSummaryType | undefined) => void;
}

const RecipeModal: React.FC<Props> = ({
  viewRecipe,
  setViewRecipe,
  recipeSummary,
  setRecipeSummary,
}) => {
  return (
    <Modal
      title={recipeSummary?.title}
      open={viewRecipe}
      footer={[]}
      onCancel={() => {
        setViewRecipe(false);
        setRecipeSummary(undefined);
      }}
    >
      <p
        dangerouslySetInnerHTML={{ __html: recipeSummary?.summary as string }}
      />
    </Modal>
  );
};

export default RecipeModal;
