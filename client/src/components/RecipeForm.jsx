import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Input from "./RecipeInput";
import Header from "./Header";

import RecipeContext from "../context/recipe/recipeContext";
import AlertContext from "../context/alert/alertContext";
import AuthContext from "../context/auth/authContext";

import "./RecipeForm.css";

const RecipeForm = ({ form_type, heading }) => {
  const recipeContext = useContext(RecipeContext);
  const { currentRecipe, updateRecipe, recipes, addRecipe, getRecipes } =
    recipeContext;

  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  const authContext = useContext(AuthContext);
  const { user } = authContext;

  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState([""]);
  const [instructions, setInstructions] = useState([""]);
  const [tags, setTags] = useState([""]);
  const [image, setImage] = useState(
    "https://media.istockphoto.com/vectors/smiling-chef-face-vector-id533998629?k=6&m=533998629&s=612x612&w=0&h=vnud6hVo61ORPVmLuoPOFFMHTdAyM1YorfgINRLnurY="
  );
  const [link, setLink] = useState("");
  const [createdBy, setCreatedBy] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (currentRecipe && form_type === "edit_recipe") {
      setName(currentRecipe.name);
      setIngredients(currentRecipe.ingredients);
      setInstructions(currentRecipe.instructions);
      setTags(currentRecipe.tags);
      setImage(currentRecipe.image);
      setLink(currentRecipe.link);
    } else if (form_type === "add_recipe") {
      // Reset form state when switching from edit to add recipe
      setName("");
      setIngredients([""]);
      setInstructions([""]);
      setTags([""]);
      setImage(
        "https://media.istockphoto.com/vectors/smiling-chef-face-vector-id533998629?k=6&m=533998629&s=612x612&w=0&h=vnud6hVo61ORPVmLuoPOFFMHTdAyM1YorfgINRLnurY="
      );
      setLink("");
      getRecipes();
    }
    setCreatedBy(user && user.data._id);
  }, [currentRecipe, user, form_type]);

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      if (form_type === "edit_recipe") {
        //check if user is the creator
        if (currentRecipe.createdBy === createdBy) {
          updateRecipe({
            id: currentRecipe._id,
            name,
            ingredients,
            instructions,
            tags: tags.map((tag) => tag.toLowerCase()),
            image,
            link,
          });
          setAlert("Recipe changed successfully", "add");
          setTimeout(() => {
            navigate("/recipes");
          }, 1500);
        } else {
          setAlert("You can not edit this recipe.", "add");
          navigate("/");
        }
        localStorage.removeItem("edit_id");
      } else if (form_type === "add_recipe") {
        const exists = recipes.some((recipe) => recipe.name === name);
        if (!exists) {
          addRecipe({
            name,
            ingredients,
            instructions,
            tags: tags.map((tag) => tag.toLowerCase()),
            image,
            link,
            createdBy,
          });
          setAlert("Recipe added to the list successfully", "add");
          setTimeout(() => {
            navigate("/recipes");
          }, 1500);
        } else {
          setAlert("Recipe name already exists.Please try another name.");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Header heading={heading} />
      <div className="recipe-form-container">
        <form className="recipe-form" onSubmit={handleSubmit}>
          <div className="row">
            <label htmlFor="name">
              <p>recipe name:</p>
            </label>
            <input
              className="recipe-input"
              type="text"
              name="name"
              id="name"
              value={name}
              required
              autoFocus
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="row">
            <label htmlFor="ingredient"></label>
            <Input
              input_type={ingredients}
              fn={setIngredients}
              rowType={"ingredients"}
              onChange={(e) => setIngredients(e.target.value)}
            />
          </div>

          <div className="row">
            <label htmlFor="instructions"></label>
            <Input
              input_type={instructions}
              fn={setInstructions}
              rowType={"instructions"}
              onChange={(e) => setInstructions(e.target.value)}
            />
          </div>

          <div className="row">
            <label htmlFor="tags"></label>
            <Input
              input_type={tags}
              fn={setTags}
              rowType={"tags"}
              onChange={(e) => setTags(e.target.value)}
            />
          </div>

          <div className="row">
            <label htmlFor="image">
              <p>image url:</p>{" "}
            </label>
            <input
              className="recipe-input"
              type="text"
              name="image"
              id="image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </div>

          <div className="row">
            <label htmlFor="link">
              <p>recipe link:</p>{" "}
            </label>
            <input
              className="recipe-input"
              type="text"
              name="link"
              id="link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
          </div>

          <div className="row">
            <input
              className="recipe-submit-btn"
              type="submit"
              value={form_type === "add_recipe" ? "Add Recipe" : "Save Changes"}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default RecipeForm;
