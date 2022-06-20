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
import { STATUS, SORT } from "./utils";

export default function App() {
	// const classes = useStyles();
	const dispatch = useDispatch();
	const todos = useSelector(selectors.selectTodos);
	const [status, setStatus] = useState("");
	const [sortByDate, setSortByDate] = useState("");

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

	useEffect(() => {
		todos?.length == 0 && dispatch(getTodos());
	}, []);

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
					<Grid item xs={12}>
						{todos &&
							todos.map(todo => (
								<Grid key={todo.id} item xs={10}>
									<Todo content={todo} handleSetAsDone={() => handleSetAsDone(todo.id)} />
								</Grid>
							))}
					</Grid>
				</Grid>
			</Box>
		</>
	);
}
