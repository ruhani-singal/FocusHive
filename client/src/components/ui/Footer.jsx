import React from "react";
import { Twitter, Linkedin, Github, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#020617] text-gray-300 border-t border-white/5 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">

        {/* Brand Section */}
        <div>
          <h2 className="text-2xl font-bold text-blue-400">FocusHive</h2>
          <p className="mt-3 text-gray-400 text-[15px] leading-relaxed w-72">
            Empowering students worldwide to focus smarter and achieve more.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2 text-[15px]">
            <li className="hover:text-white cursor-pointer">About</li>
            <li className="hover:text-white cursor-pointer">Blog</li>
            <li className="hover:text-white cursor-pointer">Community</li>
            <li className="hover:text-white cursor-pointer">Support</li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Connect With Us</h3>

          <div className="flex space-x-4">
            {[Twitter, Linkedin, Github, Mail].map((Icon, index) => (
              <div
                key={index}
                className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center hover:bg-blue-700 transition cursor-pointer"
              >
                <Icon className="w-5 h-5 text-white" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="text-center text-gray-500 py-6 border-t border-white/10 text-sm">
        © 2025 FocusHive. All rights reserved.
      </div>
    </footer>
  );
}
