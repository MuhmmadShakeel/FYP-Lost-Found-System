import React from 'react'
import Logo from '../../assets/images/logo.png'
function Navbar() {
  return (
    <div>
      <>
      <nav className="navbar w-full h-16 bg-[#DA9101] text-white">
        <div className="navbar-start  justify-center">
            <div>
          <img src={Logo} alt="Logo" className='h-14 w-14 p-2' />
            </div>
          </div>
          <div className="navbar-center flex flex-row">
            <ul className="lg:pl-44 menu px-1  space-x-4 flex flex-row">
                <li><a className='font-medium hover:bg-[#940D21] px-4 py-2 rounded-xl' href="/">Home</a></li>
                <li><a className='font-medium hover:bg-[#940D21] px-4 py-2 rounded-xl' href="/about">About</a></li>
                <li><a className='font-medium hover:bg-[#940D21] px-4 py-2 rounded-xl' href="/services">Services</a></li>
                <li><a className='font-medium hover:bg-[#940D21] px-4 py-2 rounded-xl' href="/contact">Contact</a></li>
                <li><a className='font-medium hover:bg-[#940D21] px-4 py-2 rounded-xl' href="/login">Login</a></li>
                <li><a className='font-medium hover:bg-[#940D21] px-4 py-2 rounded-xl' href="/register">Register</a></li>
            </ul>
          </div>
      </nav>
      <div>
        <div>
            Report  Found Item
        </div>
        <div>
            Report Lost Item
        </div>
      </div>
      </>
    </div>
  )
}

export default Navbar
