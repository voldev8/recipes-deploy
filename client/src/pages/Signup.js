import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import Header from '../components/Header';

import AlertContext from '../context/alert/alertContext';
import AuthContext from '../context/auth/authContext';

import './Signup.css';

const Signup = () => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);
  const { setAlert } = alertContext;
  const { signup, isAuthenticated, clearErrors, error } = authContext;
  const history = useHistory();

  useEffect(() => {
    if (isAuthenticated) {
      history.push('/');
    }

    if (error) {
      setAlert(error, 'danger');
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, history]);

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password_confirm: '',
  });
  const { name, email, password, password_confirm } = user;

  const handleChange = (e) =>
    setUser({ ...user, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name === '' || email === '' || password === '') {
      setAlert('Please fill in all fields', 'danger');
    } else if (password !== password_confirm) {
      setAlert('Passwords do not match', 'danger');
    } else {
      signup({
        name,
        email,
        password,
      });
    }
  };

  return (
    <>
      <Header heading="Signup Form" />
      <div className="signup-form-outer container">
        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="row">
            <label htmlFor="name">
              <p>Username:</p>
            </label>
            <input
              className="recipe-input"
              type="text"
              name="name"
              id="name"
              required
              onChange={handleChange}
            />
          </div>
          <div className="row">
            <label htmlFor="email">
              <p>Email:</p>
            </label>
            <input
              className="recipe-input"
              type="text"
              name="email"
              id="email"
              required
              onChange={handleChange}
            />
          </div>

          <div className="row">
            <label htmlFor="password">
              <p>Password:</p>{' '}
            </label>
            <input
              className="recipe-input"
              type="password"
              name="password"
              id="password"
              minLength="6"
              required
              onChange={handleChange}
            />
          </div>
          <div className="row">
            <label htmlFor="password_confirm">
              <p>Confirm Password:</p>{' '}
            </label>
            <input
              className="recipe-input"
              type="password"
              name="password_confirm"
              id="password_confirm"
              onChange={handleChange}
            />
          </div>

          <div className="row">
            <input
              className="recipe-submit-btn"
              type="submit"
              value="Sign up!"
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default Signup;
