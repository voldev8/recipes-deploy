import React, { useContext } from 'react';
import AlertContext from '../context/alert/alertContext';
import RecipeContext from '../context/recipe/recipeContext';

import './Alert.css';

const Alert = () => {
  const alertContext = useContext(AlertContext);
  const { alert, removeAlert } = alertContext;

  const recipeContext = useContext(RecipeContext);
  const { deleteRecipe } = recipeContext;

  const handleDelete = async () => {
    const id = await localStorage.getItem('delete_id');
    deleteRecipe(id);
    removeAlert();
    window.localStorage.removeItem('delete_id');
  };
  if (alert && alert.type === 'add') {
    setTimeout(() => {
      removeAlert();
    }, 1500);
  }

  return (
    alert !== null && (
      <div className="recipe-alert">
        <button
          onClick={() => {
            removeAlert();
          }}
        >
          x
        </button>
        <p>{alert.msg}</p>
        {alert.type === 'delete' ? (
          <div className="choice">
            <button
              onClick={() => {
                removeAlert();
              }}
            >
              No
            </button>
            <button className="choice" onClick={handleDelete}>
              Yes
            </button>
          </div>
        ) : null}
      </div>
    )
  );
};

export default Alert;
