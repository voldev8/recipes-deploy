import {
  GET_RECIPES,
  GET_RECIPE,
  ADD_RECIPE,
  UPDATE_RECIPE,
  DELETE_RECIPE,
  SEARCH_RECIPE_BY_NAME,
  SEARCH_RECIPE_BY_TAG,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_RECIPES:
      return { ...state, recipes: action.payload, loading: false };
    case GET_RECIPE:
      return { ...state, currentRecipe: action.payload, loading: false };
    case ADD_RECIPE:
      return {
        ...state,
        recipes: [action.payload, ...state.recipes],
        loading: false,
      };
    case UPDATE_RECIPE:
      return {
        ...state,
        recipes: state.recipes.map((recipe) =>
          recipe._id === action.payload._id ? action.payload : recipe
        ),
        loading: false,
      };
    case DELETE_RECIPE:
      return {
        ...state,
        recipes: state.recipes.filter(
          (recipe) => recipe._id !== action.payload
        ),
        loading: false,
      };
    case SEARCH_RECIPE_BY_NAME:
      return {
        ...state,
        filtered: state.recipes.filter((recipe) => {
          return recipe.name
            .toLowerCase()
            .includes(action.payload.toLowerCase());
        }),
        loading: false,
      };
    case SEARCH_RECIPE_BY_TAG:
      return {
        ...state,
        filtered: state.recipes.filter((recipe) => {
          return recipe.tags.join(' ').includes(action.payload.toLowerCase());
        }),
        loading: false,
      };
    default:
      return state;
  }
};
