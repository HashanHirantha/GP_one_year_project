import React from 'react';
import { BarChart, Calendar } from 'lucide-react';

const AnalyticsReports = () => {
    return (
        <div className="mb-8">
            <div className="flex items-center gap-2 mb-6">
                <BarChart className="text-purple-600 w-6 h-6" />
                <h3 className="text-lg font-bold text-purple-900">Analytics & Reports</h3>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <span className="text-gray-500 text-xs font-bold uppercase tracking-wider">Monthly Revenue</span>
                    <h3 className="text-2xl font-bold text-purple-900 mt-2">RS. 70,000</h3>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <span className="text-gray-500 text-xs font-bold uppercase tracking-wider">New Users</span>
                    <h3 className="text-2xl font-bold text-purple-900 mt-2">124</h3>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <span className="text-gray-500 text-xs font-bold uppercase tracking-wider">Active Listings</span>
                    <h3 className="text-2xl font-bold text-purple-900 mt-2">53</h3>
                </div>
            </div>

            {/* Generate Reports */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h4 className="font-bold text-purple-900 mb-4">Generate Reports</h4>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Report Type</label>
                        <select className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-purple-500 outline-none text-gray-500">
                            <option>Select Report Type</option>
                            <option>Financial Report</option>
                            <option>User Report</option>
                            <option>Property Report</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Date Range</label>
                        <div className="flex gap-4">
                            <div className="relative flex-1">
                                <input type="text" placeholder="Start Date" className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-purple-500 outline-none" />
                                <Calendar className="absolute right-3 top-2.5 text-gray-400 w-4 h-4" />
                            </div>
                            <div className="relative flex-1">
                                <input type="text" placeholder="End Date" className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-purple-500 outline-none" />
                                <Calendar className="absolute right-3 top-2.5 text-gray-400 w-4 h-4" />
                            </div>
                        </div>
                    </div>
                    <button className="bg-secondary hover:bg-purple-600 text-white text-sm font-bold py-2 px-6 rounded-lg transition-colors shadow-md mt-2">
                        Generate Report
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AnalyticsReports;
