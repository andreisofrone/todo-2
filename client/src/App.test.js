import { render, fireEvent, screen } from "@testing-library/react";
import Todo from "./todos/todo";
import "@testing-library/jest-dom/extend-expect";

test("test todo card", () => {
	const mock = {
		id: "bdff234c-33d3-447f-80ee-84e43a23f01d",
		title: "User Withdraw pending",
		content: "withdraw id 5452 awaiting approval",
		creationTime: 1542111235544,
		dueDate: 1622539315287,
		status: "Active",
		type: "Withdraw",
	};
	render(<Todo content={mock} />);

	const title = screen.getByTestId("todo-title");

	expect(title).toHaveTextContent("User Withdraw pending");
});
