import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import PropertyCard from '../../components/ui/PropertyCard';
import { Filter, MapPin, List, Map } from 'lucide-react';
import { properties } from '../../data/properties';
import heroImage from '../../assets/images/home_hero/hero7.jpg';

const Properties = () => {

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      {/* Hero Section */}
      <div className="relative pt-32 pb-16 text-center px-4 mb-6 bg-cover bg-center" style={{ backgroundImage: `url(${heroImage})` }}>
        <div className="absolute inset-0 bg-black/50 z-0"></div>
        <div className="relative z-10">
          <motion.h1
            initial={{ opacity: 0, scale: 0.5, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Browse <span className="text-white">Properties</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="opacity-90 text-lg"
          >
            Discover the best properties availble in the market.
          </motion.p>
        </div>
      </div>

      {/* Search Bar Section */}
      <div className="container mx-auto px-4 mb-8">
        <div className="bg-white p-6 shadow-sm border border-gray-100 rounded-lg flex flex-col md:flex-row gap-4 items-center">

          {/* Location Search */}
          <input
            type="text"
            placeholder="Search by location....."
            className="w-full md:flex-1 p-2.5 border border-gray-400 rounded text-sm focus:outline-none focus:border-black text-gray-600"
          />

          {/* Property Type Dropdown */}
          <select className="w-full md:w-1/4 p-2.5 border border-gray-400 rounded text-sm focus:outline-none focus:border-black text-gray-500 bg-white">
            <option value="">property type</option>
            <option value="apartment">Apartment</option>
            <option value="house">House</option>
            <option value="villa">Villa</option>
            <option value="land">Land</option>
          </select>

          {/* Price Range Dropdown */}
          <select className="w-full md:w-1/4 p-2.5 border border-gray-400 rounded text-sm focus:outline-none focus:border-black text-gray-500 bg-white">
            <option value="">price range</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          {/* Search Button */}
          <button className="w-full md:w-auto px-8 py-2.5 bg-[#00FF00] hover:bg-white text-black font-bold rounded-full text-sm uppercase transition-all duration-300 shadow-lg shadow-black/20 hover:shadow-xl hover:-translate-y-0.5">
            search
          </button>

        </div>
      </div>

      <div className="container mx-auto px-4 pb-8 flex flex-col md:flex-row gap-6">
        <aside className="w-full md:w-1/4 bg-white p-6 rounded-lg shadow-sm h-fit border border-gray-100">
          <h3 className="font-bold text-gray-900 border-b-2 border-gray-100 pb-2 mb-6 text-lg">
            filter properties
          </h3>

          <div className="space-y-6">
            {/* Location */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">location</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-black"
              />
            </div>

            {/* Radius */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Radius (km)</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-black"
              />
            </div>

            {/* Property Type */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">property type</label>
              <div className="space-y-2 text-sm text-gray-600">
                <label className="flex items-center gap-2 cursor-pointer hover:text-black">
                  <input type="checkbox" className="accent-black" /> Boarding
                </label>
                <label className="flex items-center gap-2 cursor-pointer hover:text-black">
                  <input type="checkbox" className="accent-black" /> Annex
                </label>
                <label className="flex items-center gap-2 cursor-pointer hover:text-black">
                  <input type="checkbox" className="accent-black" /> House
                </label>
                <label className="flex items-center gap-2 cursor-pointer hover:text-black">
                  <input type="checkbox" className="accent-black" /> Land
                </label>
              </div>
            </div>

            {/* Price Range */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Price Range (Rs.)</label>
              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="min price"
                  className="w-full p-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-black placeholder-gray-400"
                />
                <input
                  type="text"
                  placeholder="max price"
                  className="w-full p-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-black placeholder-gray-400"
                />
              </div>
            </div>

            {/* Bedrooms */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Bedrooms</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-black"
              />
            </div>

            {/* Bathroom */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Bathroom</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-black"
              />
            </div>

            <button className="w-full bg-[#00FF00] hover:bg-white text-black font-medium py-2 rounded-full mt-4 transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5">
              Apply Filters
            </button>
          </div>
        </aside>

        <main className="w-full md:w-3/4 flex flex-col gap-6">
          {/* Found Properties Bar */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <MapPin className="text-red-500 fill-current" size={20} />
              <h2 className="text-lg font-bold text-gray-800">Found {properties.length} Properties</h2>
            </div>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-2 bg-[#00FF00] text-black px-4 py-2 rounded-full shadow-lg shadow-black/20 hover:bg-white hover:shadow-xl transition-all hover:-translate-y-0.5">
                <List size={18} />
                <span className="font-medium">list</span>
              </button>
              <button className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded shadow-sm hover:bg-gray-50 transition-colors">
                <Map size={18} className="text-green-600" />
                <span className="font-medium">Map</span>
              </button>
            </div>
          </div>

          {/* Property Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {properties.map((property, index) => (
              <PropertyCard
                key={property.id}
                id={property.id}
                title={property.title}
                price={property.price}
                location={property.location}
                type={property.type}
                isFeatured={property.isFeatured}
                image={property.images[0]}
                beds={property.beds}
                baths={property.baths}
                sqft={property.sqft}
              />
            ))}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Properties;