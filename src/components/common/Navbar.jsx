import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Home } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-primary text-white sticky top-0 z-50 shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <div className="bg-white p-1 rounded-full">
            <Home className="text-primary w-6 h-6" />
          </div>
          <span className="text-xl font-bold">Smart Property Finder</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 items-center">
          <Link to="/" className="hover:text-secondary transition">Home</Link>
          <Link to="/about" className="hover:text-secondary transition">About</Link>
          <Link to="/properties" className="hover:text-secondary transition">Properties</Link>
          <Link to="/contact" className="hover:text-secondary transition">Contact</Link>
        </div>

        <div className="hidden md:flex space-x-3 items-center">
          <Link to="/login" className="px-4 py-1 hover:underline">Login</Link>
          <button className="bg-secondary px-4 py-1 rounded shadow hover:bg-purple-400 transition">Sign Up</button>
        </div>

        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>
      
      {isOpen && (
        <div className="md:hidden bg-dark p-4 space-y-2">
          <Link to="/" className="block py-2">Home</Link>
          <Link to="/about" className="block py-2">About</Link>
          <Link to="/properties" className="block py-2">Properties</Link>
          <Link to="/contact" className="block py-2">Contact</Link>
          <Link to="/login" className="block py-2 font-bold">Login</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;