import React from 'react';

const Bookings = () => {
    const bookings = [
        { property: 'Modern Apartments', guest: 'Kamal perera', status: 'Confirmed', statusColor: 'text-green-600' },
        { property: 'Family House', guest: 'Mike Brown', status: 'Confirmed', statusColor: 'text-green-600' },
        { property: 'Luxury Apartment', guest: 'Sunil Mendis', status: 'Pending', statusColor: 'text-yellow-600' },
    ];

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8 border-t-4 border-purple-800">
            <h3 className="text-lg font-bold text-purple-900 mb-6">Bookings & Reservations</h3>

            {/* Booking Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="border border-gray-100 p-4 rounded-lg shadow-sm text-center">
                    <span className="text-xs font-bold text-gray-500 uppercase">Total Bookings</span>
                    <h4 className="text-2xl font-bold text-purple-900 mt-1">47</h4>
                </div>
                <div className="border border-gray-100 p-4 rounded-lg shadow-sm text-center">
                    <span className="text-xs font-bold text-gray-500 uppercase">Active Bookings</span>
                    <h4 className="text-2xl font-bold text-purple-900 mt-1">18</h4>
                </div>
                <div className="border border-gray-100 p-4 rounded-lg shadow-sm text-center">
                    <span className="text-xs font-bold text-gray-500 uppercase leading-none">Upcoming Checkout<br /><span className="text-[10px] text-gray-400 font-normal">(Next 7 Days)</span></span>
                    <h4 className="text-2xl font-bold text-purple-900 mt-1">10</h4>
                </div>
            </div>

            <h4 className="font-bold text-purple-900 mb-4 text-sm">Booking Calendar</h4>
            <div className="space-y-3">
                {bookings.map((booking, index) => (
                    <div key={index} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border border-gray-100">
                        <div>
                            <h5 className="text-sm font-bold text-gray-800">{booking.property}</h5>
                            <p className="text-xs text-gray-500">{booking.guest}</p>
                            <p className="text-[10px] text-gray-400 mt-0.5">Jun 10-12</p>
                        </div>
                        <span className={`text-xs font-bold ${booking.statusColor}`}>{booking.status}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Bookings;
