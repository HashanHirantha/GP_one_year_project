import React from 'react';
import { Settings } from 'lucide-react';

const OwnerSettings = () => {
    return (
        <div className="bg-slate-900 rounded-xl border border-slate-800 p-6 mb-8 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
                <Settings className="text-slate-400 w-6 h-6" />
                <h3 className="text-lg font-bold text-slate-100">Settings</h3>
            </div>

            <h4 className="text-sm font-medium text-slate-200 mb-4">Profile Information</h4>
            <form className="space-y-4">
                <div>
                    <input type="text" defaultValue="Kamal Perera" className="w-full bg-slate-800 border border-slate-700 rounded-md p-2.5 text-sm focus:ring-2 focus:ring-[#54ACBF] outline-none text-slate-200 placeholder-slate-500" />
                </div>
                <div>
                    <input type="email" defaultValue="Kamal@gmail.com" className="w-full bg-slate-800 border border-slate-700 rounded-md p-2.5 text-sm focus:ring-2 focus:ring-[#54ACBF] outline-none text-slate-200 placeholder-slate-500" />
                </div>
                <div>
                    <input type="text" defaultValue="+94 770000100" className="w-full bg-slate-800 border border-slate-700 rounded-md p-2.5 text-sm focus:ring-2 focus:ring-[#54ACBF] outline-none text-slate-200 placeholder-slate-500" />
                </div>
                <div>
                    <input type="text" defaultValue="Colombo, Sri Lanka" className="w-full bg-slate-800 border border-slate-700 rounded-md p-2.5 text-sm focus:ring-2 focus:ring-[#54ACBF] outline-none text-slate-200 placeholder-slate-500" />
                </div>

                <button className="bg-[#54ACBF] hover:bg-[#26658C] text-white text-sm px-6 py-2.5 rounded-lg transition font-medium shadow-sm">Save Changes</button>
            </form>
        </div>
    );
};

export default OwnerSettings;
