import React, { useState, useEffect } from 'react';
import { Home, Save, Loader, Plus, Trash2 } from 'lucide-react';
import { supabase } from '../../config/supabase';
import { useAuth } from '../../context/AuthContext';
import { useParams, useNavigate } from 'react-router-dom';

const EditProperty = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user, role } = useAuth();
    const BOT_URL = import.meta.env.VITE_BOT_SERVER_URL || 'http://localhost:3001';
    
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [message, setMessage] = useState({ text: '', type: '' });
    const [images, setImages] = useState([]);
    const [existingImages, setExistingImages] = useState([]);
    const [originalPrice, setOriginalPrice] = useState(0);
    const [whatsappNotifications, setWhatsappNotifications] = useState([]);
    
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

    useEffect(() => {
        if (id && user) {
            fetchProperty();
        }
    }, [id, user]);

    const fetchProperty = async () => {
        try {
            const { data, error } = await supabase
                .from('properties')
                .select('*, property_images(id, image_url, is_primary)')
                .eq('id', id)
                .single();

            if (error) throw error;
            
            if (data.property_images) {
                setExistingImages(data.property_images);
            }
            
            // Check possession if not admin
            if (role !== 'admin' && data.seller_id !== user.id) {
                setMessage({ text: 'You do not have permission to edit this property.', type: 'error' });
                setFetching(false);
                return;
            }

            setOriginalPrice(data.price || 0);

            setFormData({
                title: data.title || '',
                property_type: data.property_type || '',
                location: data.city || data.address || '',
                state: data.state || '',
                zip_code: data.zip_code || '',
                bedrooms: data.bedrooms || '',
                bathrooms: data.bathrooms || '',
                area_sqft: data.area_sqft || '',
                price: data.price || '',
                description: data.description || '',
                contact_number: data.contact_number || '',
                max_guests: data.max_guests || '',
                map_url: data.map_url || '',
                is_available: data.is_available ?? true
            });

        } catch (error) {
            console.error('Error fetching property:', error);
            setMessage({ text: 'Error loading property details.', type: 'error' });
        } finally {
            setFetching(false);
        }
    };

    const handleChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({ ...formData, [e.target.name]: value });
    };

    const handleImageChange = (e) => {
        if (e.target.files) {
            const fileArray = Array.from(e.target.files).slice(0, 5);
            setImages(fileArray);
        }
    };

    const handleDeleteExistingImage = async (imageId, imageUrl) => {
        if (!window.confirm("Are you sure you want to delete this image?")) return;
        try {
            // Delete from database
            await supabase.from('property_images').delete().eq('id', imageId);
            
            // Delete from storage
            const fileName = imageUrl.split('/').pop();
            await supabase.storage.from('property-images').remove([`properties/${fileName}`]);
            
            setExistingImages(prev => prev.filter(img => img.id !== imageId));
        } catch (err) {
            console.error("Failed to delete image", err);
            setMessage({ text: "Failed to delete image.", type: 'error' });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage({ text: '', type: '' });
        
        try {
            setLoading(true);
            
            let priceValue = parseFloat(formData.price.toString().replace(/[^0-9.]/g, ''));
            if (isNaN(priceValue)) priceValue = 0;
            
            let finalMapUrl = formData.map_url;
            if (finalMapUrl) {
                const srcMatch = finalMapUrl.match(/src="([^"]+)"/);
                if (srcMatch && srcMatch[1]) {
                    finalMapUrl = srcMatch[1];
                }
            }
            
            const { error } = await supabase
                .from('properties')
                .update({
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
                })
                .eq('id', id);

            if (error) throw error;

            let imageUploadError = null;

            // Upload appended images to Supabase Storage bucket 'property-images'
            if (images.length > 0) {
                for (let i = 0; i < images.length; i++) {
                    const file = images[i];
                    const fileExt = file.name.split('.').pop();
                    const fileName = `${id}-${Math.random().toString(36).substring(7)}.${fileExt}`;
                    const filePath = `properties/${fileName}`;
                    
                    const { error: uploadError } = await supabase.storage
                        .from('property-images')
                        .upload(filePath, file);

                    if (uploadError) {
                        console.error('Image upload failed:', uploadError.message);
                        imageUploadError = uploadError.message;
                        continue;
                    }
                    
                    const { data: publicUrlData } = supabase.storage
                        .from('property-images')
                        .getPublicUrl(filePath);

                    // Insert appended image record into database
                    const { error: dbImageError } = await supabase.from('property_images').insert([
                        {
                            property_id: id,
                            image_url: publicUrlData.publicUrl,
                            is_primary: existingImages.length === 0 && i === 0 // Make primary only if there are no existing images
                        }
                    ]);
                    
                    if (dbImageError) {
                        console.error('Image database insert failed:', dbImageError.message);
                        imageUploadError = dbImageError.message;
                    }
                }
            }
            
            if (imageUploadError) {
                setMessage({ text: `Property updated, but new images failed to upload: ${imageUploadError}`, type: 'error' });
            } else {
                let successMsg = 'Property updated successfully!';
                
                // Check for price changes and send alerts
                if (priceValue !== originalPrice && priceValue > 0 && originalPrice > 0) {
                    const isDrop = priceValue < originalPrice;
                    const alertTitle = isDrop ? 'Price Drop Alert!' : 'Price Increase Alert!';
                    const alertMessage = isDrop 
                        ? `The price of "${formData.title}" has dropped to Rs. ${priceValue}.`
                        : `The price of "${formData.title}" has increased to Rs. ${priceValue}.`;
                    const whatsappMessage = isDrop
                        ? `Price Drop Alert! ${formData.title} dropped to Rs. ${priceValue}.`
                        : `Price Increase Alert! ${formData.title} increased to Rs. ${priceValue}.`;

                    // Create in-app notifications for users who favorited this property
                    try {
                        let favoriteUsers = [];
                        const { data: favs, error: favsError } = await supabase
                            .from('favorites')
                            .select('user_id')
                            .eq('property_id', id);
                        
                        if (!favsError && favs) {
                            favoriteUsers = favs.map(f => f.user_id);
                        }

                        if (favoriteUsers.length > 0) {
                            const notificationsToInsert = favoriteUsers.map(userId => ({
                                user_id: userId,
                                property_id: id,
                                title: alertTitle,
                                message: alertMessage,
                                is_read: false
                            }));
                            await supabase.from('notifications').insert(notificationsToInsert);
                        }
                    } catch (e) {
                        console.warn("Supabase notifications error (table may not exist), using fallback:", e);
                    }

                    // LocalStorage mock notifications fallback
                    try {
                        const localNotifications = JSON.parse(localStorage.getItem('mock_notifications') || '[]');
                        localNotifications.push({
                            id: Math.random().toString(),
                            property_id: id,
                            title: alertTitle,
                            message: alertMessage,
                            is_read: false,
                            created_at: new Date().toISOString()
                        });
                        localStorage.setItem('mock_notifications', JSON.stringify(localNotifications));
                    } catch (e) {
                        console.error("Local notifications fallback error:", e);
                    }

                    try {
                        let alertsList = [];
                        
                        // 1. Try backend API first (supports unified local file + database storage)
                        try {
                            const response = await fetch(`${BOT_URL}/api/price-alerts/${id}`);
                            const result = await response.json();
                            if (result.success) {
                                alertsList = result.alerts;
                            }
                        } catch (apiErr) {
                            console.warn("Failed to fetch price alerts from backend API, trying direct Supabase:", apiErr);
                        }

                        // 2. Direct Supabase fallback
                        if (alertsList.length === 0) {
                            const { data: alerts, error } = await supabase
                                .from('price_alerts')
                                .select('phone_number')
                                .eq('property_id', id);

                            if (!error && alerts) {
                                alertsList = alerts.map(a => a.phone_number);
                            }
                        }

                        // 3. LocalStorage fallback
                        if (alertsList.length === 0) {
                            const localAlerts = JSON.parse(localStorage.getItem('mock_price_alerts') || '[]');
                            alertsList = localAlerts.filter(a => a.property_id === id).map(a => a.phone_number);
                        }

                        if (alertsList.length > 0) {
                            const initialNotifications = alertsList.map(phone => ({
                                id: Math.random(),
                                phone: phone,
                                message: whatsappMessage,
                                status: 'sending',
                                errorMsg: ''
                            }));
                            setWhatsappNotifications(initialNotifications);

                            let sentCount = 0;
                            let failCount = 0;

                            for (const notification of initialNotifications) {
                                try {
                                    const response = await fetch(`${BOT_URL}/api/send-sms`, {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json'
                                        },
                                        body: JSON.stringify({
                                            to: notification.phone,
                                            message: notification.message
                                        })
                                    });

                                    if (!response.ok) {
                                        const errorData = await response.json();
                                        throw new Error(errorData.error || 'Server returned an error');
                                    }

                                    const result = await response.json();
                                    if (result.success) {
                                        sentCount++;
                                        setWhatsappNotifications(prev =>
                                            prev.map(item => item.id === notification.id ? { ...item, status: 'success' } : item)
                                        );
                                    } else {
                                        throw new Error(result.error || 'Unknown error');
                                    }
                                } catch (e) {
                                    failCount++;
                                    console.error("WhatsApp sending error:", e);
                                    setWhatsappNotifications(prev =>
                                        prev.map(item => item.id === notification.id ? { ...item, status: 'failed', errorMsg: e.message } : item)
                                    );
                                }
                            }

                            if (sentCount > 0) {
                                successMsg += ` WhatsApp alerts sent to ${sentCount} subscribers!`;
                            }
                            if (failCount > 0) {
                                successMsg += ` Failed to send WhatsApp to ${failCount} subscribers. Check error details.`;
                            }
                        }
                    } catch (err) {
                        console.error("Alert error", err);
                    }
                }

                setMessage({ text: successMsg, type: 'success' });
                setTimeout(() => {
                    navigate(-1); // Go back to the list
                }, 8000); // give time to read success/error messages
            }

        } catch (error) {
            console.error('Error updating property:', error);
            setMessage({ text: error.message || 'Failed to update property', type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    if (fetching) return <div className="p-8 text-center text-gray-500">Loading property data...</div>;

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8 border-t-4 border-green-800">
            <div className="flex items-center gap-2 mb-6">
                <Home className="text-green-600 w-6 h-6" />
                <h3 className="text-lg font-bold text-green-900">Edit Property</h3>
            </div>

            {message.text && (
                <div className={`p-4 mb-4 rounded-lg text-sm font-medium ${message.type === 'error' ? 'bg-red-50 text-red-600 border border-red-200' : 'bg-green-50 text-green-600 border border-green-200'}`}>
                    {message.text}
                </div>
            )}

            {!message.text || message.type !== 'error' ? (
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">Property name *</label>
                        <input type="text" name="title" value={formData.title} onChange={handleChange} required className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-1 focus:ring-green-500 outline-none" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">Property type *</label>
                        <select name="property_type" value={formData.property_type} onChange={handleChange} required className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-1 focus:ring-green-500 outline-none bg-white">
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
                            <input type="text" name="location" value={formData.location} onChange={handleChange} required className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-1 focus:ring-green-500 outline-none" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-700 mb-1">State / Province</label>
                            <input type="text" name="state" value={formData.state} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-1 focus:ring-green-500 outline-none" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-700 mb-1">Zip Code</label>
                            <input type="text" name="zip_code" value={formData.zip_code} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-1 focus:ring-green-500 outline-none" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-700 mb-1">Price (Rs.) *</label>
                            <input type="text" name="price" value={formData.price} onChange={handleChange} required className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-1 focus:ring-green-500 outline-none" />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-700 mb-1">Bedrooms</label>
                            <input type="number" min="0" name="bedrooms" value={formData.bedrooms} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-1 focus:ring-green-500 outline-none" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-700 mb-1">Bathrooms</label>
                            <input type="number" min="0" name="bathrooms" value={formData.bathrooms} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-1 focus:ring-green-500 outline-none" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-700 mb-1">Area (sqft)</label>
                            <input type="number" min="0" name="area_sqft" value={formData.area_sqft} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-1 focus:ring-green-500 outline-none" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-700 mb-1">Max Guests</label>
                            <input type="number" min="0" name="max_guests" value={formData.max_guests} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-1 focus:ring-green-500 outline-none" />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-700 mb-1">Contact Number</label>
                            <input type="text" name="contact_number" value={formData.contact_number} onChange={handleChange} placeholder="+94 77 123 4567" className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-1 focus:ring-green-500 outline-none" />
                        </div>
                        <div className="flex items-center mt-6">
                            <input type="checkbox" id="is_available" name="is_available" checked={formData.is_available} onChange={handleChange} className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500" />
                            <label htmlFor="is_available" className="ml-2 text-sm font-bold text-gray-700 cursor-pointer">Property is Available</label>
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">Description</label>
                        <textarea name="description" value={formData.description} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2 text-sm h-24 focus:ring-1 focus:ring-green-500 outline-none"></textarea>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">Google Maps Embed URL (Optional)</label>
                        <input type="text" name="map_url" value={formData.map_url || ''} onChange={handleChange} placeholder='Paste the "src" link or full <iframe> code here' className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-1 focus:ring-green-500 outline-none" />
                    </div>

                    {/* Existing Images */}
                    {existingImages.length > 0 && (
                        <div>
                            <label className="block text-xs font-bold text-gray-700 mb-2">Existing Images</label>
                            <div className="flex gap-4 overflow-x-auto pb-2">
                                {existingImages.map(img => (
                                    <div key={img.id} className="relative w-24 h-24 flex-shrink-0 border rounded-lg overflow-hidden group">
                                        <img src={img.image_url} alt="property" className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                                            <button type="button" onClick={() => handleDeleteExistingImage(img.id, img.image_url)} className="text-white hover:text-red-400 p-1">
                                                <Trash2 size={20} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Upload New Images */}
                    <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">Upload Additional Images (Max 5)</label>
                        <label className="border-2 border-dashed border-gray-300 rounded-md h-32 flex flex-col items-center justify-center text-gray-400 cursor-pointer hover:bg-gray-50 transition relative overflow-hidden">
                            <input type="file" multiple accept="image/*" onChange={handleImageChange} className="hidden" />
                            <Plus size={24} className="mb-1 text-green-600" />
                            <span className="text-xs text-center leading-tight">Click to upload<br />PNG, JPG or GIF</span>
                            
                            {images.length > 0 && (
                                <div className="absolute inset-0 bg-white bg-opacity-95 flex items-center justify-center flex-wrap gap-2 p-2 pointer-events-none">
                                    {images.map((img, idx) => (
                                        <div key={idx} className="text-xs bg-green-100 text-green-900 px-2 py-1 rounded truncate max-w-[80px]">
                                            {img.name}
                                        </div>
                                    ))}
                                    <div className="w-full text-center text-xs font-bold text-green-600 mt-1">{images.length} new file(s)</div>
                                </div>
                            )}
                        </label>
                    </div>

                    <div className="flex gap-4 pt-4">
                        <button type="submit" disabled={loading} className="bg-secondary text-white text-sm px-6 py-2 rounded-lg hover:bg-green-600 transition font-bold shadow-md flex items-center justify-center min-w-[140px]">
                            {loading ? <Loader size={16} className="animate-spin" /> : <><Save size={16} className="mr-2" /> Save Changes</>}
                        </button>
                        <button type="button" onClick={() => navigate(-1)} className="bg-gray-400 text-white text-sm px-6 py-2 rounded-lg hover:bg-gray-500 transition font-bold shadow-md">Cancel</button>
                    </div>
                </form>
            ) : null}

            {/* Simulated WhatsApp Notifications UI */}
            {whatsappNotifications.length > 0 && (
                <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-3">
                    {whatsappNotifications.map((sms) => (
                        <div key={sms.id} className={`bg-white border-2 rounded-2xl shadow-2xl p-4 w-80 transform transition-all ${
                            sms.status === 'sending' ? 'border-yellow-400 animate-pulse' :
                            sms.status === 'success' ? 'border-green-500 animate-bounce' : 'border-red-500'
                        }`}>
                            <div className="flex items-center gap-2 mb-2 border-b pb-2">
                                <div className={`p-1.5 rounded-full ${
                                    sms.status === 'sending' ? 'bg-yellow-100 text-yellow-600' :
                                    sms.status === 'success' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                                }`}>
                                    {sms.status === 'sending' ? (
                                        <Loader size={14} className="animate-spin" />
                                    ) : sms.status === 'success' ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
                                    )}
                                </div>
                                <div className="font-bold text-gray-800 text-sm">
                                    {sms.status === 'sending' ? 'Sending WhatsApp...' :
                                     sms.status === 'success' ? 'WhatsApp Sent Successfully' : 'WhatsApp Delivery Failed'}
                                </div>
                                <div className="text-xs text-gray-400 ml-auto">Just now</div>
                            </div>
                            <div className="text-xs font-bold text-gray-500 mb-1">To: {sms.phone}</div>
                            <div className="bg-gray-100 rounded-lg p-3 text-sm text-gray-800 relative">
                                {sms.message}
                                <div className="absolute -left-1.5 top-3 w-3 h-3 bg-gray-100 transform rotate-45"></div>
                            </div>
                            {sms.status === 'failed' && (
                                <div className="text-[11px] text-red-600 font-semibold mt-2 bg-red-50 p-2 rounded border border-red-200">
                                    {sms.errorMsg || 'Could not connect to the backend server. Is it running?'}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default EditProperty;
