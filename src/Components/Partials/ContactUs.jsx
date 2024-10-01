import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ContactUs = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
    // Clear the form after submission
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="bg-gray-900 w-screen text-white min-h-screen flex flex-col">
      {/* Back Button */}
      <div className="p-6">
        <button
          onClick={() => navigate("/")}
          className="flex items-center text-blue-500 hover:text-blue-400 transition"
        >
          <i className="ri-arrow-left-line text-2xl mr-2"></i>
          Back to Home
        </button>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center bg-gray-800  justify-center flex-grow p-10 lg:p-0">
        <h1 className="text-5xl font-bold mb-8 text-center">Contact Us</h1>
        <p className="text-lg text-gray-300 text-center max-w-3xl mb-12">
          We would love to hear from you! Please fill out the form below and we will get back to you shortly.
        </p>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="w-full max-w-lg bg-gray-800 p-8 rounded-lg shadow-lg">
          <div className="mb-6">
            <label className="block text-gray-300 mb-2" htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 rounded bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-300 mb-2" htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 rounded bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-300 mb-2" htmlFor="message">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="4"
              className="w-full p-3 rounded bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Send Message
          </button>
        </form>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-center py-6 mt-auto">
        <p className="text-sm text-gray-400">© 2024 CineChronicle. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ContactUs;
