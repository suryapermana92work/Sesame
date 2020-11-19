import { put, takeEvery, call } from 'redux-saga/effects';
import { 
  VALIDATE_PLAN_FAILURE, 
  VALIDATE_PLAN_REQUEST, 
  VALIDATE_PLAN_SUCCESS 
} from '../../actions/types';

import axiosInstance from '../../api';
import url from '../../api/url';

function* fetchData(action) {
	try {
		const { payload } = action;
		const { access_token } = payload;
		const URL = `${url.validatePlan}&access_token=${access_token}`;
		const sendData = {
			method: 'POST',
			url: URL
		};
		const data = yield call(axiosInstance, sendData);
		yield put({
			type: VALIDATE_PLAN_SUCCESS,
			data
		});
	} catch (error) {
		yield put({
			type: VALIDATE_PLAN_FAILURE,
			error
		});
	}
}

function* dataSaga() {
	yield takeEvery(VALIDATE_PLAN_REQUEST, fetchData);
}

export default dataSaga;