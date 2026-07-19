import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home/Home';
import PrivacyPolicy from './pages/PrivacyPolicy/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService/TermsOfService';
import Support from './pages/Support/Support';
import DeleteAccount from './pages/DeleteAccount/DeleteAccount';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/support" element={<Support />} />
          <Route path="/delete-account" element={<DeleteAccount />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
