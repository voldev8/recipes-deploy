import React, { useContext, useEffect, useState } from 'react';
import RecipeCard from './RecipeCard.js';

import RecipeContext from '../context/recipe/recipeContext';
import AuthContext from '../context/auth/authContext';

import './Dashboard.css';

const Dashboard = () => {
  const recipeContext = useContext(RecipeContext);
  const { recipes, getRecipes } = recipeContext;

  const authContext = useContext(AuthContext);
  const { user } = authContext;

  const [favRecipeIds, setFavRecipeIds] = useState('');

  useEffect(() => {
    if (user) {
      getRecipes();
      setFavRecipeIds(user.data.favRecipes);
    }
    // eslint-disable-next-line
  }, [user]);

  const favRecipes = recipes.filter((recipe) =>
    favRecipeIds.includes(recipe._id)
  );

  return (
    <>
      <div className="dash_welcome">
        <h3 className="info">
          Hello, {user && user.data.name}. Your <span>flavorites</span>.{' '}
        </h3>
      </div>

      {favRecipes &&
        favRecipes.map((recipe) => (
          <RecipeCard key={recipe._id} recipe={recipe} />
        ))}
    </>
  );
};

export default Dashboard;
