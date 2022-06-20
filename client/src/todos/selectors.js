import { createSelector } from "reselect";

const todosSelector = state => state.todo.todos;
export const selectTodos = createSelector([todosSelector], todos => todos);

const selectedFilter = state => state.todo.filter;
export const selectFilter = createSelector([selectedFilter], filter => filter);

const selectedPaginationSettings = state => state.todo.paginationSettings;
export const selectPaginationSettings = createSelector([selectedPaginationSettings], paginationSettings => paginationSettings);

const selectedSortByDate = state => state.todo.sortByDate;
export const selectSortByDate = createSelector([selectedSortByDate], sortByDate => sortByDate);

const selectedSearchField = state => state.todo.searchField;
export const selectSearchField = createSelector([selectedSearchField], searchField => searchField);

const selectedStatus = state => state.todo.status;
export const selectStatus = createSelector([selectedStatus], status => status);
