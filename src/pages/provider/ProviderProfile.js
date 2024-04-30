
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import "../../styles/Profile.css";
import Footer from "../../layouts/Footer";
import Navbar from "../../layouts/Navbar";
import { Link, useNavigate } from "react-router-dom";
import loginImg from "../../assets/loginImage.jpeg"
import axios from "axios";
const ProviderProfile = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [licenseNo, setLicense] = useState("")
  const [token, setToken] = useState("");
  const [profileImage, setProfileImage] = useState("")

  const ProfileDetails = async (token) => {
    // e.preventDefault();

    try {
      const response = await axios.get(
        "http://164.52.197.9:8080/provider-profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.response);
      const userDetailsDTO = response.data.response;
      setEmail(userDetailsDTO.email);
      setFirstName(userDetailsDTO.firstName);
      setLastName(userDetailsDTO.lastName);
      setMobile(userDetailsDTO.mobile);
      setLicense(userDetailsDTO.licenseNo);
      setProfileImage(userDetailsDTO.profileImage)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let data = localStorage.getItem("data");
    data = JSON.parse(data);
    setToken(data.jwt);
    ProfileDetails(data.jwt);
  }, []);
  return (
    <>
    <Navbar/>
    <div className="profile-container">
        <div className="left-panel">
          <img src={loginImg} alt="Left Panel Image" />
        </div>
        <div className="right-panel">

          <div className="profile-details">
          <div className="d-flex justify-content-center w-100">
          <h3>Provider Profile</h3>
          </div>
            <div className="user-info">
              <div className="user-avatar">
                <img src={profileImage} alt="User Avatar" />
              </div>
              <div className="user-text">
                <p>
                  <strong>Name:</strong> {firstName} {lastName}
                </p>
                <p>
                  <strong>Email:</strong> {email}
                </p>
                <p>
                  <strong>Mobile:</strong> {mobile}
                </p>
                <p>
                <strong>License No:</strong> {licenseNo}
                </p>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-center w-100">
            <Link to="/edit-profile">
              <button type="submit" className="submit-btn">
                Edit Profile
              </button>
            </Link>
          </div>
        </div>
      </div>
      </>
    
  );
};

export default ProviderProfile;

