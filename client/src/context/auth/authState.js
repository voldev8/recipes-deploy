import React from 'react';
import axios from 'axios';

import AuthContext from '../auth/authContext';
import authReducer from '../auth/authReducer';

import {
  SIGNUP_SUCCESS,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  SIGNUP_FAIL,
  LOGIN_FAIL,
  LOGOUT,
  FORGOT_PASS,
  FORGOT_PASS_FAIL,
  RESET_PASS,
  RESET_PASS_FAIL,
  GET_FAV,
  ADD_FAV,
  REMOVE_FAV,
  CLEAR_ERRORS,
} from '../types';
import { useReducer } from 'react';

const AuthState = (props) => {
  let token = document.cookie.token;
  const initialState = {
    token: token,
    isAuthenticated: false,
    loading: true,
    user: null,
    error: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load User
  const loadUser = async () => {
    try {
      const res = await axios.get('/users');

      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    } catch (err) {
      dispatch({ type: AUTH_ERROR });
    }
  };

  // Register User
  const signup = async (formData) => {
    try {
      const res = await axios.post('/auth/signup', formData, {
        withCredentials: true,
      });

      dispatch({
        type: SIGNUP_SUCCESS,
        payload: res.data,
      });

      loadUser();
    } catch (err) {
      dispatch({
        type: SIGNUP_FAIL,
        payload: err.response.data.error,
      });
    }
  };

  // Login User
  const login = async (formData) => {
    try {
      const res = await axios.post('/auth/login', formData, {
        withCredentials: true,
      });
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });

      loadUser();
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.error,
      });
    }
  };
  // Logout User
  const logout = async () => {
    try {
      await axios.get('/auth/logout');
      dispatch({
        type: LOGOUT,
      });
    } catch (err) {
      console.log(err);
    }
  };
  // Forgot Password
  const forgotPassword = async (email) => {
    try {
      const res = await axios.post(
        '/auth/forgotpassword',
        { email },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      dispatch({
        type: FORGOT_PASS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: FORGOT_PASS_FAIL,
        payload: err.response.data.error,
      });
    }
  };

  const resetPassword = async (password, resetToken) => {
    try {
      const res = await axios.put(
        `/auth/resetpassword/${resetToken}`,
        { password },
        {
          withCredentials: true,
        }
      );
      dispatch({
        type: RESET_PASS,
        payload: res.data,
      });

      loadUser();
    } catch (err) {
      dispatch({
        type: RESET_PASS_FAIL,
        payload: err.response.data.error,
      });
    }
  };

  const getFav = async () => {
    try {
      const res = await axios.get('/users/fav');

      dispatch({
        type: GET_FAV,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
  const addFav = async (recipeId) => {
    try {
      const res = await axios.put(
        '/users/addfav',
        { recipeId: recipeId },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      dispatch({
        type: ADD_FAV,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
  const removeFav = async (recipeId) => {
    try {
      const res = await axios.put(
        '/users/removefav',
        { recipeId: recipeId },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      dispatch({
        type: REMOVE_FAV,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

  // Clear Errors
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        loadUser,
        signup,
        login,
        logout,
        forgotPassword,
        resetPassword,
        getFav,
        addFav,
        removeFav,
        clearErrors,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
