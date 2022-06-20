import axiosInstance from "./axios-instance";

export const getTodos = config => {
	const skip = config.perPage && config.page ? config.perPage * (config.page - 1) : null;
	const take = config.perPage;
	let query = `?skip=${skip}&take=${take}`;

	if (config.filter) query += `&filter=${config.filter}`;

	return axiosInstance.get(`/todos${query}`);
};

export const setTodoAsDone = id => {
	return axiosInstance.patch(`/todos/set-as-done/${id}`);
};
