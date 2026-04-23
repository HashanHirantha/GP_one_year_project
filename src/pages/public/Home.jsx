import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import hero1 from '../../assets/images/home_hero/hero1.jpg';
import hero2 from '../../assets/images/home_hero/hero2.jpg';
import hero3 from '../../assets/images/home_hero/hero3.jpg';
import hero4 from '../../assets/images/home_hero/hero4.jpg';
import hero5 from '../../assets/images/home_hero/hero5.jpg';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import PropertyCard from '../../components/ui/PropertyCard';
import TrendingPropertyCard from '../../components/ui/TrendingPropertyCard';
import { TrendingUp, BarChart2 } from 'lucide-react';
import { supabase } from '../../config/supabase';
import { useNavigate } from 'react-router-dom';

const heroImages = [hero1, hero2, hero3, hero4, hero5];

const Home = () => {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [hotDealsData, setHotDealsData] = useState([]);
  const [trendingDealsData, setTrendingDealsData] = useState([]);
  const [loadingHot, setLoadingHot] = useState(true);
  const [loadingTrending, setLoadingTrending] = useState(true);

  // Custom Analytics Chart Data
  const chartData = [
    { city: 'Colombo', price: '85M', label: 'Rs. 85M', height: '85%', color: 'from-[#06cc50] to-green-700' },
    { city: 'Kandy', price: '45M', label: 'Rs. 45M', height: '45%', color: 'from-green-400 to-[#06cc50]' },
    { city: 'Galle', price: '60M', label: 'Rs. 60M', height: '60%', color: 'from-emerald-400 to-[#06cc50]' },
    { city: 'Gampaha', price: '35M', label: 'Rs. 35M', height: '35%', color: 'from-green-500 to-emerald-700' },
    { city: 'Negombo', price: '40M', label: 'Rs. 40M', height: '40%', color: 'from-[#06cc50] to-teal-600' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const loadData = async () => {
      setLoadingHot(true);
      setLoadingTrending(true);
      
      try {
        const [hotRes, trendRes] = await Promise.all([
          supabase
            .from('properties')
            .select(`*, property_images(image_url, is_primary)`)
            .order('created_at', { ascending: false })
            .limit(10),
          supabase
            .from('properties')
            .select(`*, property_images(image_url, is_primary)`)
            .limit(20)
        ]);

        if (hotRes.error) console.error('Error fetching hot deals:', hotRes.error.message);
        setHotDealsData(hotRes.data || []);

        if (trendRes.error) console.error('Error fetching trending deals:', trendRes.error.message);
        // Shuffle the trending deals to make it random and slice top 8
        // Spread into a new array to prevent mutating read-only array from Supabase
        const shuffledTrending = [...(trendRes.data || [])].sort(() => 0.5 - Math.random()).slice(0, 8);
        setTrendingDealsData(shuffledTrending);

      } catch (error) {
        console.error('Unexpected error loading properties:', error);
      } finally {
        setLoadingHot(false);
        setLoadingTrending(false);
      }
    };

    loadData();
  }, []);

  const hotDeals = hotDealsData.map(p => {
    const primaryImg = p.property_images?.find(i => i.is_primary)?.image_url || p.property_images?.[0]?.image_url;
    return {
      id: p.id,
      title: p.title,
      price: `Rs. ${p.price?.toLocaleString()}`,
      location: p.city || 'Location N/A',
      type: p.property_type,
      isFeatured: true, // Fake featured
      image: primaryImg,
      is_available: p.is_available ?? true
    };
  });

  const trendingDeals = trendingDealsData.map(p => {
    const primaryImg = p.property_images?.find(i => i.is_primary)?.image_url || p.property_images?.[0]?.image_url;
    return {
      id: p.id,
      title: p.title,
      price: `Rs. ${p.price?.toLocaleString()}`,
      location: p.city || 'Location N/A',
      beds: p.bedrooms || 3,
      baths: p.bathrooms || 2,
      sqft: p.area_sqm || 750,
      type: p.property_type,
      isSponsored: false,
      image: primaryImg
    };
  });

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      {/* Hero Section */}
      <div className="relative min-h-screen flex flex-col justify-center items-center pt-20 pb-16 text-center px-4 overflow-hidden bg-white text-white">
        <AnimatePresence mode='popLayout'>
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${heroImages[currentImageIndex]})` }}
          />
        </AnimatePresence>

        {/* Overlay - adjusting z-index to be above the slider */}
        <div className="absolute inset-0 bg-black/50 z-10"></div>

        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-0 pointer-events-none z-10">
          <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-blob"></div>
          <div className="absolute top-[20%] right-[-10%] w-96 h-96 bg-accent rounded-full mix-blend-overlay filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-[-20%] left-[20%] w-96 h-96 bg-secondary rounded-full mix-blend-overlay filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto">
          {/* ... (keep as is) ... */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.5, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl md:text-6xl font-bold mb-6 tracking-tight leading-tight"
          >
            Find Your Dream <span className="text-white">Property</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="opacity-90 mb-10 text-xl font-light italic tracking-wide max-w-2xl mx-auto"
          >
            Your trusted platform for Renting, Selling, and Buying properties with verified listings.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            whileHover={{ y: -10, scale: 1.02 }}
            transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
            className="max-w-4xl mx-auto p-6 drop-shadow-2xl"
          >
            {/* Top Row: Search & Button */}
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <input
                type="text"
                placeholder="Search..."
                className="flex-grow rounded-full px-6 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all bg-white shadow-lg"
              />
              <button className="bg-[#06cc50] hover:bg-white text-black px-8 py-3 rounded-full font-bold transition-all shadow-lg shadow-black/20 hover:shadow-xl transform hover:-translate-y-0.5 active:scale-95">
                Search
              </button>
            </div>

            {/* Bottom Row: Filters */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <select className="rounded-full px-4 py-2.5 text-gray-700 bg-white shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-300 cursor-pointer transition-colors">
                <option value="">Radius</option>
                <option value="1">1 km</option>
                <option value="5">5 km</option>
                <option value="10">10 km</option>
              </select>
              <select className="rounded-full px-4 py-2.5 text-gray-700 bg-white shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-300 cursor-pointer transition-colors">
                <option value="">Property Type</option>
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
                <option value="villa">Villa</option>
              </select>
              <select className="rounded-full px-4 py-2.5 text-gray-700 bg-white shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-300 cursor-pointer transition-colors">
                <option value="">Max Price</option>
                <option value="50m">50 M</option>
                <option value="100m">100 M</option>
              </select>
              <select className="rounded-full px-4 py-2.5 text-gray-700 bg-white shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-300 cursor-pointer transition-colors">
                <option value="">Max Bedroom</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3+</option>
              </select>
            </div>
          </motion.div>
        </div>
      </div>



      <div className="container mx-auto px-4 py-16">
        <div className="mb-10 text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-black tracking-tight">Hot Deal Properties</h2>
          <p className="text-gray-500 text-lg mt-2 font-light">Best value for money properties picked for you</p>
        </div>

        <div className="flex overflow-x-auto gap-6 pb-8 snap-x scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
          {loadingHot ? (
            <div className="w-full text-center py-20 text-gray-400">Loading dynamic properties...</div>
          ) : hotDeals.length > 0 ? (
            hotDeals.map((property) => (
              <motion.div 
                key={property.id} 
                className="min-w-[300px] md:min-w-[350px] snap-center shrink-0 pt-3" 
                initial={{ opacity: 0, scale: 0.9 }} 
                whileInView={{ opacity: 1, scale: 1 }} 
                viewport={{ once: true, margin: "50px" }}
                transition={{ duration: 0.5 }}
              >
                <PropertyCard
                  id={property.id}
                  title={property.title}
                  price={property.price}
                  location={property.location}
                  type={property.type}
                  isFeatured={property.isFeatured}
                  image={property.image}
                  is_available={property.is_available}
                />
              </motion.div>
            ))
          ) : (
            <div className="w-full text-center py-20 text-gray-400">No hot properties found.</div>
          )}
        </div>
      </div>

      {/* Trending Properties Section */}
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-10 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-black tracking-tight">Trending Properties</h2>
          </div>

          <div className="flex overflow-x-auto gap-6 pb-8 snap-x scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
            {loadingTrending ? (
              <div className="w-full text-center py-20 text-gray-400">Loading dynamic properties...</div>
            ) : trendingDeals.length > 0 ? (
              trendingDeals.map((property) => (
                <motion.div 
                  key={property.id} 
                  className="min-w-[300px] md:min-w-[350px] snap-center shrink-0 pt-3" 
                  initial={{ opacity: 0, scale: 0.9 }} 
                  whileInView={{ opacity: 1, scale: 1 }} 
                  viewport={{ once: true, margin: "50px" }}
                  transition={{ duration: 0.5 }}
                >
                  <TrendingPropertyCard
                    id={property.id}
                    title={property.title}
                    location={property.location}
                    price={property.price}
                    beds={property.beds}
                    baths={property.baths}
                    sqft={property.sqft}
                    type={property.type}
                    isSponsored={property.isSponsored}
                    image={property.image}
                  />
                </motion.div>
              ))
            ) : (
              <div className="w-full text-center py-20 text-gray-400">No trending properties found.</div>
            )}
          </div>
        </div>
      </div>

      {/* Property Pricing Trends Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="mb-10 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-black tracking-tight">Property Pricing Trends</h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-3xl h-[400px] flex items-end justify-between p-8 pt-16 border border-gray-100 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-6 left-6 flex items-center gap-2 text-black border-b border-gray-100 pb-2 w-[calc(100%-3rem)]">
              <TrendingUp className="w-5 h-5 text-[#06cc50]" />
              <h3 className="font-bold text-lg">Market Averages (Estimated)</h3>
            </div>
            
            {chartData.map((data, index) => (
              <div key={index} className="flex flex-col items-center justify-end h-full w-1/6 group">
                <div className="relative w-full flex justify-center items-end h-[250px] mb-4">
                  <motion.div 
                    initial={{ height: 0 }}
                    whileInView={{ height: data.height }}
                    transition={{ duration: 1, delay: 0.2 * index, ease: "easeOut" }}
                    className={`w-full max-w-[60px] rounded-t-xl bg-gradient-to-t ${data.color} shadow-lg relative cursor-pointer`}
                  >
                    {/* Tooltip */}
                    <motion.div 
                      className="absolute -top-12 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs font-bold py-1.5 px-3 rounded shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10"
                    >
                      {data.label}
                      <div className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
                    </motion.div>
                  </motion.div>
                </div>
                <p className="font-semibold text-gray-600 text-sm">{data.city}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
