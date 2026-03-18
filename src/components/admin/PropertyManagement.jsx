import React from 'react';
import { Home, Plus } from 'lucide-react';

const PropertyManagement = () => {
    const properties = [
        { name: 'Luxury Home', owner: 'John Doe', location: 'Colombo', price: '50,000,000', status: 'Listed', statusColor: 'text-green-600 bg-green-100' },
        { name: 'Modern Apartment', owner: 'Smith Blade', location: 'Nugegoda', price: '15,000,000', status: 'Pending Review', statusColor: 'text-yellow-600 bg-yellow-100' },
        { name: 'Garden House', owner: 'Mike Brown', location: 'Maharagama', price: '80,250,000', status: 'Listed', statusColor: 'text-green-600 bg-green-100' },
    ];

    return (
        <div className="bg-slate-900 rounded-xl border border-slate-800 p-6 mb-8 shadow-sm">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                    <Home className="text-slate-400 w-6 h-6" />
                    <h3 className="text-lg font-bold text-white">Property management</h3>
                </div>
                <button className="bg-[#54ACBF] hover:bg-[#26658C] text-white text-sm font-medium py-2 px-4 rounded-lg flex items-center gap-1 transition-colors shadow-sm">
                    <Plus size={16} /> Add new property
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse whitespace-nowrap">
                    <thead>
                        <tr className="text-slate-400 text-sm border-b border-slate-800">
                            <th className="py-3 px-4 font-medium">Property name</th>
                            <th className="py-3 px-4 font-medium">Owner</th>
                            <th className="py-3 px-4 font-medium">Location</th>
                            <th className="py-3 px-4 font-medium">Price</th>
                            <th className="py-3 px-4 font-medium">Status</th>
                            <th className="py-3 px-4 font-medium text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm text-slate-300">
                        {properties.map((prop, index) => (
                            <tr key={index} className="border-b border-slate-800/50 hover:bg-slate-800/50 transition-colors">
                                <td className="py-4 px-4 font-medium text-slate-200">{prop.name}</td>
                                <td className="py-4 px-4 text-slate-400">{prop.owner}</td>
                                <td className="py-4 px-4 text-slate-400">{prop.location}</td>
                                <td className="py-4 px-4 font-medium text-slate-300">{prop.price}</td>
                                <td className="py-4 px-4">
                                    <span className={`px-2 py-1 rounded text-xs font-medium ${prop.statusColor.replace('bg-', 'bg-opacity-10 bg-')}`}>
                                        {prop.status}
                                    </span>
                                </td>
                                <td className="py-4 px-4 text-center">
                                    <div className="flex justify-center gap-2">
                                        <button className="bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs px-3 py-1 rounded transition-colors border border-slate-700">Edit</button>
                                        <button className="bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs px-3 py-1 rounded transition-colors border border-red-500/20">Delete</button>
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

export default PropertyManagement;
