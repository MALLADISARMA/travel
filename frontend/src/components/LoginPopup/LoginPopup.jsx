import React, { useState, useContext } from "react";
import { Storecontext } from '../../context/Storecontext';
import "./LoginPopup.css";
import axios from "axios";

const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken } = useContext(Storecontext);

  const [currState, setCurrentState] = useState("Login");

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Handle input changes
  const onChangeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // Handle login/signup
  const onLogin = async (event) => {
    event.preventDefault();
    let newUrl = url;

    if (currState === "Login") {
      newUrl += "/api/user/login";
    } else {
      newUrl += "/api/user/register";
    }

    try {
      const response = await axios.post(newUrl, data);
      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        setShowLogin(false);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Login/Register error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="login-popup">
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src="https://img.icons8.com/?size=20&id=13903&format=png&color=000000"
            alt="Close"
          />
        </div>
        <div className="login-popup-inputs">
          {currState === "Sign Up" && (
            <input
              name="name"
              onChange={onChangeHandler}
              value={data.name}
              type="text"
              placeholder="Enter your name"
              required
            />
          )}
          <input
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            type="email"
            placeholder="Enter your email"
            required
          />
          <input
            name="password"
            onChange={onChangeHandler}
            value={data.password}
            type="password"
            placeholder="Enter your password"
            required
          />
        </div>
        <button type="submit">
          {currState === "Sign Up" ? "Create account" : "Login"}
        </button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>I agree to the terms and privacy policy.</p>
        </div>
        <p>
          {currState === "Login" ? "Don't have an account?" : "Already have an account?"}
          <span
            onClick={() =>
              setCurrentState(currState === "Login" ? "Sign Up" : "Login")
            }
          >
            {currState === "Login" ? " Sign up here" : " Login here"}
          </span>
        </p>
      </form>
    </div>
  );
};

export default LoginPopup; 
