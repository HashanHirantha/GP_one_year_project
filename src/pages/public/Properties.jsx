import React, { useState, useEffect } from 'react';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import PropertyCard from '../../components/ui/PropertyCard';
import { Filter } from 'lucide-react';
import { properties } from '../../data/properties';

const Properties = () => {
  const [activeFilters, setActiveFilters] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState(properties);

  const filterTypes = ['Apartment', 'House', 'Villa', 'Boarding'];

  const handleFilterChange = (type) => {
    setActiveFilters((prev) =>
      prev.includes(type)
        ? prev.filter((t) => t !== type)
        : [...prev, type]
    );
  };

  useEffect(() => {
    if (activeFilters.length === 0) {
      setFilteredProperties(properties);
    } else {
      setFilteredProperties(
        properties.filter((p) => activeFilters.includes(p.type))
      );
    }
  }, [activeFilters]);

  return (
    <div className="flex flex-col min-h-screen bg-cream">
      <Navbar />

      <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <aside className="w-full md:w-1/4 bg-white p-6 rounded-xl shadow h-fit">
          <h3 className="font-bold text-darkgreen border-b pb-2 mb-4 flex items-center gap-2">
            <Filter size={18} /> Filter Properties
          </h3>

          <div className="space-y-4 text-sm">
            {filterTypes.map((type) => (
              <label
                key={type}
                className="flex items-center gap-2 cursor-pointer hover:text-sage transition"
              >
                <input
                  type="checkbox"
                  checked={activeFilters.includes(type)}
                  onChange={() => handleFilterChange(type)}
                  className="accent-darkgreen"
                />
                {type}
              </label>
            ))}

            <button
              onClick={() => setActiveFilters([])}
              className="w-full bg-gray-100 text-gray-600 py-2 rounded mt-4 hover:bg-gray-200 transition text-xs"
            >
              Clear Filters
            </button>
          </div>
        </aside>

        {/* Property Grid */}
        <main className="w-full md:w-3/4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredProperties.length > 0 ? (
              filteredProperties.map((property) => (
                <PropertyCard key={property.id} {...property} />
              ))
            ) : (
              <div className="col-span-2 text-center py-12 text-gray-500">
                <p>No properties found matching your criteria.</p>
                <button
                  onClick={() => setActiveFilters([])}
                  className="mt-2 text-darkgreen font-bold hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default Properties;
