import React from 'react';
import { Home, Plus, Eye, Edit2, Trash2 } from 'lucide-react';

const MyProperties = () => {
    const properties = [
        { name: 'Modern Apartment', type: 'Apartment', price: '45.0 M', views: '140', inquiries: '21', status: 'pending', statusColor: 'text-yellow-600' },
        { name: 'Family House', type: 'House', price: '65.0 M', views: '120', inquiries: '34', status: 'Active', statusColor: 'text-green-600' },
        { name: 'Luxury Apartment', type: 'Apartment', price: '45.5 M', views: '120', inquiries: '45', status: 'Active', statusColor: 'text-green-600' },
    ];

    return (
        <div className="bg-slate-900 rounded-xl border border-slate-800 p-6 mb-8 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
                <Home className="text-slate-400 w-6 h-6" />
                <h3 className="text-lg font-bold text-slate-100">My properties</h3>
            </div>

            <div className="flex justify-end mb-4">
                <button className="bg-[#54ACBF] hover:bg-[#26658C] text-white text-sm px-4 py-2 rounded-lg transition font-medium shadow-sm flex items-center gap-1">
                    <Plus size={16} /> Add new property
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse whitespace-nowrap">
                    <thead>
                        <tr className="text-slate-400 text-sm border-b border-slate-800">
                            <th className="py-3 px-4 font-medium">Property</th>
                            <th className="py-3 px-4 font-medium">Type</th>
                            <th className="py-3 px-4 font-medium">Price</th>
                            <th className="py-3 px-4 font-medium">Views</th>
                            <th className="py-3 px-4 font-medium">Inquiries</th>
                            <th className="py-3 px-4 font-medium">Status</th>
                            <th className="py-3 px-4 font-medium text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm text-slate-300">
                        {properties.map((prop, index) => (
                            <tr key={index} className="border-b border-slate-800/50 hover:bg-slate-800/50 transition-colors">
                                <td className="py-4 px-4">
                                    <div className="font-medium text-slate-200">{prop.name}</div>
                                    <div className="text-xs text-slate-500">Colombo 04</div>
                                </td>
                                <td className="py-4 px-4 text-slate-400">{prop.type}</td>
                                <td className="py-4 px-4 font-medium text-slate-300">{prop.price}</td>
                                <td className="py-4 px-4 font-medium">{prop.views}</td>
                                <td className="py-4 px-4 font-medium">{prop.inquiries}</td>
                                <td className="py-4 px-4">
                                    <span className={`text-[10px] uppercase font-medium tracking-wider px-2 py-1 rounded-full ${prop.statusColor.replace('text-', 'bg-opacity-10 bg-').replace('text-', 'text-')}`}>
                                        {prop.status}
                                    </span>
                                </td>
                                <td className="py-4 px-4 text-center">
                                    <div className="flex justify-center gap-2">
                                        <button className="p-1.5 bg-slate-800 rounded-lg hover:bg-slate-700 transition text-slate-300 hover:text-white border border-slate-700 shadow-sm"><Eye size={16} /></button>
                                        <button className="p-1.5 bg-slate-800 rounded-lg hover:bg-slate-700 transition text-slate-300 hover:text-white border border-slate-700 shadow-sm"><Edit2 size={16} /></button>
                                        <button className="p-1.5 bg-red-500/10 rounded-lg hover:bg-red-500/20 transition text-red-400 border border-red-500/20 shadow-sm"><Trash2 size={16} /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyProperties;
