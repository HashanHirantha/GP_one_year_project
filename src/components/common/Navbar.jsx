import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, User, Bell } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import LogoIcon from './LogoIcon';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../config/supabase';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, role, signOut } = useAuth();

  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [whatsappModalOpen, setWhatsappModalOpen] = useState(false);
  const [whatsappStatus, setWhatsappStatus] = useState('initializing');
  const [whatsappQr, setWhatsappQr] = useState(null);
  const BOT_URL = import.meta.env.VITE_BOT_SERVER_URL || 'http://localhost:3001';

  // Request browser Notification permissions on mount
  useEffect(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      if (Notification.permission === 'default') {
        Notification.requestPermission();
      }
    }
  }, []);

  // Fetch notifications
  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 5000); // Poll every 5s
    return () => clearInterval(interval);
  }, [user]);

  // Poll WhatsApp status when modal is open
  useEffect(() => {
    if (!whatsappModalOpen) return;

    const checkStatus = async () => {
      try {
        const response = await fetch(`${BOT_URL}/api/whatsapp-status`);
        if (response.ok) {
          const data = await response.json();
          setWhatsappStatus(data.status);
          setWhatsappQr(data.qr);
        }
      } catch (err) {
        console.error("Could not fetch WhatsApp status:", err);
        setWhatsappStatus('offline');
      }
    };

    checkStatus();
    const interval = setInterval(checkStatus, 3000);
    return () => clearInterval(interval);
  }, [whatsappModalOpen]);

  const fetchNotifications = async () => {
    let dbNotifications = [];
    
    // 1. Fetch from Supabase if user is logged in
    if (user) {
      try {
        const { data, error } = await supabase
          .from('notifications')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });
        
        if (!error && data) {
          dbNotifications = data;
        }
      } catch (err) {
        console.warn("Could not load notifications from database, will fallback to local storage:", err);
      }
    }

    // 2. Fetch from LocalStorage mock notifications
    let localNotifications = [];
    try {
      const stored = JSON.parse(localStorage.getItem('mock_notifications') || '[]');
      const readIds = JSON.parse(localStorage.getItem('mock_notifications_read') || '[]');
      localNotifications = stored.map(n => ({
        ...n,
        is_read: n.is_read || readIds.includes(n.id)
      }));
    } catch (e) {
      console.error(e);
    }

    // Combine them and sort by newest
    const combined = [...dbNotifications, ...localNotifications].sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at)
    );

    // Check for any new unread notification that we haven't popped a browser notification for
    const displayedAlerts = JSON.parse(localStorage.getItem('shown_desktop_alerts') || '[]');
    const newUnreads = combined.filter(n => !n.is_read && !displayedAlerts.includes(n.id));

    if (newUnreads.length > 0) {
      newUnreads.forEach(n => {
        // Trigger browser notification
        if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
          try {
            new Notification(n.title, {
              body: n.message
            });
          } catch (e) {
            console.error("Browser notification failed:", e);
          }
        }
        displayedAlerts.push(n.id);
      });
      localStorage.setItem('shown_desktop_alerts', JSON.stringify(displayedAlerts));
    }

    setNotifications(combined);
  };

  const markAsRead = async (notifId) => {
    // 1. Mark in Supabase
    if (user) {
      try {
        await supabase
          .from('notifications')
          .update({ is_read: true })
          .eq('id', notifId);
      } catch (err) {
        console.error(err);
      }
    }

    // 2. Mark in local storage
    try {
      const readIds = JSON.parse(localStorage.getItem('mock_notifications_read') || '[]');
      if (!readIds.includes(notifId)) {
        readIds.push(notifId);
        localStorage.setItem('mock_notifications_read', JSON.stringify(readIds));
      }
    } catch (e) {
      console.error(e);
    }

    // Update local state immediately
    setNotifications(prev =>
      prev.map(n => n.id === notifId ? { ...n, is_read: true } : n)
    );
  };

  const markAllAsRead = async () => {
    const unreadIds = notifications.filter(n => !n.is_read).map(n => n.id);
    for (const id of unreadIds) {
      await markAsRead(id);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Properties', path: '/properties' },
    { name: 'Smart Alerts', path: '/sms-alerts' },
    ...(user ? [{ name: 'Favorites', path: '/favorites' }] : []),
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const handleSignOut = async () => {
    await signOut();
    setIsOpen(false);
    navigate('/');
  };

  const getDashboardRoute = () => {
    if (role === 'admin') return '/dashboard/admin';
    if (role === 'seller') return '/dashboard/seller';
    return '/'; // fallback
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#F8FAFC]/95 backdrop-blur-md shadow-lg py-2' : 'bg-[#F8FAFC] py-4'
      } text-black`}>
      <div className="container mx-auto px-6 flex justify-between items-center relative">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group z-10">
          <div className="group-hover:scale-110 transition-transform duration-300">
            <LogoIcon className="w-12 h-12" />
          </div>
          <span className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight font-sans">
            Smart<span className="text-[#06cc50]">Property</span>Finder
          </span>
        </Link>

        {/* Centered Desktop Menu */}
        <div className="hidden md:flex items-center justify-center gap-8 flex-1 px-4">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`relative font-medium text-sm tracking-wide transition-colors duration-200 ${isActive(link.path) ? 'text-black' : 'text-black/80 hover:text-black'
                }`}
            >
              {link.name}
              {isActive(link.path) && (
                <motion.div
                  layoutId="underline"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#06cc50] rounded-full"
                />
              )}
            </Link>
          ))}
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-4 z-10">
          {/* Notification Bell */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2.5 hover:bg-gray-100 text-black rounded-full transition-colors duration-200 focus:outline-none flex items-center justify-center"
              title="Notifications"
            >
              <Bell size={18} className="text-gray-700" />
              {notifications.filter(n => !n.is_read).length > 0 && (
                <span className="absolute top-1 right-1 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-red-500 text-[9px] font-extrabold text-white ring-2 ring-white">
                  {notifications.filter(n => !n.is_read).length}
                </span>
              )}
            </button>

            {/* Notification Dropdown Menu */}
            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-3 w-80 rounded-2xl bg-[#F8FAFC] p-4 shadow-2xl border border-gray-200/60 z-50 text-left"
                >
                  <div className="flex items-center justify-between border-b pb-2 mb-3">
                    <span className="font-bold text-gray-800 text-sm">Alerts & Notifications</span>
                    {notifications.filter(n => !n.is_read).length > 0 && (
                      <button
                        onClick={markAllAsRead}
                        className="text-xs text-[#06cc50] hover:underline font-bold"
                      >
                        Mark all read
                      </button>
                    )}
                  </div>

                  <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
                    {notifications.length > 0 ? (
                      notifications.map(n => (
                        <div
                          key={n.id}
                          className={`p-3 rounded-xl border text-xs transition-colors duration-200 relative group ${
                            n.is_read ? 'bg-gray-100/50 border-gray-150 text-gray-500' : 'bg-green-50/50 border-green-200/60 text-gray-800'
                          }`}
                        >
                          <div className="font-bold mb-1 flex items-center justify-between">
                            <span>{n.title}</span>
                            {!n.is_read && (
                              <button
                                onClick={() => markAsRead(n.id)}
                                className="text-[10px] text-[#06cc50] hover:underline opacity-0 group-hover:opacity-100 transition-opacity duration-200 font-bold"
                              >
                                Mark read
                              </button>
                            )}
                          </div>
                          <p className="leading-relaxed text-[11px]">{n.message}</p>
                          <div className="text-[9px] text-gray-400 mt-1.5 font-medium">
                            {new Date(n.created_at || new Date()).toLocaleDateString([], { month: 'short', day: 'numeric' })}{' '}
                            {new Date(n.created_at || new Date()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="py-8 text-center text-gray-400 text-xs italic font-medium">
                        No notifications yet
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* WhatsApp Admin Setup */}
          <button
            onClick={() => setWhatsappModalOpen(true)}
            className="p-2.5 hover:bg-gray-100 text-black rounded-full transition-colors duration-200 focus:outline-none flex items-center justify-center"
            title="WhatsApp Gateway Setup"
          >
            <span className="relative flex h-5 w-5 justify-center items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
              {whatsappStatus === 'connected' ? (
                <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
              ) : whatsappStatus === 'scan_required' ? (
                <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
                </span>
              ) : (
                <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </span>
              )}
            </span>
          </button>

          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <>
                <Link to="/profile" className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 text-sm font-semibold hover:bg-gray-100 text-black transition-all duration-300">
                  <User size={16} />
                  <span className="truncate max-w-[120px]">{user.user_metadata?.full_name || user.email?.split('@')[0]}</span>
                  {role && (
                    <span className={`text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider ${
                      role === 'admin' ? 'bg-red-500 text-white' : 
                      role === 'seller' ? 'bg-blue-500 text-white' : 
                      'bg-[#06cc50] text-white'
                    }`}>
                      {role}
                    </span>
                  )}
                </Link>
                {role !== 'buyer' && (
                  <Link
                    to={getDashboardRoute()}
                    className="px-5 py-2 rounded-full border border-[#06cc50] text-[#06cc50] text-sm font-semibold hover:bg-[#06cc50] hover:text-white transition-all duration-300"
                  >
                    Dashboard
                  </Link>
                )}
                <button
                  onClick={handleSignOut}
                  className="px-5 py-2 rounded-full bg-red-500 text-white text-sm font-semibold shadow-lg shadow-red-500/20 hover:bg-red-600 transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-5 py-2 rounded-full bg-[#F8FAFC] border border-gray-200 hover:bg-white text-black text-sm font-semibold shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-5 py-2 rounded-full bg-[#06cc50] text-white text-sm font-semibold shadow-lg shadow-green-900/20 hover:bg-[#05b346] hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 text-center flex items-center justify-center"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Toggle */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 hover:bg-gray-100 text-black rounded-full transition-colors">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 backdrop-blur-xl border-t border-gray-100 overflow-hidden"
          >
            <div className="p-6 space-y-4 flex flex-col items-center max-h-[calc(100vh-80px)] overflow-y-auto">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`text-lg font-medium w-full text-center py-2 rounded-lg transition-colors ${isActive(link.path) ? 'bg-gray-100 text-[#06cc50]' : 'text-black/80 hover:bg-gray-50'
                    }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="w-full h-px bg-gray-200 my-2"></div>
              {user ? (
                <>
                  <Link to={getDashboardRoute()} onClick={() => setIsOpen(false)} className="w-full text-center py-3 border border-gray-200 text-black rounded-xl hover:bg-gray-50 transition flex justify-center items-center gap-2">
                    <User size={18} /> Dashboard
                  </Link>
                  <button onClick={handleSignOut} className="w-full py-3 bg-red-500 text-white rounded-xl font-bold hover:bg-red-600 transition shadow-lg text-center block">
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setIsOpen(false)} className="w-full text-center py-3 border border-gray-200 text-black rounded-xl hover:bg-gray-50 transition">Login</Link>
                  <Link to="/signup" onClick={() => setIsOpen(false)} className="w-full py-3 bg-[#06cc50] text-white rounded-xl font-bold hover:bg-[#05b346] transition shadow-lg text-center block">Sign Up</Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* WhatsApp Connection Modal */}
      <AnimatePresence>
        {whatsappModalOpen && (
          <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl shadow-2xl p-6 w-full max-w-sm border border-gray-150 text-center"
            >
              <div className="flex justify-between items-center border-b pb-3 mb-4">
                <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#06cc50" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                  WhatsApp Connection Status
                </h3>
                <button
                  onClick={() => setWhatsappModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600 transition p-1 hover:bg-gray-100 rounded-full"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex justify-center items-center gap-2 bg-gray-50 py-1.5 px-4 rounded-xl border border-gray-200/50 w-fit mx-auto text-xs font-semibold">
                  <span className="text-gray-500">Status:</span>
                  {whatsappStatus === 'connected' && (
                    <span className="text-green-600 font-extrabold flex items-center gap-1">
                      ● Connected & Ready
                    </span>
                  )}
                  {whatsappStatus === 'scan_required' && (
                    <span className="text-yellow-600 font-extrabold flex items-center gap-1 animate-pulse">
                      ● Scan Required
                    </span>
                  )}
                  {whatsappStatus === 'initializing' && (
                    <span className="text-blue-500 font-extrabold flex items-center gap-1 animate-pulse">
                      ● Initializing...
                    </span>
                  )}
                  {whatsappStatus === 'offline' && (
                    <span className="text-red-500 font-extrabold flex items-center gap-1">
                      ● Offline / Server Down
                    </span>
                  )}
                  {whatsappStatus === 'disconnected' && (
                    <span className="text-gray-500 font-extrabold flex items-center gap-1">
                      ● Disconnected
                    </span>
                  )}
                </div>

                {whatsappStatus === 'scan_required' && whatsappQr ? (
                  <div className="space-y-3">
                    <p className="text-xs text-gray-500 leading-relaxed px-2">
                      Scan the QR code using WhatsApp on your phone (**Linked Devices**) to start the free notification gateway.
                    </p>
                    <div className="bg-white p-3 rounded-2xl border border-gray-200/80 w-fit mx-auto shadow-inner">
                      <img
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(whatsappQr)}`}
                        alt="WhatsApp Web QR Code"
                        className="w-56 h-56 mx-auto shadow-md border rounded-xl bg-white p-1.5"
                      />
                    </div>
                  </div>
                ) : whatsappStatus === 'connected' ? (
                  <div className="py-6 space-y-3">
                    <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center mx-auto text-green-600 shadow-inner border border-green-100">
                      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                    <p className="text-sm text-gray-800 font-bold">
                      WhatsApp Gateway is Active!
                    </p>
                    <p className="text-[11px] text-gray-400 max-w-xs mx-auto leading-relaxed">
                      Subscribers will receive price notifications automatically and instantly on their WhatsApp numbers.
                    </p>
                  </div>
                ) : whatsappStatus === 'offline' ? (
                  <div className="py-6 text-center text-red-500 text-xs font-semibold space-y-2">
                    <p>Could not connect to the WhatsApp Server.</p>
                    <p className="text-[11px] text-gray-400 font-normal leading-relaxed max-w-xs mx-auto">
                      Please make sure the backend server is running in the terminal (`npm run server`).
                    </p>
                  </div>
                ) : (
                  <div className="py-10 flex flex-col items-center justify-center gap-3">
                    <div className="animate-spin rounded-full h-7 w-7 border-b-2 border-[#06cc50]"></div>
                    <p className="text-[11px] text-gray-400">Starting WhatsApp engine, please wait...</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
