import React, { useState, useEffect } from 'react';
import { Home, Plus, Eye, Edit2, Trash2, Loader } from 'lucide-react';
import { supabase } from '../../config/supabase';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

const MyProperties = () => {
    const { user } = useAuth();
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            fetchProperties();
        }
    }, [user]);

    const fetchProperties = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('properties')
                .select('*')
                .eq('seller_id', user.id)
                .order('created_at', { ascending: false });

            if (error) throw error;
            setProperties(data || []);
        } catch (error) {
            console.error('Error fetching properties:', error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this property?")) {
            try {
                const { error } = await supabase.from('properties').delete().eq('id', id);
                if (error) throw error;
                setProperties(properties.filter(p => p.id !== id));
            } catch (error) {
                console.error("Error deleting property:", error);
                alert("Failed to delete property.");
            }
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
            <div className="flex items-center gap-2 mb-6">
                <Home className="text-[#06cc50] w-6 h-6" />
                <h3 className="text-lg font-bold text-gray-900">My properties</h3>
            </div>

            <div className="flex justify-end mb-4">
                <Link to="/dashboard/seller/add-property" className="bg-[#06cc50] text-white text-sm px-4 py-2 rounded-lg hover:bg-[#05b346] transition font-bold">
                    + add new property
                </Link>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="text-gray-600 text-sm border-b border-gray-200">
                            <th className="py-3 font-bold">Property</th>
                            <th className="py-3 font-bold">Type</th>
                            <th className="py-3 font-bold">Price</th>
                            <th className="py-3 font-bold">Status</th>
                            <th className="py-3 font-bold text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm text-gray-700">
                        {loading ? (
                            <tr>
                                <td colSpan="5" className="py-8 text-center text-gray-400">
                                    <Loader className="animate-spin w-6 h-6 mx-auto mb-2 text-[#06cc50]" />
                                    Loading your properties...
                                </td>
                            </tr>
                        ) : properties.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="py-8 text-center text-gray-400 italic">
                                    You haven't listed any properties yet.
                                </td>
                            </tr>
                        ) : (
                            properties.map((prop) => (
                                <tr key={prop.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                    <td className="py-4">
                                        <div className="font-semibold">{prop.title}</div>
                                        <div className="text-xs text-gray-400">{prop.city || 'N/A'}</div>
                                    </td>
                                    <td className="py-4 text-gray-500">{prop.property_type}</td>
                                    <td className="py-4">Rs. {prop.price?.toLocaleString()}</td>
                                    <td className="py-4">
                                        <span className={`text-xs font-bold italic ${prop.status === 'available' ? 'text-green-600' : 'text-gray-500'}`}>
                                            {prop.status}
                                        </span>
                                    </td>
                                    <td className="py-4 text-center">
                                        <div className="flex justify-center gap-2">
                                            <Link to={`/property/${prop.id}`} className="p-1.5 bg-gray-200 rounded-lg hover:bg-gray-300 transition text-gray-700"><Eye size={16} /></Link>
                                            <Link to={`/dashboard/seller/edit-property/${prop.id}`} className="p-1.5 bg-gray-200 rounded-lg hover:bg-green-100 hover:text-green-600 transition text-gray-700"><Edit2 size={16} /></Link>
                                            <button onClick={() => handleDelete(prop.id)} className="p-1.5 bg-gray-200 rounded-lg hover:bg-red-100 hover:text-red-600 transition text-gray-700"><Trash2 size={16} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyProperties;
