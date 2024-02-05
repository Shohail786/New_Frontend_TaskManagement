import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import TaskForm from "./TaskForm";
import {
  getTasks,
  updateTaskOrder,
  addTask,
  updateTaskTitle,
  deleteTask,
} from "./services/tasks";
import "./TaskStyle.css";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");

  const fetchTasks = async () => {
    try {
      const response = await getTasks();
      console.log("response", response);
      setTasks(response);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };
  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const newTasks = [...tasks];
    const [reorderedItem] = newTasks.splice(result.source.index, 1);
    newTasks.splice(result.destination.index, 0, reorderedItem);
    setTasks(newTasks);
    updateTaskOrder(newTasks); //Update the order in the backend
  };

  const handleAddTask = async (title) => {
    try {
      const resp = await addTask({ title });
      console.log("resp ", resp);
      fetchTasks();
    } catch (error) {
      console.log("Error adding the task: ", error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      const resp = await deleteTask(taskId);
      console.log("resp ", resp);
      fetchTasks();
    } catch (error) {
      console.log("Error deleting the task: ", error);
    }
  };
  const handleEditTask = (taskId, currentTitle) => {
    setEditingTaskId(taskId);
    setEditedTitle(currentTitle);
  };

  const handleUpdateTitle = async (taskId) => {
    try {
      await updateTaskTitle(taskId, editedTitle);
      setEditingTaskId(null);
      setEditedTitle("");
      fetchTasks();
    } catch (error) {
      console.log("Error updating task title: ", error);
    }
  };

  return (
    <div className="container">
      <h1>Task List</h1>
      <hr />
      <div className="taskForm">
        <TaskForm onAddTask={handleAddTask} />
      </div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="task">
          {(provided) => (
            <ul {...provided.droppableProps} ref={provided.innerRef}>
              {tasks.map((task, index) => (
                <Draggable key={task._id} draggableId={task._id} index={index}>
                  {(provided) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      {editingTaskId === task._id ? (
                        <div>
                          <input
                            type="text"
                            value={editedTitle}
                            onChange={(e) => setEditedTitle(e.target.value)}
                          />
                          <button onClick={() => handleUpdateTitle(task._id)}>
                            Update
                          </button>
                        </div>
                      ) : (
                        <div>
                          {index + 1}. {task.title}
                          <br />
                          <div
                            style={{
                              padding: "5px",
                              display: "flex",
                              flexDirection: "row",
                              gap: "20px",
                            }}
                          >
                            <button
                              onClick={() =>
                                handleEditTask(task._id, task.title)
                              }
                            >
                              Edit
                            </button>
                            <button onClick={() => handleDeleteTask(task._id)}>
                              Delete
                            </button>
                          </div>
                        </div>
                      )}
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default TaskList;
