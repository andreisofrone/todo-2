import { createSlice, createAction } from "@reduxjs/toolkit";
import { STATUS, SORT } from "./utils";
import _ from "lodash";
import moment from "moment";

const sliceName = "todos";

export const todoSlice = createSlice({
	name: "todo",
	initialState: {
		todos: [],
	},
	reducers: {
		fetchData: (state, action) => {
			state.todos = action.payload;
		},
		sortByStatus: (state, action) => {
			let result = state.todos.sort((a, b) => a.status.localeCompare(b.status));
			if (action.payload == STATUS.DONE) result = result.reverse();
			state.todos = result;
		},
		setTodoAsDone: (state, action) => {
			const todos = state.todos;
			const lastDoneIndex = todos.findLastIndex(t => t.status === STATUS.DONE);
			const currentIndex = todos.findIndex(t => t.id == action.payload.id);
			const todo = todos.splice(currentIndex, 1)[0];

			todo.status = STATUS.DONE;
			todos.splice(lastDoneIndex, 0, todo);
		},

		sortByDate: (state, action) => {
			let result = [];
			result = _.orderBy(
				state.todos,
				function (o) {
					return new moment(o.dueDate);
				},
				[action.payload]
			);

			state.todos = result;
		},
	},
});

export const getTodos = createAction(`${sliceName}/getTodos`);
export const setTodoAsDone = createAction(`${sliceName}/setTodoAsDone`);
export default todoSlice.reducer;
export const { actions } = todoSlice;
