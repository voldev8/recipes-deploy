import { useState, useContext, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";

import logo from "/recipe-app-logo.png";

import Sidebar from "./Sidebar";
// import { CSSTransitionGroup } from "react-transition-group";

import AuthContext from "../context/auth/authContext";

import "./Navbar.css";

function Navbar() {
  const nodeRef = useRef(null);
  const authContext = useContext(AuthContext);
  const { isAuthenticated, logout } = authContext;

  const [sidebar, setSidebar] = useState(false);
  const handleClick = () => {
    setSidebar(!sidebar);
  };

  const navigate = useNavigate();
  const loggingOut = () => {
    logout();
    navigate("/");
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
      {/* <CSSTransition
        className="sidebar-outer"
        transitionName="slide"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={300}
      > */}
      {sidebar && <Sidebar />}
      {/* </CSSTransition> */}
    </>
  );
}

export default Navbar;
