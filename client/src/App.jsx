import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Home from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";

import Recipes from "./pages/Recipes";
import Main from "./pages/Main";
// import ForgotPass from "./pages/ForgotPass";
// import ResetPass from "./pages/ResetPass";

import RecipeSearch from "./pages/RecipeSearch";
import NoLink from "./pages/NoLink";
import UserForm from "./components/UserForm";
import RecipeForm from "./components/RecipeForm";

import RecipeState from "./context/recipe/recipeState";
import AlertState from "./context/alert/alertState";
import AuthState from "./context/auth/authState";

import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Main />,
      },
      {
        path: "/login",
        element: <UserForm form_type={"login"} heading={"Member Login"} />,
      },
      // {
      //   path: "/forgotpass",
      //   element: <ForgotPass />,
      // },
      // {
      //   path: "/resetpassword/:resettoken",
      //   element: <ResetPass />,
      // },
      {
        path: "/signup",
        element: <UserForm form_type={"sign_up"} heading={"Become a Member"} />,
      },
      {
        path: "/recipes",
        element: <Recipes />,
      },
      {
        path: "/recipe-add",
        element: <RecipeForm form_type={"add_recipe"} heading={"New Recipe"} />,
      },
      {
        path: "/recipe-edit/:recipeId",
        element: (
          <RecipeForm form_type={"edit_recipe"} heading={"Change Recipe"} />
        ),
      },
      {
        path: "/recipe-search",
        element: <RecipeSearch />,
      },
      {
        path: "/no-link",
        element: <NoLink />,
      },
    ],
  },
]);

const App = () => {
  return (
    <AuthState>
      <RecipeState>
        <AlertState>
          <RouterProvider router={router} />
        </AlertState>
      </RecipeState>
    </AuthState>
  );
};

export default App;
