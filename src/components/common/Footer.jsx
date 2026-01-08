import React from 'react';
import { Facebook, Instagram, Twitter, Mail, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-forest text-white pt-10 pb-4 mt-auto">

      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div>
          <h3 className="font-bold text-lg mb-4">Smart Property Finder</h3>
          <p className="text-sm opacity-80">Your trusted platform for finding the perfect property.</p>
        </div>
        <div>
          <h4 className="font-bold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm opacity-80">
            <li><a href="/Home" className="hover:text-secondary transition hover:text-mint">Home</a>  </li>
            <li><a href="/About" className="hover:text-secondary transition hover:text-mint">About</a></li>
            <li><a href="/Properties" className="hover:text-secondary transition hover:text-mint">Properties</a></li>
            <li><a href="/Contact" className="hover:text-secondary transition hover:text-mint">Contact</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4">Contact Us</h4>
          <ul className="space-y-2 text-sm opacity-80">
            <li className="flex items-center gap-2"><Mail size={14}/> info@spf.com</li>
            <li className="flex items-center gap-2"><Phone size={14}/> +94 77 123 4567</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4">Follow Us</h4>
          <div className="flex space-x-3">
            <Facebook size={18} />
            <Instagram size={18} />
            <Twitter size={18} />
          </div>
        </div>
      </div>
      <div className="text-center text-xs opacity-60 border-t border-darkgreen
       pt-4">
        © 2025 Smart Property Finder. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;