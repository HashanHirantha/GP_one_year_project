import React from 'react';
import { Home, Plus } from 'lucide-react';

const PropertyManagement = () => {
    const properties = [
        { name: 'Luxury Home', owner: 'John Doe', location: 'Colombo', price: '50,000,000', status: 'Listed', statusColor: 'text-green-600 bg-green-100' },
        { name: 'Modern Apartment', owner: 'Smith Blade', location: 'Nugegoda', price: '15,000,000', status: 'Pending Review', statusColor: 'text-yellow-600 bg-yellow-100' },
        { name: 'Garden House', owner: 'Mike Brown', location: 'Maharagama', price: '80,250,000', status: 'Listed', statusColor: 'text-green-600 bg-green-100' },
    ];

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                    <Home className="text-purple-600 w-6 h-6" />
                    <h3 className="text-lg font-bold text-purple-900">Property management</h3>
                </div>
                <button className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-bold py-2 px-4 rounded-lg flex items-center gap-1 transition-colors shadow-md">
                    <Plus size={16} /> add new property
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="text-gray-600 text-sm border-b border-gray-200">
                            <th className="py-3 font-bold">Property name</th>
                            <th className="py-3 font-bold">Owner</th>
                            <th className="py-3 font-bold">Location</th>
                            <th className="py-3 font-bold">Price</th>
                            <th className="py-3 font-bold">Status</th>
                            <th className="py-3 font-bold text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm text-gray-700">
                        {properties.map((prop, index) => (
                            <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                <td className="py-4 font-semibold">{prop.name}</td>
                                <td className="py-4 text-gray-500">{prop.owner}</td>
                                <td className="py-4 text-gray-500">{prop.location}</td>
                                <td className="py-4">{prop.price}</td>
                                <td className="py-4">
                                    <span className={`px-2 py-1 rounded text-xs font-bold ${prop.statusColor}`}>
                                        {prop.status}
                                    </span>
                                </td>
                                <td className="py-4 text-center">
                                    <div className="flex justify-center gap-2">
                                        <button className="bg-gray-400 hover:bg-gray-500 text-white text-xs px-3 py-1 rounded transition-colors">Edit</button>
                                        <button className="bg-gray-400 hover:bg-gray-500 text-white text-xs px-3 py-1 rounded transition-colors">Delete</button>
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
