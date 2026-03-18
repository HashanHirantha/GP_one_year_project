import React from 'react';
import { Reply } from 'lucide-react';

const Inquiries = () => {
    const inquiries = [
        { name: 'Kamal Perera', email: 'Reply by email..', property: 'Modern Apartment, Colombo 03', time: '2 hours ago' },
        { name: 'Nimal Alwis', email: 'Nimal@gmail.com', property: 'Family House, Nugegoda', time: '10 hours ago' },
        { name: 'Sunil Mendis', email: 'Sunil@gmail.com', property: 'Student Boarding, Maharagama', time: '1 day ago' },
    ];

    return (
        <div className="bg-slate-900 rounded-xl border border-slate-800 p-6 mb-8 shadow-sm">
            <h3 className="text-lg font-bold text-slate-100 mb-4">All Inquiries</h3>

            <div className="flex gap-2 mb-6">
                <button className="bg-[#54ACBF] text-white text-xs font-medium px-4 py-1.5 rounded-full shadow-sm">All (122)</button>
                <button className="bg-slate-800 border border-slate-700 text-slate-300 text-xs font-medium px-4 py-1.5 rounded-full hover:bg-slate-700 transition-colors">Unread (22)</button>
                <button className="bg-slate-800 border border-slate-700 text-slate-300 text-xs font-medium px-4 py-1.5 rounded-full hover:bg-slate-700 transition-colors">Replied (100)</button>
            </div>

            <div className="space-y-4">
                {inquiries.map((iq, index) => (
                    <div key={index} className="bg-slate-800/50 p-4 rounded-lg border border-slate-700/50 relative">
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <h4 className="font-bold text-slate-200 text-sm">{iq.name}</h4>
                                <p className="text-xs text-slate-400">{iq.email}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-xs font-medium text-slate-300">{iq.property}</p>
                                <p className="text-xs text-slate-500 mt-1">{iq.time}</p>
                            </div>
                        </div>
                        <p className="text-xs text-slate-300 mb-3 italic">"Is this property available for inspection this weekend...?"</p>

                        <div className="flex justify-end gap-2">
                            <button className="bg-[#54ACBF]/10 hover:bg-[#54ACBF]/20 text-[#54ACBF] text-xs font-medium px-4 py-1.5 rounded flex items-center gap-1 transition-colors shadow-sm border border-[#54ACBF]/20">
                                <Reply size={12} /> Reply
                            </button>
                            <button className="bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium px-4 py-1.5 rounded transition-colors shadow-sm border border-slate-700">
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
