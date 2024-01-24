// import { useNavigate } from "react-router-dom";
// import "../Styles/Footer.css";
// import { useTheme } from "./ThemeContext";
// const Footer = () => {
//   const { isDarkMode, toggleDarkMode } = useTheme();
//   const navigate = useNavigate();
//   const handleGenres = (e) => {
//     e.preventDefault();
//     navigate("/genres");
//   };
//   return (
//     <div>
//       <div className={`footer ${isDarkMode ? "dark-mode" : "light-mode"} `}>
//         <div className="categories">
//           <h1>Categories</h1>
//           <p className="p1">Most popular</p>
//           <p className="p2">Fantasy</p>
//           <p className="p3">Crime</p>
//           <p className="p4">Thriller</p>
//           <p className="p5">Self-Help</p>
//           <p className="p6" onClick={handleGenres}>
//             More here {" "}
//           </p>
//         </div>
//         <div className="contact-us">
//           <h1>Contact Us</h1>
//           <p className="p7">Facebook</p>
//           <p className="p8">Twitter</p>
//           <p className="p9">Instagram</p>
//           <p className="p10">Linkedin</p>
//         </div>
//         <div className="newsletter">
//           <h1>News Letter</h1>
//           <p className="p11">
//             Want to receive updates about us? Sign up and we'll keep you
//             updated!
//           </p>
//           <textarea
//             className="textarea"
//             name="newsletter"
//             id="news"
//             cols="30"
//             rows="10"
//           ></textarea>
//           <button className="subscribe">Subscribe</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Footer;
