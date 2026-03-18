import React from 'react';

const Bookings = () => {
    const bookings = [
        { property: 'Modern Apartments', guest: 'Kamal perera', status: 'Confirmed', statusColor: 'text-green-600' },
        { property: 'Family House', guest: 'Mike Brown', status: 'Confirmed', statusColor: 'text-green-600' },
        { property: 'Luxury Apartment', guest: 'Sunil Mendis', status: 'Pending', statusColor: 'text-yellow-600' },
    ];

    return (
        <div className="bg-slate-900 rounded-xl border border-slate-800 p-6 mb-8 shadow-sm">
            <h3 className="text-lg font-bold text-slate-100 mb-6">Bookings & Reservations</h3>

            {/* Booking Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-slate-800/50 border border-slate-700/50 p-4 rounded-lg shadow-sm text-center">
                    <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Total Bookings</span>
                    <h4 className="text-2xl font-bold text-slate-100 mt-1">47</h4>
                </div>
                <div className="bg-slate-800/50 border border-slate-700/50 p-4 rounded-lg shadow-sm text-center">
                    <span className="text-xs font-medium text-[#54ACBF] uppercase tracking-wider">Active Bookings</span>
                    <h4 className="text-2xl font-bold text-slate-100 mt-1">18</h4>
                </div>
                <div className="bg-slate-800/50 border border-slate-700/50 p-4 rounded-lg shadow-sm text-center">
                    <span className="text-xs font-medium text-slate-400 uppercase leading-none tracking-wider">Upcoming Checkout<br /><span className="text-[10px] text-slate-500 font-normal mt-1 block">(Next 7 Days)</span></span>
                    <h4 className="text-2xl font-bold text-slate-100 mt-1">10</h4>
                </div>
            </div>

            <h4 className="font-medium text-slate-200 mb-4 text-sm">Booking Calendar</h4>
            <div className="space-y-3">
                {bookings.map((booking, index) => (
                    <div key={index} className="flex justify-between items-center bg-slate-800/50 p-3 rounded-lg border border-slate-700/50">
                        <div>
                            <h5 className="text-sm font-semibold text-slate-200">{booking.property}</h5>
                            <p className="text-xs text-slate-400">{booking.guest}</p>
                            <p className="text-[10px] text-[#54ACBF] mt-0.5 font-medium tracking-wider uppercase">Jun 10-12</p>
                        </div>
                        <span className={`text-xs font-medium tracking-wider uppercase ${booking.statusColor}`}>{booking.status}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Bookings;
