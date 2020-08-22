import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import logo from '../media/recipe-app-logo.png';

import Sidebar from './Sidebar';
import { CSSTransitionGroup } from 'react-transition-group';

import AuthContext from '../context/auth/authContext';

import './Navbar.css';

function Navbar() {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, logout } = authContext;

  const [sidebar, setSidebar] = useState(false);
  const handleClick = () => {
    setSidebar(!sidebar);
  };

  const history = useHistory();
  const loggingOut = () => {
    logout();
    history.push('/');
  };
  return (
    <>
      <nav className="navbar">
        <div className="logo">
          <a href="/">
            <img src={logo} alt="logo" />
            <h2>Flavorites</h2>
          </a>
        </div>
        <div className="pages">
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
      <CSSTransitionGroup
        className="sidebar-outer"
        transitionName="slide"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={300}
      >
        {sidebar && <Sidebar />}
      </CSSTransitionGroup>
    </>
  );
}

export default Navbar;
