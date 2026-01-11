import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import PropertyCard from '../../components/ui/PropertyCard';
import TrendingPropertyCard from '../../components/ui/TrendingPropertyCard';
import { TrendingUp, BarChart2 } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-primary via-purple-700 to-secondary text-white pt-32 pb-16 text-center px-4 overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-blob"></div>
          <div className="absolute top-[20%] right-[-10%] w-96 h-96 bg-accent rounded-full mix-blend-overlay filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-[-20%] left-[20%] w-96 h-96 bg-secondary rounded-full mix-blend-overlay filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto">
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
            transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
            className="bg-white/10 backdrop-blur-md p-1.5 rounded-full shadow-2xl max-w-3xl mx-auto border border-white/20"
          >
            <div className="bg-white p-1 rounded-full flex flex-col md:flex-row gap-1 items-center">
              <input
                type="text"
                placeholder="Search by location, property type..."
                className="flex-grow py-3 px-6 outline-none text-gray-700 placeholder-gray-400 bg-transparent text-sm md:text-base rounded-full"
              />
              <button className="w-full md:w-auto bg-primary hover:bg-purple-800 text-white px-8 py-3 rounded-full font-bold transition-all shadow-md active:scale-95 text-sm md:text-base">
                Search
              </button>
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
          <motion.div variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}>
            <PropertyCard title="2 Bedroom Apartment" price="Rs. 81M" location="Colombo 3" type="Apartment" />
          </motion.div>
          <motion.div variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}>
            <PropertyCard title="Luxury House" price="Rs. 49.2M" location="Nugegoda" type="House" isFeatured={true} />
          </motion.div>
          <motion.div variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}>
            <PropertyCard title="Modern Family House" price="Rs. 125M" location="Colombo 5" type="House" />
          </motion.div>
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
            <motion.div variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}>
              <TrendingPropertyCard
                title="High-Floor Altair Apartment"
                location="Colombo 3"
                price="Rs. 145M"
                beds={3}
                baths={2}
                sqft={1627}
                type="Apartment"
                isSponsored={true}
              />
            </motion.div>
            <motion.div variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}>
              <TrendingPropertyCard
                title="Luxury House For Sale"
                location="Nugegoda"
                price="Rs. 200M"
                beds={5}
                baths={4}
                sqft={4000}
                type="House"
                isSponsored={true}
              />
            </motion.div>
            <motion.div variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}>
              <TrendingPropertyCard
                title="2 Bedroom Apartment"
                location="Colombo 2"
                price="Rs. 62.5M"
                beds={2}
                baths={2}
                sqft={720}
                type="Apartment"
                isSponsored={true}
              />
            </motion.div>
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