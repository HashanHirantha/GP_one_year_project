import React from 'react';
import { MapPin, Home } from 'lucide-react';
import { motion } from 'framer-motion';

import { Link } from 'react-router-dom';

const PropertyCard = ({ id, title, price, location, type, isFeatured }) => (
  <Link to={`/property/${id}`}>
    <motion.div
      whileHover={{ y: -10, scale: 1.02 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl cursor-pointer"
    >
      <div className="h-40 bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center relative">
        <Home className="text-white w-12 h-12" />
        {isFeatured && (
          <span className="absolute top-2 left-2 bg-yellow-400 text-purple-900 text-xs font-bold px-2 py-1 rounded">
            Featured
          </span>
        )}
      </div>

      <div className="p-4">
        <span className="bg-purple-100 text-primary text-xs font-bold px-2 py-0.5 rounded-full mb-2 inline-block">
          {type}
        </span>
        <h3 className="font-bold text-gray-800 mb-1">{title}</h3>
        <div className="flex items-center text-gray-500 text-xs mb-3">
          <MapPin size={12} className="mr-1" /> {location}
        </div>
        <div className="flex justify-between border-t border-gray-100 pt-3 text-xs text-gray-600">
          <span>🛏 3 Beds</span>
          <span>🛁 2 Baths</span>
          <span>📐 750 sqft</span>
        </div>
        <div className="mt-4 font-bold text-lg text-primary">
          {price}
        </div>
      </div>
    </motion.div>
  </Link>
);

export default PropertyCard;