import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import hero1 from '../../assets/images/home_hero/hero1.jpg';
import hero2 from '../../assets/images/home_hero/hero2.jpg';
import hero3 from '../../assets/images/home_hero/hero3.jpg';
import hero4 from '../../assets/images/home_hero/hero4.jpg';
import hero5 from '../../assets/images/home_hero/hero5.jpg';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import PropertyCard from '../../components/ui/PropertyCard';
import TrendingPropertyCard from '../../components/ui/TrendingPropertyCard';
import { TrendingUp, BarChart2 } from 'lucide-react';
import PricingTrendChart from '../../components/ui/PricingTrendChart';

import { properties } from '../../data/properties';

const heroImages = [hero1, hero2, hero3, hero4, hero5];

const Home = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  // Use first 3 properties for Hot Deals
  const hotDeals = properties.slice(0, 3);
  // Use next 3 properties for Trending (or filter if needed)
  const trendingDeals = properties.slice(3, 6);

  return (
    <div className="min-h-screen bg-[#011C40] text-white flex flex-col font-sans selection:bg-[#54ACBF] selection:text-white overflow-x-hidden">
        <Navbar />

      {/* Hero Section with Radial Gradient & Glows */}
      <div className="relative pt-40 pb-20 text-center px-4 overflow-hidden min-h-[90vh] flex flex-col justify-center">

        {/* Animated Background Gradient */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#011C40] via-[#023859] to-[#011C40]"></div>
          <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-[#54ACBF] rounded-full mix-blend-screen filter blur-[120px] opacity-20 animate-pulse"></div>
          <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-[#26658C] rounded-full mix-blend-screen filter blur-[100px] opacity-20 animate-pulse animation-delay-2000"></div>
          <div className="absolute top-[30%] left-[20%] w-[300px] h-[300px] bg-[#A7EBF2] rounded-full mix-blend-overlay filter blur-[80px] opacity-10"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center"
          >
            <span className="py-1 px-4 rounded-full border border-[#54ACBF]/30 bg-[#54ACBF]/10 text-[#A7EBF2] text-sm font-medium mb-6 backdrop-blur-sm">
              No. 1 Property Platform in Sri Lanka
            </span>
            <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tight leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-[#A7EBF2] to-[#54ACBF]">
              Find Your Dream <br /> Property
            </h1>
            <p className="opacity-80 mb-12 text-xl font-light tracking-wide max-w-2xl mx-auto text-blue-100">
              Your trusted platform for Renting, Selling, and Buying properties with verified listings and smart insights.
            </p>
          </motion.div>

          {/* Glassmorphism Search Bar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="glass-card max-w-5xl mx-auto p-6 rounded-3xl"
          >
            {/* Top Row: Search & Button */}
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <input
                type="text"
                placeholder="Search by location, property type..."
                className="flex-grow rounded-2xl px-6 py-4 text-white bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-[#54ACBF]/50 focus:border-[#54ACBF] transition-all placeholder-white/40"
              />
              <button className="bg-gradient-to-r from-[#54ACBF] to-[#26658C] hover:brightness-110 text-white px-10 py-4 rounded-2xl font-bold transition-all shadow-lg shadow-[#54ACBF]/20 transform hover:-translate-y-0.5 active:scale-95 text-lg">
                Search
              </button>
            </div>

            {/* Bottom Row: Filters */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* Custom Select Style wrapper */}
              {[
                { label: 'Radius', options: ['1 km', '5 km', '10 km'] },
                { label: 'Property Type', options: ['Apartment', 'House', 'Villa'] },
                { label: 'Max Price', options: ['50 M', '100 M', '200 M'] },
                { label: 'Bedrooms', options: ['1', '2', '3+'] }
              ].map((filter, index) => (
                <select key={index} className="w-full rounded-xl px-4 py-3 text-sm text-white bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-[#54ACBF]/50 cursor-pointer transition-colors appearance-none hover:bg-white/10">
                  <option value="" className="bg-[#023859] text-gray-400">{filter.label}</option>
                  {filter.options.map((opt) => (
                    <option key={opt} value={opt} className="bg-[#023859]">{opt}</option>
                  ))}
                </select>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Hot Deal Properties Section */}
      <div className="relative py-20 overflow-hidden">
        {/* Section Background Glow */}
        <div className="absolute top-[20%] right-0 w-[500px] h-[500px] bg-[#54ACBF] rounded-full mix-blend-soft-light filter blur-[150px] opacity-10 pointer-events-none"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-2">Hot Deal Properties</h2>
              <p className="text-[#A7EBF2]/70 text-lg font-light">Best value picked exclusively for you</p>
            </div>
            <button className="hidden md:block text-[#54ACBF] hover:text-white font-medium transition-colors">View All Deals →</button>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
            }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {hotDeals.map((property) => (
              <motion.div key={property.id} variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}>
                <PropertyCard
                  id={property.id}
                  title={property.title}
                  price={property.price}
                  location={property.location}
                  type={property.type}
                  isFeatured={property.isFeatured}
                  image={property.images[0]}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Trending Properties Section */}
      <div className="relative py-20 bg-[#001026]/50">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Trending Properties</h2>
            <p className="text-[#A7EBF2]/70 text-lg font-light mt-2">Most viewed properties this week</p>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
            }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {trendingDeals.map((property) => (
              <motion.div key={property.id} variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}>
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
                  image={property.images[0]}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Property Pricing Trends Section */}
      <div className="relative py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Market Insights</h2>
            <p className="text-[#A7EBF2]/70 text-lg font-light mt-2">Track property value trends in your area</p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto glass-card p-8 rounded-3xl"
          >
            <PricingTrendChart />
          </motion.div>
        </div>
      </div>
        <Footer />
    </div>
  );
};

export default Home;