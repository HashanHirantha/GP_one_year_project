import React, { useState, useEffect } from 'react';
import { User, Loader, Trash2, Edit2, ShieldAlert } from 'lucide-react';
import { supabase } from '../../config/supabase';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const { data: profiles, error: pErr } = await supabase.from('user_profiles').select('*');
            if (pErr) {
               console.error(pErr);
               alert("CRITICAL ERROR: Could not fetch user_profiles. Is RLS fully granted to 'authenticated' and 'anon'?");
               return;
            }
            
            const { data: roles, error: rErr } = await supabase.from('user_roles').select('*');
            if (rErr) {
               console.warn("Could not fetch user_roles correctly:", rErr);
            }

            const { data: properties, error: propErr } = await supabase.from('properties').select('seller_id');

            const merged = profiles?.map(p => {
                const userRoleData = roles?.find(r => r.user_id === p.user_id);
                // Count how many properties this specific user has explicitly created
                const propCount = properties?.filter(prop => prop.seller_id === p.user_id).length || 0;
                
                return {
                    id: p.user_id,
                    name: p.full_name || 'Guest User',
                    role: userRoleData?.role || 'buyer',
                    phone: p.phone || 'No Phone',
                    properties: propCount,
                };
            }).sort((a, b) => a.role === 'admin' ? -1 : 1) || []; // Show admins first
            
            setUsers(merged);
        } catch (e) {
            console.error("Fetch Error:", e);
        } finally {
            setLoading(false);
        }
    };

    const handleRoleChange = async (userId, newRole) => {
        if (!window.confirm(`Are you extremely sure you wish to permanently upgrade/downgrade this user to the ${newRole.toUpperCase()} role? If selecting BLOCKED, they will be forcibly ejected.`)) return;
        
        try {
            // Because user_roles natively maps to user_id, upgrading is an upsert or direct update
            const { error: updateError } = await supabase
                .from('user_roles')
                .update({ role: newRole })
                .eq('user_id', userId);
                
            if (updateError) {
                // If it fails to update, maybe the row didn't exist strictly yet!
                const { error: insertError } = await supabase
                   .from('user_roles')
                   .insert([{ user_id: userId, role: newRole }]);
                   
                if (insertError) throw insertError;
            }
            
            alert(`User privileges securely transitioned to ${newRole.toUpperCase()}. Realtime tracking will automatically disconnect them if strictly required.`);
            fetchUsers(); // Refresh live view mapping
        } catch (err) {
            console.error("Mutation failed", err);
            alert("Database Error: Could not assign Role. Make sure you strictly have an Admin RLS Policy for Updates.");
        }
    };

    const handleDeleteUser = async (userId) => {
        if (!window.confirm("WARNING: Only Superadmins using service keys can deep-delete Auth Accounts. This action will merely purge their public user profile entirely rendering them silent natively. Proceed?")) return;
        
        try {
            const { error } = await supabase.from('user_profiles').delete().eq('user_id', userId);
            if (error) throw error;
            
            alert("Public Profile Securely Eradicated.");
            setUsers(users.filter(u => u.id !== userId));
        } catch (err) {
            console.error(err);
            alert("Failed to eradicate public profile.");
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                    <User className="text-[#06cc50] w-6 h-6" />
                    <h3 className="text-lg font-bold text-slate-800">User management</h3>
                </div>
                <button onClick={fetchUsers} className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-bold py-2 px-4 rounded-lg flex items-center gap-1 transition-colors shadow-sm">
                    Refresh Feed
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="text-gray-600 text-sm border-b border-gray-200">
                            <th className="py-3 font-bold">User</th>
                            <th className="py-3 font-bold">Role Mutator</th>
                            <th className="py-3 font-bold">Phone Number</th>
                            <th className="py-3 font-bold text-center">Owned Properties</th>
                            <th className="py-3 font-bold text-right">Emergency Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm text-gray-700">
                        {loading ? (
                            <tr>
                                <td colSpan="5" className="py-8 text-center text-gray-400">
                                    <Loader className="animate-spin w-6 h-6 mx-auto mb-2" />
                                    Executing deep extraction across tables...
                                </td>
                            </tr>
                        ) : users.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="py-8 text-center text-gray-400 italic">
                                    No profiles found matching constraints.
                                </td>
                            </tr>
                        ) : (
                            users.map((user, index) => (
                                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                    <td className="py-4 font-semibold flex items-center gap-2">
                                        {user.role === 'admin' && <ShieldAlert size={16} className="text-red-500 fill-current" />}
                                        {user.name}
                                    </td>
                                    <td className="py-4 text-gray-500">
                                        <select 
                                            value={user.role} 
                                            onChange={(e) => handleRoleChange(user.id, e.target.value)}
                                            className="border border-gray-200 rounded p-1 text-xs focus:ring-1 focus:ring-purple-500 outline-none font-bold shadow-sm"
                                        >
                                            <option value="admin">Admin</option>
                                            <option value="seller">Seller</option>
                                            <option value="buyer">Buyer</option>
                                            <option value="blocked" className="text-red-500 font-bold">BLOCKED / BANNED</option>
                                        </select>
                                    </td>
                                    <td className="py-4 text-gray-500">{user.phone}</td>
                                    <td className="py-4 text-center font-bold text-purple-600">{user.properties} Units</td>
                                    <td className="py-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <button onClick={() => handleDeleteUser(user.id)} className="p-1.5 bg-red-50 hover:bg-red-100 text-red-500 hover:text-red-700 font-bold border border-red-200 text-xs px-3 py-1 rounded transition-colors flex items-center gap-1 shadow-sm">
                                                <Trash2 size={14}/> Wipe Profile
                                            </button>
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

export default UserManagement;
