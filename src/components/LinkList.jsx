import { Link } from 'react-router-dom';
import page from './Page.module.css';

// The label/blurb/arrow row used by the services hub and the 404 page. Both
// had the same markup written out by hand, once per item.
function LinkList({ items }) {
  return (
    <ul className={page.linkList}>
      {items.map((item) => (
        <li key={item.to} className={page.hubItem}>
          <Link to={item.to} className={page.hubRow}>
            <span>
              <span className={page.hubLink}>{item.label}</span>
              <span className={page.hubBlurb}>{item.blurb}</span>
            </span>
            <span className={page.hubArrow} aria-hidden="true">
              &rarr;
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default LinkList;
