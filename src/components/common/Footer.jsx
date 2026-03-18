import React from 'react';
import { Facebook, Instagram, Twitter, Mail, Phone } from 'lucide-react';

import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#023859]/80 backdrop-blur-md text-white pt-10 pb-4 mt-auto border-t border-[#54ACBF]/30 relative z-10">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div>
          <h3 className="font-bold text-lg mb-4">Smart<span className="text-[#54ACBF]"> Property</span> Finder</h3>
          <p className="text-sm opacity-70 text-gray-200">Your trusted platform for finding the perfect property.</p>
        </div>
        <div>
          <h4 className="font-bold mb-4 text-[#A7EBF2]">Quick Links</h4>
          <ul className="space-y-2 text-sm opacity-80">
            <li><Link to="/" className="hover:text-[#54ACBF] transition-colors">Home</Link></li>
            <li><Link to="/about" className="hover:text-[#54ACBF] transition-colors">About</Link></li>
            <li><Link to="/properties" className="hover:text-[#54ACBF] transition-colors">Properties</Link></li>
            <li><Link to="/contact" className="hover:text-[#54ACBF] transition-colors">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4 text-[#A7EBF2]">Contact Us</h4>
          <ul className="space-y-2 text-sm opacity-80">
            <li className="flex items-center gap-2"><Mail size={14} className="text-[#54ACBF]" /> info@spf.com</li>
            <li className="flex items-center gap-2"><Phone size={14} className="text-[#54ACBF]" /> +94 77 123 4567</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4 text-[#A7EBF2]">Follow Us</h4>
          <div className="flex space-x-3">
            <div className="bg-white/5 p-2 rounded-full hover:bg-[#54ACBF] hover:text-white transition-colors cursor-pointer">
              <Facebook size={18} />
            </div>
            <div className="bg-white/5 p-2 rounded-full hover:bg-[#54ACBF] hover:text-white transition-colors cursor-pointer">
              <Instagram size={18} />
            </div>
            <div className="bg-white/5 p-2 rounded-full hover:bg-[#54ACBF] hover:text-white transition-colors cursor-pointer">
              <Twitter size={18} />
            </div>
          </div>
        </div>
      </div>
      <div className="text-center text-xs opacity-50 border-t border-white/10 pt-4 text-gray-400">
        © 2025 Smart Property Finder. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;