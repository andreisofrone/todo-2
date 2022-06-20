import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { STATUS } from "../todos/utils";

const Todo = ({ content, handleSetAsDone }) => {
	return (
		<Card>
			<CardContent>
				<Typography color="textPrimary" gutterBottom>
					{content.title}
				</Typography>
				<Typography variant="body2" color="textSecondary" component="p">
					{new Date(content.creationTime).toLocaleDateString()}
				</Typography>
				<Typography variant="body2" color="textSecondary" component="p">
					{content.status}
				</Typography>
				<Typography variant="body2" color="textSecondary" component="p">
					{content.content}
				</Typography>
				<Typography variant="body2" color="textSecondary" component="p">
					{new Date(content.dueDate).toLocaleDateString()}
				</Typography>
			</CardContent>
			{handleSetAsDone && content.status == STATUS.ACTIVE && (
				<Button variant="text" onClick={handleSetAsDone}>
					Set as done
				</Button>
			)}
		</Card>
	);
};

export default Todo;
