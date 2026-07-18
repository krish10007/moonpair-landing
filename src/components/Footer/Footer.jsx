import { Link } from 'react-router-dom';
import logo from '../../assets/moonpair-premium-app-store-1024.png';
import './Footer.css';

function InstagramIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37a4 4 0 1 1-7.914 1.174A4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <div className="footer-logo">
            <img src={logo} alt="MoonPair" />
            <span>MoonPair</span>
          </div>
          <p className="footer-blurb">
            A private universe for couples to connect, share memories, and grow closer every day.
          </p>
          <a
            className="footer-social"
            href="https://www.instagram.com/moonpairapp/?hl=en"
            target="_blank"
            rel="noreferrer"
            aria-label="MoonPair on Instagram"
          >
            <InstagramIcon />
          </a>
        </div>

        <nav className="footer-links">
          <Link to="/support">Support</Link>
          <Link to="/terms">Terms &amp; Conditions</Link>
          <Link to="/privacy">Privacy Policy</Link>
        </nav>

        <p className="footer-copyright">© {year} MoonPair. All rights reserved.</p>
      </div>
    </footer>
  );
}
