import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * React Router does not reset scroll position on navigation, so moving from a
 * footer link (where you are always scrolled to the bottom) to /privacy would
 * land you partway down the new page. This restores the expected behaviour.
 *
 * Hash links are deliberately excluded: the navbar points at /#hero, /#cta and
 * friends, and those should scroll to their section rather than to the top.
 * Renders nothing - it exists purely for the side effect.
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // Let the target section win, if it exists on this route.
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname, hash]);

  return null;
}
