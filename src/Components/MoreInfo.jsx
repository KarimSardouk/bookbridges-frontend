import React, { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";
import { useNavigate, useParams } from "react-router-dom";
import "../Styles/MoreInfo.css";
import bookrow from "../Images/library-book-bookshelf-read.jpg";
import arrowleft from "../Images/arrow-left-svgrepo-com.svg";

const MoreInfo = () => {
  const [book, setBook] = useState(null);
  const navigate = useNavigate();
  const handleHome = (e) => {
    e.preventDefault();
    navigate("/");
  };
  const handleCategories = (e) => {
    e.preventDefault();
    navigate("/categories");
  };
  const { id } = useParams();
  useEffect(() => {
    const fetchBookByID = async () => {
      try {
        const response = await axios.get(
          `https://book-bridges-backend.onrender.com/books/getByID/${id}`
        );
        setBook(response.data);
      } catch (error) {
        console.error("Error fetching book info:", error);
        if (error.response && error.response.status === 404) {
          // Handle book not found, you can redirect to an error page or display a message
          navigate("/error");
        } else {
          // Handle other errors
          navigate("/error");
        }
      }
    };
    fetchBookByID();
  }, [id, navigate]);

  const renderBookDetails = () => {
    const formattedPublicationDate = book.publication_date
      ? format(new Date(book.publication_date), "yyyy-MM-dd")
      : "N/A";

    const details = [
      { label: "Author Name", value: book.author_name },
      { label: "Publisher Name", value: book.publisher_name },
      { label: "Publication Date", value: formattedPublicationDate },
      { label: "Description", value: book.description },
      { label: "Rating", value: book.rating },
    ];

    return details.map((detail, index) => (
      <p key={index}>
        <strong>{detail.label}:</strong> {detail.value}
      </p>
    ));
  };
  return (
    <div className="moreinfo">
      <button className="handleHome sticky" onClick={handleHome}>
        Return To Home
      </button>
      <button className="sticky" onClick={handleCategories}>
        Go back
        <img src={arrowleft} alt="" />
      </button>

      {book ? (
        <div className="card">
          <img className="bk-img" src={book.book_image} alt="" />
        
          <div className="card-body">
          <h2>{book.book_title}</h2>
            {renderBookDetails()}</div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default MoreInfo;
