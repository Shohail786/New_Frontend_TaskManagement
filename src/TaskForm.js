import React, { useState } from "react";
import { addTask } from "./services/tasks";

const TaskForm = ({ onAddTask }) => {
  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) return;
    try {
      // // Call the addTask function and wait for its completion
      // await addTask({ title });
      // // After successfully adding the task, call the onAddTask callback
      onAddTask(title);
      // Reset the title state
      setTitle("");
    } catch (error) {
      console.error("Error adding task:", error);
      // Handle the error as needed
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add a new task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
