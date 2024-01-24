import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Styles/AdminBooks.css";
import { useNavigate } from "react-router-dom";
import user from "../Images/icons8-user-50.png";
import quotations from "../Images/icons8-quotes-50.png";
import book from "../Images/book30.png";

const AdminBooks = () => {
  const [books, setBooks] = useState([]);
  const [selectedBookId, setSelectedBookId] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);
  const [updateInputOne, setUpdateInputOne] = useState("");
  const [updateInputTwo, setUpdateInputTwo] = useState("");
  const [updateInputThree, setUpdateInputThree] = useState("");
  const [updateInputFour, setUpdateInputFour] = useState("");
  const [updateInputFive, setUpdateInputFive] = useState("");
  const [updateInputSix, setUpdateInputSix] = useState("");
  const [updateInputSeven, setUpdateInputSeven] = useState("");
  const [updateInputEight, setUpdateInputEight] = useState(null);
  const [popup3Visible, setPopup3Visible] = useState(false);
  const [popup4Visible, setPopup4Visible] = useState(false);
  const [notification, setNotification] = useState(null);
  const [inputOne, setInputOne] = useState("");
  const [inputTwo, setInputTwo] = useState("");
  const [inputThree, setInputThree] = useState("");
  const [inputFour, setInputFour] = useState("");
  const [inputFive, setInputFive] = useState("");
  const [inputSix, setInputSix] = useState("");
  const [inputSeven, setInputSeven] = useState("");
  const [inputEight, setInputEight] = useState(null);
  const [bookIdToDelete, setBookIdToDelete] = useState(null);
  const [showAddBookModal, setShowAddBookModal] = useState(false);
  const togglePopup3 = () => {
    setPopup3Visible(!popup3Visible);
  };
  const handleSelectBook = (book) => {
    setSelectedBookId(book._id);
    setSelectedBook(book);
    setUpdateInputOne(book.book_title);
    setUpdateInputTwo(book.author_name);
    setUpdateInputThree(book.genre_name);
    setUpdateInputFour(book.publisher_name);
    setUpdateInputFive(book.publication_date);
    setUpdateInputSix(book.description);
    setUpdateInputSeven(book.rating);
    setUpdateInputEight(book.book_image);
    setPopup4Visible(!popup4Visible);
  };
  const handleUpdateBook = async () => {
    const token = sessionStorage.getItem("authToken");
    const formData = new FormData();

    formData.append("book_title", updateInputOne);
    formData.append("author_name", updateInputTwo);
    formData.append("genre_name", updateInputThree);
    formData.append("publisher_name", updateInputFour);
    formData.append("publication_date", updateInputFive);
    formData.append("description", updateInputSix);
    formData.append("rating", updateInputSeven);
    formData.append("image", updateInputEight);

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    };

    try {
      const response = await axios.put(formData, { headers });

      if (response.status === 200 && response.data.success) {
        setNotification("Book updated successfully!");
        setTimeout(() => setNotification(null), 3000);
        setUpdateInputOne("");
        setUpdateInputTwo("");
        setUpdateInputThree("");
        setUpdateInputFour("");
        setUpdateInputFive("");
        setUpdateInputSix("");
        setUpdateInputSeven(0);
        setUpdateInputEight(null);
        getAllBooks();
        setPopup4Visible(false);
      } else {
        console.error(
          response.data.message || "Failed to update book. Please try again."
        );
      }
    } catch (error) {
      console.error(
        "Error updating book",
        error.response.data,
        error.response.status
      );
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
  const getAllBooks = async () => {
    try {
      const response = await axios.get();
      console.log(response.data);
      setBooks(response.data);
    } catch (error) {
      console.error("Error getting books", error);
    }
  };
  useEffect(() => {
    getAllBooks();
  }, []);

  const handleAddBook = async () => {
    try {
      // Validate required fields
      if (
        !inputOne ||
        !inputTwo ||
        !inputThree ||
        !inputFour ||
        !inputFive ||
        !inputSix
      ) {
        console.error("Please fill out all required fields.");
        return;
      }
      // Create FormData and append data
      const formData = new FormData();
      formData.append("book_title", inputOne);
      formData.append("author_name", inputTwo);
      formData.append("genre_name", inputThree);
      formData.append("publisher_name", inputFour);
      formData.append("publication_date", inputFive);
      formData.append("description", inputSix);
      formData.append("rating", inputSeven);
      formData.append("image", inputEight);
      const token = sessionStorage.getItem("authToken");
      const headers = {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      };
      // Make the request to the backend API
      const response = await axios.post("https://book-bridges-backend.onrender.com/books/addBook",
        formData,
        { headers: headers }
      );
      console.log(response.data);
      // Check if the response indicates success
      if (response.status === 200 && response.data.success) {
        // Show success message (you can customize this part)
        setNotification("Book added successfully!");
        // Clear the notification after a few seconds
        setTimeout(() => {
          setNotification(null);
        }, 3000); // Adjust the timeout as needed
        console.log(response.data.message);
        // Clear input fields after successful addition
        setInputOne("");
        setInputTwo("");
        setInputThree("");
        setInputFour("");
        setInputFive("");
        setInputSix("");
        setInputSeven(0);
        setInputEight(null);
        // Refresh the book list after adding a new book
        getAllBooks();
      } else {
        // Handle other status codes or error responses
        console.error(
          response.data.message || "Failed to add book. Please try again."
        );
      }
    } catch (error) {
      console.error(
        "Error adding book",
        error.response.data,
        error.response.status
      );
    }
  };

  const handleDeleteBook = async (id) => {
    try {
      // Retrieve the JWT token from where you store it (e.g., localStorage)
      const token = sessionStorage.getItem("authToken");
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.delete(
        `https://book-bridges-backend.onrender.com/books/deleteBook/${id}`,
        { headers }
      );

      if (response.data.success) {
        // Remove the deleted book from the local state
        setBooks(books.filter((book) => book._id !== id));

        // Reset the bookIdToDelete state variable
        setBookIdToDelete(null);

        console.log(response.data.message);
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error("Error deleting book", error);
    }
  };

  return (
    <div className="adminbookbody">
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
                <a>
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
      <div className="center">
        <button className="popup-btn" onClick={togglePopup3}>
          Add Book
        </button>
      </div>
      <div
        className="modal"
        style={{ display: popup3Visible ? "block" : "none" }}
      >
        <div className="modal__header">
          <span className="modal__title">New book</span>
        </div>
        <div className="modal__body">
          <div className="input">
            <label className="input__label">Book title</label>
            <input
              className="input__field"
              type="text"
              value={inputOne}
              onChange={(e) => setInputOne(e.target.value)}
            />
            <p className="input__description">
              The title must contain a maximum of 32 characters
            </p>
          </div>
          <div className="input">
            <label className="input__label">Author Name:</label>
            <input
              className="input__field"
              type="text"
              value={inputTwo}
              onChange={(e) => setInputTwo(e.target.value)}
            />
          </div>
          <div className="input">
            <label className="input__label">Genre Name:</label>
            <input
              className="input__field"
              type="text"
              value={inputThree}
              onChange={(e) => setInputThree(e.target.value)}
            />
          </div>
          <div className="input">
            <div className="input">
              <label className="input__label">Publisher Name:</label>
              <input
                className="input__field"
                type="text"
                value={inputFour}
                onChange={(e) => setInputFour(e.target.value)}
              />
            </div>
            <div className="input">
              <label className="input__label">Publication Date:</label>
              <input
                className="input__field"
                type="text"
                value={inputFive}
                onChange={(e) => setInputFive(e.target.value)}
              />
            </div>
            <label className="input__label">Description</label>
            <textarea
              className="input__field input__field--textarea"
              value={inputSix}
              onChange={(e) => setInputSix(e.target.value)}
            ></textarea>
            <p className="input__description">
              Give your book a good description so everyone know what's it for
            </p>
          </div>
          <div className="input">
            <label className="input__label">Book Rating:</label>
            <input
              type="text"
              className="input__field"
              value={inputSeven}
              onChange={(e) => setInputSeven(e.target.value)}
            />
          </div>
          <div className="input">
            <label className="input__label">Select Image:</label>
            <input
              className="input__field"
              type="file"
              onChange={(e) => setInputEight(e.target.files[0])}
            />
            <small className="input__description">Upload an image file.</small>
          </div>
        </div>
        <div className="modal__footer">
          <button
            className="button button--primary"
            type="button"
            onClick={handleAddBook}
          >
            Add book
          </button>
        </div>
      </div>

      <div
        className="modal"
        style={{ display: popup4Visible ? "block" : "none" }}
      >
        <div className="modal__header">
          <span className="modal__title">Update Book</span>
          <button className="button button--icon" onClick={handleSelectBook}>
            X
          </button>
        </div>
        <div className="modal__body">
          <div className="input">
            <label className="input__label">Book title</label>
            <input
              className="input__field"
              type="text"
              value={updateInputOne}
              onChange={(e) => setUpdateInputOne(e.target.value)}
            />
            <div className="input">
              <label className="input__label">Author Name:</label>
              <input
                className="input__field"
                type="text"
                value={updateInputTwo}
                onChange={(e) => setUpdateInputTwo(e.target.value)}
              />
            </div>
            <div className="input">
              <label className="input__label">Genre Name:</label>
              <input
                className="input__field"
                type="text"
                value={updateInputThree}
                onChange={(e) => setUpdateInputThree(e.target.value)}
              />
            </div>
            <div className="input">
              <label className="input__label">Publisher Name:</label>
              <input
                className="input__field"
                type="text"
                value={updateInputFour}
                onChange={(e) => setUpdateInputFour(e.target.value)}
              />
            </div>
            <div className="input">
              <label className="input__label">Publication Date:</label>
              <input
                className="input__field"
                type="text"
                value={updateInputFive}
                onChange={(e) => setUpdateInputFive(e.target.value)}
              />
            </div>
            <div className="input">
              <label className="input__label">Description:</label>
              <input
                className="input__field"
                type="text"
                value={updateInputSix}
                onChange={(e) => setUpdateInputSix(e.target.value)}
              />
            </div>
            <div className="input">
              <label className="input__label">Book Rating:</label>
              <div className="input">
                <label className="input__label">Book Rating:</label>
                <input
                  className="input__field"
                  type="text"
                  value={updateInputSeven}
                  onChange={(e) => setUpdateInputSeven(e.target.value)}
                />
              </div>
            </div>
            <div className="input">
              <label className="input__label">Book image:</label>
              <input
                className="input__field"
                type="file"
                onChange={(e) => setUpdateInputEight(e.target.files[0])}
              />
            </div>
          </div>
        </div>
        <div className="modal__footer">
          <button
            className="button button--primary update"
            type="button"
            onClick={handleUpdateBook}
          >
            Update book
          </button>
        </div>
      </div>

      <div className="totalcartes">
        {books &&
          books.map((book, index) => (
            <section id="card1" className="card" key={index}>
              <img
                className="display-bks"
                src={book.book_image}
                alt="an image in here"
              />
              <path d="M.002 3a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-12a2 2 0 0 1-2-2V3zm1 9v1a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12zm5-6.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0z"></path>
              <div className="card__content">
                <p className="card__title">Title:{book.book_title}</p>
                <p>Author: {book.author_name}</p>
                <p>Genre: {book.genre_name}</p>
                <p>Publisher Name:{book.publisher_name}</p>
                <p>Publication date:{book.publication_date}</p>
                <p>Brief description:{book.description}</p>
                <p>Rating:{book.rating}</p>
                <p className="card__description"></p>
                <button
                  className="delete"
                  onClick={() => setBookIdToDelete(book._id)}
                >
                  Delete
                </button>
                <button
                  className="update"
                  onClick={() => handleSelectBook(book)}
                >
                  Update
                </button>
              </div>
            </section>
          ))}
      </div>
      {bookIdToDelete && (
        <div className="delete-book-popup">
          <div className="modal__header">
            <h2>Confirm Delete</h2>
            <button
              className="button button--icon"
              onClick={() => setBookIdToDelete(null)}
            >
              <svg
                width="24"
                viewBox="0 0 24 24"
                height="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path fill="none" d="M0 0h24v24H0V0z"></path>
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"></path>
              </svg>
            </button>
          </div>
          <div className="modal__body">
            <p>Are you sure you want to delete this book?</p>
            <button
              className="button button--primary"
              onClick={() => handleDeleteBook(bookIdToDelete)}
            >
              Confirm Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBooks;
