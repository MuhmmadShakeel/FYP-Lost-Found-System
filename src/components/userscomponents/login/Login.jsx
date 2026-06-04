import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useLoginUserMutation } from "../../../redux/UserApi";
import { useAuth } from "../../../context/ContextApi";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [loginUser, { isLoading }] = useLoginUserMutation();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = formData;

    if (!email || !password) {
      return toast.error("All fields are required");
    }

    try {
      const res = await loginUser({ email, password }).unwrap();

      const token = res?.token ?? res?.user?.token ?? res?.data?.token;
      const role = res?.role ?? res?.user?.role ?? res?.data?.role ?? "user";

      if (!token) {
        return toast.error("Token not received");
      }

      login(token, role);

      toast.success(res?.message || "Login successful");

      if (role === "admin") {
        navigate("/admin/overview");
      } else {
        navigate("/");
      }

    } catch (err) {
      console.error("LOGIN ERROR:", err);
      toast.error(err?.data?.message || "Invalid credentials");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4 bg-[#f4f7ff] py-20">
      <div className="w-full max-w-4xl bg-white rounded-3xl overflow-hidden grid grid-cols-1 md:grid-cols-2 shadow-2xl border border-slate-200">

        {/* IMAGE */}
        <div className="hidden md:block min-h-[520px]" data-aos="fade-right">
          <img
            src="https://i.pinimg.com/736x/e8/af/af/e8afaff86ef1d8cc4ca9838e8eceaee4.jpg"
            alt="Login"
            className="w-full h-full object-cover"
          />
        </div>

        {/* FORM */}
        <div className="p-8 flex flex-col justify-center min-h-[520px]" data-aos="fade-left">

          <h2 className="text-3xl font-semibold text-[#0B1C3D] mb-2 whitespace-nowrap">
            Welcome Back 👋
          </h2>

          <p className="text-gray-500 text-sm mb-6">
            Login to continue your journey with our platform.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* EMAIL */}
            <div>
              <label className="text-xs font-semibold text-[#0B1C3D]">
                Email
              </label>
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 mt-1 rounded-lg border focus:ring-2 focus:ring-[#1E3A8A] outline-none"
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className="text-xs font-semibold text-[#0B1C3D]">
                Password
              </label>
              <input
                name="password"
                value={formData.password}
                onChange={handleChange}
                type="password"
                placeholder="Enter your password"
                className="w-full px-3 py-2 mt-1 rounded-lg border focus:ring-2 focus:ring-[#1E3A8A] outline-none"
              />
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#1E3A8A] text-white py-2.5 rounded-lg font-semibold hover:bg-[#132a5c] transition disabled:opacity-50"
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>

            {/* REGISTER */}
            <p className="text-xs text-center text-gray-500">
              Don’t have an account?{" "}
              <Link to="/register" className="text-[#1E3A8A] font-semibold hover:underline">
                Register
              </Link>
            </p>

          </form>
        </div>

      </div>
    </section>
  );
}
export default Login;