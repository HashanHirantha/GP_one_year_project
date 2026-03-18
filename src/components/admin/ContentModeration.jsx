import React from 'react';
import { ShieldAlert } from 'lucide-react';

const ContentModeration = () => {
    const reports = [
        { type: 'Property Listing', reporter: 'user #1234', reason: 'Misleading information', date: 'Nov 05 2024', status: 'Under review', statusColor: 'text-yellow-600' },
        { type: 'User Comment', reporter: 'user #5642', reason: 'Inappropriate Content', date: 'Nov 06 2024', status: 'Under review', statusColor: 'text-yellow-600' },
        { type: 'Property photo', reporter: 'user #3412', reason: 'Spam content', date: 'Nov 07 2024', status: 'Resolved', statusColor: 'text-green-600' },
    ];

    return (
        <div className="bg-slate-900 rounded-xl border border-slate-800 p-6 mb-8 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
                <ShieldAlert className="text-slate-400 w-6 h-6" />
                <h3 className="text-lg font-bold text-slate-100">Content Moderation</h3>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse whitespace-nowrap">
                    <thead>
                        <tr className="text-slate-400 text-sm border-b border-slate-800">
                            <th className="py-3 px-4 font-medium">Content Type</th>
                            <th className="py-3 px-4 font-medium">Reporter</th>
                            <th className="py-3 px-4 font-medium">Reason</th>
                            <th className="py-3 px-4 font-medium">Date</th>
                            <th className="py-3 px-4 font-medium">Status</th>
                            <th className="py-3 px-4 font-medium text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm text-slate-300">
                        {reports.map((report, index) => (
                            <tr key={index} className="border-b border-slate-800/50 hover:bg-slate-800/50 transition-colors">
                                <td className="py-4 px-4 font-medium text-slate-500">{report.type}</td>
                                <td className="py-4 px-4 text-slate-400">{report.reporter}</td>
                                <td className="py-4 px-4 font-semibold text-slate-200">{report.reason}</td>
                                <td className="py-4 px-4 text-slate-500">{report.date}</td>
                                <td className="py-4 px-4">
                                    <span className={`text-xs font-medium tracking-wider uppercase ${report.statusColor}`}>
                                        {report.status}
                                    </span>
                                </td>
                                <td className="py-4 px-4 text-center">
                                    <div className="flex justify-center gap-2">
                                        <button className="bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs px-3 py-1 rounded transition-colors border border-red-500/20">Review</button>
                                        <button className="bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs px-3 py-1 rounded transition-colors border border-slate-700">Dismiss</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ContentModeration;
