import React, { useState, useEffect } from 'react';
import { supabase } from '../../config/supabase';
import { MessageSquare, Mail, User, Clock, Check, Archive, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ContactMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, unread, read, archived
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      const { error } = await supabase
        .from('contact_messages')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) throw error;
      setMessages(messages.map(msg => msg.id === id ? { ...msg, status: newStatus } : msg));
      return true;
    } catch (error) {
      console.error('Error updating status:', error);
      alert(`Failed to update status: ${error.message || 'Unknown error'}`);
      return false;
    }
  };

  const handleReplyAndMarkReplied = async (e, msg) => {
    e.stopPropagation();

    const updated = await updateStatus(msg.id, 'replied');
    if (!updated) return;

    setExpandedId(null);
    const replySubject = encodeURIComponent(`Re: ${msg.subject || ''}`);
    window.location.href = `mailto:${msg.email}?subject=${replySubject}`;
  };

  const deleteMessage = async (id) => {
    if (!window.confirm('Are you sure you want to delete this message?')) return;
    try {
      const { error } = await supabase
        .from('contact_messages')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setMessages(messages.filter(msg => msg.id !== id));
    } catch (error) {
      console.error('Error deleting message:', error);
      alert('Failed to delete message.');
    }
  };

  const filteredMessages = messages.filter(msg => {
    if (filter === 'all') return true;
    return msg.status === filter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'unread': return 'bg-red-100 text-red-800 border-red-200';
      case 'read': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'archived': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'replied': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <MessageSquare className="text-purple-600" />
            Contact Messages
          </h2>
          <p className="text-gray-500 text-sm mt-1">Review and manage inquiries from the contact form</p>
        </div>

        {/* Filters */}
        <div className="flex bg-white rounded-lg shadow-sm border border-gray-200 p-1">
          {['all', 'unread', 'read', 'archived'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 text-sm font-medium rounded-md capitalize transition-colors ${
                filter === f 
                  ? 'bg-purple-100 text-purple-700' 
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              {f}
              {f === 'unread' && messages.some(m => m.status === 'unread') && (
                <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-red-500 text-white">
                  {messages.filter(m => m.status === 'unread').length}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {filteredMessages.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <MessageSquare className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p className="text-lg font-medium">No messages found</p>
            <p className="text-sm mt-1">There are no {filter !== 'all' ? filter : ''} messages to display.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {filteredMessages.map((msg) => (
              <div key={msg.id} className={`transition-colors hover:bg-gray-50 ${msg.status === 'unread' ? 'bg-purple-50/30' : ''}`}>
                <div 
                  className="p-5 cursor-pointer flex items-center justify-between"
                  onClick={() => {
                    setExpandedId(expandedId === msg.id ? null : msg.id);
                  }}
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="bg-gradient-to-br from-purple-100 to-purple-200 p-3 rounded-full text-purple-700">
                      <User size={20} />
                    </div>
                    <div>
                      <h4 className={`text-md ${msg.status === 'unread' ? 'font-bold text-gray-900' : 'font-medium text-gray-700'}`}>
                        {msg.subject || 'No Subject'}
                      </h4>
                      <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                        <span className="flex items-center gap-1"><User size={14} /> {msg.name}</span>
                        <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                        <span className="flex items-center gap-1"><Clock size={14} /> {new Date(msg.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full border tracking-wide uppercase ${getStatusColor(msg.status)}`}>
                      {msg.status}
                    </span>
                    {expandedId === msg.id ? <ChevronUp className="text-gray-400" /> : <ChevronDown className="text-gray-400" />}
                  </div>
                </div>

                <AnimatePresence>
                  {expandedId === msg.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="px-5 pb-5 pt-0 border-t border-gray-100 bg-gray-50/50"
                    >
                      <div className="mt-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm relative">
                        <div className="flex flex-col md:flex-row gap-6 mb-4 pb-4 border-b border-gray-100">
                          <div className="flex items-center gap-2">
                            <User size={16} className="text-gray-400" />
                            <div>
                              <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">From</p>
                              <p className="font-medium text-gray-800">{msg.name}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Mail size={16} className="text-gray-400" />
                            <div>
                              <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Email</p>
                              <a href={`mailto:${msg.email}`} className="font-medium text-purple-600 hover:underline">{msg.email}</a>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock size={16} className="text-gray-400" />
                            <div>
                              <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Received At</p>
                              <p className="font-medium text-gray-800">{new Date(msg.created_at).toLocaleString()}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-2">Message</p>
                          <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{msg.message}</p>
                        </div>
                        
                        <div className="flex gap-2 mt-6 justify-end">
                          {msg.status === 'unread' && (
                            <button
                              type="button"
                              onClick={(e) => { e.stopPropagation(); updateStatus(msg.id, 'read'); setExpandedId(null); }}
                              className="px-4 py-2 text-sm font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors flex items-center gap-2"
                            >
                              <Check size={16} /> Mark Read
                            </button>
                          )}
                          {msg.status !== 'unread' && (
                            <button 
                              onClick={(e) => { e.stopPropagation(); updateStatus(msg.id, 'unread'); setExpandedId(null); }}
                              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
                            >
                              <User size={16} /> Mark Unread
                            </button>
                          )}
                          {msg.status !== 'archived' && (
                            <button 
                              onClick={(e) => { e.stopPropagation(); updateStatus(msg.id, 'archived'); setExpandedId(null); }}
                              className="px-4 py-2 text-sm font-medium text-yellow-700 bg-yellow-50 border border-yellow-200 rounded-lg hover:bg-yellow-100 transition-colors flex items-center gap-2"
                            >
                              <Archive size={16} /> Archive
                            </button>
                          )}
                          <button 
                            onClick={(e) => { e.stopPropagation(); deleteMessage(msg.id); }}
                            className="px-4 py-2 text-sm font-medium text-red-700 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors flex items-center gap-2"
                          >
                            <Trash2 size={16} /> Delete
                          </button>
                          {msg.status !== 'replied' && (
                            <button
                              type="button"
                              onClick={(e) => handleReplyAndMarkReplied(e, msg)}
                              className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 shadow-sm"
                            >
                              <Check size={16} /> Reply & Mark Replied
                            </button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactMessages;
