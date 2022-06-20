import React, { useEffect, useState } from "react";
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

export default function App() {
	// const classes = useStyles();
	const dispatch = useDispatch();
	const todos = useSelector(selectors.selectTodos);
	const [status, setStatus] = useState("");
	const [sortByDate, setSortByDate] = useState("");
	const paginationSettings = useSelector(selectors.selectPaginationSettings);
	const filter = useSelector(selectors.selectFilter);

	const handleStatusChange = event => {
		setStatus(event.target.value);
		dispatch(actionCreator.actions.sortByStatus(event.target.value));
	};

	const handleSetAsDone = id => {
		dispatch(setTodoAsDone(id));
	};
	const handleSortByDateChange = event => {
		setSortByDate(event.target.value);
		dispatch(actionCreator.actions.sortByDate(event.target.value));
	};

	const handleFilterChange = event => {
		dispatch(actionCreator.actions.setFilter(event.target.value));
		dispatch(actionCreator.actions.setCurrentPage(1));
	};

	useEffect(() => {
		todos || callGetTodos();
	}, []);

	const callGetTodos = () => {
		dispatch(
			getTodos({
				page: paginationSettings.currentPage,
				perPage: paginationSettings.entriesPerPage,
				filter: filter,
			})
		);
	};

	useEffect(() => {
		callGetTodos();
	}, [paginationSettings, filter]);

	useEffect(() => {
		dispatch(actionCreator.actions.setCurrentPage(1));
		dispatch(
			getTodos({
				page: 1,
				perPage: paginationSettings.entriesPerPage,
				filter: filter,
			})
		);
	}, [paginationSettings.entriesPerPage]);

	const setCurrentPage = number => {
		dispatch(actionCreator.actions.setCurrentPage(number));
	};

	const setEntriesPerPage = number => {
		dispatch(actionCreator.actions.setEntriesPerPage(number));
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
					<Grid item xs={3}>
						<FormControlSelect
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
					<Grid item xs={3}>
						<FormControlSelect
							id="sort-by-date"
							menuItems={[
								{ name: SORT.ASC, value: SORT.ASC },
								{ name: SORT.DESC, value: SORT.DESC },
							]}
							value={sortByDate}
							onChange={handleSortByDateChange}
							label="Sort by date"
						/>
					</Grid>
					<Grid item xs={3}>
						<FormControlSelect
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
