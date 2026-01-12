import React from 'react';
import { Home, Upload, Plus } from 'lucide-react';

const AddProperty = () => {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8 border-t-4 border-purple-800">
            <div className="flex items-center gap-2 mb-6">
                <Home className="text-purple-600 w-6 h-6" />
                <h3 className="text-lg font-bold text-purple-900">Add new Property</h3>
            </div>

            <form className="space-y-4">
                <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Property name</label>
                    <input type="text" placeholder="e.g. Luxury Villa" className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-1 focus:ring-purple-500 outline-none" />
                </div>
                <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Property type</label>
                    <input type="text" placeholder="Apartment" className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-1 focus:ring-purple-500 outline-none" />
                </div>
                <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Location</label>
                    <input type="text" placeholder="Colombo 03" className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-1 focus:ring-purple-500 outline-none" />
                </div>
                <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Price</label>
                    <input type="text" placeholder="Rs. 10.5 M" className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-1 focus:ring-purple-500 outline-none" />
                </div>
                <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Description</label>
                    <textarea className="w-full border border-gray-300 rounded-md p-2 text-sm h-24 focus:ring-1 focus:ring-purple-500 outline-none" placeholder="Describe your property..."></textarea>
                </div>

                <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Upload Images</label>
                    <div className="border border-gray-300 rounded-md h-32 flex flex-col items-center justify-center text-gray-400 cursor-pointer hover:bg-gray-50 transition">
                        <Plus size={24} className="mb-1" />
                        <span className="text-xs text-center leading-tight">Click to upload<br />PNG, JPG or GIF<br />(max. 5MB)</span>
                    </div>
                </div>

                <div className="flex gap-4 pt-2">
                    <button className="bg-secondary text-white text-sm px-6 py-2 rounded-lg hover:bg-purple-600 transition font-bold shadow-md">Add property</button>
                    <button className="bg-gray-400 text-white text-sm px-6 py-2 rounded-lg hover:bg-gray-500 transition font-bold shadow-md">Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default AddProperty;
