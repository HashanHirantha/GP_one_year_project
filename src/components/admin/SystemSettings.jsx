import React from 'react';
import { Settings } from 'lucide-react';

const SystemSettings = () => {
    return (
        <div>
            <div className="flex items-center gap-2 mb-6">
                <Settings className="text-purple-600 w-6 h-6" />
                <h3 className="text-lg font-bold text-purple-900">System settings</h3>
            </div>

            <div className="space-y-6">
                {/* General Settings */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h4 className="font-bold text-purple-900 mb-4">General Settings</h4>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Site Name</label>
                            <input type="text" defaultValue="Smart Property Finder" className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-purple-500 outline-none text-gray-600" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Admin Email</label>
                            <input type="email" defaultValue="admin@spf.com" className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-purple-500 outline-none text-gray-600" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Time Zone</label>
                            <select className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-purple-500 outline-none text-gray-500">
                                <option>Asia/Colombo (UTC +05:30)</option>
                            </select>
                        </div>
                        <button className="bg-secondary hover:bg-purple-600 text-white text-sm font-bold py-2 px-6 rounded-lg transition-colors shadow-md w-fit">
                            Save Settings
                        </button>
                    </div>
                </div>

                {/* Security Settings */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h4 className="font-bold text-purple-900 mb-4">Security Settings</h4>
                    <div className="space-y-3">
                        <label className="flex items-center space-x-3 text-sm text-gray-700 cursor-pointer">
                            <input type="checkbox" className="form-checkbox h-4 w-4 text-purple-600 rounded border-gray-300 focus:ring-purple-500" />
                            <span className="font-semibold">Enable two-factor authentication</span>
                        </label>
                        <label className="flex items-center space-x-3 text-sm text-gray-700 cursor-pointer">
                            <input type="checkbox" defaultChecked className="form-checkbox h-4 w-4 text-purple-600 rounded border-gray-300 focus:ring-purple-500" />
                            <span className="font-semibold">Require strong passwords</span>
                        </label>
                        <label className="flex items-center space-x-3 text-sm text-gray-700 cursor-pointer">
                            <input type="checkbox" className="form-checkbox h-4 w-4 text-purple-600 rounded border-gray-300 focus:ring-purple-500" />
                            <span className="font-semibold">Force login notifications</span>
                        </label>
                        <button className="bg-secondary hover:bg-purple-600 text-white text-sm font-bold py-2 px-6 rounded-lg transition-colors shadow-md w-fit mt-2">
                            Update Security
                        </button>
                    </div>
                </div>

                {/* Backup & Maintenance */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h4 className="font-bold text-purple-900 mb-4">Backup & Maintenace</h4>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Backup Schedule</label>
                            <select className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-purple-500 outline-none text-gray-500">
                                <option>Daily at 12:00 pm</option>
                            </select>
                        </div>
                        <div className="flex gap-4">
                            <button className="bg-secondary hover:bg-purple-600 text-white text-sm font-bold py-2 px-6 rounded-lg transition-colors shadow-md w-fit">
                                Schedule Backup
                            </button>
                            <button className="bg-gray-500 hover:bg-gray-600 text-white text-sm font-bold py-2 px-6 rounded-lg transition-colors shadow-md w-fit">
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
