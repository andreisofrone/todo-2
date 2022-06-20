import axiosInstance from "./axios-instance";

export const getTodos = config => {
	const skip = config.perPage && config.page ? config.perPage * (config.page - 1) : null;
	const take = config.perPage;

	return axiosInstance.get(`/todos?skip=${skip}&take=${take}`);
};

export const setTodoAsDone = id => {
	return axiosInstance.patch(`/todos/set-as-done/${id}`);
};
