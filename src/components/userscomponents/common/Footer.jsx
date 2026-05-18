import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaMapMarkerAlt, FaEnvelope, FaPhoneAlt } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-[#1e3a8a] text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Brand Info */}
          <div>
            <h2 className="text-2xl font-bold mb-4">CityWide Lost & Found</h2>
            <p className="text-gray-300 leading-relaxed">
              Helping communities reconnect with their lost belongings through 
              smart matching, real-time alerts, and secure reporting.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3 text-gray-300">
              <li className="hover:text-white transition duration-300 cursor-pointer">Home</li>
              <li className="hover:text-white transition duration-300 cursor-pointer">Report Lost Item</li>
              <li className="hover:text-white transition duration-300 cursor-pointer">Submit Found Item</li>
              <li className="hover:text-white transition duration-300 cursor-pointer">FAQ</li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Support</h3>
            <ul className="space-y-3 text-gray-300">
              <li className="hover:text-white transition duration-300 cursor-pointer">Privacy Policy</li>
              <li className="hover:text-white transition duration-300 cursor-pointer">Terms & Conditions</li>
              <li className="hover:text-white transition duration-300 cursor-pointer">Help Center</li>
              <li className="hover:text-white transition duration-300 cursor-pointer">Contact Us</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact</h3>
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-center gap-3">
                <FaMapMarkerAlt /> Bahawalpur, Pakistan
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope /> support@citylostfound.com
              </li>
              <li className="flex items-center gap-3">
                <FaPhoneAlt /> +92 300 1234567
              </li>
            </ul>

            {/* Social Icons */}
            <div className="flex gap-4 mt-6">
              <div className="bg-white/20 p-3 rounded-full hover:bg-white hover:text-[#1e3a8a] transition duration-300 cursor-pointer">
                <FaFacebookF />
              </div>
              <div className="bg-white/20 p-3 rounded-full hover:bg-white hover:text-[#1e3a8a] transition duration-300 cursor-pointer">
                <FaTwitter />
              </div>
              <div className="bg-white/20 p-3 rounded-full hover:bg-white hover:text-[#1e3a8a] transition duration-300 cursor-pointer">
                <FaInstagram />
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/20 mt-12 pt-6 text-center text-gray-300 text-sm leading-relaxed">
          © {new Date().getFullYear()} CityWide Lost & Found. All Rights Reserved.
        </div>

      </div>
    </footer>
  );
}

export default Footer;