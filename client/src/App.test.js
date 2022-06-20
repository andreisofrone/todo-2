import { render, fireEvent, screen } from "@testing-library/react";
import Todo from "./todos/todo";
import "@testing-library/jest-dom/extend-expect";

test("TodoCardTest", () => {
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
	const creationTime = screen.getByTestId("todo-creationTime");
	const status = screen.getByTestId("todo-status");
	const content = screen.getByTestId("todo-content");
	const dueDate = screen.getByTestId("todo-dueDate");

	expect(title).toHaveTextContent("User Withdraw pending");
	expect(creationTime).toHaveTextContent("11/13/2018");
	expect(status).toHaveTextContent("Active");
	expect(content).toHaveTextContent("withdraw id 5452 awaiting approval");
	expect(dueDate).toHaveTextContent("6/1/2021");
});
