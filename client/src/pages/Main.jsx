import { useContext } from "react";

import BigButton from "../components/BigButton.jsx";
import Loading from "../components/Loading.jsx";
import Dashboard from "../components/Dashboard.jsx";

import AuthContext from "../context/auth/authContext.js";

import "./Main.css";

const Main = () => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, loading } = authContext;
  console.log(isAuthenticated);
  return (
    <>
      {loading ? (
        <Loading />
      ) : isAuthenticated ? (
        <Dashboard />
      ) : (
        <div className="main">
          <p className="info">
            Welcome to <span>Flavorites</span>. You can browse as a guest, or
            sign up to share recipes and create your own flavorites catalog.
          </p>
          <div>
            <BigButton name={"Log in"} href="/login" />
            <BigButton name={"Sign up"} href="/signup" />
          </div>
        </div>
      )}
    </>
  );
};

export default Main;
