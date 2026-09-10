import React from 'react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { CgProfile, CgLogOut } from "react-icons/cg";
import { SiGmail } from "react-icons/si";
import { MdOutlineDarkMode, MdOutlineLightMode, MdAdminPanelSettings } from "react-icons/md";
import { FiSettings, FiShoppingBag, FiShield } from "react-icons/fi";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

export default function Profile() {
  const { user, logout, isAdmin } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="relative">
      <Menu as="div" className="relative ml-2">
        <MenuButton className="relative flex items-center gap-2 rounded-full focus:outline-none ring-2 ring-amber-500/40 hover:ring-amber-400 transition-all p-0.5 bg-blue-950">
          <img
            alt={user?.name || "Profile"}
            src={user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300"}
            className="size-9 rounded-full object-cover border border-amber-400/30"
          />
        </MenuButton>

        <MenuItems
          transition
          className="absolute right-0 z-50 mt-3 w-64 origin-top-right rounded-2xl bg-[#0a1128] py-2 shadow-2xl border border-white/10 transition data-closed:scale-95 data-closed:opacity-0 data-enter:duration-100 data-leave:duration-75 text-white"
        >
          {/* User Info Header */}
          <div className="px-4 py-3 border-b border-white/10">
            <div className="flex gap-3 items-center mb-2">
              <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
                <CgProfile className="text-xl" />
              </div>
              <div className="overflow-hidden">
                <h1 className="font-bold text-sm text-white truncate">{user?.name || "Connoisseur"}</h1>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                    isAdmin ? "bg-red-600/30 text-red-400 border border-red-500/40" : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                  }`}>
                    {isAdmin ? "Admin Master" : "VIP Member"}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-2 items-center text-xs text-gray-400">
              <SiGmail className="text-amber-400 shrink-0" />
              <span className="truncate">{user?.email || "member@whiskyhub.com"}</span>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-1">
            {/* User Dashboard */}
            <MenuItem>
              {({ active }) => (
                <Link
                  to="/dashboard"
                  className={`flex items-center gap-3 px-4 py-2.5 text-xs font-semibold transition-colors ${
                    active ? 'bg-blue-800/40 text-amber-400' : 'text-gray-300'
                  }`}
                >
                  <CgProfile className="text-base text-amber-400" />
                  <span>User Dashboard</span>
                </Link>
              )}
            </MenuItem>

            {/* Admin Panel (if admin) */}
            {isAdmin && (
              <MenuItem>
                {({ active }) => (
                  <Link
                    to="/admin"
                    className={`flex items-center gap-3 px-4 py-2.5 text-xs font-semibold transition-colors ${
                      active ? 'bg-red-950/40 text-red-400' : 'text-red-300'
                    }`}
                  >
                    <MdAdminPanelSettings className="text-base text-red-400" />
                    <span>Admin Control Center</span>
                  </Link>
                )}
              </MenuItem>
            )}

            {/* My Orders */}
            <MenuItem>
              {({ active }) => (
                <Link
                  to="/dashboard/orders"
                  className={`flex items-center gap-3 px-4 py-2.5 text-xs font-semibold transition-colors ${
                    active ? 'bg-blue-800/40 text-amber-400' : 'text-gray-300'
                  }`}
                >
                  <FiShoppingBag className="text-base text-amber-400" />
                  <span>My Orders & Tastings</span>
                </Link>
              )}
            </MenuItem>

            {/* Settings */}
            <MenuItem>
              {({ active }) => (
                <Link
                  to="/dashboard/settings"
                  className={`flex items-center gap-3 px-4 py-2.5 text-xs font-semibold transition-colors ${
                    active ? 'bg-blue-800/40 text-amber-400' : 'text-gray-300'
                  }`}
                >
                  <FiSettings className="text-base text-amber-400" />
                  <span>Account Settings</span>
                </Link>
              )}
            </MenuItem>

            {/* Theme Toggle */}
            <MenuItem>
              {({ active }) => (
                <button
                  onClick={toggleTheme}
                  className={`flex items-center gap-3 w-full px-4 py-2.5 text-xs font-semibold transition-colors ${
                    active ? 'bg-amber-500/20 text-amber-400' : 'text-gray-300'
                  }`}
                >
                  {isDark ? <MdOutlineLightMode className="text-base text-amber-400" /> : <MdOutlineDarkMode className="text-base text-amber-400" />}
                  <span>{isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}</span>
                </button>
              )}
            </MenuItem>

            <div className="border-t border-white/10 my-1"></div>

            {/* Sign out */}
            <MenuItem>
              {({ active }) => (
                <button
                  onClick={handleLogout}
                  className={`flex items-center gap-3 w-full px-4 py-2.5 text-xs font-semibold transition-colors text-red-400 ${
                    active ? 'bg-red-950/30' : ''
                  }`}
                >
                  <CgLogOut className="text-base" />
                  <span>Sign Out</span>
                </button>
              )}
            </MenuItem>
          </div>
        </MenuItems>
      </Menu>
    </div>
  );
}
