import React from "react";
import { Link } from "react-router-dom";
import { Sun } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="w-full bg-[#020617] text-white border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-400">
          FocusHive
        </Link>

        {/* Middle Menu */}
        <div className="hidden md:flex space-x-10 text-gray-300 text-[15px]">
          <Link to="/dashboard" className="hover:text-white">Dashboard</Link>
          <Link to="/study-rooms" className="hover:text-white">Study Rooms</Link>
          <Link to="/activity" className="hover:text-white">Activity</Link>
          <Link to="/portfolio" className="hover:text-white">Portfolio</Link>
          <Link to="/settings" className="hover:text-white">Settings</Link>
        </div>

        {/* Right Side */}
        <div className="flex items-center space-x-4">
          
          {/* Theme Toggle */}
          <button className="p-2 border rounded-lg border-gray-700 hover:border-gray-500 transition">
            <Sun className="w-5 h-5 text-gray-300" />
          </button>

          {/* Login */}
          <Link to="/login" className="text-gray-300 hover:text-white">
            Login
          </Link>

          {/* Sign Up Button */}
          <Link
            to="/signup"
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
}
