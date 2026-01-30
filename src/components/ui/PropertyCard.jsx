import React from 'react';
import { MapPin, Home } from 'lucide-react';
import { motion } from 'framer-motion';

import { Link } from 'react-router-dom';

const PropertyCard = ({ id, title, price, location, type, isFeatured, image, beds, baths, sqft }) => (
  <Link to={`/property/${id}`}>
    <motion.div
      whileHover={{ y: -10, scale: 1.02 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl cursor-pointer"
    >
      <div
        className="h-40 bg-gray-200 relative bg-cover bg-center"
        style={{ backgroundImage: image ? `url(${image})` : undefined }}
      >
        {!image && <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-blue-500" />}

        {image ? null : <Home className="text-white w-12 h-12 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />}  {/* Only show icon if no image */}

        {isFeatured && (
          <span className="absolute top-2 left-2 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded z-10">
            Featured
          </span>
        )}
      </div>

      <div className="p-4">
        <span className="bg-green-100 text-black text-xs font-bold px-2 py-0.5 rounded-full mb-2 inline-block">
          {type}
        </span>
        <h3 className="font-bold text-gray-800 mb-1">{title}</h3>
        <div className="flex items-center text-gray-500 text-xs mb-3">
          <MapPin size={12} className="mr-1" /> {location}
        </div>
        <div className="flex justify-between border-t border-gray-100 pt-3 text-xs text-gray-600">
          <span>🛏 {beds} Beds</span>
          <span>🛁 {baths} Baths</span>
          <span>📐 {sqft} sqft</span>
        </div>
        <div className="mt-4 font-bold text-lg text-red-600">
          {price}
        </div>
      </div>
    </motion.div>
  </Link>
);

export default PropertyCard;