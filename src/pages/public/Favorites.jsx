import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import PropertyCard from '../../components/ui/PropertyCard';
import { Heart, Loader } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../config/supabase';
import { Navigate } from 'react-router-dom';

const Favorites = () => {
  const { user, loading: authLoading } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchFavorites();
    } else if (!authLoading) {
      setLoading(false);
    }
  }, [user, authLoading]);

  const fetchFavorites = async () => {
    setLoading(true);
    try {
      // Query favorites, expanding the related property and its images
      const { data, error } = await supabase
        .from('favorites')
        .select(`
          id,
          properties (
            *,
            property_images(image_url, is_primary)
          )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Filter out favorites where the property might have been deleted but favorite remained
      const validFavorites = (data || []).filter(f => f.properties !== null);
      setFavorites(validFavorites);
    } catch (err) {
      console.error("Error fetching favorites:", err);
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) return <div className="min-h-screen flex text-xl items-center justify-center">Loading...</div>;
  if (!user) return <Navigate to="/login" />;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-primary text-white pt-32 pb-16 text-center px-4 mb-8 h-64 flex flex-col justify-center relative overflow-hidden">
        <div className="relative z-10 flex flex-col items-center">
          <Heart className="w-12 h-12 text-red-500 mb-4 animate-pulse fill-red-500" />
          <motion.h1
            initial={{ opacity: 0, scale: 0.5, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl md:text-5xl font-bold font-serif mb-2"
          >
            Your <span className="text-accent">Favorites</span>
          </motion.h1>
          <p className="opacity-90 mt-2 text-lg font-light max-w-xl">
            All the properties you love, saved in one place.
          </p>
        </div>
      </div>

      <main className="container mx-auto px-4 pb-16 flex-1 max-w-5xl">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800 border-b-2 border-purple-100 pb-2">Saved Properties</h2>
                <span className="bg-purple-100 text-primary px-3 py-1 rounded-full text-sm font-bold">{favorites.length} Saved</span>
            </div>

            {loading ? (
                <div className="flex flex-col items-center justify-center p-20 text-gray-400">
                    <Loader className="w-10 h-10 animate-spin mb-4 text-purple-600" />
                    Fetching favorites...
                </div>
            ) : favorites.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-20 text-gray-400 border border-dashed border-gray-300 rounded-xl bg-gray-50/50">
                    <Heart className="w-16 h-16 text-gray-300 mb-4" />
                    <p className="text-lg">You haven't saved any properties yet.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {favorites.map((fav) => {
                        const property = fav.properties;
                        const primaryImage = property.property_images?.find(i => i.is_primary)?.image_url || property.property_images?.[0]?.image_url;
                        return (
                            <PropertyCard
                                key={fav.id}
                                id={property.id}
                                title={property.title}
                                price={`Rs. ${property.price?.toLocaleString()}`}
                                location={property.city || 'N/A'}
                                type={property.property_type}
                                image={primaryImage}
                                is_available={property.is_available ?? true}
                            />
                        )
                    })}
                </div>
            )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Favorites;
