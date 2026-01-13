import React from 'react';
import { BarChart } from 'lucide-react';

const OwnerAnalytics = () => {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8 border-t-4 border-purple-800">
            <div className="flex items-center gap-2 mb-6">
                <BarChart className="text-purple-600 w-6 h-6" />
                <h3 className="text-lg font-bold text-purple-900">Analytics & Insights</h3>
            </div>

            <h4 className="text-sm font-bold text-purple-900 mb-4">Property views (Last 7 days)</h4>

            {/* Simple Bar Chart Visualization */}
            <div className="h-48 flex items-end justify-between px-4 pb-2 border-b border-gray-200 gap-2 md:gap-8">
                <div className="w-full bg-purple-100 rounded-t-md relative group h-1/3 hover:bg-purple-200 transition-all cursor-pointer">
                    <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-bold text-purple-900 opacity-0 group-hover:opacity-100 transition">30</span>
                </div>
                <div className="w-full bg-purple-100 rounded-t-md relative group h-2/5 hover:bg-purple-200 transition-all cursor-pointer">
                    <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-bold text-purple-900 opacity-0 group-hover:opacity-100 transition">45</span>
                </div>
                <div className="w-full bg-purple-100 rounded-t-md relative group h-1/4 hover:bg-purple-200 transition-all cursor-pointer">
                    <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-bold text-purple-900 opacity-0 group-hover:opacity-100 transition">20</span>
                </div>
                <div className="w-full bg-purple-100 rounded-t-md relative group h-3/5 hover:bg-purple-200 transition-all cursor-pointer">
                    <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-bold text-purple-900 opacity-0 group-hover:opacity-100 transition">60</span>
                </div>
                <div className="w-full bg-purple-100 rounded-t-md relative group h-1/2 hover:bg-purple-200 transition-all cursor-pointer">
                    <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-bold text-purple-900 opacity-0 group-hover:opacity-100 transition">50</span>
                </div>
                <div className="w-full bg-purple-100 rounded-t-md relative group h-4/5 hover:bg-purple-200 transition-all cursor-pointer">
                    <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-bold text-purple-900 opacity-0 group-hover:opacity-100 transition">80</span>
                </div>
                <div className="w-full bg-purple-100 rounded-t-md relative group h-2/3 hover:bg-purple-200 transition-all cursor-pointer">
                    <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-bold text-purple-900 opacity-0 group-hover:opacity-100 transition">65</span>
                </div>
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-2 px-2">
                <span>Day 1</span><span>Day 2</span><span>Day 3</span><span>Day 4</span><span>Day 5</span><span>Day 6</span><span>Day 7</span>
            </div>
        </div>
    );
};

export default OwnerAnalytics;
