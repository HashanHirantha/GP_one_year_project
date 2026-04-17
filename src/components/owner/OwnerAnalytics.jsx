import React, { useState, useEffect } from 'react';
import { BarChart } from 'lucide-react';
import { supabase } from '../../config/supabase';
import { useAuth } from '../../context/AuthContext';

const OwnerAnalytics = () => {
    const { user } = useAuth();
    const [topProperties, setTopProperties] = useState([]);
    
    useEffect(() => {
        if (user) fetchTopProperties();
    }, [user]);

    const fetchTopProperties = async () => {
        try {
            const { data, error } = await supabase
                .from('properties')
                .select('title, views')
                .eq('seller_id', user.id)
                .order('views', { ascending: false })
                .limit(5);
            
            if (error) throw error;
            setTopProperties(data || []);
        } catch (error) {
            console.error("Error fetching top properties:", error);
        }
    };

    const maxViews = topProperties.length > 0 ? Math.max(...topProperties.map(p => p.views || 0)) : 100;

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8 border-t-4 border-[#06cc50]">
            <div className="flex items-center gap-2 mb-6">
                <BarChart className="text-[#06cc50] w-6 h-6" />
                <h3 className="text-lg font-bold text-gray-900">Analytics & Insights</h3>
            </div>

            <h4 className="text-sm font-bold text-purple-900 mb-4">Top Properties by Views</h4>

            {topProperties.length > 0 ? (
                <div className="flex flex-col gap-4 mt-6">
                    {topProperties.map((prop, idx) => {
                        const widthPercentage = maxViews > 0 ? Math.max((prop.views / maxViews) * 100, 5) : 5;
                        return (
                            <div key={idx} className="flex flex-col gap-1">
                                <div className="flex justify-between text-xs font-bold text-gray-700">
                                    <span className="truncate max-w-[70%]">{prop.title}</span>
                                    <span>{prop.views || 0} views</span>
                                </div>
                                <div className="w-full bg-gray-100 rounded-full h-2.5">
                                    <div 
                                        className="bg-purple-600 h-2.5 rounded-full transition-all duration-1000 ease-out" 
                                        style={{ width: `${widthPercentage}%` }}
                                    ></div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <p className="text-sm text-gray-500 italic">No view data available yet. Start sharing your properties!</p>
            )}
        </div>
    );
};

export default OwnerAnalytics;
