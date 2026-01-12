import React from 'react';

const RecentActivity = () => {
    const activities = [
        { action: 'New user registration', time: '5 min ago' },
        { action: 'Property listing approval', time: '15 min ago' },
        { action: 'Payment processed successfully', time: '1 hour ago' },
    ];

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
            <h3 className="text-lg font-bold text-purple-900 mb-4">Recent System Activity</h3>
            <div className="space-y-4">
                {activities.map((item, index) => (
                    <div key={index} className="flex justify-between items-center border-b border-gray-50 last:border-0 pb-3 last:pb-0">
                        <span className="text-gray-700 font-medium text-sm">{item.action}</span>
                        <span className="text-gray-400 text-xs">{item.time}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecentActivity;
