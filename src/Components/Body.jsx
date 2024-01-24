import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import "../Styles/Header.css";
import "../Styles/Body.css";
import "../Styles/Footer.css";
import arrowleft from "../Images/arrow-left-svgrepo-com.svg";
import arrowright from "../Images/arrow-right-svgrepo-com.svg";
import Header from "../Components/Header";
import { useNavigate } from "react-router-dom";
import Hero from "../Components/Hero";
import logo from "../Images/bookbridgeslogo.png";
import { useLocation } from "react-router-dom";

const Body = () => {
  const [books, setBooks] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(8);
  const [notification, setNotification] = useState(null);
  const [newsletterText, setNewsletterText] = useState(""); // State for the newsletter text
  const [hasMoreBooks, setHasMoreBooks] = useState(true); // New state to track whether there are more books
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    // Check if there is a success message in the state
    if (location.state && location.state.successMessage) {
      // Display the success message
      setNotification(location.state.successMessage);

      // Clear the notification after a few seconds
      setTimeout(() => {
        setNotification(null);
      }, 3000); // Adjust the timeout as needed
    }
  }, [location.state]);

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
  const handleBookshelf = (e) => {
    e.preventDefault();
    navigate("/bookshelf");
  };

  useEffect(() => {
    const getAllBooks = async () => {
      try {
        const response = await axios.get(
          "https://book-bridges-backend.onrender.com/books",
          {
            params: {
              page: currentPage,
              limit: limit,
            },
          }
        );
  
        const newBooks = response.data.results;
  
        // Check if there are more books
        setHasMoreBooks(newBooks.length > 0);
  
        // Update the state only if there are books (avoid replacing with an empty array)
        if (newBooks.length > 0) {
          setBooks(newBooks);
        }
      } catch (error) {
        console.error("Error fetching the books", error);
      }
    };
  
    getAllBooks();
  }, [currentPage, limit]);
  const handleNextPage = () => {
    if (hasMoreBooks) {
      setCurrentPage(currentPage + 1);
    } else {
      // If there are no more books, return to the first page
      setCurrentPage(1);
    }
  };
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else {
      setCurrentPage(3);
    }
  };  
  const handleLogout = () => {
    sessionStorage.removeItem("authToken");
    navigate("/login");
  };
  const filteredBooks = useMemo(() => {
    return books.filter(
      (book) =>
        book.book_title.toLowerCase().includes(searchInput.toLowerCase()) ||
        book.author_name.toLowerCase().includes(searchInput.toLowerCase())
    );
  }, [books, searchInput]);

  const handleSubscribe = async () => {
    try {
      // Send a POST request to the server's email endpoint
      await axios.post(
        "https://book-bridges-backend.onrender.com/email/send-email",
        {
          to: "karimsardouk727@gmail.com", // Replace with the desired recipient email
          subject: "Subscribe to Newsletter",
          text: newsletterText,
        }
      );

      // Clear the textarea after sending the email
      setNewsletterText("");
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };
  return (
    <>
      <div className="bdy-section">
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
            <button className="logout" onClick={handleLogout}>
              LOG OUT
            </button>
          </a>
        </div>
        {notification && (
          <div className="notification">
            <p>{notification}</p>
          </div>
        )}

        <Hero />

        <div className="cards">
          {filteredBooks &&
            filteredBooks.map((book, index) => (
              <div className="flip-card" key={index}>
                <div className="flip-card-inner">
                  <div className="flip-card-front">
                    <img
                      src={book.book_image}
                      className="book_image"
                      alt={book.book_title}
                    />
                  </div>
                  <div className="flip-card-back">
                    <li className="lis-1">{book.book_title}</li>
                    <li className="lis-1">{book.author_name}</li>
                    <li className="lis-1">{book.genre_name}</li>
                  </div>
                </div>
                <div className="go-corner">
                  <div className="go-arrow">→</div>
                </div>
              </div>
            ))}
        </div>
        <div className="buttons">
          <button
            className="previous"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            <img src={arrowleft} alt="" />
          </button>
          <span className="pagestatus">Page {currentPage}</span>
          <button className="next" onClick={handleNextPage}>
            <img src={arrowright} alt="" />
          </button>
        </div>
      </div>

      <footer>
        <div className="footer">
          <div className="categories">
            <h1>Categories</h1>
            <p className="p1">Most popular</p>
            <p className="p2">Fantasy</p>
            <p className="p3">Crime</p>
            <p className="p4">Thriller</p>
            <p className="p5">Self-Help</p>
            <p className="p6" onClick={handleGenres}>
              More here{" "}
            </p>
          </div>
          <div className="contact-us">
            <h1>Contact Us</h1>
            <p className="p8">Twitter</p>
            <p className="p9">Instagram</p>
            <p className="p10">Linkedin</p>
          </div>
          <div className="newsletter">
            <h1>News Letter</h1>
            <p className="p11">
              Want to receive updates about us? Sign up and we'll keep you
              updated!
            </p>
            <textarea
              className="textarea"
              name="newsletter"
              value={newsletterText}
              id="news"
              cols="30"
              rows="10"
              onChange={(e) => setNewsletterText(e.target.value)}
            ></textarea>
            <button className="subscribe" onClick={handleSubscribe}>
              Subscribe
            </button>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Body;
