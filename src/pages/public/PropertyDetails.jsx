import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Bed, Bath, Ruler, Car, Phone, Mail, MessageSquare, Heart, Calendar, Share2, Printer, ChevronLeft, ChevronRight, Star, FileText, Camera, Users, Bell, X } from 'lucide-react';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import { supabase } from '../../config/supabase';
import { useAuth } from '../../context/AuthContext';

const PropertyDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeImage, setActiveImage] = useState(0);
    const [isFavorite, setIsFavorite] = useState(false);
    
    // Reviews state
    const [reviews, setReviews] = useState([]);
    const [reviewText, setReviewText] = useState('');
    const [reviewRating, setReviewRating] = useState(5);
    const [submittingReview, setSubmittingReview] = useState(false);

    // Inquiries state
    const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
    const [inquiryMessage, setInquiryMessage] = useState('');
    const [sendingInquiry, setSendingInquiry] = useState(false);

    // Price Drop Alerts state
    const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
    const [whatsappStatus, setWhatsappStatus] = useState('fetching'); // fetching, initializing, scan_required, connected, disconnected, offline
    const [whatsappBotNumber, setWhatsappBotNumber] = useState(null);
    const [whatsappQr, setWhatsappQr] = useState(null);
    const [activeAlertTab, setActiveAlertTab] = useState('qr'); // 'qr' or 'code'
    const [subscriptionStatus, setSubscriptionStatus] = useState('idle'); // idle, success, error
    const [codeError, setCodeError] = useState('');
    const [alertCodePhone, setAlertCodePhone] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [verificationStep, setVerificationStep] = useState(1); // 1: input phone, 2: input OTP code
    const [sendingCode, setSendingCode] = useState(false);
    const [verifyingCode, setVerifyingCode] = useState(false);

    const BOT_URL = import.meta.env.VITE_BOT_SERVER_URL || 'http://localhost:3001';

    useEffect(() => {
        if (id) {
            fetchProperty();
            incrementViews();
            if (user) checkFavorite();
        }
    }, [id, user]);

    // Poll WhatsApp status when modal is open and not yet connected
    useEffect(() => {
        if (!isAlertModalOpen) return;
        fetchWhatsappInfo();
        const interval = setInterval(fetchWhatsappInfo, 3000);
        return () => clearInterval(interval);
    }, [isAlertModalOpen]);

    const incrementViews = async () => {
        // Prevent double counting in React Strict Mode and stop spamming on refresh
        if (sessionStorage.getItem(`viewed_property_${id}`)) return;
        
        // IMPORTANT: Set this synchronously BEFORE the async network request
        // so that the second immediate React render doesn't fire another request
        sessionStorage.setItem(`viewed_property_${id}`, 'true');

        try {
            await supabase.rpc('increment_property_views', { property_id_param: id });
        } catch (error) {
            console.error("Error incrementing views:", error);
            // If it failed, we could remove it, but keeping it prevents spam on error
        }
    };

    const checkFavorite = async () => {
        try {
            const { data, error } = await supabase
                .from('favorites')
                .select('id')
                .eq('user_id', user.id)
                .eq('property_id', id)
                .maybeSingle();
            
            if (!error && data) setIsFavorite(true);
        } catch (e) {
            console.error(e);
        }
    };

    const fetchProperty = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('properties')
                .select(`*, property_images(image_url, is_primary)`)
                .eq('id', id)
                .single();
            
            if (error) throw error;
            
            // Generate Owner Profile info
            let sellerInfo = { id: data.seller_id, name: 'Property Owner', phone: '', role: 'Seller', rating: '4.8', reviews: 12 };
            if (data.seller_id) {
               const { data: sellerProfile } = await supabase
                 .from('user_profiles')
                 .select('full_name, phone')
                 .eq('user_id', data.seller_id)
                 .maybeSingle();
               if (sellerProfile) {
                   if (sellerProfile.full_name) sellerInfo.name = sellerProfile.full_name;
                   if (sellerProfile.phone) sellerInfo.phone = sellerProfile.phone;
               }
            }

            const images = data.property_images && data.property_images.length > 0 
                ? data.property_images.map(img => img.image_url) 
                : [null];

            if (data.contact_number) sellerInfo.phone = data.contact_number;

            // Fetch Reviews without problematic join
            const { data: revData } = await supabase
                .from('property_reviews')
                .select('id, rating, comment, user_id, created_at')
                .eq('property_id', id)
                .order('created_at', { ascending: false });

            let finalReviews = revData || [];
            
            // Map user profiles manually to avoid Foreign Key errors
            if (finalReviews.length > 0) {
                const userIds = [...new Set(finalReviews.map(r => r.user_id))];
                const { data: profilesData } = await supabase
                    .from('user_profiles')
                    .select('user_id, full_name')
                    .in('user_id', userIds);
                
                if (profilesData) {
                    const profileMap = {};
                    profilesData.forEach(p => profileMap[p.user_id] = p.full_name);
                    finalReviews = finalReviews.map(r => ({ ...r, user_name: profileMap[r.user_id] || 'Anonymous user' }));
                }
            }

            setReviews(finalReviews);

            setProperty({
                id: data.id,
                title: data.title,
                price: `Rs. ${data.price?.toLocaleString()}`,
                location: data.city || data.address,
                type: data.property_type,
                beds: data.bedrooms || 0,
                baths: data.bathrooms || 0,
                sqft: data.area_sqft || data.area_sqm || 0,
                max_guests: data.max_guests,
                map_url: data.map_url || null,
                is_available: data.is_available ?? true,
                parking: 'Available',
                description: data.description || 'No description provided.',
                amenities: ['Electricity', 'Water Supply', 'Security'],
                images: images,
                owner: sellerInfo
            });
        } catch (error) {
            console.error("Fetch property error:", error);
            setProperty(null);
        } finally {
            setLoading(false);
        }
    };

    const toggleFavorite = async () => {
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

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        if (!user) return alert("Please login to submit a review.");
        if (!reviewText.trim()) return alert("Please enter a review.");

        setSubmittingReview(true);
        try {
            const { error } = await supabase
                .from('property_reviews')
                .insert([{
                    property_id: id,
                    user_id: user.id,
                    rating: reviewRating,
                    comment: reviewText
                }]);

            if (error) throw error;
            
            setReviewText('');
            setReviewRating(5);
            fetchProperty(); // refresh to get new reviews
        } catch (err) {
            console.error("Error submitting review:", err);
            alert("Failed to submit review: " + (err.message || 'Unknown error'));
        } finally {
            setSubmittingReview(false);
        }
    };

    const handleSendInquiry = async () => {
        if (!user) {
            alert("Please log in to send a message to the owner.");
            return navigate('/login');
        }
        if (!inquiryMessage.trim()) return alert("Please enter a message.");

        setSendingInquiry(true);
        try {
            const { error } = await supabase
                .from('property_inquiries')
                .insert([{
                    property_id: id,
                    seller_id: property.owner.id,
                    buyer_id: user.id,
                    message: inquiryMessage
                }]);

            if (error) throw error;
            
            alert("Message sent successfully!");
            setIsMessageModalOpen(false);
            setInquiryMessage('');
        } catch (err) {
            console.error("Error sending inquiry:", err);
            alert("Failed to send message: " + (err.message || 'Unknown error'));
        } finally {
            setSendingInquiry(false);
        }
    };

    const fetchWhatsappInfo = async () => {
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 5000);

            const response = await fetch(`${BOT_URL}/api/whatsapp-status`, {
                signal: controller.signal
            });
            clearTimeout(timeoutId);
            
            const data = await response.json();
            if (data.success) {
                setWhatsappStatus(data.status);
                setWhatsappQr(data.qr || null);
                
                // If connected, also fetch bot number
                if (data.status === 'connected') {
                    try {
                        const infoRes = await fetch(`${BOT_URL}/api/whatsapp-info`);
                        const infoData = await infoRes.json();
                        if (infoData.success && infoData.number) {
                            setWhatsappBotNumber(infoData.number);
                        }
                    } catch (e) {
                        console.warn('Could not fetch bot number:', e);
                    }
                }
            } else {
                setWhatsappStatus('disconnected');
            }
        } catch (error) {
            console.error("Error fetching WhatsApp info:", error);
            setWhatsappStatus('offline');
        }
    };

    const handleTabChange = (tab) => {
        setActiveAlertTab(tab);
        setCodeError('');
        setAlertCodePhone('');
        setVerificationCode('');
        setVerificationStep(1);
        setSubscriptionStatus('idle');
    };

    const handleCloseAlertModal = () => {
        setIsAlertModalOpen(false);
        setActiveAlertTab('qr');
        setSubscriptionStatus('idle');
        setCodeError('');
        setAlertCodePhone('');
        setVerificationCode('');
        setVerificationStep(1);
    };

    const handleSendVerificationCode = async (e) => {
        e.preventDefault();
        const cleanedPhone = alertCodePhone.replace(/\D/g, '');
        if (!cleanedPhone) return alert("Please enter a valid phone number.");
        setSendingCode(true);
        setCodeError('');
        try {
            const response = await fetch('http://localhost:3001/api/send-verification-code', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phoneNumber: cleanedPhone, propertyId: id })
            });
            const result = await response.json();
            if (response.ok && result.success) {
                setVerificationStep(2);
            } else {
                setCodeError(result.error || 'Failed to send verification code.');
            }
        } catch (err) {
            console.error("Error sending code:", err);
            setCodeError('Failed to connect to the verification server. Please try again.');
        } finally {
            setSendingCode(false);
        }
    };

    const handleVerifyCode = async (e) => {
        e.preventDefault();
        const cleanedPhone = alertCodePhone.replace(/\D/g, '');
        if (!verificationCode.trim()) return alert("Please enter the verification code.");
        setVerifyingCode(true);
        setCodeError('');
        try {
            const response = await fetch('http://localhost:3001/api/verify-code', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phoneNumber: cleanedPhone, code: verificationCode, propertyId: id })
            });
            const result = await response.json();
            if (response.ok && result.success) {
                setSubscriptionStatus('success');
            } else {
                setCodeError(result.error || 'Invalid code. Please check and try again.');
            }
        } catch (err) {
            console.error("Error verifying code:", err);
            setCodeError('Failed to connect to the verification server. Please try again.');
        } finally {
            setVerifyingCode(false);
        }
    };

    const handleShare = async () => {
        const shareData = {
            title: property.title,
            text: `Check out this property: ${property.title} in ${property.location}`,
            url: window.location.href
        };
        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                await navigator.clipboard.writeText(window.location.href);
                alert("Link copied to clipboard!");
            }
        } catch (err) {
            console.error("Error sharing:", err);
        }
    };

    const handlePrint = () => {
        window.print();
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
                <Navbar />
                <div className="flex-grow flex flex-col items-center justify-center">
                    <h2 className="text-xl font-bold text-gray-500 animate-pulse">Loading property details...</h2>
                </div>
                <Footer />
            </div>
        );
    }

    if (!property) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
                <Navbar />
                <div className="flex-grow flex flex-col items-center justify-center">
                    <h2 className="text-2xl font-bold text-gray-800">Property Not Found</h2>
                    <p className="text-gray-500 mt-2">This property might have been removed or the link is invalid.</p>
                    <button onClick={() => navigate('/')} className="mt-4 text-purple-600 hover:underline">Go Back Home</button>
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
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
            <Navbar />

            {/* Breadcrumbs */}
            <div className="bg-gray-50 pt-24 pb-4">
                <div className="container mx-auto px-4 text-xs md:text-sm text-gray-500 font-medium">
                    <Link to="/" className="hover:text-gray-900 transition">Home</Link>
                    <span className="mx-2">/</span>
                    <Link to="/properties" className="hover:text-gray-900 transition">Properties</Link>
                    <span className="mx-2">/</span>
                    <span className="text-gray-800 font-bold">{property.title}</span>
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
                    <div className="relative h-[300px] md:h-[500px]  rounded-3xl overflow-hidden shadow-xl group">
                        <AnimatePresence mode='wait'>
                            <motion.img
                                key={activeImage}
                                src={property.images[activeImage]}
                                alt={property.title}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="w-full h-full object-contain"
                            />
                        </AnimatePresence>

                        {/* Overlay Icon - Mimicking the design */}
                        {/* <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <Home className="text-white w-16 h-16 drop-shadow-lg opacity-80" />
                        </div> */}

                        {/* Navigation Arrows */}
                        <div className="absolute inset-0 flex justify-between items-center px-4">
                            <button onClick={prevImage} className="bg-black/20 hover:bg-black/40 text-white p-3 rounded-full transition backdrop-blur-sm transform hover:scale-110">
                                <ChevronLeft size={28} />
                            </button>
                            <button onClick={nextImage} className="bg-black/20 hover:bg-black/40 text-white p-3 rounded-full transition backdrop-blur-sm transform hover:scale-110">
                                <ChevronRight size={28} />
                            </button>
                        </div>
                    </div>

                    {/* Thumbnails */}
                    <div className="flex gap-4 mt-4 justify-center md:justify-start overflow-x-auto pb-2 scrollbar-none pt-2 pl-2">
                        {property.images.map((img, idx) => (
                            <button
                                key={idx}
                                onClick={() => setActiveImage(idx)}
                                className={`w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden border-2 transition-all flex items-center justify-center duration-300 ${activeImage === idx ? 'border-black-600 ring-4 ring-black-100 scale-105' : 'border-transparent opacity-80 hover:opacity-100 hover:scale-105'}`}
                            >
                                {/* <Camera className="text-white/50 w-8 h-8" /> */}
                                <img
                                    src={img}
                                    alt={`Thumbnail ${idx}`}
                                    className="w-full h-full object-cover"
                                />
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
                            className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100"
                        >
                            <div className="mb-4 flex gap-2">
                                <span className="bg-purple-100 text-purple-700 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wide inline-block">
                                    {property.type} for sale
                                </span>
                                <span className={`text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wide inline-block ${property.is_available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                    {property.is_available ? 'Available' : 'Unavailable'}
                                </span>
                            </div>

                            <h1 className="text-3xl md:text-3xl font-extrabold text-gray-900 mb-2">{property.title}</h1>

                            <div className="flex items-center text-gray-500 text-sm mb-6 font-medium">
                                <MapPin size={16} className="mr-1 text-red-500" /> {property.location}, Sri Lanka
                            </div>

                            <div className="text-4xl font-extrabold text-red-600 mb-8 tracking-tight">
                                {property.price}
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="bg-gray-50 hover:bg-purple-50 p-4 rounded-2xl text-center transition-colors duration-300 border border-transparent hover:border-purple-100 cursor-default">
                                    <div className="bg-white w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2 shadow-sm">
                                        <Bed size={18} className="text-gray-500" />
                                    </div>
                                    <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Bedrooms</p>
                                    <p className="font-bold text-gray-900 text-lg">{property.beds}</p>
                                </div>
                                <div className="bg-gray-50 hover:bg-purple-50 p-4 rounded-2xl text-center transition-colors duration-300 border border-transparent hover:border-purple-100 cursor-default">
                                    <div className="bg-white w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2 shadow-sm">
                                        <Bath size={18} className="text-blue-500" />
                                    </div>
                                    <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Bathrooms</p>
                                    <p className="font-bold text-gray-900 text-lg">{property.baths}</p>
                                </div>
                                <div className="bg-gray-50 hover:bg-purple-50 p-4 rounded-2xl text-center transition-colors duration-300 border border-transparent hover:border-purple-100 cursor-default">
                                    <div className="bg-white w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2 shadow-sm">
                                        <Ruler size={18} className="text-yellow-500" />
                                    </div>
                                    <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Area</p>
                                    <p className="font-bold text-gray-900 text-lg">{property.sqft} sqft</p>
                                </div>
                                <div className="bg-gray-50 hover:bg-purple-50 p-4 rounded-2xl text-center transition-colors duration-300 border border-transparent hover:border-purple-100 cursor-default">
                                    <div className="bg-white w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2 shadow-sm">
                                        <Car size={18} className="text-red-500" />
                                    </div>
                                    <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Parking</p>
                                    <p className="font-bold text-gray-900 text-lg">{property.parking}</p>
                                </div>
                                {property.max_guests && (
                                    <div className="bg-gray-50 hover:bg-purple-50 p-4 rounded-2xl text-center transition-colors duration-300 border border-transparent hover:border-purple-100 cursor-default md:col-span-2 lg:col-span-1">
                                        <div className="bg-white w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2 shadow-sm">
                                            <Users size={18} className="text-orange-500" />
                                        </div>
                                        <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Capacity</p>
                                        <p className="font-bold text-gray-900 text-lg">{property.max_guests}</p>
                                    </div>
                                )}
                            </div>
                        </motion.div>

                        {/* Description */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100"
                        >
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Description</h3>
                            <p className="text-gray-600 leading-relaxed text-sm md:text-sm">
                                {property.description}
                            </p>
                        </motion.div>

                        {/* Amenities */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100"
                        >
                            <h3 className="text-lg font-bold text-gray-900 mb-6 border-b border-gray-100 pb-2">Amenities</h3>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-3 gap-x-6">
                                {property.amenities.map((amenity, index) => (
                                    <div key={index} className="flex items-center text-xs md:text-sm text-gray-600">
                                        <div className="min-w-[16px] h-4 text-green-600 mr-2 opacity-70">✓</div>
                                        {amenity}
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Location Map */}
                        {property.map_url && (
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.5 }}
                                className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100"
                            >
                                <h3 className="text-lg font-bold text-purple-900 mb-4 border-b border-gray-100 pb-2">Location</h3>
                                <div className="w-full h-64 bg-purple-100 rounded-2xl overflow-hidden relative border border-gray-200">
                                    <iframe
                                        src={property.map_url}
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0 }}
                                        allowFullScreen=""
                                        loading="lazy"
                                    ></iframe>
                                    <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-lg text-[10px] font-bold shadow-md flex items-center text-gray-700 pointer-events-none">
                                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Google_Maps_icon_%282020%29.svg/1200px-Google_Maps_icon_%282020%29.svg.png" className="w-3 h-3 mr-1.5" alt="Google Maps" />
                                        Google Maps View
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* Reviews */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.7 }}
                            className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100"
                        >
                            <div className="flex justify-between items-center border-b border-gray-100 pb-2 mb-4">
                                <h3 className="text-lg font-bold text-purple-900 flex items-center gap-2">
                                    Reviews ({reviews.length})
                                </h3>
                                {reviews.length > 0 && (
                                    <div className="flex items-center text-yellow-500 font-bold text-sm">
                                        <Star size={16} className="fill-current mr-1" />
                                        {(reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)}
                                    </div>
                                )}
                            </div>

                            {user ? (
                                <form onSubmit={handleReviewSubmit} className="mb-6 bg-gray-50 p-4 rounded-xl border border-gray-200">
                                    <h4 className="font-bold text-gray-800 text-sm mb-2">Write a Review</h4>
                                    <div className="flex gap-1 mb-3">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button key={star} type="button" onClick={() => setReviewRating(star)} className="focus:outline-none">
                                                <Star size={20} className={star <= reviewRating ? "text-yellow-400 fill-current" : "text-gray-300"} />
                                            </button>
                                        ))}
                                    </div>
                                    <textarea
                                        value={reviewText}
                                        onChange={(e) => setReviewText(e.target.value)}
                                        placeholder="Share your thoughts about this property..."
                                        className="w-full text-sm p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500 mb-3"
                                        rows="3"
                                    ></textarea>
                                    <button type="submit" disabled={submittingReview} className="bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold py-2 px-6 rounded-lg transition disabled:bg-purple-300">
                                        {submittingReview ? 'Submitting...' : 'Submit Review'}
                                    </button>
                                </form>
                            ) : (
                                <div className="mb-6 bg-gray-50 p-4 rounded-xl text-center text-sm text-gray-500">
                                    Please <Link to="/login" className="text-purple-600 font-bold hover:underline">log in</Link> to leave a review.
                                </div>
                            )}

                            <div className="space-y-4 max-h-96 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300">
                                {reviews.length > 0 ? (
                                    reviews.map((review) => (
                                        <div key={review.id} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                                            <div className="flex items-center justify-between mb-2">
                                                <h4 className="font-bold text-gray-900 text-sm">{review.user_name || 'Anonymous user'}</h4>
                                                <div className="flex">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star key={i} size={12} className={i < review.rating ? "text-yellow-400 fill-current" : "text-gray-200"} />
                                                    ))}
                                                </div>
                                            </div>
                                            <p className="text-xs text-gray-600 leading-relaxed">{review.comment}</p>
                                            <p className="text-[10px] text-gray-400 mt-2">{new Date(review.created_at).toLocaleDateString()}</p>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-500 text-sm italic py-4 text-center">No reviews yet. Be the first to review!</p>
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
                            className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 sticky top-28"
                        >
                            <h3 className="text-sm font-bold text-gray-900 mb-4 border-b border-gray-100 pb-3">Contact Property Owner</h3>
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-14 h-14 rounded-full bg-green-600 text-white flex items-center justify-center font-bold text-xl shadow-md border-2 border-white ring-2 ring-purple-100">
                                    {property.owner.name.charAt(0)}D
                                </div>
                                <div>
                                    <h4 className="font-extrabold text-gray-900 text-sm">{property.owner.name}</h4>
                                    <div className="text-[10px] text-gray-500 uppercase font-bold tracking-wide">{property.owner.role}</div>
                                    <div className="flex items-center text-[10px] text-yellow-500 mt-1 font-bold">
                                        <Star size={10} className="fill-current mr-1" /> {property.owner.rating} ({property.owner.reviews} reviews)
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <a href={property.owner.phone ? `tel:${property.owner.phone}` : '#'} className="w-full bg-purple-800 hover:bg-purple-900 text-white text-xs font-bold py-3 rounded-xl transition shadow-lg shadow-purple-200 active:scale-95 flex items-center justify-center gap-2">
                                    <Phone size={14} className="fill-current" /> {property.owner.phone ? `Call ${property.owner.phone}` : 'Phone hidden'}
                                </a>
                                <a href={property.owner.phone ? `sms:${property.owner.phone}` : '#'} className="w-full bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 text-xs font-bold py-3 rounded-xl transition shadow-sm active:scale-95 flex items-center justify-center gap-2">
                                    <MessageSquare size={14} /> Send SMS Message
                                </a>
                                <button onClick={() => setIsMessageModalOpen(true)} className="w-full bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 text-xs font-bold py-3 rounded-xl transition shadow-sm active:scale-95 flex items-center justify-center gap-2">
                                    <Mail size={14} /> Send Message Using Platform
                                </button>
                            </div>
                        </motion.div>

                        {/* Quick Actions */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 sticky top-[450px]"
                        >
                            <h3 className="text-sm font-bold text-gray-900 mb-4 border-b border-gray-100 pb-3">Quick Actions</h3>
                            <div className="space-y-3">
                                <button onClick={() => setIsAlertModalOpen(true)} className="w-full bg-green-50 hover:bg-green-100 text-green-700 text-xs font-bold py-2.5 px-4 rounded-lg flex items-center gap-3 transition border border-green-200 shadow-sm active:scale-[0.98]">
                                    <Bell size={14} className="text-green-600 fill-current" /> Get Price Drop Alerts
                                </button>
                                <button onClick={toggleFavorite} className="w-full bg-gray-100 hover:bg-gray-200 text-gray-600 text-xs font-bold py-2.5 px-4 rounded-lg flex items-center gap-3 transition">
                                    <Heart size={14} className={`${isFavorite ? 'text-red-500 fill-current' : 'text-pink-500'} transition-colors`} /> 
                                    {isFavorite ? 'Removed from Favorites' : 'Save to Favorites'}
                                </button>
                                <button onClick={() => alert("Calendar scheduler opens here...")} className="w-full bg-gray-100 hover:bg-gray-200 text-gray-600 text-xs font-bold py-2.5 px-4 rounded-lg flex items-center gap-3 transition">
                                    <Calendar size={14} className="text-red-400 fill-current" /> Schedule Viewing
                                </button>
                                <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-600 text-xs font-bold py-2.5 px-4 rounded-lg flex items-center gap-3 transition">
                                    <FileText size={14} className="text-blue-500 fill-current" /> Compare Properties
                                </button>
                                <button onClick={handleShare} className="w-full bg-gray-100 hover:bg-gray-200 text-gray-600 text-xs font-bold py-2.5 px-4 rounded-lg flex items-center gap-3 transition">
                                    <Share2 size={14} className="text-gray-500 fill-current" /> Share Property
                                </button>
                                <button onClick={handlePrint} className="w-full bg-gray-100 hover:bg-gray-200 text-gray-600 text-xs font-bold py-2.5 px-4 rounded-lg flex items-center gap-3 transition">
                                    <Printer size={14} className="text-gray-500 fill-current" /> Print Details
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </main>

            {/* Message Modal */}
            {isMessageModalOpen && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md">
                        <h3 className="text-xl font-bold text-gray-800 mb-4">Message Property Owner</h3>
                        <textarea
                            value={inquiryMessage}
                            onChange={(e) => setInquiryMessage(e.target.value)}
                            placeholder="Hi, I'm interested in this property. Is it available for viewing?"
                            className="w-full border border-gray-300 rounded-xl p-3 h-32 text-sm focus:outline-none focus:ring-2 focus:ring-purple-600 mb-4"
                        />
                        <div className="flex gap-3 justify-end">
                            <button onClick={() => setIsMessageModalOpen(false)} className="px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 font-bold text-sm transition text-center focus:outline-none">
                                Cancel
                            </button>
                            <button onClick={handleSendInquiry} disabled={sendingInquiry} className="bg-purple-600 px-6 py-2 rounded-lg text-white font-bold text-sm hover:bg-purple-700 transition disabled:opacity-50 flex items-center gap-2">
                                {sendingInquiry ? 'Sending...' : 'Send Message'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Alert Modal */}
            {isAlertModalOpen && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm transition-all duration-300">
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg border border-gray-100 relative overflow-hidden text-left">
                        {/* Elegant background gradients */}
                        <div className="absolute top-0 right-0 w-24 h-24 bg-green-50 rounded-full blur-3xl pointer-events-none"></div>
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-50 rounded-full blur-3xl pointer-events-none"></div>

                        {/* Modal scrollable content */}
                        <div className="p-6 md:p-8 max-h-[85vh] overflow-y-auto scroll-smooth">
                            {/* Header */}
                            <div className="flex justify-between items-center mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="bg-green-100 p-2.5 rounded-2xl shadow-sm border border-green-200/50">
                                        <Bell className="text-green-600 w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-black text-gray-900 tracking-tight m-0">Price Drop Alerts</h3>
                                        <p className="text-[11px] text-gray-500 font-bold uppercase tracking-widest m-0 mt-0.5">Via Smart WhatsApp Gateway</p>
                                    </div>
                                </div>
                                <button 
                                    onClick={handleCloseAlertModal}
                                    className="p-2 hover:bg-gray-100 rounded-xl transition cursor-pointer border-0 bg-transparent text-gray-400 hover:text-gray-600"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* State transitions start here */}
                            {whatsappStatus === 'fetching' ? (
                                <div className="py-12 flex flex-col items-center justify-center text-center">
                                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-green-600 mb-4"></div>
                                    <p className="text-sm font-semibold text-gray-600">Verifying gateway status...</p>
                                </div>
                            ) : subscriptionStatus === 'success' ? (
                                <div className="py-8 text-center space-y-4">
                                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto text-green-600 shadow-md">
                                        <span className="text-3xl font-black">✓</span>
                                    </div>
                                    <h4 className="text-lg font-bold text-green-800">✅ Subscription Confirmed!</h4>
                                    <p className="text-sm text-gray-600 max-w-sm mx-auto leading-relaxed">
                                        You have successfully subscribed to price drop alerts for <b>{property.title}</b>!
                                        {whatsappStatus === 'connected' 
                                            ? ' You will receive notifications directly on WhatsApp.'
                                            : ' You will receive WhatsApp notifications once the gateway is active.'}
                                    </p>
                                    <button
                                        onClick={handleCloseAlertModal}
                                        className="bg-gray-900 hover:bg-black text-white text-xs font-bold py-2.5 px-6 rounded-xl transition cursor-pointer border-0"
                                    >
                                        Done
                                    </button>
                                </div>
                            ) : whatsappStatus === 'connected' && whatsappBotNumber ? (
                                /* === STATE: CONNECTED === */
                                <div className="space-y-6">
                                    <div className="bg-green-50 border border-green-200 rounded-2xl p-3 flex items-center gap-2 text-xs text-green-700">
                                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                        <span className="font-bold uppercase tracking-wider">Gateway Online</span>
                                        <span className="text-green-500 ml-auto">Connected to {whatsappBotNumber}</span>
                                    </div>

                                    {/* Subscriptions Tabs - Already implemented in current code */}
                                    <div className="flex bg-gray-100 p-1.5 rounded-2xl border border-gray-200/50">
                                        {['qr', 'code', 'direct'].map((tab) => (
                                            <button 
                                                key={tab}
                                                type="button"
                                                onClick={() => handleTabChange(tab)}
                                                className={`flex-1 text-center py-2 px-2 rounded-xl font-bold text-[11px] md:text-xs transition-all duration-300 border-0 cursor-pointer ${activeAlertTab === tab ? 'bg-white text-green-700 shadow-sm' : 'bg-transparent text-gray-500 hover:text-gray-700'}`}
                                            >
                                                {tab === 'qr' ? '📷 Scan QR' : tab === 'code' ? '💬 Verify' : '📱 Quick'}
                                            </button>
                                        ))}
                                    </div>

                                    {/* Tabs content mapping here - using existing logic from file */}
                                    {activeAlertTab === 'qr' && (
                                        <div className="space-y-4">
                                            <p className="text-sm text-gray-600 text-center leading-relaxed m-0">
                                                Scan the QR with your camera. It opens WhatsApp with a pre-filled message — just tap <b>Send</b> to subscribe!
                                            </p>
                                            <div className="flex flex-col items-center justify-center bg-gray-50/80 p-5 rounded-2xl border border-dashed border-gray-200">
                                                <div className="bg-white p-3 rounded-2xl shadow-md border border-gray-100 mb-2 transform hover:scale-105 transition-transform">
                                                    <img 
                                                        src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(`https://wa.me/${whatsappStatus === 'connected' ? whatsappBotNumber : '94769700721'}?text=${encodeURIComponent(`Subscribe to price drop alerts for property ${id}`)}`)}`}
                                                        alt="WhatsApp QR Code" 
                                                        className="w-[160px] h-[160px] block"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {activeAlertTab === 'code' && (
                                        <div className="space-y-4">
                                            {codeError && (
                                                <div className="bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl p-3 flex gap-2 items-center">
                                                    <span className="font-bold">⚠️</span> <p className="m-0">{codeError}</p>
                                                </div>
                                            )}
                                            {verificationStep === 1 ? (
                                                <form onSubmit={handleSendVerificationCode} className="space-y-4">
                                                    <p className="text-xs text-center text-gray-500">Enter your WhatsApp number to receive a 6-digit code.</p>
                                                    <input
                                                        type="tel"
                                                        value={alertCodePhone}
                                                        onChange={(e) => setAlertCodePhone(e.target.value)}
                                                        placeholder="+94 77 123 4567"
                                                        className="w-full border border-gray-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-green-500 outline-none"
                                                        required
                                                    />
                                                    <button type="submit" disabled={sendingCode} className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl transition shadow-md disabled:opacity-50 border-0 cursor-pointer">
                                                        {sendingCode ? 'Sending...' : 'Send Verification Code'}
                                                    </button>
                                                </form>
                                            ) : (
                                                <form onSubmit={handleVerifyCode} className="space-y-4">
                                                    <div className="bg-green-50 text-green-700 text-xs p-3 rounded-xl font-medium">Code sent to <b>{alertCodePhone}</b></div>
                                                    <input
                                                        type="text"
                                                        value={verificationCode}
                                                        onChange={(e) => setVerificationCode(e.target.value)}
                                                        placeholder="123456"
                                                        maxLength={6}
                                                        className="w-full text-center tracking-widest font-mono text-xl border border-gray-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-green-500"
                                                        required
                                                    />
                                                    <button type="submit" disabled={verifyingCode} className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl shadow-md border-0 cursor-pointer">
                                                        {verifyingCode ? 'Verifying...' : 'Verify & Subscribe'}
                                                    </button>
                                                </form>
                                            )}
                                        </div>
                                    )}

                                    {activeAlertTab === 'direct' && (
                                        <div className="space-y-4">
                                            {codeError && (
                                                <div className="bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl p-3 flex gap-2 items-center">
                                                    <span className="font-bold">⚠️</span> <p className="m-0">{codeError}</p>
                                                </div>
                                            )}
                                            <form onSubmit={async (e) => {
                                                e.preventDefault();
                                                const cleanedPhone = alertCodePhone.replace(/\D/g, '');
                                                if (!cleanedPhone || cleanedPhone.length < 9) {
                                                    setCodeError('Please enter a valid phone number.');
                                                    return;
                                                }
                                                setSendingCode(true);
                                                try {
                                                    const res = await fetch('http://localhost:3001/api/subscribe-alert', {
                                                        method: 'POST',
                                                        headers: { 'Content-Type': 'application/json' },
                                                        body: JSON.stringify({ propertyId: id, phoneNumber: cleanedPhone })
                                                    });
                                                    const result = await res.json();
                                                    if (result.success) setSubscriptionStatus('success');
                                                    else setCodeError(result.error || 'Subscription failed.');
                                                } catch (err) {
                                                    setCodeError('Server error. Please try again.');
                                                } finally { setSendingCode(false); }
                                            }} className="space-y-4">
                                                <p className="text-xs text-center text-gray-500">Fast tracking: enter your number and we'll save it to Supabase.</p>
                                                <input
                                                    type="tel"
                                                    value={alertCodePhone}
                                                    onChange={(e) => setAlertCodePhone(e.target.value)}
                                                    placeholder="077 123 4567"
                                                    className="w-full border border-gray-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-green-500 outline-none"
                                                    required
                                                />
                                                <button type="submit" disabled={sendingCode} className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl shadow-md border-0 cursor-pointer">
                                                    {sendingCode ? 'Subscribing...' : '🔔 Get Alerts via WhatsApp'}
                                                </button>
                                            </form>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                /* === STATE: NOT CONNECTED (Linking flow) === */
                                <div className="space-y-6">
                                    {whatsappStatus === 'scan_required' && whatsappQr ? (
                                        <div className="space-y-5 animate-in fade-in duration-500">
                                            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3 flex items-center gap-2 text-[11px] text-amber-700 font-bold">
                                                <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></span>
                                                ACTION REQUIRED: CONNECT WHATSAPP GATEWAY
                                            </div>
                                            <div className="text-center space-y-1">
                                                <p className="text-sm text-gray-600 font-medium m-0">The notification gateway is not connected yet.</p>
                                                <p className="text-[11px] text-gray-400 m-0">Scan the QR code below with <b>WhatsApp → Linked Devices</b> to activate the service.</p>
                                            </div>
                                            <div className="flex flex-col items-center justify-center bg-gray-50 p-6 rounded-3xl border border-dashed border-gray-300">
                                                <div className="bg-white p-3 rounded-2xl shadow-xl border border-gray-100 mb-3 hover:scale-[1.02] transition-transform">
                                                    <img 
                                                        src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(whatsappQr)}`}
                                                        alt="Admin Linking QR" 
                                                        className="w-[200px] h-[200px] block"
                                                    />
                                                </div>
                                                <div className="flex items-center gap-2 text-[10px] text-green-600 font-bold animate-pulse uppercase tracking-wider">
                                                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                                                    Waiting for Scan...
                                                </div>
                                            </div>
                                        </div>
                                    ) : whatsappStatus === 'initializing' ? (
                                        <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
                                            <div className="relative">
                                                <div className="absolute inset-0 bg-green-200 rounded-full blur-xl opacity-20 animate-pulse"></div>
                                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 relative z-10"></div>
                                            </div>
                                            <p className="text-sm font-bold text-gray-700">Starting WhatsApp engine...</p>
                                            <p className="text-[11px] text-gray-400 px-6">We're initializing the browser-based gateway. The QR code should appear in 10-15 seconds.</p>
                                        </div>
                                    ) : (
                                        <div className="space-y-4 animate-in slide-in-from-bottom duration-500">
                                            <div className="bg-red-50 border border-red-100 rounded-2xl p-4 flex items-start gap-3">
                                                <div className="bg-red-100 p-2 rounded-lg"><Bell className="text-red-500 w-4 h-4" /></div>
                                                <div>
                                                    <h4 className="text-xs font-bold text-red-800 uppercase tracking-wider m-0">Gateway Offline</h4>
                                                    <p className="text-[11px] text-red-600/80 leading-relaxed mt-1 m-0">
                                                        The WhatsApp notification server is currently offline or disconnected. No worries, you can still subscribe using the quick form below.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* ALWAYS VISIBLE FALLBACK: Quick Subscribe */}
                                    {whatsappStatus !== 'initializing' && (
                                        <div className="border-t border-gray-100 pt-6 mt-2 space-y-4">
                                            <div className="flex items-center justify-between">
                                                <h4 className="text-sm font-black text-gray-900 m-0">📱 Quick Subscribe Fallback</h4>
                                                <span className="text-[9px] bg-green-100 text-green-700 font-extrabold px-2 py-0.5 rounded-full uppercase tracking-tighter">Active</span>
                                            </div>
                                            {codeError && (
                                                <div className="bg-red-50 text-red-600 text-xs p-2 rounded-lg border border-red-100">{codeError}</div>
                                            )}
                                            <form onSubmit={async (e) => {
                                                e.preventDefault();
                                                const cleanedPhone = alertCodePhone.replace(/\D/g, '');
                                                if (!cleanedPhone || cleanedPhone.length < 9) {
                                                    setCodeError('Please enter a valid phone number.');
                                                    return;
                                                }
                                                setSendingCode(true);
                                                setCodeError('');
                                                try {
                                                    let success = false;
                                                    // Try server first if it might be up but gateway is just unlinked
                                                    try {
                                                        const res = await fetch(`${BOT_URL}/api/subscribe-alert`, {
                                                            method: 'POST',
                                                            headers: { 'Content-Type': 'application/json' },
                                                            body: JSON.stringify({ propertyId: id, phoneNumber: cleanedPhone })
                                                        });
                                                        const result = await res.json();
                                                        if (result.success) success = true;
                                                    } catch (e) {
                                                        console.warn("Server offline, falling back directly to Supabase");
                                                    }

                                                    if (!success) {
                                                        // Direct Supabase insert
                                                        let formatted = cleanedPhone;
                                                        if (formatted.startsWith('0') && formatted.length === 10) formatted = '94' + formatted.slice(1);
                                                        if (formatted.length === 9) formatted = '94' + formatted;
                                                        
                                                        const { error } = await supabase
                                                            .from('price_alerts')
                                                            .insert([{ property_id: id, phone_number: formatted }]);
                                                        
                                                        if (!error || error.code === '23505') success = true;
                                                        else throw error;
                                                    }

                                                    if (success) setSubscriptionStatus('success');
                                                } catch (err) {
                                                    setCodeError(err.message || 'Failed to subscribe. Please try again.');
                                                } finally { setSendingCode(false); }
                                            }} className="space-y-3">
                                                <input
                                                    type="tel"
                                                    value={alertCodePhone}
                                                    onChange={(e) => setAlertCodePhone(e.target.value)}
                                                    placeholder="Enter WhatsApp Number (e.g. 077 123 4567)"
                                                    className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-green-500 outline-none transition-shadow"
                                                    required
                                                />
                                                <button type="submit" disabled={sendingCode} className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl shadow-lg transition active:scale-95 disabled:opacity-50 border-0 cursor-pointer">
                                                    {sendingCode ? 'Subscribing...' : '🔔 Save Subscription & Notify Me Later'}
                                                </button>
                                                <p className="text-[10px] text-gray-400 text-center m-0">We'll notify you as soon as the price drops and the gateway is active.</p>
                                            </form>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
};

export default PropertyDetails;
