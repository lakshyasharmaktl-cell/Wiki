import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../../../context/AuthContext";
import { Image, Check, RefreshCw } from "lucide-react";

const API_BASE = "http://localhost:1234";

const PRESET_AVATARS = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300",
  "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=300",
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300",
  "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=300"
];

export default function ChangeImg() {
  const { user, updateUser } = useAuth();
  const [selectedAvatar, setSelectedAvatar] = useState(user?.avatar || PRESET_AVATARS[0]);
  const [customUrl, setCustomUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSaveAvatar = async (urlToSave) => {
    const finalUrl = urlToSave || customUrl || selectedAvatar;
    setLoading(true);
    try {
      const res = await axios.put(`${API_BASE}/api/user/change-avatar`, { avatarUrl: finalUrl });
      if (res.data?.status) {
        updateUser({ avatar: finalUrl });
        toast.success("Profile avatar updated!");
      }
    } catch (err) {
      toast.error("Failed to update avatar.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#0a1128] p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl max-w-2xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 bg-purple-500/10 text-purple-400 rounded-xl">
          <Image className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">Choose Profile Portrait</h3>
          <p className="text-xs text-gray-400">Select a curated connoisseur avatar or enter a custom image URL.</p>
        </div>
      </div>

      <div className="flex items-center gap-6 mb-8 p-4 bg-white/5 rounded-2xl">
        <img
          src={selectedAvatar}
          alt="Current Selected"
          className="w-20 h-20 rounded-2xl object-cover border-2 border-amber-400 shadow-xl"
        />
        <div>
          <p className="text-xs font-bold text-white">Active Avatar Preview</p>
          <p className="text-[10px] text-gray-400">Will be displayed on your member card and reviews.</p>
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-xs font-bold text-amber-500 uppercase mb-3">Curated Portraits</label>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {PRESET_AVATARS.map((url, i) => (
            <button
              key={i}
              type="button"
              onClick={() => { setSelectedAvatar(url); handleSaveAvatar(url); }}
              className={`relative rounded-2xl overflow-hidden border-2 transition-all group ${
                selectedAvatar === url ? "border-amber-400 scale-105" : "border-white/10 hover:border-white/30"
              }`}
            >
              <img src={url} alt={`Avatar ${i + 1}`} className="w-full h-16 object-cover" />
              {selectedAvatar === url && (
                <div className="absolute inset-0 bg-amber-500/30 flex items-center justify-center text-amber-300">
                  <Check className="w-5 h-5" />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="pt-4 border-t border-white/10">
        <label className="block text-xs font-bold text-amber-500 uppercase mb-2">Or Paste Custom Image URL</label>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="https://..."
            value={customUrl}
            onChange={(e) => setCustomUrl(e.target.value)}
            className="flex-1 px-4 py-2.5 bg-[#111c44] text-white text-xs rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          <button
            type="button"
            disabled={loading || !customUrl}
            onClick={() => handleSaveAvatar(customUrl)}
            className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl transition-all disabled:opacity-50"
          >
            Apply URL
          </button>
        </div>
      </div>
    </div>
  );
}
