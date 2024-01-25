import React, { useState } from "react";
import "../Styles/SignUp.css";
import bookimg from "../Images/icons8-open-book-94.png";
import mail from "../Images/email-interface-icon-svgrepo-com.svg";
import lock from "../Images/icons8-lock-30.png";
import user from "../Images/icons8-user-30.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const SignUp = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notification, setNotification] = useState(false);
  const [clickedSignUpWithoutInput, setClickedSignUpWithoutInput] =
    useState(false);
  const validateInput = () => {
    if (!email || !password || !fullName) {
      console.log("Email, Full Name and Password are required :(");
      setNotification("Please fill in the empty fields!");
      return false;
    }

    return true;
  };
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/login");
  };
  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validateInput()) {
      setClickedSignUpWithoutInput(true);

      return;
    }
    try {
      const response = await axios.post(
        "https://book-bridges-backend.onrender.com/user/addUser",
        {
          fullName,
          email,
          password,
        }
      );
      console.log(response);
      const userId = response.data.data._id; // Assuming the response contains userId 
      Cookies.set("userEmail", email, { expires: 7 });
      Cookies.set("userId", userId, { expires: 50 });
      console.log(response.data.data._id);
      console.log(userId);
      console.log(response.data.data, "session");
      sessionStorage.setItem("authToken", response.data.data);
      navigate("/", { state: { userId } });
      navigate("/", { state: { successMessage: "Signed up successfully!" } });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="main1">
      <div className="body1">
        <p className="title1">bookBridges</p>
        <h1 className="s-up">Sign Up</h1>
        <div className="div-img">
          <img src={bookimg} alt="book image" className="book-img" />
        </div>
        <form>
          {clickedSignUpWithoutInput && (
            <p style={{ color: "red" }}>{notification}</p>
          )}
          <div className="inputs">
            <div className="icon-i1">
              <img src={user} alt="user image" className="user" />
              <input
                type="text"
                className="input1"
                required
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div className="icon-i2">
              <img src={mail} alt="mail" className="mail" />
              <input
                type="email"
                className="input2"
                required
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="icon-i3">
              <img src={lock} alt="lock" className="pass" />
              <input
                type="password"
                className="input3"
                required
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="redirect-signup">
            <p className="question" onClick={handleLogin}>
              Already have an account? Sign In
            </p>
          </div>
        </form>
        <div className="buttonfors-up">
          <button className="signupbutton" onClick={handleRegister}>
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
