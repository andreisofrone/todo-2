import { createSlice, createAction } from "@reduxjs/toolkit";
import { STATUS } from "./utils";
import _ from "lodash";
import moment from "moment";

const sliceName = "todos";
export const paginationSettingsInitialState = {
	entriesPerPage: 4,
	currentPage: 1,
};

const orderTodosByDate = (todos, order) => {
	return _.orderBy(
		todos,
		function (o) {
			return new moment(o.dueDate);
		},
		[order]
	);
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
		sortByDate: "",
		status: "",
	},
	reducers: {
		getTodos: (state, action) => {
			if (state.sortByDate) {
				state.todos.count = action.payload.count;
				state.todos.items = orderTodosByDate(action.payload.items, state.sortByDate);
			} else state.todos = action.payload;
		},
		sortByStatus: (state, action) => {
			let result = state.todos.items.sort((a, b) => a.status.localeCompare(b.status));
			if (action.payload === STATUS.DONE) result = result.reverse();
			state.todos.items = result;
		},
		setTodoAsDone: (state, action) => {
			const todos = state.todos.items;
			const lastDoneIndex = todos.findLastIndex(t => t.status === STATUS.DONE);
			const currentIndex = todos.findIndex(t => t.id === action.payload.id);
			const todo = todos.splice(currentIndex, 1)[0];

			todo.status = STATUS.DONE;
			todos.splice(lastDoneIndex, 0, todo);
		},

		sortByDate: (state, action) => {
			state.todos.items = orderTodosByDate(state.todos.items, action.payload);
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
		setSortByDate: (state, action) => {
			state.sortByDate = action.payload;
		},
		setSearchField: (state, action) => {
			state.searchField = action.payload;
		},
		setStatus: (state, action) => {
			state.status = action.payload;
		},
	},
});

export const getTodos = createAction(`${sliceName}/getTodos`);
export const setTodoAsDone = createAction(`${sliceName}/setTodoAsDone`);
export default todoSlice.reducer;
export const { actions } = todoSlice;
