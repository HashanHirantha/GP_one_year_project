import React from 'react';
import { MapPin, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

const PropertyCard = ({ id, title, price, location, type, isFeatured, image, bedrooms, bathrooms, area }) => (
  <Link to={`/properties/${id}`} className="block group">
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition transform group-hover:-translate-y-1 duration-300">
      <div className="h-40 bg-gray-200 relative">
        {image ? (
          <img src={image} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500">
            <Home className="text-white w-12 h-12" />
          </div>
        )}
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
        <h3 className="font-bold text-gray-800 mb-1 group-hover:text-primary transition">{title}</h3>
        <div className="flex items-center text-gray-500 text-xs mb-3">
          <MapPin size={12} className="mr-1" /> {location}
        </div>
        <div className="flex justify-between border-t border-gray-100 pt-3 text-xs text-gray-600">
          <span>🛏 {bedrooms || '-'} Beds</span>
          <span>🛁 {bathrooms || '-'} Baths</span>
          <span>📐 {area || '-'}</span>
        </div>
        <div className="mt-4 font-bold text-lg text-primary">
          {price}
        </div>
      </div>
    </div>
  </Link>
);

export default PropertyCard;