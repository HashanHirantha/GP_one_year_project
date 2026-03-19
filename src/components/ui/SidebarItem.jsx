import React from 'react';

const SidebarItem = ({ icon: Icon, label, active, onClick }) => (
  <div 
    onClick={onClick}
    className={`flex items-center space-x-3 px-6 py-3 cursor-pointer transition ${active ? 'bg-[#06cc50]/10 border-r-4 border-[#06cc50] text-[#06cc50] font-bold' : 'hover:bg-gray-50 text-gray-500 hover:text-gray-900 border-r-4 border-transparent font-medium'}`}
  >
    <Icon size={20} />
    <span>{label}</span>
  </div>
);

export default SidebarItem;
