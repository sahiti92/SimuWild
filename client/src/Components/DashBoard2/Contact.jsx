import React from "react";
import "./Contact.css";

const Contact = () => {
  return (
    <div className="contact-section">
      <h1>Contact Us</h1>
      <p>
        We would love to hear from you! If you have any questions, feedback, or
        would like to know more about SimuWild, feel free to reach out.
      </p>
      <ul>
        <li>
          <strong>Email:</strong> info@simuwild.com
        </li>
        <li>
          <strong>Phone:</strong> +263 779 847 488
        </li>
        <li>
          <strong>Address:</strong> IIT Tirupati
        </li>
      </ul>
    </div>
  );
};

export default Contact;
