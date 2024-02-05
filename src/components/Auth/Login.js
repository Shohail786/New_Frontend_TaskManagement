import React, { useState } from "react";
import { login } from "../../services/auth";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const history = useNavigate();
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // alert("the key");
    try {
      const response = await login(formData);
      console.log("res_data", response.data);
      const { user, token } = response.data;
      Cookies.set("token", token);
      history("/tasks");
    } catch (error) {
      console.log("Error during login:", error);
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" name="username" onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" name="password" onChange={handleInputChange} />
        </label>
        <br />
        <button type="submit">Log In</button>
      </form>
    </div>
  );
}

export default Login;
