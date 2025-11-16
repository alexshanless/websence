// src/components/Works.jsx - Phase 1: Basic Background Slider
import React, { useState, useEffect } from 'react';

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
    title: 'JNA',
    bgImage: '/assets/screenshots/JNA-slide.jpg',
  },
  {
    id: 2,
    title: 'EMBR',
    bgImage: '/assets/screenshots/embr-slider.jpg',
  },
  {
    id: 3,
    title: 'TXP',
    bgImage: '/assets/screenshots/txp-slide.jpg',
  },
  {
    id: 4,
    title: 'CS MEDIA',
    bgImage: '/assets/screenshots/c.smedia-slide.jpg',
  },
];

function numberWithZero(num) {
  return num < 10 ? '0' + num : num.toString();
}

function Works() {
  const [bgSwiper, setBgSwiper] = useState(null);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [textSwiper, setTextSwiper] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (
      textSwiper?.controller &&
      thumbsSwiper &&
      !textSwiper.controller.control
    ) {
      console.log('Connecting text -> thumbs');
      textSwiper.controller.control = thumbsSwiper;
    }
    if (
      thumbsSwiper?.controller &&
      textSwiper &&
      !thumbsSwiper.controller.control
    ) {
      console.log('Connecting thumbs -> text');
      thumbsSwiper.controller.control = textSwiper;
    }
    // Cleanup refs on component unmount maybe? Optional advanced.
  }, [textSwiper, thumbsSwiper]);
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

      {/* --- Titles Slider --- */}
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
        onTransitionEnd={swiper => {
          console.log('Transition Ended. Forcing update.');
          swiper.update();
        }}
        onSlideChange={swiper => {
          setCurrentIndex(swiper.activeIndex);
        }}
        navigation={{
          nextEl: `.${styles.swiperNext}`,
          prevEl: `.${styles.swiperPrev}`,
        }}
      >
        {projects.map(project => (
          <SwiperSlide key={`text-${project.id}`} className={styles.textSlide}>
            <h2 className={styles.slideTitleHeading}>{project.title}</h2>
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        modules={[Controller, Thumbs]}
        onSwiper={setThumbsSwiper}
        // controller={textSwiper ? { control: textSwiper } : undefined} // Comment out if causing issues, rely on useEffect
        watchSlidesProgress={true}
        slidesPerView={3}
        spaceBetween={10}
        centeredSlides={true}
        slideToClickedSlide={true}
        className={styles.thumbsSwiper}
        slideActiveClass={styles.isActive}
      >
        {projects.map(project => (
          <SwiperSlide
            key={`thumb-${project.id}`}
            className={styles.thumbSlide}
          >
            <img
              src={project.bgImage}
              alt={`${project.title} Thumbnail`}
              className={styles.thumbImage}
            />
          </SwiperSlide>
        ))}
      </Swiper>

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
        <div className={styles.navButtonsContainer}>
          {/* Add the specific classes for Swiper to find */}
          <button className={`${styles.swiperPrev} ${styles.navButton}`}>
            Prev
          </button>
          <button className={`${styles.swiperNext} ${styles.navButton}`}>
            Next
          </button>
        </div>
      </div>
    </section>
  );
}

export default Works;
