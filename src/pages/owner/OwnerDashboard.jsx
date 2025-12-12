import React, { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { Upload, Save, Reply, Trash2, Building } from 'lucide-react';

// --- Sub Components ---
const OwnerStats = () => (
  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
    {[{l:'Properties',v:'25'}, {l:'Views',v:'140'}, {l:'Messages',v:'34'}, {l:'Revenue',v:'Rs. 1.4L'}]
    .map((s, i) => (
      <div key={i} className="bg-white p-6 rounded shadow-sm border border-gray-100 flex flex-col items-center">
         <span className="text-gray-500 text-sm font-semibold">{s.l}</span>
         <span className="text-2xl font-bold text-primary mt-2">{s.v}</span>
      </div>
    ))}
  </div>
);

const MyProperties = () => (
  <div className="bg-white rounded shadow p-6">
    <div className="flex justify-between items-center mb-4">
      <h3 className="font-bold text-purple-900 flex items-center gap-2"><Building size={18}/> My Properties</h3>
      <button className="bg-secondary text-white text-xs px-3 py-1 rounded">+ Add New</button>
    </div>
    <table className="w-full text-left text-sm text-gray-600">
      <thead className="bg-purple-50 text-purple-900"><tr><th className="p-3">Property</th><th className="p-3">Price</th><th className="p-3">Status</th></tr></thead>
      <tbody className="divide-y divide-gray-100">
        <tr><td className="p-3">Modern Apt 03</td><td>45 M</td><td><span className="text-green-600 bg-green-100 px-2 py-0.5 rounded text-xs">Active</span></td></tr>
        <tr><td className="p-3">Family House</td><td>62 M</td><td><span className="text-yellow-600 bg-yellow-100 px-2 py-0.5 rounded text-xs">Pending</span></td></tr>
      </tbody>
    </table>
  </div>
);

const AddPropertyForm = () => (
  <div className="bg-white p-6 rounded-lg shadow-sm border border-purple-100">
    <h2 className="text-xl font-bold text-purple-900 mb-6">🏠 Add New Property</h2>
    <form className="space-y-4">
      <input type="text" placeholder="Property Name" className="w-full border rounded p-2 text-sm" />
      <div className="flex gap-4">
        <select className="w-1/2 border rounded p-2 text-sm"><option>Apartment</option><option>House</option></select>
        <input type="text" placeholder="Price" className="w-1/2 border rounded p-2 text-sm" />
      </div>
      <textarea className="w-full border rounded p-2 text-sm h-32" placeholder="Description..."></textarea>
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center text-gray-500">
        <Upload size={32} className="mb-2 text-primary" />
        <p className="text-xs">Drag and drop images here</p>
      </div>
      <button className="bg-primary text-white px-6 py-2 rounded font-bold">Submit Property</button>
    </form>
  </div>
);

const Inquiries = () => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
    <h2 className="text-lg font-bold mb-4 text-purple-900">Recent Inquiries</h2>
    {[1,2,3].map(i => (
      <div key={i} className="p-4 hover:bg-gray-50 border-b flex justify-between items-center">
        <div>
          <h4 className="font-bold text-gray-800">Kamal Perera</h4>
          <p className="text-sm text-gray-600">"Is this property available?"</p>
        </div>
        <button className="bg-primary text-white px-3 py-1 rounded text-xs flex items-center gap-1"><Reply size={12} /> Reply</button>
      </div>
    ))}
  </div>
);

const OwnerDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch(activeTab) {
      case 'dashboard': return <><OwnerStats /><MyProperties /></>;
      case 'my-properties': return <MyProperties />;
      case 'add-property': return <AddPropertyForm />;
      case 'inquiries': return <Inquiries />;
      default: return <div className="p-4 bg-white rounded">Module under construction</div>;
    }
  };

  return (
    <DashboardLayout role="owner" activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderContent()}
    </DashboardLayout>
  );
};

export default OwnerDashboard;