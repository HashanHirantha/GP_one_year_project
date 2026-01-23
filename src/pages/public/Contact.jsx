import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Navbar />

      {/* Header Section */}
      <div className="relative bg-gradient-to-br from-primary via-gray-700 to-secondary text-white pt-32 pb-16 text-center px-4 overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-blob"></div>
          <div className="absolute top-[20%] right-[-10%] w-96 h-96 bg-accent rounded-full mix-blend-overlay filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-[-20%] left-[20%] w-96 h-96 bg-secondary rounded-full mix-blend-overlay filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, scale: 0.5, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl md:text-5xl font-bold mb-4 tracking-tight leading-tight"
          >
            Get In Touch
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="opacity-90 text-gray-200 text-lg max-w-2xl mx-auto"
          >
            Have questions? We'd love to hear from you. Send us a message!
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">

          {/* Contact Form */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Send Us A Message</h2>
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Name *</label>
                <input type="text" placeholder="Your name" className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-gray-300 outline-none transition" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Email *</label>
                <input type="email" placeholder="your.email@example.com" className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-gray-300 outline-none transition" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Subject *</label>
                <input type="text" placeholder="Subject" className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-gray-300 outline-none transition" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Message *</label>
                <textarea rows="5" placeholder="Write your message here..." className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-gray-300 outline-none transition"></textarea>
              </div>

              {/* Mock Captcha */}
              <div className="bg-gray-100 p-4 rounded-xl flex items-center justify-center gap-4 text-2xl font-mono text-gray-500 tracking-[0.5em] select-none">
                <s>8</s> K <s>N</s> A
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Enter Captcha *</label>
                <input type="text" placeholder="Enter the characters above" className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-gray-300 outline-none transition" />
              </div>

              <button className="w-full bg-[#00FF00] hover:bg-white text-black font-bold py-4 rounded-full transition shadow-lg shadow-black/20 hover:shadow-xl active:scale-95 uppercase tracking-wide transform hover:-translate-y-0.5">
                Submit Form
              </button>
            </form>
          </div>

          {/* Contact Information & Map */}
          <div className="space-y-6">
            {/* Info Cards */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-start gap-4">
              <div className="bg-orange-50 p-3 rounded-full text-orange-500">
                <Mail size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg mb-1">Email Address</h3>
                <p className="text-gray-500 text-sm">propertyfinding@gmail.com</p>
                <p className="text-gray-500 text-sm">support@smartpropertyfinder.lk</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-start gap-4">
              <div className="bg-blue-50 p-3 rounded-full text-blue-500">
                <Phone size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg mb-1">Phone Number</h3>
                <p className="text-gray-500 text-sm">+94 11 234 5678</p>
                <p className="text-gray-500 text-sm">+94 77 123 4567</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-start gap-4">
              <div className="bg-red-50 p-3 rounded-full text-red-500">
                <MapPin size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg mb-1">Office Address</h3>
                <p className="text-gray-500 text-sm">123 Main Street,</p>
                <p className="text-gray-500 text-sm">Colombo 03, Sri Lanka</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-start gap-4">
              <div className="bg-pink-50 p-3 rounded-full text-pink-500">
                <Clock size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg mb-1">Working Hours</h3>
                <p className="text-gray-500 text-sm">Monday - Friday: 9:00 a.m - 6:00 p.m.</p>
                <p className="text-gray-500 text-sm">Saturday: 10:00 a.m - 4:00 p.m.</p>
                <p className="text-gray-500 text-sm">Sunday: Closed</p>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 mb-20 text-center">
          <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center justify-center gap-2">
            <MapPin className="text-red-500" size={20} /> Find Us On Map
          </h3>
          <div className="bg-purple-100 h-80 rounded-2xl w-full overflow-hidden relative">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15843.19446450849!2d79.85044455!3d6.91470765!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae259695d862957%3A0xe53b2655bfd28362!2sColombo%2003%2C%20Colombo!5e0!3m2!1sen!2slk!4v1700000000000!5m2!1sen!2slk"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center bg-purple-900/10">
              {/* Overlay to ensure map style consistency if needed */}
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">Frequently Asked Questions</h2>

          <div className="space-y-4">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-left">
              <h3 className="font-bold text-gray-900 flex items-center gap-3 mb-2">
                <span className="text-red-500 text-xl font-black">?</span> How do I list my property?
              </h3>
              <p className="text-gray-600 text-sm ml-8">Simply sign up as a property owner, complete your profile, and use the "Add Property" feature from your dashboard. You can upload photos, videos, and all necessary documents.</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-left">
              <h3 className="font-bold text-gray-900 flex items-center gap-3 mb-2">
                <span className="text-red-500 text-xl font-black">?</span> Is there a fee to use the platform?
              </h3>
              <p className="text-gray-600 text-sm ml-8">Browsing and searching properties is completely free. Property owners may have subscription plans for premium features. A small service fee applies for online payments.</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-left">
              <h3 className="font-bold text-gray-900 flex items-center gap-3 mb-2">
                <span className="text-red-500 text-xl font-black">?</span> How do I contact property owners?
              </h3>
              <p className="text-gray-600 text-sm ml-8">Once you create an account, you can use our secure messaging system to directly contact property owners or schedule viewings.</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-left">
              <h3 className="font-bold text-gray-900 flex items-center gap-3 mb-2">
                <span className="text-red-500 text-xl font-black">?</span> Are all properties verified?
              </h3>
              <p className="text-gray-600 text-sm ml-8">Yes, we verify all property listings and owner credentials to ensure authenticity and protect our users from fraud.</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-left">
              <h3 className="font-bold text-gray-900 flex items-center gap-3 mb-2">
                <span className="text-red-500 text-xl font-black">?</span> How quickly will I get a response?
              </h3>
              <p className="text-gray-600 text-sm ml-8">Our support team typically responds within 24 hours on business days. For urgent matters, please call our hotline.</p>
            </div>
          </div>
        </div>

      </div>
      <Footer />
    </div>
  );
};

export default Contact;