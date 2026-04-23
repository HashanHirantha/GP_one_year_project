import React, { useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Pages
import Home from './pages/public/Home';
import About from './pages/public/About';
import Contact from './pages/public/Contact';
import Properties from './pages/public/Properties';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import UpdatePassword from './pages/auth/UpdatePassword';
import PropertyDetails from './pages/public/PropertyDetails';
import Favorites from './pages/public/Favorites'; 
import Profile from './pages/public/Profile';
import OwnerDashboard from './pages/owner/OwnerDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';

function RoleSyncRedirector() {
  const { role, user } = useAuth();
  const navigate = useNavigate();
  const prevRoleRef = useRef(role);

  useEffect(() => {
    // Only redirect if an active user experiences an explicit role change delta
    if (user && prevRoleRef.current && role && prevRoleRef.current !== role) {
      alert(`System Notice: Your account privileges mapped externally have been upgraded to ${role.toUpperCase()}. Redirecting layout...`);
      if (role === 'admin') navigate('/dashboard/admin');
      else if (role === 'seller') navigate('/dashboard/seller');
      else navigate('/profile');
    }
    prevRoleRef.current = role;
  }, [role, user, navigate]);

  return null;
}

function App() {
  return (
    <Router>
      <RoleSyncRedirector />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/update-password" element={<UpdatePassword />} />
        <Route path="/property/:id" element={<PropertyDetails />} />
        <Route path="/favorites" element={<Favorites />} /> 
        <Route path="/profile" element={<Profile />} />

        {/* Dashboard Routes - Nested routing handled within components */}
        <Route path="/dashboard/seller/*" element={<OwnerDashboard />} />
        <Route path="/dashboard/admin/*" element={<AdminDashboard />} />

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;