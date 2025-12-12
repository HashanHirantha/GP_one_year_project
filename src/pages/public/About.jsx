import React from 'react';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import { Target, Users, Award } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="bg-primary py-16 text-center text-white">
        <h1 className="text-4xl font-bold mb-4">About Smart Property Finder</h1>
        <p className="max-w-2xl mx-auto opacity-90">Making property searching, buying, and selling easy, secure, and transparent.</p>
      </div>
      <div className="container mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-primary">
          <div className="flex justify-center mb-4 text-secondary"><Target size={40} /></div>
          <h3 className="font-bold text-xl mb-2 text-purple-900">Our Mission</h3>
          <p className="text-sm text-gray-500">To connect property seekers with their ideal homes efficiently.</p>
        </div>
        <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-primary">
          <div className="flex justify-center mb-4 text-secondary"><Users size={40} /></div>
          <h3 className="font-bold text-xl mb-2 text-purple-900">Our Vision</h3>
          <p className="text-sm text-gray-500">To be the leading property finding platform in Sri Lanka.</p>
        </div>
        <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-primary">
          <div className="flex justify-center mb-4 text-secondary"><Award size={40} /></div>
          <h3 className="font-bold text-xl mb-2 text-purple-900">Our Values</h3>
          <p className="text-sm text-gray-500">Trust, transparency, innovation, and customer satisfaction.</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;