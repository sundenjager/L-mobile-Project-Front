import React from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../api/authService";
import "./Sidebar.css";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser(); // Add any necessary logout data if required
      navigate("/register"); // Redirect to the registration page
    } catch (error) {
      console.error("Logout failed:", error);
      // Handle error state here, e.g., display a message to the user
    }
  };

  return (
    <button className="signout-btn" onClick={handleLogout}>
      Log out
    </button>
  );
};

export default LogoutButton;
