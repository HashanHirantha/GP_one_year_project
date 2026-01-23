import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignupPage = () => {
    const [role, setRole] = useState('Property Owner');
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        if (role === 'Admin') {
            navigate('/dashboard/admin');
        } else if (role === 'Property Owner') {
            navigate('/dashboard/owner');
        } else {
            navigate('/');
        }
    };

    return (
        // Main container with the purple gradient background
        <div className="min-h-screen flex items-center justify-center p-4 pt-32 bg-gray-100">
            {/* Central Card */}
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8">

                {/* Header Section */}
                <div className="flex flex-col items-center text-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">Register Here</h1>
                    <p className="text-gray-500 text-sm mt-1">create your account to get started</p>
                </div>

                {/* Social Login Buttons */}
                <div className="flex gap-4 mb-6">
                    <button className="flex-1 flex items-center justify-center gap-2 py-2 border border-blue-600 rounded-full text-gray-700 hover:bg-blue-50 transition">
                        {/* Facebook Logo SVG */}
                        <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                        <span className="font-semibold text-sm">facebook</span>
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-2 py-2 border border-red-500 rounded-full text-gray-700 hover:bg-red-50 transition">
                        {/* Google Logo SVG */}
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path fill="#EA4335" d="M12 5.04c1.91 0 3.63.66 4.99 1.74l3.73-3.73C18.27 1.19 15.33 0 12 0 7.39 0 3.39 2.77 1.47 6.82l4.34 2.17C7.11 6.45 9.36 5.04 12 5.04z" />
                            <path fill="#4285F4" d="M23.49 12.28c0-.86-.07-1.68-.22-2.47H12v4.68h6.45c-.28 1.48-1.12 2.73-2.38 3.57l3.86 2.99c2.25-2.08 3.56-5.13 3.56-8.77z" />
                            <path fill="#FBBC05" d="M5.81 14.3c-.23-.68-.36-1.41-.36-2.15s.13-1.47.36-2.15L1.47 7.82C.53 9.77 0 11.93 0 14.15s.53 4.38 1.47 6.33l4.34-2.17z" />
                            <path fill="#34A853" d="M12 24c3.25 0 5.97-1.08 7.96-2.91l-3.86-2.99c-1.08.72-2.47 1.15-4.1 1.15-3.14 0-5.81-2.12-6.76-4.96l-4.34 2.17C3.39 21.23 7.39 24 12 24z" />
                        </svg>
                        <span className="font-semibold text-sm">Google</span>
                    </button>
                </div>

                {/* "OR" Divider */}
                <div className="relative flex items-center justify-center mb-6">
                    <div className="border-t border-gray-300 w-full"></div>
                    <span className="bg-white px-3 text-gray-400 text-sm absolute">OR</span>
                </div>

                {/* Role Selection */}
                <div className="mb-6">
                    <label className="block text-sm font-bold text-gray-900 mb-2">I am an</label>
                    <div className="grid grid-cols-2 gap-3">
                        {['Property Owner', 'Agent', 'Admin', 'Buyer'].map((roleOption) => (
                            <button
                                key={roleOption}
                                type="button"
                                onClick={() => setRole(roleOption)}
                                className={`py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 border ${role === roleOption
                                    ? 'bg-black text-white border-black shadow-md transform scale-105'
                                    : 'bg-white text-gray-500 border-gray-300 hover:border-gray-400 hover:text-black'
                                    }`}
                            >
                                {roleOption}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Signup Form */}
                <form className="space-y-4" onSubmit={handleRegister}>
                    <div>
                        <label className="block text-sm font-bold text-gray-900 mb-1">Your name *</label>
                        <input
                            type="text"
                            placeholder="Enter your full name"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-900 mb-1">Email Address *</label>
                        <input
                            type="email"
                            placeholder="your.email@example.com"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-900 mb-1">Create Password *</label>
                        <input
                            type="password"
                            placeholder="Minimum 8 characters"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                        />
                    </div>

                    {/* Checkboxes */}
                    <div className="space-y-3 pt-2">
                        <label className="flex items-center space-x-3 text-xs text-gray-500 cursor-pointer group">
                            <div className="relative flex items-center">
                                <input type="checkbox" className="peer h-4 w-4 cursor-pointer appearance-none rounded border border-gray-400 transition-all checked:border-black checked:bg-black hover:border-gray-500" />
                                <svg className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" width="12" height="12">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                            </div>
                            <span className="group-hover:text-gray-700 transition">Subscribe to our NewsLetter and email alerts</span>
                        </label>

                        <label className="flex items-center space-x-3 text-xs text-gray-500 cursor-pointer group">
                            <div className="relative flex items-center">
                                <input type="checkbox" required className="peer h-4 w-4 cursor-pointer appearance-none rounded border border-gray-400 transition-all checked:border-black checked:bg-black hover:border-gray-500" />
                                <svg className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" width="12" height="12">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                            </div>
                            <span className="group-hover:text-gray-700 transition">I have read, understood and accept <a href="#" className="text-black font-bold hover:underline">Terms & conditions</a></span>
                        </label>
                    </div>

                    {/* Register Button */}
                    <button type="submit" className="w-full bg-[#00FF00] hover:bg-white text-black font-bold py-3 rounded-full hover:shadow-xl transition-all duration-300 shadow-lg shadow-black/20 transform hover:-translate-y-0.5 uppercase tracking-wide mt-4">
                        Click to Register
                    </button>
                </form>

                {/* Login Link */}
                <div className="text-center mt-6 text-xs text-gray-500">
                    Already have an Account? <Link to="/login" className="text-black font-bold hover:underline ml-1">Login Here</Link>
                </div>

            </div>
        </div>
    );
};

export default SignupPage;
