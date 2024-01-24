import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { format } from "date-fns";
import logo from "../Images/bookbridgeslogo.png";
import Modal from "../Components/Modal";
import "../Styles/Modal.css";
import "../Styles/Categories.css";
import Header from "../Components/Header";
const Categories = () => {
  const [Id, setId] = useState(null);
  const [genreName, setGenreName] = useState("");
  const [book, setBook] = useState([]);
  const [searchInputTwo, setSearchInputTwo] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // Call the function when the component mounts
    getBookByGenreName();
  }, []);

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
    navigate("/");
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
        <Header />
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
