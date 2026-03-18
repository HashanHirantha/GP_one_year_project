import React from 'react';

const SidebarItem = ({ icon: Icon, label, active, onClick }) => (
  <div 
    onClick={onClick}
    className={`flex items-center space-x-3 px-6 py-3 cursor-pointer transition-all duration-300 ${active ? 'bg-slate-800 border-l-4 border-[#54ACBF] text-[#54ACBF]' : 'hover:bg-slate-800/50 text-slate-400 hover:text-slate-200 border-l-4 border-transparent'}`}
  >
    <Icon size={20} className={active ? 'text-[#54ACBF]' : 'text-slate-500'} />
    <span className="font-medium tracking-wide">{label}</span>
  </div>
);

export default SidebarItem;