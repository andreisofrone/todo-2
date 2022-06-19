import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import "../App.css";
import { useDispatch, useSelector } from "react-redux";
import * as selectors from "./selectors";
import { getTodos } from "./slice";

export default function App() {
	// const classes = useStyles();
	const dispatch = useDispatch();
	const todos = useSelector(selectors.selectTodos);

	useEffect(() => {
		todos?.length == 0 && dispatch(getTodos());
	}, []);

	return (
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
			}}>
			<Grid container spacing={10}>
				{todos &&
					todos.map(todo => (
						<Grid key={todo.id} item xs={10}>
							<Card>
								<CardContent>
									<Typography color="textPrimary" gutterBottom>
										{todo.title}
									</Typography>
									<Typography variant="body2" color="textSecondary" component="p">
										{new Date(todo.creationTime).toLocaleDateString()}
									</Typography>
									<Typography variant="body2" color="textSecondary" component="p">
										{todo.status}
									</Typography>
									<Typography variant="body2" color="textSecondary" component="p">
										{todo.content}
									</Typography>
								</CardContent>
							</Card>
						</Grid>
					))}
			</Grid>
		</Box>
	);
}
