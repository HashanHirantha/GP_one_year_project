import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Check } from 'lucide-react';

const LoginPage = () => {
  return (
    // Main container with the purple gradient background
    <div className="min-h-screen flex items-center justify-center p-4 pt-32 bg-transparent">
      {/* Central Login Card */}
      <div className="glass-card rounded-3xl shadow-2xl w-full max-w-md p-8">

        {/* Header Section with Icon and Title */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="bg-[#54ACBF]/20 p-3 rounded-full mb-4 border border-[#54ACBF]/30">
            <Home className="w-8 h-8 text-[#54ACBF]" />
          </div>
          <h1 className="text-3xl font-bold text-white">Welcome Back!</h1>
          <p className="text-white/60 mt-1">Login to your account</p>
        </div>

        {/* Social Login Buttons */}
        <div className="flex gap-4 mb-6">
          <button className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-white/10 rounded-xl text-white hover:bg-white/5 transition bg-white/5">
            {/* Facebook Logo SVG */}
            <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            Facebook
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-white/10 rounded-xl text-white hover:bg-white/5 transition bg-white/5">
            {/* Google Logo SVG */}
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#EA4335" d="M12 5.04c1.91 0 3.63.66 4.99 1.74l3.73-3.73C18.27 1.19 15.33 0 12 0 7.39 0 3.39 2.77 1.47 6.82l4.34 2.17C7.11 6.45 9.36 5.04 12 5.04z" />
              <path fill="#4285F4" d="M23.49 12.28c0-.86-.07-1.68-.22-2.47H12v4.68h6.45c-.28 1.48-1.12 2.73-2.38 3.57l3.86 2.99c2.25-2.08 3.56-5.13 3.56-8.77z" />
              <path fill="#FBBC05" d="M5.81 14.3c-.23-.68-.36-1.41-.36-2.15s.13-1.47.36-2.15L1.47 7.82C.53 9.77 0 11.93 0 14.15s.53 4.38 1.47 6.33l4.34-2.17z" />
              <path fill="#34A853" d="M12 24c3.25 0 5.97-1.08 7.96-2.91l-3.86-2.99c-1.08.72-2.47 1.15-4.1 1.15-3.14 0-5.81-2.12-6.76-4.96l-4.34 2.17C3.39 21.23 7.39 24 12 24z" />
            </svg>
            Google
          </button>
        </div>

        {/* "OR" Divider */}
        <div className="relative flex items-center justify-center mb-6">
          <div className="border-t border-white/10 w-full"></div>
          <span className="bg-[#023859] px-3 text-white/40 text-sm absolute rounded-full">OR</span>
        </div>

        {/* Login Form */}
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-white/80 mb-1">Email Address *</label>
            <input
              type="email"
              placeholder="your.email@example.com"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#54ACBF]/50 focus:border-[#54ACBF] transition"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-white/80 mb-1">Password *</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#54ACBF]/50 focus:border-[#54ACBF] transition"
            />
          </div>

          {/* Remember me & Forgot Password */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center text-white/70 cursor-pointer hover:text-white transition">
              <input type="checkbox" className="form-checkbox h-4 w-4 text-[#54ACBF] border-white/20 rounded mr-2 bg-white/5" />
              Remember me
            </label>
            <a href="#" className="text-[#54ACBF] hover:text-white font-medium transition">Forgot password ?</a>
          </div>

          {/* Login Button */}
          <button type="submit" className="w-full bg-gradient-to-r from-[#54ACBF] to-[#26658C] hover:to-[#54ACBF] text-white font-bold py-3 rounded-full hover:shadow-xl transition-all duration-300 shadow-lg shadow-black/20 transform hover:-translate-y-0.5 uppercase tracking-wide">
            LOGIN
          </button>
        </form>

        {/* Sign Up Link */}
        <div className="text-center mt-6 text-sm text-white/60">
          Don't have an Account ? <Link to="/signup" className="text-white font-bold hover:underline ml-1">Sign Up here</Link>
        </div>

        {/* Security Benefits List */}
        <div className="mt-8 space-y-1 border-t border-white/5 pt-4">
          <div className="flex items-center text-xs text-white/40">
            <Check className="w-3 h-3 mr-1 text-[#54ACBF]" /> secure & encrypted login
          </div>
          <div className="flex items-center text-xs text-white/40">
            <Check className="w-3 h-3 mr-1 text-[#54ACBF]" /> Access your saved properties
          </div>
          <div className="flex items-center text-xs text-white/40">
            <Check className="w-3 h-3 mr-1 text-[#54ACBF]" /> Manage your listings
          </div>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;