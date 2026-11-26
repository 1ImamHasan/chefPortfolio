import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import NotFound from './components/NotFound.jsx'
import AdminDashboard from './components/admin/AdminDashboard.jsx'
import { PortfolioProvider } from './context/PortfolioContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PortfolioProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </PortfolioProvider>
  </StrictMode>
)
