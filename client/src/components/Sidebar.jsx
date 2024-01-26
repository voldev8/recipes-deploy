import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import AuthContext from "../context/auth/authContext";

import "./Sidebar.css";

function Sidebar() {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, logout } = authContext;

  const navigate = useNavigate();
  const loggingOut = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      <div className="sidebar">
        <div className="sidebar-pages">
          <a href="/recipes">Recipes</a>
          <a href="/recipe-search">Search</a>
          {isAuthenticated && (
            <>
              <a href="/">My Flavorites</a>
              <a href="/recipe-add">Add a recipe</a>
              <a href="#!" onClick={loggingOut}>
                Logout
              </a>
            </>
          )}
        </div>
      </div>
      <div className="sidebar-darken"></div>
    </>
  );
}

export default Sidebar;
