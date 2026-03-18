import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Bed, Bath, Ruler, Car, Phone, Mail, MessageSquare, Heart, Calendar, Share2, Printer, ChevronLeft, ChevronRight, Star, FileText, Camera } from 'lucide-react';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import { properties } from '../../data/properties';

const PropertyDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [property, setProperty] = useState(null);
    const [activeImage, setActiveImage] = useState(0);

    useEffect(() => {
        // Fallback to id 2 if param is not found just for demo purposes if coming from a non-linked card
        const propId = id ? parseInt(id) : 2;
        const foundProperty = properties.find(p => p.id === propId);

        if (foundProperty) {
            setProperty(foundProperty);
        } else {
            // Optional: Set default or redirect
        }
    }, [id]);

    if (!property) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
                <Navbar />
                <div className="flex-grow flex flex-col items-center justify-center">
                    <h2 className="text-2xl font-bold text-gray-800">Property Not Found</h2>
                    <button onClick={() => navigate('/')} className="mt-4 text-gray-900 hover:underline">Go Back Home</button>
                </div>
                <Footer />
            </div>
        );
    }

    const nextImage = () => {
        setActiveImage((prev) => (prev + 1) % property.images.length);
    };

    const prevImage = () => {
        setActiveImage((prev) => (prev - 1 + property.images.length) % property.images.length);
    };

    return (
        <div className="min-h-screen bg-transparent flex flex-col font-sans text-white">
            <Navbar />

            {/* Breadcrumbs */}
            <div className="pt-24 pb-4">
                <div className="container mx-auto px-4 text-xs md:text-sm text-gray-400 font-medium">
                    <Link to="/" className="hover:text-white transition">Home</Link>
                    <span className="mx-2">/</span>
                    <Link to="/properties" className="hover:text-white transition">Properties</Link>
                    <span className="mx-2">/</span>
                    <span className="text-[#54ACBF] font-bold">{property.title}</span>
                </div>
            </div>

            <main className="container mx-auto px-4 pb-12 flex-grow">
                {/* Image Gallery */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="mb-8"
                >
                    <div className="relative h-[300px] md:h-[500px] bg-[#023859]/50 rounded-3xl overflow-hidden shadow-xl group border border-white/10">
                        <AnimatePresence mode='wait'>
                            <motion.img
                                key={activeImage}
                                src={property.images[activeImage]}
                                alt={property.title}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="w-full h-full object-cover"
                            />
                        </AnimatePresence>

                        {/* Navigation Arrows */}
                        <div className="absolute inset-0 flex justify-between items-center px-4">
                            <button onClick={prevImage} className="bg-black/40 hover:bg-black/60 text-white p-3 rounded-full transition backdrop-blur-sm transform hover:scale-110">
                                <ChevronLeft size={28} />
                            </button>
                            <button onClick={nextImage} className="bg-black/40 hover:bg-black/60 text-white p-3 rounded-full transition backdrop-blur-sm transform hover:scale-110">
                                <ChevronRight size={28} />
                            </button>
                        </div>
                    </div>

                    {/* Thumbnails */}
                    <div className="flex gap-4 mt-4 justify-center md:justify-start overflow-x-auto pb-2 scrollbar-none">
                        {property.images.map((img, idx) => (
                            <button
                                key={idx}
                                onClick={() => setActiveImage(idx)}
                                className={`w-15 h-15 md:w-15 md:h-15 rounded-2xl overflow-hidden border-2 transition-all flex items-center justify-center bg-[#023859]/50 duration-300 ${activeImage === idx ? 'border-[#54ACBF] ring-2 ring-[#54ACBF]/30 scale-105' : 'border-transparent opacity-60 hover:opacity-100 hover:scale-105'}`}
                            >
                                <Camera className="text-white/50 w-5 h-5" />
                            </button>
                        ))}
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Details */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Title & Stats */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="glass-card p-6 md:p-8 rounded-3xl"
                        >
                            <div className="mb-4">
                                <span className="bg-[#54ACBF]/20 text-[#A7EBF2] border border-[#54ACBF]/30 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wide inline-block">
                                    {property.type} for sale
                                </span>
                            </div>

                            <h1 className="text-3xl md:text-3xl font-extrabold text-white mb-2">{property.title}</h1>

                            <div className="flex items-center text-gray-300 text-sm mb-6 font-medium">
                                <MapPin size={16} className="mr-1 text-[#54ACBF]" /> {property.location}, Sri Lanka
                            </div>

                            <div className="text-4xl font-extrabold text-[#54ACBF] mb-8 tracking-tight">
                                {property.price}
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="bg-white/5 p-4 rounded-2xl text-center border border-white/10 hover:border-[#54ACBF]/50 transition-colors duration-300">
                                    <div className="bg-[#54ACBF]/20 w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2">
                                        <Bed size={18} className="text-[#A7EBF2]" />
                                    </div>
                                    <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Bedrooms</p>
                                    <p className="font-bold text-white text-lg">{property.beds}</p>
                                </div>
                                <div className="bg-white/5 p-4 rounded-2xl text-center border border-white/10 hover:border-[#54ACBF]/50 transition-colors duration-300">
                                    <div className="bg-[#54ACBF]/20 w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2">
                                        <Bath size={18} className="text-[#A7EBF2]" />
                                    </div>
                                    <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Bathrooms</p>
                                    <p className="font-bold text-white text-lg">{property.baths}</p>
                                </div>
                                <div className="bg-white/5 p-4 rounded-2xl text-center border border-white/10 hover:border-[#54ACBF]/50 transition-colors duration-300">
                                    <div className="bg-[#54ACBF]/20 w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2">
                                        <Ruler size={18} className="text-[#A7EBF2]" />
                                    </div>
                                    <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Area</p>
                                    <p className="font-bold text-white text-lg">{property.sqft} sqft</p>
                                </div>
                                <div className="bg-white/5 p-4 rounded-2xl text-center border border-white/10 hover:border-[#54ACBF]/50 transition-colors duration-300">
                                    <div className="bg-[#54ACBF]/20 w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2">
                                        <Car size={18} className="text-[#A7EBF2]" />
                                    </div>
                                    <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Parking</p>
                                    <p className="font-bold text-white text-lg">{property.parking}</p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Description */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="glass-card p-6 md:p-8 rounded-3xl"
                        >
                            <h3 className="text-lg font-bold text-white mb-4">Description</h3>
                            <p className="text-gray-300 leading-relaxed text-sm md:text-sm">
                                {property.description}
                            </p>
                        </motion.div>

                        {/* Amenities */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="glass-card p-6 md:p-8 rounded-3xl"
                        >
                            <h3 className="text-lg font-bold text-white mb-6 border-b border-white/10 pb-2">Amenities</h3>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-3 gap-x-6">
                                {property.amenities.map((amenity, index) => (
                                    <div key={index} className="flex items-center text-xs md:text-sm text-gray-300">
                                        <div className="min-w-[16px] h-4 text-[#54ACBF] mr-2">✓</div>
                                        {amenity}
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Location Map */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                            className="glass-card p-6 md:p-8 rounded-3xl"
                        >
                            <h3 className="text-lg font-bold text-white mb-4 border-b border-white/10 pb-2">Location</h3>
                            <div className="w-full h-64 bg-black/20 rounded-2xl overflow-hidden relative border border-white/10">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15843.19446450849!2d79.85044455!3d6.91470765!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae259695d862957%3A0xe53b2655bfd28362!2sColombo%2003%2C%20Colombo!5e0!3m2!1sen!2slk!4v1700000000000!5m2!1sen!2slk"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
                                    allowFullScreen=""
                                    loading="lazy"
                                ></iframe>
                            </div>
                        </motion.div>

                        {/* Documents */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            className="glass-card p-6 md:p-8 rounded-3xl"
                        >
                            <h3 className="text-lg font-bold text-white mb-4 border-b border-white/10 pb-2">Documents</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {['Title Deed', 'Floor Plan', 'Building Approval', 'Property Survey'].map((doc, i) => (
                                    <div key={i} className="flex items-center gap-3 text-sm text-gray-300 p-2 hover:bg-white/5 rounded-lg transition border border-transparent hover:border-white/10">
                                        <div className="w-4 h-4 border border-gray-400 rounded-sm flex items-center justify-center"></div> {doc}
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Reviews */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.7 }}
                            className="glass-card p-6 md:p-8 rounded-3xl"
                        >
                            <h3 className="text-lg font-bold text-white mb-4 border-b border-white/10 pb-2 flex items-center gap-2">
                                Reviews(4.5 <Star size={16} className="text-yellow-400 fill-current" />)
                            </h3>
                            <div className="space-y-4">
                                {property.reviews && property.reviews.length > 0 ? (
                                    property.reviews.map((review, idx) => (
                                        <div key={idx} className="bg-white/5 p-4 rounded-xl border border-white/10">
                                            <div className="flex items-center justify-between mb-2">
                                                <h4 className="font-bold text-white text-sm">{review.user} <span className="text-yellow-500 text-xs ml-1 tracking-widest">★★★★★</span></h4>
                                            </div>
                                            <p className="text-xs text-gray-300">{review.comment}</p>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-500 text-sm italic">No reviews yet.</p>
                                )}
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column - Sidebar */}
                    <div className="space-y-6">
                        {/* Owner Card */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="glass-card p-6 rounded-3xl sticky top-28"
                        >
                            <h3 className="text-sm font-bold text-white mb-4 border-b border-white/10 pb-3">Contact Property Owner</h3>
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-14 h-14 rounded-full bg-[#54ACBF] text-white flex items-center justify-center font-bold text-xl shadow-md border-2 border-white/20">
                                    {property.owner.name.charAt(0)}D
                                </div>
                                <div>
                                    <h4 className="font-extrabold text-white text-sm">{property.owner.name}</h4>
                                    <div className="text-[10px] text-[#A7EBF2] uppercase font-bold tracking-wide">{property.owner.role}</div>
                                    <div className="flex items-center text-[10px] text-yellow-500 mt-1 font-bold">
                                        <Star size={10} className="fill-current mr-1" /> {property.owner.rating} ({property.owner.reviews} reviews)
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <button className="w-full bg-[#54ACBF] hover:bg-white text-white hover:text-black text-xs font-bold py-3 rounded-full transition-all duration-300 shadow-lg shadow-black/20 hover:shadow-xl active:scale-95 flex items-center justify-center gap-2 transform hover:-translate-y-0.5">
                                    <Phone size={14} className="fill-current" /> Call Owner
                                </button>
                                <button className="w-full bg-white/10 hover:bg-white/20 border border-white/10 text-white text-xs font-bold py-3 rounded-xl transition shadow-sm active:scale-95 flex items-center justify-center gap-2">
                                    <MessageSquare size={14} /> Send Message
                                </button>
                                <button className="w-full bg-white/10 hover:bg-white/20 border border-white/10 text-white text-xs font-bold py-3 rounded-xl transition shadow-sm active:scale-95 flex items-center justify-center gap-2">
                                    <Mail size={14} /> Send Email
                                </button>
                            </div>
                        </motion.div>

                        {/* Quick Actions */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            className="glass-card p-6 rounded-3xl sticky top-[450px]"
                        >
                            <h3 className="text-sm font-bold text-white mb-4 border-b border-white/10 pb-3">Quick Actions</h3>
                            <div className="space-y-3">
                                <button className="w-full bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white text-xs font-bold py-2.5 px-4 rounded-lg flex items-center gap-3 transition border border-transparent hover:border-white/10">
                                    <Heart size={14} className="text-pink-500 fill-current" /> Save to Favorites
                                </button>
                                <button className="w-full bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white text-xs font-bold py-2.5 px-4 rounded-lg flex items-center gap-3 transition border border-transparent hover:border-white/10">
                                    <Calendar size={14} className="text-red-400 fill-current" /> Schedule Viewing
                                </button>
                                <button className="w-full bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white text-xs font-bold py-2.5 px-4 rounded-lg flex items-center gap-3 transition border border-transparent hover:border-white/10">
                                    <FileText size={14} className="text-blue-500 fill-current" /> Compare Properties
                                </button>
                                <button className="w-full bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white text-xs font-bold py-2.5 px-4 rounded-lg flex items-center gap-3 transition border border-transparent hover:border-white/10">
                                    <Share2 size={14} className="text-gray-500 fill-current" /> Share Property
                                </button>
                                <button className="w-full bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white text-xs font-bold py-2.5 px-4 rounded-lg flex items-center gap-3 transition border border-transparent hover:border-white/10">
                                    <Printer size={14} className="text-gray-500 fill-current" /> Print Details
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default PropertyDetails;
