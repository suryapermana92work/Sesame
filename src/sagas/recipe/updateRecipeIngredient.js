
import { put, takeEvery, call } from 'redux-saga/effects';
import { 
  UPDATE_RECIPE_INGREDIENT_FAILURE, 
  UPDATE_RECIPE_INGREDIENT_SUCCESS, 
  UPDATE_RECIPE_INGREDIENT_REQUEST 
} from '../../actions/types';

import axiosInstance from '../../api';
import url from '../../api/url';

function* fetchData(action) {
	try {
		const { payload } = action;
		var urlStr = '';
		
		for (var key in payload) {
			urlStr = `${urlStr}&${key}=${payload[key]}`;
		}
		const URL = `${url.updateRecipeIngredient}${urlStr}`;

		const sendData = {
			method: 'GET',
			url: URL
		};
		const data = yield call(axiosInstance, sendData);
		yield put({
			type: UPDATE_RECIPE_INGREDIENT_SUCCESS,
			data
		});
	} catch (error) {
		yield put({
			type: UPDATE_RECIPE_INGREDIENT_FAILURE,
			error
		});
	}
}

function* dataSaga() {
	yield takeEvery(UPDATE_RECIPE_INGREDIENT_REQUEST, fetchData);
}

export default dataSaga;
