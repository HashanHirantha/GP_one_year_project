import React from 'react';

const AdminStats = () => {
    const stats = [
        { label: 'Total Users', value: '10,482' },
        { label: 'Total Properties', value: '5,234' },
        { label: 'Total Transactions', value: 'RS. 80,500' },
        { label: 'Pending Reviews', value: '882' },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => (
                <div key={index} className="bg-slate-900 p-6 rounded-xl border border-slate-800 flex flex-col hover:border-slate-700 transition-colors shadow-sm">
                    <span className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-2">{stat.label}</span>
                    <h3 className="text-3xl font-bold text-slate-100">{stat.value}</h3>
                </div>
            ))}
        </div>
    );
};

export default AdminStats;
