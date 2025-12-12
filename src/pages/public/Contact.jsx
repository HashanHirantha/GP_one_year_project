import React from 'react';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import { Mail, Phone, MapPin } from 'lucide-react';

const Contact = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold text-purple-900 mb-6">Send Us A Message</h2>
          <form className="space-y-4">
            <input type="text" className="w-full border p-2 rounded" placeholder="Your Name"/>
            <input type="email" className="w-full border p-2 rounded" placeholder="your@email.com"/>
            <textarea className="w-full border p-2 rounded h-32" placeholder="Message..."></textarea>
            <button className="w-full bg-primary text-white font-bold py-3 rounded hover:bg-purple-800">SUBMIT</button>
          </form>
        </div>
        <div className="space-y-6">
           <div className="flex items-start gap-4 bg-white p-6 rounded-lg shadow">
             <Mail className="text-primary"/>
             <div>
               <h3 className="font-bold">Email</h3>
               <p className="text-sm">support@smartpropertyfinder.lk</p>
             </div>
           </div>
           <div className="flex items-start gap-4 bg-white p-6 rounded-lg shadow">
             <Phone className="text-primary"/>
             <div>
               <h3 className="font-bold">Phone</h3>
               <p className="text-sm">+94 71 654 3287</p>
             </div>
           </div>
           <div className="flex items-start gap-4 bg-white p-6 rounded-lg shadow">
             <MapPin className="text-primary"/>
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