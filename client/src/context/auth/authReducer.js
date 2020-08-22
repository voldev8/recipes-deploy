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
  RESET_PASS_FAIL,
  CLEAR_ERRORS,
  GET_FAV,
  ADD_FAV,
  REMOVE_FAV,
  RESET_PASS,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
      };
    case SIGNUP_SUCCESS:
    case LOGIN_SUCCESS:
    case RESET_PASS:
      document.cookie = 'token=' + action.payload.token + '; secure';
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
      };
    case FORGOT_PASS:
      return { ...state, ...action.payload, loading: false };
    case SIGNUP_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case FORGOT_PASS_FAIL:
    case RESET_PASS_FAIL:
    case LOGOUT:
      // localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: action.payload,
      };
    case GET_FAV:
      return { ...state, favRecipes: action.payload, loading: false };
    case REMOVE_FAV:
    case ADD_FAV:
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
