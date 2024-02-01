import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Home from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";

import Recipes from "./pages/Recipes";
import Main from "./pages/Main";
import Login from "./pages/Login";

// import ForgotPass from "./pages/ForgotPass";
// import ResetPass from "./pages/ResetPass";
import Signup from "./pages/Signup";
import RecipeAdd from "./pages/RecipeAdd";
import RecipeEdit from "./pages/RecipeEdit";
import RecipeSearch from "./pages/RecipeSearch";
import NoLink from "./pages/NoLink";
import UserForm from "./components/UserForm";

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
        element: <UserForm form_type={"signup"} heading={"Become a Member"} />,
      },
      {
        path: "/recipes",
        element: <Recipes />,
      },
      {
        path: "/recipe-add",
        element: <RecipeAdd />,
      },
      {
        path: "/recipe-edit/:recipeId",
        element: <RecipeEdit />,
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
