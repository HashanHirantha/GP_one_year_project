import React from 'react';
import { Home, Plus, Eye, Edit2, Trash2 } from 'lucide-react';

const MyProperties = () => {
    const properties = [
        { name: 'Modern Apartment', type: 'Apartment', price: '45.0 M', views: '140', inquiries: '21', status: 'pending', statusColor: 'text-yellow-600' },
        { name: 'Family House', type: 'House', price: '65.0 M', views: '120', inquiries: '34', status: 'Active', statusColor: 'text-green-600' },
        { name: 'Luxury Apartment', type: 'Apartment', price: '45.5 M', views: '120', inquiries: '45', status: 'Active', statusColor: 'text-green-600' },
    ];

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
            <div className="flex items-center gap-2 mb-6">
                <Home className="text-purple-600 w-6 h-6" />
                <h3 className="text-lg font-bold text-purple-900">My properties</h3>
            </div>

            <div className="flex justify-end mb-4">
                <button className="bg-secondary text-white text-sm px-4 py-2 rounded-lg hover:bg-purple-600 transition font-bold">+ add new property</button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="text-gray-600 text-sm border-b border-gray-200">
                            <th className="py-3 font-bold">Property</th>
                            <th className="py-3 font-bold">Type</th>
                            <th className="py-3 font-bold">Price</th>
                            <th className="py-3 font-bold">Views</th>
                            <th className="py-3 font-bold">Inquiries</th>
                            <th className="py-3 font-bold">Status</th>
                            <th className="py-3 font-bold text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm text-gray-700">
                        {properties.map((prop, index) => (
                            <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                <td className="py-4">
                                    <div className="font-semibold">{prop.name}</div>
                                    <div className="text-xs text-gray-400">Colombo 04</div>
                                </td>
                                <td className="py-4 text-gray-500">{prop.type}</td>
                                <td className="py-4">{prop.price}</td>
                                <td className="py-4">{prop.views}</td>
                                <td className="py-4">{prop.inquiries}</td>
                                <td className="py-4">
                                    <span className={`text-xs font-bold italic ${prop.statusColor}`}>
                                        {prop.status}
                                    </span>
                                </td>
                                <td className="py-4 text-center">
                                    <div className="flex justify-center gap-2">
                                        <button className="p-1.5 bg-gray-200 rounded-lg hover:bg-gray-300 transition text-gray-700"><Eye size={16} /></button>
                                        <button className="p-1.5 bg-gray-200 rounded-lg hover:bg-gray-300 transition text-gray-700"><Edit2 size={16} /></button>
                                        <button className="p-1.5 bg-gray-200 rounded-lg hover:bg-gray-300 transition text-gray-700"><Trash2 size={16} /></button>
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
