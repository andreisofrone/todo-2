import { createSelector } from "reselect";

const todosSelector = state => state.todo.todos;
export const selectTodos = createSelector([todosSelector], todos => todos);

const selectedFilter = state => state.todo.filter;
export const selectFilter = createSelector([selectedFilter], filter => filter);

const selectedPaginationSettings = state => state.todo.paginationSettings;
export const selectPaginationSettings = createSelector([selectedPaginationSettings], paginationSettings => paginationSettings);
