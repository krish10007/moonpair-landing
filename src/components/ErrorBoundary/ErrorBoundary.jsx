import { Component } from 'react';
import './ErrorBoundary.css';

/**
 * Catches render errors anywhere below it and shows a fallback instead of the
 * blank white page React gives you when a component throws.
 *
 * Must be a class - React has no hook equivalent for error boundaries.
 *
 * Mounted OUTSIDE <BrowserRouter> in main.jsx so it also catches errors thrown
 * by the router itself. That's why the recovery action is a plain <a> rather
 * than a react-router <Link>: there may be no router context to link with, and
 * a full reload is the more reliable way to recover from a crashed tree anyway.
 */
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // No error-reporting service wired up yet; the console is all we have.
    // If Sentry (or similar) is ever added, report it here.
    console.error('Unhandled render error:', error, info);
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div className="eb">
        <div className="eb-inner">
          <h1 className="eb-title">Something went wrong</h1>
          <p className="eb-text">
            Sorry — something broke on our end. Reloading usually fixes it.
          </p>
          <div className="eb-actions">
            <a href="/" className="eb-btn">
              Reload MoonPair
            </a>
            <a href="/support" className="eb-link">
              Contact support
            </a>
          </div>
        </div>
      </div>
    );
  }
}
