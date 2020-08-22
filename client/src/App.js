import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Home from './pages/Home';

import RecipeState from './context/recipe/recipeState';
import AlertState from './context/alert/alertState';
import AuthState from './context/auth/authState';

import './App.css';

const App = () => {
  return (
    <AuthState>
      <RecipeState>
        <AlertState>
          <Router>
            <div className="App">
              <Home />
            </div>
          </Router>
        </AlertState>
      </RecipeState>
    </AuthState>
  );
};

export default App;
