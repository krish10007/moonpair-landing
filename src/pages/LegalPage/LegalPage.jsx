import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Link } from 'react-router-dom';
import './LegalPage.css';

// ReactMarkdown renders every link as a plain <a>, which for an internal path
// like /support triggers a full browser reload instead of client-side routing.
// This maps internal paths onto react-router's <Link> so navigation between
// legal pages stays instant, and hardens external links with rel="noopener".
const markdownComponents = {
  a: ({ href = '', children, ...props }) => {
    if (href.startsWith('/')) {
      return (
        <Link to={href} {...props}>
          {children}
        </Link>
      );
    }
    if (href.startsWith('mailto:') || href.startsWith('tel:')) {
      return (
        <a href={href} {...props}>
          {children}
        </a>
      );
    }
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    );
  },
};

// The source .md files are plain-text legal docs, not authored with markdown
// "#" headings. This promotes their numbered section titles (e.g. "3.1 Account
// & Profile Data", "12. YOUR RIGHTS UNDER CalOPPA (CALIFORNIA)") into real
// markdown headings so ReactMarkdown renders proper <h2>/<h3> elements, which
// we can then style consistently with the rest of the site. Section titles
// are always short single lines, so a length cap keeps this from accidentally
// matching a numbered sentence in body prose (none exist in these docs, but
// it's a cheap safeguard).
function promoteHeadings(raw) {
  return raw
    .split('\n')
    .map((line) => {
      if (line.length > 90) return line;

      const subLevel = line.match(/^(\d+\.\d+)\s+(.+)$/);
      if (subLevel) return `### ${subLevel[1]} ${subLevel[2]}`;

      const topLevel = line.match(/^(\d+)\.\s+(.+)$/);
      if (topLevel) return `## ${topLevel[1]}. ${topLevel[2]}`;

      return line;
    })
    .join('\n');
}

// The raw files start with a plain-text title + Effective Date / Last Updated
// lines, which we already render as our own <h1> and dates subtitle above.
// Strip everything before the first numbered section ("1. ...") so it isn't
// duplicated inside the markdown body.
function stripHeaderLines(raw) {
  const lines = raw.split('\n');
  const firstSectionIndex = lines.findIndex((line) => /^1\.\s+[A-Z]/.test(line));
  if (firstSectionIndex === -1) return raw;
  return lines.slice(firstSectionIndex).join('\n');
}

export default function LegalPage({ title, effectiveDate, lastUpdated, raw }) {
  const body = promoteHeadings(stripHeaderLines(raw));

  return (
    <section className="legal">
      <div className="container legal-content">
        <h1 className="legal-title">{title}</h1>
        {(effectiveDate || lastUpdated) && (
          <p className="legal-dates">
            {effectiveDate && <span>Effective Date: {effectiveDate}</span>}
            {effectiveDate && lastUpdated && <span> &middot; </span>}
            {lastUpdated && <span>Last Updated: {lastUpdated}</span>}
          </p>
        )}
        <div className="legal-body">
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
            {body}
          </ReactMarkdown>
        </div>
      </div>
    </section>
  );
}
