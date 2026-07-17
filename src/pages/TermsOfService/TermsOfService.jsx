import termsRaw from '../../content/terms-of-service.md?raw';
import LegalPage from '../LegalPage/LegalPage';

export default function TermsOfService() {
  return (
    <LegalPage
      title="Terms of Service"
      effectiveDate="July 16, 2026"
      lastUpdated="July 16, 2026"
      raw={termsRaw}
    />
  );
}
