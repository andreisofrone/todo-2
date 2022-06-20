import { createSlice, createAction } from "@reduxjs/toolkit";
import { STATUS, SORT } from "./utils";
import _ from "lodash";
import moment from "moment";

const sliceName = "todos";
export const paginationSettingsInitialState = {
	entriesPerPage: 4,
	currentPage: 1,
};

export const todoSlice = createSlice({
	name: "todo",
	initialState: {
		todos: {
			count: 0,
			items: [],
		},
		paginationSettings: paginationSettingsInitialState,
		filter: "",
		searchField: "",
	},
	reducers: {
		getTodos: (state, action) => {
			state.todos = action.payload;
		},
		sortByStatus: (state, action) => {
			let result = state.todos.items.sort((a, b) => a.status.localeCompare(b.status));
			if (action.payload == STATUS.DONE) result = result.reverse();
			state.todos.items = result;
		},
		setTodoAsDone: (state, action) => {
			const todos = state.todos.items;
			const lastDoneIndex = todos.findLastIndex(t => t.status === STATUS.DONE);
			const currentIndex = todos.findIndex(t => t.id == action.payload.id);
			const todo = todos.splice(currentIndex, 1)[0];

			todo.status = STATUS.DONE;
			todos.splice(lastDoneIndex, 0, todo);
		},

		sortByDate: (state, action) => {
			let result = [];
			result = _.orderBy(
				state.todos.items,
				function (o) {
					return new moment(o.dueDate);
				},
				[action.payload]
			);

			state.todos.items = result;
		},
		setCurrentPage: (state, action) => {
			state.paginationSettings.currentPage = action.payload;
		},
		setEntriesPerPage: (state, action) => {
			state.paginationSettings.entriesPerPage = action.payload;
		},
		setFilter: (state, action) => {
			state.filter = action.payload;
		},
	},
});

export const getTodos = createAction(`${sliceName}/getTodos`);
export const setTodoAsDone = createAction(`${sliceName}/setTodoAsDone`);
export default todoSlice.reducer;
export const { actions } = todoSlice;
