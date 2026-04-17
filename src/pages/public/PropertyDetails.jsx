import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Bed, Bath, Ruler, Car, Phone, Mail, MessageSquare, Heart, Calendar, Share2, Printer, ChevronLeft, ChevronRight, Star, FileText, Camera, Users } from 'lucide-react';
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

    useEffect(() => {
        if (id) {
            fetchProperty();
            incrementViews();
            if (user) checkFavorite();
        }
    }, [id, user]);

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

            <Footer />
        </div>
    );
};

export default PropertyDetails;
