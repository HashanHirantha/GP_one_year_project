import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import LogoIcon from './LogoIcon';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, role, signOut } = useAuth();

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
          <span className="text-3xl font-bold tracking-tight font-sans">
            Smart<span className="text-[#06cc50]">Property</span>Finder
          </span>
        </Link>

        {/* Centered Desktop Menu */}
        <div className="hidden lg:flex items-center justify-center gap-8 flex-1 px-4">
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
            <div className="p-6 space-y-4 flex flex-col items-center">
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
    </nav>
  );
};

export default Navbar;
