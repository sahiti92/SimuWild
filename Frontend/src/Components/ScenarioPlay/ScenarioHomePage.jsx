import React, { useState } from "react";
import "./ScenarioHomePage.css";
import { useNavigate } from "react-router-dom";
const ScenarioHomePage = () => {
  const [backgroundImage, setBackgroundImage] = useState(
    "https://hatibondhu.org/assets/img/hec.jpg" // Default background image
  );
  const [heading, setHeading] = useState("Human-Elephant Conflict"); // Default heading
  const [description, setDescription] = useState(
    "Human-elephant conflict in India often arises due to habitat loss." // Default description
  );
  const navigate = useNavigate();
  const [pageLink, setPageLink] = useState("/scenario1");
  const [headingKey, setHeadingKey] = useState(0); // Key to reset animation

  const changeBackground = (image, newHeading, newDescription, newPageLink) => {
    setBackgroundImage(image);
    setHeading(newHeading);
    setDescription(newDescription);
    setHeadingKey((prevKey) => prevKey + 1); // Update the key to reset animation
    setPageLink(newPageLink);
  };
  const goToPage = () => {
    navigate(pageLink);
  };
  return (
    <div className="app">
      {/* Background with dynamically changing image */}
      <div
        className="background"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      ></div>

      {/* Heading container with unique key to reset typewriter effect */}
      <div key={headingKey} className="heading-container">
        {heading}
        <p className="subscript">{description}</p>
      </div>
      <button className="play-button" onClick={goToPage}>
        Play to Know More
      </button>
      {/* Image Gallery */}
      <div className="image-gallery">
        <img
          src="https://wildlifesos.org/wp-content/uploads/2020/03/home-leopard-july.jpg"
          alt="Image 6"
          className="thumbnail"
          onMouseEnter={() =>
            changeBackground(
              "https://wildlifesos.org/wp-content/uploads/2020/03/home-leopard-july.jpg",
              "Leopard in India",
              "dfghjklfyguhijok",
              "/scenario3"
            )
          }
          onClick={() =>
            changeBackground(
              "https://wildlifesos.org/wp-content/uploads/2020/03/home-leopard-july.jpg",
              "Leopard in India",
              "sdfghjkl;'poijhgfcvbn",
              "/scenario3"
            )
          }
        />
        <img
          src="https://hatibondhu.org/assets/img/hec.jpg"
          alt="Image 1"
          className="thumbnail"
          onMouseEnter={() =>
            changeBackground(
              "https://hatibondhu.org/assets/img/hec.jpg",
              "Human-Elephant Conflict",
              "sdfghjkl;lkjhgfdfghn",
              "./scenario5"
            )
          }
          onClick={() =>
            changeBackground(
              "https://hatibondhu.org/assets/img/hec.jpg",
              "Human-Elephant Conflict",
              "sdfghjkl;oiuytrfdcvbnmnbvcxdtfyguhijlnbmn",
              "./scenario4"
            )
          }
        />
        <img
          src="https://static2.tripoto.com/media/filter/tst/img/1942819/TripDocument/1588420605_capture.png"
          alt="Image 2"
          className="thumbnail"
          onMouseEnter={() =>
            changeBackground(
              "https://static2.tripoto.com/media/filter/tst/img/1942819/TripDocument/1588420605_capture.png",
              "Scenic Landscape",
              "ytr45wsdxcg niuytrsdfghjkmnbjvhfyguhiljknb",
              "./scenario4"
            )
          }
          onClick={() =>
            changeBackground(
              "https://static2.tripoto.com/media/filter/tst/img/1942819/TripDocument/1588420605_capture.png",
              "Scenic Landscape",
              "098765resxcvbnm,./'poiuytrdc m,kjhgvbnm,"
            )
          }
        />
        <img
          src="https://bl-i.thgim.com/public/specials/india-interior/article23459566.ece/alternates/LANDSCAPE_1200/BL07IndiaIntlead1"
          alt="Image 3"
          className="thumbnail"
          onMouseEnter={() =>
            changeBackground(
              "https://bl-i.thgim.com/public/specials/india-interior/article23459566.ece/alternates/LANDSCAPE_1200/BL07IndiaIntlead1",
              "Interior India",
              "-098765eszxcvbnm,liuytfdcvbnm,.",
              "./scenario3"
            )
          }
          onClick={() =>
            changeBackground(
              "https://bl-i.thgim.com/public/specials/india-interior/article23459566.ece/alternates/LANDSCAPE_1200/BL07IndiaIntlead1",
              "Interior India",
              "2345678op;lkjhgfdcvbnm,",
              "./scenario3"
            )
          }
        />
        <img
          src="https://rhinos.org/wp-content/uploads/2024/07/1720542345016.jpeg"
          alt="Image 4"
          className="thumbnail"
          onMouseEnter={() =>
            changeBackground(
              "https://rhinos.org/wp-content/uploads/2024/07/1720542345016.jpeg",
              "Rhino Conservation",
              "34567890p;lkjhgfdertyuikjhgf",
              "./scenario2"
            )
          }
          onClick={() =>
            changeBackground(
              "https://rhinos.org/wp-content/uploads/2024/07/1720542345016.jpeg",
              "Rhino Conservation",
              "45678oplkjhgfdertyuikjhgf",
              "./Scenario2"
            )
          }
        />
        <img
          src="https://imgs.mongabay.com/wp-content/uploads/sites/20/2017/10/06125834/Sundarban-tiger.jpg"
          alt="Image 5"
          className="thumbnail"
          onMouseEnter={() =>
            changeBackground(
              "https://imgs.mongabay.com/wp-content/uploads/sites/20/2017/10/06125834/Sundarban-tiger.jpg",
              "Sundarban Tiger",
              "yuiop;lkjhgfdvbnm",
              "./scenario1"
            )
          }
          onClick={() =>
            changeBackground(
              "https://imgs.mongabay.com/wp-content/uploads/sites/20/2017/10/06125834/Sundarban-tiger.jpg",
              "Sundarban Tiger",
              "345678op;lmnbvcxzsdfghjk",
              "./Scenario1"
            )
          }
        />
      </div>
    </div>
  );
};

export default ScenarioHomePage;
