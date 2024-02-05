import api from "./api";

export const getTasks = async () => {
  try {
    const response = await api.get("/tasks");
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const addTask = async (task) => {
  try {
    const response = await api.post("/tasks", task);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const updateTaskOrder = (tasks) => api.put("/tasks", tasks);

export const updateTaskTitle = async (taskId, newTitle) => {
  try {
    const response = await api.patch(`/tasks/${taskId}`, { title: newTitle });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteTask = async (taskId) => {
  try {
    const response = await api.delete(`/tasks/${taskId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
