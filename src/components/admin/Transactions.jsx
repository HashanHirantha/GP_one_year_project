import React from 'react';
import { CreditCard, Download } from 'lucide-react';

const Transactions = () => {
    const transactions = [
        { id: '#123456', transaction: 'Luxury Home Booking Fee', buyer: 'John Doe', amount: '4,000', date: 'Nov 15 2024', status: 'Completed', statusColor: 'text-green-600' },
        { id: '#123457', transaction: 'Apartment Advance Payment', buyer: 'Sunil Silva', amount: '100,000', date: 'Nov 20 2024', status: 'Processing', statusColor: 'text-yellow-600' },
        { id: '#123458', transaction: 'Garden House Booking Fee', buyer: 'Nimal Perera', amount: '5,000', date: 'Nov 21 2024', status: 'Completed', statusColor: 'text-green-600' },
    ];

    return (
        <div className="bg-slate-900 rounded-xl border border-slate-800 p-6 mb-8 shadow-sm">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                    <CreditCard className="text-slate-400 w-6 h-6" />
                    <h3 className="text-lg font-bold text-slate-100">Transactions</h3>
                </div>
                <button className="bg-[#54ACBF] hover:bg-[#26658C] text-white text-sm font-bold py-2 px-4 rounded-lg flex items-center gap-1 transition-colors shadow-sm">
                    <Download size={16} /> Export Report
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse whitespace-nowrap">
                    <thead>
                        <tr className="text-slate-400 text-sm border-b border-slate-800">
                            <th className="py-3 px-4 font-medium">Transaction ID</th>
                            <th className="py-3 px-4 font-medium">Transaction</th>
                            <th className="py-3 px-4 font-medium">Buyer</th>
                            <th className="py-3 px-4 font-medium">Amount</th>
                            <th className="py-3 px-4 font-medium">Date</th>
                            <th className="py-3 px-4 font-medium">Status</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm text-slate-300">
                        {transactions.map((txn, index) => (
                            <tr key={index} className="border-b border-slate-800/50 hover:bg-slate-800/50 transition-colors">
                                <td className="py-4 px-4 font-medium text-slate-500">{txn.id}</td>
                                <td className="py-4 px-4 font-semibold text-slate-200">{txn.transaction}</td>
                                <td className="py-4 px-4 text-slate-400">{txn.buyer}</td>
                                <td className="py-4 px-4 font-medium text-slate-300">{txn.amount}</td>
                                <td className="py-4 px-4 text-slate-500">{txn.date}</td>
                                <td className="py-4 px-4">
                                    <span className={`text-xs font-medium uppercase tracking-wider ${txn.statusColor}`}>
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

export default Transactions;
