import React from 'react';
import { motion } from 'framer-motion';
import { Bell, Smartphone, TrendingDown, ArrowRight, CheckCircle2, QrCode, MessageCircle, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import heroImage from '../../assets/images/alerts_header.png';

const SmsAlertsInfo = () => {
    return (
        <div className="min-h-screen bg-gray-50 font-sans flex flex-col text-gray-800">
            <Navbar />
            
            {/* Hero Section */}
            <div className="relative pt-36 pb-20 text-center px-4 mb-6 bg-cover bg-center text-white" style={{ backgroundImage: `url(${heroImage})` }}>
                <div className="absolute inset-0 bg-black/50 z-0"></div>
                <div className="relative z-10">
                    <motion.h1
                        initial={{ opacity: 0, scale: 0.5, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-4xl md:text-5xl font-bold mb-4"
                    >
                        Smart <span className="text-white">Price Alerts</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                        className="opacity-90 text-lg font-medium"
                    >
                        Never miss a price change again. Get notified instantly via WhatsApp.
                    </motion.p>
                </div>
            </div>

            <main className="flex-grow pb-16">
                <div className="container mx-auto px-4 max-w-6xl">
                    
                    {/* Hero Section */}
                    <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-16 border border-green-100">
                        <div className="grid md:grid-cols-2 gap-8 items-center p-8 md:p-12 lg:p-16">
                            <motion.div 
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6 }}
                            >
                                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-100 text-green-700 text-sm font-bold mb-6">
                                    <Bell size={16} /> New Innovation Feature
                                </div>
                                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
                                    Never Miss a <span className="text-[#06cc50]">Price Change</span> Again
                                </h1>
                                <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                                    Our Smart Alerts keep you informed instantly. Subscribe to any property with just your phone number and get a WhatsApp notification the second the price changes.
                                </p>
                                <Link to="/properties" className="inline-flex items-center gap-2 bg-[#06cc50] hover:bg-[#05b346] text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg shadow-green-500/30 transition-transform transform hover:-translate-y-1">
                                    Try It Now <ArrowRight size={20} />
                                </Link>
                            </motion.div>
                            
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="relative flex justify-center"
                            >
                                <div className="absolute inset-0 bg-gradient-to-tr from-green-100 to-green-50 rounded-full blur-3xl opacity-70"></div>
                                {/* Phone Mockup */}
                                <div className="relative w-64 h-[500px] bg-gray-900 rounded-[3rem] border-[8px] border-gray-800 shadow-2xl overflow-hidden flex flex-col z-10">
                                    <div className="w-full h-6 bg-black absolute top-0 flex justify-center z-20">
                                        <div className="w-20 h-4 bg-black rounded-b-xl"></div>
                                    </div>
                                    <div className="flex-1 bg-gray-50 p-4 pt-12 flex flex-col gap-4 relative">
                                        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-start gap-3 transform translate-y-4 animate-bounce">
                                            <div className="bg-green-100 p-2 rounded-full mt-1 shrink-0">
                                                <TrendingDown size={16} className="text-green-600" />
                                            </div>
                                            <div>
                                                <div className="font-bold text-gray-800 text-sm">Price Alert!</div>
                                                <div className="text-xs text-gray-500 mt-1 leading-tight">Luxury Villa in Colombo has changed to Rs. 45,000,000.</div>
                                                <div className="text-[10px] text-gray-400 mt-2">Just now</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="h-1 bg-gray-300 w-1/3 mx-auto mb-2 rounded-full"></div>
                                </div>
                            </motion.div>
                        </div>
                    </div>

                    {/* How it Works - Updated with clear flow */}
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-extrabold text-gray-900 mb-4">How It Works</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">Getting started is incredibly easy. Just three simple steps to never miss a deal again.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 mb-16">
                        <motion.div 
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow"
                        >
                            <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6 transform rotate-3">
                                <span className="text-2xl font-extrabold">1</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Find a Property</h3>
                            <p className="text-gray-600">Browse our extensive list of properties and find the ones you are interested in buying or renting.</p>
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow"
                        >
                            <div className="w-16 h-16 bg-green-50 text-green-500 rounded-2xl flex items-center justify-center mx-auto mb-6 transform -rotate-3">
                                <span className="text-2xl font-extrabold">2</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Enter Your Number</h3>
                            <p className="text-gray-600">Click "Get Price Alerts" on the property page and enter your WhatsApp phone number to subscribe instantly.</p>
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow"
                        >
                            <div className="w-16 h-16 bg-purple-50 text-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6 transform rotate-3">
                                <span className="text-2xl font-extrabold">3</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Get Notified on WhatsApp</h3>
                            <p className="text-gray-600">When the property price changes (drops or increases), you'll get an instant WhatsApp message with the updates!</p>
                        </motion.div>
                    </div>

                    {/* Subscription Methods - New Section */}
                    <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-16 border border-gray-100">
                        <div className="p-8 md:p-12">
                            <div className="text-center mb-10">
                                <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Three Ways to Subscribe</h2>
                                <p className="text-gray-600 max-w-2xl mx-auto">Choose the method that works best for you. All methods are free and instant.</p>
                            </div>

                            <div className="grid md:grid-cols-3 gap-6">
                                {/* Method 1: Quick Subscribe */}
                                <motion.div 
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-100 hover:shadow-lg transition-all"
                                >
                                    <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mb-4">
                                        <Smartphone size={24} />
                                    </div>
                                    <div className="inline-block bg-green-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full mb-3 uppercase tracking-wider">Recommended</div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">Quick Subscribe</h3>
                                    <p className="text-sm text-gray-600 leading-relaxed mb-4">Simply enter your WhatsApp number — no verification needed. Your subscription is saved instantly and alerts will be sent when available.</p>
                                    <div className="text-xs text-green-700 font-bold">✅ Works even when WhatsApp bot is offline</div>
                                </motion.div>

                                {/* Method 2: Scan QR Code */}
                                <motion.div 
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.1 }}
                                    className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-100 hover:shadow-lg transition-all"
                                >
                                    <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-4">
                                        <QrCode size={24} />
                                    </div>
                                    <div className="inline-block bg-blue-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full mb-3 uppercase tracking-wider">Enhanced</div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">Scan QR Code</h3>
                                    <p className="text-sm text-gray-600 leading-relaxed mb-4">Scan a QR code with your phone camera. It opens WhatsApp with a pre-filled message — just tap Send to subscribe and confirm.</p>
                                    <div className="text-xs text-blue-700 font-bold">📷 Requires WhatsApp bot to be online</div>
                                </motion.div>

                                {/* Method 3: WhatsApp Verification */}
                                <motion.div 
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.2 }}
                                    className="bg-gradient-to-br from-purple-50 to-violet-50 p-6 rounded-2xl border border-purple-100 hover:shadow-lg transition-all"
                                >
                                    <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-4">
                                        <MessageCircle size={24} />
                                    </div>
                                    <div className="inline-block bg-purple-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full mb-3 uppercase tracking-wider">Verified</div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">WhatsApp Verification</h3>
                                    <p className="text-sm text-gray-600 leading-relaxed mb-4">Enter your number and receive a 6-digit code on WhatsApp. Enter the code to verify and subscribe with confirmed delivery.</p>
                                    <div className="text-xs text-purple-700 font-bold">🔐 Requires WhatsApp bot to be online</div>
                                </motion.div>
                            </div>
                        </div>
                    </div>

                    {/* Features List */}
                    <div className="bg-gray-900 rounded-3xl p-8 md:p-12 text-white overflow-hidden relative shadow-2xl">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#06cc50] rounded-full blur-[100px] opacity-20"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500 rounded-full blur-[100px] opacity-20"></div>
                        
                        <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="text-3xl font-extrabold mb-8">Why Use Smart Price Alerts?</h2>
                                <div className="space-y-6">
                                    <div className="flex items-center gap-4">
                                        <div className="bg-white/10 p-2 rounded-lg">
                                            <CheckCircle2 className="text-[#06cc50]" />
                                        </div>
                                        <span className="font-bold text-lg">100% Free Service</span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="bg-white/10 p-2 rounded-lg">
                                            <CheckCircle2 className="text-[#06cc50]" />
                                        </div>
                                        <span className="font-bold text-lg">Instant Real-Time WhatsApp Notifications</span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="bg-white/10 p-2 rounded-lg">
                                            <CheckCircle2 className="text-[#06cc50]" />
                                        </div>
                                        <span className="font-bold text-lg">No App Installation Required</span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="bg-white/10 p-2 rounded-lg">
                                            <CheckCircle2 className="text-[#06cc50]" />
                                        </div>
                                        <span className="font-bold text-lg">Subscribe anytime — even offline</span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="bg-white/10 p-2 rounded-lg">
                                            <Shield className="text-[#06cc50]" />
                                        </div>
                                        <span className="font-bold text-lg">Your data is secure & private</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-center md:justify-end relative">
                                <motion.div 
                                    animate={{ y: [0, -10, 0] }} 
                                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                                >
                                    <Smartphone size={200} className="text-[#06cc50] drop-shadow-[0_0_30px_rgba(6,204,80,0.5)]" />
                                </motion.div>
                            </div>
                        </div>
                    </div>

                </div>
            </main>

            <Footer />
        </div>
    );
};

export default SmsAlertsInfo;
