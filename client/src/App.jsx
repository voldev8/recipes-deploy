import {
  Form,
  Link,
  Outlet,
  RouterProvider,
  createBrowserRouter,
  redirect,
  useActionData,
  useFetcher,
  useLocation,
  useNavigation,
  useRouteLoaderData,
} from "react-router-dom";

import Home from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";

import Recipes from "./pages/Recipes";
import Main from "./pages/Main";
import Login from "./pages/Login";

import ForgotPass from "./pages/ForgotPass";
import ResetPass from "./pages/ResetPass";
import Signup from "./pages/Signup";
import RecipeAdd from "./pages/RecipeAdd";
import RecipeEdit from "./pages/RecipeEdit";
import RecipeSearch from "./pages/RecipeSearch";
import NoLink from "./pages/NoLink";
import Loading from "./components/Loading.jsx";

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
        element: <Login />,
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
        element: <Signup />,
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
        // ???
        // path="/recipe-edit"
        // render={(props) => (
        //   <RecipeEdit {...props} currentRecipe={currentRecipe} />
        // )}
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
