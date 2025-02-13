import React, { useState } from "react";
import { FaFacebook, FaTwitter, FaLinkedin, FaBars, FaTimes } from "react-icons/fa";
import companyLogo from "../assets/logo.png";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.subject || !formData.message) {
      setError("All required fields must be filled out.");
      return;
    }
    setError("");
    try {
      const response = await fetch("http://localhost:5000/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-700 via-purple-600 to-red-500 flex flex-col items-center text-white p-5 relative">
      <header className="w-full flex items-center justify-between px-10 py-5 backdrop-blur-lg bg-white/10 shadow-lg relative z-50">
        <img src={companyLogo} alt="Company Logo" className="h-12" />
        <nav className="relative">
          <div className="hidden md:flex space-x-6 text-lg">
            <a href="#" className="hover:text-gray-300">Home</a>
            <a href="#" className="hover:text-gray-300">Services</a>
            <a href="#" className="hover:text-gray-300">About Us</a>
            <a href="#" className="hover:text-gray-300">Contact Us</a>
            <a href="#" className="hover:text-gray-300">Careers</a>
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-2xl">
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
          {isOpen && (
            <div className="fixed inset-0 bg-gradient-to-r from-blue-700 via-purple-600 to-red-500 text-White flex flex-col items-center space-y-4  z-50 shadow-lg">
              <button onClick={() => setIsOpen(false)} className="absolute top-5 right-5 text-2xl">
                <FaTimes />
              </button>
              <a href="#" className="hover:text-gray-600" onClick={() => setIsOpen(false)}>Home</a>
              <a href="#" className="hover:text-gray-600" onClick={() => setIsOpen(false)}>Services</a>
              <a href="#" className="hover:text-gray-600" onClick={() => setIsOpen(false)}>About Us</a>
              <a href="#" className="hover:text-gray-600" onClick={() => setIsOpen(false)}>Contact Us</a>
              <a href="#" className="hover:text-gray-600" onClick={() => setIsOpen(false)}>Careers</a>
            </div>
          )}
        </nav>
      </header>

      <div className="w-full max-w-lg bg-white bg-opacity-30 backdrop-blur-md text-gray-900 p-8 rounded-2xl shadow-2xl mt-10 z-10">
        <h2 className="text-3xl font-bold text-center text-blue-600">Contact Us</h2>
        {error && <p className="text-red-600 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input type="text" name="fullName" placeholder="Full Name" required className="w-full p-3 border border-gray-300 rounded-lg" onChange={handleChange} />
          <input type="email" name="email" placeholder="Email Address" required className="w-full p-3 border border-gray-300 rounded-lg" onChange={handleChange} />
          <input type="text" name="phone" placeholder="Phone Number (Optional)" className="w-full p-3 border border-gray-300 rounded-lg" onChange={handleChange} />
          <input type="text" name="subject" placeholder="Subject" required className="w-full p-3 border border-gray-300 rounded-lg" onChange={handleChange} />
          <textarea name="message" placeholder="Message" required className="w-full p-3 border border-gray-300 rounded-lg h-32" onChange={handleChange}></textarea>
          <button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white p-3 rounded-lg hover:scale-105 transform transition">Submit</button>
        </form>
        {submitted && <p className="text-green-600 text-center mt-3">Thank you for your message!</p>}
      </div>
      <div className="w-full max-w-lg bg-white bg-opacity-30 backdrop-blur-md text-gray-900 p-8 rounded-2xl shadow-2xl mt-10 z-10">
        <h2 className="text-2xl font-bold text-center text-gray-800">Company Information</h2>
        <p className="text-center text-gray-700 mt-2">Address: Paris, France</p>
        <p className="text-center text-gray-700">Phone: +33621948299</p>
        <p className="text-center text-gray-700">Email: cdmdinosha@gmail.com</p>
      </div>

      <div className="w-full mt-10 z-10">
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2625.0981907588853!2d2.185449076186508!3d48.856337971331826!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e67b5599411cd7%3A0x40d406e9c78e98b6!2s13%20Rue%20de%20la%20Melonni%C3%A8re%2C%2092500%20Rueil-Malmaison%2C%20France!5e0!3m2!1sen!2slk!4v1739198452028!5m2!1sen!2slk"
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy">
</iframe>
      </div>


      <footer className="w-full bg-gray-900 text-white p-6 mt-10 text-center shadow-lg">
        <p className="text-lg">Follow us on:</p>
        <div className="flex justify-center space-x-6 mt-3 text-xl">
          <a href="#" className="hover:text-blue-400"><FaFacebook /></a>
          <a href="#" className="hover:text-blue-400"><FaTwitter /></a>
          <a href="#" className="hover:text-blue-400"><FaLinkedin /></a>
        </div>
      </footer>
    </div>
  );
}