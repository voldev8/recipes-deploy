import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import Header from '../components/Header';

import AlertContext from '../context/alert/alertContext';
import AuthContext from '../context/auth/authContext';

const ResetPass = () => {
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  const authContext = useContext(AuthContext);
  const { resetPassword, error, clearErrors, isAuthenticated } = authContext;

  const history = useHistory();
  const [password, setPassword] = useState({
    password: '',
    password2: '',
  });
  const [resetToken, setResetToken] = useState('');

  useEffect(() => {
    setResetToken(history.location.pathname.split('/')[2]);
    if (isAuthenticated) {
      history.push('/');
    }
    if (error) {
      setAlert(error, 'danger');
      clearErrors();
    }

    // eslint-disable-next-line
  }, [error, isAuthenticated, history]);

  const handleChange = (e) =>
    setPassword({ ...password, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password.password === password.password2) {
      resetPassword(password.password, resetToken);
    } else {
      setAlert('Password do not match', 'danger');
    }

    if (!error) {
      // setAlert('A reset password email is sent', 'danger');
    }
  };

  return (
    <>
      <Header heading="Reset Password" />
      <div className="container">
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="row">
            <label htmlFor="password">
              <p>New Password:</p>{' '}
            </label>
            <input
              className="recipe-input"
              type="password"
              name="password"
              id="password"
              minLength="6"
              onChange={handleChange}
            />
          </div>
          <div className="row">
            <label htmlFor="password2">
              <p>Confirm Password:</p>{' '}
            </label>
            <input
              className="recipe-input"
              type="password"
              name="password2"
              id="password2"
              onChange={handleChange}
            />
          </div>
          <div className="row">
            <input
              className="recipe-submit-btn"
              type="submit"
              value="Confirm!"
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default ResetPass;
