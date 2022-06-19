import { call, takeEvery, put, takeLatest } from "redux-saga/effects";
import * as apiService from "../services/base-service";
import * as actionCreator from "./slice";

function* getTodos() {
	try {
		let result = yield call(apiService.getTodos);
		yield put(actionCreator.actions.fetchData(result.data));
	} catch (e) {
		yield put(actionCreator.actions.fetchData([]));
	}
}

function* setTodoAsDone(action) {
	try {
		let result = yield call(apiService.setTodoAsDone, action.payload);
		yield put(actionCreator.actions.setTodoAsDone(result.data));
	} catch (e) {}
}

export default function* rootSaga() {
	yield takeLatest(actionCreator.getTodos, getTodos);
	yield takeLatest(actionCreator.setTodoAsDone, setTodoAsDone);
}
