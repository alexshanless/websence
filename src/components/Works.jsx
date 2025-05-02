// src/components/Works.jsx - Phase 1: Basic Background Slider
import React, { useState } from 'react'; // Removed useState, useEffect for now

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';

import {
  EffectFade,
  Navigation,
  Controller,
  Mousewheel,
  Keyboard,
  Thumbs,
} from 'swiper/modules';

import styles from './Works.module.css';

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

function numberWithZero(num) {
  return num < 10 ? '0' + num : num.toString();
}

function Works() {
  const [bgSwiper, setBgSwiper] = useState(null);
  const [textSwiper, setTextSwiper] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  return (
    <section id='works' className={styles.worksContainer}>
      {/* --- Background Slider --- */}
      <Swiper
        modules={[EffectFade]}
        onSwiper={setBgSwiper}
        slidesPerView={1}
        effect='fade'
        allowTouchMove={false}
        className={styles.bgSwiper}
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
      </Swiper>

      {
        <Swiper
          modules={[Controller, Mousewheel, Keyboard, Thumbs, Navigation]}
          onSwiper={setTextSwiper}
          thumbs={{ swiper: bgSwiper && !bgSwiper.destroyed ? bgSwiper : null }}
          slidesPerView='auto'
          speed={600}
          slideToClickedSlide={true}
          centeredSlides={true}
          mousewheel={true}
          keyboard={true}
          className={styles.textSwiper}
          slideActiveClass={styles.isActive}
          onSlideChange={swiper => {
            console.log('Text Swiper activeIndex:', swiper.activeIndex);
            setCurrentIndex(swiper.activeIndex);
          }}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
        >
          {projects.map(project => (
            <SwiperSlide
              key={`text-${project.id}`}
              className={styles.textSlide}
            >
              <h2 className={styles.slideTitleHeading}>{project.title}</h2>
            </SwiperSlide>
          ))}
          <div className='swiper-button-prev'></div>
          <div className='swiper-button-next'></div>
        </Swiper>
      }

      {/* --- Controls / Slide Numbers --- */}
      <div className={styles.swiperControls}>
        <div className={styles.slideNumber}>
          <span className={styles.swiperNumberCurrent}>
            {numberWithZero(currentIndex + 1)}
          </span>
          /
          <span className={styles.swiperNumberTotal}>
            {numberWithZero(projects.length)}
          </span>
        </div>
      </div>
    </section>
  );
}

export default Works;
