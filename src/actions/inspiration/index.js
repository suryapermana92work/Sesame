// Inspiration actions

import {
  SEARCH_IND_REQUEST,
  GET_INSPIRATION_REQUEST
} from '../types';

export const searchInspirationRequest = (payload) => {
  return { type: SEARCH_IND_REQUEST, payload };
}

export const getInspirationRequest = payload => {
	return { type: GET_INSPIRATION_REQUEST, payload };
};