// // import React from 'react';
// // import { Swiper, SwiperSlide } from 'swiper/react';
// // import { Navigation, Pagination } from 'swiper/modules';
// // import 'swiper/css';
// // import 'swiper/css/navigation';
// // import 'swiper/css/pagination';
// // import './Watchlist.css';

// // const Watchlist = () => {
// //   const images = [
// //     { src: '/assam_roofed_turtle.jpg', alt: 'Assam Roofed Turtle', title: 'Assam Roofed Turtle' },
// //     { src: '/Clouded_leopard.jpg', alt: 'Clouded Leopard', title: 'Clouded Leopard' },
// //     { src: '/Elephant.jpg', alt: 'Indian Elephant', title: 'Indian Elephant' },
// //     { src: '/Great-Indian-one-horned-rhinoceros-India.jpg', alt: 'Indian Rhinoceros', title: 'Indian Rhinoceros' },
// //   ];

// //   return (
// //     <Swiper
// //       modules={[Navigation, Pagination]}
// //       spaceBetween={-100} // Negative space to create overlapping effect
// //       slidesPerView={3} // Show 3 slides at a time
// //       centeredSlides={true}
// //       loop={true}
// //       navigation={true}
// //       pagination={{ clickable: true }}
// //       grabCursor={true}
// //       breakpoints={{
// //         768: {
// //           slidesPerView: 1.5, // Adjust for mobile view
// //         },
// //       }}
// //     >
// //       {images.map((image, index) => (
// //         <SwiperSlide key={index} className="swiper-slide-custom">
// //           <div className="card">
// //             <img src={image.src} alt={image.alt} />
// //             <div className="overlay">
// //               <div className="text">{image.title}</div>
// //               <button className="explore-button">Explore</button> {/* Explore button added here */}
// //             </div>
// //           </div>
// //         </SwiperSlide>
// //       ))}
// //     </Swiper>
// //   );
// // };

// // export default Watchlist;
// import React from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation, Pagination } from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import './Watchlist.css';

// const Watchlist = () => {
//   const images = [
//     { src: '/assam_roofed_turtle.jpg', alt: 'Assam Roofed Turtle', title: 'Assam Roofed Turtle' },
//     { src: '/Clouded_leopard.jpg', alt: 'Clouded Leopard', title: 'Clouded Leopard' },
//     { src: '/Elephant.jpg', alt: 'Indian Elephant', title: 'Indian Elephant' },
//     { src: '/Great-Indian-one-horned-rhinoceros-India.jpg', alt: 'Indian Rhinoceros', title: 'Indian Rhinoceros' },
//   ];

//   return (
//     <Swiper
//       modules={[Navigation, Pagination]}
//       spaceBetween={-100} // Negative space to create overlapping effect
//       slidesPerView={3} // Show 3 slides at a time
//       centeredSlides={true}
//       loop={true}
//       navigation={true}
//       pagination={{ clickable: true }}
//       grabCursor={true}
//       breakpoints={{
//         768: {
//           slidesPerView: 1.5, // Adjust for mobile view
//         },
//       }}
//     >
//       {images.map((image, index) => (
//         <SwiperSlide key={index} className="swiper-slide-custom">
//           <div className="card">
//             <img src={image.src} alt={image.alt} />
//             <div className="overlay">
//               <div className="text">{image.title}</div>
//               <button className="explore-button">Explore</button> {/* Explore button added here */}
//             </div>
//           </div>
//         </SwiperSlide>
//       ))}
//     </Swiper>
//   );
// };

// export default Watchlist;
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './Watchlist.css';

const Watchlist = () => {
  const images = [
    { src: '/assam_roofed_turtle.jpg', alt: 'Assam Roofed Turtle', title: 'ENDANGERED' },
    { src: '/Clouded_leopard.jpg', alt: 'Clouded Leopard', title: 'CRITICALLY ENDANGERED' },
    { src: '/Elephant.jpg', alt: 'Indian Elephant', title: 'THREATENED' },
    { src: '/Great-Indian-one-horned-rhinoceros-India.jpg', alt: 'Indian Rhinoceros', title: 'VULNERABLE' },
  ];

  return (
    <Swiper
      modules={[Navigation, Pagination]}
      spaceBetween={-100} // Negative space to create overlapping effect
      slidesPerView={3} // Show 3 slides at a time
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
        <SwiperSlide key={index} className="swiper-slide-custom">
          <div className="card">
            <img src={image.src} alt={image.alt} />
            <div className="text">{image.title}</div>
            <button className="explore-button">Explore</button> {/* Explore button added here */}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Watchlist;
