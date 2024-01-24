import React, { useState, useEffect } from "react";
import "../Styles/AdminUsers.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import user from "../Images/icons8-user-50.png";
import quotations from "../Images/icons8-quotes-50.png";
import book from "../Images/book30.png";
import close from "../Images/close.svg";
const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState(""); // Set the user ID you want to update
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [notification, setNotification] = useState(null);
  const [userIdToDelete, setUserIdToDelete] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const handleDelete = (userId) => {
    // Set the user ID to be deleted
    setUserIdToDelete(userId);
    // Show the user deletion confirmation modal
    setShowDeleteConfirmation(true);
  };

  const confirmUserDeletion = async () => {
    try {
      const token = sessionStorage.getItem("authToken");
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.delete(
        `https://book-bridges-backend.onrender.com/user/deleteUser/${userIdToDelete}`,
        { headers }
      );

      if (response.status === 200) {
        console.log("User deleted successfully:", response.data);
        // Update the user list or perform other actions as needed
        getAllUsers();
        // Hide the user deletion confirmation modal
        setShowDeleteConfirmation(false);
      } else {
        console.error("Failed to delete user:", response.data.message);
        // Handle failure, show an error message, or perform other actions
      }
    } catch (error) {
      console.error("Error deleting user:", error.message);
      // Handle network errors or other issues
    }
  };

  const cancelUserDeletion = () => {
    // Clear the user ID to be deleted
    setUserIdToDelete(null);
    // Hide the user deletion confirmation modal
    setShowDeleteConfirmation(false);
  };
  const handleSelectUser = (user) => {
    setUserId(user._id);
    setFullName(user.fullName);
    setEmail(user.email);
    setShowUpdateForm(true);
  };
  const handleUpdateFormClose = () => {
    setShowUpdateForm(false);
  };
  const updateUser = async () => {
    try {
      const token = sessionStorage.getItem("authToken"); // Retrieve your authentication token from where you store it

      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const response = await axios.put(
        `https://book-bridges-backend.onrender.com/user/updateUser/${userId}`,
        {
          fullName: fullName,
          email: email,
        },
        { headers }
      );

      if (response.status === 200) {
        console.log("User updated successfully:", response.data);
        setNotification("User updated successfully!");
        setTimeout(() => setNotification(null), 3000);
        getAllUsers();
      } else {
        console.error("Failed to update user:", response.data.message);
        // Handle failure, show an error message, or perform other actions
      }
    } catch (error) {
      console.error("Error updating user:", error.message);
      // Handle network errors or other issues
    }
  };
  const navigate = useNavigate();
  const handleHome = (e) => {
    e.preventDefault();
    navigate("/");
  };
  const handleAdminUsers = (e) => {
    e.preventDefault();
    navigate("/admin/users");
  };
  const handleAdminBooks = (e) => {
    e.preventDefault();
    navigate("/admin/books");
  };
  const handleAdminQuotes = (e) => {
    e.preventDefault();
    navigate("/admin/quotes");
  };
  const handleLogout = () => {
    sessionStorage.removeItem("authToken");
    navigate("/");
  };
  const getAllUsers = async () => {
    try {
      const response = await axios.get(
        "https://book-bridges-backend.onrender.com/user/"
      );
      console.log(response.data);
      setUsers(response.data);
    } catch (error) {
      console.log("Error getting users", error);
    }
  };
  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div className="body4">
      <link
        href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
        rel="stylesheet"
      />
      <nav className="sidebar">
        <div className="menu-bar">
          <div className="menu">
            <ul className="menu-links">
              <li className="nav-link">
                <a href="#">
                  <i className="bx bx-home-alt icons home-img"></i>
                  <span className="text nav-text" onClick={handleHome}>
                    HOME
                  </span>
                </a>
              </li>
              <li className="nav-link">
                <a href="#">
                  <img src={user} className="user-img" alt="this is a user" />
                  <span className="text nav-text" onClick={handleAdminUsers}>
                    USERS
                  </span>
                </a>
              </li>
              <li className="nav-link">
                <a href="#">
                  <i className="icons1">
                    <img src={book} className="book" alt="book image" />
                  </i>
                  <span className="text nav-text" onClick={handleAdminBooks}>
                    BOOKS
                  </span>
                </a>
              </li>
              <li className="nav-link">
                <a href="#">
                  <i className="icons2">
                    <img
                      src={quotations}
                      className="quotations-icon"
                      alt="quotations"
                    />
                  </i>
                  <span className="text nav-text" onClick={handleAdminQuotes}>
                    {" "}
                    QUOTES
                  </span>
                </a>
              </li>
            </ul>
          </div>

          <div className="bottom-content">
            <li className="nav-link">
              <a href="#">
                <i className="bx bx-log-out icons"></i>
                <span className="text nav-text" onClick={handleLogout}>
                  Log Out
                </span>
              </a>
            </li>
          </div>
        </div>
      </nav>
      {notification && (
        <div className="notification">
          <p>{notification}</p>
        </div>
      )}
      <div className="users-displayed">
        {users &&
          users.map((user, index) => (
            <div className="book1" key={index}>
              <li className="li1">{user.fullName}</li>
              <li className="li2">{user.email}</li>
              <button
                className="userupdate"
                onClick={() => handleSelectUser(user)}
              >
                Update User
              </button>
              <button
                className="userdelete"
                onClick={() => handleDelete(user._id)}
              >
                Delete User
              </button>

              <div className="cover1">
                <li>{user.fullName}</li>
              </div>
            </div>
          ))}
      </div>
      {showUpdateForm && (
        <div
          className="modal"
          style={{ display: showUpdateForm ? "block" : "none" }}
        >
          <div className="modal-content">
            <span className="close" onClick={handleUpdateFormClose}>
              <img className="closeimg" src={close} alt="" />
            </span>
            <div className="input">
              <label className="input__label">Full Name</label>
              <input
                className="input__field"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div className="input">
              <label className="input__label">Email</label>
              <input
                className="input__field"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button
              className="updateuser"
              type="button"
              onClick={updateUser}
            >
              Update User
            </button>
          </div>
        </div>
      )}

      {showDeleteConfirmation && (
        <div
          className="modal3"
          style={{ display: showDeleteConfirmation ? "block" : "none" }}
        >
          <div className="modal-content">
            <span className="close" onClick={cancelUserDeletion}>
              <button className="closebtn">CLOSE</button>
            </span>
            <p>Are you sure you want to delete this user?</p>
            <button
              className="deleteuser"
              onClick={confirmUserDeletion}
            >
              Confirm Deletion
            </button>
            <button
              className="canceldeletion"
              onClick={cancelUserDeletion}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
