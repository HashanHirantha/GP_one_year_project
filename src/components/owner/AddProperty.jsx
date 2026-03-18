import React from 'react';
import { Home, Upload, Plus } from 'lucide-react';

const AddProperty = () => {
    return (
        <div className="bg-slate-900 rounded-xl border border-slate-800 p-6 mb-8 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
                <Home className="text-slate-400 w-6 h-6" />
                <h3 className="text-lg font-bold text-slate-100">Add new Property</h3>
            </div>

            <form className="space-y-4">
                <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">Property name</label>
                    <input type="text" placeholder="e.g. Luxury Villa" className="w-full bg-slate-800 border border-slate-700 rounded-md p-3 text-sm focus:ring-2 focus:ring-[#54ACBF] outline-none text-slate-200 placeholder-slate-500" />
                </div>
                <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">Property type</label>
                    <input type="text" placeholder="Apartment" className="w-full bg-slate-800 border border-slate-700 rounded-md p-3 text-sm focus:ring-2 focus:ring-[#54ACBF] outline-none text-slate-200 placeholder-slate-500" />
                </div>
                <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">Location</label>
                    <input type="text" placeholder="Colombo 03" className="w-full bg-slate-800 border border-slate-700 rounded-md p-3 text-sm focus:ring-2 focus:ring-[#54ACBF] outline-none text-slate-200 placeholder-slate-500" />
                </div>
                <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">Price</label>
                    <input type="text" placeholder="Rs. 10.5 M" className="w-full bg-slate-800 border border-slate-700 rounded-md p-3 text-sm focus:ring-2 focus:ring-[#54ACBF] outline-none text-slate-200 placeholder-slate-500" />
                </div>
                <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">Description</label>
                    <textarea className="w-full bg-slate-800 border border-slate-700 rounded-md p-3 text-sm h-24 focus:ring-2 focus:ring-[#54ACBF] outline-none text-slate-200 placeholder-slate-500" placeholder="Describe your property..."></textarea>
                </div>

                <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">Upload Images</label>
                    <div className="bg-slate-800/50 border border-dashed border-slate-700 rounded-md h-32 flex flex-col items-center justify-center text-slate-400 cursor-pointer hover:bg-slate-800 hover:text-slate-300 transition-colors">
                        <Plus size={24} className="mb-1" />
                        <span className="text-xs text-center leading-tight">Click to upload<br />PNG, JPG or GIF<br />(max. 5MB)</span>
                    </div>
                </div>

                <div className="flex gap-4 pt-2">
                    <button className="bg-[#54ACBF] hover:bg-[#26658C] text-white text-sm px-6 py-2.5 rounded-lg transition font-medium shadow-sm">Add property</button>
                    <button className="bg-transparent border border-slate-700 text-slate-300 hover:bg-slate-800 text-sm px-6 py-2.5 rounded-lg transition font-medium">Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default AddProperty;
