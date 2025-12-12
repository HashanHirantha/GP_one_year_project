import React from 'react';

const SidebarItem = ({ icon: Icon, label, active, onClick }) => (
  <div 
    onClick={onClick}
    className={`flex items-center space-x-3 px-6 py-3 cursor-pointer transition ${active ? 'bg-purple-800 border-l-4 border-white' : 'hover:bg-purple-800 opacity-80'}`}
  >
    <Icon size={20} />
    <span>{label}</span>
  </div>
);

export default SidebarItem;