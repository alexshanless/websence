import { useLocation, useNavigate } from 'react-router-dom';
import styles from './BackLink.module.css';

// Sits at the top of every page except the home page. Going "back" from home
// would leave the site, which is not what a back control should do.
//
// React Router marks the first entry of a session with key 'default'. When
// that is the current entry the visitor landed here directly — from search, a
// shared link, a refresh — so there is no in-app history to step back into and
// history(-1) would send them off the site. In that case this goes home.
function BackLink() {
  const location = useLocation();
  const navigate = useNavigate();

  if (location.pathname === '/') {
    return null;
  }

  const hasHistory = location.key !== 'default';

  const handleClick = () => {
    if (hasHistory) {
      navigate(-1);
      return;
    }
    navigate('/');
  };

  return (
    <div className={styles.wrap}>
      <button type="button" className={styles.back} onClick={handleClick}>
        <span className={styles.arrow} aria-hidden="true">
          &larr;
        </span>
        {hasHistory ? 'Back' : 'Back to home'}
      </button>
    </div>
  );
}

export default BackLink;
