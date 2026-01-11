import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import PropertyCard from '../../components/ui/PropertyCard';
import TrendingPropertyCard from '../../components/ui/TrendingPropertyCard';
import { TrendingUp, BarChart2 } from 'lucide-react';

import { properties } from '../../data/properties';

const Home = () => {
  // Use first 3 properties for Hot Deals
  const hotDeals = properties.slice(0, 3);
  // Use next 3 properties for Trending (or filter if needed)
  const trendingDeals = properties.slice(3, 6);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-primary via-purple-700 to-secondary text-white pt-32 pb-16 text-center px-4 overflow-hidden">
        {/* Background Decorative Elements */}
        {/* ... (keep as is) ... */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-blob"></div>
          <div className="absolute top-[20%] right-[-10%] w-96 h-96 bg-accent rounded-full mix-blend-overlay filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-[-20%] left-[20%] w-96 h-96 bg-secondary rounded-full mix-blend-overlay filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto">
          {/* ... (keep as is) ... */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.5, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl md:text-6xl font-bold mb-6 tracking-tight leading-tight"
          >
            Find Your Dream <span className="text-accent">Property</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="opacity-90 mb-10 text-xl font-light italic tracking-wide max-w-2xl mx-auto"
          >
            Your trusted platform for Renting, Selling, and Buying properties with verified listings.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            whileHover={{ y: -10, scale: 1.02 }}
            transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
            className="max-w-4xl mx-auto p-6 drop-shadow-2xl"
          >
            {/* Top Row: Search & Button */}
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <input
                type="text"
                placeholder="Search..."
                className="flex-grow rounded-full px-6 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all bg-white shadow-lg"
              />
              <button className="bg-primary hover:bg-purple-800 text-white px-8 py-3 rounded-full font-bold transition-all shadow-lg active:scale-95">
                Search
              </button>
            </div>

            {/* Bottom Row: Filters */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <select className="rounded-full px-4 py-2.5 text-gray-700 bg-white shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20 cursor-pointer transition-colors">
                <option value="">Radius</option>
                <option value="1">1 km</option>
                <option value="5">5 km</option>
                <option value="10">10 km</option>
              </select>
              <select className="rounded-full px-4 py-2.5 text-gray-700 bg-white shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20 cursor-pointer transition-colors">
                <option value="">Property Type</option>
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
                <option value="villa">Villa</option>
              </select>
              <select className="rounded-full px-4 py-2.5 text-gray-700 bg-white shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20 cursor-pointer transition-colors">
                <option value="">Max Price</option>
                <option value="50m">50 M</option>
                <option value="100m">100 M</option>
              </select>
              <select className="rounded-full px-4 py-2.5 text-gray-700 bg-white shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20 cursor-pointer transition-colors">
                <option value="">Max Bedroom</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3+</option>
              </select>
            </div>
          </motion.div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-16">
        <div className="mb-10 text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-purple-900 tracking-tight">Hot Deal Properties</h2>
          <p className="text-gray-500 text-lg mt-2 font-light">Best value for money properties picked for you</p>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2
              }
            }
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {hotDeals.map((property) => (
            <motion.div key={property.id} variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}>
              <PropertyCard
                id={property.id}
                title={property.title}
                price={property.price}
                location={property.location}
                type={property.type}
                isFeatured={property.isFeatured}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Trending Properties Section */}
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-10 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-purple-900 tracking-tight">Trending Properties</h2>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.2
                }
              }
            }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {trendingDeals.map((property) => (
              <motion.div key={property.id} variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}>
                <TrendingPropertyCard
                  id={property.id}
                  title={property.title}
                  location={property.location}
                  price={property.price}
                  beds={property.beds}
                  baths={property.baths}
                  sqft={property.sqft}
                  type={property.type}
                  isSponsored={property.isSponsored}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Property Pricing Trends Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="mb-10 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-purple-900 tracking-tight">Property Pricing Trends</h2>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-purple-300/50 rounded-3xl h-80 flex items-center justify-center border border-purple-200 shadow-inner"
          >
            <div className="flex flex-col items-center gap-2 text-purple-900 opacity-60">
              <TrendingUp className="w-6 h-6" />
              <p className="font-medium text-sm">real-time price trend chart (API generation)</p>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;