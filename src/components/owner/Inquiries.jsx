import React from 'react';
import { Reply } from 'lucide-react';

const Inquiries = () => {
    const inquiries = [
        { name: 'Kamal Perera', email: 'Reply by email..', property: 'Modern Apartment, Colombo 03', time: '2 hours ago' },
        { name: 'Nimal Alwis', email: 'Nimal@gmail.com', property: 'Family House, Nugegoda', time: '10 hours ago' },
        { name: 'Sunil Mendis', email: 'Sunil@gmail.com', property: 'Student Boarding, Maharagama', time: '1 day ago' },
    ];

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8 border-t-4 border-purple-800">
            <h3 className="text-lg font-bold text-purple-900 mb-4">All Inquiries</h3>

            <div className="flex gap-2 mb-6">
                <button className="bg-purple-600 text-white text-xs font-bold px-4 py-1.5 rounded-full">All (122)</button>
                <button className="bg-gray-200 text-gray-600 text-xs font-bold px-4 py-1.5 rounded-full hover:bg-gray-300 transition">Unread (22)</button>
                <button className="bg-gray-200 text-gray-600 text-xs font-bold px-4 py-1.5 rounded-full hover:bg-gray-300 transition">Replied (100)</button>
            </div>

            <div className="space-y-4">
                {inquiries.map((iq, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-100 relative">
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <h4 className="font-bold text-gray-800 text-sm">{iq.name}</h4>
                                <p className="text-xs text-gray-500">{iq.email}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-xs font-bold text-purple-900">{iq.property}</p>
                                <p className="text-xs text-gray-400 mt-1">{iq.time}</p>
                            </div>
                        </div>
                        <p className="text-xs text-gray-600 mb-3 italic">"Is this property available for inspection this weekend...?"</p>

                        <div className="flex justify-end gap-2">
                            <button className="bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold px-4 py-1.5 rounded flex items-center gap-1 transition shadow-sm">
                                <Reply size={12} /> Reply
                            </button>
                            <button className="bg-gray-400 hover:bg-gray-500 text-white text-xs font-bold px-4 py-1.5 rounded transition shadow-sm">
                                Mark as read
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Inquiries;
