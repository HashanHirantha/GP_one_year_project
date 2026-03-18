import React from 'react';
import { BarChart, Calendar } from 'lucide-react';

const AnalyticsReports = () => {
    return (
        <div className="mb-8">
            <div className="flex items-center gap-2 mb-6">
                <BarChart className="text-slate-400 w-6 h-6" />
                <h3 className="text-lg font-bold text-slate-100">Analytics & Reports</h3>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 shadow-sm">
                    <span className="text-slate-400 text-xs font-medium uppercase tracking-wider">Monthly Revenue</span>
                    <h3 className="text-2xl font-bold text-white mt-2">RS. 70,000</h3>
                </div>
                <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 shadow-sm">
                    <span className="text-slate-400 text-xs font-medium uppercase tracking-wider">New Users</span>
                    <h3 className="text-2xl font-bold text-white mt-2">124</h3>
                </div>
                <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 shadow-sm">
                    <span className="text-slate-400 text-xs font-medium uppercase tracking-wider">Active Listings</span>
                    <h3 className="text-2xl font-bold text-white mt-2">53</h3>
                </div>
            </div>

            {/* Generate Reports */}
            <div className="bg-slate-900 rounded-xl border border-slate-800 p-6 shadow-sm">
                <h4 className="font-bold text-white mb-4">Generate Reports</h4>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">Report Type</label>
                        <select className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-[#54ACBF] outline-none text-slate-200">
                            <option>Select Report Type</option>
                            <option>Financial Report</option>
                            <option>User Report</option>
                            <option>Property Report</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">Date Range</label>
                        <div className="flex gap-4">
                            <div className="relative flex-1">
                                <input type="text" placeholder="Start Date" className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-[#54ACBF] outline-none text-slate-200 placeholder-slate-500" />
                                <Calendar className="absolute right-3 top-2.5 text-slate-500 w-4 h-4" />
                            </div>
                            <div className="relative flex-1">
                                <input type="text" placeholder="End Date" className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-[#54ACBF] outline-none text-slate-200 placeholder-slate-500" />
                                <Calendar className="absolute right-3 top-2.5 text-slate-500 w-4 h-4" />
                            </div>
                        </div>
                    </div>
                    <button className="bg-[#54ACBF] hover:bg-[#26658C] text-white text-sm font-medium py-2 px-6 rounded-lg transition-colors shadow-sm mt-2">
                        Generate Report
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AnalyticsReports;
