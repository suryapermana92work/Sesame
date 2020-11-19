// Saga

import { all, fork } from 'redux-saga/effects';

import login from './login/login';
import register from './login/register';
import socialLogin from './login/socialLogin';
import autoLogin from './login/autoLogin';
import getInspiration from './recipe/getInspiration';
import contact from './profile/contact';
import updateProfile from './profile/updateProfile';
import getFavorite from './favorite/getFavorite';
import updateFavorite from './favorite/updateFavorite';
import deleteFavorite from './favorite/deleteFavorite';
import passReset from './login/passReset';
import passCode from './login/passCode';
import getMenu from './menu/getMenu';
import getDraft from './menu/getDraft';
import getCurrent from './menu/getCurrent';
import validatePlan from './menu/validatePlan';
import getFamily from './profile/getFamily';
import setFamily from './profile/updateFamily';
import getProfile from './profile/getProfile';
import searchInd from './recipe/searchInd';
import likeDislikeRec from './recipe/likeDislikeRec';
import recipeById from './recipe/recipeById';
import searchSugRec from './recipe/searchSugRec';
import reportIssue from './recipe/reportIssue';
import reviewSet from './recipe/reviewSet';
import updateRecipeIngredient from './recipe/updateRecipeIngredient';
import searchFevRec from './favorite/searchFevRec';
import replaceMenu from './menu/replaceMenu';
import generateMenu from './menu/generateMenu';
import editGuest from './menu/editGuest';
import addToMenu from './menu/addToMenu'
import delMenu from './menu/delMenu'
import getMenuInd from './menu/getMenuInd';
import getPreviousDraft from './menu/getPreviousDraft';
import getStores from './delivery/getStores';
import createCart from './delivery/createCart';
import searchAddress from './delivery/searchAddress';

export default function* saga() {
	yield all([
		fork(login),
		fork(register),
		fork(socialLogin),
		fork(autoLogin),
		fork(getInspiration),
		fork(updateProfile),
		fork(contact),
		fork(getFavorite),
		fork(updateFavorite),
		fork(deleteFavorite),
		fork(passReset),
		fork(passCode),
		fork(getMenu),
		fork(getDraft),
		fork(getCurrent),
		fork(validatePlan),
		fork(getFamily),
		fork(setFamily),
		fork(getProfile),
		fork(searchInd),
		fork(likeDislikeRec),
		fork(recipeById),
		fork(searchSugRec),
		fork(reportIssue),
		fork(reviewSet),
		fork(updateRecipeIngredient),
		fork(searchFevRec),
		fork(replaceMenu),
		fork(generateMenu),
		fork(editGuest),
		fork(addToMenu),
		fork(delMenu),
		fork(getMenuInd),
		fork(getPreviousDraft),
		fork(getStores),
		fork(createCart),
		fork(searchAddress)
	]);
}
