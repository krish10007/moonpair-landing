import privacyRaw from '../../content/privacy-policy.md?raw';
import LegalPage from '../LegalPage/LegalPage';

export default function PrivacyPolicy() {
  return (
    <LegalPage
      title="Privacy Policy"
      effectiveDate="July 16, 2026"
      lastUpdated="July 16, 2026"
      raw={privacyRaw}
    />
  );
}
