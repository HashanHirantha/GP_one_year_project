import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import PropertyCard from '../../components/ui/PropertyCard';
import { Filter, MapPin, List, Map, Loader } from 'lucide-react';
import { supabase } from '../../config/supabase';
import heroImage from '../../assets/images/properties_header.png';

const Properties = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [dbProperties, setDbProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  // Top Bar Search State
  const [topSearch, setTopSearch] = useState(searchParams.get('query') || '');
  
  // Sidebar Filter State
  const [sideLocation, setSideLocation] = useState(searchParams.get('location') || '');
  const [sideMinPrice, setSideMinPrice] = useState(searchParams.get('minPrice') || '');
  const [sideMaxPrice, setSideMaxPrice] = useState(searchParams.get('maxPrice') || '');
  const [sideBeds, setSideBeds] = useState(searchParams.get('beds') || '');
  const [sideBaths, setSideBaths] = useState(searchParams.get('baths') || '');
  const [sideCapacity, setSideCapacity] = useState(searchParams.get('capacity') || '');
  
  const [viewMode, setViewMode] = useState('grid');
  
  // Manage checkboxes
  const urlTypes = searchParams.get('type') ? searchParams.get('type').split(',') : [];
  const [sideTypes, setSideTypes] = useState(urlTypes);

  useEffect(() => {
    fetchProperties();
  }, [searchParams]);

  // Auto-apply filters when top search or sidebar filters change
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const params = new URLSearchParams(searchParams);
      
      // Top Search
      if (topSearch) params.set('query', topSearch); else params.delete('query');
      
      // Sidebar Filters
      if (sideLocation) params.set('location', sideLocation); else params.delete('location');
      if (sideTypes.length > 0) params.set('type', sideTypes.join(',')); else params.delete('type');
      
      if (sideMinPrice) params.set('minPrice', sideMinPrice); else params.delete('minPrice');
      if (sideMaxPrice) params.set('maxPrice', sideMaxPrice); else params.delete('maxPrice');
      if (sideBeds) params.set('beds', sideBeds); else params.delete('beds');
      if (sideBaths) params.set('baths', sideBaths); else params.delete('baths');
      if (sideCapacity) params.set('capacity', sideCapacity); else params.delete('capacity');
      
      setSearchParams(params, { replace: true });
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [topSearch, sideLocation, sideTypes, sideMinPrice, sideMaxPrice, sideBeds, sideBaths, sideCapacity]);

  const fetchProperties = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('properties')
        .select(`*, property_images(image_url, is_primary)`);
      
      const qWord = searchParams.get('query');
      if (qWord) query = query.or(`title.ilike.%${qWord}%,city.ilike.%${qWord}%,property_type.ilike.%${qWord}%`);
      
      const qLoc = searchParams.get('location');
      if (qLoc) query = query.ilike('city', `%${qLoc}%`);

      const qType = searchParams.get('type');
      if (qType) query = query.in('property_type', qType.split(','));

      const qMin = searchParams.get('minPrice');
      if (qMin) query = query.gte('price', parseFloat(qMin));

      const qMax = searchParams.get('maxPrice');
      if (qMax) query = query.lte('price', parseFloat(qMax));

      const qBeds = searchParams.get('beds');
      if (qBeds) query = query.gte('bedrooms', parseInt(qBeds));

      const qBaths = searchParams.get('baths');
      if (qBaths) query = query.gte('bathrooms', parseInt(qBaths));

      const qCap = searchParams.get('capacity');
      if (qCap) query = query.gte('max_guests', parseInt(qCap));

      const { data, error } = await query.order('created_at', { ascending: false });
      if (error) throw error;
      setDbProperties(data || []);
    } catch(err) {
      console.error("Error fetching properties:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleTypeCheck = (type) => {
    setSideTypes(prev => prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      {/* Hero Section */}
      <div className="relative pt-32 pb-16 text-center px-4 mb-6 bg-cover bg-center" style={{ backgroundImage: `url(${heroImage})` }}>
        <div className="absolute inset-0 bg-black/50 z-0"></div>
        <div className="relative z-10">
          <motion.h1
            initial={{ opacity: 0, scale: 0.5, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Browse <span className="text-white">Properties</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="opacity-90 text-lg"
          >
            Discover the best properties availble in the market.
          </motion.p>
        </div>
      </div>

      {/* Search Bar Section */}
      <div className="container mx-auto px-4 mb-8">
        <div className="bg-white p-6 shadow-sm border border-gray-100 rounded-lg flex flex-col md:flex-row gap-4 items-center">

          {/* Location / Text Search */}
          <input
            type="text"
            value={topSearch}
            onChange={(e) => setTopSearch(e.target.value)}
            placeholder="Search by keywords..."
            className="w-full md:flex-1 p-2.5 border border-gray-400 rounded text-sm focus:outline-none focus:border-purple-500 text-gray-900"
          />

          {/* Search Button removed since it is auto-applying */}
        </div>
      </div>

      <div className="container mx-auto px-4 pb-8 flex flex-col md:flex-row gap-6">
        <aside className="w-full md:w-1/4 bg-white p-6 rounded-lg shadow-sm h-fit border border-gray-100">
          <h3 className="font-bold text-gray-900 border-b-2 border-gray-100 pb-2 mb-6 text-lg">
            filter properties
          </h3>

          <div className="space-y-6">
            {/* Location */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">location / City</label>
              <input
                type="text"
                value={sideLocation}
                onChange={(e) => setSideLocation(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-purple-500 text-gray-900"
              />
            </div>

            {/* Property Type */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">property type</label>
              <div className="space-y-2 text-sm text-gray-600">
                {['apartment', 'house', 'villa', 'land', 'boarding'].map(type => (
                  <label key={type} className="flex items-center gap-2 cursor-pointer hover:text-purple-700">
                    <input 
                      type="checkbox" 
                      checked={sideTypes.includes(type)}
                      onChange={() => handleTypeCheck(type)}
                      className="accent-purple-600" 
                    /> {type}
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Price Range (Rs.)</label>
              <div className="space-y-2">
                <input
                  type="text"
                  value={sideMinPrice}
                  onChange={(e) => setSideMinPrice(e.target.value.replace(/\D/g, ''))}
                  placeholder="min price"
                  className="w-full p-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-black placeholder-gray-400 text-gray-900"
                />
                <input
                  type="text"
                  value={sideMaxPrice}
                  onChange={(e) => setSideMaxPrice(e.target.value.replace(/\D/g, ''))}
                  placeholder="max price"
                  className="w-full p-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-black placeholder-gray-400 text-gray-900"
                />
              </div>
            </div>

            {/* Bedrooms */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Min Bedrooms</label>
              <input
                type="number"
                min="0"
                value={sideBeds}
                onChange={(e) => setSideBeds(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-purple-500 text-gray-900"
              />
            </div>

            {/* Bathroom */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Min Bathrooms</label>
              <input
                type="number"
                min="0"
                value={sideBaths}
                onChange={(e) => setSideBaths(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-purple-500 text-gray-900"
              />
            </div>
            
            {/* Capacity */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Min Guests Capacity</label>
              <input
                type="number"
                min="0"
                value={sideCapacity}
                onChange={(e) => setSideCapacity(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-purple-500 text-gray-900"
              />
            </div>

          </div>
        </aside>

        <main className="w-full md:w-3/4 flex flex-col gap-6">
          {/* Found Properties Bar */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <MapPin className="text-red-500 fill-current" size={20} />
              <h2 className="text-lg font-bold text-gray-800">
                {loading ? 'Searching...' : `Found ${dbProperties.length} Properties`}
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => setViewMode('grid')} className={`flex items-center gap-2 px-4 py-2 rounded shadow-sm transition-colors ${viewMode === 'grid' ? 'bg-[#4A1D54] text-white hover:bg-[#3a1642]' : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'}`}>
                <List size={18} />
                <span className="font-medium">List</span>
              </button>
              <button onClick={() => setViewMode('map')} className={`flex items-center gap-2 px-4 py-2 rounded shadow-sm transition-colors ${viewMode === 'map' ? 'bg-[#4A1D54] text-white hover:bg-[#3a1642]' : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'}`}>
                <Map size={18} className={viewMode === 'map' ? 'text-white' : 'text-green-600'} />
                <span className="font-medium">Map</span>
              </button>
            </div>
          </div>

          {/* Property Grid */}
          {loading ? (
            <div className="flex flex-col items-center justify-center p-20 text-gray-400">
              <Loader className="w-10 h-10 animate-spin mb-4 text-purple-600" />
              Fetching properties...
            </div>
          ) : dbProperties.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-20 text-gray-400">
              No properties matched your filters.
            </div>
          ) : (
            <>
              {viewMode === 'grid' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {dbProperties.map((property) => {
                    const primaryImage = property.property_images?.find(i => i.is_primary)?.image_url || property.property_images?.[0]?.image_url;
                    return (
                      <PropertyCard
                        key={property.id}
                        id={property.id}
                        title={property.title}
                        price={`Rs. ${property.price?.toLocaleString()}`}
                        location={property.city || 'N/A'}
                        type={property.property_type}
                        image={primaryImage}
                        is_available={property.is_available ?? true}
                        beds={property.bedrooms}
                        baths={property.bathrooms}
                        sqft={property.area_sqft || property.area_sqm}
                      />
                    )
                  })}
                </div>
              )}
              {viewMode === 'map' && (
                <div className="w-full h-[600px] bg-gray-200 rounded-xl flex items-center justify-center text-gray-500 font-bold border border-gray-300">
                  <div className="text-center">
                     <Map className="mx-auto mb-4 w-12 h-12 text-gray-400" />
                     <p>Map View Integration Coming Soon</p>
                  </div>
                </div>
              )}
            </>
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Properties;
