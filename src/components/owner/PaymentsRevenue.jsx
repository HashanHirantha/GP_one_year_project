import React from 'react';
import { CreditCard } from 'lucide-react';

const PaymentsRevenue = () => {
    const transactions = [
        { date: 'Nov 05 2024', transaction: 'Luxury House Booking Fee', buyer: 'John Doe', amount: '2,000', status: 'completed', statusColor: 'text-green-600' },
        { date: 'Nov 06 2024', transaction: 'Apartment Advance payment', buyer: 'Sunil Silva', amount: '100,000', status: 'processing', statusColor: 'text-yellow-600' },
        { date: 'Nov 07 2024', transaction: 'Garden House Booking Fee', buyer: 'Mike Brown', amount: '5,000', status: 'completed', statusColor: 'text-green-600' },
    ];

    return (
        <div className="bg-slate-900 rounded-xl border border-slate-800 p-6 mb-8 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
                <CreditCard className="text-slate-400 w-6 h-6" />
                <h3 className="text-lg font-bold text-slate-100">Payments & Revenue</h3>
            </div>

            {/* Revenue Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-slate-800/50 border border-slate-700/50 p-4 rounded-lg shadow-sm">
                    <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Total Revenue</span>
                    <h4 className="text-xl font-bold text-slate-100 mt-1">Rs. 560,000</h4>
                </div>
                <div className="bg-[#54ACBF]/10 border border-[#54ACBF]/20 p-4 rounded-lg shadow-sm">
                    <span className="text-xs font-medium text-[#54ACBF] uppercase tracking-wider">Pending Payments</span>
                    <h4 className="text-xl font-bold text-slate-100 mt-1">Rs. 25K</h4>
                </div>
                <div className="bg-slate-800/50 border border-slate-700/50 p-4 rounded-lg shadow-sm">
                    <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">This Month</span>
                    <h4 className="text-xl font-bold text-slate-100 mt-1">Rs. 90K</h4>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse whitespace-nowrap">
                    <thead>
                        <tr className="text-slate-400 text-xs border-b border-slate-800 uppercase tracking-wider">
                            <th className="py-2 px-4 font-medium">Date</th>
                            <th className="py-2 px-4 font-medium">Transaction</th>
                            <th className="py-2 px-4 font-medium">Buyer</th>
                            <th className="py-2 px-4 font-medium">Amount</th>
                            <th className="py-2 px-4 font-medium">Status</th>
                        </tr>
                    </thead>
                    <tbody className="text-xs text-slate-300 font-medium">
                        {transactions.map((txn, index) => (
                            <tr key={index} className="border-b border-slate-800/50 hover:bg-slate-800/50 transition-colors">
                                <td className="py-3 px-4 text-slate-500">{txn.date}</td>
                                <td className="py-3 px-4 text-slate-200">{txn.transaction}</td>
                                <td className="py-3 px-4 text-slate-400">{txn.buyer}</td>
                                <td className="py-3 px-4 font-semibold text-slate-300">{txn.amount}</td>
                                <td className="py-3 px-4">
                                    <span className={`uppercase tracking-wider text-[10px] px-2 py-1 rounded-full ${txn.statusColor.replace('text-', 'bg-opacity-10 bg-').replace('text-', 'text-')}`}>
                                        {txn.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentsRevenue;
