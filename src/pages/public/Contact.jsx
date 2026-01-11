import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import { Mail, Phone, MapPin } from 'lucide-react';

const Contact = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-primary via-purple-700 to-secondary text-white pt-32 pb-20 text-center px-4 mb-8">
        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, scale: 0.5, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Contact <span className="text-accent">Us</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="opacity-90 max-w-xl mx-auto text-lg"
          >
            We are here to help you finding your dream property. Reach out to us!
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-12 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold text-purple-900 mb-6">Send Us A Message</h2>
          <form className="space-y-4">
            <input type="text" className="w-full border p-2 rounded" placeholder="Your Name" />
            <input type="email" className="w-full border p-2 rounded" placeholder="your@email.com" />
            <textarea className="w-full border p-2 rounded h-32" placeholder="Message..."></textarea>
            <button className="w-full bg-primary text-white font-bold py-3 rounded hover:bg-purple-800">SUBMIT</button>
          </form>
        </div>
        <div className="space-y-6">
          <div className="flex items-start gap-4 bg-white p-6 rounded-lg shadow">
            <Mail className="text-primary" />
            <div>
              <h3 className="font-bold">Email</h3>
              <p className="text-sm">support@smartpropertyfinder.lk</p>
            </div>
          </div>
          <div className="flex items-start gap-4 bg-white p-6 rounded-lg shadow">
            <Phone className="text-primary" />
            <div>
              <h3 className="font-bold">Phone</h3>
              <p className="text-sm">+94 71 654 3287</p>
            </div>
          </div>
          <div className="flex items-start gap-4 bg-white p-6 rounded-lg shadow">
            <MapPin className="text-primary" />
            <div>
              <h3 className="font-bold">Address</h3>
              <p className="text-sm">Colombo 03, Sri Lanka</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;