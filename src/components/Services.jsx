import React from 'react';
import styles from './Services.module.css';

const servicesData = [
  {
    name: 'Web Design',
    subServices: ['UI Design', 'UX Strategy', 'Brand Identity', 'Prototyping'],
  },
  {
    name: 'Web Development',
    subServices: ['Webflow', 'React.js', 'SEO', 'Performance Opt.'],
  },
  {
    name: 'Project Management',
    subServices: [
      'Client Communication',
      'Timeline Planning',
      'Quality Assurance',
    ],
  },
];

function Services() {
  return <div>Services</div>;
}

export default Services;
