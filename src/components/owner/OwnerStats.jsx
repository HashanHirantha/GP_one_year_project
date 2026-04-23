import React, { useState, useEffect } from 'react';
import { supabase } from '../../config/supabase';
import { useAuth } from '../../context/AuthContext';

const OwnerStats = () => {
    const { user } = useAuth();
    const [stats, setStats] = useState([
        { label: 'properties', value: '0' },
        { label: 'views', value: '0' },
        { label: 'messages', value: '0' }
    ]);

    useEffect(() => {
        if (user) fetchStats();
    }, [user]);

    const fetchStats = async () => {
        try {
            const { data: propsData, error: propsError } = await supabase
                .from('properties')
                .select('id, views')
                .eq('seller_id', user.id);
            
            if (propsError) throw propsError;

            const { count: msgCount, error: msgError } = await supabase
                .from('property_inquiries')
                .select('*', { count: 'exact', head: true })
                .eq('seller_id', user.id);

            if (msgError) console.error("Error fetching messages", msgError);

            const propCount = propsData ? propsData.length : 0;
            const totalViews = propsData ? propsData.reduce((acc, p) => acc + (p.views || 0), 0) : 0;

            setStats([
                { label: 'properties', value: propCount.toString() },
                { label: 'views', value: totalViews.toString() },
                { label: 'messages', value: (msgCount || 0).toString() }
            ]);
        } catch (error) {
            console.error("Error fetching stats", error);
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {stats.map((stat, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col hover:shadow-md transition-shadow">
                    <span className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-2">{stat.label}</span>
                    <h3 className="text-3xl font-bold text-gray-900">{stat.value}</h3>
                </div>
            ))}
        </div>
    );
};

export default OwnerStats;
