import React from 'react';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import PropertyCard from '../../components/ui/PropertyCard';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="bg-primary text-white py-16 text-center px-4">
        <h1 className="text-4xl font-bold mb-2">Find Your Dream Property</h1>
        <p className="opacity-80 mb-8">Your trusted platform for Renting, Selling, and Buying properties</p>
        <div className="bg-white p-4 rounded-lg shadow-lg max-w-4xl mx-auto flex flex-col md:flex-row gap-3">
          <input type="text" placeholder="Search by location..." className="flex-grow p-2 border rounded text-gray-700" />
          <button className="bg-dark text-white px-6 py-2 rounded font-semibold">Search</button>
        </div>
      </div>
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-xl font-bold text-purple-900 mb-6">🔥 Hot Deal Properties</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <PropertyCard title="2 Bedroom Apartment" price="Rs. 81M" location="Colombo 3" type="Apartment" />
          <PropertyCard title="Luxury House" price="Rs. 49.2M" location="Nugegoda" type="House" isFeatured={true} />
          <PropertyCard title="Modern Family House" price="Rs. 125M" location="Colombo 5" type="House" />
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Home;