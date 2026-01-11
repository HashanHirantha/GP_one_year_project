import React from 'react';
import { CreditCard, Download } from 'lucide-react';

const Transactions = () => {
    const transactions = [
        { id: '#123456', transaction: 'Luxury Home Booking Fee', buyer: 'John Doe', amount: '4,000', date: 'Nov 15 2024', status: 'Completed', statusColor: 'text-green-600' },
        { id: '#123457', transaction: 'Apartment Advance Payment', buyer: 'Sunil Silva', amount: '100,000', date: 'Nov 20 2024', status: 'Processing', statusColor: 'text-yellow-600' },
        { id: '#123458', transaction: 'Garden House Booking Fee', buyer: 'Nimal Perera', amount: '5,000', date: 'Nov 21 2024', status: 'Completed', statusColor: 'text-green-600' },
    ];

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                    <CreditCard className="text-purple-600 w-6 h-6" />
                    <h3 className="text-lg font-bold text-purple-900">Transactions</h3>
                </div>
                <button className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-bold py-2 px-4 rounded-lg flex items-center gap-1 transition-colors shadow-md">
                    <Download size={16} /> Export Report
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="text-gray-600 text-sm border-b border-gray-200">
                            <th className="py-3 font-bold">Transaction ID</th>
                            <th className="py-3 font-bold">Transaction</th>
                            <th className="py-3 font-bold">Buyer</th>
                            <th className="py-3 font-bold">Amount</th>
                            <th className="py-3 font-bold">Date</th>
                            <th className="py-3 font-bold">Status</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm text-gray-700">
                        {transactions.map((txn, index) => (
                            <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                <td className="py-4 font-medium text-gray-500">{txn.id}</td>
                                <td className="py-4 font-semibold">{txn.transaction}</td>
                                <td className="py-4 text-gray-500">{txn.buyer}</td>
                                <td className="py-4 font-bold">{txn.amount}</td>
                                <td className="py-4 text-gray-500">{txn.date}</td>
                                <td className="py-4">
                                    <span className={`text-xs font-bold uppercase ${txn.statusColor}`}>
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
