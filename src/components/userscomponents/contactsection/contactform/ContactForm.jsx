import React from "react";

function ContactForm() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-6xl w-full rounded-lg overflow-hidden flex flex-col md:flex-row">
        {/* Left Side - Form */}
        <div className="md:w-1/2 p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Get in Touch</h2>
          <p className="text-gray-600 mb-8">
            Fill out the form below and we will get back to you as soon as possible.
          </p>
          <form className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Your Name"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Your Email"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2" htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                rows="5"
                placeholder="Your Message"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>

        <div className="md:w-1/2 hidden md:block">
          <img
            src="https://i.pinimg.com/1200x/cb/af/08/cbaf084b00be5bd77f5709888e804688.jpg"
            alt="Contact Us"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
export default ContactForm;