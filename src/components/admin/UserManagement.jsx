import React from 'react';
import { User, Plus } from 'lucide-react';

const UserManagement = () => {
    const users = [
        { name: 'Kamal Perera', role: 'Property Owner', email: 'kamal@example.com', properties: 25, status: 'Active', statusColor: 'text-green-600 bg-green-100' },
        { name: 'Sunil Alwis', role: 'Buyer', email: 'sunil@example.com', properties: 0, status: 'Active', statusColor: 'text-green-600 bg-green-100' },
        { name: 'Sunil Mendis', role: 'Agent', email: 'sunil@example.com', properties: 12, status: 'Pending', statusColor: 'text-yellow-600 bg-yellow-100' },
    ];

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                    <User className="text-purple-600 w-6 h-6" />
                    <h3 className="text-lg font-bold text-purple-900">User management</h3>
                </div>
                <button className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-bold py-2 px-4 rounded-lg flex items-center gap-1 transition-colors shadow-md">
                    <Plus size={16} /> add new user
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="text-gray-600 text-sm border-b border-gray-200">
                            <th className="py-3 font-bold">User</th>
                            <th className="py-3 font-bold">Role</th>
                            <th className="py-3 font-bold">Email</th>
                            <th className="py-3 font-bold">Properties</th>
                            <th className="py-3 font-bold">Status</th>
                            <th className="py-3 font-bold text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm text-gray-700">
                        {users.map((user, index) => (
                            <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                <td className="py-4 font-semibold">{user.name}</td>
                                <td className="py-4 text-gray-500">{user.role}</td>
                                <td className="py-4 text-gray-500">{user.email}</td>
                                <td className="py-4">{user.properties}</td>
                                <td className="py-4">
                                    <span className={`px-2 py-1 rounded text-xs font-bold ${user.statusColor}`}>
                                        {user.status}
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

export default UserManagement;
