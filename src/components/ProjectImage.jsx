import { useState } from 'react';
import { webpSrcSet } from '../lib/responsiveImage';
import styles from './ProjectImage.module.css';

// `width`/`height` are the intrinsic pixel dimensions of the source file, not
// the rendered size. The browser uses their ratio to reserve space before the
// image arrives, which is what stops the page shifting as it loads. CSS still
// controls the displayed size.
function ProjectImage({
  src,
  alt,
  className,
  width = 2000,
  height = 1333,
  loading = 'lazy',
  // When true the fallback renders as a plain tile with no visible text.
  silentFallback = false,
  // What the image actually occupies, so the browser can choose a width
  // before layout. Defaults to the /work card at its widest.
  sizes = '(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 640px',
}) {
  const [failed, setFailed] = useState(!src);

  if (failed) {
    return (
      <div
        className={`${styles.fallback} ${className || ''}`}
        role="img"
        aria-label={alt}
      >
        {silentFallback ? null : (
          <span className={styles.fallbackLabel}>{alt}</span>
        )}
      </div>
    );
  }

  const srcSet = webpSrcSet(src);

  return (
    <img
      src={src}
      {...(srcSet ? { srcSet, sizes } : {})}
      alt={alt}
      className={className}
      width={width}
      height={height}
      loading={loading}
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
}

export default ProjectImage;
