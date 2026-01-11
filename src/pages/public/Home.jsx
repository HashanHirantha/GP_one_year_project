import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import PropertyCard from '../../components/ui/PropertyCard';
import { properties } from '../../data/properties';

const Home = () => {
  return (
    <div className="min-h-screen bg-cream flex flex-col">

      <Navbar />
      <div className="bg-gradient-to-b from-forest to-darkgreen text-white py-20 text-center px-4">

        <h1 className="text-4xl font-bold mb-2">Find Your Dream Property</h1>
        <p className="text-mint mb-8">
          Your trusted platform for Renting, Selling, and Buying properties</p>
        <div className="bg-white p-4 rounded-xl shadow-lg max-w-4xl mx-auto flex flex-col md:flex-row gap-3">

          <input type="text" placeholder="Search by location..." className="flex-grow p-2 border rounded text-gray-700" />
          <button className="bg-darkgreen text-white px-6 py-2 rounded font-semibold hover:bg-sage transition">
            Search</button>
        </div>
      </div>
      <section className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <Link to="/properties">
            <h2 className="text-xl font-bold text-darkgreen hover:text-sage transition-colors cursor-pointer flex items-center gap-2">
              🔥 Hot Deal Properties
            </h2>
          </Link>
          <Link to="/properties" className="text-sm font-bold text-sage hover:text-darkgreen hover:underline">
            View All Properties →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {properties.slice(0, 3).map((property) => (
            <PropertyCard key={property.id} {...property} />
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Home;