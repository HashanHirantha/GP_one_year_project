import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import {
    MapPin,
    BedDouble,
    Bath,
    Maximize,
    Car,
    Phone,
    Mail,
    Share2,
    Heart,
    Printer,
    Calendar,
    ArrowRightLeft,
    FileText,
    Star,
    CheckCircle,
    Building2,
    Shield
} from 'lucide-react';
import { properties } from '../../data/properties';

const PropertyDetails = () => {
    const { id } = useParams();
    const [property, setProperty] = useState(null);
    const [activeImage, setActiveImage] = useState('');
    const [contactStatus, setContactStatus] = useState('idle');
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const found = properties.find(p => p.id === id);
        if (found) {
            setProperty(found);
            setActiveImage(found.images?.[0] || found.image);
            // Scroll to top on load
            window.scrollTo(0, 0);
        }
    }, [id]);

    const handleContactSubmit = (e) => {
        e.preventDefault();
        setContactStatus('sending');
        setTimeout(() => {
            setContactStatus('success');
        }, 1500);
    };

    if (!property) {
        return (
            <div className="min-h-screen bg-cream flex flex-col font-sans">
                <Navbar />
                <div className="flex-grow flex items-center justify-center">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-darkgreen mx-auto mb-4"></div>
                        <p className="text-gray-500">Loading Property...</p>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-cream flex flex-col font-sans text-gray-800">
            <Navbar />

            {/* Breadcrumb Header */}
            <div className="bg-white/50 backdrop-blur-sm border-b border-sage/10">
                <div className="container mx-auto px-6 py-4">
                    <div className="flex items-center text-sm text-gray-500">
                        <Link to="/" className="hover:text-darkgreen transition">Home</Link>
                        <span className="mx-2 text-sage/40">/</span>
                        <Link to="/properties" className="hover:text-darkgreen transition">Properties</Link>
                        <span className="mx-2 text-sage/40">/</span>
                        <span className="text-darkgreen font-semibold truncate max-w-[200px] md:max-w-none">{property.title}</span>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 py-8">
                {/* Title & Price Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <span className="bg-sage text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                                {property.type}
                            </span>
                            <span className="bg-darkgreen text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                                {property.status}
                            </span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-extrabold text-darkgreen tracking-tight drop-shadow-sm">{property.title}</h1>
                        <div className="flex items-center text-gray-500 mt-2 font-medium">
                            <MapPin size={18} className="mr-1.5 text-sage" />
                            {property.address}
                        </div>
                    </div>
                    <div className="flex flex-col items-end">
                        <div className="text-3xl md:text-4xl font-bold text-darkgreen">{property.price}</div>
                        <p className="text-sm text-gray-500 mt-1">Price per perch / unit</p>
                    </div>
                </div>

                {/* Main Layout Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* Left Column: Media & Details (8 cols) */}
                    <div className="lg:col-span-8 space-y-8">

                        {/* Image Gallery */}
                        <div className="bg-white p-2 rounded-3xl shadow-sm border border-sage/10">
                            <div className="relative h-[400px] md:h-[550px] rounded-2xl overflow-hidden group">
                                <img
                                    src={activeImage}
                                    alt={property.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute top-4 right-4 flex gap-2">
                                    <button
                                        onClick={() => setIsFavorite(!isFavorite)}
                                        className={`p-3 rounded-full backdrop-blur-md transition-all duration-300 shadow-lg ${isFavorite ? 'bg-red-50 text-red-500' : 'bg-white/90 text-gray-600 hover:bg-white hover:text-red-500'}`}
                                    >
                                        <Heart size={20} className={isFavorite ? "fill-current" : ""} />
                                    </button>
                                    <button className="p-3 bg-white/90 rounded-full backdrop-blur-md text-gray-600 hover:bg-white hover:text-darkgreen transition-all shadow-lg">
                                        <Share2 size={20} />
                                    </button>
                                </div>
                            </div>
                            {/* Thumbnails */}
                            <div className="flex gap-3 mt-3 overflow-x-auto pb-2 px-1 hide-scrollbar">
                                {property.images && property.images.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setActiveImage(img)}
                                        className={`flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden border-2 transition-all duration-300 ${activeImage === img ? 'border-darkgreen ring-2 ring-sage/20' : 'border-transparent opacity-70 hover:opacity-100'}`}
                                    >
                                        <img src={img} alt={`View ${idx}`} className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Property Stats Grid (Restored) */}
                        <div className="bg-white rounded-3xl p-6 shadow-sm border border-sage/10">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="text-center p-4 bg-cream rounded-2xl border border-sage/5 hover:border-sage/20 transition-colors group">
                                    <BedDouble size={28} className="mx-auto text-sage mb-2 group-hover:scale-110 transition-transform" />
                                    <p className="font-bold text-darkgreen text-xl">{property.bedrooms}</p>
                                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Bedrooms</p>
                                </div>
                                <div className="text-center p-4 bg-cream rounded-2xl border border-sage/5 hover:border-sage/20 transition-colors group">
                                    <Bath size={28} className="mx-auto text-sage mb-2 group-hover:scale-110 transition-transform" />
                                    <p className="font-bold text-darkgreen text-xl">{property.bathrooms}</p>
                                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Bathrooms</p>
                                </div>
                                <div className="text-center p-4 bg-cream rounded-2xl border border-sage/5 hover:border-sage/20 transition-colors group">
                                    <Maximize size={28} className="mx-auto text-sage mb-2 group-hover:scale-110 transition-transform" />
                                    <p className="font-bold text-darkgreen text-xl">{property.area}</p>
                                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Area</p>
                                </div>
                                <div className="text-center p-4 bg-cream rounded-2xl border border-sage/5 hover:border-sage/20 transition-colors group">
                                    <Car size={28} className="mx-auto text-sage mb-2 group-hover:scale-110 transition-transform" />
                                    <p className="font-bold text-darkgreen text-xl">{property.parking}</p>
                                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Parking</p>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="bg-white rounded-3xl p-8 shadow-sm border border-sage/10">
                            <h2 className="text-xl font-bold text-darkgreen mb-4 flex items-center gap-2">
                                <FileText className="text-sage" size={24} /> About this Property
                            </h2>
                            <p className="text-gray-600 leading-relaxed text-lg font-light">
                                {property.description}
                            </p>
                        </div>

                        {/* Amenities Grid */}
                        <div className="bg-white rounded-3xl p-8 shadow-sm border border-sage/10">
                            <h2 className="text-xl font-bold text-darkgreen mb-6 flex items-center gap-2">
                                <Building2 className="text-sage" size={24} /> Amenities & Features
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {property.features && property.features.map((feature, idx) => (
                                    <div key={idx} className="flex items-center p-3 bg-cream rounded-xl hover:bg-sage/10 transition-colors">
                                        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-sage mr-3 shadow-sm border border-sage/10">
                                            <CheckCircle size={16} />
                                        </div>
                                        <span className="text-darkgreen font-medium">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Map */}
                        <div className="bg-white rounded-3xl p-2 shadow-sm border border-sage/10 overflow-hidden">
                            <div className="rounded-2xl overflow-hidden h-80 relative bg-gray-200">
                                <iframe
                                    title="Property Location"
                                    width="100%"
                                    height="100%"
                                    frameBorder="0"
                                    scrolling="no"
                                    className="w-full h-full"
                                    src={`https://maps.google.com/maps?q=${encodeURIComponent(property.address)}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
                                ></iframe>
                                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg font-bold text-darkgreen flex items-center gap-2">
                                    <MapPin size={16} className="text-sage" /> {property.location}
                                </div>
                            </div>
                        </div>

                        {/* Reviews */}
                        <div className="bg-white rounded-3xl p-8 shadow-sm border border-sage/10">
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-xl font-bold text-darkgreen flex items-center gap-2">
                                    <Shield className="text-sage" size={24} /> User Reviews
                                </h2>
                                <div className="flex items-center gap-2 bg-cream px-4 py-2 rounded-full">
                                    <span className="text-2xl font-bold text-darkgreen">4.8</span>
                                    <div className="flex text-yellow-500">
                                        {[1, 2, 3, 4, 5].map(i => <Star key={i} size={16} className="fill-current" />)}
                                    </div>
                                    <span className="text-sm text-gray-500">({property.reviews?.length || 0} reviews)</span>
                                </div>
                            </div>

                            <div className="space-y-4">
                                {property.reviews && property.reviews.length > 0 ? (
                                    property.reviews.map((review) => (
                                        <div key={review.id} className="p-6 bg-cream/30 rounded-2xl border border-sage/10 hover:border-sage/30 hover:shadow-md transition-all duration-300">
                                            <div className="flex items-center justify-between mb-3">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sage to-darkgreen text-white flex items-center justify-center font-bold text-lg">
                                                        {review.user[0]}
                                                    </div>
                                                    <div>
                                                        <h4 className="font-bold text-darkgreen">{review.user}</h4>
                                                        <p className="text-xs text-gray-400">Verified Tenant</p>
                                                    </div>
                                                </div>
                                                <div className="flex text-yellow-500">
                                                    {[...Array(review.rating)].map((_, i) => <Star key={i} size={14} className="fill-current" />)}
                                                </div>
                                            </div>
                                            <p className="text-gray-600 italic">"{review.comment}"</p>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-8 text-gray-400">No reviews yet.</div>
                                )}
                            </div>
                        </div>

                    </div>

                    {/* Right Column: Sticky Sidebar (4 cols) */}
                    <div className="lg:col-span-4">
                        <div className="sticky top-24 space-y-6">

                            {/* Agent Card */}
                            <div className="bg-white rounded-3xl p-6 shadow-lg border border-sage/10 transform transition-transform hover:-translate-y-1 duration-300 relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-sage to-darkgreen"></div>
                                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100 mt-2">
                                    <div className="w-16 h-16 rounded-full ring-4 ring-cream overflow-hidden shadow-md">
                                        {property.agent?.image ? (
                                            <img src={property.agent.image} alt={property.agent.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full bg-darkgreen text-white flex items-center justify-center text-xl font-bold">
                                                {property.agent?.name.split(' ').map(n => n[0]).join('')}
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <p className="text-xs text-sage font-bold uppercase tracking-wider mb-1">Listed By</p>
                                        <h4 className="font-bold text-darkgreen text-lg leading-tight">{property.agent?.name}</h4>
                                        <div className="flex items-center gap-1 mt-1">
                                            <Star size={12} className="text-yellow-500 fill-current" />
                                            <span className="text-xs font-bold text-gray-600">4.9 Owner Rating</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3 mb-6">
                                    <button className="col-span-1 bg-darkgreen text-white py-3 px-4 rounded-xl font-bold text-sm hover:bg-forest transition-colors flex items-center justify-center gap-2 shadow-lg shadow-darkgreen/20">
                                        <Phone size={16} /> Call
                                    </button>
                                    <button className="col-span-1 bg-white text-darkgreen border-2 border-darkgreen py-3 px-4 rounded-xl font-bold text-sm hover:bg-cream transition-colors flex items-center justify-center gap-2">
                                        <Mail size={16} /> Message
                                    </button>
                                </div>

                                <div className="bg-cream p-5 rounded-2xl border border-sage/10">
                                    <h5 className="font-bold text-darkgreen mb-4 flex items-center gap-2">
                                        <Calendar size={18} className="text-sage" /> Book a Viewing
                                    </h5>

                                    {contactStatus === 'success' ? (
                                        <div className="text-center py-6 bg-white rounded-xl border border-green-100">
                                            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                                                <CheckCircle size={24} />
                                            </div>
                                            <h6 className="font-bold text-gray-800">Request Sent!</h6>
                                            <p className="text-xs text-gray-500 mt-1 mb-3">We will contact you shortly.</p>
                                            <button onClick={() => setContactStatus('idle')} className="text-darkgreen text-xs font-bold hover:underline">Send New Request</button>
                                        </div>
                                    ) : (
                                        <form className="space-y-3" onSubmit={handleContactSubmit}>
                                            <input type="text" placeholder="Full Name" required
                                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-sage focus:ring-2 focus:ring-sage/20 outline-none text-sm transition-all bg-white"
                                            />
                                            <input type="tel" placeholder="Phone Number" required
                                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-sage focus:ring-2 focus:ring-sage/20 outline-none text-sm transition-all bg-white"
                                            />
                                            <textarea placeholder="I'm interested in this property..."
                                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-sage focus:ring-2 focus:ring-sage/20 outline-none text-sm h-24 resize-none transition-all bg-white"
                                            ></textarea>
                                            <button
                                                type="submit"
                                                disabled={contactStatus === 'sending'}
                                                className="w-full bg-sage text-white font-bold py-3.5 rounded-xl hover:bg-secondary transition-all shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
                                            >
                                                {contactStatus === 'sending' ? 'Sending Request...' : 'Send Request'}
                                            </button>
                                        </form>
                                    )}
                                </div>
                            </div>

                            {/* Quick Actions Card */}
                            <div className="bg-white rounded-3xl p-6 shadow-sm border border-sage/10">
                                <h5 className="font-bold text-darkgreen mb-4 text-sm uppercase tracking-wider border-b border-gray-100 pb-2">Quick Actions</h5>
                                <div className="space-y-2">
                                    <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-cream text-gray-600 transition-colors group border border-transparent hover:border-sage/10">
                                        <span className="flex items-center gap-3 text-sm font-medium"><Heart size={18} className="text-sage group-hover:text-darkgreen transition-colors" /> Save to Favorites</span>
                                    </button>
                                    <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-cream text-gray-600 transition-colors group border border-transparent hover:border-sage/10">
                                        <span className="flex items-center gap-3 text-sm font-medium"><Calendar size={18} className="text-sage group-hover:text-darkgreen transition-colors" /> Schedule Viewing</span>
                                    </button>
                                    <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-cream text-gray-600 transition-colors group border border-transparent hover:border-sage/10">
                                        <span className="flex items-center gap-3 text-sm font-medium"><ArrowRightLeft size={18} className="text-sage group-hover:text-darkgreen transition-colors" /> Compare Property</span>
                                    </button>
                                    <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-cream text-gray-600 transition-colors group border border-transparent hover:border-sage/10">
                                        <span className="flex items-center gap-3 text-sm font-medium"><Share2 size={18} className="text-sage group-hover:text-darkgreen transition-colors" /> Share Property</span>
                                    </button>
                                    <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-cream text-gray-600 transition-colors group border border-transparent hover:border-sage/10">
                                        <span className="flex items-center gap-3 text-sm font-medium"><Printer size={18} className="text-sage group-hover:text-darkgreen transition-colors" /> Print Brochure</span>
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>

            <Footer />
        </div>
    );
};

export default PropertyDetails;
