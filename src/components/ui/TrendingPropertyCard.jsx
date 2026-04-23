import React, { useState, useEffect } from 'react';
import { MapPin, Bed, Bath, Ruler, Home, Building, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../config/supabase';

const TrendingPropertyCard = ({ id, title, price, location, beds, baths, sqft, type, isSponsored, image }) => {
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
                className="bg-white rounded-xl shadow-lg run-shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl cursor-pointer"
            >
                {/* Top Gradient Section */}
                <div
                    className="h-48 bg-gray-200 relative bg-cover bg-center"
                    style={{ backgroundImage: image ? `url(${image})` : undefined }}
                >
                    {!image && <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500" />}

                    {!image && (
                        <div className="absolute inset-0 flex items-center justify-center">
                            {type === 'Apartment' ? (
                                <Building className="text-white w-16 h-16 drop-shadow-md" />
                            ) : (
                                <Home className="text-white w-16 h-16 drop-shadow-md" />
                            )}
                        </div>
                    )}

                    <button 
                        onClick={toggleFavorite}
                        className="absolute top-3 right-3 p-2.5 bg-white/80 backdrop-blur rounded-full hover:bg-white transition-all shadow-md z-10"
                    >
                        <Heart size={20} className={`${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'} transition-colors`} />
                    </button>
                </div>

                {/* Content Section */}
                <div className="p-5">
                    {/* Sponsored Tag */}
                    {isSponsored && (
                        <span className="bg-orange-400 text-white text-[10px] font-bold px-3 py-1 rounded-full mb-3 inline-block uppercase tracking-wide">
                            sponsored
                        </span>
                    )}

                    <h3 className="font-bold text-gray-800 mb-1 text-sm md:text-base">{title}</h3>

                    <div className="flex items-center text-gray-500 text-xs mb-4">
                        <MapPin size={12} className="mr-1 text-red-500" /> {location}
                    </div>

                    {/* Property Specs */}
                    <div className="flex justify-between items-center text-gray-600 text-xs mb-4">
                        <div className="flex items-center gap-1">
                            <div className="bg-purple-100 p-1.5 rounded-full"><Bed size={14} className="text-gray-900" /></div>
                            <span>{beds}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <div className="bg-blue-100 p-1.5 rounded-full"><Bath size={14} className="text-blue-600" /></div>
                            <span>{baths}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <div className="bg-yellow-100 p-1.5 rounded-full"><Ruler size={14} className="text-yellow-600" /></div>
                            <span>{sqft} sqft</span>
                        </div>
                    </div>

                    <div className="font-bold text-xl text-red-600 border-t border-gray-100 pt-3">
                        {price}
                    </div>
                </div>
            </motion.div>
        </Link>
    );
};

export default TrendingPropertyCard;
