import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../../../context/AuthContext";
import { RefreshCw } from "lucide-react";

const API_BASE = "https://wiki-backend-658m.onrender.com";

export default function ChangeInfo({ setActiveTab }) {
  const { user, updateUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    gender: user?.gender || "Male",
    address: user?.address || "",
    bio: user?.bio || ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.put(`${API_BASE}/api/user/profile`, formData);
      if (res.data?.status) {
        updateUser(formData);
        toast.success("Profile information updated!");
        if (setActiveTab) setActiveTab("profile");
      }
    } catch (err) {
      toast.error(err.response?.data?.msg || "Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#0a1128] p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl max-w-2xl">
      <h3 className="text-xl font-bold text-white mb-2">Edit Member Information</h3>
      <p className="text-xs text-gray-400 mb-6">Keep your contact and delivery information up to date.</p>

      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <div>
          <label className="block text-amber-500 font-bold mb-1 uppercase">Full Name</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 bg-[#111c44] text-white rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-amber-500 font-bold mb-1 uppercase">Phone Number</label>
            <input
              type="text"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+91 9876543210"
              className="w-full px-4 py-3 bg-[#111c44] text-white rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="block text-amber-500 font-bold mb-1 uppercase">Gender</label>
            <select
              value={formData.gender}
              onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
              className="w-full px-4 py-3 bg-[#111c44] text-white rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-amber-500 font-bold mb-1 uppercase">Delivery Address</label>
          <input
            type="text"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            placeholder="Street address, city, state, pin code"
            className="w-full px-4 py-3 bg-[#111c44] text-white rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>

        <div>
          <label className="block text-amber-500 font-bold mb-1 uppercase">Connoisseur Bio</label>
          <textarea
            rows="3"
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            placeholder="Tell us about your spirit preferences..."
            className="w-full px-4 py-3 bg-[#111c44] text-white rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-amber-500"
          ></textarea>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold rounded-xl transition-all shadow-lg shadow-amber-900/30 flex items-center gap-2"
          >
            {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : null}
            Save Profile Changes
          </button>
        </div>
      </form>
    </div>
  );
}
