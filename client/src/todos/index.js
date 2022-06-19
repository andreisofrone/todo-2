import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import Grid from "@mui/material/Grid";
import "../App.css";
import { useDispatch, useSelector } from "react-redux";
import * as selectors from "./selectors";
import { getTodos, setTodoAsDone } from "./slice";
import Todo from "./todo";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import * as actionCreator from "./slice";

export default function App() {
	// const classes = useStyles();
	const dispatch = useDispatch();
	const todos = useSelector(selectors.selectTodos);
	const [status, setStatus] = React.useState("");

	const handleChange = event => {
		setStatus(event.target.value);
		dispatch(actionCreator.actions.sortByStatus(event.target.value));
	};

	const handleSetAsDone = id => {
		debugger
		dispatch(setTodoAsDone(id));
		dispatch(actionCreator.actions.sortByStatus(status));
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
						<FormControl fullWidth>
							<InputLabel id="status-label">Order by status</InputLabel>
							<Select labelId="status-select-label" id="status-select" value={status} label="Order by status" onChange={handleChange}>
								<MenuItem value="Active">Active</MenuItem>
								<MenuItem value="Done">Done</MenuItem>
							</Select>
						</FormControl>
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
