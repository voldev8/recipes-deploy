import React, { useState, useContext, useEffect } from 'react';
// import { useHistory } from 'react-router-dom';

import Header from '../components/Header';

import AlertContext from '../context/alert/alertContext';
import AuthContext from '../context/auth/authContext';

const ForgotPass = () => {
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  const authContext = useContext(AuthContext);
  const { forgotPassword, error, clearErrors } = authContext;

  // const history = useHistory();
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (error) {
      setAlert(error, 'danger');
      clearErrors();
    }

    // eslint-disable-next-line
  }, [error]);

  const handleChange = (e) => setEmail(e.target.value);
  const handleSubmit = (e) => {
    e.preventDefault();
    forgotPassword(email);

    if (!error) {
      setAlert('A reset password email is sent', 'danger');
    }
  };

  return (
    <>
      <Header heading="Forgot Password" />
      <div className="container">
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="row">
            <label htmlFor="email">
              <p>Your Email:</p>{' '}
            </label>
            <input
              className="recipe-input"
              type="email"
              name="email"
              id="email"
              onChange={handleChange}
            />
          </div>
          <div className="row">
            <input
              className="recipe-submit-btn"
              type="submit"
              value="Send Email!"
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default ForgotPass;
