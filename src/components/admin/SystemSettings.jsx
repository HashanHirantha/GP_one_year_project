import React from 'react';
import { Settings } from 'lucide-react';

const SystemSettings = () => {
    return (
        <div>
            <div className="flex items-center gap-2 mb-6">
                <Settings className="text-slate-400 w-6 h-6" />
                <h3 className="text-lg font-bold text-slate-100">System settings</h3>
            </div>

            <div className="space-y-6">
                {/* General Settings */}
                <div className="bg-slate-900 rounded-xl border border-slate-800 p-6 shadow-sm">
                    <h4 className="font-bold text-slate-100 mb-4">General Settings</h4>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-1">Site Name</label>
                            <input type="text" defaultValue="Smart Property Finder" className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-sm focus:ring-2 focus:ring-[#54ACBF] outline-none text-slate-200" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-1">Admin Email</label>
                            <input type="email" defaultValue="admin@spf.com" className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-sm focus:ring-2 focus:ring-[#54ACBF] outline-none text-slate-200" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-1">Time Zone</label>
                            <select className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-sm focus:ring-2 focus:ring-[#54ACBF] outline-none text-slate-200">
                                <option>Asia/Colombo (UTC +05:30)</option>
                            </select>
                        </div>
                        <button className="bg-[#54ACBF] hover:bg-[#26658C] text-white text-sm font-medium py-2 px-6 rounded-lg transition-colors shadow-sm w-fit mt-2">
                            Save Settings
                        </button>
                    </div>
                </div>

                {/* Security Settings */}
                <div className="bg-slate-900 rounded-xl border border-slate-800 p-6 shadow-sm">
                    <h4 className="font-bold text-slate-100 mb-4">Security Settings</h4>
                    <div className="space-y-3">
                        <label className="flex items-center space-x-3 text-sm text-slate-300 cursor-pointer">
                            <input type="checkbox" className="form-checkbox h-4 w-4 text-[#54ACBF] rounded border-slate-700 focus:ring-[#54ACBF] bg-slate-800" />
                            <span className="font-medium">Enable two-factor authentication</span>
                        </label>
                        <label className="flex items-center space-x-3 text-sm text-slate-300 cursor-pointer">
                            <input type="checkbox" defaultChecked className="form-checkbox h-4 w-4 text-[#54ACBF] rounded border-slate-700 focus:ring-[#54ACBF] bg-slate-800" />
                            <span className="font-medium">Require strong passwords</span>
                        </label>
                        <label className="flex items-center space-x-3 text-sm text-slate-300 cursor-pointer">
                            <input type="checkbox" className="form-checkbox h-4 w-4 text-[#54ACBF] rounded border-slate-700 focus:ring-[#54ACBF] bg-slate-800" />
                            <span className="font-medium">Force login notifications</span>
                        </label>
                        <button className="bg-[#54ACBF] hover:bg-[#26658C] text-white text-sm font-medium py-2 px-6 rounded-lg transition-colors shadow-sm w-fit mt-4">
                            Update Security
                        </button>
                    </div>
                </div>

                {/* Backup & Maintenance */}
                <div className="bg-slate-900 rounded-xl border border-slate-800 p-6 shadow-sm">
                    <h4 className="font-bold text-slate-100 mb-4">Backup & Maintenace</h4>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-1">Backup Schedule</label>
                            <select className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-sm focus:ring-2 focus:ring-[#54ACBF] outline-none text-slate-200">
                                <option>Daily at 12:00 pm</option>
                            </select>
                        </div>
                        <div className="flex gap-4 mt-4">
                            <button className="bg-[#54ACBF] hover:bg-[#26658C] text-white text-sm font-medium py-2 px-6 rounded-lg transition-colors shadow-sm w-fit">
                                Schedule Backup
                            </button>
                            <button className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium py-2 px-6 rounded-lg transition-colors shadow-sm border border-slate-700 w-fit">
                                Backup Now
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default SystemSettings;
