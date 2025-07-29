import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-gray-400 py-10 mt-16 border-t border-gray-800">
      <div className="container mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1 */}
          <div>
            <h3 className="text-white text-lg mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-red-500 transition">Home</Link></li>
              <li><Link to="/tv" className="hover:text-red-500 transition">TV Shows</Link></li>
              <li><Link to="/movies" className="hover:text-red-500 transition">Movies</Link></li>
              <li><Link to="/latest" className="hover:text-red-500 transition">Latest</Link></li>
              <li><Link to="/my-list" className="hover:text-red-500 transition">My List</Link></li>
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="text-white text-lg mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-red-500 transition">Terms of Use</a></li>
              <li><a href="#" className="hover:text-red-500 transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-red-500 transition">Cookie Preferences</a></li>
              <li><a href="#" className="hover:text-red-500 transition">Corporate Information</a></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="text-white text-lg mb-4">Help</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-red-500 transition">FAQ</a></li>
              <li><a href="#" className="hover:text-red-500 transition">Help Center</a></li>
              <li><a href="#" className="hover:text-red-500 transition">Account</a></li>
              <li><a href="#" className="hover:text-red-500 transition">Media Center</a></li>
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h3 className="text-white text-lg mb-4">Contact Us</h3>
            <p className="mb-2">Questions? Call 1-800-NETFLIX</p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-white hover:text-red-500 transition">
                <FaFacebookF size={18} />
              </a>
              <a href="#" className="text-white hover:text-red-500 transition">
                <FaTwitter size={18} />
              </a>
              <a href="#" className="text-white hover:text-red-500 transition">
                <FaInstagram size={18} />
              </a>
              <a href="#" className="text-white hover:text-red-500 transition">
                <FaYoutube size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-800 text-center">
          <p>&copy; {currentYear} Netflix Clone. All rights reserved.</p>
          <p className="mt-2 text-sm">This is a demo project and not the real Netflix service.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;