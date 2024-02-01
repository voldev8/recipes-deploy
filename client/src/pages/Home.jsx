import { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar";
import Alert from "../components/Alert";
import Footer from "../components/Footer";

import RecipeContext from "../context/recipe/recipeContext";
import AuthContext from "../context/auth/authContext";

import "./Home.css";

const Home = () => {
  const recipeContext = useContext(RecipeContext);
  const { getRecipe } = recipeContext;
  const authContext = useContext(AuthContext);
  const { loadUser } = authContext;

  useEffect(() => {
    loadUser();
    if (localStorage.getItem("edit_id")) {
      getRecipe(localStorage.getItem("edit_id"));
    }
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Navbar />
      <div className="container">
        <Alert />
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Home;
