import React from 'react'
import Logo from '../../assets/images/logo.png'

function Navbar() {
  return (
    <header className="w-full bg-[#1E3A8A] text-[#F8FAFC] shadow-lg">
      <nav className="max-w-7xl mx-auto px-6 md:px-8 h-20 flex items-center justify-between">
        
        <div className="flex items-center gap-3">
          <a href="/" className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center p-1 shadow-md hover:scale-105 transition-transform duration-300">
              <img src={Logo} alt="Site Logo" className="h-14 w-14 object-contain rounded-full" />
            </div>
            <span className="font-semibold text-lg tracking-wide drop-shadow-sm">Lost & Found</span>
          </a>
        </div>

        {/* CENTER — MAIN MENU */}
        <div className="hidden md:flex flex-1 justify-center">
          <ul className="flex gap-3 items-center">
            <li><a href="/" className="px-4 py-2 rounded-lg hover:bg-[#F8FAFC] hover:text-[#1E3A8A] transition transform hover:scale-105 font-medium">Home</a></li>
            <li><a href="/about" className="px-4 py-2 rounded-lg hover:bg-[#F8FAFC] hover:text-[#1E3A8A] transition transform hover:scale-105 font-medium">About</a></li>
            <li><a href="/services" className="px-4 py-2 rounded-lg hover:bg-[#F8FAFC] hover:text-[#1E3A8A] transition transform hover:scale-105 font-medium">Services</a></li>
            <li><a href="/contact" className="px-4 py-2 rounded-lg hover:bg-[#F8FAFC] hover:text-[#1E3A8A] transition transform hover:scale-105 font-medium">Contact</a></li>
            <li><a href="/report-found" className="px-4 py-2 rounded-lg hover:bg-[#F8FAFC] hover:text-[#1E3A8A] transition transform hover:scale-105 font-medium">Report Found</a></li>
            <li><a href="/report-lost" className="px-4 py-2 rounded-lg hover:bg-[#F8FAFC] hover:text-[#1E3A8A] transition transform hover:scale-105 font-medium">Report Lost</a></li>
          </ul>
        </div>

        {/* RIGHT — AUTH */}
        <div className="flex items-center gap-3">
          <a
            href="/login"
            className="px-4 py-2 rounded-lg bg-[#F8FAFC] text-[#1E3A8A] hover:opacity-90 transition font-semibold"
          >
            Login
          </a>

          <a
            href="/register"
            className="px-4 py-2 rounded-lg bg-[#F8FAFC] text-[#1E3A8A] hover:opacity-90 transition font-semibold"
          >
            Sign Up
          </a>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
