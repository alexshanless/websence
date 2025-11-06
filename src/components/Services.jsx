import React, { useState } from 'react';
import styles from './Services.module.css';

const Services = () => {
  const [hoveredService, setHoveredService] = useState(null);

  const services = [
    {
      id: 'web-design',
      title: 'Web Design',
      subServices: ['UI/UX', 'Brand Identity', 'Prototyping'],
    },
    {
      id: 'web-development',
      title: 'Web Development',
      subServices: ['Webflow', 'React', 'SEO', 'Performance'],
    },
    {
      id: 'project-management',
      title: 'Project Management',
      subServices: ['Client Communication', 'Timeline Planning', 'QA'],
    },
  ];

  return (
    <section id='services' className={styles.services}>
      <div className={styles.container}>
        {services.map(service => (
          <div
            key={service.id}
            className={styles.serviceItem}
            onMouseEnter={() => setHoveredService(service.id)}
            onMouseLeave={() => setHoveredService(null)}
          >
            <h2 className={styles.serviceTitle}>{service.title}</h2>

            {hoveredService === service.id && (
              <div className={styles.tooltip}>
                <ul className={styles.subServicesList}>
                  {service.subServices.map((subService, index) => (
                    <li key={index} className={styles.subServiceItem}>
                      {subService}
                      {index < service.subServices.length - 1 && (
                        <span className={styles.separator}> | </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
