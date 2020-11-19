import { put, takeEvery, call } from 'redux-saga/effects';
import { 
  GET_CURRENT_PLAN_FAILURE, 
  GET_CURRENT_PLAN_REQUEST, 
  GET_CURRENT_PLAN_SUCCESS 
} from '../../actions/types';

import axiosInstance from '../../api';
import url from '../../api/url';

function* fetchData(action) {
	try {
		const { payload } = action;
		const { access_token } = payload;
		const URL = `${url.getCurrent}&access_token=${access_token}`;
		const sendData = {
			method: 'GET',
			url: URL
		};
		const data = yield call(axiosInstance, sendData);
		yield put({
			type: GET_CURRENT_PLAN_SUCCESS,
			data
		});
	} catch (error) {
		yield put({
			type: GET_CURRENT_PLAN_FAILURE,
			error
		});
	}
}

function* dataSaga() {
	yield takeEvery(GET_CURRENT_PLAN_REQUEST, fetchData);
}

export default dataSaga;