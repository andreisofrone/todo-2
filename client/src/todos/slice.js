import { createSlice, createAction } from "@reduxjs/toolkit";

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
			if (action.payload == "Done") result = result.reverse();
			state.todos = result;
		},
	},
});

export const getTodos = createAction(`${sliceName}/getTodos`);
export default todoSlice.reducer;
export const { actions } = todoSlice;
