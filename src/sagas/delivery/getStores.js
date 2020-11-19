import { put, takeEvery, call } from 'redux-saga/effects';
import { GET_STORES_SUCCESS, GET_STORES_FAILURE, GET_STORES_REQUEST } from '../../actions/types';

import axiosInstance from '../../api';
import url from '../../api/url';

function* fetchData(action) {
	try {
		const { payload } = action;
		var URL = `${url.getStores}`;

		Object.keys(payload).map(key => {
			URL = `${URL}&${key}=${payload[key]}`;
		});

		const sendData = {
			method: 'GET',
			url: URL
		};
		const data = yield call(axiosInstance, sendData);
		yield put({
			type: GET_STORES_SUCCESS,
			data
		});
	} catch (error) {
		yield put({
			type: GET_STORES_FAILURE,
			error
		});
	}
}

function* dataSaga() {
	yield takeEvery(GET_STORES_REQUEST, fetchData);
}

export default dataSaga;
