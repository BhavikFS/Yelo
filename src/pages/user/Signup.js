// SignUp.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/SignUp.css";
import loginImg from "../../assets/loginImage.jpeg";
import Navbar from "../../layouts/Navbar";
import Loader from "../../components/common/Loading"

function SignUp() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    termsAndConditions: false,
  });

   const [submitted, setSubmitted] = useState(false); // State to track form submission
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData({
      ...formData,
      [name]: newValue,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

   setSubmitted(true)
    

    // Validation checks on client side
    if (formData.password !== formData.confirmPassword) {
      console.error("Passwords do not match");
      return;
    }

    if (!formData.termsAndConditions) {
      console.error("Please accept the terms and conditions");
      return;
    }

    try {
      setLoading(true); // Start loading
      // Exclude confirmPassword and termsAndConditions from formData
      const { confirmPassword, termsAndConditions, ...postData } = formData;

      const response = await fetch("http://164.52.197.9:8080/send-otp/{email}", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      if (response.status === 200) {

        localStorage.setItem("formdata", JSON.stringify(postData))
        navigate("/verify-email");
      } else {
        console.error("Failed to sign up");
      }
    } catch (error) {
      console.error("Error occurred:", error);
    }
    finally {
      setLoading(false); // Finish loading
    }
  };

  return (
    <>
      {/* <Navbar /> */}
       {loading ? <Loader className="d-flex justify-content-center align-items-center"/> : (
      <div className="signup-container">
        <div className="left-panel">
          <img src={loginImg} alt="Left Panel Image" />
        </div>
        <div className="right">
          <h1>Yelospace Logo</h1>
          <h3>Sign Up</h3>
          <form onSubmit={handleSubmit}>
            <div className="input-group-custum">
              <input
                type="text"
                id="firstname"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
              {submitted && !formData.firstName && (
                <span className="error">First Name is required</span>
              )}
            </div>
            <div className="input-group-custum">
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
              {submitted && !formData.lastName && (
                <span className="error">Last Name is required</span>
              )}
            </div>
            <div className="input-group-custum">
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              {submitted && !formData.email && (
                <span className="error">Email is required</span>
              )}
            </div>
            <div className="input-group-custum">
              <input
                type="tel"
                id="mobile"
                name="mobile"
                placeholder="Mobile Number"
                value={formData.mobile}
                onChange={handleChange}
                required
              />
              {submitted && !formData.mobile && (
                <span className="error">Mobile Number is required</span>
              )}
            </div>
            <div className="input-group-custum">
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              {submitted && !formData.password && (
                <span className="error">Password is required</span>
              )}
            </div>
            <div className="input-group-custum">
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              {submitted && !formData.confirmPassword && (
                <span className="error">Confirm Password is required</span>
              )}
            </div>
            <div className="checkbox-group-custum">
              <input
                type="checkbox"
                id="termsAndConditions"
                name="termsAndConditions"
                checked={formData.termsAndConditions}
                onChange={handleChange}
                required
              />
              <label htmlFor="termsAndConditions">
                I accept the terms and conditions and privacy policy
              </label>
              {submitted && !formData.termsAndConditions && (
                <span className="error">Please accept the terms and conditions</span>
              )}
            </div>
            <div className="d-flex justify-content-center w-100 mt-2">
            <button type="submit" className="submit-btn">Sign Up</button>
            </div>
            <div className="d-flex justify-content-center w-100 ">
          <div className="back-to-login">
          <a href="/" className="border py-3 px-3">Continue As Guest</a>
          </div>
          </div>
          </form>
        </div>
      </div>
        )}
    </>
  );
}

export default SignUp;
