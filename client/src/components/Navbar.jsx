import { useState, useContext, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import logo from "/recipe-app-logo.png";

import Sidebar from "./Sidebar";

import AuthContext from "../context/auth/authContext";

import "./Navbar.css";

const Navbar = () => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, logout } = authContext;

  const navigate = useNavigate();
  const loggingOut = () => {
    logout();
    navigate("/");
  };

  const [sidebar, setSidebar] = useState(false);

  const handleClick = () => {
    setSidebar(!sidebar);
  };

  return (
    <>
      <nav className="navbar">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="logo" />
            <h2>Flavorites</h2>
          </Link>
        </div>
        <div className="pages">
          <Link to="/recipes">Recipes</Link>
          <Link to="/recipe-search">Search</Link>
          {isAuthenticated && (
            <>
              <Link to="/">My Flavorites</Link>
              <Link to="/recipe-add">Add a recipe</Link>
              <Link to="#!" onClick={loggingOut}>
                Logout
              </Link>
            </>
          )}
        </div>
        <div className="burger-menu" onClick={handleClick}>
          {!sidebar ? (
            <svg viewBox="0 0 100 60" width="40" height="40" fill="white">
              <rect width="100" height="15" rx="6"></rect>
              <rect y="25" width="100" height="15" rx="6"></rect>
              <rect y="50" width="100" height="15" rx="6"></rect>
            </svg>
          ) : (
            <svg viewBox="0 0 100 60" width="40" height="40" fill="white">
              <line
                x1="20"
                y1="60"
                x2="80"
                y2="10"
                stroke="white"
                strokeWidth="15"
                strokeLinecap="round"
              />
              <line
                x1="20"
                y1="10"
                x2="80"
                y2="60"
                stroke="white"
                strokeWidth="15"
                strokeLinecap="round"
              />
            </svg>
          )}
        </div>
      </nav>
      {sidebar && <Sidebar />}
    </>
  );
};

export default Navbar;
