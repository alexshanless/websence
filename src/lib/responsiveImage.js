// Slide screenshots are generated as WebP at three widths alongside the
// original JPEG (see the build notes in the README). A phone was downloading
// the full 2000px JPEG; this hands the browser the set and lets it pick.
//
// Returns null for anything without generated variants, so callers fall back
// to a plain src.
const WIDTHS = [640, 1200, 2000];

export function webpSrcSet(src) {
  if (!src || !src.startsWith('/assets/screenshots/') || !src.endsWith('.jpg')) {
    return null;
  }
  const base = src.replace(/\.jpg$/, '');
  return WIDTHS.map((w) => `${base}-${w}.webp ${w}w`).join(', ');
}

export default webpSrcSet;
