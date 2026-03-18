import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import PropertyCard from '../../components/ui/PropertyCard';
import { Filter, MapPin, List, Map, Search } from 'lucide-react';
import { properties } from '../../data/properties';
import heroImage from '../../assets/images/home_hero/hero7.jpg';

const Properties = () => {
  // Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [beds, setBeds] = useState('');
  const [baths, setBaths] = useState('');

  // Derived properties based on filters
  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      const matchSearch = searchTerm === '' || 
        property.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        property.location.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchType = propertyType === '' || property.type.toLowerCase() === propertyType.toLowerCase();
      
      // Basic number extraction from string like "Rs. 250,000" or "45 M"
      const parsePrice = (priceStr) => {
        if (!priceStr) return 0;
        const normalized = priceStr.toUpperCase();
        const baseNum = parseFloat(normalized.replace(/[^0-9.]/g, ''));
        if (normalized.includes('M')) return baseNum * 1000000;
        return baseNum;
      };

      const propPrice = parsePrice(property.price);
      const minP = parsePrice(minPrice);
      const maxP = parsePrice(maxPrice);

      const matchMinPrice = minPrice === '' || propPrice >= minP;
      const matchMaxPrice = maxPrice === '' || (maxP > 0 && propPrice <= maxP);

      const matchBeds = beds === '' || property.beds >= parseInt(beds);
      const matchBaths = baths === '' || property.baths >= parseInt(baths);

      return matchSearch && matchType && matchMinPrice && matchMaxPrice && matchBeds && matchBaths;
    });
  }, [searchTerm, propertyType, minPrice, maxPrice, beds, baths]);


  return (
    <div className="flex flex-col min-h-screen bg-[#011C40] text-white">
        <Navbar />
      
      {/* Hero Section */}
      <div className="relative pt-32 pb-16 text-center px-4 mb-6 bg-cover bg-center overflow-hidden" style={{ backgroundImage: `url(${heroImage})` }}>
        <div className="absolute inset-0 bg-[#011C40]/80 z-0 backdrop-blur-sm"></div>
        <div className="relative z-10">
          <motion.h1
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl md:text-6xl font-bold mb-4 tracking-tight"
          >
            Browse <span className="text-[#54ACBF]">Properties</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-[#A7EBF2]/80 text-xl font-light"
          >
            Discover the best properties available in the market.
          </motion.p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container mx-auto px-4 pb-16 flex flex-col lg:flex-row gap-8">
        
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-1/4 h-fit">
          <div className="glass-card bg-white/5 border border-white/10 p-6 rounded-2xl sticky top-24">
            <h3 className="font-bold text-white border-b border-white/10 pb-4 mb-6 text-xl flex items-center gap-2">
              <Filter className="text-[#54ACBF]" size={20} />
              Filter Properties
            </h3>

            <div className="space-y-6">
              {/* Search / Location */}
              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">Search Location or Title</label>
                <div className="relative">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="e.g. Colombo, Apartment..."
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#54ACBF]/50 focus:border-[#54ACBF] text-white placeholder-white/40 transition-all"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40" size={16} />
                </div>
              </div>

              {/* Property Type */}
              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">Property Type</label>
                <select 
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#54ACBF]/50 text-white appearance-none cursor-pointer"
                >
                  <option value="" className="bg-[#023859]">All Types</option>
                  <option value="apartment" className="bg-[#023859]">Apartment</option>
                  <option value="house" className="bg-[#023859]">House</option>
                  <option value="villa" className="bg-[#023859]">Villa</option>
                  <option value="land" className="bg-[#023859]">Land</option>
                </select>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">Price Range (LKR / USD)</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    placeholder="Min"
                    className="w-1/2 p-3 bg-white/5 border border-white/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#54ACBF]/50 text-white placeholder-white/40 transition-all"
                  />
                  <span className="text-white/40">-</span>
                  <input
                    type="text"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    placeholder="Max"
                    className="w-1/2 p-3 bg-white/5 border border-white/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#54ACBF]/50 text-white placeholder-white/40 transition-all"
                  />
                </div>
              </div>

              {/* Bedrooms & Bathrooms */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">Bedrooms</label>
                  <select 
                    value={beds}
                    onChange={(e) => setBeds(e.target.value)}
                    className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#54ACBF]/50 text-white appearance-none cursor-pointer"
                  >
                    <option value="" className="bg-[#023859]">Any</option>
                    <option value="1" className="bg-[#023859]">1+</option>
                    <option value="2" className="bg-[#023859]">2+</option>
                    <option value="3" className="bg-[#023859]">3+</option>
                    <option value="4" className="bg-[#023859]">4+</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">Bathrooms</label>
                  <select 
                    value={baths}
                    onChange={(e) => setBaths(e.target.value)}
                    className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#54ACBF]/50 text-white appearance-none cursor-pointer"
                  >
                    <option value="" className="bg-[#023859]">Any</option>
                    <option value="1" className="bg-[#023859]">1+</option>
                    <option value="2" className="bg-[#023859]">2+</option>
                    <option value="3" className="bg-[#023859]">3+</option>
                  </select>
                </div>
              </div>

              <button 
                onClick={() => {
                  setSearchTerm(''); setPropertyType(''); setMinPrice(''); setMaxPrice(''); setBeds(''); setBaths('');
                }}
                className="w-full mt-4 bg-transparent border border-[#54ACBF]/50 hover:bg-[#54ACBF]/10 text-[#54ACBF] font-medium py-3 rounded-xl transition-all duration-300"
              >
                Reset Filters
              </button>
            </div>
          </div>
        </aside>

        {/* Property Grid Area */}
        <main className="w-full lg:w-3/4 flex flex-col gap-6">
          
          {/* Top Bar for Results */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card bg-white/5 p-4 border border-white/10 rounded-2xl flex flex-col sm:flex-row justify-between items-center gap-4"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#54ACBF]/20 rounded-lg">
                <MapPin className="text-[#54ACBF]" size={20} />
              </div>
              <h2 className="text-lg font-medium text-white">
                Showing <span className="font-bold text-[#A7EBF2]">{filteredProperties.length}</span> Properties
              </h2>
            </div>
            
            <div className="flex items-center gap-3 p-1 bg-black/20 rounded-xl rounded-md border border-white/5">
              <button className="flex items-center gap-2 bg-[#54ACBF] text-white px-4 py-2 rounded-lg shadow-lg hover:brightness-110 transition-all">
                <List size={18} />
                <span className="font-medium text-sm">List</span>
              </button>
              <button className="flex items-center gap-2 text-white/60 hover:text-white px-4 py-2 rounded-lg transition-all">
                <Map size={18} />
                <span className="font-medium text-sm">Map</span>
              </button>
            </div>
          </motion.div>

          {/* Grid */}
          {filteredProperties.length > 0 ? (
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
              }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {filteredProperties.map((property) => (
                <motion.div key={property.id} variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}>
                  <PropertyCard
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
                </motion.div>
              ))}
            </motion.div>
          ) : (
             <div className="flex flex-col items-center justify-center p-16 glass-card bg-white/5 border border-white/10 rounded-2xl text-center">
               <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6">
                 <Search className="text-[#54ACBF] w-10 h-10" />
               </div>
               <h3 className="text-2xl font-bold text-white mb-2">No properties found</h3>
               <p className="text-white/60">Try adjusting your filters to find what you're looking for.</p>
               <button 
                 onClick={() => {
                    setSearchTerm(''); setPropertyType(''); setMinPrice(''); setMaxPrice(''); setBeds(''); setBaths('');
                 }}
                 className="mt-6 bg-[#54ACBF] hover:bg-[#54ACBF]/90 text-white font-medium px-6 py-3 rounded-xl transition-all"
               >
                 Clear all filters
               </button>
             </div>
          )}
        </main>
      </div>
        <Footer />
    </div>
  );
};

export default Properties;