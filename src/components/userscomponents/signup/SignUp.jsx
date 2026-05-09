import React, { useEffect, useState } from "react";
import { useRegisterUserMutation } from "../../../redux/UserApi";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function SignUp() {
  const navigate = useNavigate();
  const [registerUser, { isLoading }] = useRegisterUserMutation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    AOS.init({ duration: 900, once: true });
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password } = formData;

    // validation
    if (!name || !email || !password) {
      return toast.error("All fields are required");
    }

    try {
      const res = await registerUser({
        name,
        email,
        password,
      }).unwrap();

      toast.success(res?.message || "Account created successfully!");

      // reset form
      setFormData({
        name: "",
        email: "",
        password: "",
      });

      // redirect to login
      navigate("/login");

    } catch (err) {
      console.log("SIGNUP ERROR:", err);
      toast.error(err?.data?.message || "Registration failed");
    }
  };

  return (
    <section className="flex items-center justify-center bg-[#f4f7ff] py-18 mt-8">

      <div className="w-[850px] h-[480px] grid grid-cols-2 bg-white rounded-2xl shadow-xl overflow-hidden">

        {/* LEFT FORM */}
        <div className="p-8 flex flex-col justify-center" data-aos="fade-right">

          <h2 className="text-2xl font-bold text-[#203C8B] mb-1">
            Create Account
          </h2>

          <p className="text-gray-500 text-xs mb-4">
            Join the Lost & Found system
          </p>

          <form onSubmit={handleSubmit} className="space-y-3">

            {/* NAME */}
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              className="w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-[#203C8B]"
            />

            {/* EMAIL */}
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-[#203C8B]"
            />

            {/* PASSWORD */}
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-[#203C8B]"
            />

            {/* BUTTON */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#203C8B] text-white py-2 text-sm rounded-md hover:bg-[#162d6b] transition"
            >
              {isLoading ? "Creating Account..." : "Sign Up"}
            </button>

            <p className="text-xs text-center text-gray-500">
              Already have an account?{" "}
              <Link to="/login" className="text-[#203C8B] font-medium">
                Login
              </Link>
            </p>

          </form>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative" data-aos="fade-left">
          <img
            src="https://i.pinimg.com/736x/26/47/ed/2647ed6ee48e26fb366a7a206ad402e1.jpg"
            alt="signup"
            className="w-full h-full object-cover"
          />

          <div className="absolute bottom-6 left-6 text-white">
            <h3 className="text-sm font-semibold">Lost & Found</h3>
            <p className="text-[10px] opacity-90">Reconnect belongings</p>
          </div>
        </div>

      </div>
    </section>
  );
}

export default SignUp;