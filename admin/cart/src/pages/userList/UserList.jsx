import "./userList.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

export default function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/auth/getuser");
        setUsers(response.data); // Assuming response.data is an array of users
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);


  const handleDelete= async (id) => {
    if (!id) return;
  
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;
  
    try {
      const response = await fetch(`http://localhost:5000/api/auth/deleteUser/${id}`, {
        method: "DELETE",
      });
  
      if (response.ok) {
        alert("User deleted successfully!");
  
        // Optionally, you can remove the user from the state to update the UI without refreshing.
        setUsers(users.filter((user) => user._id !== id));
      } else {
        const data = await response.json();
        alert(`Failed to delete user: ${data.message}`);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("An error occurred while deleting the user.");
    }
  };
  

  return (
    <div className="userList">
      <Link to="/admin">
      <button className="createAdminButton" >Create new admin</button>
      </Link>
     
      <table className="userTable">
        <thead>
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Email</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>
                <div className="userListUser">
                  <img
                    className="userListImg"
                    src={user.profilePicture || "noimage.png"}
                    alt={user.username}
                  />
                  {user.username}
                </div>
              </td>
              <td>{user.email}</td>
              <td>{user.isAdmin ? "Admin" : "User"}</td>
              <td>
               
                <DeleteOutlineIcon
                  className="userListDelete"
                  onClick={() => handleDelete(user._id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}



