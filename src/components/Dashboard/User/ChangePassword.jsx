import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Lock, RefreshCw, KeyRound } from "lucide-react";

const API_BASE = "https://wiki-backend-658m.onrender.com";

export default function ChangePassword() {
  const [loading, setLoading] = useState(false);
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmPassword) {
      toast.error("New passwords do not match!");
      return;
    }
    if (passwords.newPassword.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.put(`${API_BASE}/api/user/change-password`, {
        currentPassword: passwords.currentPassword,
        newPassword: passwords.newPassword
      });
      if (res.data?.status) {
        toast.success("Security password updated successfully!");
        setPasswords({ currentPassword: "", newPassword: "", confirmPassword: "" });
      }
    } catch (err) {
      toast.error(err.response?.data?.msg || "Failed to update password. Verify your current password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#0a1128] p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl max-w-2xl">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2.5 bg-amber-500/10 text-amber-400 rounded-xl">
          <KeyRound className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">Change Security Password</h3>
          <p className="text-xs text-gray-400">Ensure your account uses a strong passphrase.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 mt-6 text-xs">
        <div>
          <label className="block text-amber-500 font-bold mb-1 uppercase">Current Password</label>
          <input
            type="password"
            required
            value={passwords.currentPassword}
            onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })}
            placeholder="••••••••"
            className="w-full px-4 py-3 bg-[#111c44] text-white rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>

        <div>
          <label className="block text-amber-500 font-bold mb-1 uppercase">New Password</label>
          <input
            type="password"
            required
            value={passwords.newPassword}
            onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
            placeholder="••••••••"
            className="w-full px-4 py-3 bg-[#111c44] text-white rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>

        <div>
          <label className="block text-amber-500 font-bold mb-1 uppercase">Confirm New Password</label>
          <input
            type="password"
            required
            value={passwords.confirmPassword}
            onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
            placeholder="••••••••"
            className="w-full px-4 py-3 bg-[#111c44] text-white rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>

        <div className="flex justify-end pt-4 border-t border-white/10">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold rounded-xl transition-all shadow-lg shadow-amber-900/30 flex items-center gap-2"
          >
            {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : null}
            Update Password
          </button>
        </div>
      </form>
    </div>
  );
}
