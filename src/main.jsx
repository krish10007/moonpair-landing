import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary.jsx'
import App from './App.jsx'

// ErrorBoundary sits outside <App> (and therefore outside BrowserRouter) so it
// catches router errors too, not just page-level ones.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)
