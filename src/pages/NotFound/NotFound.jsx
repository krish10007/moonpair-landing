import { Link } from 'react-router-dom';
import './NotFound.css';

// Catch-all for unmatched routes. Without this, vercel.json's SPA rewrite hands
// any unknown path to index.html and React Router matches nothing, leaving the
// navbar and footer wrapped around an empty <main>.
export default function NotFound() {
  return (
    <section className="nf">
      <div className="container nf-content">
        <span className="section-eyebrow">✦ Lost in Space ✦</span>

        <h1 className="nf-title">
          This page drifted <span className="nf-title-accent">off course.</span>
        </h1>

        <p className="nf-subtext">
          The page you're looking for doesn't exist, or it may have moved somewhere
          else in the universe.
        </p>

        <div className="nf-actions">
          <Link to="/" className="btn btn-primary">
            Back to home
          </Link>
          <Link to="/support" className="nf-btn-link">
            Contact support
          </Link>
        </div>
      </div>
    </section>
  );
}
