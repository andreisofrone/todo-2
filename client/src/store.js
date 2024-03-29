import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import saga from "./todos/saga";
import { todoSlice } from "./todos/slice";

let sagaMiddleware = createSagaMiddleware();
const middleware = getDefaultMiddleware => getDefaultMiddleware().concat(sagaMiddleware);

const store = configureStore({
	reducer: {
		todo: todoSlice.reducer,
	},
	middleware,
});

sagaMiddleware.run(saga);

export default store;
