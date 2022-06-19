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
	},
});

export const getTodos = createAction(`${sliceName}/getTodos`);
export default todoSlice.reducer;
export const { actions } = todoSlice;
