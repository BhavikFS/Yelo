import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import "../../styles/EditProfile.css"; // Import your CSS file for styling
import Navbar from "../../layouts/Navbar";
import loginImg from "../../assets/loginImage.jpeg";
import api from "../../api/config";
import { ToastContainer, toast } from "react-toastify";
import Skeleton from "react-loading-skeleton";

const EditProfile = () => {
  const [userProfile, setUserProfile] = useState({});
  const [profileImage, setProfileImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    const getUserProfile = async () => {
      setLoading(true);
      try {
        const response = await api.get("/user-profile");
        if (response?.data?.status === 200) {
          setUserProfile(response?.data?.response);
        }
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    getUserProfile();
  }, []);

  const handleAvatarChange = (event) => {
    setProfileImage(event.target.files[0]);
  };

  const editProfile = async (event) => {
    event.preventDefault();
    const data = {
      firstName: userProfile.firstName,
      lastName: userProfile.lastName,
      email: userProfile.email,
      mobile: userProfile.mobile,
    };
    try {
      const formData = new FormData();
      if (profileImage) {
        formData.append("file", profileImage);
      }
      formData.append("data", JSON.stringify(data));

      const response = await api.post("/update-user-profile", formData);

      if (response?.data?.status === 200) {
        toast.success("Profile updated successfully");
        navigate('/user-profile')

      } else {
        toast.error("Failed to update profile");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserProfile((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  return (
    <>
      <Navbar />
      <ToastContainer />
      <div className="edit-profile-container">
        <div className="edit-profile-left">
          <img src={loginImg} alt="Left Panel Image" />
        </div>
        <div className="edit-profile-right">
        <h3>Edit My Profile</h3>
          <div className="profile-avatar">
            <input
              type="file"
              id="avatar-upload"
              onChange={handleAvatarChange}
              style={{ display: "none" }}
            />
            <label htmlFor="avatar-upload">
              {loading ? (
                <Skeleton circle height={150} width={150} />
              ) : (
                <img
                  src={
                    !!userProfile?.profileImage
                      ? userProfile?.profileImage
                      : profileImage
                      ? URL.createObjectURL(profileImage)
                      : "https://via.placeholder.com/150"
                  }
                  alt="Avatar"
                  className="avatar-image"
                />
              )}
            </label>
          </div>
         
          <div className="form-box-custum">
            {/* <h3>Edit My Profile</h3> */}
            <form onSubmit={editProfile}>
              <div className="form-group-custum">
                {loading ? (
                  <Skeleton height={46} width={177} />
                ) : (
                  <input
                    onChange={handleChange}
                    name="firstName"
                    type="text"
                    placeholder="First Name"
                    value={userProfile.firstName}
                  />
                )}
              </div>
              <div className="form-group-custum">
                {loading ? (
                  <Skeleton height={46} width={177} />
                ) : (
                  <input
                    onChange={handleChange}
                    name="lastName"
                    type="text"
                    placeholder="Last Name"
                    value={userProfile.lastName}
                  />
                )}
              </div>
              <div className="form-group-custum">
                {loading ? (
                  <Skeleton height={46} width={177} />
                ) : (
                  <input
                    onChange={handleChange}
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={userProfile.email}
                  />
                )}
              </div>
              <div className="form-group-custum">
                {loading ? (
                  <Skeleton height={46} width={177} />
                ) : (
                  <input
                    onChange={handleChange}
                    name="mobile"
                    type="tel"
                    placeholder="Mobile"
                    value={userProfile.mobile}
                  />
                )}
              </div>
              <button
                disabled={loading ? true : false}
                className="btn"
                type="submit"
              >
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
