import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Home } from 'lucide-react';

const NavLink = ({ to, children }) => (
  <Link
    to={to}
    className="relative text-white transition group"
  >
    {children}
    <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-secondary transition-all duration-300 group-hover:w-full"></span>
  </Link>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-forest text-white sticky top-0 z-50 shadow-md">

      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        

        {/*logo*/} 
        <Link to="/" className="flex items-center space-x-2 group">
        <div className="bg-white p-1 rounded-full transition-transform duration-300 group-hover:scale-110">
        <Home className="text-primary w-6 h-6" />
        </div>
        <span className="text-xl font-bold tracking-wide group-hover:text-secondary transition">
        Smart Property Finder
        </span>
        </Link>


        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 items-center">
          <Link to="/" className="hover:text-secondary transition">Home</Link>
          <Link to="/about" className="hover:text-secondary transition">About</Link>
          <Link to="/properties" className="hover:text-secondary transition">Properties</Link>
          <Link to="/contact" className="hover:text-secondary transition">Contact</Link>
        </div>

        <div className="hidden md:flex space-x-3 items-center">
          <Link to="/login" className="px-4 py-1 rounded shadow 
          hover:scale-105 hover:shadow-lg   
          transition-all duration-300 
          active:scale-95">
          Login</Link>



          <Link to="/signup" className="bg-mint text-darkgreen px-4 py-1 rounded shadow 
          transition-all duration-300 
          hover:scale-105 hover:shadow-lg 
          active:scale-95">
          Sign Up
        </Link>

        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setIsOpen(!isOpen)}
         className="md:hidden md:hidden bg-darkgreen p-4 space-y-2 transition-transform duration-300 active:scale-90">
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
          <Link to="/signup" className="block py-2 font-bold">Sign Up</Link>

        </div>

        
      )}
    </nav>
  );
};

export default Navbar;