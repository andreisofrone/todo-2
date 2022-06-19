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
		setTodoAsDone: (state, action) => {
			state.todos.find(t => t.id == action.payload.id).status = "Done";
		},
	},
});

export const getTodos = createAction(`${sliceName}/getTodos`);
export const setTodoAsDone = createAction(`${sliceName}/setTodoAsDone`);
export default todoSlice.reducer;
export const { actions } = todoSlice;
