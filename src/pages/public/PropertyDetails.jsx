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
      window.scrollTo(0, 0);
    }
  }, [id]);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setContactStatus('sending');
    setTimeout(() => setContactStatus('success'), 1500);
  };

  if (!property) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
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
    <div className="min-h-screen bg-cream flex flex-col text-gray-800">
      <Navbar />

      {/* Breadcrumb */}
      <div className="bg-white/50 border-b">
        <div className="container mx-auto px-6 py-4 text-sm text-gray-500">
          <Link to="/" className="hover:text-darkgreen">Home</Link> /
          <Link to="/properties" className="hover:text-darkgreen mx-1">Properties</Link> /
          <span className="text-darkgreen font-semibold">{property.title}</span>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* LEFT */}
        <div className="lg:col-span-8 space-y-8">

          {/* Images */}
          <div className="bg-white p-2 rounded-3xl shadow">
            <div className="relative h-[450px] rounded-2xl overflow-hidden">
              <img src={activeImage} alt={property.title} className="w-full h-full object-cover" />
              <div className="absolute top-4 right-4 flex gap-2">
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={`p-3 rounded-full ${isFavorite ? 'bg-red-100 text-red-500' : 'bg-white text-gray-600'}`}
                >
                  <Heart size={20} className={isFavorite ? 'fill-current' : ''} />
                </button>
                <button className="p-3 bg-white rounded-full">
                  <Share2 size={20} />
                </button>
              </div>
            </div>

            <div className="flex gap-3 mt-3 overflow-x-auto">
              {property.images?.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  onClick={() => setActiveImage(img)}
                  className={`w-24 h-24 object-cover rounded-xl cursor-pointer border-2 ${activeImage === img ? 'border-darkgreen' : 'border-transparent'}`}
                />
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="bg-white p-6 rounded-3xl grid grid-cols-2 md:grid-cols-4 gap-4">
            <Stat icon={<BedDouble />} label="Bedrooms" value={property.bedrooms} />
            <Stat icon={<Bath />} label="Bathrooms" value={property.bathrooms} />
            <Stat icon={<Maximize />} label="Area" value={property.area} />
            <Stat icon={<Car />} label="Parking" value={property.parking} />
          </div>

          {/* Description */}
          <div className="bg-white p-8 rounded-3xl">
            <h2 className="font-bold text-xl flex items-center gap-2">
              <FileText /> About this Property
            </h2>
            <p className="mt-4 text-gray-600">{property.description}</p>
          </div>

          {/* Amenities */}
          <div className="bg-white p-8 rounded-3xl">
            <h2 className="font-bold text-xl flex items-center gap-2">
              <Building2 /> Amenities
            </h2>
            <div className="grid md:grid-cols-2 gap-3 mt-4">
              {property.features?.map((f, i) => (
                <div key={i} className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl">
                  <CheckCircle size={16} /> {f}
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT */}
        <div className="lg:col-span-4 sticky top-24 space-y-6">

          {/* Agent */}
          <div className="bg-white p-6 rounded-3xl shadow">
            <h4 className="font-bold">{property.agent?.name}</h4>
            <div className="grid grid-cols-2 gap-3 mt-4">
              <button className="bg-darkgreen text-white py-2 rounded-xl flex justify-center gap-2">
                <Phone size={16} /> Call
              </button>
              <button className="border border-darkgreen py-2 rounded-xl flex justify-center gap-2">
                <Mail size={16} /> Message
              </button>
            </div>

            <form onSubmit={handleContactSubmit} className="mt-4 space-y-3">
              <input placeholder="Name" required className="w-full p-3 border rounded-xl" />
              <input placeholder="Phone" required className="w-full p-3 border rounded-xl" />
              <button className="w-full bg-sage text-white py-3 rounded-xl">
                {contactStatus === 'sending' ? 'Sending...' : 'Send Request'}
              </button>
            </form>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
};

const Stat = ({ icon, label, value }) => (
  <div className="text-center bg-cream p-4 rounded-xl">
    <div className="mx-auto mb-2">{icon}</div>
    <p className="font-bold">{value}</p>
    <p className="text-xs text-gray-500">{label}</p>
  </div>
);

export default PropertyDetails;
