import React from 'react';
import { ShieldAlert } from 'lucide-react';

const ContentModeration = () => {
    const reports = [
        { type: 'Property Listing', reporter: 'user #1234', reason: 'Misleading information', date: 'Nov 05 2024', status: 'Under review', statusColor: 'text-yellow-600' },
        { type: 'User Comment', reporter: 'user #5642', reason: 'Inappropriate Content', date: 'Nov 06 2024', status: 'Under review', statusColor: 'text-yellow-600' },
        { type: 'Property photo', reporter: 'user #3412', reason: 'Spam content', date: 'Nov 07 2024', status: 'Resolved', statusColor: 'text-green-600' },
    ];

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
            <div className="flex items-center gap-2 mb-6">
                <ShieldAlert className="text-green-500 w-6 h-6" />
                <h3 className="text-lg font-bold text-purple-900">Content Moderation</h3>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="text-gray-600 text-sm border-b border-gray-200">
                            <th className="py-3 font-bold">Content Type</th>
                            <th className="py-3 font-bold">Reporter</th>
                            <th className="py-3 font-bold">Reason</th>
                            <th className="py-3 font-bold">Date</th>
                            <th className="py-3 font-bold">Status</th>
                            <th className="py-3 font-bold text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm text-gray-700">
                        {reports.map((report, index) => (
                            <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                <td className="py-4 font-medium text-gray-500">{report.type}</td>
                                <td className="py-4 text-gray-500">{report.reporter}</td>
                                <td className="py-4 font-medium">{report.reason}</td>
                                <td className="py-4 text-gray-500">{report.date}</td>
                                <td className="py-4">
                                    <span className={`text-xs font-bold ${report.statusColor}`}>
                                        {report.status}
                                    </span>
                                </td>
                                <td className="py-4 text-center">
                                    <div className="flex justify-center gap-2">
                                        <button className="bg-red-600 hover:bg-red-700 text-white text-xs px-3 py-1 rounded transition-colors font-bold">Review</button>
                                        <button className="bg-gray-500 hover:bg-gray-600 text-white text-xs px-3 py-1 rounded transition-colors font-bold">Dismiss</button>
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
