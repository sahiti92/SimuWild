import React, { useState, useEffect } from 'react';
import './slideshow.css';
import { Link } from "react-router-dom";

const Slideshow = () => {
  const slides = [
    {
      image: '/img1 (2).jpg',
      heading: 'PLAY INTERACTIVE SCENARIOS',
      subheading: 'WILDLIFE CONSERVATION',
      summary: 'Engage with various human-animal scenarios in an interactive setting...'
    },
    {
      image: '/img2 (2).jpg',
      heading: 'WATCHLIST',
      subheading: 'IUCN REDLIST',
      summary: 'Keep track of the most rare and endangered species...'
    },
    {
      image: '/img3 (2).jpg',
      heading: 'INTERACTIVE 2D MAP',
      subheading: 'INDIA',
      summary: 'Explore India through our interactive 2D map feature...'
    },
    {
      image: '/img4 (2).jpg',
      heading: 'DISCOVER MORE',
      subheading: 'CITY',
      summary: 'Find out more about various city adventures and experiences...'
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-slide every 4 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 3000);

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, [slides.length]);

  return (
    <div className="slideshow">
      <div className="slide-container">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`slide ${index === activeIndex ? 'active' : ''}`}
            style={{ display: index === activeIndex ? 'block' : 'none' }}
          >
            <img src={slide.image} alt={slide.subheading} />
            <div className="text-content">
              <div className="heading">{slide.heading}</div>
              <div className="subheading">{slide.subheading}</div>
              <div className="description">{slide.summary}</div>
              <div className="action-buttons">
              <Link to="/signup">
      <button>GET STARTED</button>
    </Link>
                
         
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="progress-bar"></div>
    </div>
  );
};

export default Slideshow;
