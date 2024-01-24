import React, { useState, useContext, useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import Input from '../components/Input';

import RecipeContext from '../context/recipe/recipeContext';
import AlertContext from '../context/alert/alertContext';
import AuthContext from '../context/auth/authContext';

import './RecipeForm.css';

const RecipeAdd = (props) => {
  const recipeContext = useContext(RecipeContext);
  const { recipes, addRecipe, getRecipes } = recipeContext;

  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  const authContext = useContext(AuthContext);
  const { user } = authContext;

  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState(['']);
  const [instructions, setInstructions] = useState(['']);
  const [tags, setTags] = useState(['']);
  const [image, setImage] = useState(
    'https://media.istockphoto.com/vectors/smiling-chef-face-vector-id533998629?k=6&m=533998629&s=612x612&w=0&h=vnud6hVo61ORPVmLuoPOFFMHTdAyM1YorfgINRLnurY='
  );
  const [link, setLink] = useState('/no-link');
  const [createdBy, setCreatedBy] = useState('');

  useEffect(() => {
    getRecipes();
    setCreatedBy(user && user.data._id);
    // eslint-disable-next-line
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
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
        setAlert('Recipe added to the list successfully', 'add');
        setTimeout(() => {
          props.history.push('/recipes');
        }, 1500);
      } else {
        setAlert('Recipe name already exists.Please try another name.');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="recipe-form-outer">
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
            required
            autoFocus
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <Input
          input_type={ingredients}
          fn={setIngredients}
          rowType={'ingredients'}
          onChange={(e) => setIngredients(e.target.value)}
        />
        <Input
          input_type={instructions}
          fn={setInstructions}
          rowType={'instructions'}
          onChange={(e) => setInstructions(e.target.value)}
        />
        <Input
          input_type={tags}
          fn={setTags}
          rowType={'tags'}
          onChange={(e) => setTags(e.target.value)}
        />

        <div className="row">
          <label htmlFor="image">
            <p>image url:</p>{' '}
          </label>
          <input
            className="recipe-input"
            type="text"
            name="image"
            id="image"
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
        <div className="row">
          <label htmlFor="link">
            <p>recipe link:</p>{' '}
          </label>
          <input
            className="recipe-input"
            type="text"
            name="link"
            id="link"
            onChange={(e) => setLink(e.target.value)}
          />
        </div>
        <div className="row">
          <input
            className="recipe-submit-btn"
            type="submit"
            value="Add Recipe!"
          />
        </div>
      </form>
    </div>
  );
};

export default withRouter(RecipeAdd);
