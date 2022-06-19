import { call, takeEvery, put } from "redux-saga/effects";
import { getTodos } from "../services/base-service";
import * as actionCreator from "./slice";

function* fetchDataSaga() {
	try {
		let result = yield call(getTodos);
		yield put(actionCreator.actions.fetchData(result.data));
	} catch (e) {
		yield put(actionCreator.actions.fetchData([]));
	}
}

export default function* rootSaga() {
	yield takeEvery(actionCreator.getTodos, fetchDataSaga);
}
