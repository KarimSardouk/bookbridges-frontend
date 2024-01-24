import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Styles/Bookshelf.css";
import Header from "../Components/Header";
import { useNavigate } from "react-router-dom";
const Bookshelf = () => {
  const [notification, setNotification] = useState(null);
  const [inputNine, setInputNine] = useState("");
  const [inputTen, setInputTen] = useState("");
  const [inputEleven, setInputEleven] = useState("");
  const [inputTwelve, setInputTwelve] = useState("");
  const [inputThirteen, setInputThirteen] = useState("");
  const [inputFourteen, setInputFourteen] = useState(null);
  const [booksFromShelf, setBooksFromShelf] = useState([]);
  const [shelfNames, setShelfNames] = useState([]);
  const [selectedShelf, setSelectedShelf] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const handleDeleteClick = async (bookId) => {
    // Call the deleteBook function passing the bookId
    await deleteBook(bookId);

    // Optionally, you may want to refresh the book list after deletion
    // Add a call to fetchData or handleShelfChange here
  };
  const deleteBook = async (bookId) => {
    try {
      setIsDeleting(true);
      const response = await axios.delete(`https://book-bridges-backend.onrender.com/books/deleteFromBookShelf/${bookId}`);

      if (response.status === 200) {
        setNotification("Book deleted successfully!");
        console.log('Book deleted successfully:', response.data);
        // Optionally, you can update your component state or trigger a reload of book data
      } else {
        console.error('Failed to delete book:', response.data.message);
      }
    } catch (error) {
      console.error('Error:', error.message);
    } finally {
      setIsDeleting(false);
    }
  };
  const navigate = useNavigate();
  const handleHome = (e) => {
    e.preventDefault();
    navigate("/");
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://book-bridges-backend.onrender.com/books/getAllShelvesByShelfName"
        );

        // Check if response.data.data is an array before mapping
        if (Array.isArray(response.data.data)) {
          console.log(response.data);
          setShelfNames(response.data.data); // Use the whole response data array
          // Set initial state to an empty array
          setBooksFromShelf([]);
        } else {
          console.error("Invalid data structure received:", response.data);
        }
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, []);
  const handleShelfChange = async (shelf_name) => {
    setSelectedShelf(shelf_name);
    try {
      const response = await axios.get(
        `https://book-bridges-backend.onrender.com/books/getAllBooksFromShelf?shelfName=${shelf_name}`
      );
      console.log(response.data);
      setBooksFromShelf(response.data.data);
    } catch (error) {
      console.error("Error fetching books for the selected shelf", error);
    }
  };
  const handleAddToBookshelf = async () => {
    try {
      // Validate required fields
      if (
        !inputNine ||
        !inputTen ||
        !inputEleven ||
        !inputTwelve ||
        !inputThirteen ||
        !inputFourteen
      ) {
        console.error("Please fill out all required fields.");
        return;
      }

      // Create FormData and append data
      const formData = new FormData();
      formData.append("shelf_name", inputNine);
      formData.append("author_name", inputTen);
      formData.append("book_title", inputEleven);
      formData.append("description", inputTwelve);
      formData.append("publication_date", inputThirteen);
      formData.append("image", inputFourteen);
      const token = sessionStorage.getItem("authToken");
      const headers = {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      };
      // Make the request to the backend API
      const response = await axios.post(
        "https://book-bridges-backend.onrender.com/books/addToBookShelf",
        formData,
        { headers: headers }
      );

      console.log(response.data);

      // Check if the response indicates success
      if (response.status === 200 && response.data.success) {
        setNotification("Book added to shelf successfully!");
        // Show success message (you can customize this part)
        console.log(response.data.message);

        // Clear input fields after successful addition
        setInputNine("");
        setInputTen("");
        setInputEleven("");
        setInputTwelve("");
        setInputThirteen("");
        setInputFourteen(null);
        handleShelfChange();
      } else {
        // Handle other status codes or error responses
        console.error(
          response.data.message || "Failed to add book. Please try again."
        );
      }
    } catch (error) {
      console.error("Error adding book", error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setInputFourteen(file);
  };
  return (
    <>
      <link
        href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
        rel="stylesheet"
      />
      <Header />

      <div className="bookshelfdiv">
        <div className="container">
          <form encType="multipart/form-data">
            <div className="row">
              <div className="col-25">
                <label htmlFor="shelf_name">Shelf Name</label>
              </div>
              <div className="col-75">
                <input
                  type="text"
                  id="shelf_name"
                  name="shelf_name"
                  value={inputNine}
                  onChange={(e) => setInputNine(e.target.value)}
                  className="input"
                  placeholder="Shelf name"
                  required
                />
              </div>
            </div>

            <div className="row">
              <div className="col-25">
                <label htmlFor="author_name">Author Name</label>
              </div>
              <div className="col-75">
                <input
                  type="text"
                  id="author_name"
                  name="author_name"
                  value={inputTen}
                  onChange={(e) => setInputTen(e.target.value)}
                  className="input"
                  placeholder="Author name"
                  required
                />
              </div>
            </div>

            <div className="row">
              <div className="col-25">
                <label htmlFor="book_title">Book Title</label>
              </div>
              <div className="col-75">
                <input
                  type="text"
                  id="book_title"
                  name="book_title"
                  value={inputEleven}
                  onChange={(e) => setInputEleven(e.target.value)}
                  className="input"
                  placeholder="Book title"
                  required
                />
              </div>
            </div>

            <div className="row">
              <div className="col-25">
                <label htmlFor="description">Description</label>
              </div>
              <div className="col-75">
                <textarea
                  id="description"
                  name="description"
                  value={inputTwelve}
                  onChange={(e) => setInputTwelve(e.target.value)}
                  className="input"
                  placeholder="Description"
                  required
                ></textarea>
              </div>
            </div>

            <div className="row">
              <div className="col-25">
                <label htmlFor="publication_date">Publication Date</label>
              </div>
              <div className="col-75">
                <input
                  type="text"
                  id="publication_date"
                  name="publication_date"
                  value={inputThirteen}
                  onChange={(e) => setInputThirteen(e.target.value)}
                  className="input"
                  placeholder="Publication date"
                  required
                />
              </div>
            </div>

            <div className="row">
              <div className="col-25">
                <label htmlFor="book_image">Book Image</label>
              </div>
              <div className="col-75">
                <input
                  type="file"
                  id="book_image"
                  name="book_image"
                  onChange={handleImageChange}
                  accept="image/*"
                  required
                />
              </div>
            </div>

            <div className="row">
              <input
                className="sub"
                type="button"
                value="Add"
                onClick={handleAddToBookshelf}
              />
            </div>
          </form>
        </div>
        {notification && (
        <div className="notification">
          <p>{notification}</p>
        </div>
      )}
        <div className="shelf">
          <div className="dropdown">
            <label className="selectashelf" htmlFor="shelves">Select a Shelf:</label>
            <select
              id="shelves"
              value={selectedShelf}
              onChange={(e) => handleShelfChange(e.target.value)}
            >
              <option className="op1" key="" value="">
                All Shelves
              </option>
              {shelfNames &&
                shelfNames.map((shelf) => (
                  <option className="op2" key={shelf} value={shelf}>
                    {shelf}
                    
                  </option>

                ))}
            </select>
    
          </div>

          <div className="one">
            {Array.isArray(booksFromShelf) ? (
              booksFromShelf.map((book, index) => (
                <div key={index} className="rect1">
                  {book.book_title}
                  <button className="deletefromshelf" onClick={() => handleDeleteClick(book._id)}>
                Delete
              </button>
                </div>
              ))
            ) : (
              <p>No books found for the selected shelf.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Bookshelf;
