import React from 'react'
import "../Styles/Hero.css";
import bookStack from "../Images/bookstack.png"; 
import { useNavigate } from 'react-router-dom'; 
const Hero = () => {
  const navigate = useNavigate();
  const handleGenres = (e) => {
    e.preventDefault();
    navigate("/categories");
  };
  return (
    <div className='hero-section'>
      <div className="paragraphs">
        <p className='p1'>"Embark on a Literary Journey: </p>
        <p className='p2'>Where Every Page Unfolds a World of Imagination!"</p>
        <button className="explorenow" onClick={handleGenres}>EXPLORE NOW!</button>
      </div>
      <div className='stackedbooksimage'>
        <img className='bookStack' src={bookStack} alt="" />
      </div>
    </div>
  )
}

export default Hero
