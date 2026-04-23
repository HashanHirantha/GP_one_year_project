import React, { useState, useEffect } from 'react';
import { MapPin, Home, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../config/supabase';

const PropertyCard = ({ id, title, price, location, type, isFeatured, image, is_available = true, beds, baths, sqft }) => {
  const { user } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (user && id) {
      checkFavorite();
    }
  }, [user, id]);

  const checkFavorite = async () => {
    try {
      const { data, error } = await supabase
        .from('favorites')
        .select('id')
        .eq('user_id', user.id)
        .eq('property_id', id)
        .maybeSingle();
      
      if (!error && data) {
        setIsFavorite(true);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const toggleFavorite = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      alert("Please login to save properties to your favorites.");
      return;
    }

    try {
      if (isFavorite) {
        setIsFavorite(false);
        await supabase.from('favorites').delete().eq('user_id', user.id).eq('property_id', id);
      } else {
        setIsFavorite(true);
        await supabase.from('favorites').insert([{ user_id: user.id, property_id: id }]);
      }
    } catch (err) {
      console.error("Error toggling favorite:", err);
    }
  };

  return (
    <Link to={`/property/${id}`}>
      <motion.div
        whileHover={{ y: -10, scale: 1.02 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl cursor-pointer"
      >
        <div
          className="h-40 bg-gray-200 relative bg-cover bg-center group"
          style={{ backgroundImage: image ? `url(${image})` : undefined }}
        >
          {!image && <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-blue-500" />}

          {image ? null : <Home className="text-white w-12 h-12 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />}  {/* Only show icon if no image */}

          <button 
            onClick={toggleFavorite}
            className="absolute top-2 right-2 p-2 bg-white/80 backdrop-blur rounded-full hover:bg-white transition-all shadow-md z-10"
          >
            <Heart size={18} className={`${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'} transition-colors`} />
          </button>

          {isFeatured && (
            <span className="absolute top-2 left-2 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded z-10 shadow-md">
              Featured
            </span>
          )}
          
          {!is_available && (
            <span className="absolute bottom-2 left-2 bg-red-600/90 text-white text-xs font-bold px-3 py-1 rounded backdrop-blur-sm shadow-md border border-white/20 z-10">
              Unavailable
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
            {beds != null && <span>🛏 {beds} Beds</span>}
            {baths != null && <span>🛁 {baths} Baths</span>}
            {sqft != null && <span>📐 {sqft} sqft</span>}
          </div>
          <div className="mt-4 font-bold text-lg text-red-600">
            {price}
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default PropertyCard;
