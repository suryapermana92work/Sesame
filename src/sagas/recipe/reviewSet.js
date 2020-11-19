
import { put, takeEvery, call } from 'redux-saga/effects';
import { REVIEW_SET_SUCCESS, REVIEW_SET_FAILURE, REVIEW_SET_REQUEST } from '../../actions/types';

import axiosInstance from '../../api';
import url from '../../api/url';

function* fetchData(action) {
	try {
		const { payload } = action;
		var formData = new FormData();
		var urlStr = '';
		for (var key in payload) {
			if (key == 'access_token') {
				urlStr = `&access_token=${payload[key]}`;
			} else {
				formData.append(key, payload[key]);
			}
		}
    
    const URL = `${url.reviewSet}${urlStr}`;
		const sendData = {
			method: 'POST',
			url: URL,
			data: formData
		};
		const data = yield call(axiosInstance, sendData);
		yield put({
			type: REVIEW_SET_SUCCESS,
			data
		});
	} catch (error) {
		yield put({
			type: REVIEW_SET_FAILURE,
			error
		});
	}
}

function* dataSaga() {
	yield takeEvery(REVIEW_SET_REQUEST, fetchData);
}

export default dataSaga;
