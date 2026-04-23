import React, { useState, useEffect } from 'react';
import { Home, Plus, Loader, Trash2, Eye, Edit2 } from 'lucide-react';
import { supabase } from '../../config/supabase';
import { Link } from 'react-router-dom';

const PropertyManagement = () => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAllProperties();
    }, []);

    const fetchAllProperties = async () => {
        try {
            setLoading(true);
                const { data: props, error } = await supabase
                    .from('properties')
                    .select('*')
                    .order('created_at', { ascending: false });

                if (error) throw error;
                
                const { data: profiles, error: pError } = await supabase
                    .from('user_profiles')
                    .select('user_id, full_name');
                    
                const merged = props?.map(prop => {
                    const sellerObj = profiles?.find(p => p.user_id === prop.seller_id);
                    return {
                        ...prop,
                        owner_name: sellerObj?.full_name || 'Unknown User'
                    };
                }) || [];

                setProperties(merged);
            } catch (error) {
            console.error('Error fetching all properties:', error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("CRITICAL ADMIN ACTION: Are you sure you want to permanently delete this property and fully purge all its associated images from the Storage Server?")) {
            try {
                // 1. Fetch associated image URLs to clean up Storage Buckets
                const { data: images } = await supabase
                   .from('property_images')
                   .select('image_url')
                   .eq('property_id', id);

                if (images && images.length > 0) {
                    const fileNames = images.map(img => `properties/${img.image_url.split('/').pop()}`);
                    // 2. Eradicate from Supabase Storage securely
                    await supabase.storage.from('property-images').remove(fileNames);
                }

                // 3. Drop relational DB Row (Cascades drop property_images bindings automatically if configured in Postgres)
                const { error } = await supabase.from('properties').delete().eq('id', id);
                if (error) throw error;
                
                alert("Deep Database Purge Complete.");
                setProperties(properties.filter(p => p.id !== id));
            } catch (error) {
                console.error("Error heavily deleting property:", error);
                alert("Failed to execute deep deletion schema over property.");
            }
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                    <Home className="text-[#06cc50] w-6 h-6" />
                    <h3 className="text-lg font-bold text-slate-800">Property management</h3>
                </div>
                <Link to="/dashboard/admin/add-property" className="bg-[#06cc50] hover:bg-[#05b346] text-white text-sm font-bold py-2 px-4 rounded-lg flex items-center gap-1 transition-colors shadow-md">
                    <Plus size={16} /> add new property
                </Link>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="text-gray-600 text-sm border-b border-gray-200">
                            <th className="py-3 font-bold">Property name</th>
                            <th className="py-3 font-bold">Owner</th>
                            <th className="py-3 font-bold">Location</th>
                            <th className="py-3 font-bold">Price</th>
                            <th className="py-3 font-bold">Status</th>
                            <th className="py-3 font-bold text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm text-gray-700">
                        {loading ? (
                            <tr>
                                <td colSpan="6" className="py-8 text-center text-gray-400">
                                    <Loader className="animate-spin w-6 h-6 mx-auto mb-2" />
                                    Loading all properties...
                                </td>
                            </tr>
                        ) : properties.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="py-8 text-center text-gray-400 italic">
                                    No properties found in the database.
                                </td>
                            </tr>
                        ) : (
                            properties.map((prop) => (
                                <tr key={prop.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                    <td className="py-4 font-semibold">{prop.title}</td>
                                    <td className="py-4 text-gray-500">{prop.owner_name}</td>
                                    <td className="py-4 text-gray-500">{prop.city || 'N/A'}</td>
                                    <td className="py-4">Rs. {prop.price?.toLocaleString()}</td>
                                    <td className="py-4">
                                        <span className={`px-2 py-1 rounded text-xs font-bold ${prop.status === 'available' ? 'text-green-600 bg-green-100' : 'text-gray-600 bg-gray-100'}`}>
                                            {prop.status}
                                        </span>
                                    </td>
                                    <td className="py-4 text-center">
                                        <div className="flex justify-center gap-2">
                                            <Link to={`/property/${prop.id}`} className="p-1.5 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded transition-colors"><Eye size={16}/></Link>
                                            <Link to={`/dashboard/admin/edit-property/${prop.id}`} className="p-1.5 bg-gray-200 hover:bg-blue-100 text-gray-700 hover:text-blue-600 rounded transition-colors"><Edit2 size={16}/></Link>
                                            <button onClick={() => handleDelete(prop.id)} className="p-1.5 bg-gray-200 hover:bg-red-100 text-gray-700 hover:text-red-600 rounded transition-colors"><Trash2 size={16}/></button>
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

export default PropertyManagement;
