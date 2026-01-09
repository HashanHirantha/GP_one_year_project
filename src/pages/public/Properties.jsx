import React from 'react';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import PropertyCard from '../../components/ui/PropertyCard';
import { Filter } from 'lucide-react';

const Properties = () => {
  return (
    <div className="flex flex-col min-h-screen bg-cream">

      <Navbar />
      <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-6">
        <aside className="w-full md:w-1/4 bg-white p-6 rounded-xl shadow h-fit">

          <h3 className="font-bold text-darkgreen border-b pb-2 mb-4 flex items-center gap-2">

            <Filter size={18}/> Filter Properties
          </h3>
          <div className="space-y-4 text-sm">
            <label className="flex items-center gap-2"><input type="checkbox"/> Apartment</label>
            <label className="flex items-center gap-2"><input type="checkbox"/> House</label>
            <label className="flex items-center gap-2"><input type="checkbox"/> Villa</label>
            <button className="w-full bg-darkgreen text-white py-2 rounded mt-4 hover:bg-sage transition">
            Apply Filters</button>
          </div>
        </aside>

        <main className="w-full md:w-3/4 grid grid-cols-1 md:grid-cols-2 gap-6">
          <PropertyCard title="High-Floor Altair" price="Rs. 145M" location="Colombo 2" type="Apartment" isFeatured={true} />
          <PropertyCard title="Luxury Villa" price="Rs. 200M" location="Nugegoda" type="Villa" />
          <PropertyCard title="City Apartment" price="Rs. 62.5M" location="Colombo 2" type="Apartment" />
          <PropertyCard title="Student Boarding" price="Rs. 15K/mo" location="Maharagama" type="Boarding" />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Properties;