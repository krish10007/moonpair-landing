import termsRaw from '../../content/terms-of-service.md?raw';
import LegalPage from '../LegalPage/LegalPage';

export default function TermsOfService() {
  return (
    <LegalPage
      title="Terms of Service"
      description="The terms governing your use of the MoonPair app and website, including account responsibilities, subscriptions, and termination."
      effectiveDate="July 16, 2026"
      lastUpdated="July 16, 2026"
      raw={termsRaw}
    />
  );
}
