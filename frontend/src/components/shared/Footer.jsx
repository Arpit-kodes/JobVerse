import React from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-tr from-black via-zinc-900 to-black text-gray-400 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-10">

          {/* Left Section: Branding */}
          <div>
            <h2 className="text-3xl font-extrabold tracking-wide mb-3">
              <span className="text-white">Job</span>
              <span className="text-gray-400">Verse</span>
            </h2>
            <p className="text-sm text-gray-500 leading-relaxed">
              Your trusted gateway to career opportunities. Search, apply, and thrive with JobVerse.
            </p>
          </div>

          {/* Middle Section: Navigation Links */}
          <div className="text-sm flex flex-col gap-2">
            <h3 className="text-white font-semibold mb-3"></h3>
            <a href="#" className="hover:text-white transition duration-200"> </a>
            <a href="#" className="hover:text-white transition duration-200"> </a>
            <a href="#" className="hover:text-white transition duration-200"> </a>
            <a href="#" className="hover:text-white transition duration-200"> </a>
          </div>

          {/* Right Section: Social Media */}
          <div>
            <h3 className="text-white font-semibold mb-3">Follow Us</h3>
            <div className="flex space-x-5 text-xl">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-white transition duration-300 hover:scale-110">
                <FaFacebookF />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-white transition duration-300 hover:scale-110">
                <FaTwitter />
              </a>
              <a href="https://www.linkedin.com/in/contactarpitgupta/" target="_blank" rel="noreferrer" className="hover:text-white transition duration-300 hover:scale-110">
                <FaLinkedinIn />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-white transition duration-300 hover:scale-110">
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>

        {/* Divider & Bottom Text */}
        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} <span className="border-gray-700">Job</span><span className="border-gray-700">Verse</span>. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
