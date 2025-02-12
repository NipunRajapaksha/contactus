import React, { useState } from "react";
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";

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
    <div className="min-h-screen bg-gradient-to-r from-blue-700 via-purple-600 to-red-500 flex flex-col items-center text-white p-5">
      <header className="w-full flex items-center justify-between px-10 py-5 backdrop-blur-lg bg-white/10 shadow-lg">
        <button className="text-white bg-blue-600 px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition">Log In</button>
        <nav className="space-x-6 text-lg font-semibold">
          <a href="#" className="hover:text-gray-300">Home</a>
          <a href="#" className="hover:text-gray-300">About Us</a>
          <a href="#" className="hover:text-gray-300">Services</a>
        </nav>
      </header>
      <div className="w-full max-w-lg bg-white bg-opacity-30 backdrop-blur-md text-gray-900 p-8 rounded-2xl shadow-2xl mt-10">
        <h2 className="text-3xl font-bold text-center text-blue-600">Contact Us</h2>
        {error && <p className="text-red-600 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input type="text" name="fullName" placeholder="Full Name" required className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600" onChange={handleChange} />
          <input type="email" name="email" placeholder="Email Address" required className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600" onChange={handleChange} />
          <input type="text" name="phone" placeholder="Phone Number (Optional)" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600" onChange={handleChange} />
          <input type="text" name="subject" placeholder="Subject" required className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600" onChange={handleChange} />
          <textarea name="message" placeholder="Message" required className="w-full p-3 border border-gray-300 rounded-lg h-32 focus:ring-2 focus:ring-blue-600" onChange={handleChange}></textarea>
          <button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white p-3 rounded-lg font-semibold hover:scale-105 transform transition">Submit</button>
        </form>
        {submitted && <p className="text-green-600 text-center mt-3">Thank you for your message!</p>}
      </div>
      <div className="w-full mt-10">
        <iframe className="w-full h-64 rounded-lg shadow-lg" src="https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=Paris,France" allowFullScreen></iframe>
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
