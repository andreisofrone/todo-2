import axiosInstance from "./axios-instance";

export const getTodos = () => {
	return axiosInstance.get(`/todos`);
};
