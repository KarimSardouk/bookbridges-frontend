import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../Images/bookbridgeslogo.png";
import "../Styles/Header.css";
const Header = () => {
  const [books, setBooks] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();
  const handleHome = (e) => {
    e.preventDefault();
    navigate("/");
  };
  const handleQuotes = (e) => {
    e.preventDefault();
    navigate("/quotes");
  };
  const handleGenres = (e) => {
    e.preventDefault();
    navigate("/categories");
  };
  const handleSignIn = (e) => {
    e.preventDefault();
    navigate("/login");
  };
  const handleSignUp = (e) => {
    e.preventDefault();
    navigate("/signup");
  };
  const handleBookshelf = (e) => {
    e.preventDefault();
    navigate("/bookshelf");
  };
  const handleLogout = () => {
    sessionStorage.removeItem("authToken");
    navigate("/login");
  };
  return (
    <>
    
    <div className="header">
      <a href=""><img className="logo-img" src={logo} alt="logo" onClick={handleHome}/></a>
        <a href="#default" className="logo" onClick={handleHome}>
          BookBridges
        </a>
          <a className="active" href="#home" onClick={handleGenres}>
            Categories
          </a>
          <a href="#contact" onClick={handleQuotes}>Quotes</a>
          <a href="#about" onClick={handleBookshelf}>Bookshelf</a>
        
          <div className="search">
              <input
                className="searchbar"
                placeholder="Search..."
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <button className="subbutton" type="submit">Go</button>
            </div>
            <a href="">
            <button className="logout" onClick={handleLogout}>
              LOG OUT
            </button>
            </a>
      </div>
    </>
  );
};

export default Header;
