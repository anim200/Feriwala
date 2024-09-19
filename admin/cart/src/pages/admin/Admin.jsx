import React, { useState } from "react";
import "./admin.css"; // Import the CSS file for styling

const Admin = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleCreateAdmin = async (e) => {
    e.preventDefault();

    const newAdmin = {
      username,
      email,
      password,
      isAdmin: true, // isAdmin is always set to true
    };
    console.log(newAdmin);

    try {
      // Assuming you have an API endpoint to create an admin user
      const response = await fetch("http://localhost:5000/api/auth/createAdmin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newAdmin),
      });

      if (response.ok) {
        alert("Admin user created successfully!");
        setUsername("");
        setEmail("");
        setPassword("");
      } else {
        alert("Failed to create admin user.");
      }
    } catch (error) {
      console.error("Error creating admin:", error);
      alert("An error occurred while creating the admin.");
    }
  };


  
  return (
    <div className="admin-container">
      <h2 className="admin-title">Create New Admin</h2>
      <form className="admin-form" onSubmit={handleCreateAdmin}>
        <div className="admin-input-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
            required
          />
        </div>
        <div className="admin-input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            required
          />
        </div>
        <div className="admin-input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            required
          />
        </div>
        <button type="submit" className="admin-submit-btn">
          Create Admin
        </button>
      </form>
    </div>
  );
};

export default Admin;

