import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';

// Pages
import Home from './pages/public/Home';
import About from './pages/public/About';
import Contact from './pages/public/Contact';
import Properties from './pages/public/Properties';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import PropertyDetails from './pages/public/PropertyDetails';
import OwnerDashboard from './pages/owner/OwnerDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import ScrollToTop from './components/ui/ScrollToTop';
import ScrollToTopOnMount from './components/ui/ScrollToTopOnMount';


function AppContent() {
  const location = useLocation();

  return (
    <Routes location={location} key={location.pathname}>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/properties" element={<Properties />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/property/:id" element={<PropertyDetails />} />

      {/* Dashboard Routes - Nested routing handled within components */}
      <Route path="/dashboard/owner/*" element={<OwnerDashboard />} />
      <Route path="/dashboard/admin/*" element={<AdminDashboard />} />

      {/* Catch all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTopOnMount />
      <ScrollToTop />
      <AppContent />
    </Router>
  );
}

export default App;