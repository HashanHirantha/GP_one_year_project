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
        <div className="min-h-screen flex items-center justify-center p-4 pt-32 bg-transparent">
            {/* Central Card */}
            <div className="glass-card rounded-3xl shadow-2xl w-full max-w-md p-8">

                {/* Header Section */}
                <div className="flex flex-col items-center text-center mb-6">
                    <h1 className="text-2xl font-bold text-white">Register Here</h1>
                    <p className="text-white/60 text-sm mt-1">create your account to get started</p>
                </div>

                {/* Social Login Buttons */}
                <div className="flex gap-4 mb-6">
                    <button className="flex-1 flex items-center justify-center gap-2 py-2 border border-white/10 rounded-full text-white hover:bg-white/5 transition bg-white/5">
                        {/* Facebook Logo SVG */}
                        <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                        <span className="font-semibold text-sm">facebook</span>
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-2 py-2 border border-red-500/50 rounded-full text-white hover:bg-red-500/10 transition bg-white/5">
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
                    <div className="border-t border-white/10 w-full"></div>
                    <span className="bg-[#023859] px-3 text-white/40 text-sm absolute rounded-full">OR</span>
                </div>

                {/* Role Selection */}
                <div className="mb-6">
                    <label className="block text-sm font-bold text-white mb-2">I am an</label>
                    <div className="grid grid-cols-2 gap-3">
                        {['Property Owner', 'Agent', 'Admin', 'Buyer'].map((roleOption) => (
                            <button
                                key={roleOption}
                                type="button"
                                onClick={() => setRole(roleOption)}
                                className={`py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 border ${role === roleOption
                                    ? 'bg-[#54ACBF] text-white border-[#54ACBF] shadow-md transform scale-105'
                                    : 'bg-white/5 text-gray-400 border-white/10 hover:border-[#54ACBF]/50 hover:text-white'
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
                        <label className="block text-sm font-bold text-white/80 mb-1">Your name *</label>
                        <input
                            type="text"
                            placeholder="Enter your full name"
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#54ACBF]/50 focus:border-[#54ACBF] transition"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-white/80 mb-1">Email Address *</label>
                        <input
                            type="email"
                            placeholder="your.email@example.com"
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#54ACBF]/50 focus:border-[#54ACBF] transition"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-white/80 mb-1">Create Password *</label>
                        <input
                            type="password"
                            placeholder="Minimum 8 characters"
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#54ACBF]/50 focus:border-[#54ACBF] transition"
                        />
                    </div>

                    {/* Checkboxes */}
                    <div className="space-y-3 pt-2">
                        <label className="flex items-center space-x-3 text-xs text-gray-400 cursor-pointer group hover:text-white transition">
                            <div className="relative flex items-center">
                                <input type="checkbox" className="peer h-4 w-4 cursor-pointer appearance-none rounded border border-white/30 transition-all checked:border-[#54ACBF] checked:bg-[#54ACBF] hover:border-white/50 bg-white/5" />
                                <svg className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" width="12" height="12">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                            </div>
                            <span>Subscribe to our NewsLetter and email alerts</span>
                        </label>

                        <label className="flex items-center space-x-3 text-xs text-gray-400 cursor-pointer group hover:text-white transition">
                            <div className="relative flex items-center">
                                <input type="checkbox" required className="peer h-4 w-4 cursor-pointer appearance-none rounded border border-white/30 transition-all checked:border-[#54ACBF] checked:bg-[#54ACBF] hover:border-white/50 bg-white/5" />
                                <svg className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" width="12" height="12">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                            </div>
                            <span>I have read, understood and accept <a href="#" className="text-[#54ACBF] font-bold hover:underline">Terms & conditions</a></span>
                        </label>
                    </div>

                    {/* Register Button */}
                    <button type="submit" className="w-full bg-gradient-to-r from-[#54ACBF] to-[#26658C] hover:to-[#54ACBF] text-white font-bold py-3 rounded-full hover:shadow-xl transition-all duration-300 shadow-lg shadow-black/20 transform hover:-translate-y-0.5 uppercase tracking-wide mt-4">
                        Click to Register
                    </button>
                </form>

                {/* Login Link */}
                <div className="text-center mt-6 text-xs text-white/60">
                    Already have an Account? <Link to="/login" className="text-white font-bold hover:underline ml-1">Login Here</Link>
                </div>

            </div>
        </div>
    );
};

export default SignupPage;
