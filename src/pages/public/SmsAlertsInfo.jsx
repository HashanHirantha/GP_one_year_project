import React from 'react';
import { motion } from 'framer-motion';
import { Bell, Smartphone, TrendingDown, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';

const SmsAlertsInfo = () => {
    return (
        <div className="min-h-screen bg-gray-50 font-sans flex flex-col">
            <Navbar />
            
            <main className="flex-grow pt-28 pb-16">
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
                                    Never Miss a <span className="text-[#06cc50]">Price Drop</span> Again
                                </h1>
                                <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                                    Our Smart SMS Alerts keep you informed instantly. Subscribe to your favorite properties and get an immediate SMS notification the second the price goes down.
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
                                                <div className="font-bold text-gray-800 text-sm">Price Drop Alert!</div>
                                                <div className="text-xs text-gray-500 mt-1 leading-tight">Luxury Villa in Colombo has dropped to Rs. 45,000,000.</div>
                                                <div className="text-[10px] text-gray-400 mt-2">Just now</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="h-1 bg-gray-300 w-1/3 mx-auto mb-2 rounded-full"></div>
                                </div>
                            </motion.div>
                        </div>
                    </div>

                    {/* How it Works */}
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-extrabold text-gray-900 mb-4">How It Works</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">Getting setup is incredibly easy. Just three steps to ensure you always get the best deal.</p>
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
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Subscribe for Alerts</h3>
                            <p className="text-gray-600">Click the "Get Price Drop Alerts" button on the property details page and enter your mobile number.</p>
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
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Get Notified</h3>
                            <p className="text-gray-600">Sit back and relax. If the owner drops the price, your phone will instantly buzz with the good news!</p>
                        </motion.div>
                    </div>

                    {/* Features List */}
                    <div className="bg-gray-900 rounded-3xl p-8 md:p-12 text-white overflow-hidden relative shadow-2xl">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#06cc50] rounded-full blur-[100px] opacity-20"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500 rounded-full blur-[100px] opacity-20"></div>
                        
                        <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="text-3xl font-extrabold mb-8">Why Use Smart SMS Alerts?</h2>
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
                                        <span className="font-bold text-lg">Instant Real-Time Notifications</span>
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
                                        <span className="font-bold text-lg">Never miss a great deal again</span>
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
