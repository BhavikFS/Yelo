import React from 'react';
import imageSrc from '../../assets/about.jpeg'; // Import your image here
import "../../styles/AboutUs.css"
import Navbar from '../../layouts/Navbar';
import Footer from "../../layouts/Footer"
const AboutUs = () => {
  return (
   <div>
<Navbar/>
    <div className="about-us-container">
 
      <div className="image-container">
        <img src={imageSrc} alt="About Us" className="about-us-image" />
      </div>
      <div className="text-container">
        
        <h2>About Us</h2>
        <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus tincidunt metus in purus euismod tristique. In ornare feugiat nisi quis aliquam. Proin quis ex vel metus porttitor imperdiet. Sed viverra, erat eget fringilla molestie, felis ex euismod lorem, mattis semper libero est ac ligula. Quisque sodales purus justo, a sodales est sodales quis. Ut non sagittis ex, ac pellentesque urna. Quisque pellentesque arcu eget dui sagittis vestibulum. Vivamus eu scelerisque sapien. Sed posuere risus eget magna sollicitudin, ac interdum felis porta. In semper quis urna eu lobortis. Quisque fermentum dui risus, eu feugiat tortor interdum lobortis. Integer finibus facilisis bibendum. In felis felis, finibus et luctus et, fringilla ac lectus. Etiam eleifend molestie tellus, id hendrerit ligula aliquet a. Nullam volutpat elit vitae justo aliquet, ut lobortis purus ultricies.
Nulla facilisi. Nam et urna metus. Suspendisse et nisi scelerisque, blandit nunc ac, malesuada dui. Fusce sodales tempor magna ut condimentum. Nulla facilisi. 
        </p>
        
      </div>
    </div>
    <Footer/>
   </div>
  );
};

export default AboutUs;

