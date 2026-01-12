import React, { useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import {
  Target, Users, Award,
  Search, CheckCircle, Map, MessageSquare,
  Star, TrendingUp, Shield, Zap, Handshake,
  Smartphone, Wallet, Heart
} from 'lucide-react';

const StatItem = ({ value, label }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: 3000 });

  // Extract number and suffix (e.g., "5000+" -> 5000 and "+")
  const numericValue = parseInt(value.replace(/,/g, ''), 10);
  const suffix = value.replace(/[\d,]/g, '');

  useEffect(() => {
    if (isInView) {
      motionValue.set(numericValue);
    }
  }, [isInView, motionValue, numericValue]);

  useEffect(() => {
    springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Math.floor(latest).toLocaleString() + suffix;
      }
    });
  }, [springValue, suffix]);

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-1 flex items-baseline">
        <span ref={ref}>0</span>
      </h2>
      <p className="text-xs opacity-80 uppercase tracking-widest">{label}</p>
    </div>
  );
};

const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const stats = [
    { label: 'Properties Listed', value: '5000+' },
    { label: 'Happy Customers', value: '10,000+' },
    { label: 'Property Owners', value: '500+' },
    { label: 'Cities Covered', value: '50+' },
  ];

  const offers = [
    { title: 'Smart Search', desc: 'Advanced search filters to find exactly what you are looking for.', icon: <Search className="w-8 h-8 text-blue-500" /> },
    { title: 'Verified Listing', desc: 'All properties are verified to ensure authenticity.', icon: <CheckCircle className="w-8 h-8 text-green-500" /> },
    { title: 'Map Integration', desc: 'View properties on interactive maps with radius search.', icon: <Map className="w-8 h-8 text-orange-500" /> },
    { title: 'Direct Communication', desc: 'Chat directly with property owners and buyers.', icon: <MessageSquare className="w-8 h-8 text-cyan-500" /> },
    { title: 'Reviews & Ratings', desc: 'Read genuine reviews from verified users.', icon: <Star className="w-8 h-8 text-yellow-500" /> },
    { title: 'Price Trends', desc: 'Real-time property price analytics and trends.', icon: <TrendingUp className="w-8 h-8 text-purple-500" /> },
  ];

  const reasons = [
    { title: 'Secure & Safe', desc: 'Your data is protected with advanced encryption and security.', icon: <Shield className="w-6 h-6 text-white" />, bg: 'bg-green-500' },
    { title: 'Fast & Efficient', desc: 'Find properties quickly with our smart search algorithms.', icon: <Zap className="w-6 h-6 text-white" />, bg: 'bg-red-500' },
    { title: 'Trusted Platform', desc: 'Thousands of satisfied customers trust us.', icon: <Handshake className="w-6 h-6 text-white" />, bg: 'bg-blue-500' },
    { title: 'Mobile Friendly', desc: 'Access the platform anywhere, anytime from any device.', icon: <Smartphone className="w-6 h-6 text-white" />, bg: 'bg-indigo-500' },
    { title: 'Transparent Pricing', desc: 'No hidden charges. Clear and transparent pricing.', icon: <Wallet className="w-6 h-6 text-white" />, bg: 'bg-yellow-500' },
    { title: 'Personalized Service', desc: 'Get property recommendations based on your preferences.', icon: <Heart className="w-6 h-6 text-white" />, bg: 'bg-pink-500' },
  ];

  const teamMembers = [
    { name: "V.P Pulasinghe", role: "Project Manager", initials: "VP", color: "bg-purple-600" },
    { name: "W.A.D Ranaweera", role: "Analyst", initials: "DR", color: "bg-purple-600" },
    { name: "L.H Seneviratne", role: "Designer", initials: "LS", color: "bg-purple-600" },
    { name: "A. Nisansala", role: "Front-end Developer", initials: "AN", color: "bg-purple-600" },
    { name: "H.H Nagahawatta", role: "Front-end Developer", initials: "HN", color: "bg-purple-600" },
    { name: "P. Sachinthana", role: "Database Administrator", initials: "PS", color: "bg-purple-600" },
    { name: "P. Buddhima", role: "Back-end Developer", initials: "PB", color: "bg-purple-600" },
    { name: "P.D Alwis", role: "Tester", initials: "PA", color: "bg-purple-600" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 font-sans text-gray-800">
      <Navbar />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-primary via-purple-700 to-secondary text-white pt-32 pb-32 text-center px-4 overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-blob"></div>
          <div className="absolute top-[20%] right-[-10%] w-96 h-96 bg-accent rounded-full mix-blend-overlay filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-[-20%] left-[20%] w-96 h-96 bg-secondary rounded-full mix-blend-overlay filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, scale: 0.5, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl md:text-5xl font-bold mb-6 tracking-tight leading-tight"
          >
            About <span className="text-accent">Smart Property Finder</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="max-w-2xl mx-auto text-lg md:text-xl font-light italic opacity-90 tracking-wide"
          >
            We decided to making property searching, buying, and selling easy, secure, and transparent for everyone.
          </motion.p>
        </div>
      </div>

      {/* Mission Vision Values Cards */}
      <div className="container mx-auto px-4 -mt-10 relative z-10 pb-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2
              }
            }
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <motion.div variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }} whileHover={{ y: -10 }} className="bg-white p-8 rounded-xl shadow-lg flex flex-col items-center text-center transition-shadow hover:shadow-2xl">
            <div className="mb-4 p-3 bg-red-50 rounded-full"><Target className="w-10 h-10 text-red-500" /></div>
            <h3 className="text-purple-900 font-bold text-lg mb-3">Our mission</h3>
            <p className="text-xs text-gray-500 leading-relaxed">To provide a trusted, user-friendly platform that connects property seekers with their ideal homes, while empowering property owners.</p>
          </motion.div>
          <motion.div variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }} whileHover={{ y: -10 }} className="bg-white p-8 rounded-xl shadow-lg flex flex-col items-center text-center transition-shadow hover:shadow-2xl">
            <div className="mb-4 p-3 bg-yellow-50 rounded-full"><Users className="w-10 h-10 text-yellow-500" /></div>
            <h3 className="text-purple-900 font-bold text-lg mb-3">Our vision</h3>
            <p className="text-xs text-gray-500 leading-relaxed">To become the leading property finding platform, revolutionizing how people discover, buy, sell and rent properties.</p>
          </motion.div>
          <motion.div variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }} whileHover={{ y: -10 }} className="bg-white p-8 rounded-xl shadow-lg flex flex-col items-center text-center transition-shadow hover:shadow-2xl">
            <div className="mb-4 p-3 bg-blue-50 rounded-full"><Award className="w-10 h-10 text-blue-500" /></div>
            <h3 className="text-purple-900 font-bold text-lg mb-3">Our values</h3>
            <p className="text-xs text-gray-500 leading-relaxed">Trust, transparency, innovation, and customer satisfaction are at the heart of everything we do. We believe in building lasting relationships.</p>
          </motion.div>
        </motion.div>
      </div>

      {/* Stats Section */}
      <div className="bg-[#6b2c91] text-white py-12">
        <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <StatItem value={stat.value} label={stat.label} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* What we offer */}
      <div className="bg-gray-100 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-purple-900 tracking-tight">What we offer</h2>
          </div>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {offers.map((offer, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col items-center text-center"
              >
                <div className="mb-4 p-3 bg-purple-50 rounded-full">{offer.icon}</div>
                <h3 className="font-bold text-purple-900 mb-2">{offer.title}</h3>
                <p className="text-xs text-gray-500">{offer.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="bg-gray-100 pb-20 pt-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-purple-900 tracking-tight">Why Choose Us</h2>
          </div>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {reasons.map((reason, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col items-center text-center"
              >
                <div className={`p-3 rounded-full mb-4 ${reason.bg}`}>
                  {reason.icon}
                </div>
                <h3 className="font-bold text-purple-900 mb-2">{reason.title}</h3>
                <p className="text-xs text-gray-500">{reason.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Meet Our Team */}
      <div className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-purple-900 tracking-tight">Meet Our Team</h2>
          </div>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {teamMembers.map((member, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col items-center text-center"
              >
                <div className={`w-20 h-20 rounded-full ${member.color} flex items-center justify-center text-white text-2xl font-bold mb-4 shadow-lg`}>
                  {member.initials}
                </div>
                <h3 className="font-bold text-gray-900 mb-1 text-sm">{member.name}</h3>
                <p className="text-xs text-gray-500 uppercase tracking-wider">{member.role}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default About;