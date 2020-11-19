// Menu reducer

import {
  GENERATE_MENU_REQUEST,
  GENERATE_MENU_SUCCESS,
  GENERATE_MENU_FAILURE,
  GET_DRAFT_PLAN_FAILURE, GET_DRAFT_PLAN_REQUEST, GET_DRAFT_PLAN_SUCCESS,
  GET_CURRENT_PLAN_FAILURE, GET_CURRENT_PLAN_REQUEST, GET_CURRENT_PLAN_SUCCESS,
  VALIDATE_PLAN_FAILURE, VALIDATE_PLAN_REQUEST, VALIDATE_PLAN_SUCCESS,
  ADD_TO_MENU_REQUEST,
  ADD_TO_MENU_SUCCESS,
  ADD_TO_MENU_FAILURE,
  EDIT_GUEST_REQUEST,
  EDIT_GUEST_SUCCESS,
  EDIT_GUEST_FAILURE,
  GET_MENU_REQUEST,
  GET_MENU_SUCCESS,
  GET_MENU_FAILURE,
  DEL_MENU_REQUEST,
  DEL_MENU_SUCCESS,
  DEL_MENU_FAILURE,
  GET_MENU_IND_SUCCESS,
  GET_MENU_IND_FAILURE,
  GET_MENU_IND_REQUEST,
  REPLACE_MENU_FAILURE,
  REPLACE_MENU_REQUEST,
  REPLACE_MENU_SUCCESS,
  GET_PREVIOUS_DRAFT_REQUEST,
  GET_PREVIOUS_DRAFT_SUCCESS,
  GET_PREVIOUS_DRAFT_FAILURE
} from '../../actions/types';

const initialState = {
  isLoading: false,
  isEditing: false,
  isGettingDraft: false,
  isMenuGenerated: false,
  isAddedMenu: false,
  isValidated: false,
  menuData: null,
  previousDrafts: [],
  menuIngredients: null,
  deleteMealStatus: false,
  editGuestStatus: false,
  error: null
};

const menuReducer = (state = initialState, action) => {
  switch (action.type) {
    case GENERATE_MENU_REQUEST:
      return {
        ...state,
        isLoading: true,
        isMenuGenerated: false,
        menuData: null
      };

    case GENERATE_MENU_SUCCESS:
      return {
        ...state,
        error: null,
        isMenuGenerated: true,
        isLoading: false
      };

    case GENERATE_MENU_FAILURE:
      return {
        ...state,
        isLoading: false,
        isMenuGenerated: false,
        error: action.error,
      };

    case GET_CURRENT_PLAN_REQUEST:
      return {
        ...state,
        isLoading: true,
        isMenuGenerated: false,
      };

    case GET_CURRENT_PLAN_FAILURE:
      return {
        ...state,
        error: action.error.response.data,
        isLoading: false
      };

    case GET_CURRENT_PLAN_SUCCESS:
      return {
        ...state,
        error: null,
        menuData: action.data.data,
        isLoading: false
      };

    case GET_DRAFT_PLAN_REQUEST:
      return {
        ...state,
        isLoading: true,
        isMenuGenerated: false,
      };

    case GET_DRAFT_PLAN_FAILURE:
      return {
        ...state,
        error: action.error.response.data,
        isLoading: false
      };

    case GET_DRAFT_PLAN_SUCCESS:
      return {
        ...state,
        error: null,
        menuData: action.data.data,
        isLoading: false
      };

    case VALIDATE_PLAN_REQUEST:
      return {
        ...state,
        isValidated: false,
      }

    case VALIDATE_PLAN_FAILURE:
      return {
        ...state,
        isValidated: false,
        error: action.error.response.data,
      }

    case VALIDATE_PLAN_SUCCESS:
      return {
        ...state,
        isValidated: true,
        error: null,
      }

    case ADD_TO_MENU_REQUEST:
      return {
        ...state,
        isLoading: true,
        isAddedMenu: false,
      };

    case ADD_TO_MENU_SUCCESS:
      return {
        ...state,
        error: null,
        isLoading: false,
        isAddedMenu: true,
        menuData: action.data.data,
      };

    case ADD_TO_MENU_FAILURE:
      return {
        ...state,
        error: action.error.response.data,
        isLoading: false,
        isAddedMenu: false
      };

    case GET_MENU_REQUEST:
      return {
        ...state,
        isLoading: true,
        isMenuGenerated: false,
      };

    case GET_MENU_SUCCESS:
      return {
        ...state,
        error: null,
        menuData: action.data.data,
        isLoading: false
      };

    case GET_MENU_FAILURE:
      return {
        ...state,
        error: action.error.response.data,
        isLoading: false
      };

    case DEL_MENU_REQUEST:
      return {
        ...state,
        isLoading: true,
        deleteMealStatus: false
      };

    case DEL_MENU_SUCCESS:
      return {
        ...state,
        error: null,
        isLoading: false,
        deleteMealStatus: true
      };

    case DEL_MENU_FAILURE:
      return {
        ...state,
        error: action.error.response.data,
        isLoading: false,
        deleteMealStatus: false
      };

    case EDIT_GUEST_REQUEST:
      return {
        ...state,
        isEditing: true,
        editGuestStatus: false
      };

    case EDIT_GUEST_SUCCESS:
      return {
        ...state,
        error: null,
        isEditing: false,
        editGuestStatus: true
      };

    case EDIT_GUEST_FAILURE:
      return {
        ...state,
        error: action.error.response.data,
        isEditing: false,
        editGuestStatus: false
      };

    case GET_MENU_IND_REQUEST:
      return {
        ...state,
        isLoading: true
      };

    case GET_MENU_IND_SUCCESS:
      return {
        ...state,
        error: null,
        menuIngredients: action.data.data,
        isLoading: false
      };

    case GET_MENU_IND_FAILURE:
      return {
        ...state,
        error: action.error.response.data,
        isLoading: false
      };

    case REPLACE_MENU_REQUEST:
      return {
        ...state,
        isWaiting: true,
        replaceStatus: false
      };

    case REPLACE_MENU_SUCCESS:
      return {
        ...state,
        error: null,
        isWaiting: false,
        replaceStatus: true
      };

    case REPLACE_MENU_FAILURE:
      return {
        ...state,
        error: action.error.response.data,
        isWaiting: false,
        replaceStatus: false
      };

    case GET_PREVIOUS_DRAFT_REQUEST:
      return {
        ...state,
        isGettingDraft: true,
      };

    case GET_PREVIOUS_DRAFT_SUCCESS:
      return {
        ...state,
        isGettingDraft: false,
        previousDrafts: action.data.data
      };

    case GET_PREVIOUS_DRAFT_FAILURE:
      return {
        ...state,
        isGettingDraft: false,
        error: null,
      };

    default:
      return state;
  }
}

export default menuReducer;