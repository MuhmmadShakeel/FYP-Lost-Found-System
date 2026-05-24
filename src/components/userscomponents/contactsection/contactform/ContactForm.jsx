import React, { useState } from "react";

function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", formData);
    alert("Thank you for your message! We'll get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 flex items-center justify-center p-4 md:p-6">
      <div className="max-w-6xl w-full rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row bg-white">
        {/* Left Side - Form */}
        <div className="md:w-1/2 p-6 sm:p-8 md:p-10">
          <div className="mb-2">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">
              Contact Us
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Get in Touch
          </h2>
          <p className="text-gray-500 mb-6 md:mb-8 leading-relaxed">
            Have a project in mind or just want to say hello? Fill out the form
            below and we'll get back to you within 24 hours.
          </p>
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label
                className="block text-gray-700 font-semibold mb-2 text-sm"
                htmlFor="name"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                required
                className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
              />
            </div>
            <div>
              <label
                className="block text-gray-700 font-semibold mb-2 text-sm"
                htmlFor="email"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="hello@example.com"
                required
                className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
              />
            </div>
            <div>
              <label
                className="block text-gray-700 font-semibold mb-2 text-sm"
                htmlFor="message"
              >
                Your Message
              </label>
              <textarea
                id="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us about your project or question..."
                required
                className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white resize-none"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-3.5 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0"
            >
              Send Message
            </button>
            <p className="text-xs text-gray-400 text-center mt-4">
              We'll never share your information with anyone else.
            </p>
          </form>
        </div>

        {/* Right Side - Image with Overlay */}
        <div className="md:w-1/2 relative hidden md:block">
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent z-10 rounded-r-2xl"></div>
          <img
            src="https://i.pinimg.com/1200x/cb/af/08/cbaf084b00be5bd77f5709888e804688.jpg"
            alt="Contact Us - Professional workspace"
            className="w-full h-full object-cover rounded-r-2xl"
          />
          <div className="absolute bottom-6 left-6 right-6 z-20 text-white hidden lg:block">
            <div className="bg-black/30 backdrop-blur-sm rounded-xl p-4">
              <p className="text-sm font-medium">✨ Available for collaborations</p>
              <p className="text-xs opacity-90">Response within 24 hours</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactForm;