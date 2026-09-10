import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../../../context/AuthContext";
import { Mail, RefreshCw } from "lucide-react";

const API_BASE = "https://wiki-backend-658m.onrender.com";

export default function ChangeEmail() {
  const { user, updateUser } = useAuth();
  const [newEmail, setNewEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newEmail || newEmail.toLowerCase() === user?.email.toLowerCase()) {
      toast.warning("Please enter a new email address.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.put(`${API_BASE}/api/user/change-email`, { newEmail });
      if (res.data?.status) {
        updateUser({ email: newEmail });
        toast.success("Email address updated successfully!");
        setNewEmail("");
      }
    } catch (err) {
      toast.error(err.response?.data?.msg || "Failed to update email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#0a1128] p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl max-w-2xl">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2.5 bg-blue-500/10 text-blue-400 rounded-xl">
          <Mail className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">Update Registered Email</h3>
          <p className="text-xs text-gray-400">Current email: <span className="text-amber-400 font-semibold">{user?.email}</span></p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 mt-6 text-xs">
        <div>
          <label className="block text-amber-500 font-bold mb-1 uppercase">New Email Address</label>
          <input
            type="email"
            required
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            placeholder="newemail@whiskyhub.com"
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
            Save New Email
          </button>
        </div>
      </form>
    </div>
  );
}
