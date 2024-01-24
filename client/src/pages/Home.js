import React, { useContext, useEffect } from 'react';
import { Route } from 'react-router-dom';

import Main from './Main';
import Login from './Login';
import ForgotPass from './ForgotPass';
import ResetPass from './ResetPass';
import Signup from './Signup';
import Recipes from './Recipes';
import RecipeAdd from './RecipeAdd';
import RecipeEdit from './RecipeEdit';
import RecipeSearch from './RecipeSearch';
import NoLink from './NoLink';
import Navbar from '../components/Navbar';
import Alert from '../components/Alert';
import Footer from '../components/Footer';

import RecipeContext from '../context/recipe/recipeContext';
import AuthContext from '../context/auth/authContext';

import './Home.css';

const Home = () => {
  const recipeContext = useContext(RecipeContext);
  const { getRecipe, currentRecipe } = recipeContext;
  const authContext = useContext(AuthContext);
  const { loadUser } = authContext;

  useEffect(() => {
    loadUser();
    if (localStorage.getItem('edit_id')) {
      getRecipe(localStorage.getItem('edit_id'));
    }
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Navbar />
      <Alert />
      <Route exact path="/" component={Main} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/forgotpass" component={ForgotPass} />
      <Route exact path="/resetpassword/:resettoken" component={ResetPass} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/recipes" component={Recipes} />
      <Route exact path="/recipe-add" component={RecipeAdd} />
      <Route
        path="/recipe-edit"
        render={(props) => (
          <RecipeEdit {...props} currentRecipe={currentRecipe} />
        )}
      />
      <Route exact path="/recipe-search" component={RecipeSearch} />
      <Route exact path="/no-link" component={NoLink} />
      <Footer />
    </>
  );
};

export default Home;
