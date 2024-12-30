import React from 'react';
import '../css/InfoPages.css';

const Contact = () => {
  return (
    <div className="info-page">
      <h1>Contact Us</h1>
      <p>We value your feedback and are here to assist you. Reach out to us through the following methods:</p>
      <ul>
        <li><strong>Email:</strong> support@bookverse.com</li>
        <li><strong>Phone:</strong> +1 (800) 123-4567</li>
        <li><strong>Address:</strong> 123 Book Lane, Readerville, RD 98765, USA</li>
      </ul>
      <p>Our team is available Monday to Friday, 9:00 AM to 6:00 PM (EST).</p>
    </div>
  );
};

export default Contact;
