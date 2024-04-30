import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/ForgotPassword.css";
import loginImg from "../../assets/loginImage.jpeg";
import Navbar from "../../layouts/Navbar";
import axios from "axios";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `http://164.52.197.9:8080/is-exist/provider/${email}`
      );
      if (response.data.status === 200) {
        setIsError(false);
        const res = await axios.post(
          `http://164.52.197.9:8080/send-otp/${email}`
        );
        if (res.data.status === 200) {
          localStorage.setItem("email", email);
          // Navigate to verify-otp page
          navigate("/provider-verify-otp");
        } else {
          setErrorMessage("Error,Please try again later.");
          setIsError(true);
        }
      } else if (response.data.status === 404) {
        setErrorMessage("User not found, please try again.");
        setIsError(true);
        console.error("Email does not exist");
        // Handle the case where email does not exist (e.g., show an error message)
      }
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  return (
    <>
      {/* <Navbar /> */}
      <div className="forgot-password-container">
        <div className="left-panel">
          <img src={loginImg} alt="Left Panel Image" />
        </div>
        <div className="right-panel">
          <h1>Yelospace Logo</h1>
          <div className="forget-password-heading">
            <h2>Forget Password</h2>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="input-group-custum">
              <label htmlFor="email">Enter your registered Email</label>
              <input
                type="email"
                id="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {isError && (
                <p className="text-danger">
                 {errorMessage}
                </p>
              )}
              <label htmlFor="email">
                An OTP will be sent to your registered email
              </label>
            </div>
            <button type="submit" className="submit-btn">
              Send OTP
            </button>
          </form>
          <div className="back-to-login">
            <a href="/provider-login">Back to Login</a>
          </div>
        </div>
      </div>
    </>
  );
}

export default ForgotPassword;
