import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import DashboardLayout from '../../components/layout/DashboardLayout';

// Import Admin Components
import AdminStats from '../../components/admin/AdminStats';
import RecentActivity from '../../components/admin/RecentActivity';
import UserManagement from '../../components/admin/UserManagement';
import PropertyManagement from '../../components/admin/PropertyManagement';
import Transactions from '../../components/admin/Transactions';
import AnalyticsReports from '../../components/admin/AnalyticsReports';
import ContentModeration from '../../components/admin/ContentModeration';
import SystemSettings from '../../components/admin/SystemSettings';

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

const AdminHome = () => (
  <div className="space-y-6">
    <AdminStats />
    <Transactions />
    <AnalyticsReports />
    <PropertyManagement />
    <UserManagement />
    <RecentActivity />
    <ContentModeration />
   
  </div>
);

const AdminDashboard = () => {
  const location = useLocation();

  return (
    <DashboardLayout role="admin">
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><AdminHome /></PageTransition>} />
          <Route path="/users" element={<PageTransition><UserManagement /></PageTransition>} />
          <Route path="/properties" element={<PageTransition><PropertyManagement /></PageTransition>} />
          <Route path="/transactions" element={<PageTransition><Transactions /></PageTransition>} />
          <Route path="/analytics" element={<PageTransition><AnalyticsReports /></PageTransition>} />
          <Route path="/moderation" element={<PageTransition><ContentModeration /></PageTransition>} />
          <Route path="/settings" element={<PageTransition><SystemSettings /></PageTransition>} />
          <Route path="*" element={<PageTransition><div className="p-4">Module not found</div></PageTransition>} />
        </Routes>
      </AnimatePresence>
    </DashboardLayout>
  );
};

export default AdminDashboard;