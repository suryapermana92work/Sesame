
import { put, takeEvery, call } from 'redux-saga/effects';
import { REPORT_ISSUE_SUCCESS, REPORT_ISSUE_FAILURE, REPORT_ISSUE_REQUEST } from '../../actions/types';

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
    
    const URL = `${url.reportRecipe}${urlStr}`;
		const sendData = {
			method: 'POST',
			url: URL,
			data: formData
		};
		const data = yield call(axiosInstance, sendData);
		yield put({
			type: REPORT_ISSUE_SUCCESS,
			data
		});
	} catch (error) {
		yield put({
			type: REPORT_ISSUE_FAILURE,
			error
		});
	}
}

function* dataSaga() {
	yield takeEvery(REPORT_ISSUE_REQUEST, fetchData);
}

export default dataSaga;
