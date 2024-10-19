import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { useNavigate } from "react-router-dom"; 
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./Watchlist.css";

const Watchlist = () => {
  const navigate = useNavigate(); 
  const images = [
    {
      src: "/assam_roofed_turtle.jpg",
      alt: "Assam Roofed Turtle",
      title: "ENDANGERED",
      link: "/endangered",
    },
    {
      src: "/Clouded_leopard.jpg",
      alt: "Clouded Leopard",
      title: "CRITICALLY ENDANGERED",
      link: "/criticallyEndangered",
    },
    {
      src: "/elephant.jpg",
      alt: "Indian Elephant",
      title: "NEAR THREATENED",
      link: "/nearThreatened",
    },
    {
      src: "/Great-Indian-one-horned-rhinoceros-India.jpg",
      alt: "Indian Rhinoceros",
      title: "VULNERABLE",
      link: "/vulnerable",
    },
  ];

  const handleExploreClick = (link) => {
    navigate(link); 
  };
  return (
    <Swiper
      modules={[Navigation, Pagination]}
      spaceBetween={-100}
      slidesPerView={3}
      centeredSlides={true}
      loop={true}
      navigation={true}
      pagination={{ clickable: true }}
      grabCursor={true}
      breakpoints={{
        768: {
          slidesPerView: 1.5,
        },
      }}
    >
      {images.map((image, index) => (
       
        <SwiperSlide key={index} className="swiper-slide-custom">
          <div className="card">
            <img src={image.src} alt={image.alt} />
            <div className="text">{image.title}</div>
            <button
              className="explore-button"
              onClick={() => handleExploreClick(image.link)} 
            >
              Explore
            </button>
          </div>
        </SwiperSlide>
      
      ))}
    </Swiper>
  );
};

export default Watchlist;
