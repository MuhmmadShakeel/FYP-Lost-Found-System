import React, { useState } from "react";
import Logo from '../../../assets/images/Logo.png'
import {Link} from 'react-router-dom'
function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full bg-[#1E3A8A] text-[#F8FAFC] shadow-lg fixed top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 h-20 flex items-center justify-between">
        
        <Link to="/" className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center p-1 shadow-md hover:scale-105 transition-transform duration-300">
            <img
              src={Logo}
              alt="Site Logo"
              className="h-10 w-10 object-contain rounded-full"
            />
          </div>
          <span className="font-semibold text-lg tracking-wide">
            Lost & Found
          </span>
        </Link>

        {/* CENTER — DESKTOP MENU */}
        <ul className="hidden lg:flex gap-2 items-center">
          {[
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
            { name: "Services", path: "/services" },
            { name: "Contact", path: "/contact" },
            { name: "Report Lost", path: "/report-lost" },
            { name: "Report Found", path: "/report-found" },
          ].map((item, index) => (
            <li key={index}>
              <Link
                to={item.path}
                className="px-4 py-2 rounded-lg hover:bg-[#F8FAFC] hover:text-[#1E3A8A] transition transform hover:scale-105 font-medium"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* RIGHT — AUTH (DESKTOP) */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            to="/login"
            className="px-4 py-2 rounded-lg bg-[#F8FAFC] text-[#1E3A8A] hover:opacity-90 transition font-semibold"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-4 py-2 rounded-lg bg-[#F8FAFC] text-[#1E3A8A] hover:opacity-90 transition font-semibold"
          >
            Sign Up
          </Link>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className="lg:hidden flex flex-col gap-1"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="w-6 h-0.5 bg-white"></span>
          <span className="w-6 h-0.5 bg-white"></span>
          <span className="w-6 h-0.5 bg-white"></span>
        </button>
      </nav>

      {/* MOBILE MENU */}
      <div
        className={`lg:hidden bg-[#1E3A8A] transition-all duration-300 overflow-hidden ${
          menuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col px-6 py-4 gap-2">
          {[
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
            { name: "Services", path: "/services" },
            { name: "Contact", path: "/contact" },
            { name: "Report Found", path: "/report-found" },
            { name: "Report Lost", path: "/report-lost" },
          ].map((item, index) => (
            <li key={index}>
              <Link
                to={item.path}
                onClick={() => setMenuOpen(false)}
                className="block px-4 py-2 rounded-lg hover:bg-[#F8FAFC] hover:text-[#1E3A8A] transition font-medium"
              >
                {item.name}
              </Link>
            </li>
          ))}

          {/* MOBILE AUTH */}
          <div className="flex flex-col gap-2 mt-3">
            <Link
              to="/login"
              className="px-4 py-2 rounded-lg bg-[#F8FAFC] text-[#1E3A8A] text-center font-semibold"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="px-4 py-2 rounded-lg bg-[#F8FAFC] text-[#1E3A8A] text-center font-semibold"
            >
              Sign Up
            </Link>
          </div>
        </ul>
      </div>
    </header>
  );
}

export default Navbar;
