// Recipe reducer

import {
  GET_RECIPE_BY_ID_REQUEST,
  GET_RECIPE_BY_ID_SUCCESS,
  GET_RECIPE_BY_ID_FAILURE,
  LIKE_DISLIKE_REC_FAILURE,
  LIKE_DISLIKE_REC_REQUEST,
  LIKE_DISLIKE_REC_SUCCESS,
  SEARCH_SUG_REC_FAILURE,
  SEARCH_SUG_REC_REQUEST,
  SEARCH_SUG_REC_SUCCESS,
  REPORT_ISSUE_REQUEST,
  REPORT_ISSUE_SUCCESS,
  REPORT_ISSUE_FAILURE,
  REVIEW_SET_REQUEST,
  REVIEW_SET_SUCCESS,
  REVIEW_SET_FAILURE,
  UPDATE_RECIPE_INGREDIENT_FAILURE,
  UPDATE_RECIPE_INGREDIENT_REQUEST,
  UPDATE_RECIPE_INGREDIENT_SUCCESS,
  CLEAN_SEARCH_RECIPE_REQUEST
} from '../../actions/types';

const initialState = {
  isLoading: false,
  recipeObject: null,
  updatedIngredients: [],
  errorMessage: ''
};

const recipeReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_RECIPE_BY_ID_REQUEST:
      return {
        ...state,
        isLoading: true,
        recipeObject: null
      };

    case GET_RECIPE_BY_ID_SUCCESS:
      return {
        ...state,
        recipeObject: action.data.data,
        errorMessage: '',
        isLoading: false
      };

    case GET_RECIPE_BY_ID_FAILURE:
      return {
        ...state,
        errorMessage: action.error.message,
        isLoading: false,
        recipeObject: null
      };

    case LIKE_DISLIKE_REC_REQUEST:
      return {
        ...state,
        isRecipeStatusUpdate: false
      };

    case LIKE_DISLIKE_REC_SUCCESS:
      return {
        ...state,
        eMessage: '',
        isRecipeStatusUpdate: true
      };

    case LIKE_DISLIKE_REC_FAILURE:
      return {
        ...state,
        eMessage: action.error.message,
        isRecipeStatusUpdate: false
      };

    case SEARCH_SUG_REC_REQUEST:
      return { ...state, isLoading: true }

    case SEARCH_SUG_REC_SUCCESS:
      return { ...state, isLoading: false, searchResult: action.data.data }

    case SEARCH_SUG_REC_FAILURE:
      return { ...state, isLoading: false, errorMessage: action.error.message }

    case REPORT_ISSUE_REQUEST:
      return {
        ...state,
      }

    case REPORT_ISSUE_SUCCESS:
      return {
        ...state,
      }

    case REPORT_ISSUE_FAILURE:
      return {
        ...state,
        eMessage: action.error.message,
      }

    case REVIEW_SET_REQUEST:
      return {
        ...state,

      }

    case REVIEW_SET_SUCCESS:
      return {
        ...state,
      }

    case REVIEW_SET_FAILURE:
      return {
        ...state,
        eMessage: action.error.message,
      }

    case UPDATE_RECIPE_INGREDIENT_REQUEST:
      return {
        ...state
      }

    case UPDATE_RECIPE_INGREDIENT_SUCCESS:
      const { data } = action.data;
      const { ingredients } = data;
      return {
        ...state,
        updatedIngredients: ingredients ? ingredients : []
      }

    case UPDATE_RECIPE_INGREDIENT_FAILURE:
      return {
        ...state,
        eMessage: action.error.message,
      }

      case CLEAN_SEARCH_RECIPE_REQUEST:
        return {
          ...state,
          searchResult: []
        }

    default:
      return state;
  }
}

export default recipeReducer;