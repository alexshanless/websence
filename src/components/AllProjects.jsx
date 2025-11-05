import React, { useState } from 'react';
import styles from './AllProjects.module.css';

// Sample project data - replace with real data later
const projectsData = [
  {
    id: 1,
    name: 'Modern E-Commerce Store',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    link: '#',
    filters: ['Webflow', 'Design', 'End-to-End'],
  },
  {
    id: 2,
    name: 'SaaS Landing Page',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    link: '#',
    filters: ['React.js', 'SEO', 'Design'],
  },
  {
    id: 3,
    name: 'Fashion Brand Website',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80',
    link: '#',
    filters: ['Shopify', 'End-to-End'],
  },
  {
    id: 4,
    name: 'Portfolio Website',
    image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80',
    link: '#',
    filters: ['Webflow', 'Design'],
  },
  {
    id: 5,
    name: 'Tech Startup Site',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80',
    link: '#',
    filters: ['React.js', 'SEO', 'End-to-End'],
  },
  {
    id: 6,
    name: 'Restaurant Website',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
    link: '#',
    filters: ['Webflow', 'Design'],
  },
  {
    id: 7,
    name: 'Online Store Redesign',
    image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&q=80',
    link: '#',
    filters: ['Shopify', 'Design', 'SEO'],
  },
  {
    id: 8,
    name: 'Corporate Website',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
    link: '#',
    filters: ['React.js', 'End-to-End'],
  },
  {
    id: 9,
    name: 'Fitness App Landing',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80',
    link: '#',
    filters: ['Webflow', 'SEO', 'Design'],
  },
  {
    id: 10,
    name: 'Beauty Brand Site',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&q=80',
    link: '#',
    filters: ['Shopify', 'End-to-End'],
  },
  {
    id: 11,
    name: 'Agency Portfolio',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
    link: '#',
    filters: ['React.js', 'Design'],
  },
  {
    id: 12,
    name: 'Consulting Firm Website',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80',
    link: '#',
    filters: ['Webflow', 'SEO', 'End-to-End'],
  },
];

const filterOptions = ['Webflow', 'Shopify', 'React.js', 'Design', 'SEO', 'End-to-End'];

const AllProjects = () => {
  const [activeFilters, setActiveFilters] = useState([]);

  const toggleFilter = (filter) => {
    if (activeFilters.includes(filter)) {
      setActiveFilters(activeFilters.filter(f => f !== filter));
    } else {
      setActiveFilters([...activeFilters, filter]);
    }
  };

  const filteredProjects = activeFilters.length === 0
    ? projectsData
    : projectsData.filter(project =>
        activeFilters.some(filter => project.filters.includes(filter))
      );

  const displayedProjects = filteredProjects.slice(0, 12);

  return (
    <section id='all-projects' className={styles.allProjects}>
      <div className={styles.backgroundText}>PROJECTS</div>

      <div className={styles.container}>
        <div className={styles.filterSection}>
          <h3 className={styles.filterLabel}>Filter by:</h3>
          <div className={styles.filterButtons}>
            {filterOptions.map(filter => (
              <button
                key={filter}
                className={`${styles.filterButton} ${
                  activeFilters.includes(filter) ? styles.active : ''
                }`}
                onClick={() => toggleFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.projectsGrid}>
          {displayedProjects.map(project => (
            <a
              key={project.id}
              href={project.link}
              className={styles.projectCard}
              target='_blank'
              rel='noopener noreferrer'
            >
              <div className={styles.imageWrapper}>
                <img
                  src={project.image}
                  alt={project.name}
                  className={styles.projectImage}
                />
                <div className={styles.overlay}>
                  <span className={styles.viewProject}>View Project</span>
                </div>
              </div>
              <h4 className={styles.projectName}>{project.name}</h4>
            </a>
          ))}
        </div>

        {filteredProjects.length > 12 && (
          <p className={styles.limitNote}>Showing first 12 projects</p>
        )}

        {filteredProjects.length === 0 && (
          <p className={styles.noResults}>No projects match the selected filters</p>
        )}
      </div>
    </section>
  );
};

export default AllProjects;
