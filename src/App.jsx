import './App.css';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import Works from './components/Works';
import React, { useState, useRef, useEffect } from 'react';

const PlaceholderSection = ({ id, title, minHeight = '70vh' }) => (
  <section
    id={id}
    style={{
      minHeight: minHeight,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderTop: '1px solid #eee',
      padding: '40px 20px',
      backgroundColor: id === 'about' ? '#f9f9f9' : '#fff',
    }}
  >
    <h2>{title} Section</h2>
  </section>
);

const SiteFrame = () => (
  <>
    <div className='frame frame-top'></div>
    <div className='frame frame-bottom'></div>
    <div className='frame frame-left'></div>
    <div className='frame frame-right'></div>
  </>
);

function App() {
  const [isHeroSticky, setIsHeroSticky] = useState(true);

  const worksEndRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // isIntersecting is true if the trigger element is visible
        // We want the Hero to be sticky WHILE the trigger IS visible
        // (meaning Works hasn't scrolled completely off screen yet)
        console.log(
          'Observer triggered, isIntersecting:',
          entry.isIntersecting
        );
        setIsHeroSticky(entry.isIntersecting);
      },
      {
        root: null, // Observe relative to the viewport
        rootMargin: '0px', // No margin
        threshold: 0, // Trigger as soon as 1px is visible/invisible
      }
    );

    // Start observing the trigger element if it exists
    const currentRef = worksEndRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    // Cleanup: disconnect observer when component unmounts
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <Hero isSticky={isHeroSticky} />
        <Works />
        <div
          ref={worksEndRef}
          style={{ height: '1px', pointerEvents: 'none' }}
        ></div>
      </main>

      <PlaceholderSection id='services' title='Services' />
      <PlaceholderSection id='about' title='About' />
    </>
  );
}

export default App;
