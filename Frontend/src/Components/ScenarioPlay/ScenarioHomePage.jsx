import React, { useState } from "react";
import "./ScenarioHomePage.css";

const ScenarioHomePage = () => {
  const [backgroundImage, setBackgroundImage] = useState(
    "https://hatibondhu.org/assets/img/hec.jpg" // Default background image
  );

  const changeBackground = (image) => {
    setBackgroundImage(image);
  };

  return (
    <div className="app">
      <div
        className="background"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      ></div>
      <div className="image-gallery">
        <img
          src="https://wildlifesos.org/wp-content/uploads/2020/03/home-leopard-july.jpg"
          alt="Image 6"
          className="thumbnail"
          onMouseEnter={() =>
            changeBackground(
              "https://wildlifesos.org/wp-content/uploads/2020/03/home-leopard-july.jpg"
            )
          }
          onClick={() =>
            changeBackground(
              "https://wildlifesos.org/wp-content/uploads/2020/03/home-leopard-july.jpg"
            )
          }
        />
        <img
          src="https://hatibondhu.org/assets/img/hec.jpg"
          alt="Image 1"
          className="thumbnail"
          onMouseEnter={() =>
            changeBackground("https://hatibondhu.org/assets/img/hec.jpg")
          }
          onClick={() =>
            changeBackground("https://hatibondhu.org/assets/img/hec.jpg")
          }
        />
        <img
          src="https://static2.tripoto.com/media/filter/tst/img/1942819/TripDocument/1588420605_capture.png"
          alt="Image 2"
          className="thumbnail"
          onMouseEnter={() =>
            changeBackground(
              "https://static2.tripoto.com/media/filter/tst/img/1942819/TripDocument/1588420605_capture.png"
            )
          }
          onClick={() =>
            changeBackground(
              "https://static2.tripoto.com/media/filter/tst/img/1942819/TripDocument/1588420605_capture.png"
            )
          }
        />
        <img
          src="https://bl-i.thgim.com/public/specials/india-interior/article23459566.ece/alternates/LANDSCAPE_1200/BL07IndiaIntlead1"
          alt="Image 3"
          className="thumbnail"
          onMouseEnter={() =>
            changeBackground(
              "https://bl-i.thgim.com/public/specials/india-interior/article23459566.ece/alternates/LANDSCAPE_1200/BL07IndiaIntlead1"
            )
          }
          onClick={() =>
            changeBackground(
              "https://bl-i.thgim.com/public/specials/india-interior/article23459566.ece/alternates/LANDSCAPE_1200/BL07IndiaIntlead1"
            )
          }
        />
        <img
          src="https://rhinos.org/wp-content/uploads/2024/07/1720542345016.jpeg"
          alt="Image 4"
          className="thumbnail"
          onMouseEnter={() =>
            changeBackground(
              "https://rhinos.org/wp-content/uploads/2024/07/1720542345016.jpeg"
            )
          }
          onClick={() =>
            changeBackground(
              "https://rhinos.org/wp-content/uploads/2024/07/1720542345016.jpeg"
            )
          }
        />
        <img
          src="https://imgs.mongabay.com/wp-content/uploads/sites/20/2017/10/06125834/Sundarban-tiger.jpg"
          alt="Image 5"
          className="thumbnail"
          onMouseEnter={() =>
            changeBackground(
              "https://imgs.mongabay.com/wp-content/uploads/sites/20/2017/10/06125834/Sundarban-tiger.jpg"
            )
          }
          onClick={() =>
            changeBackground(
              "https://imgs.mongabay.com/wp-content/uploads/sites/20/2017/10/06125834/Sundarban-tiger.jpg"
            )
          }
        />
      </div>
    </div>
  );
};

export default ScenarioHomePage;
