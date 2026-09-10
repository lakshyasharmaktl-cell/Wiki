import React, { useState } from "react";
import { toast } from "react-toastify";
import { Sliders, Bell, Shield, Moon, Sun } from "lucide-react";
import { useTheme } from "../../../context/ThemeContext";

export default function Setting() {
  const { isDark, toggleTheme } = useTheme();
  const [preferences, setPreferences] = useState({
    emailAlerts: true,
    tastingInvites: true,
    caskReleaseAlerts: true,
    twoFactor: false
  });

  const handleToggle = (key) => {
    setPreferences((prev) => {
      const updated = { ...prev, [key]: !prev[key] };
      toast.info("Preference updated");
      return updated;
    });
  };

  return (
    <div className="bg-[#0a1128] p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl max-w-2xl space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2.5 bg-amber-500/10 text-amber-400 rounded-xl">
          <Sliders className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">Member Preferences & Notifications</h3>
          <p className="text-xs text-gray-400">Configure how WhiskyHub communicates exclusive releases with you.</p>
        </div>
      </div>

      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl">
          <div className="space-y-0.5">
            <p className="text-xs font-bold text-white flex items-center gap-2">
              <Bell className="w-3.5 h-3.5 text-amber-400" /> Flash Sale & Discount Notifications
            </p>
            <p className="text-[10px] text-gray-400">Receive private alerts for limited 24-hour deals</p>
          </div>
          <input
            type="checkbox"
            checked={preferences.emailAlerts}
            onChange={() => handleToggle("emailAlerts")}
            className="w-4 h-4 accent-amber-500 cursor-pointer"
          />
        </div>

        <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl">
          <div className="space-y-0.5">
            <p className="text-xs font-bold text-white flex items-center gap-2">
              <Shield className="w-3.5 h-3.5 text-amber-400" /> Masterclass Tasting Invitations
            </p>
            <p className="text-[10px] text-gray-400">Invitations to exclusive Speyside & Islay virtual tastings</p>
          </div>
          <input
            type="checkbox"
            checked={preferences.tastingInvites}
            onChange={() => handleToggle("tastingInvites")}
            className="w-4 h-4 accent-amber-500 cursor-pointer"
          />
        </div>

        <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl">
          <div className="space-y-0.5">
            <p className="text-xs font-bold text-white flex items-center gap-2">
              <Moon className="w-3.5 h-3.5 text-amber-400" /> Rare Cask Allocation Alerts
            </p>
            <p className="text-[10px] text-gray-400">Priority reservations when single casks are bottled</p>
          </div>
          <input
            type="checkbox"
            checked={preferences.caskReleaseAlerts}
            onChange={() => handleToggle("caskReleaseAlerts")}
            className="w-4 h-4 accent-amber-500 cursor-pointer"
          />
        </div>

        {/* Visual Appearance Theme Mode */}
        <div className="flex items-center justify-between p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl mt-4">
          <div className="space-y-0.5">
            <p className="text-xs font-bold text-amber-400 flex items-center gap-2">
              {isDark ? <Moon className="w-3.5 h-3.5 text-amber-400" /> : <Sun className="w-3.5 h-3.5 text-amber-400" />} Platform Appearance Mode
            </p>
            <p className="text-[10px] text-gray-300">Currently active: <strong className="uppercase text-amber-300">{isDark ? "Dark Luxury Obsidian" : "Light Connoisseur Mode"}</strong></p>
          </div>
          <button
            onClick={toggleTheme}
            type="button"
            className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-bold rounded-xl shadow-md transition-all active:scale-95"
          >
            {isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          </button>
        </div>
      </div>
    </div>
  );
}
