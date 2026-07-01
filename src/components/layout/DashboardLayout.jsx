import React, { useState } from 'react';
import { LayoutDashboard, Users, FileText, CreditCard, BarChart, Settings, LogOut, PlusCircle, MessageSquare, Building, ShieldCheck, Menu, Calendar, Home, Mail, Bell, X } from 'lucide-react';
import SidebarItem from '../ui/SidebarItem';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const DashboardLayout = ({ role = 'admin', children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, signOut } = useAuth();
  const currentPath = location.pathname;

  const adminMenu = [
    { id: 'dashboard', path: '/dashboard/admin', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'users', path: '/dashboard/admin/users', icon: Users, label: 'User Management' },
    { id: 'properties', path: '/dashboard/admin/properties', icon: Building, label: 'Property Management' },
    { id: 'messages', path: '/dashboard/admin/messages', icon: Mail, label: 'Messages' },
    { id: 'analytics', path: '/dashboard/admin/analytics', icon: BarChart, label: 'Analytics & Reports' }
  ];

  const ownerMenu = [
    { id: 'dashboard', path: '/dashboard/seller', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'my-properties', path: '/dashboard/seller/my-properties', icon: Building, label: 'My Properties' },
    { id: 'add-property', path: '/dashboard/seller/add-property', icon: PlusCircle, label: 'Add Property' },
    { id: 'inquiries', path: '/dashboard/seller/inquiries', icon: MessageSquare, label: 'Inquiries' },
    { id: 'analytics', path: '/dashboard/seller/analytics', icon: BarChart, label: 'Analytics' },
    { id: 'payments', path: '/dashboard/seller/payments', icon: CreditCard, label: 'Payments & Revenue' },
    { id: 'bookings', path: '/dashboard/seller/bookings', icon: Calendar, label: 'Bookings' }
  ];

  const menu = role === 'admin' ? adminMenu : ownerMenu;

  const activeItem = menu.find(item => {
    if (item.id === 'dashboard') return currentPath === item.path || currentPath === item.path + '/';
    return currentPath.startsWith(item.path);
  }) || menu[0];

  const handleNavClick = (path) => {
    navigate(path);
    setSidebarOpen(false);
  };

  const sidebarContent = (
    <>
      <div className="p-4 flex items-center justify-between border-b border-gray-100 bg-gray-50">
        <div className="flex items-center gap-2">
          <Settings className="text-[#06cc50] w-5 h-5 animate-spin-slow" />
          <h2 className="text-lg font-bold tracking-wide text-gray-800">{role === 'admin' ? 'Admin Panel' : 'Seller Panel'}</h2>
        </div>
        <button
          onClick={() => setSidebarOpen(false)}
          className="md:hidden bg-gray-200/50 p-1 rounded hover:bg-gray-200"
          aria-label="Close sidebar"
        >
          <X size={20} className="text-gray-600" />
        </button>
        <div className="hidden md:block bg-gray-200/50 p-1 rounded hover:bg-gray-200 cursor-pointer">
          <Menu size={20} className="text-gray-600" />
        </div>
      </div>
      <nav className="flex-grow py-4 space-y-1 overflow-y-auto">
        {menu.map((item) => (
          <SidebarItem
            key={item.id}
            icon={item.icon}
            label={item.label}
            active={item.id === 'dashboard' ? currentPath === item.path : currentPath.startsWith(item.path)}
            onClick={() => handleNavClick(item.path)}
          />
        ))}
        <div className="mt-auto pt-4 border-t border-gray-100 px-4 pb-4 space-y-2">
          <button
            onClick={() => handleNavClick('/')}
            className="flex items-center space-x-3 px-4 py-3 w-full text-left font-medium hover:bg-gray-100 rounded-lg transition-colors text-gray-700 hover:text-gray-900"
          >
            <Home size={20} />
            <span>Go to Website</span>
          </button>
          <button
            onClick={async () => {
              await signOut();
              setSidebarOpen(false);
              navigate('/');
            }}
            className="flex items-center space-x-3 px-4 py-3 w-full text-left font-medium hover:bg-red-50 rounded-lg transition-colors text-red-500 hover:text-red-700"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </nav>
    </>
  );

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        className={`w-64 bg-white border-r border-gray-200 text-gray-800 flex-shrink-0 flex flex-col shadow-lg z-40
          fixed md:static inset-y-0 left-0 transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
      >
        {sidebarContent}
      </aside>

      <main className="flex-1 flex flex-col h-screen overflow-hidden bg-gray-50">
        <header className="bg-white shadow-sm px-8 py-5 flex justify-between items-center z-10 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Open sidebar"
            >
              <Menu size={24} className="text-gray-700" />
            </button>
            <h2 className="text-[var(--primary-color)] font-bold text-2xl capitalize">{activeItem.label}</h2>
          </div>
          <Link to="/profile" className="flex items-center gap-4 hover:bg-gray-50 p-2 rounded-lg transition-colors cursor-pointer border border-transparent hover:border-gray-200">
            <div className="flex flex-col items-end mr-2">
              <span className="text-sm font-bold text-gray-800">{user?.user_metadata?.full_name || (role === 'admin' ? 'Administrator' : 'Property Seller')}</span>
              <span className="text-xs text-gray-500">{user?.email || ''}</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#06cc50] to-green-500 text-white flex items-center justify-center text-sm font-bold shadow-md border-2 border-white ring-2 ring-green-100 uppercase">
              {user?.user_metadata?.full_name ? user.user_metadata.full_name.substring(0, 2) : (role === 'admin' ? 'AD' : 'PO')}
            </div>
          </Link>
        </header>
        <div className="p-8 overflow-y-auto flex-1 scroll-smooth">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
