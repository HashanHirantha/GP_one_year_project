import React, { useState, useEffect } from 'react';
import { Reply, CheckCircle, Loader } from 'lucide-react';
import { supabase } from '../../config/supabase';
import { useAuth } from '../../context/AuthContext';

const Inquiries = () => {
    const { user } = useAuth();
    const [inquiries, setInquiries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all'); // all, pending, replied
    const [replyText, setReplyText] = useState({});
    const [submittingReply, setSubmittingReply] = useState(false);

    useEffect(() => {
        if (user) fetchInquiries();
    }, [user]);

    const fetchInquiries = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('property_inquiries')
                .select(`id, property_id, buyer_id, message, reply, status, created_at, properties(title)`)
                .eq('seller_id', user.id)
                .order('created_at', { ascending: false });
            
            if (error) throw error;
            
            let iqs = data || [];
            if (iqs.length > 0) {
                const bIds = [...new Set(iqs.map(i => i.buyer_id))];
                const { data: profs } = await supabase
                    .from('user_profiles')
                    .select('user_id, full_name, email')
                    .in('user_id', bIds);
                    
                const pMap = {};
                if (profs) profs.forEach(p => pMap[p.user_id] = p);
                
                iqs = iqs.map(i => ({
                    ...i,
                    sender_name: pMap[i.buyer_id]?.full_name || 'Anonymous User',
                    sender_email: pMap[i.buyer_id]?.email || 'No Email'
                }));
            }
            
            setInquiries(iqs);
        } catch (err) {
            console.error("Error fetching inquiries:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleReplyChange = (id, text) => {
        setReplyText(prev => ({ ...prev, [id]: text }));
    };

    const handleSendReply = async (id) => {
        const text = replyText[id];
        if (!text?.trim()) return alert("Please enter a reply message.");

        setSubmittingReply(true);
        try {
            const { error } = await supabase
                .from('property_inquiries')
                .update({ reply: text, status: 'replied' })
                .eq('id', id);

            if (error) throw error;
            
            handleReplyChange(id, ''); // clear the box
            fetchInquiries(); // refresh list to show reply
        } catch (err) {
            console.error("Error sending reply:", err);
            alert("Failed to send reply");
        } finally {
            setSubmittingReply(false);
        }
    };

    const filteredInquiries = inquiries.filter(i => filter === 'all' ? true : i.status === filter);

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8 border-t-4 border-[#06cc50]">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Property Inquiries</h3>

            <div className="flex gap-2 mb-6">
                <button onClick={() => setFilter('all')} className={`text-xs font-bold px-4 py-1.5 rounded-full transition ${filter === 'all' ? 'bg-[#06cc50] text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`}>
                    All ({inquiries.length})
                </button>
                <button onClick={() => setFilter('pending')} className={`text-xs font-bold px-4 py-1.5 rounded-full transition ${filter === 'pending' ? 'bg-[#06cc50] text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`}>
                    Pending ({inquiries.filter(i => i.status === 'pending').length})
                </button>
                <button onClick={() => setFilter('replied')} className={`text-xs font-bold px-4 py-1.5 rounded-full transition ${filter === 'replied' ? 'bg-[#06cc50] text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`}>
                    Replied ({inquiries.filter(i => i.status === 'replied').length})
                </button>
            </div>

            {loading ? (
                <div className="flex justify-center p-8">
                    <Loader className="animate-spin text-[#06cc50]" />
                </div>
            ) : filteredInquiries.length === 0 ? (
                <div className="text-center p-8 text-gray-400 font-medium">No inquiries found.</div>
            ) : (
                <div className="space-y-6">
                    {filteredInquiries.map((iq) => (
                        <div key={iq.id} className="bg-gray-50 p-5 rounded-xl border border-gray-100 flex flex-col gap-3 relative shadow-sm">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h4 className="font-bold text-gray-800 text-sm">{iq.sender_name}</h4>
                                    <p className="text-xs text-gray-500">{iq.sender_email}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs font-bold text-green-900 bg-green-100 px-2 py-1 rounded inline-block">{iq.properties?.title || 'Unknown Property'}</p>
                                    <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-wide">{new Date(iq.created_at).toLocaleString()}</p>
                                </div>
                            </div>

                            <p className="text-sm text-gray-700 font-medium p-3 bg-white rounded border border-gray-200 shadow-sm leading-relaxed whitespace-pre-wrap">"{iq.message}"</p>

                            {iq.status === 'replied' ? (
                                <div className="mt-2 bg-green-50 p-4 rounded border border-green-100">
                                    <div className="text-xs font-bold text-green-800 mb-1 flex items-center gap-1"><Reply size={12}/> Your Reply</div>
                                    <p className="text-xs text-gray-700 whitespace-pre-wrap">{iq.reply}</p>
                                </div>
                            ) : (
                                <div className="mt-2 flex flex-col gap-2">
                                    <textarea
                                        value={replyText[iq.id] || ''}
                                        onChange={(e) => handleReplyChange(iq.id, e.target.value)}
                                        placeholder="Type your reply here..."
                                        className="w-full text-xs p-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
                                        rows="2"
                                    />
                                    <div className="flex justify-end gap-2">
                                        <button 
                                            onClick={() => handleSendReply(iq.id)} 
                                            disabled={submittingReply}
                                            className="bg-[#06cc50] hover:bg-[#05b346] text-white text-xs font-bold px-5 py-2 rounded flex items-center gap-1 transition shadow-sm disabled:opacity-50"
                                        >
                                            {submittingReply ? <Loader size={12} className="animate-spin" /> : <CheckCircle size={14} />} 
                                            Send Reply
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Inquiries;
