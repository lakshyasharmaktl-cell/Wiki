import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  GlassWater,
  Beer,
  Martini,
  Sun,
  Moon,
  ChevronDown,
  Menu,
  LogIn,
  UserPlus,
  X,
  ShoppingBag,
  Sparkles,
  ShieldCheck,
  Flame,
  Wine,
  Compass
} from 'lucide-react';
import Profile from './Profile';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useTheme } from '../../context/ThemeContext';

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileActiveDropdown, setMobileActiveDropdown] = useState(null);
  const dropdownRef = useRef(null);
  const mobileDropdownRef = useRef(null);
  const [hoverTimeout, setHoverTimeout] = useState(null);

  const { isAuthenticated, user, isAdmin } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const MenuData = [
    { 
      name: "Vault & Shop",
      icon: Compass,
      dropdown: [
        { name: "Browse Entire Vault", link: "/shop", badge: "All" },
        { name: "The Macallan (Special)", link: "/the-macallan", badge: "Exclusive" },
        { name: "Single Malt Scotches", link: "/shop?category=whisky&sub=Single Malt" },
        { name: "Japanese & Rare Whiskies", link: "/shop?category=whisky&sub=Japanese" },
        { name: "Artisanal Mocktails", link: "/shop?category=mocktails" },
        { name: "Craft Beers & Premium Spirits", link: "/shop?category=beers" },
        { name: "Curated Best Sellers", link: "/shop?filter=bestseller" }
      ]
    },
    { 
      name: "The Macallan", 
      link: "/the-macallan",
      icon: GlassWater
    },
    {
      name: "Journal",
      link: "/blog",
      icon: Sparkles
    },
    {
      name: "VIP Concierge",
      link: "/contact-us",
      icon: ShieldCheck
    }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
      if (mobileDropdownRef.current && !mobileDropdownRef.current.contains(event.target)) {
        setMobileActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location.pathname, location.search]);

  const handleMouseEnter = (index) => {
    if (hoverTimeout) clearTimeout(hoverTimeout);
    setActiveDropdown(index);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setActiveDropdown(null);
    }, 180);
    setHoverTimeout(timeout);
  };

  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  const toggleMobileDropdown = (index) => {
    setMobileActiveDropdown(mobileActiveDropdown === index ? null : index);
  };

  const closeAllMenus = () => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
    setMobileActiveDropdown(null);
  };

  return (
    <header className="fixed w-full top-0 z-50">
      <nav className="flex items-center justify-between px-6 sm:px-10 lg:px-16 py-4 bg-[#050a15]/95 backdrop-blur-xl text-white border-b border-white/10 shadow-2xl transition-all duration-300">
        
        {/* Brand & Mobile Hamburger */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-amber-400"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <Link to="/" className="flex items-center gap-3 group" onClick={closeAllMenus}>
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 text-slate-950 shadow-lg shadow-amber-600/30 group-hover:scale-105 transition-transform">
              <GlassWater className="w-5 h-5 font-bold" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-serif font-black tracking-wider text-white group-hover:text-amber-400 transition-colors leading-none">
                WHISKY<span className="text-amber-500">HUB</span>
              </span>
              <span className="text-[9px] font-sans font-bold tracking-[0.28em] text-amber-400/80 mt-0.5">
                PREMIUM RESERVE
              </span>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation Links & Dropdowns */}
        <div className="hidden lg:flex items-center gap-6 justify-center" ref={dropdownRef}>
          {MenuData.map((item, index) => (
            <div 
              key={item.name} 
              className="relative"
              onMouseEnter={() => item.dropdown && handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              {item.dropdown ? (
                <div>
                  <button
                    onClick={() => toggleDropdown(index)}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all group ${
                      activeDropdown === index ? 'bg-amber-500/10 text-amber-400' : 'text-gray-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <item.icon className="text-amber-400 group-hover:scale-110 transition-transform w-4 h-4" />
                    <span>{item.name}</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === index ? 'rotate-180 text-amber-400' : 'text-gray-400'}`} />
                  </button>

                  <AnimatePresence>
                    {activeDropdown === index && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.96 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-0 mt-2 w-72 bg-[#0a1128] rounded-2xl shadow-2xl border border-white/10 overflow-hidden z-50 p-2.5 backdrop-blur-2xl"
                        onMouseEnter={() => handleMouseEnter(index)}
                        onMouseLeave={handleMouseLeave}
                      >
                        <div className="space-y-1">
                          {item.dropdown.map((subItem) => (
                            <Link
                              key={subItem.name}
                              to={subItem.link}
                              onClick={closeAllMenus}
                              className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold text-gray-300 hover:text-amber-300 hover:bg-white/5 transition-all group"
                            >
                              <span>{subItem.name}</span>
                              {subItem.badge && (
                                <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-400 border border-amber-500/30">
                                  {subItem.badge}
                                </span>
                              )}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  to={item.link}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider text-gray-300 hover:text-white hover:bg-white/5 transition-all group"
                >
                  <item.icon className="text-amber-400 group-hover:scale-110 transition-transform w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              )}
            </div>
          ))}
        </div>

        {/* Right Section: Admin Badge, Cart & Auth */}
        <div className="flex items-center gap-3.5">
          
          {/* Admin Control Center Link (if admin) */}
          {isAdmin && (
            <Link
              to="/admin"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/10 border border-amber-500/30 hover:bg-amber-500/20 text-amber-400 rounded-xl text-xs font-bold tracking-wide transition-all shadow-md active:scale-95"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>Admin Portal</span>
            </Link>
          )}

          {/* Cart Icon with Live Badge */}
          <Link
            to="/cart"
            className="relative p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-amber-400 hover:text-amber-300 transition-all"
            aria-label="View Shopping Cart"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 text-[10px] font-black rounded-full h-4 min-w-4 px-1 flex items-center justify-center shadow-md animate-pulse">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Quick Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-amber-400 hover:text-amber-300 transition-all"
            aria-label="Toggle Theme"
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* User Auth or Profile Dropdown */}
          {isAuthenticated ? (
            <Profile />
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/user-login"
                className="hidden sm:flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-gray-200 hover:text-white rounded-xl hover:bg-white/5 transition-all"
              >
                <LogIn className="w-3.5 h-3.5 text-amber-400" />
                <span>Sign In</span>
              </Link>
              <Link
                to="/create-account"
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 rounded-xl transition-all shadow-md shadow-amber-900/30 active:scale-95"
              >
                <UserPlus className="w-3.5 h-3.5 font-bold" />
                <span>Join Club</span>
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 z-50 bg-black/70 backdrop-blur-md"
            onClick={closeAllMenus}
          >
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="absolute top-0 left-0 h-full w-4/5 max-w-sm bg-[#0a1128] border-r border-white/10 shadow-2xl p-6 overflow-y-auto flex flex-col justify-between"
              onClick={(e) => e.stopPropagation()}
              ref={mobileDropdownRef}
            >
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-6">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-amber-500 text-slate-950">
                      <GlassWater className="w-5 h-5 font-bold" />
                    </div>
                    <div>
                      <span className="text-base font-serif font-black text-white">WHISKYHUB</span>
                      <p className="text-[9px] text-amber-400 font-bold uppercase tracking-widest">Reserve Lounge</p>
                    </div>
                  </div>
                  <button onClick={closeAllMenus} className="p-2 rounded-xl bg-white/5 text-gray-400 hover:text-white">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Mobile Navigation Links */}
                <div className="space-y-1">
                  {MenuData.map((item, index) => (
                    <div key={item.name} className="border-b border-white/5 last:border-b-0 pb-1">
                      {item.dropdown ? (
                        <div>
                          <button
                            onClick={() => toggleMobileDropdown(index)}
                            className="flex items-center justify-between w-full px-3 py-2.5 rounded-xl text-sm font-semibold text-white hover:bg-white/5 transition-colors"
                          >
                            <div className="flex items-center gap-2.5">
                              <item.icon className="w-4 h-4 text-amber-400" />
                              <span>{item.name}</span>
                            </div>
                            <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${mobileActiveDropdown === index ? 'rotate-180 text-amber-400' : ''}`} />
                          </button>
                          {mobileActiveDropdown === index && (
                            <div className="ml-6 space-y-1 py-1 border-l-2 border-amber-500/30 pl-2">
                              {item.dropdown.map((sub) => (
                                <Link
                                  key={sub.name}
                                  to={sub.link}
                                  onClick={closeAllMenus}
                                  className="block px-3 py-2 text-xs font-medium text-gray-300 hover:text-amber-300 hover:bg-white/5 rounded-lg"
                                >
                                  {sub.name}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      ) : (
                        <Link
                          to={item.link}
                          onClick={closeAllMenus}
                          className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-semibold text-white hover:bg-white/5 transition-colors"
                        >
                          <item.icon className="w-4 h-4 text-amber-400" />
                          <span>{item.name}</span>
                        </Link>
                      )}
                    </div>
                  ))}

                  {isAdmin && (
                    <Link
                      to="/admin"
                      onClick={closeAllMenus}
                      className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-bold text-red-400 bg-red-950/30 border border-red-500/30 mt-2"
                    >
                      <ShieldCheck className="w-4 h-4" />
                      <span>Admin Control Center</span>
                    </Link>
                  )}
                </div>
              </div>

              {/* Mobile Footer Auth */}
              <div className="pt-6 border-t border-white/10 mt-6">
                {isAuthenticated ? (
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 p-3 bg-white/5 rounded-2xl mb-2">
                      <img
                        src={user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300"}
                        alt="Profile"
                        className="w-10 h-10 rounded-full object-cover border border-amber-400/40"
                      />
                      <div className="overflow-hidden">
                        <p className="text-xs font-bold text-white truncate">{user?.name}</p>
                        <p className="text-[10px] text-amber-400 truncate">{user?.email}</p>
                      </div>
                    </div>
                    <Link
                      to="/dashboard"
                      onClick={closeAllMenus}
                      className="block text-center py-2.5 bg-blue-900/60 hover:bg-blue-800 text-white rounded-xl text-xs font-bold"
                    >
                      Open User Dashboard
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      to="/user-login"
                      onClick={closeAllMenus}
                      className="py-2.5 text-center bg-white/5 hover:bg-white/10 text-white font-bold text-xs rounded-xl"
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/create-account"
                      onClick={closeAllMenus}
                      className="py-2.5 text-center bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl"
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
