import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebookF,
  faInstagram,
  faTwitter,
  faLinkedinIn,
} from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 border-t mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h1 className="text-2xl font-bold text-blue-600 mb-2">Vhawker</h1>
          <p className="text-sm text-gray-600">
            Bridging the gap between Hawkers, Semi-Wholesalers & Wholesalers on a single platform.
          </p>
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-3">Quick Links</h2>
          <ul className="space-y-1 text-sm">
            <li><Link to="/" className="hover:text-blue-600">Home</Link></li>
            <li><Link to="/about" className="hover:text-blue-600">About</Link></li>
            <li><Link to="/contact" className="hover:text-blue-600">Contact</Link></li>
            <li><Link to="/admin/login" className="hover:text-blue-600">Admin Panel</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-3">Explore by Role</h2>
          <ul className="space-y-1 text-sm">
            <li><Link to="/hawker" className="hover:text-yellow-500">Hawker</Link></li>
            <li><Link to="/semiwholesaler" className="hover:text-green-600">Semi-Wholesaler</Link></li>
            <li><Link to="/wholesaler" className="hover:text-indigo-600">Wholesaler</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-3">Follow Us</h2>
          <div className="flex gap-4 text-xl">
            <a href="#" className="hover:text-blue-600" aria-label="Facebook">
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
            <a href="#" className="hover:text-pink-500" aria-label="Instagram">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a href="#" className="hover:text-blue-400" aria-label="Twitter">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a href="#" className="hover:text-blue-700" aria-label="LinkedIn">
              <FontAwesomeIcon icon={faLinkedinIn} />
            </a>
          </div>
          <p className="mt-4 text-sm text-gray-500">Email: support@vhawker.com</p>
        </div>
      </div>

      <div className="text-center text-sm text-gray-500 py-4 border-t">
        © {new Date().getFullYear()} Vhawker. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
