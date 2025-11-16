import React, { useState } from 'react';
import styles from './AllProjects.module.css';

const projectsData = [
  {
    id: 1,
    name: 'alexbilba.com',
    description: 'My personal website',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80', // Placeholder - will be updated
    link: 'https://alexbilba.com/',
    logo: null,
    filters: ['Webflow'],
  },
  {
    id: 2,
    name: 'embr solar',
    description: 'For this project, I built a website for a solar energy company. I\'m particularly proud of 3d animation that took a while to set up.',
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80', // Solar panel placeholder
    link: 'https://www.embrsolar.com/',
    logo: null,
    filters: ['Webflow'],
  },
  {
    id: 3,
    name: 'jna group',
    description: 'For JNA Group, I created a website to showcase their structural consulting services. The key goals were to highlight their expertise, their practical solutions, and the range of clients they serve, from businesses to homeowners.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80', // Architecture placeholder
    link: 'https://jna-37757f.webflow.io/',
    logo: null,
    filters: ['Webflow'],
  },
  {
    id: 4,
    name: 'musclebees',
    description: 'For Muscle Bees Nutrition, I built an e-commerce platform to sell their sports nutrition products. Key goals included creating a user-friendly shopping experience, highlighting product benefits, and promoting their free shipping offer.',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80', // Fitness placeholder
    link: 'https://www.musclebees.co.uk/',
    logo: null,
    filters: ['Shopify'],
  },
  {
    id: 5,
    name: 'c.s. media',
    description: 'This project involved designing and developing a website for C.S. Media, a custom marketing services company. The focus was on conveying their unique approach of goal-based marketing.',
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80', // Marketing placeholder
    link: 'https://www.csmediaoc.com/',
    logo: null,
    filters: ['Webflow', 'Design'],
  },
  {
    id: 6,
    name: 'adhero',
    description: 'This project focused on designing and developing a website for Adhero, a company specializing in user-generated content (UGC) creation. The goal was to showcase their world-class UGC services.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80', // Content creation placeholder
    link: 'https://www.adhero.co/',
    logo: null,
    filters: ['Webflow'],
  },
  {
    id: 7,
    name: 'dog bandana co',
    description: 'For Dog Bandana Co., I built an e-commerce platform to sell their pet bandanas and accessories. Key goals included showcasing the variety and style of their products, creating a user-friendly shopping experience, and reflecting the brand\'s focus on pets and their owners.',
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&q=80', // Dog placeholder
    link: 'https://dogbandanaco.com/',
    logo: null,
    filters: ['Shopify', 'Webflow'],
  },
  {
    id: 8,
    name: 'Blur',
    description: 'Developed a website for an architectural design studio.',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80', // Architecture placeholder
    link: 'https://blur-4c9680.webflow.io/',
    logo: null,
    filters: ['Webflow'],
  },
  {
    id: 9,
    name: 'Rob Adamson',
    description: 'Created an online portfolio for an artist that contains all of his works.',
    image: 'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=800&q=80', // Art placeholder
    link: 'https://rob-adamson-md.webflow.io/',
    logo: 'https://drive.google.com/file/d/1xadMNRGkB3LbVVWEhnIg3S-rjb1rU-R8/view?usp=drive_link',
    filters: ['Webflow'],
  },
  {
    id: 10,
    name: 'The Fowl Drake',
    description: 'I was responsible for building this e-commerce website from scratch.',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80', // E-commerce placeholder
    link: 'https://fowldrake.com/',
    logo: 'https://drive.google.com/file/d/13WlZT3ZZUBa7nDNxwQMsLv4ff_-xAgd7/view?usp=drive_link',
    filters: ['Shopify', 'End-to-End'],
  },
  {
    id: 11,
    name: 'Materially',
    description: 'Developed a seamless platform for aggregates procurement and supply chain, connecting buyers, suppliers, and haulers. Materially is an end-to-end, digital technology platform for aggregate suppliers.',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80', // Construction placeholder
    link: 'https://www.materially.com/',
    logo: 'https://drive.google.com/file/d/1LsCruO9pK8MzkZn_iJCTLi2ORBsMfoLk/view?usp=drive_link',
    filters: ['End-to-End', 'Shopify'],
  },
  {
    id: 12,
    name: 'Beyond the Guidebook',
    description: 'I built the end-to-end website for this small business specializing in curated, small group travel.',
    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80', // Travel placeholder
    link: 'https://www.beyondtheguidebooktours.com/',
    logo: 'https://drive.google.com/file/d/1psxvTJHYhtVIaIglsiFjGNRpD866fLXj/view?usp=drive_link',
    filters: ['End-to-End'],
  },
  {
    id: 13,
    name: 'Big Health',
    description: 'Digital health solutions company website.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80', // Health placeholder
    link: 'https://www.bighealth.com/',
    logo: 'https://drive.google.com/file/d/1Zgm84haV1hDgpmqq3EBDOwUCDFwo5HX2/view?usp=drive_link',
    filters: ['Webflow'],
  },
  {
    id: 14,
    name: 'Marjorie restaurant',
    description: 'Marjorie restaurant needed a new website to double down on their existing SEO traffic, build brand loyalty, convert more direct buyers online. I transformed Marjorie\'s digital presence, creating a website that authentically captures the brand\'s spirit and commitment to climate, health, and equity.',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80', // Restaurant placeholder
    link: 'https://www.marjorierestaurant.com/',
    logo: 'https://drive.google.com/file/d/1aLyltvZt5tv2IC_rt97cxU56bwHBQlTa/view?usp=drive_link',
    filters: ['Webflow', 'Design'],
  },
  {
    id: 15,
    name: 'Lustre',
    description: 'Lustre Infrared Sauna Studio features private, state of the art infrared sauna suites, and Normatec Compression, Red Light and Halo Salt Therapies.',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80', // Wellness placeholder
    link: 'https://www.lustreinfraredsauna.com/',
    logo: 'https://drive.google.com/file/d/14dO9nH_QZcQkWBcl5B-b2KRbbrUt564k/view?usp=drive_link',
    filters: ['Webflow'],
  },
  {
    id: 16,
    name: 'Heven',
    description: 'I built a website for this Strategic Management Services business that focuses on helping to scale small to medium sized business through various support services and capital.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80', // Business placeholder
    link: 'https://www.heven.com.au/',
    logo: null, // Check folder as noted
    filters: ['Webflow'],
  },
  {
    id: 17,
    name: 'Valorem',
    description: 'Valorem specialized in enterprise procurement.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80', // Enterprise placeholder
    link: 'https://www.valoremps.com/',
    logo: null,
    filters: ['Design'],
  },
  {
    id: 18,
    name: 'Education Advanced',
    description: 'Education Advanced supports educators and students by providing testing, assessment, evaluation and graduation tracking services.',
    image: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&q=80', // Education placeholder
    link: 'https://www.educationadvanced.com/',
    logo: 'https://drive.google.com/file/d/1abu2aUNYDDWR8u-_fbDNJFxYRskzps93/view?usp=drive_link',
    filters: ['Webflow'],
  },
];

const filterOptions = ['Webflow', 'Shopify', 'Design', 'End-to-End'];

const AllProjects = () => {
  const [activeFilters, setActiveFilters] = useState([]);
  const [visibleCount, setVisibleCount] = useState(9);

  const toggleFilter = (filter) => {
    if (activeFilters.includes(filter)) {
      setActiveFilters(activeFilters.filter(f => f !== filter));
    } else {
      setActiveFilters([...activeFilters, filter]);
    }
    // Reset visible count when filters change
    setVisibleCount(9);
  };

  const filteredProjects = activeFilters.length === 0
    ? projectsData
    : projectsData.filter(project =>
        activeFilters.some(filter => project.filters.includes(filter))
      );

  const displayedProjects = filteredProjects.slice(0, visibleCount);
  const hasMoreProjects = filteredProjects.length > visibleCount;

  const loadMore = () => {
    setVisibleCount(prevCount => prevCount + 9);
  };

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

        {hasMoreProjects && (
          <div className={styles.loadMoreContainer}>
            <button onClick={loadMore} className={styles.loadMoreButton}>
              Load More
            </button>
          </div>
        )}

        {filteredProjects.length === 0 && (
          <p className={styles.noResults}>No projects match the selected filters</p>
        )}
      </div>
    </section>
  );
};

export default AllProjects;
