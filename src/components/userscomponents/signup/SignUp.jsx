import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";

function SignUp() {

  useEffect(() => {
    AOS.init({
      duration: 900,
      once: true
    });
  }, []);

  return (
   <section className="flex items-center justify-center bg-[#f4f7ff] py-18 mt-8">

  <div className="w-[800px] h-[475px] grid grid-cols-2 bg-white rounded-2xl shadow-xl overflow-hidden">

    <div className="p-6 flex flex-col justify-center" data-aos="fade-right">

      <h2 className="text-xl font-bold text-[#203C8B] mb-1">
        Create Account
      </h2>

      <p className="text-gray-500 text-xs mb-4">
        Join the Lost & Found system
      </p>

      <form className="space-y-3">

        <div>
          <label className="text-xs text-gray-600">Name</label>
          <input
            type="text"
            placeholder="Your name"
            className="w-full mt-1 px-3 py-1.5 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-[#203C8B]"
          />
        </div>

        <div>
          <label className="text-xs text-gray-600">Email</label>
          <input
            type="email"
            placeholder="Email"
            className="w-full mt-1 px-3 py-1.5 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-[#203C8B]"
          />
        </div>

        <div>
          <label className="text-xs text-gray-600">Password</label>
          <input
            type="password"
            placeholder="Password"
            className="w-full mt-1 px-3 py-1.5 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-[#203C8B]"
          />
        </div>

        <div>
          <label className="text-xs text-gray-600">Confirm</label>
          <input
            type="password"
            placeholder="Confirm"
            className="w-full mt-1 px-3 py-1.5 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-[#203C8B]"
          />
        </div>

        <button
          className="w-full bg-[#203C8B] text-white py-2 text-sm rounded-md hover:bg-[#162d6b] transition"
        >
          Sign Up
        </button>

        <p className="text-[11px] text-center text-gray-500">
          Already have an account?{" "}
          <Link to='/login' className="text-[#203C8B] font-medium cursor-pointer">
            Login
          </Link>
        </p>

      </form>
    </div>
    <div className="relative" data-aos="fade-left">
      <img
        src="https://i.pinimg.com/736x/26/47/ed/2647ed6ee48e26fb366a7a206ad402e1.jpg"
        alt="signup"
        className="w-full h-full object-cover"
      />


      <div className="absolute bottom-6 left-6 text-white">
        <h3 className="text-sm font-semibold">
          Lost & Found
        </h3>
        <p className="text-[10px] opacity-90">
          Reconnect belongings
        </p>
      </div>
    </div>
</div>
</section>
  );
}

export default SignUp;