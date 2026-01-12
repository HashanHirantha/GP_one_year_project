import React from 'react';
import { Settings } from 'lucide-react';

const OwnerSettings = () => {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8 border-t-4 border-purple-800">
            <div className="flex items-center gap-2 mb-6">
                <Settings className="text-purple-600 w-6 h-6" />
                <h3 className="text-lg font-bold text-purple-900">Settings</h3>
            </div>

            <h4 className="text-sm font-bold text-purple-900 mb-4">Profile Information</h4>
            <form className="space-y-4">
                <div>
                    <input type="text" defaultValue="Kamal Perera" className="w-full border border-gray-300 rounded-md p-2.5 text-sm focus:ring-1 focus:ring-purple-500 outline-none text-gray-700" />
                </div>
                <div>
                    <input type="email" defaultValue="Kamal@gmail.com" className="w-full border border-gray-300 rounded-md p-2.5 text-sm focus:ring-1 focus:ring-purple-500 outline-none text-gray-700" />
                </div>
                <div>
                    <input type="text" defaultValue="+94 770000100" className="w-full border border-gray-300 rounded-md p-2.5 text-sm focus:ring-1 focus:ring-purple-500 outline-none text-gray-700" />
                </div>
                <div>
                    <input type="text" defaultValue="Colombo, Sri Lanka" className="w-full border border-gray-300 rounded-md p-2.5 text-sm focus:ring-1 focus:ring-purple-500 outline-none text-gray-700" />
                </div>

                <button className="bg-secondary text-white text-sm px-6 py-2 rounded-lg hover:bg-purple-600 transition font-bold shadow-md">Save Changes</button>
            </form>
        </div>
    );
};

export default OwnerSettings;
