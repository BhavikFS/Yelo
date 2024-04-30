import React from 'react';
import "../../styles/FAQ.css";
import FAQImg from "../../assets/faq.jpeg";
import Navbar from '../../layouts/Navbar';
import Footer from '../../layouts/Footer';

const FAQPage = () => {
    return (
        <>
        <Navbar/>
        <div className="faq">
            <br/>
            <br/>
            <br/>
          
            <h2>FAQ</h2>

            <h4>1. What is Commercial Real Estate Subleasing?</h4>
            <p>Commercial Real Estate Subleasing is when the current tenant of a commercial space rents out a portion or all of their leased space to another party, known as the subtenant or sublessee. This arrangement allows the primary tenant to share the space and costs, while the sublessee gains access to a ready-to-use workspace without the long-term commitment of a traditional lease.</p>
            <img src={FAQImg} alt="Left Panel Image" />
            <h4>2. How does your platform facilitate Commercial Real Estate Subleasing?</h4>
            <p>Our platform provides a marketplace where tenants looking to sublease their space can connect with individuals or businesses seeking affordable and flexible workspace options. We offer a user-friendly interface that allows users to list their available space, search for suitable sublease options, and communicate directly with potential subtenants</p>
           

            <h4>3. What are the benefits of subleasing commercial space?</h4>
            <p>Subleasing commercial space offers several benefits, including:</p>
            <ul>
                <li>Cost Savings: Subleasing allows tenants to offset their rent and operational costs by sharing the space with a sublessee.</li>
                <li>Flexible Terms: Subleasing agreements are often more flexible than traditional leases, allowing tenants to adjust the terms to suit their need</li>
                <li>Networking Opportunities: Subleasing can provide opportunities for collaboration and networking with other businesses sharing the space.</li>
                <li>Reduced Risk: Subleasing can help mitigate the risks associated with long-term lease commitments, especially in uncertain economic times.</li>
            </ul>

            <h4>4. How does your platform help individuals, including housewives, start side businesses?</h4>
            <p>Our platform not only facilitates Commercial Real Estate Subleasing but also introduces viable business options for sublessees. We provide information and resources to help individuals explore and start side businesses, reducing risks and providing opportunities for aspiring entrepreneurs, including housewives, to easily start and manage their ventures.</p>
           
        </div>
        <Footer/>
        </>
    );
}

export default FAQPage;
