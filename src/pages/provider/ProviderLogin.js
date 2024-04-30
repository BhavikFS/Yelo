import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/Login.css";
import loginImg from "../../assets/loginImage.jpeg";
import Navbar from "../../layouts/Navbar";
import Loader from "../../components/common/Loading";
import LoadingComponent from "../../components/common/Loading";

function ProviderLogin() {
  const [email, setEmail] = useState("");
  console.log(email, "email");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false); // State for loading
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    console.log(email, password, "ee");
    e.preventDefault();
    if (email.trim() === "" || password.trim() === "") {
      setSubmitted(true); // Set submitted to true when form is submitted
      return;
    }
    const payload = {
      email,
      password,
    };
    try {
      setLoading(true);

      const response = await axios.post(
        "http://164.52.197.9:8080/authenticate/provider",
        payload
      );
      console.log(response, "response");
      if (response.data.status === 401) {
        console.log("Unauthorized User");
      }
      const data = JSON.stringify({
        jwt: response?.data?.response?.jwt,
        role: "provider",
      });
      if (response.data.status === 200) {
        localStorage.setItem("data", data);
        navigate("/provider-listing");
      }
    } catch (error) {
      console.error("Error occurred:", error);
    } finally {
      setLoading(false); // Finish loading
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <>
      {/* <Navbar /> */}
      <div className="login-container">
        <div className="left-panel">
          <img src={loginImg} alt="Left Panel Image" />
        </div>
        <div className="right-panel">
          <h1>Yelospace Logo</h1>
          <h3>Login as Provider</h3>
          <form className="w-100" onSubmit={handleSubmit}>
            <div className="w-100">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                className="form-control w-75 mx-auto p-2"
                onChange={handleEmailChange}
              />
              {submitted && email.trim() === "" && (
                <span className="error">Email is required</span>
              )}
            </div>
            <div className="w-100">
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="form-control w-75 mx-auto mt-3 p-2"
                value={password}
                onChange={handlePasswordChange}
              />
              {submitted && password.trim() === "" && (
                <span className="error">Password is required</span>
              )}
            </div>
            <div className="w-100 d-flex justify-content-center">
              <button
                type="submit"
                disabled={loading ? true : false}
                className="login-btn mx-auto"
              >
                {loading ? <LoadingComponent /> : "Login"}
              </button>
            </div>
          </form>
          <div className="forgot-password">
            <a href="/provider-forget-password">Forgot password?</a>
          </div>

          <div className="d-flex justify-content-center w-100">
            <p className="signup-link">
              New user? <a href="/provider-signup">Sign up</a>
            </p>
          </div>
          <div className="d-flex justify-content-center w-100">
          <div className="back-to-login">
          <a className="border py-3 px-3" href="/">Continue As Guest</a>
          </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProviderLogin;
