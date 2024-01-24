import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../Styles/Login.css";
import bookimg from "../Images/icons8-open-book-94.png";
import emailimg from "../Images/email-interface-icon-svgrepo-com.svg";
import lock from "../Images/icons8-lock-30.png";
import user from "../Images/icons8-user-30.png";
import Cookies from "js-cookie";
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notification, setNotification] = useState(null);
  const [clickedSignInWithoutInput, setClickedSignInWithoutInput] = useState(false);
  const validateInput = () => {
    if (!email || !password) {
      console.log("Email and Password are required :(");
      setNotification("Please fill in the empty fields!")
      return false;
    }

    return true;
  };
  useEffect(() => {
    if (sessionStorage.getItem("authToken")) {
      navigate("/");
    }
  }, [navigate]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateInput()) {
      setClickedSignInWithoutInput(true);
      return;
    }

    try {
      const response = await axios.post(
        "https://book-bridges-backend.onrender.com/user/loginUser",
        {
          email,
          password,
        }
      );
      const userId = response.data.data._id; // Assuming the response contains userId
      Cookies.set("userEmail", email, { expires: 7 });
      Cookies.set("userId", userId, { expires: 50 });
      console.log(response.data.data._id);
      console.log(userId);
      console.log(response.data.data, "session");
      sessionStorage.setItem("authToken", response.data.data);
      navigate("/", { state: { userId } });
      navigate("/", { state: { successMessage: "Logged in successfully!" } });
    } catch (error) {
      console.log("error logging in", error);
    }
  };
  const handleHome = (e) => {
    // Navigate to the Home page
    e.preventDefault();
    navigate("/");
  };
  const handleSignUp = (e) => {
    e.preventDefault();
    navigate("/signup ");
  };
  return (
    <div className="main">
      <div className="body2">
        <div className="col">
          <p className="title1">bookBridges</p>
          <h1 className="s-up">Sign In</h1>
          <div className="div-img">
            <img src={bookimg} alt="book image" className="book-image" />
          </div>
          {clickedSignInWithoutInput && (
            <p style={{ color: "red" }}>{notification}</p>
          )}
          <div className="inputs">
            <div className="icon-i22">
              <img src={emailimg} alt="mail" className="mail" />
              <input
                type="text"
                className="input22"
                required
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="icon-i33">
              <img src={lock} alt="lock" className="pass" />
              <input
                type="password"
                className="input33  "
                required
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="redirect-signup">
              <p className="question" onClick={handleSignUp}>
                Don't have an account? Sign Up
              </p>
            </div>
          </div>

          <div className="buttonfors-up">
            <button className="signinbutton" onClick={handleSubmit}>
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
