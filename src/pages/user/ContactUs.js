import React, { useState } from 'react';
import axios from 'axios';
import "../../styles/Contact.css"
import imageSrc from '../../assets/contact.jpg'; 
import Footer from '../../layouts/Footer';
import Navbar from '../../layouts/Navbar';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    companyName: '',
    message: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple client-side validation
    const errors = {};
    if (!formData.fullName) errors.fullName = 'Full name is required';
    if (!formData.email) errors.email = 'Email is required';
    if (!formData.message) errors.message = 'Message is required';
    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      try {
        // Assume API endpoint for form submission
        const response = await axios.post('/api/contact', formData);
        console.log(response.data); // Handle response as needed
        // Optionally reset form after successful submission
        setFormData({
          fullName: '',
          phoneNumber: '',
          email: '',
          companyName: '',
          message: ''
        });
      } catch (error) {
        console.error('Submission error:', error);
      }
    }
  };

  return (
    <>
    <Navbar/>
    <div className="custom-contact-us-container">
      <div className="custom-image-container">
        {/* Add your image here */}
        <img src={imageSrc} alt="About Us" className="custom-contact-us-image" />
      </div>
      <div className="custom-form-container">
      <div className="d-flex justify-content-left w-100 mt-2 mb-2 ">
        <h2>Contact Us</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="custom-form-group">
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Full Name"
            />
            {errors.fullName && <span className="custom-error">{errors.fullName}</span>}
          </div>
          <div className="custom-form-group">
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Phone Number"
            />
          </div>
          <div className="custom-form-group">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
            />
            {errors.email && <span className="custom-error">{errors.email}</span>}
          </div>
          <div className="custom-form-group">
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              placeholder="Company Name"
            />
          </div>
          <div className="custom-form-group">
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Draft your Message"
            />
            {errors.message && <span className="custom-error">{errors.message}</span>}
          </div>
          <button type="submit" className='custom-submit-btn'>Submit</button>
        </form>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default ContactUs;
