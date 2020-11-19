// Menu actions

import {
  GENERATE_MENU_REQUEST,
  ADD_TO_MENU_REQUEST,
  GET_MENU_REQUEST,
  DEL_MENU_REQUEST,
  EDIT_GUEST_REQUEST,
  GET_MENU_IND_REQUEST,
  REPLACE_MENU_REQUEST,
  GET_DRAFT_PLAN_REQUEST,
  GET_CURRENT_PLAN_REQUEST,
  VALIDATE_PLAN_REQUEST,
  GET_PREVIOUS_DRAFT_REQUEST,
} from '../types';

export const generateMenuRequest = payload => {
	return { type: GENERATE_MENU_REQUEST, payload };
};

export const addToMenuRequest = payload => {
	return { type: ADD_TO_MENU_REQUEST, payload };
};

export const getMenuRequest = (payload) => {
	return { type: GET_MENU_REQUEST, payload };
};

export const delMenuRequest = (payload) => {
	return { type: DEL_MENU_REQUEST, payload };
};

export const editGuestRequest = (payload) => {
	return { type: EDIT_GUEST_REQUEST, payload };
};

export const getMenuIndRequest = (payload) => {
	return { type: GET_MENU_IND_REQUEST, payload };
};

export const replaceMenuRequest = (payload) => {
	return { type: REPLACE_MENU_REQUEST, payload };
};

export const getDraftPlanRequest = (payload) => {
  return { type: GET_DRAFT_PLAN_REQUEST, payload };
}

export const getCurrentPlanRequest = payload => {
  return { type: GET_CURRENT_PLAN_REQUEST, payload };
}

export const validatePlanRequest = payload => {
  return { type: VALIDATE_PLAN_REQUEST, payload };
}

export const getPreviousDraftRequest = payload => {
  return { type: GET_PREVIOUS_DRAFT_REQUEST, payload };
}