import { useLocation } from 'react-router-dom';

const SITE_URL = 'https://www.moonpairapp.com';

/**
 * Per-route document metadata.
 *
 * React 19 hoists <title>, <meta> and <link> rendered anywhere in the tree into
 * <head>, so this needs no helmet library. Note that it runs CLIENT-SIDE: Google
 * executes JS and will see these, but social crawlers (Facebook, iMessage) do
 * not - they read the static tags in index.html. That's why og:* tags stay in
 * index.html rather than being set here; making them per-route would require
 * server rendering or prerendering.
 *
 * The canonical tag matters because moonpairapp.com redirects to www - without
 * it, search engines can treat the two hosts as duplicate content.
 */
export default function Seo({ title, description }) {
  const { pathname } = useLocation();
  const canonical = `${SITE_URL}${pathname === '/' ? '' : pathname}`;

  return (
    <>
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
      <link rel="canonical" href={canonical} />
    </>
  );
}
