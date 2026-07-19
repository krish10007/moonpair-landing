import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logo from '../../assets/moonpair-premium-app-store-1024.png';
import './Navbar.css';

const NAV_LINKS = [
  { label: 'Home', href: '/#hero' },
  { label: 'Features', href: '/#everything-you-can-do' },
  { label: 'Highlights', href: '/#made-for-every-moment' },
  { label: 'Get Started', href: '/#cta' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const handleLinkClick = () => setOpen(false);

  return (
    <header className="navbar">
      <div className="navbar-inner container">
        <Link to="/#hero" className="navbar-logo" onClick={handleLinkClick}>
          <img src={logo} alt="MoonPair" />
          <span>MoonPair</span>
        </Link>

        <nav className={`navbar-links ${open ? 'is-open' : ''}`}>
          {NAV_LINKS.map((link) => (
            <Link key={link.label} to={link.href} onClick={handleLinkClick}>
              {link.label}
            </Link>
          ))}
          <Link to="/#cta" className="btn navbar-download navbar-download-mobile" onClick={handleLinkClick}>
            Download
          </Link>
        </nav>

        <div className="navbar-actions">
          <Link to="/#cta" className="btn navbar-download navbar-download-desktop">
            Download
          </Link>
          <button
            className="navbar-toggle"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
    </header>
  );
}
