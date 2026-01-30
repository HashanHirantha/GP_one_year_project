import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import DashboardLayout from '../../components/layout/DashboardLayout';

// Import Owner Components
import OwnerStats from '../../components/owner/OwnerStats';
import MyProperties from '../../components/owner/MyProperties';
import AddProperty from '../../components/owner/AddProperty';
import Inquiries from '../../components/owner/Inquiries';
import OwnerAnalytics from '../../components/owner/OwnerAnalytics';
import PaymentsRevenue from '../../components/owner/PaymentsRevenue';
import Bookings from '../../components/owner/Bookings';
import OwnerSettings from '../../components/owner/OwnerSettings';

// Animation Variants
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

const PageTransition = ({ children }) => (
  <motion.div
    initial="initial"
    animate="animate"
    exit="exit"
    variants={pageVariants}
    transition={{ duration: 0.4, ease: "easeInOut" }}
  >
    {children}
  </motion.div>
);

const DashboardHome = () => (
  <div className="space-y-6">
    <OwnerStats />
    <Inquiries />
    <PaymentsRevenue />
    <Bookings />
    <MyProperties />
    <AddProperty />

    
    <OwnerAnalytics />
    
    
    
  </div>
);

const OwnerDashboard = () => {
  const location = useLocation();

  return (
    <DashboardLayout role="owner">
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><DashboardHome /></PageTransition>} />
          <Route path="/my-properties" element={<PageTransition><MyProperties /></PageTransition>} />
          <Route path="/add-property" element={<PageTransition><AddProperty /></PageTransition>} />
          <Route path="/inquiries" element={<PageTransition><Inquiries /></PageTransition>} />
          <Route path="/analytics" element={<PageTransition><OwnerAnalytics /></PageTransition>} />
          <Route path="/bookings" element={<PageTransition><Bookings /></PageTransition>} />
          <Route path="/settings" element={<PageTransition><OwnerSettings /></PageTransition>} />
          <Route path="*" element={<PageTransition><div className="p-4">Module under construction</div></PageTransition>} />
        </Routes>
      </AnimatePresence>
    </DashboardLayout>
  );
};

export default OwnerDashboard;