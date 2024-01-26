import Header from "../components/Header";
import RecipeList from "../components/RecipeList";

const Recipes = () => {
  return (
    <>
      <Header heading={"All recipes"} />
      <RecipeList />
    </>
  );
};

export default Recipes;
