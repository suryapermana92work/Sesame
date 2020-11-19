import { put, takeEvery, call } from 'redux-saga/effects';
import { 
  CREATE_CART_REQUEST,
  CREATE_CART_SUCCESS,
  CREATE_CART_FAILURE 
} from '../../actions/types';

import axiosInstance from '../../api';
import url from '../../api/url';

function* fetchData(action) {
	try {
		const { payload } = action;
		var URL = url.createCart;

		Object.keys(payload).map(key => {
			URL = `${URL}&${key}=${payload[key]}`;
		});

		const sendData = {
			method: 'GET',
			url: URL
		};
		console.log(URL);
		const data = yield call(axiosInstance, sendData);
		yield put({
			type: CREATE_CART_SUCCESS,
			data
		});
	} catch (error) {
		yield put({
			type: CREATE_CART_FAILURE,
			error
		});
	}
}

function* dataSaga() {
	yield takeEvery(CREATE_CART_REQUEST, fetchData);
}

export default dataSaga;
