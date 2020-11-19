import {
  GET_RECIPE_BY_ID_REQUEST,
  LIKE_DISLIKE_REC_REQUEST,
  SEARCH_SUG_REC_REQUEST,
  CLEAN_SEARCH_RECIPE_REQUEST,
  REPORT_ISSUE_REQUEST,
  REVIEW_SET_REQUEST,
  UPDATE_RECIPE_INGREDIENT_REQUEST
} from '../types';

export const searchRecipeRequest = (payload) => {
  return { type: SEARCH_SUG_REC_REQUEST, payload };
}

export const cleanSearchRecipeRequest = () => {
  return { type: CLEAN_SEARCH_RECIPE_REQUEST };
}

export const getRecipeByIdRequest = (payload) => {
	return { type: GET_RECIPE_BY_ID_REQUEST, payload };
};

export const likeDislikeRecRequest = (payload) => {
	return { type: LIKE_DISLIKE_REC_REQUEST, payload };
};

export const reportIssueRequest = payload => {
  return { type: REPORT_ISSUE_REQUEST, payload }
};

export const reviewSetRequest = payload => {
  return { type: REVIEW_SET_REQUEST, payload }
};

export const updateRecipeIngredientRequest = payload => {
  return { type: UPDATE_RECIPE_INGREDIENT_REQUEST, payload }
};