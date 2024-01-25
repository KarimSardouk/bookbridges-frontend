import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../Images/bookbridgeslogo.png";
import Header from "../Components/Header";
import axios from "axios";
import "../Styles/Quotes.css";
import "../Styles/Header.css";
const Quotes = () => {
  const [quotes, setQuotes] = useState([]);
  const [searchInputOne, setSearchInputOne] = useState("");
  const navigate = useNavigate();
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

  const handleHome = (e) => {
    e.preventDefault();
    navigate("/");
  };
  const handleGenres = (e) => {
    e.preventDefault();
    navigate("/genres");
  };
  const handleQuotes = (e) => {
    e.preventDefault();
    navigate("/quotes");
  };
  const handleBookshelf = (e) => {
    e.preventDefault();
    navigate("/bookshelf");
  };
  const handleLogout = () => {
    sessionStorage.removeItem("authToken");
    navigate("/");
  };
  const filteredQuotes = useMemo(() => {
    return quotes.filter(
      (quote) =>
        quote.author_of_quote
          .toLowerCase()
          .includes(searchInputOne.toLowerCase()) ||
        quote.emotion_name.toLowerCase().includes(searchInputOne.toLowerCase())
    );
  }, [quotes, searchInputOne]);
  return (
    <div className="part">
      <div className="body">
        <Header />
        <div className="quotes1">
          {filteredQuotes.map((quote, index) => (
            <blockquote className="other-blockquote" key={index}>
              {quote.quote_text}
              <span>{quote.author_of_quote}</span>
            </blockquote>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Quotes;
