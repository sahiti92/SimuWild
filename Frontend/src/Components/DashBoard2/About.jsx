import React from "react";
import "./About.css"; 

const About = () => {
  return (
    <div className="about-page">
      <h1>About SimuWild</h1>
      <p>
        SimuWild is a platform dedicated to wildlife conservation through
        interactive learning. It combines storytelling, virtual tools, and
        quizzes to engage users in real-world challenges faced by
        conservationists. Learn how your actions impact ecosystems and help
        shape a future where both humans and wildlife can thrive.
      </p>
      <p>
        Join our community to explore how indigenous knowledge, conservation
        efforts, and education come together to protect biodiversity.
      </p>

     
      <div className="contact-section">
        <h1>Contact Us</h1>
        <p>
          We would love to hear from you! If you have any questions, feedback,
          or would like to know more about SimuWild, feel free to reach out.
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
    </div>
  );
};

export default About;