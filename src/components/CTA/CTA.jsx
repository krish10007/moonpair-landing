import { useState } from 'react';
import ctaPlanet from '../../assets/cta plannet 1.jpg';
import ctaPlanetLaptop from '../../assets/cta plannet laptop.jpg';
import ComingSoonModal from '../ComingSoonModal/ComingSoonModal';
import './CTA.css';

function AppleIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width={20} height={20} fill="currentColor" {...props}>
      <path d="M16.365 1.43c0 1.14-.42 2.19-1.24 3.04-.87.9-2.06 1.53-3.16 1.45-.14-1.12.4-2.28 1.2-3.08.85-.86 2.16-1.44 3.2-1.41zM20.83 17.11c-.5 1.15-1.09 2.29-1.95 3.29-.9 1.05-1.87 2.05-3.19 2.07-1.28.02-1.7-.76-3.18-.76-1.48 0-1.95.74-3.15.78-1.28.05-2.24-1.13-3.15-2.17-1.87-2.14-3.31-6.05-1.38-8.69.96-1.31 2.68-2.13 4.53-2.15 1.25-.02 2.42.83 3.19.83.77 0 2.19-1.03 3.7-.88.63.03 2.4.25 3.53 1.91-.09.06-2.11 1.23-2.08 3.66.02 2.9 2.55 3.87 2.58 3.88-.02.07-.42 1.4-1.4 2.72z" />
    </svg>
  );
}

function PlayIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width={20} height={20} {...props}>
      <path d="M3.6 2.3a1 1 0 00-.6.92v17.5a1 1 0 00.6.92l10.2-9.67L3.6 2.3z" fill="#00d2ff" />
      <path d="M17.5 10.13l-3.15-1.8-2.75 2.62 2.75 2.62 3.16-1.82a1.13 1.13 0 000-1.62z" fill="#ffcd00" />
      <path d="M3 2.3l10.65 8.65 2.75-2.62L4.4 2.06a1 1 0 00-1.4.24z" fill="#00f076" />
      <path d="M3 21.7l11.85-6.65-2.75-2.62L3 21.4c.1.13.24.24.4.3z" fill="#ff3a44" />
    </svg>
  );
}

export default function CTA() {
  const [showComingSoon, setShowComingSoon] = useState(false);

  const openComingSoon = (e) => {
    e.preventDefault();
    setShowComingSoon(true);
  };

  return (
    <section id="cta" className="cta">
      <picture>
        <source media="(min-width: 960px)" srcSet={ctaPlanetLaptop} />
        <img src={ctaPlanet} alt="" className="cta-bg" aria-hidden="true" loading="lazy" decoding="async" />
      </picture>

      <div className="container cta-content">
        <span className="section-eyebrow">✦ Your Universe Awaits ✦</span>

        <h2 className="cta-title">
          Start your
          <br />
          universe
          <br />
          <span className="cta-title-accent">today.</span>
        </h2>

        <p className="cta-subtext">Every relationship deserves its own little world.</p>

        <div className="cta-buttons">
          <a href="#" className="store-btn" onClick={openComingSoon}>
            <AppleIcon />
            <span className="store-btn-text">
              <small>Download on the</small>
              <strong>App Store</strong>
            </span>
          </a>
          <a href="#" className="store-btn" onClick={openComingSoon}>
            <PlayIcon />
            <span className="store-btn-text">
              <small>GET IT ON</small>
              <strong>Google Play</strong>
            </span>
          </a>
        </div>
      </div>

      <ComingSoonModal open={showComingSoon} onClose={() => setShowComingSoon(false)} />
    </section>
  );
}
