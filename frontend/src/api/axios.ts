import axios from "axios";
import { API_URL } from "../constants";
const API = axios.create({
  baseURL: `${API_URL}/`,
});
API.interceptors.response.use(
  function (response) {
    return response;
  },
  (error) => {
    if (axios.isCancel(error)) {
      console.log("user cancelled the network request");
      return Promise.reject(error);
    } else {
      const { status, data } = error.response;
      if (status === 422) {
        return Promise.resolve({ data });
      } else if (status === 503) {
        return Promise.reject("Service unavailable. Please try again later");
      } else {
        return Promise.reject(error);
      }
    }
  }
);
export default API;
export const EndPoints = {
  Todos: "/todos",
  create: "/todos",
  delete: "/todos",
  update: "/todos",
  markCompleted: "/todos/update-status",
};
