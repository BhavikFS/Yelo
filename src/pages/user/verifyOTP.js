import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/VerifyOTP.css";
import loginImg from "../../assets/loginImage.jpeg";
import Navbar from "../../layouts/Navbar";
import Loader from "../../components/common/Loading"
import axios from 'axios';

function VerifyOTP() {
  const otpRef = useRef([]);
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(otp);
    var enteredOtp = "";
    otp.map((val)=>{
      enteredOtp += val;
    })
    try {
      setLoading(true); // Start loading
      const response = await axios.post("http://164.52.197.9:8080/user/verify-otp",{ email: email, otp: enteredOtp })
      console.log(response.data)  
      if (response.data.status === 200) {
        // Redirect to appropriate page upon successful OTP verification
        localStorage.setItem("otp", enteredOtp);

        navigate("/reset-password"); 
      } else {
        console.error("OTP verification failed");
      }
    } catch (error) {
      console.error("Error occurred:", error);
    } 
    finally {
      setLoading(false); // Finish loading
    }
    
  };
  const enterOtp = (e, otpNumber) => {
    const no = e.target.value;
    if (!no || no?.length <= 1) {
      const currentOtp = [...otp];
      currentOtp[otpNumber] = no;
      setOtp(currentOtp);
      if (no && otpRef.current[otpNumber + 1]) {
        otpRef.current[otpNumber + 1].focus();
      }
      if (!no && otpRef.current[otpNumber - 1]) {
        otpRef.current[otpNumber - 1].focus();
      }
    }
    if (no?.length === 4 && otpNumber === 0 && !isNaN(no)) {
      setOtp(no.toString().split("").map(Number));
      otpRef.current[3].focus();
    }
  };
  useEffect(() => {
    const username = localStorage.getItem("email");
    setEmail(username);
  }, []);
  return (
    <>
      {/* <Navbar /> */}
      {loading ? <Loader className="d-flex justify-content-center align-items-center"/> : (
      <div className="verify-otp-container">
        <div className="left-panel">
          <img src={loginImg} alt="Left Panel Image" />
        </div>
        <div className="right-panel">
          <h1>Yelospace Logo</h1>

          <form onSubmit={handleSubmit}>
            <h3 style={{ marginLeft: "40px" }}>Enter OTP</h3>
            <div className="otp-inputs">
              <input
                ref={(el) => (otpRef.current[0] = el)}
                value={otp[0]}
                type="number"
                onInput={(e) => enterOtp(e, 0)}
              />
              <input
                ref={(el) => (otpRef.current[1] = el)}
                value={otp[1]}
                type="number"
                onInput={(e) => enterOtp(e, 1)}
              />
              <input
                ref={(el) => (otpRef.current[2] = el)}
                value={otp[2]}
                type="number"
                onInput={(e) => enterOtp(e, 2)}
              />
              <input
                ref={(el) => (otpRef.current[3] = el)}
                value={otp[3]}
                type="number"
                onInput={(e) => enterOtp(e, 3)}
              />
            </div>
            <div className="d-flex justify-content-center w-100">
            <button type="submit" className="submit-btn">
              Verify OTP
            </button>
            </div>
          </form>
          <div className="back-to-login">
            <a href="/">Back to Login</a>
          </div>
        </div>
      </div>
      )}
    </>
  );
}

export default VerifyOTP;
