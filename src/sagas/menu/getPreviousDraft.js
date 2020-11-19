import { put, takeEvery, call } from 'redux-saga/effects';
import { GET_PREVIOUS_DRAFT_FAILURE, GET_PREVIOUS_DRAFT_REQUEST, GET_PREVIOUS_DRAFT_SUCCESS } from '../../actions/types';

import axiosInstance from '../../api';
import url from '../../api/url';

function* fetchData(action) {
	try {
		const { payload } = action;
		var urlStr = '';
		for (var key in payload) {
			urlStr = `${urlStr}&${key}=${payload[key]}`;
		}
		const URL = `${url.getPreviousDraft}${urlStr}`;
		const sendData = {
			method: 'GET',
			url: URL,
		};
		const data = yield call(axiosInstance, sendData);
		yield put({
			type: GET_PREVIOUS_DRAFT_SUCCESS,
			data
		});
	} catch (error) {
		yield put({
			type: GET_PREVIOUS_DRAFT_FAILURE,
			error
		});
	}
}

function* dataSaga() {
	yield takeEvery(GET_PREVIOUS_DRAFT_REQUEST, fetchData);
}

export default dataSaga;