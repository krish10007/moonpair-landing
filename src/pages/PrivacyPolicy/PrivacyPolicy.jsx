import privacyRaw from '../../content/privacy-policy.md?raw';
import LegalPage from '../LegalPage/LegalPage';

export default function PrivacyPolicy() {
  return (
    <LegalPage
      title="Privacy Policy"
      description="How MoonPair collects, uses, and protects your personal information, and the rights you have over your data."
      effectiveDate="July 16, 2026"
      lastUpdated="July 16, 2026"
      raw={privacyRaw}
    />
  );
}
