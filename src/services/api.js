import axios from "axios";

const api = axios.create({
  baseURL: "https://backend-task-management-fanc.onrender.com",
  withCredentials: true,
});

export default api;
