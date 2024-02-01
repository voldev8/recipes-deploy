import { useContext, useEffect } from "react";

import RecipeCard from "./RecipeCard.jsx";
import Loading from "./Loading.jsx";

import RecipeContext from "../context/recipe/recipeContext.js";

import "./RecipeList.css";

const RecipeList = () => {
  const recipeContext = useContext(RecipeContext);
  const { recipes, getRecipes, filtered, loading } = recipeContext;

  useEffect(() => {
    getRecipes();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="recipe-list">
      {loading ? (
        <Loading />
      ) : filtered === null && recipes !== null ? (
        recipes.map((recipe) => <RecipeCard key={recipe._id} recipe={recipe} />)
      ) : filtered.length === 0 ? (
        <p className="no_match">Your search did not match any recipes.</p>
      ) : filtered !== null ? (
        filtered.map((recipe) => (
          <RecipeCard key={recipe._id} recipe={recipe} />
        ))
      ) : null}
    </div>
  );
};

export default RecipeList;
