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
import EditProperty from '../../components/common/EditProperty'; // Added import for EditProperty

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
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between border-t-4 border-purple-800">
       <div>
         <h1 className="text-2xl font-bold text-gray-800">Welcome to your dashboard!</h1>
         <p className="text-gray-500 mt-1">Manage your properties, track analytics, and boost your sales.</p>
       </div>
    </div>
    <OwnerStats />
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
          <Route path="edit-property/:id" element={<PageTransition><EditProperty /></PageTransition>} /> {/* Added new route for EditProperty */}
          <Route path="/inquiries" element={<PageTransition><Inquiries /></PageTransition>} />
          <Route path="/analytics" element={<PageTransition><OwnerAnalytics /></PageTransition>} />
          <Route path="/bookings" element={<PageTransition><Bookings /></PageTransition>} />
          <Route path="*" element={<PageTransition><div className="p-4">Module under construction</div></PageTransition>} />
        </Routes>
      </AnimatePresence>
    </DashboardLayout>
  );
};

export default OwnerDashboard;
