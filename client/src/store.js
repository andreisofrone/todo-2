import { createSlice, configureStore, getDefaultMiddleware, PayloadAction } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import saga from "./todos/saga";
import { Todo } from "./models/todo";
import { todoSlice } from "./todos/slice";

let sagaMiddleware = createSagaMiddleware();
const middleware = [...getDefaultMiddleware({ thunk: false }), sagaMiddleware];

const store = configureStore({
	reducer: {
		todo: todoSlice.reducer,
	},
	middleware,
});

sagaMiddleware.run(saga);

export default store;
