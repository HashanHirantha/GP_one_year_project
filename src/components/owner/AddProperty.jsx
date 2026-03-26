import React, { useState } from 'react';
import { Home, Upload, Plus, Loader } from 'lucide-react';
import { supabase } from '../../config/supabase';
import { useAuth } from '../../context/AuthContext';

const AddProperty = () => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ text: '', type: '' });
    const [images, setImages] = useState([]);
    
    const [formData, setFormData] = useState({
        title: '',
        property_type: '',
        location: '',
        state: '',
        zip_code: '',
        bedrooms: '',
        bathrooms: '',
        area_sqft: '',
        price: '',
        description: '',
        contact_number: '',
        max_guests: '',
        map_url: '',
        is_available: true
    });

    const handleChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({ ...formData, [e.target.name]: value });
    };

    const handleImageChange = (e) => {
        if (e.target.files) {
            const fileArray = Array.from(e.target.files).slice(0, 5); // Limit to 5 images
            setImages(fileArray);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage({ text: '', type: '' });
        
        if (!user) {
            setMessage({ text: 'You must be logged in to add a property.', type: 'error' });
            return;
        }

        try {
            setLoading(true);
            
            // Clean up price (remove non-digits if user typed 'Rs.', etc.)
            let priceValue = parseFloat(formData.price.replace(/[^0-9.]/g, ''));
            if (isNaN(priceValue)) priceValue = 0;
            
            // Parse iframe map_url if provided
            let finalMapUrl = formData.map_url;
            if (finalMapUrl) {
                const srcMatch = finalMapUrl.match(/src="([^"]+)"/);
                if (srcMatch && srcMatch[1]) {
                    finalMapUrl = srcMatch[1];
                }
            }
            
            const { data, error } = await supabase
                .from('properties')
                .insert([
                    {
                        seller_id: user.id,
                        title: formData.title,
                        property_type: formData.property_type,
                        city: formData.location,
                        address: formData.location,
                        state: formData.state,
                        zip_code: formData.zip_code,
                        bedrooms: parseInt(formData.bedrooms) || null,
                        bathrooms: parseInt(formData.bathrooms) || null,
                        area_sqft: parseFloat(formData.area_sqft) || null,
                        max_guests: parseInt(formData.max_guests) || null,
                        price: priceValue,
                        description: formData.description,
                        contact_number: formData.contact_number,
                        map_url: finalMapUrl,
                        is_available: formData.is_available,
                        status: 'active'
                    }
                ])
                .select();

            if (error) throw error;
            
            const newPropertyId = data[0].id;

            let imageUploadError = null;

            // Upload images to Supabase Storage bucket 'property-images'
            if (images.length > 0) {
                for (let i = 0; i < images.length; i++) {
                    const file = images[i];
                    const fileExt = file.name.split('.').pop();
                    const fileName = `${newPropertyId}-${Math.random().toString(36).substring(7)}.${fileExt}`;
                    const filePath = `properties/${fileName}`;
                    
                    const { error: uploadError } = await supabase.storage
                        .from('property-images')
                        .upload(filePath, file);

                    if (uploadError) {
                        console.error('Image upload failed:', uploadError.message);
                        imageUploadError = uploadError.message;
                        continue; // skip this image if it fails
                    }
                    
                    const { data: publicUrlData } = supabase.storage
                        .from('property-images')
                        .getPublicUrl(filePath);

                    // Insert image record into database
                    const { error: dbImageError } = await supabase.from('property_images').insert([
                        {
                            property_id: newPropertyId,
                            image_url: publicUrlData.publicUrl,
                            is_primary: i === 0 // First image is primary
                        }
                    ]);
                    
                    if (dbImageError) {
                        console.error('Image database insert failed:', dbImageError.message);
                        imageUploadError = dbImageError.message;
                    }
                }
            }
            
            if (imageUploadError) {
               setMessage({ text: `Property saved, but images failed to upload: ${imageUploadError}`, type: 'error' });
            } else {
               setMessage({ text: 'Property and images added successfully!', type: 'success' });
            }
            
            setFormData({ title: '', property_type: '', location: '', state: '', zip_code: '', bedrooms: '', bathrooms: '', area_sqft: '', price: '', description: '', contact_number: '', max_guests: '', map_url: '', is_available: true });
            setImages([]);
            
        } catch (error) {
            console.error('Error adding property:', error);
            setMessage({ text: error.message || 'Failed to add property', type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8 border-t-4 border-purple-800">
            <div className="flex items-center gap-2 mb-6">
                <Home className="text-purple-600 w-6 h-6" />
                <h3 className="text-lg font-bold text-purple-900">Add new Property</h3>
            </div>

            {message.text && (
                <div className={`p-4 mb-4 rounded-lg text-sm font-medium ${message.type === 'error' ? 'bg-red-50 text-red-600 border border-red-200' : 'bg-green-50 text-green-600 border border-green-200'}`}>
                    {message.text}
                </div>
            )}

            <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Property name *</label>
                    <input type="text" name="title" value={formData.title} onChange={handleChange} required placeholder="e.g. Luxury Villa" className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-1 focus:ring-purple-500 outline-none" />
                </div>
                <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Property type *</label>
                    <select name="property_type" value={formData.property_type} onChange={handleChange} required className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-1 focus:ring-purple-500 outline-none bg-white">
                        <option value="" disabled>Select property type</option>
                        <option value="apartment">Apartment</option>
                        <option value="house">House</option>
                        <option value="villa">Villa</option>
                        <option value="land">Land</option>
                        <option value="boarding">Boarding</option>
                    </select>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">Location / City *</label>
                        <input type="text" name="location" value={formData.location} onChange={handleChange} required placeholder="Colombo 03" className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-1 focus:ring-purple-500 outline-none" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">State / Province</label>
                        <input type="text" name="state" value={formData.state} onChange={handleChange} placeholder="Western Province" className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-1 focus:ring-purple-500 outline-none" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">Zip Code</label>
                        <input type="text" name="zip_code" value={formData.zip_code} onChange={handleChange} placeholder="00300" className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-1 focus:ring-purple-500 outline-none" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">Price (Rs.) *</label>
                        <input type="text" name="price" value={formData.price} onChange={handleChange} required placeholder="10500000" className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-1 focus:ring-purple-500 outline-none" />
                    </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">Bedrooms</label>
                        <input type="number" min="0" name="bedrooms" value={formData.bedrooms} onChange={handleChange} placeholder="3" className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-1 focus:ring-purple-500 outline-none" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">Bathrooms</label>
                        <input type="number" min="0" name="bathrooms" value={formData.bathrooms} onChange={handleChange} placeholder="2" className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-1 focus:ring-purple-500 outline-none" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">Area (sqft)</label>
                        <input type="number" min="0" name="area_sqft" value={formData.area_sqft} onChange={handleChange} placeholder="1200" className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-1 focus:ring-purple-500 outline-none" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">Max Guests</label>
                        <input type="number" min="0" name="max_guests" value={formData.max_guests} onChange={handleChange} placeholder="5" className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-1 focus:ring-purple-500 outline-none" />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">Contact Number</label>
                        <input type="text" name="contact_number" value={formData.contact_number} onChange={handleChange} placeholder="+94 77 123 4567" className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-1 focus:ring-purple-500 outline-none" />
                    </div>
                    <div className="flex items-center mt-6">
                        <input type="checkbox" id="is_available" name="is_available" checked={formData.is_available} onChange={handleChange} className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500" />
                        <label htmlFor="is_available" className="ml-2 text-sm font-bold text-gray-700 cursor-pointer">Property is Available</label>
                    </div>
                </div>
                <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Description</label>
                    <textarea name="description" value={formData.description} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2 text-sm h-24 focus:ring-1 focus:ring-purple-500 outline-none" placeholder="Describe your property..."></textarea>
                </div>

                <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Google Maps Embed URL (Optional)</label>
                    <input type="text" name="map_url" value={formData.map_url} onChange={handleChange} placeholder='Paste the "src" link or full <iframe> code here' className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-1 focus:ring-purple-500 outline-none" />
                </div>

                <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Upload Images (Max 5)</label>
                    <label className="border-2 border-dashed border-gray-300 rounded-md h-32 flex flex-col items-center justify-center text-gray-400 cursor-pointer hover:bg-gray-50 transition relative overflow-hidden">
                        <input type="file" multiple accept="image/*" onChange={handleImageChange} className="hidden" />
                        <Plus size={24} className="mb-1 text-purple-600" />
                        <span className="text-xs text-center leading-tight">Click to upload<br />PNG, JPG or GIF<br />(max. 5MB)</span>
                        
                        {images.length > 0 && (
                            <div className="absolute inset-0 bg-white bg-opacity-95 flex items-center justify-center flex-wrap gap-2 p-2 pointer-events-none">
                                {images.map((img, idx) => (
                                    <div key={idx} className="text-xs bg-purple-100 text-purple-900 px-2 py-1 rounded truncate max-w-[80px]">
                                        {img.name}
                                    </div>
                                ))}
                                <div className="w-full text-center text-xs font-bold text-green-600 mt-1">{images.length} file(s) selected</div>
                            </div>
                        )}
                    </label>
                    <p className="text-xs text-gray-400 mt-1 italic">Note: Ensure a public storage bucket named 'property-images' is created in your Supabase dashboard.</p>
                </div>

                <div className="flex gap-4 pt-2">
                    <button type="submit" disabled={loading} className="bg-secondary text-white text-sm px-6 py-2 rounded-lg hover:bg-purple-600 transition font-bold shadow-md flex items-center justify-center min-w-[140px]">
                        {loading ? <Loader size={16} className="animate-spin" /> : 'Add property'}
                    </button>
                    <button type="button" onClick={() => { setFormData({ title: '', property_type: '', location: '', state: '', zip_code: '', bedrooms: '', bathrooms: '', area_sqft: '', price: '', description: '', contact_number: '', max_guests: '', map_url: '', is_available: true }); setImages([]); }} className="bg-gray-400 text-white text-sm px-6 py-2 rounded-lg hover:bg-gray-500 transition font-bold shadow-md">Clear</button>
                </div>
            </form>
        </div>
    );
};

export default AddProperty;
