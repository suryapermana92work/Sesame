
import { put, takeEvery, call } from 'redux-saga/effects';
import { USER_STATUS_SUCCESS, USER_STATUS_FAILURE, USER_STATUS_REQUEST } from '../../actions/types';

import axiosInstance from '../../api';
import url from '../../api/url';

function* fetchData(action) {
	try {
		const { payload } = action;
		const { access_token } = payload;
		var urlBind = `&access_token=${access_token}`;
		const URL = `${url.userStatus}${urlBind}`;
		const sendData = {
			method: 'GET',
			url: URL
		};
		const data = yield call(axiosInstance, sendData);
		yield put({
			type: USER_STATUS_SUCCESS,
			data
		});
	} catch (error) {
		yield put({
			type: USER_STATUS_FAILURE,
			error
		});
	}
}

function* dataSaga() {
	yield takeEvery(USER_STATUS_REQUEST, fetchData);
}

export default dataSaga;
