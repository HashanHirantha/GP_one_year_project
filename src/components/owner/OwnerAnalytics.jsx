import React from 'react';
import { BarChart } from 'lucide-react';

const OwnerAnalytics = () => {
    return (
        <div className="bg-slate-900 rounded-xl border border-slate-800 p-6 mb-8 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
                <BarChart className="text-slate-400 w-6 h-6" />
                <h3 className="text-lg font-bold text-slate-100">Analytics & Insights</h3>
            </div>

            <h4 className="text-sm font-medium text-slate-200 mb-4">Property views (Last 7 days)</h4>

            {/* Simple Bar Chart Visualization */}
            <div className="h-48 flex items-end justify-between px-4 pb-2 border-b border-slate-800 gap-2 md:gap-8">
                <div className="w-full bg-slate-800 rounded-t-md relative group h-1/3 hover:bg-slate-700 transition-all cursor-pointer">
                    <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-slate-300 opacity-0 group-hover:opacity-100 transition">30</span>
                </div>
                <div className="w-full bg-slate-800 rounded-t-md relative group h-2/5 hover:bg-slate-700 transition-all cursor-pointer">
                    <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-slate-300 opacity-0 group-hover:opacity-100 transition">45</span>
                </div>
                <div className="w-full bg-slate-800 rounded-t-md relative group h-1/4 hover:bg-slate-700 transition-all cursor-pointer">
                    <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-slate-300 opacity-0 group-hover:opacity-100 transition">20</span>
                </div>
                <div className="w-full bg-[#54ACBF]/60 rounded-t-md relative group h-3/5 hover:bg-[#54ACBF]/80 transition-all cursor-pointer shadow-[0_0_10px_rgba(84,172,191,0.2)]">
                    <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-[#54ACBF] opacity-0 group-hover:opacity-100 transition">60</span>
                </div>
                <div className="w-full bg-slate-800 rounded-t-md relative group h-1/2 hover:bg-slate-700 transition-all cursor-pointer">
                    <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-slate-300 opacity-0 group-hover:opacity-100 transition">50</span>
                </div>
                <div className="w-full bg-slate-800 rounded-t-md relative group h-4/5 hover:bg-slate-700 transition-all cursor-pointer">
                    <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-slate-300 opacity-0 group-hover:opacity-100 transition">80</span>
                </div>
                <div className="w-full bg-slate-800 rounded-t-md relative group h-2/3 hover:bg-slate-700 transition-all cursor-pointer">
                    <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-slate-300 opacity-0 group-hover:opacity-100 transition">65</span>
                </div>
            </div>
            <div className="flex justify-between text-xs text-slate-500 mt-2 px-2">
                <span>Day 1</span><span>Day 2</span><span>Day 3</span><span>Day 4</span><span>Day 5</span><span>Day 6</span><span>Day 7</span>
            </div>
        </div>
    );
};

export default OwnerAnalytics;
