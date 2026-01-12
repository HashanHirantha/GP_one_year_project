import React from 'react';

const OwnerStats = () => {
    const stats = [
        { label: 'properties', value: '25' },
        { label: 'views', value: '140' },
        { label: 'messages', value: '34' },
        { label: 'Total transactions', value: 'RS. 1,40,000' },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col hover:shadow-md transition-shadow">
                    <span className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-2">{stat.label}</span>
                    <h3 className="text-3xl font-bold text-purple-900">{stat.value}</h3>
                </div>
            ))}
        </div>
    );
};

export default OwnerStats;
