import React from "react";
import { User, Mail, Phone, MapPin, Award, Calendar, ShieldCheck, Sparkles } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";

export default function UserProfileCard({ setActiveTab }) {
  const { user, isAdmin } = useAuth();

  return (
    <div className="space-y-6">
      {/* Profile Banner */}
      <div className="bg-gradient-to-r from-amber-950/40 via-blue-950 to-black p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-center gap-6 relative z-10">
          <img
            src={user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300"}
            alt={user?.name}
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl object-cover border-2 border-amber-400/50 shadow-xl"
          />
          <div className="text-center sm:text-left space-y-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h2 className="text-2xl font-bold text-white">{user?.name || "Connoisseur"}</h2>
              <span className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full ${
                isAdmin ? "bg-red-500/20 text-red-400 border border-red-500/30" : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
              }`}>
                {isAdmin ? "Master Distiller Admin" : "Platinum Tier Member"}
              </span>
            </div>
            <p className="text-xs text-gray-400">{user?.email}</p>
            <p className="text-xs text-amber-200/80 italic pt-1">{user?.bio || "Fine spirits enthusiast & WhiskyHub connoisseur."}</p>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center sm:text-left">
          <div>
            <span className="text-[10px] text-gray-400 uppercase font-bold">Reward Points</span>
            <p className="text-lg font-black text-amber-400">1,450 pts</p>
          </div>
          <div>
            <span className="text-[10px] text-gray-400 uppercase font-bold">Tastings Completed</span>
            <p className="text-lg font-black text-white">8 Sessions</p>
          </div>
          <div>
            <span className="text-[10px] text-gray-400 uppercase font-bold">Member Since</span>
            <p className="text-lg font-black text-white">2025</p>
          </div>
          <div>
            <span className="text-[10px] text-gray-400 uppercase font-bold">Status</span>
            <p className="text-lg font-black text-emerald-400 flex items-center justify-center sm:justify-start gap-1">
              <ShieldCheck className="w-4 h-4" /> Active VIP
            </p>
          </div>
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#0a1128] p-6 rounded-3xl border border-white/10 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <h3 className="font-bold text-sm text-white">Personal Information</h3>
            <button onClick={() => setActiveTab("info")} className="text-xs text-amber-400 hover:underline">
              Edit
            </button>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-gray-400 flex items-center gap-2"><User className="w-3.5 h-3.5 text-amber-400" /> Full Name:</span>
              <span className="font-semibold text-white">{user?.name}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400 flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-amber-400" /> Email:</span>
              <span className="font-semibold text-white">{user?.email}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400 flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-amber-400" /> Phone:</span>
              <span className="font-semibold text-white">{user?.phone || "Not provided"}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400 flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-amber-400" /> Delivery Address:</span>
              <span className="font-semibold text-white text-right max-w-[200px] truncate">{user?.address || "742 Model Town, Kaithal"}</span>
            </div>
          </div>
        </div>

        <div className="bg-[#0a1128] p-6 rounded-3xl border border-white/10 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <h3 className="font-bold text-sm text-white">Whisky Vault Privileges</h3>
            <Sparkles className="w-4 h-4 text-amber-400" />
          </div>

          <ul className="space-y-2.5 text-xs text-gray-300">
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-400"></div>
              <span>Exclusive access to Annual 2026 Reserve Casks</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-400"></div>
              <span>Free express temperature-managed courier shipping</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-400"></div>
              <span>Complimentary private tasting session every quarter</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-400"></div>
              <span>Direct line to Master Sommelier & Concierge</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
