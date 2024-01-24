import { useState, useEffect } from "react";
import "../Styles/AdminQuotes.css";
import { useNavigate } from "react-router-dom";
import user from "../Images/icons8-user-50.png";
import quotations from "../Images/icons8-quotes-50.png";
import book from "../Images/book30.png";
import axios from "axios";
import "../Styles/AdminQuotes.css";
const AdminQuotes = () => {
  const [quotes, setQuotes] = useState([]);
  const [inputQuoteText, setInputQuoteText] = useState("");
  const [inputAuthorQuote, setInputAuthorQuote] = useState("");
  const [popup1Visible, setPopup1Visible] = useState(false);
  const [deletePopupVisible, setDeletePopupVisible] = useState(false);
  const [quoteToDelete, setQuoteToDelete] = useState(null);
  const [notification, setNotification] = useState(null);
  const [updatePopupVisible, setUpdatePopupVisible] = useState(false); // New state
  const [quoteToUpdate, setQuoteToUpdate] = useState(null);
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
  const togglePopup1 = () => {
    setPopup1Visible(!popup1Visible);
  };

  const toggleDeletePopup = (quote) => {
    setQuoteToDelete(quote);
    setDeletePopupVisible(!deletePopupVisible);
  };
  const toggleUpdatePopup = (quote) => {
    setQuoteToUpdate(quote);
    setInputQuoteText(quote.quote_text);
    setInputAuthorQuote(quote.author_of_quote);
    setUpdatePopupVisible(!updatePopupVisible);
  };
  const getAllQuotes = async () => {
    try {
      const response = await axios.get(
        "https://book-bridges-backend.onrender.com/quotes/getAll"
      );
      console.log(response.data);
      setQuotes(response.data);
    } catch (error) {
      console.log("Error fetching quotes", error);
    }
  };
  useEffect(() => {
    getAllQuotes();
  }, []);
  const addQuote = async () => {
    try {
      if (!inputQuoteText || !inputAuthorQuote) {
        console.error("Please fill out all required fields.");
        return;
      }

      const data = {
        quote_text: inputQuoteText,
        author_of_quote: inputAuthorQuote,
      };

      const token = sessionStorage.getItem("authToken");
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.post(
        "https://book-bridges-backend.onrender.com/quotes/addQuote",
        data,
        { headers: headers }
      );

      console.log(response.data);

      // Check if the response indicates success
      if (response.status === 200 && response.data.success) {
        // Show success message (you can customize this part)
        setNotification("Quote added successfully!");

        // ... (rest of your existing code)

        // Clear the notification after a few seconds
        setTimeout(() => {
          setNotification(null);
        }, 3000); // Adjust the timeout as needed
        console.log(response.data.message);

        // Clear input fields after successful addition
        setInputQuoteText(""); // Assuming setInputQuoteText is the state-setting function
        setInputAuthorQuote(""); // Assuming setInputAuthorQuote is the state-setting function

        // Refresh the quote list after adding a new quote
        getAllQuotes();
      } else {
        // Handle other status codes or error responses
        console.error(
          response.data.message || "Failed to add quote. Please try again."
        );
      }
    } catch (error) {
      console.error(
        "Error adding quote",
        error.response.data,
        error.response.status
      );
    }
  };
  const deleteQuote = async () => {
    try {
      if (!quoteToDelete) {
        console.error("No quote selected for deletion.");
        return;
      }

      const token = sessionStorage.getItem("authToken");
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.delete(
        `https://book-bridges-backend.onrender.com/quotes/deleteQuote/${quoteToDelete._id}`,
        { headers: headers }
      );

      if (response.status === 200 && response.data.success) {
        setNotification("Quote deleted successfully!");

        // ... (rest of your existing code)

        // Clear the notification after a few seconds
        setTimeout(() => {
          setNotification(null);
        }, 3000); // Adjust the timeout as needed
        console.log(response.data.message);
        setDeletePopupVisible(false);
        setQuoteToDelete(null);
        getAllQuotes();
      } else {
        console.error(
          response.data.message || "Failed to delete quote. Please try again."
        );
      }
    } catch (error) {
      console.error(
        "Error deleting quote",
        error.response.data,
        error.response.status
      );
    }
  };
  const updateQuote = async () => {
    try {
      if (!quoteToUpdate) {
        console.error("No quote selected for updating.");
        return;
      }

      const token = sessionStorage.getItem("authToken");
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const data = {
        quote_text: inputQuoteText,
        author_of_quote: inputAuthorQuote,
      };

      const response = await axios.put(
        `https://book-bridges-backend.onrender.com/quotes/updateQuote/${quoteToUpdate._id}`,
        data,
        { headers: headers }
      );

      if (response.status === 200 && response.data.success) {
        setNotification("Quote updated successfully!");

        // ... (rest of your existing code)

        // Clear the notification after a few seconds
        setTimeout(() => {
          setNotification(null);
        }, 3000); // Adjust the timeout as needed
        console.log(response.data.message);
        setUpdatePopupVisible(false);
        setQuoteToUpdate(null);
        getAllQuotes();
      } else {
        console.error(
          response.data.message || "Failed to update quote. Please try again."
        );
      }
    } catch (error) {
      console.error(
        "Error updating quote",
        error.response.data,
        error.response.status
      );
    }
  };
  return (
    <>
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
      <div
        className="popup popup2"
        style={{ display: updatePopupVisible ? "block" : "none" }}
      >
        <h2>Update Quote</h2>
        <form>
          <label htmlFor="updateQuoteText">Quote Text:</label>
          <input
            type="text"
            id="updateQuoteText"
            value={inputQuoteText}
            onChange={(e) => setInputQuoteText(e.target.value)}
          />
          <label htmlFor="updateAuthorName">Author Name:</label>
          <input
            type="text"
            id="updateAuthorName"
            value={inputAuthorQuote}
            onChange={(e) => setInputAuthorQuote(e.target.value)}
          />
          <button type="button" onClick={updateQuote}>
            Update Quote
          </button>
        </form>
        <button onClick={() => setUpdatePopupVisible(false)}>Close</button>
      </div>
      {notification && (
        <div className="notification">
          <p>{notification}</p>
        </div>
      )}
      <div
        className="popup popup1"
        style={{ display: popup1Visible ? "block" : "none" }}
      >
        <h2>Add Quote</h2>
        <form>
          <label htmlFor="quoteText">Quote Text:</label>
          <input
            type="text"
            id="quoteText"
            value={inputQuoteText}
            onChange={(e) => setInputQuoteText(e.target.value)}
          />
          <label htmlFor="authorName">Author Name:</label>
          <input
            type="text"
            id="authorName"
            value={inputAuthorQuote}
            onChange={(e) => setInputAuthorQuote(e.target.value)}
          />
          <button type="button" onClick={addQuote}>
            Add Quote
          </button>
        </form>
        <button onClick={togglePopup1}>Close</button>
      </div>

      {deletePopupVisible && (
        <div className="popup delete-popup">
          <h2>Delete Quote</h2>
          <p>Are you sure you want to delete this quote?</p>
          <button onClick={deleteQuote}>Delete</button>
          <button onClick={() => setDeletePopupVisible(false)}>Cancel</button>
        </div>
      )}

      <div className="center">
        <button className="popup-btn" onClick={togglePopup1}>
          Add Quote
        </button>
      </div>
      <div className="quotes">
        {quotes &&
          quotes.map((quote, index) => (
            <blockquote className="otro-blockquote" key={index}>
              {quote.quote_text}
              <span>{quote.author_of_quote}</span>
              <button
                className="popup-btn"
                onClick={() => toggleDeletePopup(quote)}
              >
                Delete
              </button>
              <button
                className="popup-btn"
                onClick={() => toggleUpdatePopup(quote)}
              >
                Update quote
              </button>
            </blockquote>
          ))}
      </div>
    </>
  );
};

export default AdminQuotes;
