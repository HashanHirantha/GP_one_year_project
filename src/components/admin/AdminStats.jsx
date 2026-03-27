import React, { useState, useEffect } from 'react';
import { supabase } from '../../config/supabase';

const AdminStats = () => {
    const [userCount, setUserCount] = useState('...');
    const [propCount, setPropCount] = useState('...');
    const [favCount, setFavCount] = useState('...');
    const [viewsCount, setViewsCount] = useState('...');

    useEffect(() => {
        const fetchCounts = async () => {
            try {
                const { count: uCount, error: uErr } = await supabase.from('user_profiles').select('*', { count: 'exact', head: true });
                if (!uErr && uCount !== null) setUserCount(uCount.toString());

                const { data: props, error: pErr } = await supabase.from('properties').select('id, views');
                if (!pErr && props) {
                    setPropCount(props.length.toString());
                    const totalViews = props.reduce((acc, curr) => acc + (curr.views || 0), 0);
                    setViewsCount(totalViews.toString());
                }
                
                const { count: fCount, error: fErr } = await supabase.from('favorites').select('*', { count: 'exact', head: true });
                if (!fErr && fCount !== null) setFavCount(fCount.toString());
            } catch (e) {
                console.error("Failed to fetch admin stats counts:", e);
            }
        };
        fetchCounts();
    }, []);

    const stats = [
        { label: 'Total Users', value: userCount },
        { label: 'Total Properties', value: propCount },
        { label: 'Total Views', value: viewsCount },
        { label: 'Total Favorites Saved', value: favCount },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col hover:shadow-md transition-shadow">
                    <span className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-2">{stat.label}</span>
                    <h3 className="text-3xl font-bold text-purple-900">{stat.value}</h3>
                </div>
            ))}
        </div>
    );
};

export default AdminStats;
