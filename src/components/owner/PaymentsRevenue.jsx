import React from 'react';
import { CreditCard } from 'lucide-react';

const PaymentsRevenue = () => {
    const transactions = [
        { date: 'Nov 05 2024', transaction: 'Luxury House Booking Fee', buyer: 'John Doe', amount: '2,000', status: 'completed', statusColor: 'text-green-600' },
        { date: 'Nov 06 2024', transaction: 'Apartment Advance payment', buyer: 'Sunil Silva', amount: '100,000', status: 'processing', statusColor: 'text-yellow-600' },
        { date: 'Nov 07 2024', transaction: 'Garden House Booking Fee', buyer: 'Mike Brown', amount: '5,000', status: 'completed', statusColor: 'text-green-600' },
    ];

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8 border-t-4 border-purple-800">
            <div className="flex items-center gap-2 mb-6">
                <CreditCard className="text-purple-600 w-6 h-6" />
                <h3 className="text-lg font-bold text-purple-900">Payments & Revenue</h3>
            </div>

            {/* Revenue Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="border border-gray-100 p-4 rounded-lg shadow-sm">
                    <span className="text-xs font-bold text-gray-500 uppercase">Total Revenue</span>
                    <h4 className="text-xl font-bold text-purple-900 mt-1">Rs. 560,000</h4>
                </div>
                <div className="border border-gray-100 p-4 rounded-lg shadow-sm bg-orange-50/50">
                    <span className="text-xs font-bold text-gray-500 uppercase">Pending Payments</span>
                    <h4 className="text-xl font-bold text-purple-900 mt-1">Rs. 25K</h4>
                </div>
                <div className="border border-gray-100 p-4 rounded-lg shadow-sm">
                    <span className="text-xs font-bold text-gray-500 uppercase">This Month</span>
                    <h4 className="text-xl font-bold text-purple-900 mt-1">Rs. 90K</h4>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="text-gray-600 text-xs border-b border-gray-200 uppercase">
                            <th className="py-2 font-bold">Date</th>
                            <th className="py-2 font-bold">Transaction</th>
                            <th className="py-2 font-bold">Buyer</th>
                            <th className="py-2 font-bold">Amount</th>
                            <th className="py-2 font-bold">Status</th>
                        </tr>
                    </thead>
                    <tbody className="text-xs text-gray-700 font-semibold">
                        {transactions.map((txn, index) => (
                            <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                <td className="py-3 text-gray-500">{txn.date}</td>
                                <td className="py-3">{txn.transaction}</td>
                                <td className="py-3 text-gray-500">{txn.buyer}</td>
                                <td className="py-3">{txn.amount}</td>
                                <td className="py-3">
                                    <span className={`${txn.statusColor}`}>
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
