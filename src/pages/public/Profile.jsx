import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import { User, Mail, Phone, Save, Loader, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../config/supabase';
import { Navigate, Link } from 'react-router-dom';

const Profile = () => {
  const { user, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [myInquiries, setMyInquiries] = useState([]);

  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    email: '', // Ready-only, driven by auth.users payload for security by default
  });

  useEffect(() => {
    if (user) {
      fetchProfile();
    } else if (!authLoading) {
      setLoading(false);
    }
  }, [user, authLoading]);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('full_name, phone, email')
        .eq('user_id', user.id)
        .maybeSingle();
        
      if (error) throw error;
      
      setFormData({
        full_name: data?.full_name || user.user_metadata?.full_name || '',
        phone: data?.phone || '',
        email: data?.email || user.email 
      });
      
      // Fetch Inquiries
      const { data: iqData } = await supabase
        .from('property_inquiries')
        .select('id, message, reply, status, created_at, properties(title)')
        .eq('buyer_id', user.id)
        .order('created_at', { ascending: false });
        
      if (iqData) setMyInquiries(iqData);
      
    } catch (err) {
      console.error("Error fetching profile:", err);
      setMessage({ text: 'Error fetching your profile data. Please try refreshing.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ text: '', type: '' });
    setSaving(true);
    
    try {
      const { error } = await supabase
        .from('user_profiles')
        .upsert({
          user_id: user.id,
          full_name: formData.full_name,
          phone: formData.phone,
          email: formData.email
        }, { onConflict: 'user_id' });
        
      if (error) throw error;
      
      // Explicitly override Auth Profile metadata mapping to force Navbar reactive updates globally
      const { error: authError } = await supabase.auth.updateUser({
          data: {
              full_name: formData.full_name,
              phone: formData.phone
          }
      });
      if (authError) console.warn("Failed to update core auth metadata:", authError);
      
      setMessage({ text: 'Profile successfully updated and synchronized globally!', type: 'success' });
    } catch (err) {
      console.error("Error updating profile:", err);
      setMessage({ text: 'Could not update profile. ' + err.message, type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  if (authLoading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!user) return <Navigate to="/login" />;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Header */}
      <div className="bg-primary text-white pt-32 pb-16 text-center px-4 mb-4">
        <motion.h1
          initial={{ opacity: 0, scale: 0.5, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="text-4xl font-bold font-serif mb-2"
        >
          Your <span className="text-accent">Profile</span>
        </motion.h1>
      </div>

      <main className="container mx-auto px-4 pb-16 flex-1 max-w-2xl mt-8">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <User className="text-purple-600" /> Account Details
            </h2>
            
            {message.text && (
                <div className={`p-4 mb-6 rounded-lg text-sm font-medium flex items-center gap-2 ${message.type === 'error' ? 'bg-red-50 text-red-600 border border-red-200' : 'bg-green-50 text-green-600 border border-green-200'}`}>
                    {message.type === 'error' && <AlertCircle size={16} />} 
                    {message.text}
                </div>
            )}

            {loading ? (
                <div className="flex justify-center p-12">
                   <Loader className="animate-spin text-purple-600 w-8 h-8" />
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-1">
                      <label className="block text-sm font-bold text-gray-700">Full Name</label>
                      <div className="relative">
                          <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input 
                              type="text" 
                              name="full_name"
                              value={formData.full_name}
                              onChange={handleChange}
                              placeholder="Enter your name"
                              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none transition"
                          />
                      </div>
                  </div>

                  <div className="space-y-1">
                      <label className="block text-sm font-bold text-gray-700">Email Address (Locked)</label>
                      <div className="relative">
                          <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input 
                              type="email" 
                              value={formData.email}
                              disabled
                              className="w-full pl-10 pr-4 py-3 border border-gray-200 bg-gray-100 text-gray-500 cursor-not-allowed rounded-lg outline-none"
                          />
                      </div>
                      <p className="text-xs text-gray-400 mt-1">To change your email, please contact a system administrator.</p>
                  </div>

                  <div className="space-y-1">
                      <label className="block text-sm font-bold text-gray-700">Phone Number</label>
                      <div className="relative">
                          <Phone size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input 
                              type="tel" 
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              placeholder="e.g. 077 123 4567"
                              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none transition"
                          />
                      </div>
                  </div>

                  <div className="pt-4 mt-8 border-t border-gray-100 flex justify-end">
                      <button 
                          type="submit" 
                          disabled={saving}
                          className="bg-purple-700 text-white font-bold py-3 px-8 rounded-lg hover:bg-purple-800 transition shadow-md hover:shadow-lg disabled:opacity-75 flex items-center justify-center min-w-[150px]"
                      >
                          {saving ? <Loader size={18} className="animate-spin" /> : <><Save size={18} className="mr-2" />Update & Save Profile</>}
                      </button>
                  </div>
                </form>
            )}
          </div>
        </div>

        {/* My Inquiries Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden mt-8">
            <div className="p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <Mail className="text-purple-600 w-6 h-6" /> My Sent Inquiries
                </h2>
                
                {myInquiries.length === 0 ? (
                    <div className="text-center p-8 bg-gray-50 rounded-xl text-gray-500 text-sm border border-gray-100">
                        You haven't sent any inquiries yet. Check out some <Link to="/properties" className="text-purple-600 font-bold hover:underline">properties</Link> and find a match!
                    </div>
                ) : (
                    <div className="space-y-4">
                        {myInquiries.map(iq => (
                            <div key={iq.id} className="bg-gray-50 rounded-xl p-5 border border-gray-100 relative shadow-sm">
                                <div className="flex justify-between items-start mb-3">
                                    <h3 className="font-bold text-gray-900">{iq.properties?.title || 'Unknown Property'}</h3>
                                    <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest ${iq.status === 'replied' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                        {iq.status}
                                    </span>
                                </div>
                                
                                <div className="mb-4">
                                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Your Message</p>
                                    <p className="text-sm text-gray-700 bg-white p-3 rounded border border-gray-200">{iq.message}</p>
                                </div>

                                {iq.status === 'replied' && iq.reply && (
                                    <div className="bg-purple-50 p-4 rounded-lg border border-purple-100 mt-2">
                                        <div className="text-xs font-bold text-purple-800 mb-1">Owner's Reply</div>
                                        <p className="text-sm text-gray-800 whitespace-pre-wrap leading-relaxed">{iq.reply}</p>
                                    </div>
                                )}
                                <div className="text-[10px] text-gray-400 mt-3 text-right">Sent on {new Date(iq.created_at).toLocaleString()}</div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;
