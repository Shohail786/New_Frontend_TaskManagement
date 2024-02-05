import React, { useEffect } from "react";
import { logout } from "../../services/auth";
import { useNavigate } from "react-router-dom";

function Logout() {
  const history = useNavigate();
  useEffect(() => {
    const handleLogout = async () => {
      try {
        await logout();
        history("/login");
      } catch (error) {
        console.error("Error during logout:", error);
      }
    };

    handleLogout();
  }, [history]);

  return <div>Logging out...</div>;
}

export default Logout;
