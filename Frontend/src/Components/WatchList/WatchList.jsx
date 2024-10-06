import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './Watchlist.css';

const Watchlist = () => {
  const images = [
    { src: '/assam_roofed_turtle.jpg', alt: 'Assam Roofed Turtle', title: 'Assam Roofed Turtle' },
    { src: '/Clouded_leopard.jpg', alt: 'Clouded Leopard', title: 'Clouded Leopard' },
    { src: '/Elephant.jpg', alt: 'Indian Elephant', title: 'Indian Elephant' },
    { src: '/Great-Indian-one-horned-rhinoceros-India.jpg', alt: 'Indian Rhinoceros', title: 'Indian Rhinoceros' },
  ];

  return (
    <Swiper
      modules={[Navigation, Pagination]}
      spaceBetween={-30} // Negative space to make slides overlap
      slidesPerView={2.2} // Show part of the next and previous slides
      centeredSlides={true}
      loop={true}
      navigation={true}
      pagination={{ clickable: true }}
      grabCursor={true}
      breakpoints={{
        768: {
          slidesPerView: 1.5, // Adjust for mobile view
        },
      }}
    >
      {images.map((image, index) => (
        <SwiperSlide key={index}>
          <div className="card">
            <img src={image.src} alt={image.alt} />
            <div className="overlay">
              <div className="text">{image.title}</div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Watchlist;
