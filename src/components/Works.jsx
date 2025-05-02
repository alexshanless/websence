// src/components/Works.jsx - Phase 1: Basic Background Slider
import React from 'react'; // Removed useState, useEffect for now

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade'; // For background fade
import 'swiper/css/navigation'; // For testing buttons

// Import specific modules you need
import { EffectFade, Navigation } from 'swiper/modules';

import styles from './Works.module.css'; // Your component styles

// Your project data
const projects = [
  {
    id: 1,
    title: 'Project Alpha',
    bgImage:
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
  },
  {
    id: 2,
    title: 'Beta Creations',
    bgImage:
      'https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
  },
  {
    id: 3,
    title: 'Gamma Solutions',
    bgImage:
      'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
  },
  {
    id: 4,
    title: 'Delta Innovations',
    bgImage:
      'https://images.unsplash.com/photo-1433086966358-54859d0ed716?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80',
  },
];

function Works() {
  return (
    <section id='works' className={styles.worksContainer}>
      {/* --- Basic Background Slider --- */}
      <Swiper
        // Pass only necessary modules
        modules={[EffectFade, Navigation]}
        // onSwiper={} // Not needed yet
        slidesPerView={1}
        effect='fade'
        allowTouchMove={true} // Allow touch interaction for testing
        className={styles.bgSwiper} // Reuse bgSwiper class for positioning/size
        navigation={{
          // Use built-in Swiper buttons for now
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
      >
        {projects.map(project => (
          <SwiperSlide key={`bg-${project.id}`} className={styles.bgSlide}>
            <img
              src={project.bgImage}
              alt={`${project.title} Background`}
              className={styles.bgImage}
            />
          </SwiperSlide>
        ))}

        {/* Add default Swiper navigation buttons (will be styled by swiper/css/navigation) */}
        <div className='swiper-button-prev'></div>
        <div className='swiper-button-next'></div>
      </Swiper>

      {/* <div style={{position: 'absolute', zIndex: 2, top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'white', fontSize: '2rem'}}>Text Placeholder</div> */}
      {/* <div style={{position: 'absolute', zIndex: 3, bottom: '40px', right: '40px', width: '300px', height: '100px', background:'rgba(255,0,0,0.3)'}}>Thumbs Placeholder</div> */}
    </section>
  );
}

export default Works;
