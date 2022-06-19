import { createSelector } from "reselect";

const todosSelector = state => state.todo.todos;
export const selectTodos = createSelector([todosSelector], todos => todos);
