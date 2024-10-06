import React, { useState } from "react";
import "./Dashboard.css"; // Ensure to import the CSS file

const Dashboard = () => {
  // Features data
  const features = [
    {
      title: "Story-Based Learning",
      description: "Navigate human impact on wildlife.",
      image: "/learning.jpg",
    },
    {
      title: "Endangered Species Watchlist",
      description: "Track at-risk species.",
      image: "/species.jpg",
    },
    {
      title: "Virtual Map and Quiz",
      description: "Interactive learning through maps and quizzes.",
      image: "/map.jpg",
    },
    {
      title: "Indigenous Knowledge",
      description: "Share and document indigenous practices.",
      image: "/photogallery.jpg",
    },
  ];

  // State to track clicked features
  const [clickedIndex, setClickedIndex] = useState(null);

  const handleTitleClick = (index) => {
    setClickedIndex(clickedIndex === index ? null : index); // Toggle underline effect
  };

  return (
    <div>
      {/* Dashboard Header */}
      <header>
        <nav>
          <ul>
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href="#">Services</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
          </ul>
        </nav>
        <div className="user-profile">
          <svg
            className="profile-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="40"
            height="40"
          >
            <path d="M12 12c2.67 0 8 1.34 8 4v1H4v-1c0-2.66 5.33-4 8-4zm0-2a4 4 0 110-8 4 4 0 010 8z" />
          </svg>
        </div>
      </header>

      <div className="image-container">
        <img
          src="/wildlife2.jpg"
          alt="Wildlife Dashboard"
          className="animated-image"
        />
        <p className="overlay-text">
          <span>W</span>
          <span>I</span>
          <span>L</span>
          <span>D</span>
          <span>L</span>
          <span>I</span>
          <span>F</span>
          <span>E</span>
        </p>
      </div>
      <p className="description">
        Immerse yourself in the world of wildlife conservation through
        interactive storytelling and real-life scenarios. Our platform empowers
        you to step into the shoes of conservationists, navigate challenging
        situations, and make choices that shape the future of ecosystems.
        Discover the delicate balance between human activity and wildlife
        survival, and learn how your actions can make a lasting impact. By
        participating in engaging conservation challenges, you’ll gain insights
        into the complex relationships between people, wildlife, and the
        environment. Every decision you make on this platform mirrors real-world
        consequences, encouraging actionable efforts to preserve biodiversity.
        Join a community of passionate individuals, take part in interactive
        learning, and help protect our planet’s incredible wildlife. Together,
        we can make informed decisions and build a future where people and
        nature thrive side by side.
      </p>
      <p className="start">
        Begin Your Journey Today! Explore the features below
      </p>
      <main>
        {/* Features Section */}
        <section className="features-section">
          {features.map((feature, index) => (
            <div key={index} className="feature-block">
              <img
                src={feature.image}
                alt={feature.title}
                className="feature-image"
              />
              <h3
                onClick={() => handleTitleClick(index)}
                className={clickedIndex === index ? "clicked" : ""}
              >
                {feature.title}
              </h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </section>
      </main>

      {/* Dashboard Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-section logo-social">
            <img src="logo.png" alt="Logo" className="footer-logo" />
            <p>
              Maintaining a healthy and viable population of African Wild Dogs.
            </p>
            <div className="social-icons">
              <a href="#">
                <svg
                  width="20"
                  height="20"
                  fill="#f4e8c1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M22.675 0h-21.35c-.733 0-1.325.592-1.325 1.325v21.351c0 .732.592 1.324 1.325 1.324h11.495v-9.297h-3.125v-3.622h3.125v-2.672c0-3.097 1.893-4.786 4.658-4.786 1.325 0 2.463.099 2.796.143v3.241l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.31h3.589l-.467 3.622h-3.122v9.297h6.117c.732 0 1.324-.592 1.324-1.324v-21.35c0-.733-.592-1.325-1.325-1.325z" />
                </svg>
              </a>
              <a href="#">
                <svg
                  width="20"
                  height="20"
                  fill="#f4e8c1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-2.72 0-4.923 2.203-4.923 4.923 0 .386.043.762.127 1.124-4.09-.205-7.719-2.165-10.148-5.144-.424.728-.666 1.574-.666 2.476 0 1.708.87 3.213 2.188 4.096-.807-.026-1.566-.247-2.228-.616v.062c0 2.385 1.697 4.374 3.946 4.828-.413.113-.849.173-1.296.173-.317 0-.626-.03-.928-.086.626 1.956 2.444 3.379 4.6 3.419-1.685 1.32-3.808 2.107-6.115 2.107-.398 0-.79-.023-1.175-.069 2.179 1.396 4.768 2.209 7.557 2.209 9.054 0 14.002-7.503 14.002-14.002 0-.213-.004-.426-.014-.637.961-.694 1.8-1.56 2.463-2.548l-.047-.02z" />
                </svg>
              </a>
            </div>
          </div>

          <div className="footer-section contact-info">
            <h4>Get In Touch</h4>
            <ul>
              <li>
                <svg width="20" height="20" fill="#f4e8c1" viewBox="0 0 24 24">
                  <path d="M6.62,10.79a15.07,15.07,0,0,0,6.59,6.59l2.2-2.2a1,1,0,0,1,1.05-.24,11.36,11.36,0,0,0,3.56.57,1,1,0,0,1,1,1v3.62a1,1,0,0,1-1,1A18,18,0,0,1,2,5a1,1,0,0,1,1-1H6.66a1,1,0,0,1,1,1,11.36,11.36,0,0,0,.57,3.56,1,1,0,0,1-.24,1.05Z" />
                </svg>
                +263 776 844 485
              </li>
              <li>
                <svg width="20" height="20" fill="#f4e8c1" viewBox="0 0 24 24">
                  <path d="M12,13.42a1.42,1.42,0,1,0-1.42-1.42A1.42,1.42,0,0,0,12,13.42Zm0,2.84a4.27,4.27,0,1,1,4.27-4.27A4.27,4.27,0,0,1,12,16.26Zm0,6.74A10.53,10.53,0,1,1,22.53,12,10.53,10.53,0,0,1,12,23Zm0-1.9A8.63,8.63,0,1,0,3.37,12,8.63,8.63,0,0,0,12,21.1Z" />
                </svg>
                10 Oat Avenue, Harare, Zimbabwe
              </li>
              <li>
                <svg width="20" height="20" fill="#f4e8c1" viewBox="0 0 24 24">
                  <path d="M18,20H6a3,3,0,0,1-3-3V7A3,3,0,0,1,6,4H18a3,3,0,0,1,3,3V17A3,3,0,0,1,18,20ZM6,6A1,1,0,0,0,5,7V17a1,1,0,0,0,1,1H18a1,1,0,0,0,1-1V7a1,1,0,0,0-1-1ZM6,7l6,4.5L18,7Z" />
                </svg>
                info@painteddog.org
              </li>
            </ul>
          </div>

          <div className="footer-section quick-links">
            <h4>Quick Links</h4>
            <ul>
              <li>
                <a href="#">Our Work</a>
              </li>
              <li>
                <a href="#">Get Involved</a>
              </li>
              <li>
                <a href="#">Education</a>
              </li>
              <li>
                <a href="#">Contact Us</a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
