import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { logoutAction } from "../../redux/slice/authSlice";
import "./Dashboard.css";
import { Link, useNavigate } from "react-router-dom";
import { getUserFromStorage } from "../../utils/getUser";
import axios from "axios";
const Dashboard = () => {
  const features = [
    {
      title: "Scenario-Based Learning",
      description: "Navigate human impact on wildlife.",
      image: "/learning.jpg",
      path: "/scenarios",
    },
    {
      title: "Endangered Species Watchlist",
      description: "Track at-risk species",
      image: "/species.jpg",
      path: "/watchlist",
    },
    {
      title: "Virtual Map and Quiz",
      description: "Interactive learning through maps and quizzes.",
      image: "/map.jpg",
      path: "/map",
    },
  ];
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [clickedIndex, setClickedIndex] = useState(null);
  const [showProfileOptions, setShowProfileOptions] = useState(false);

  const handleTitleClick = async (index) => {
    if (clickedIndex === index) {
      setClickedIndex(null);
    } else {
      setClickedIndex(index);
      console.log("index");
      console.log(index);
      // if (index == 0) {
      //   //const API_BASE_URL = "http://localhost:10000/api/progress";
      //   const token = getUserFromStorage();
      //   try {
      //     // Step 1: Get the current progress of the user
      //     const progressResponse = await axios.get(
      //     //  "http://localhost:10000/api/v1/progress",

      //       {
      //         headers: {
      //           Authorization: `Bearer ${token}`, // Include the token
      //         },
      //       }
      //     );

      //     const progressData = progressResponse.data;
      //     console.log("progressData");
      //     console.log(progressData);
      //     // Step 2: Check if the progress array is empty
      //     if (!progressData.length) {
      //       // Array is empty, so update progress for scenarioIds 1, 3, and 5
      //       const scenarioIds = [1, 3, 5];
      //       await Promise.all(
      //         scenarioIds.map(async (scenarioId) => {
      //           await axios.post(
      //             "http://localhost:10000/api/v1/progress/update",
      //             { scenarioId, choices: 0 },
      //             {
      //               headers: {
      //                 Authorization: `Bearer ${token}`,
      //               },
      //             }
      //           );
      //         })
      //       );
      //       console.log("Progress initialized for scenario IDs 1, 3, and 5.");
      //     } else {
      //       console.log("User already has progress data, no update needed.");
      //     }
      //   } catch (error) {
      //     console.error("Error updating progress:", error);
      //   }
      // }
      navigate(features[index].path);
    }
  };

  const handleLogout = () => {
    dispatch(logoutAction());
    navigate("/login"); // Adjust this to your login route
  };

  const handleUpdatePassword = () => {
    navigate("/updatePass");
  };
  const toggleProfileOptions = () => {
    setShowProfileOptions((prev) => !prev);
  };
  return (
    <div className="dashboard" style={{ width: "100vw" }}>
      <div>
        <header>
          <nav>
            <ul>
              <li>
                <Link to="/about">About Us</Link>
              </li>
              <li>
                <Link to="/contact">Contact Us</Link>
              </li>
              <li>
                <Link to="/news">News</Link>
              </li>
            </ul>
          </nav>
          <div className="user-profile" onClick={toggleProfileOptions}>
            <svg
              className="profile-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="40"
              height="40"
            >
              <path d="M12 12c2.67 0 8 1.34 8 4v1H4v-1c0-2.66 5.33-4 8-4zm0-2a4 4 0 110-8 4 4 0 010 8z" />
            </svg>
            {showProfileOptions && (
              <div className="profile-options">
                <button onClick={handleUpdatePassword}>Update Password</button>
                <hr />
                <button onClick={handleLogout}>Logout</button>
                <hr />
                <button>Progress</button>
                <hr />
              </div>
            )}
          </div>
        </header>
        <div className="image-container">
          <img
            src="/Db.jpg"
            alt="Wildlife Dashboard"
            className="animated-image"
          />
          <div className="image-text">
            {"WILDLIFE".split("").map((letter, index) => (
              <span key={index}>{letter}</span>
            ))}
          </div>
        </div>
        <p className="description">
          Immerse yourself in the world of wildlife conservation through
          interactive storytelling and real-life scenarios. Our platform
          empowers you to step into the shoes of conservationists, navigate
          challenging situations and make choices that shape the future of
          ecosystems. Discover the delicate balance between human activity and
          wildlife survival and learn how your actions can make a lasting
          impact. By participating in engaging conservation challenges, you’ll
          gain insights into the complex relationships between people, wildlife
          and the environment. Every decision you make on this platform mirrors
          real-world consequences, encouraging actionable efforts to preserve
          biodiversity. Join a community of passionate individuals to take part
          in interactive learning and help protect our planet’s incredible
          wildlife. Together we can make informed decisions and build a future
          where people and nature thrive side by side.
        </p>

        <p className="start">
          Begin Your Journey Today! Explore the features below
        </p>
        <main>
          <section className="features-section">
            {features.map((feature, index) => (
              <div key={index} className="feature-block">
                <img
                  onClick={() => handleTitleClick(index)}
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

        <footer className="footer">
          <div className="footer-container">
            <div className="footer-section logo-social">
              <h2>Follow Us</h2>
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

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  imageRendering="optimizeQuality"
                  shapeRendering="geometricPrecision"
                  textRendering="geometricPrecision"
                  viewBox="0 0 13333.33 13333.33"
                  id="instagram"
                >
                  <path d="M8507.8 3309.65l-3682.26 0c-822.87,0 -1496.35,673.46 -1496.35,1496.35l0 3721.33c0,822.88 673.47,1496.35 1496.35,1496.35l3682.26 0c822.88,0 1496.35,-673.47 1496.35,-1496.35l0 -3721.33c0,-822.89 -673.47,-1496.35 -1496.35,-1496.35zm878.05 4872.9l0 0c0,668.87 -549.35,1218.22 -1218.23,1218.22l-2999.59 0c-671.17,0 -1218.22,-549.35 -1218.22,-1218.22l0 -3029.47c0,-671.17 547.05,-1218.22 1218.22,-1218.22l2999.59 0c668.87,0 1218.23,547.05 1218.23,1218.22l0 3029.47z"></path>
                  <path
                    fillRule="nonzero"
                    d="M6666.67 5010.56c-912.52,0 -1654.95,744.73 -1654.95,1657.25 0,912.52 742.43,1654.95 1654.95,1654.95 912.52,0 1657.24,-742.43 1657.24,-1654.95 0,-912.52 -744.72,-1657.25 -1657.24,-1657.25zm0 2753.65l0 0c-604.52,0 -1096.41,-491.88 -1096.41,-1096.4 0,-604.52 491.89,-1096.4 1096.41,-1096.4 604.52,0 1096.4,491.89 1096.4,1096.4 0,604.52 -491.88,1096.4 -1096.4,1096.4z"
                  ></path>
                  <path d="M8660.4 5347.79c188.48,0 340.19,-151.7 340.19,-337.89 0,-188.48 -151.7,-340.19 -340.19,-340.19 -186.18,0 -337.89,151.7 -337.89,340.19 0,186.18 151.7,337.89 337.89,337.89z"></path>
                  <rect width="13333.33" height="13333.33" fill="none"></rect>
                </svg>
                <img
                  src="/panda.png"
                  alt="Panda"
                  style={{
                    width: "1500px",
                    marginTop: "10px",
                    marginLeft: "-500px",
                  }}
                />
                <p
                  style={{
                    marginTop: "450px",
                    marginLeft: "-400px",
                    fontSize: "20px",
                  }}
                >
                  All Rights Reserved. SimuWild Community ©2024 2130 IIT
                  Tirupati, Tirupati, AndhraPradesh Phone: (578) 641-4770 | Fax:
                  (264) 864-8562
                </p>
              </div>
            </div>

            <div className="footer-section contact-info">
              <h3>Get In Touch</h3>
              <ul>
                <li>
                  <svg
                    width="20"
                    height="-10"
                    fill="#f4e8c1"
                    viewBox="0 0 24 24"
                  >
                    <path d="M6.62,10.79a15.07,15.07,0,0,0,6.59,6.59l2.2-2.2a1,1,0,0,1,1.05-.24,11.36,11.36,0,0,0,3.56.57,1,1,0,0,1,1,1v3.62a1,1,0,0,1-1,1A18,18,0,0,1,2,5a1,1,0,0,1,1-1H6.66a1,1,0,0,1,1,1,11.36,11.36,0,0,0,.57,3.56,1,1,0,0,1-.24,1.05Z" />
                  </svg>
                  +263 776 8407 489
                </li>
                <li>
                  <svg
                    width="20"
                    height="20"
                    fill="#f4e8c1"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22 4H2c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h20c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 2v.01L12 11 2 6.01V6l10 5 10-5zm0 14H2v-12l10 5 10-5v12z" />
                  </svg>
                  info@simuwild.com
                </li>
              </ul>
            </div>
          </div>
          <div
            className="footer-section"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              flex: 1,
            }}
          >
            <h1 className="Footer-Simu">SimuWild</h1>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Dashboard;
