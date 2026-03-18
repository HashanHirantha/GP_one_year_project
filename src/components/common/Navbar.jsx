import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../../assets/logo.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Properties', path: '/properties' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#023859]/95 backdrop-blur-md shadow-lg py-2' : 'bg-[#023859] py-4'
      } text-white`}>
      <div className="container mx-auto px-6 flex justify-between items-center relative">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group z-10">
          <div className="bg-white p-2 rounded-full shadow-lg group-hover:scale-110 transition-transform duration-300">
            <img src={logo} alt="Smart Property Finder Logo" className="w-10 h-10 object-contain" />
          </div>
          <span className="text-3xl font-bold tracking-tight font-sans">
            Smart<span className="text-white">Property</span>Finder
          </span>
        </Link>

        {/* Centered Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 absolute left-1/2 transform -translate-x-1/2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`relative font-medium text-sm tracking-wide transition-colors duration-200 ${isActive(link.path) ? 'text-white' : 'text-white/70 hover:text-white'
                }`}
            >
              {link.name}
              {isActive(link.path) && (
                <motion.div
                  layoutId="underline"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#54ACBF] rounded-full"
                />
              )}
            </Link>
          ))}
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-4 z-10">
          <div className="hidden md:flex items-center gap-4">
            <Link
              to="/login"
              className="px-6 py-2 rounded-full border border-white/20 hover:bg-white/10 text-white text-sm font-semibold transition-all duration-300 backdrop-blur-sm"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-6 py-2 rounded-full bg-gradient-to-r from-[#54ACBF] to-[#26658C] hover:brightness-110 text-white text-sm font-semibold shadow-lg shadow-[#54ACBF]/20 hover:shadow-[#54ACBF]/40 transition-all duration-300 transform hover:-translate-y-0.5"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 hover:bg-white/10 rounded-full transition-colors">
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
            className="md:hidden bg-dark/95 backdrop-blur-xl border-t border-white/10 overflow-hidden"
          >
            <div className="p-6 space-y-4 flex flex-col items-center">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`text-lg font-medium w-full text-center py-2 rounded-lg transition-colors ${isActive(link.path) ? 'bg-white/10 text-accent' : 'text-white/80 hover:bg-white/5'
                    }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="w-full h-px bg-white/10 my-2"></div>
              <Link to="/login" onClick={() => setIsOpen(false)} className="w-full text-center py-3 border border-white/20 rounded-xl hover:bg-white/10 text-white transition-all font-medium">Login</Link>
              <Link to="/signup" onClick={() => setIsOpen(false)} className="w-full py-3 bg-gradient-to-r from-[#54ACBF] to-[#26658C] text-white rounded-xl font-bold hover:brightness-110 transition-all shadow-lg shadow-[#54ACBF]/20 text-center block">Sign Up</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;