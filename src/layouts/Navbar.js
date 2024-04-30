import React, { useState } from "react";
import "../styles/Navbar.css";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const logoutHandler = (action) => {
    localStorage.clear();
    if (action === "user") {
      navigate("/login");
    } else {
      navigate("/provider-login");
    }
  };

  const handleClick = () => {
    navigate('/');
  };

  let getAuth = localStorage.getItem("data");
  getAuth = JSON.parse(getAuth);

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/" onClick={handleClick} className="logo text-decoration-none">
          Yelospace Logo
        </Link>
      </div>
      <ul className="nav-links">
        {!!getAuth && getAuth.role === "user" && (
          <>
            <li>
              <Link to="/">Home</Link>
            </li>
          </>
        )}
        <li>
          <Link to="/faq">Legal Support</Link>
        </li>
        <li>
          <Link to="/community">Community Board</Link>
        </li>
        {(!getAuth?.role || getAuth.role === "user") && (
          <li>
            <a href="" onClick={() => logoutHandler("provider")}>
              Be Our Partner
            </a>
          </li>
        )}
        <li className="hamburger-menu" onClick={toggleMenu}>
          <div className="material-symbols-outlined">menu</div>
          {isOpen && (
            <div className="menu-options">
              <ul>
                <li>
                  <Link to="/about">About</Link>
                </li>
                {!!getAuth && getAuth?.role === "user" && (
                  <>
                    <li>
                      <Link to="/user-profile">My Profile</Link>
                    </li>
                    <li>
                      <Link to="/property-favourite">My Favourite</Link>
                    </li>
                  </>
                )}
                <li>
                  <Link to="/contact">Contact us</Link>
                </li>
                {!!getAuth?.jwt ? (
                  <li>
                    <a className="logoutBtn" onClick={() => logoutHandler("user")}>
                      Logout
                    </a>
                  </li>
                ) : (
                  <li>
                    <Link to="/login">Login</Link>
                  </li>
                )}
              </ul>
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
