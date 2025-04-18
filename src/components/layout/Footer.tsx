import React from 'react';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-netflix-black pt-8 pb-8 px-4 md:px-16 mt-auto">
      <div className="max-w-7xl mx-auto">
        {/* Social Media Links */}
        <div className="flex space-x-6 mb-6">
          <a href="https://facebook.com/netflix" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <Facebook className="h-6 w-6 text-gray-500 hover:text-white transition" />
          </a>
          <a href="https://instagram.com/netflix" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <Instagram className="h-6 w-6 text-gray-500 hover:text-white transition" />
          </a>
          <a href="https://twitter.com/netflix" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <Twitter className="h-6 w-6 text-gray-500 hover:text-white transition" />
          </a>
          <a href="https://youtube.com/netflix" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
            <Youtube className="h-6 w-6 text-gray-500 hover:text-white transition" />
          </a>
        </div>
        
        {/* Footer Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-6">
          <ul className="space-y-3">
            <li><Link to="/audio-description" className="text-gray-500 hover:text-white transition">Audio Description</Link></li>
            <li><Link to="/investor-relations" className="text-gray-500 hover:text-white transition">Investor Relations</Link></li>
            <li><Link to="/legal-notices" className="text-gray-500 hover:text-white transition">Legal Notices</Link></li>
          </ul>
          <ul className="space-y-3">
            <li><Link to="/help" className="text-gray-500 hover:text-white transition">Help Center</Link></li>
            <li><Link to="/jobs" className="text-gray-500 hover:text-white transition">Jobs</Link></li>
            <li><Link to="/cookie-preferences" className="text-gray-500 hover:text-white transition">Cookie Preferences</Link></li>
          </ul>
          <ul className="space-y-3">
            <li><Link to="/gift-cards" className="text-gray-500 hover:text-white transition">Gift Cards</Link></li>
            <li><Link to="/terms" className="text-gray-500 hover:text-white transition">Terms of Use</Link></li>
            <li><Link to="/corporate-info" className="text-gray-500 hover:text-white transition">Corporate Information</Link></li>
          </ul>
          <ul className="space-y-3">
            <li><Link to="/media-center" className="text-gray-500 hover:text-white transition">Media Center</Link></li>
            <li><Link to="/privacy" className="text-gray-500 hover:text-white transition">Privacy</Link></li>
            <li><Link to="/contact" className="text-gray-500 hover:text-white transition">Contact Us</Link></li>
          </ul>
        </div>
        
        {/* Service Code Button */}
        <button className="border border-gray-600 text-gray-500 text-xs px-2 py-1 mb-4 hover:text-white transition">
          Service Code
        </button>
        
        {/* Copyright */}
        <p className="text-gray-500 text-xs">
          © 1997-{new Date().getFullYear()} Netflix, Inc.
        </p>
      </div>
    </footer>
  );
};

export default Footer;