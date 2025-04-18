import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Bell, User, ChevronDown, Menu, X } from 'lucide-react';

interface HeaderProps {
  user: any;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Don't render full header on login/signup pages
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  if (isAuthPage) {
    return (
      <header className="fixed w-full z-50 py-4 px-4 md:px-12 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img 
            src="https://assets.nflxext.com/en_us/layout/ecweb/common/logo-shadow2x.png"
            alt="Netflix"
            className="h-5 md:h-7"
          />
        </Link>
      </header>
    );
  }

  return (
    <header
      className={`fixed w-full z-50 px-4 md:px-16 py-4 flex items-center justify-between transition-colors duration-300 ${
        isScrolled ? 'bg-netflix-black' : 'bg-gradient-to-b from-black/80 to-transparent'
      }`}
    >
      <div className="flex items-center space-x-8">
        <div className="flex items-center">
          {/* Mobile menu button */}
          <button 
            className="mr-4 md:hidden" 
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            aria-label="Toggle menu"
          >
            {showMobileMenu ? (
              <X className="h-6 w-6 text-white" />
            ) : (
              <Menu className="h-6 w-6 text-white" />
            )}
          </button>
          
          {/* Netflix Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src="https://assets.nflxext.com/en_us/layout/ecweb/common/logo-shadow2x.png"
              alt="Netflix"
              className="h-5 md:h-7"
            />
          </Link>
        </div>
        
        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex">
          <ul className="flex space-x-4 lg:space-x-8">
            <li><Link to="/" className="text-white text-sm hover:text-gray-300 transition">Home</Link></li>
            <li><Link to="/series" className="text-white/80 text-sm hover:text-white transition">Series</Link></li>
            <li><Link to="/movies" className="text-white/80 text-sm hover:text-white transition">Movies</Link></li>
            <li><Link to="/new" className="text-white/80 text-sm hover:text-white transition">New & Popular</Link></li>
            <li><Link to="/mylist" className="text-white/80 text-sm hover:text-white transition">My List</Link></li>
            <li><Link to="/browse" className="text-white/80 text-sm hover:text-white transition">Browse by Languages</Link></li>
            <li><Link to="/scene-finder" className="text-netflix-red text-sm font-bold hover:text-red-700 transition">Scene Finder</Link></li>
          </ul>
        </nav>
      </div>
      
      {/* Mobile Menu Dropdown */}
      {showMobileMenu && (
        <div className="absolute top-full left-0 w-full bg-netflix-black border-t border-gray-800 md:hidden animate-slide-up">
          <ul className="py-4 px-8 space-y-4">
            <li><Link to="/" className="block text-white text-sm py-1" onClick={() => setShowMobileMenu(false)}>Home</Link></li>
            <li><Link to="/series" className="block text-white/80 text-sm py-1" onClick={() => setShowMobileMenu(false)}>Series</Link></li>
            <li><Link to="/movies" className="block text-white/80 text-sm py-1" onClick={() => setShowMobileMenu(false)}>Movies</Link></li>
            <li><Link to="/new" className="block text-white/80 text-sm py-1" onClick={() => setShowMobileMenu(false)}>New & Popular</Link></li>
            <li><Link to="/mylist" className="block text-white/80 text-sm py-1" onClick={() => setShowMobileMenu(false)}>My List</Link></li>
            <li><Link to="/browse" className="block text-white/80 text-sm py-1" onClick={() => setShowMobileMenu(false)}>Browse by Languages</Link></li>
            <li><Link to="/scene-finder" className="block text-netflix-red text-sm font-bold py-1" onClick={() => setShowMobileMenu(false)}>Scene Finder</Link></li>
          </ul>
        </div>
      )}
      
      {/* Right side icons */}
      <div className="flex items-center space-x-4">
        <button aria-label="Search" className="text-white">
          <Search className="h-5 w-5" />
        </button>
        <Link to="/notifications" className="text-white">
          <Bell className="h-5 w-5" />
        </Link>
        
        {/* User profile dropdown */}
        <div className="relative">
          <button 
            className="flex items-center space-x-1 text-white" 
            onClick={() => setShowUserMenu(!showUserMenu)}
            aria-label="User menu"
          >
            <span className="h-6 w-6 bg-netflix-red rounded text-white flex items-center justify-center">
              <User className="h-4 w-4" />
            </span>
            <ChevronDown className={`h-4 w-4 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
          </button>
          
          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-netflix-black border border-gray-800 rounded shadow-lg py-2 animate-fade-in">
              <div className="px-4 py-2 border-b border-gray-800">
                <p className="text-white text-sm font-semibold">{user?.name || 'User'}</p>
                <p className="text-gray-400 text-xs">{user?.email || 'user@example.com'}</p>
              </div>
              <ul>
                <li><Link to="/account" className="block px-4 py-2 text-sm text-white hover:bg-gray-800 transition">Account</Link></li>
                <li><Link to="/help" className="block px-4 py-2 text-sm text-white hover:bg-gray-800 transition">Help Center</Link></li>
                <li><button onClick={onLogout} className="w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-800 transition">Sign out of Netflix</button></li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;