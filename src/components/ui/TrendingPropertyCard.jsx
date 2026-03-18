import React from 'react';
import { MapPin, Bed, Bath, Ruler, Home, Building } from 'lucide-react';
import { motion } from 'framer-motion';

import { Link } from 'react-router-dom';

const TrendingPropertyCard = ({ id, title, price, location, beds, baths, sqft, type, isSponsored, image }) => {
    return (
        <Link to={`/property/${id}`}>
            <motion.div
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="glass-card rounded-2xl shadow-lg overflow-hidden cursor-pointer group hover:shadow-[#54ACBF]/20"
            >
                {/* Top Gradient Section */}
                <div
                    className="h-48 bg-[#023859] relative bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                    style={{ backgroundImage: image ? `url(${image})` : undefined }}
                >
                    {!image && <div className="absolute inset-0 bg-gradient-to-r from-[#023859] to-[#011C40]" />}

                    {!image && (
                        <div className="absolute inset-0 flex items-center justify-center">
                            {type === 'Apartment' ? (
                                <Building className="text-white w-16 h-16 drop-shadow-md" />
                            ) : (
                                <Home className="text-white w-16 h-16 drop-shadow-md" />
                            )}
                        </div>
                    )}
                </div>

                {/* Content Section */}
                <div className="p-5 relative bg-[#011C40]/40 backdrop-blur-md">
                    {/* Sponsored Tag */}
                    {isSponsored && (
                        <span className="bg-orange-500/20 text-orange-400 border border-orange-500/30 text-[10px] font-bold px-3 py-1 rounded-full mb-3 inline-block uppercase tracking-wide">
                            sponsored
                        </span>
                    )}

                    <h3 className="font-bold text-white mb-2 text-sm md:text-base">{title}</h3>

                    <div className="flex items-center text-white/70 text-xs mb-4">
                        <MapPin size={12} className="mr-1 text-[#54ACBF]" /> {location}
                    </div>

                    {/* Property Specs */}
                    <div className="flex justify-between items-center text-white/60 text-xs mb-4">
                        <div className="flex items-center gap-1">
                            <div className="bg-[#54ACBF]/10 p-1.5 rounded-full"><Bed size={14} className="text-[#54ACBF]" /></div>
                            <span>{beds}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <div className="bg-[#54ACBF]/10 p-1.5 rounded-full"><Bath size={14} className="text-[#54ACBF]" /></div>
                            <span>{baths}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <div className="bg-[#54ACBF]/10 p-1.5 rounded-full"><Ruler size={14} className="text-[#54ACBF]" /></div>
                            <span>{sqft} sqft</span>
                        </div>
                    </div>

                    <div className="font-bold text-xl text-[#54ACBF] border-t border-white/10 pt-3">
                        {price}
                    </div>
                </div>
            </motion.div>
        </Link>
    );
};

export default TrendingPropertyCard;
