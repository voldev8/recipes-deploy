import React from 'react';

import Header from '../components/Header.js';
import RecipeList from '../components/RecipeList';

const Recipes = () => {
  return (
    <>
      <Header heading={'All recipes'} />
      <RecipeList />
    </>
  );
};

export default Recipes;
