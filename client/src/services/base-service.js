import axiosInstance from "./axios-instance";

export const getTodos = () => {
	return axiosInstance.get(`/todos`);
};

export const setTodoAsDone = id => {
	return axiosInstance.patch(`/todos/set-as-done/${id}`);
};
