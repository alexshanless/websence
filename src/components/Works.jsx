import { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

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
import { featuredProjects, getProjectMedia } from '../data/projects';
import { webpSrcSet } from '../lib/responsiveImage';

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
      textSwiper.controller.control = thumbsSwiper;
    }
    if (
      thumbsSwiper?.controller &&
      textSwiper &&
      !thumbsSwiper.controller.control
    ) {
      thumbsSwiper.controller.control = textSwiper;
    }
  }, [textSwiper, thumbsSwiper]);

  useEffect(() => {
    if (!textSwiper) {
      return undefined;
    }

    const recenter = () => {
      textSwiper.update();
      textSwiper.slideTo(textSwiper.activeIndex, 0);
    };

    recenter();

    if (document.fonts?.ready) {
      document.fonts.ready.then(recenter);
    }

    window.addEventListener('resize', recenter);
    return () => window.removeEventListener('resize', recenter);
  }, [textSwiper]);

  const touchStart = useRef(null);

  const onTouchStart = (event) => {
    const t = event.changedTouches[0];
    touchStart.current = { x: t.clientX, y: t.clientY };
  };

  const onTouchEnd = (event) => {
    if (!touchStart.current || !textSwiper) {
      return;
    }
    const t = event.changedTouches[0];
    const dx = t.clientX - touchStart.current.x;
    const dy = t.clientY - touchStart.current.y;
    touchStart.current = null;
    // Only act on a clearly horizontal drag, so a vertical scroll that wanders
    // sideways does not change slide.
    if (Math.abs(dx) < 45 || Math.abs(dx) < Math.abs(dy) * 1.5) {
      return;
    }
    if (dx < 0) {
      textSwiper.slideNext();
    } else {
      textSwiper.slidePrev();
    }
  };

  return (
    <section
      id="works"
      className={styles.worksContainer}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <Swiper
        modules={[EffectFade]}
        onSwiper={setBgSwiper}
        slidesPerView={1}
        effect="fade"
        allowTouchMove={false}
        className={styles.bgSwiper}
      >
        {featuredProjects.map((project, index) => (
          <SwiperSlide key={`bg-${project.id}`} className={styles.bgSlide}>
            <img
              src={getProjectMedia(project)}
              srcSet={webpSrcSet(getProjectMedia(project)) || undefined}
              sizes="100vw"
              alt={`${project.name} website shown on a laptop`}
              className={styles.bgImage}
              width={2000}
              height={1333}
              loading={index === 0 ? 'eager' : 'lazy'}
              fetchPriority={index === 0 ? 'high' : 'auto'}
              decoding="async"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        modules={[Controller, Mousewheel, Keyboard, Thumbs, Navigation]}
        onSwiper={setTextSwiper}
        thumbs={{ swiper: bgSwiper && !bgSwiper.destroyed ? bgSwiper : null }}
        slidesPerView="auto"
        speed={600}
        slideToClickedSlide={true}
        centeredSlides={true}
        observer={true}
        observeParents={true}
        mousewheel={true}
        keyboard={true}
        className={styles.textSwiper}
        onTransitionEnd={(swiper) => {
          swiper.update();
        }}
        onSlideChange={(swiper) => {
          setCurrentIndex(swiper.activeIndex);
        }}
        navigation={{
          nextEl: `.${styles.swiperNext}`,
          prevEl: `.${styles.swiperPrev}`,
        }}
      >
        {featuredProjects.map((project) => (
          <SwiperSlide key={`text-${project.id}`} className={styles.textSlide}>
            <h2 className={styles.slideTitleHeading}>{project.featuredTitle}</h2>
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        modules={[Controller, Thumbs]}
        onSwiper={setThumbsSwiper}
        watchSlidesProgress={true}
        slidesPerView={3}
        spaceBetween={10}
        centeredSlides={true}
        slideToClickedSlide={true}
        className={styles.thumbsSwiper}
        slideActiveClass={styles.isActive}
      >
        {featuredProjects.map((project) => (
          <SwiperSlide key={`thumb-${project.id}`} className={styles.thumbSlide}>
            <img
              src={getProjectMedia(project)}
              srcSet={webpSrcSet(getProjectMedia(project)) || undefined}
              sizes="200px"
              alt=""
              aria-hidden="true"
              className={styles.thumbImage}
              width={2000}
              height={1333}
              loading="lazy"
              decoding="async"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className={styles.swiperControls}>
        <div className={styles.slideNumber}>
          <span className={styles.swiperNumberCurrent}>
            {numberWithZero(currentIndex + 1)}
          </span>
          /
          <span className={styles.swiperNumberTotal}>
            {numberWithZero(featuredProjects.length)}
          </span>
        </div>
        <div className={styles.navButtonsContainer}>
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
