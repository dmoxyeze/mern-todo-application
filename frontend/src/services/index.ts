import API, { EndPoints } from "../api/axios";

export const getAllTodos = async () => {
  return API.get(EndPoints.Todos);
};

export const createTodoService = async (data: any) => {
  return API.post(EndPoints.Todos, data);
};

export const updateTodoService = async (data: any) => {
  return API.patch(EndPoints.Todos + `/${data.id}`, data);
};

export const updateTodoStatusService = async (id: string) => {
  return API.patch(EndPoints.markCompleted + `/${id}`);
};

export const deleteTodoService = async (id: string) => {
  return API.delete(EndPoints.Todos + `/${id}`);
};
