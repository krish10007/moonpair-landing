import Seo from '../../components/Seo/Seo';
import './Support.css';

export default function Support() {
  return (
    <section className="support">
      <Seo
        title="Support — MoonPair"
        description="Need help with MoonPair? Email our team at support@moonpairapp.com and we'll get back to you, usually within 24 hours."
      />
      <div className="container support-content">
        <span className="section-eyebrow">✦ We're Here For You ✦</span>

        <h1 className="support-title">
          We're <span className="support-title-accent">here.</span>
        </h1>

        <p className="support-subtext">
          MoonPair is built by a small team that genuinely cares. If you're having
          trouble or just need to reach us, we'll get back to you.
        </p>

        <div className="support-card">
          <span className="support-card-eyebrow">Email Support</span>
          <a href="mailto:support@moonpairapp.com" className="support-email">
            support@moonpairapp.com
          </a>
          <p className="support-card-note">We typically respond within 24 hours.</p>
        </div>

        <p className="support-footnote">
          For billing or subscription issues, you can also manage or cancel your
          purchase directly through your Apple ID or Google Play account settings.
        </p>
      </div>
    </section>
  );
}
