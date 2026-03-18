import React from 'react';
import { MapPin, Home } from 'lucide-react';
import { motion } from 'framer-motion';

import { Link } from 'react-router-dom';

const PropertyCard = ({ id, title, price, location, type, isFeatured, image, beds, baths, sqft }) => (
  <Link to={`/property/${id}`}>
    <motion.div
      whileHover={{ y: -10, scale: 1.02 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="glass-card rounded-2xl overflow-hidden hover:shadow-[#54ACBF]/20 cursor-pointer group"
    >
      <div
        className="h-48 bg-[#023859] relative bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
        style={{ backgroundImage: image ? `url(${image})` : undefined }}
      >
        {!image && <div className="absolute inset-0 bg-gradient-to-r from-[#023859] to-[#011C40]" />}

        {image ? null : <Home className="text-white/50 w-12 h-12 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />}

        {isFeatured && (
          <span className="absolute top-3 left-3 bg-[#54ACBF] text-white text-xs font-bold px-3 py-1 rounded-full z-10 shadow-lg">
            Featured
          </span>
        )}
      </div>

      <div className="p-5 relative bg-[#011C40]/40 backdrop-blur-md">
        <span className="bg-[#54ACBF]/20 text-[#A7EBF2] border border-[#54ACBF]/30 text-xs font-bold px-3 py-1 rounded-full mb-3 inline-block">
          {type}
        </span>
        <h3 className="font-bold text-white text-lg mb-2">{title}</h3>
        <div className="flex items-center text-white/70 text-sm mb-4">
          <MapPin size={14} className="mr-1 text-[#54ACBF]" /> {location}
        </div>
        <div className="flex justify-between border-t border-white/10 pt-4 text-xs text-white/60">
          <span>🛏 {beds} Beds</span>
          <span>🛁 {baths} Baths</span>
          <span>📐 {sqft} sqft</span>
        </div>
        <div className="mt-4 font-bold text-xl text-[#54ACBF]">
          {price}
        </div>
      </div>
    </motion.div>
  </Link>
);

export default PropertyCard;