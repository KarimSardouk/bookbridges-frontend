import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { format } from "date-fns";
import logo from "../Images/bookbridgeslogo.png";
import Modal from "../Components/Modal";
import "../Styles/Modal.css";
import "../Styles/Categories.css";
const Categories = () => {
  const [Id, setId] = useState(null);
  const [genreName, setGenreName] = useState("");
  const [book, setBook] = useState([]);
  const [searchInputTwo, setSearchInputTwo] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(sessionStorage.getItem("authToken") !== null);

  const navigate = useNavigate();

  useEffect(() => {
    // Call the function when the component mounts
    getBookByGenreName();
  }, []);
  const handleQuotes = (e) => {
    e.preventDefault();
    navigate("/quotes");
  };
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleHome = (e) => {
    e.preventDefault();
    navigate("/");
  };

  const handleGenres = (e) => {
    e.preventDefault();
    navigate("/genres");
  };

  const handleLogout = () => {
    sessionStorage.removeItem("authToken");
    // Update the state to trigger a re-render and change the button label
    setIsLoggedIn(false); 
    navigate("/login");
  };

  const handleBookshelf = (e) => {
    e.preventDefault();
    navigate("/bookshelf");
  };

  const getBookByGenreName = async () => {
    try {
      const response = await axios.get(
        "https://book-bridges-backend.onrender.com/books/getBooksAdmin"
      );
      setBook(response.data);
      setGenreName(response.data);
    } catch (error) {
      console.log("Error getting the books by the genre name:", error);
    }
  };

  const handleMoreInfo = (bookId) => {
    // Use navigate to redirect to the /moreinfo page with the bookId parameter
    navigate(`/moreinfo/${bookId}`);
  };

  return (
    <>
      <div className="body">
      <div className="header">
          <a href="">
            <img className="logo-img" src={logo} alt="" />
          </a>
          <a href="#default" className="logo" onClick={handleHome}>
            BookBridges
          </a>
          <a className="active" href="#home" onClick={handleGenres}>
            Categories
          </a>
          <a href="#contact" onClick={handleQuotes}>
            Quotes
          </a>
          <a href="#about" onClick={handleBookshelf}>
            Bookshelf
          </a>

          <div className="search">
            <input
              className="searchbar"
              placeholder="Search..."
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button className="subbutton" type="submit">
              Go
            </button>
          </div>
          <a href="">
          <button
              className="logout"
              onClick={isLoggedIn ? handleLogout : () => navigate("/login")}
            >
              {isLoggedIn ? "LOG OUT" : "LOG IN"}
            </button>
          </a>
        </div>
        <h1>Featured Categories</h1>

        <div className="catcards">
          {book &&
            Object.entries(book).map(([genreName, booksInGenre]) => (
              <div key={genreName} className="listsss">
                <p>{genreName}</p>
                <div className="row">
                  {booksInGenre?.map((book, index) => (
                    <React.Fragment key={index}>
                      <div className="popup-image">
                        <img
                          className="img"
                          src={book.book_image}
                          alt="bkimage"
                        />
                        <button
                          className="open"
                          onClick={() => {
                            console.log(book);
                            handleMoreInfo(book.book_id);
                          }}
                        >
                          More information
                        </button>
                      </div>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Categories;
