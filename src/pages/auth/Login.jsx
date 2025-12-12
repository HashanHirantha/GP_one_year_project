import React from 'react';
import { Home, Check } from 'lucide-react';

const LoginPage = () => {
  return (
    // Main container with the purple gradient background
    <div className="min-h-screen flex items-center justify-center p-4 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-500 to-purple-900">
      {/* Central Login Card */}
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8">
        
        {/* Header Section with Icon and Title */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="bg-gray-50 p-2 rounded-xl mb-4">
            <Home className="w-8 h-8 text-indigo-600" />
          </div>
          <h1 className="text-3xl font-bold text-purple-900">Welcome Back!</h1>
          <p className="text-gray-500 mt-1">Login to your account</p>
        </div>

        {/* Social Login Buttons */}
        <div className="flex gap-4 mb-6">
          <button className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition">
            {/* Facebook Logo SVG */}
            <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            Facebook
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition">
            {/* Google Logo SVG */}
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#EA4335" d="M12 5.04c1.91 0 3.63.66 4.99 1.74l3.73-3.73C18.27 1.19 15.33 0 12 0 7.39 0 3.39 2.77 1.47 6.82l4.34 2.17C7.11 6.45 9.36 5.04 12 5.04z"/>
              <path fill="#4285F4" d="M23.49 12.28c0-.86-.07-1.68-.22-2.47H12v4.68h6.45c-.28 1.48-1.12 2.73-2.38 3.57l3.86 2.99c2.25-2.08 3.56-5.13 3.56-8.77z"/>
              <path fill="#FBBC05" d="M5.81 14.3c-.23-.68-.36-1.41-.36-2.15s.13-1.47.36-2.15L1.47 7.82C.53 9.77 0 11.93 0 14.15s.53 4.38 1.47 6.33l4.34-2.17z"/>
              <path fill="#34A853" d="M12 24c3.25 0 5.97-1.08 7.96-2.91l-3.86-2.99c-1.08.72-2.47 1.15-4.1 1.15-3.14 0-5.81-2.12-6.76-4.96l-4.34 2.17C3.39 21.23 7.39 24 12 24z"/>
            </svg>
            Google
          </button>
        </div>

        {/* "OR" Divider */}
        <div className="relative flex items-center justify-center mb-6">
          <div className="border-t border-gray-300 w-full"></div>
          <span className="bg-white px-3 text-gray-400 text-sm absolute">OR</span>
        </div>

        {/* Login Form */}
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address *</label>
            <input 
              type="email" 
              placeholder="your.email@example.com" 
              className="w-full border border-gray-300 rounded-md px-4 py-2.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Password *</label>
            <input 
              type="password" 
              placeholder="Enter your password" 
              className="w-full border border-gray-300 rounded-md px-4 py-2.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          
          {/* Remember me & Forgot Password */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center text-gray-600 cursor-pointer">
              <input type="checkbox" className="form-checkbox h-4 w-4 text-indigo-600 border-gray-300 rounded mr-2" />
              Remember me
            </label>
            <a href="#" className="text-indigo-600 hover:underline font-medium">Forgot password ?</a>
          </div>

          {/* Login Button */}
          <button type="submit" className="w-full bg-indigo-800 text-white font-bold py-3 rounded-md hover:bg-indigo-900 transition">
            LOGIN
          </button>
        </form>

        {/* Sign Up Link */}
        <div className="text-center mt-6 text-sm text-gray-600">
          Don't have an Account ? <a href="#" className="text-indigo-600 font-bold hover:underline">Sign Up here</a>
        </div>

        {/* Security Benefits List */}
        <div className="mt-8 space-y-1">
          <div className="flex items-center text-xs text-gray-500">
            <Check className="w-4 h-4 mr-1 text-gray-400" /> secure & encrypted login
          </div>
          <div className="flex items-center text-xs text-gray-500">
            <Check className="w-4 h-4 mr-1 text-gray-400" /> Access your saved properties
          </div>
          <div className="flex items-center text-xs text-gray-500">
            <Check className="w-4 h-4 mr-1 text-gray-400" /> Manage your listings
          </div>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;