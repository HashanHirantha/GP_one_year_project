import React from 'react';
import { LayoutDashboard, Users, FileText, CreditCard, BarChart, Settings, LogOut, PlusCircle, MessageSquare, Building } from 'lucide-react';
import SidebarItem from '../ui/SidebarItem';
import { useNavigate } from 'react-router-dom';

const DashboardLayout = ({ role = 'admin', activeTab, setActiveTab, children }) => {
  const navigate = useNavigate();

  const adminMenu = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'users', icon: Users, label: 'User Management' },
    { id: 'properties', icon: Building, label: 'Property Management' },
    { id: 'transactions', icon: CreditCard, label: 'Transactions' },
    { id: 'settings', icon: Settings, label: 'System Settings' },
  ];

  const ownerMenu = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'my-properties', icon: Building, label: 'My Properties' },
    { id: 'add-property', icon: PlusCircle, label: 'Add Property' },
    { id: 'inquiries', icon: MessageSquare, label: 'Inquiries' },
    { id: 'analytics', icon: BarChart, label: 'Analytics' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  const menu = role === 'admin' ? adminMenu : ownerMenu;

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
      <aside className="w-64 bg-primary text-white flex-shrink-0 hidden md:flex flex-col">
        <div className="p-6 flex items-center gap-2 border-b border-purple-800">
          <Settings className="animate-spin-slow" />
          <h2 className="text-xl font-bold">{role === 'admin' ? 'Admin Panel' : 'Owner Dashboard'}</h2>
        </div>
        <nav className="flex-grow py-4">
          {menu.map((item) => (
            <SidebarItem 
              key={item.id} 
              icon={item.icon} 
              label={item.label} 
              active={activeTab === item.id} 
              onClick={() => setActiveTab(item.id)}
            />
          ))}
          <div className="mt-auto pt-4 border-t border-purple-800">
             <SidebarItem icon={LogOut} label="Logout" onClick={() => navigate('/')} />
          </div>
        </nav>
      </aside>

      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="bg-white shadow px-6 py-4 flex justify-between items-center z-10">
          <h2 className="text-gray-800 font-bold text-lg capitalize">{menu.find(m => m.id === activeTab)?.label}</h2>
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">
               {role === 'admin' ? 'AD' : 'PO'}
             </div>
             <span className="text-sm font-medium">{role === 'admin' ? 'Admin User' : 'Property Owner'}</span>
          </div>
        </header>
        <div className="p-6 overflow-y-auto flex-1">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;