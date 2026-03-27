import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

function Login() {
  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  return (
    <section className="min-h-screen flex items-center py-24 justify-center px-4">

      <div className="w-full max-w-4xl bg-white rounded-2xl overflow-hidden grid md:grid-cols-2">

        {/* Image Section */}
        <div
          className="hidden md:block h-[420px]"
          data-aos="fade-right"
        >
          <img
            src="https://i.pinimg.com/736x/e8/af/af/e8afaff86ef1d8cc4ca9838e8eceaee4.jpg"
            alt="Login Visual"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Form Section */}
        <div
          className="p-8 flex flex-col justify-center h-[420px]"
          data-aos="fade-left"
        >
          <h2 className="text-2xl font-bold text-[#0B1C3D] mb-2">
            Welcome Back
          </h2>

          <p className="text-gray-500 text-sm mb-6">
            Login to access your Lost & Found dashboard.
          </p>

          <form className="space-y-4">

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-[#0B1C3D] mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0B1C3D] text-sm"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-[#0B1C3D] mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0B1C3D] text-sm"
              />
            </div>

            {/* Remember */}
            <div className="flex justify-between items-center text-xs text-gray-600">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-[#0B1C3D]" />
                Remember me
              </label>

              <button
                type="button"
                className="text-[#0B1C3D] hover:underline"
              >
                Forgot?
              </button>
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full bg-[#1E3A8A] text-white py-2.5 rounded-lg font-semibold text-sm hover:bg-[#132a5c] transition duration-300"
            >
              Login
            </button>

            {/* Register */}
            <p className="text-xs text-gray-500 text-center mt-3">
              Don’t have an account?{" "}
              <span className="text-[#1E3A8A] font-semibold cursor-pointer hover:underline">
                Register
              </span>
            </p>

          </form>
        </div>

      </div>

    </section>
  );
}

export default Login;