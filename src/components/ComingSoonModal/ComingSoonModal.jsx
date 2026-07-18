import { useEffect } from 'react';
import './ComingSoonModal.css';

export default function ComingSoonModal({ open, onClose }) {
  useEffect(() => {
    if (!open) return undefined;

    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="cs-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Coming soon"
    >
      <div className="cs-modal" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="cs-close" onClick={onClose} aria-label="Close">
          &times;
        </button>
        <picture>
          <source media="(min-width: 768px)" srcSet="/coming-soon-desktop.jpg" />
          <img src="/coming-soon-mobile.jpg" alt="MoonPair — Coming Soon" className="cs-img" />
        </picture>
      </div>
    </div>
  );
}
