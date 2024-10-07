import React from "react";
import "./Scenario.css"; // Make sure this CSS file is correctly linked

const Scenario6 = () => {
  return (
    <div className="scenario-container">
      <div className="image-container">
        <img
          className="scenario-image"
          src="https://media.istockphoto.com/id/2162689873/photo/indian-lion-in-close-up-view-at-bannerghatta-forest-at-bangalore-india.jpg?s=612x612&w=0&k=20&c=mp0EgtZALcfsQP6Ltvl029Ui873ppBtalmzsBHHLARQ="
          alt="Asiatic lions in Gir National Park"
        />
        <div className="overlay">
          <h1 className="scenario-title">
            Translocation of Asiatic Lions from Gir National Park
          </h1>
          <p className="scenario-description">
            Gir National Park in Gujarat is the last remaining habitat of the
            Asiatic lion, a critically endangered species. Due to concerns about
            the species' vulnerability to disease outbreaks or natural disasters
            in a single location, conservationists have recommended the
            translocation of some lions to a second habitat. However, the
            translocation plan has faced resistance due to political,
            ecological, and social factors. In 2018, the death of over 20 lions
            due to a canine distemper virus outbreak further emphasized the need
            for creating a second, secure habitat. The user’s task is to find a
            balance between translocation and protecting the lion population in
            its existing habitat.
          </p>
          <button className="small-play-button">Play</button>
        </div>
      </div>
    </div>
  );
};

export default Scenario6;
