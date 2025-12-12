import React, { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';

// Sub-components for Admin
const AdminOverview = () => (
  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
    {[{l:'Users',v:'10,482'}, {l:'Properties',v:'5,234'}, {l:'Revenue',v:'Rs. 60K'}, {l:'Reviews',v:'882'}]
    .map((s, i) => (
      <div key={i} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
         <span className="text-gray-500 text-xs font-bold uppercase">{s.l}</span>
         <h3 className="text-2xl font-bold text-primary mt-2">{s.v}</h3>
      </div>
    ))}
  </div>
);

const UserManagement = () => (
  <div className="bg-white rounded-lg shadow p-6">
    <h3 className="font-bold text-lg mb-4">User Management</h3>
    <table className="w-full text-left text-sm text-gray-600">
      <thead className="bg-gray-50 uppercase text-xs"><tr><th className="p-3">User</th><th className="p-3">Role</th><th className="p-3">Status</th></tr></thead>
      <tbody>
         <tr><td className="p-3">Kamal Perera</td><td>Owner</td><td className="text-green-600">Active</td></tr>
         <tr><td className="p-3">Sunil Mendis</td><td>Agent</td><td className="text-yellow-600">Pending</td></tr>
      </tbody>
    </table>
  </div>
);

const AdminSettings = () => (
  <div className="bg-white p-6 rounded-lg shadow-sm">
    <h3 className="font-bold text-purple-900 mb-4">System Settings</h3>
    <div className="space-y-4 max-w-lg">
      <input type="text" defaultValue="Smart Property Finder" className="w-full border rounded p-2 text-sm"/>
      <button className="bg-primary text-white px-4 py-2 rounded text-xs font-bold">Save</button>
    </div>
  </div>
);

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch(activeTab) {
      case 'dashboard': return <AdminOverview />;
      case 'users': return <UserManagement />;
      case 'settings': return <AdminSettings />;
      default: return <div className="p-4 bg-white rounded">Module under construction</div>;
    }
  };

  return (
    <DashboardLayout role="admin" activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderContent()}
    </DashboardLayout>
  );
};

export default AdminDashboard;