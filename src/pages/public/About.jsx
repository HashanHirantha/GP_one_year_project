import React, { useEffect, useRef, useState } from 'react';
import heroImage from '../../assets/images/home_hero/hero6.jpg';
import { motion, useInView, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import {
  Target, Users, Award,
  Search, CheckCircle, Map, MessageSquare,
  Star, TrendingUp, Shield, Zap, Handshake,
  Smartphone, Wallet, Heart, X, Linkedin, Twitter, Github, Mail
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
  const [selectedMember, setSelectedMember] = useState(null);

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
    { title: 'Verified Listing', desc: 'All properties are verified to ensure authenticity.', icon: <CheckCircle className="w-8 h-8 text-secondary" /> },
    { title: 'Map Integration', desc: 'View properties on interactive maps with radius search.', icon: <Map className="w-8 h-8 text-orange-500" /> },
    { title: 'Direct Communication', desc: 'Chat directly with property owners and buyers.', icon: <MessageSquare className="w-8 h-8 text-cyan-500" /> },
    { title: 'Reviews & Ratings', desc: 'Read genuine reviews from verified users.', icon: <Star className="w-8 h-8 text-yellow-500" /> },
    { title: 'Price Trends', desc: 'Real-time property price analytics and trends.', icon: <TrendingUp className="w-8 h-8 text-black" /> },
  ];

  const reasons = [
    { title: 'Secure & Safe', desc: 'Your data is protected with advanced encryption and security.', icon: <Shield className="w-6 h-6 text-white" />, bg: 'bg-secondary' },
    { title: 'Fast & Efficient', desc: 'Find properties quickly with our smart search algorithms.', icon: <Zap className="w-6 h-6 text-white" />, bg: 'bg-red-500' },
    { title: 'Trusted Platform', desc: 'Thousands of satisfied customers trust us.', icon: <Handshake className="w-6 h-6 text-white" />, bg: 'bg-blue-500' },
    { title: 'Mobile Friendly', desc: 'Access the platform anywhere, anytime from any device.', icon: <Smartphone className="w-6 h-6 text-white" />, bg: 'bg-indigo-500' },
    { title: 'Transparent Pricing', desc: 'No hidden charges. Clear and transparent pricing.', icon: <Wallet className="w-6 h-6 text-white" />, bg: 'bg-yellow-500' },
    { title: 'Personalized Service', desc: 'Get property recommendations based on your preferences.', icon: <Heart className="w-6 h-6 text-white" />, bg: 'bg-pink-500' },
  ];

  const teamMembers = [
    { name: "V.P Pulasinghe", role: "Project Manager", initials: "VP", color: "bg-secondary", bio: "Leading the project vision and execution.", email: "vp@smartproperty.com", socials: { linkedin: "#", twitter: "#", github: "#" } },
    { name: "W.A.D Ranaweera", role: "Analyst", initials: "DR", color: "bg-secondary", bio: "Analyzing market trends and business requirements.", email: "wr@smartproperty.com", socials: { linkedin: "#", twitter: "#", github: "#" } },
    { name: "L.H Seneviratne", role: "Designer", initials: "LS", color: "bg-secondary", bio: "Creating seamless and beautiful user experiences.", email: "ls@smartproperty.com", socials: { linkedin: "#", twitter: "#", github: "#" } },
    { name: "A. Nisansala", role: "Front-end Developer", initials: "AN", color: "bg-secondary", bio: "Building responsive and interactive web interfaces.", email: "an@smartproperty.com", socials: { linkedin: "#", twitter: "#", github: "#" } },
    { name: "H.H Nagahawatta", role: "Front-end Developer", initials: "HN", color: "bg-secondary", bio: "Implementing modern frontend technologies.", email: "hn@smartproperty.com", socials: { linkedin: "#", twitter: "#", github: "#" } },
    { name: "P. Sachinthana", role: "Database Administrator", initials: "PS", color: "bg-secondary", bio: "Managing and optimizing database performance.", email: "ps@smartproperty.com", socials: { linkedin: "#", twitter: "#", github: "#" } },
    { name: "P. Buddhima", role: "Back-end Developer", initials: "PB", color: "bg-secondary", bio: "Developing robust server-side architecture.", email: "pb@smartproperty.com", socials: { linkedin: "#", twitter: "#", github: "#" } },
    { name: "P.D Alwis", role: "Tester", initials: "PA", color: "bg-secondary", bio: "Ensuring software quality and reliability.", email: "pa@smartproperty.com", socials: { linkedin: "#", twitter: "#", github: "#" } },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-transparent font-sans text-white bg-[#011C40]">
        <Navbar />

      {/* Hero Section */}
      <div className="relative pt-36 pb-36 text-center px-4 overflow-hidden bg-cover bg-center" style={{ backgroundImage: `url(${heroImage})` }}>
        <div className="absolute inset-0 bg-[#011C40]/80 z-0"></div>
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-30 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-[#54ACBF] rounded-full mix-blend-screen filter blur-3xl animate-blob"></div>
          <div className="absolute top-[20%] right-[-10%] w-96 h-96 bg-[#26658C] rounded-full mix-blend-screen filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-[-20%] left-[20%] w-96 h-96 bg-[#A7EBF2] rounded-full mix-blend-overlay filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, scale: 0.5, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl md:text-5xl font-bold mb-6 tracking-tight leading-tight"
          >
            <span className="text-white">About Smart Property Finder</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="max-w-2xl mx-auto text-lg md:text-xl text-[#A7EBF2] font-light italic opacity-90 tracking-wide"
          >
            We decided to making property searching, buying, and selling easy, secure, and transparent for everyone.
          </motion.p>
        </div>
      </div>

      {/* Mission Vision Values Cards */}
      <div className="container mx-auto px-4 pb-16 -mt-20 relative z-10">
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
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <motion.div variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }} whileHover={{ y: -10 }} className="glass-card p-8 rounded-xl shadow-lg flex flex-col items-center text-center transition-shadow hover:shadow-[#54ACBF]/20">
            <div className="mb-4 p-3 bg-[#54ACBF]/20 rounded-full border border-[#54ACBF]/30"><Target className="w-10 h-10 text-[#54ACBF]" /></div>
            <h3 className="text-white font-bold text-lg mb-3">Our mission</h3>
            <p className="text-xs text-gray-300 leading-relaxed">To provide a trusted, user-friendly platform that connects property seekers with their ideal homes, while empowering property owners.</p>
          </motion.div>
          <motion.div variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }} whileHover={{ y: -10 }} className="glass-card p-8 rounded-xl shadow-lg flex flex-col items-center text-center transition-shadow hover:shadow-[#54ACBF]/20">
            <div className="mb-4 p-3 bg-yellow-500/20 rounded-full border border-yellow-500/30"><Users className="w-10 h-10 text-yellow-500" /></div>
            <h3 className="text-white font-bold text-lg mb-3">Our vision</h3>
            <p className="text-xs text-gray-300 leading-relaxed">To become the leading property finding platform, revolutionizing how people discover, buy, sell and rent properties.</p>
          </motion.div>
          <motion.div variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }} whileHover={{ y: -10 }} className="glass-card p-8 rounded-xl shadow-lg flex flex-col items-center text-center transition-shadow hover:shadow-[#54ACBF]/20">
            <div className="mb-4 p-3 bg-blue-500/20 rounded-full border border-blue-500/30"><Award className="w-10 h-10 text-blue-500" /></div>
            <h3 className="text-white font-bold text-lg mb-3">Our values</h3>
            <p className="text-xs text-gray-300 leading-relaxed">Trust, transparency, innovation, and customer satisfaction are at the heart of everything we do. We believe in building lasting relationships.</p>
          </motion.div>
        </motion.div>
      </div>

      {/* Stats Section */}
      <div className="bg-[#001026]/50 text-white py-12 border-y border-white/5">
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
      <div className="py-20 bg-transparent">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">What we offer</h2>
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
                className="glass-card p-6 rounded-xl shadow-lg hover:shadow-[#54ACBF]/20 transition-all duration-300 flex flex-col items-center text-center group"
              >
                <div className="mb-4 p-3 bg-white/5 rounded-full group-hover:bg-white/10 transition">{offer.icon}</div>
                <h3 className="font-bold text-white mb-2">{offer.title}</h3>
                <p className="text-xs text-gray-400">{offer.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="bg-[#001026]/50 pb-20 pt-10 border-t border-white/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Why Choose Us</h2>
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
                className="glass-card p-6 rounded-xl shadow-lg hover:shadow-[#54ACBF]/20 transition-all duration-300 flex flex-col items-center text-center"
              >
                <div className={`p-3 rounded-full mb-4 ${reason.bg} bg-opacity-20`}>
                  {reason.icon}
                </div>
                <h3 className="font-bold text-white mb-2">{reason.title}</h3>
                <p className="text-xs text-gray-400">{reason.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Meet Our Team */}
      <div className="py-20 bg-transparent">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Meet Our Team</h2>
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
                onClick={() => setSelectedMember(member)}
                className="glass-card p-6 rounded-xl shadow-lg hover:shadow-[#54ACBF]/50 transition-all duration-300 flex flex-col items-center text-center group cursor-pointer border border-transparent hover:border-[#54ACBF]/30"
              >
                <div className={`w-20 h-20 rounded-full bg-[#54ACBF] flex items-center justify-center text-white text-2xl font-bold mb-4 shadow-lg border-2 border-white/20 group-hover:border-[#54ACBF] transition`}>
                  {member.initials}
                </div>
                <h3 className="font-bold text-white mb-1 text-sm">{member.name}</h3>
                <p className="text-xs text-[#54ACBF] uppercase tracking-wider">{member.role}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

        {/* Profile Card Modal */}
        <AnimatePresence>
          {selectedMember && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
              onClick={() => setSelectedMember(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-md bg-[#001026] border border-[#54ACBF]/30 rounded-2xl shadow-2xl overflow-hidden shadow-[#54ACBF]/20"
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedMember(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors z-10"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Profile Header Background */}
                <div className="h-32 bg-gradient-to-br from-[#011C40] to-[#54ACBF]/40 relative">
                  <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-[-50%] right-[-10%] w-64 h-64 bg-[#54ACBF] rounded-full mix-blend-screen filter blur-3xl opacity-30"></div>
                  </div>
                </div>

                {/* Profile Content */}
                <div className="px-8 pb-8 pt-0 relative">
                  {/* Avatar Avatar */}
                  <div className="flex justify-center -mt-16 mb-4">
                    <div className="w-32 h-32 rounded-full bg-[#001026] p-2 flex items-center justify-center relative">
                      <div className="w-full h-full rounded-full bg-gradient-to-br from-[#54ACBF] to-[#26658C] flex items-center justify-center text-white text-4xl font-bold shadow-lg border-2 border-[#54ACBF]/50">
                        {selectedMember.initials}
                      </div>
                    </div>
                  </div>

                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-white mb-1">{selectedMember.name}</h2>
                    <p className="text-[#54ACBF] font-medium tracking-wide">{selectedMember.role}</p>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h4 className="text-xs uppercase tracking-wider text-white/50 mb-2 font-semibold">About</h4>
                      <p className="text-sm text-gray-300 leading-relaxed">
                        {selectedMember.bio}
                      </p>
                    </div>

                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-3 text-sm text-gray-300 hover:text-white transition-colors cursor-pointer group">
                        <div className="p-2 rounded-full bg-white/5 group-hover:bg-[#54ACBF]/20 group-hover:text-[#54ACBF] transition-colors">
                          <Mail className="w-4 h-4" />
                        </div>
                        <span>{selectedMember.email}</span>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-white/10 flex justify-center gap-4">
                      <a href={selectedMember.socials?.linkedin} className="p-3 rounded-full bg-white/5 hover:bg-[#0077B5] hover:text-white text-white/70 transition-all duration-300 hover:shadow-lg hover:shadow-[#0077B5]/30">
                        <Linkedin className="w-5 h-5" />
                      </a>
                      <a href={selectedMember.socials?.twitter} className="p-3 rounded-full bg-white/5 hover:bg-[#1DA1F2] hover:text-white text-white/70 transition-all duration-300 hover:shadow-lg hover:shadow-[#1DA1F2]/30">
                        <Twitter className="w-5 h-5" />
                      </a>
                      <a href={selectedMember.socials?.github} className="p-3 rounded-full bg-white/5 hover:bg-[#333] hover:text-white text-white/70 transition-all duration-300 hover:shadow-lg hover:shadow-white/10">
                        <Github className="w-5 h-5" />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <Footer />
    </div>
  );
};

export default About;