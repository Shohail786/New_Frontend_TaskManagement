import api from "./api";

export const signup = (formData) => api.post("/user/signup", formData);
export const login = (formData) => api.post("/user/login", formData);
export const logout = () => api.post("/user/logout");
