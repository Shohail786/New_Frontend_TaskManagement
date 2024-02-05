import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Auth/Login";
import Logout from "./components/Auth/Logout";
import Signup from "./components/Auth/Signup";
import TaskList from "./TaskList";

const Dashboard = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/tasks" element={<TaskList />} />
      </Routes>
    </Router>
  );
};

export default Dashboard;
