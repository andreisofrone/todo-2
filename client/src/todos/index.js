import React, { useEffect } from "react";
import { Box } from "@mui/system";
import Grid from "@mui/material/Grid";
import "../App.css";
import { useDispatch, useSelector } from "react-redux";
import * as selectors from "./selectors";
import { getTodos, setTodoAsDone } from "./slice";
import Todo from "./todo";
import * as actionCreator from "./slice";
import FormControlSelect from "../common-components/form-control-select";
import { STATUS, SORT, FILTER_OPTIONS } from "./utils";
import Pagination from "../common-components/pagination";
import TextField from "@mui/material/TextField";

export default function App() {
	// const classes = useStyles();
	const dispatch = useDispatch();
	const todos = useSelector(selectors.selectTodos);
	const sortByDate = useSelector(selectors.selectSortByDate);
	const paginationSettings = useSelector(selectors.selectPaginationSettings);
	const filter = useSelector(selectors.selectFilter);
	const searchField = useSelector(selectors.selectSearchField);
	const status = useSelector(selectors.selectStatus);

	const handleStatusChange = event => {
		const status = event.target.value;
		dispatch(actionCreator.actions.setStatus(status));
		dispatch(actionCreator.actions.sortByStatus(status));
	};

	const handleSetAsDone = id => {
		dispatch(setTodoAsDone(id));
	};

	const handleSortByDateChange = event => {
		dispatch(actionCreator.actions.setSortByDate(event.target.value));
		dispatch(actionCreator.actions.sortByDate(event.target.value));
	};

	const handleFilterChange = event => {
		const filter = event.target.value;
		dispatch(actionCreator.actions.setFilter(filter));
		dispatch(actionCreator.actions.setCurrentPage(1));
		callGetTodos(1, paginationSettings.entriesPerPage, filter);
	};

	useEffect(() => {
		todos.items.length || callGetTodos(paginationSettings.currentPage, paginationSettings.entriesPerPage, filter);
	}, []);

	const callGetTodos = (page, perPage, filter, searchValue) => {
		dispatch(
			getTodos({
				page,
				perPage,
				filter,
				searchValue,
			})
		);
	};

	const setCurrentPage = number => {
		dispatch(actionCreator.actions.setCurrentPage(number));
		callGetTodos(number, paginationSettings.entriesPerPage, filter);
	};

	const setEntriesPerPage = number => {
		dispatch(actionCreator.actions.setEntriesPerPage(number));
		callGetTodos(1, number, filter);
	};

	const handleSearchFieldChange = event => {
		const searchField = event.target.value;
		dispatch(actionCreator.actions.setSearchField(searchField));
		callGetTodos(paginationSettings.currentPage, paginationSettings.entriesPerPage, filter, searchField);
	};

	return (
		<>
			<Box
				sx={{
					display: "flex",
					flexDirection: { xs: "column", md: "row" },
					alignItems: "center",
					bgcolor: "background.paper",
					overflow: "hidden",
					borderRadius: "12px",
					boxShadow: 1,
					fontWeight: "bold",
					padding: "30px",
				}}>
				<Grid container spacing={10}>
					<Grid item xs={2}>
						<FormControlSelect
							key="status-form-control-select"
							id="status"
							menuItems={[
								{ name: STATUS.ACTIVE, value: STATUS.ACTIVE },
								{ name: STATUS.DONE, value: STATUS.DONE },
							]}
							value={status}
							onChange={handleStatusChange}
							label="Order by status"
						/>
					</Grid>
					<Grid item xs={2}>
						<FormControlSelect
							id="sort-by-date"
							key="sort-by-date-form-control-select"
							menuItems={[
								{ name: SORT.ASC, value: SORT.ASC },
								{ name: SORT.DESC, value: SORT.DESC },
							]}
							value={sortByDate}
							onChange={handleSortByDateChange}
							label="Sort by date"
						/>
					</Grid>
					<Grid item xs={2}>
						<FormControlSelect
							key="filter-form-control-select"
							id="filter"
							menuItems={[
								{ name: FILTER_OPTIONS.RESULTS, value: FILTER_OPTIONS.RESULTS },
								{ name: FILTER_OPTIONS.WINS, value: FILTER_OPTIONS.WINS },
								{ name: FILTER_OPTIONS.WITHDRAW, value: FILTER_OPTIONS.WITHDRAW },
							]}
							value={filter}
							onChange={handleFilterChange}
							label="Filter"
						/>
					</Grid>
					<Grid item xs={3}>
						<TextField key="search-field" label="Search" variant="outlined" value={searchField} onChange={handleSearchFieldChange} />
					</Grid>
					<Grid item xs={12}>
						{todos &&
							todos.items.map(todo => (
								<Grid key={todo.id} item xs={10}>
									<Todo content={todo} handleSetAsDone={() => handleSetAsDone(todo.id)} />
								</Grid>
							))}
					</Grid>
					<Grid item xs={12}>
						<Pagination
							key="pagination-key"
							elPerPages={[4, 8, 48]}
							currentPage={paginationSettings.currentPage}
							totalPages={Math.ceil(todos?.count / paginationSettings.entriesPerPage)}
							gotoPage={(e, pageNo) => setCurrentPage(pageNo)}
							entriesPerPage={paginationSettings.entriesPerPage}
							setEntriesPerPage={e => setEntriesPerPage(e.target.value)}
						/>
					</Grid>
				</Grid>
			</Box>
		</>
	);
}
