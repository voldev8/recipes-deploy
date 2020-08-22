import React from 'react';
import { Link } from 'react-router-dom';
import './BigButton.css';

const BigButton = (props) => {
  return (
    <Link className="bigButton-link" to={props.href}>
      <button className="bigButton">
        <p>{props.name}</p>
      </button>
    </Link>
  );
};

export default BigButton;
