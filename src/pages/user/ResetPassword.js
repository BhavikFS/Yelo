import React, { useState  } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/ResetPassword.css';
import loginImg from "../../assets/loginImage.jpeg";
import Navbar from '../../layouts/Navbar';

import axios from 'axios';
function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const email = localStorage.getItem("email");
      const otp = localStorage.getItem("otp");

      const response = await axios.post("http://164.52.197.9:8080/reset-pass/user", { email, otp, password });
     
      if (response.data.status === 200) {
        
        navigate('/login');
        localStorage.clear();
      } else {
        console.error('Failed to reset password');
      }
    } catch (error) {
      console.error('Error occurred:', error);
    }
  };
  return (
   <>
   {/* <Navbar/> */}
    <div className="reset-password-container">
      <div className="left-panel">
        <img src={loginImg} alt="Left Panel Image" />
      </div>
      <div className="right-panel">
        <h1>Yelospace Logo</h1>
        <div className="reset-password-heading">
          <h2>Reset Password</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="custum-input-group">
         
            <input type="password" id="password" placeholder="New Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="custum-input-group">
           
            <input type="password" id="confirmPassword" placeholder="Confirm New Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          </div>
          <button type="submit" className="submit-btn">Reset Password</button>
        </form>
        <div className="back-to-login">
          <a href="/">Back to Login</a>
        </div>
      </div>
    </div>
   </>
    );
}

export default ResetPassword;
