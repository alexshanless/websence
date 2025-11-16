import './App.css';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import Works from './components/Works';
import Services from './components/Services';
import About from './components/About';
import AllProjects from './components/AllProjects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import React, { useState, useRef, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

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

const HomePage = () => {
	const [isHeroSticky, setIsHeroSticky] = useState(true);
	const worksEndRef = useRef(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				setIsHeroSticky(entry.isIntersecting);
			},
			{
				root: null,
				rootMargin: '0px',
				threshold: 0,
			}
		);

		const currentRef = worksEndRef.current;
		if (currentRef) {
			observer.observe(currentRef);
		}

		return () => {
			if (currentRef) {
				observer.unobserve(currentRef);
			}
			observer.disconnect();
		};
	}, []);

	return (
		<>
			<main>
				<SiteFrame />
				<Hero isSticky={isHeroSticky} />
				<Works />
				<div
					ref={worksEndRef}
					style={{ height: '1px', pointerEvents: 'none' }}
				></div>
			</main>
			<Services />
			<About />
			<AllProjects />
			<Contact />
		</>
	);
};

function App() {
	return (
		<Router>
			<Navbar />
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/privacy-policy" element={<PrivacyPolicy />} />
				<Route path="/terms-of-service" element={<TermsOfService />} />
			</Routes>
			<Footer />
		</Router>
	);
}

export default App;
