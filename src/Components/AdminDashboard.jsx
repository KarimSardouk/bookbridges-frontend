import React, {useEffect} from 'react'
import "../Styles/AdminDashboard.css"
import {useNavigate}  from "react-router-dom";
import user from "../Images/icons8-user-50.png";
// import user from "../Images/user-circle-svgrepo-com.svg"
import quotations from "../Images/icons8-quotes-50.png"
import book from "../Images/book30.png"
const AdminDashboard = () => {
  const navigate=useNavigate();
  const handleHome=(e) => {
   e.preventDefault();
   navigate("/"); 
  };
  const handleAdminUsers=(e) => {
    e.preventDefault();
    navigate("/admin/users");
  };
  const handleAdminBooks=(e) => {
    e.preventDefault();
    navigate("/admin/books");
  };
  const handleAdminQuotes = (e) => {
    e.preventDefault();
    navigate("/admin/quotes");
  }
  const handleLogout = () => {
    sessionStorage.removeItem("authToken");
    navigate("/");
  };
  return (
<div className="body3">
<link
      href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
      rel="stylesheet"
    />  
<nav class="sidebar">

      <div class="menu-bar">
        <div class="menu">
          <ul class="menu-links">
            <li class="nav-link">
              <a href="#">
                <i class="bx bx-home-alt icons home-img"></i>
                <span class="text nav-text" onClick={handleHome}>HOME</span>
              </a>
            </li>
            <li class="nav-link">
              <a href="#">
              <img src={user} className="user-img" alt="this is a user" />
                <span class="text nav-text" onClick={handleAdminUsers}>USERS</span>
              </a>
            </li>
            <li class="nav-link">
              <a href="#">
                <i class="icons1"><img src={book} className="book" alt="book image" /></i>
                <span class="text nav-text" onClick={handleAdminBooks}>BOOKS</span>
              </a>
            </li>
            <li class="nav-link">
              <a href="#">
                <i class="icons2"><img src={quotations} className="quotations-icon" alt="quotations" /></i>
                <span class="text nav-text" onClick={handleAdminQuotes}>QUOTES</span>
              </a>
            </li>
          </ul>
        </div>

        <div class="bottom-content">
          <li class="nav-link">
            <a href="#">
              <i class="bx bx-log-out icons"></i>
              <span class="text nav-text" onClick={handleLogout}>Log Out</span>
            </a>
          </li>
        </div>
      </div>
    </nav>
</div>
  )
}

export default AdminDashboard;
