import React, { useState, useEffect } from "react";
import { 
  User, 
  ShoppingBag, 
  KeyRound, 
  Mail, 
  Image, 
  Sliders, 
  Trash2, 
  LogOut,
  ShieldCheck,
  ChevronRight,
  PackageCheck
} from "lucide-react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

import UserProfileCard from "./User/Profile";
import ChangeInfo from "./User/ChangeInfo";
import ChangePassword from "./User/ChangePassword";
import ChangeEmail from "./User/ChangeEmail";
import ChangeImg from "./User/ChangeImg";
import Setting from "./User/Setting";
import Delete from "./User/Delete";

const API_BASE = "https://wiki-backend-658m.onrender.com";

export default function Homebashboard() {
  const { user, isAuthenticated, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("profile");
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/user-login");
      return;
    }
    fetchUserOrders();
  }, [isAuthenticated]);

  const fetchUserOrders = async () => {
    try {
      setLoadingOrders(true);
      const res = await axios.get(`${API_BASE}/api/user/orders`);
      if (res.data?.status) {
        setOrders(res.data.orders);
      }
    } catch (e) {
      console.error("Failed to load user orders", e);
    } finally {
      setLoadingOrders(false);
    }
  };

  const navItems = [
    { id: "profile", label: "My Profile", icon: User },
    { id: "orders", label: `My Orders (${orders.length})`, icon: ShoppingBag },
    { id: "info", label: "Edit Information", icon: User },
    { id: "avatar", label: "Profile Portrait", icon: Image },
    { id: "password", label: "Change Password", icon: KeyRound },
    { id: "email", label: "Update Email", icon: Mail },
    { id: "settings", label: "Preferences", icon: Sliders },
    { id: "delete", label: "Close Account", icon: Trash2, danger: true },
  ];

  return (
    <div className="min-h-screen bg-[#040814] text-gray-200 font-sans pt-24 pb-16 px-4 sm:px-8 max-w-7xl mx-auto">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-amber-950/30 via-[#0a1128] to-blue-950/30 p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl mb-8">
        <div>
          <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest">Connoisseur Lounge</span>
          <h1 className="text-3xl font-serif font-black text-white mt-0.5">Member Dashboard</h1>
          <p className="text-xs text-gray-400 mt-1">Manage your spirit cellar allocations, personal profile & orders.</p>
        </div>

        {isAdmin && (
          <button
            onClick={() => navigate("/admin")}
            className="flex items-center gap-2 px-4 py-2.5 bg-red-950/60 hover:bg-red-900 border border-red-500/40 text-red-300 font-bold text-xs rounded-2xl transition-all shadow-lg"
          >
            <ShieldCheck className="w-4 h-4 text-red-400" />
            <span>Open Distiller Admin Panel</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Left Sidebar Nav */}
        <div className="lg:col-span-1 space-y-2">
          <div className="bg-[#0a1128] p-4 rounded-3xl border border-white/10 shadow-xl space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
                  activeTab === item.id
                    ? "bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md shadow-amber-900/30"
                    : item.danger
                    ? "text-red-400/80 hover:bg-red-950/20 hover:text-red-400"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                <ChevronRight className={`w-3.5 h-3.5 transition-transform ${activeTab === item.id ? "rotate-90 text-slate-950" : "text-gray-500"}`} />
              </button>
            ))}

            <div className="pt-2 border-t border-white/10 mt-2">
              <button
                onClick={logout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold text-red-400 hover:bg-red-950/30 transition-all"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Content Area */}
        <div className="lg:col-span-3">
          {activeTab === "profile" && <UserProfileCard setActiveTab={setActiveTab} />}
          
          {/* ORDERS TAB */}
          {activeTab === "orders" && (
            <div className="bg-[#0a1128] p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div>
                  <h3 className="text-xl font-bold text-white">Your Orders & Tastings</h3>
                  <p className="text-xs text-gray-400">Track and view history of your whisky allocations.</p>
                </div>
                <button
                  onClick={fetchUserOrders}
                  className="px-3 py-1.5 bg-white/5 hover:bg-white/10 text-xs font-bold text-amber-400 rounded-xl"
                >
                  Refresh Orders
                </button>
              </div>

              {orders.length === 0 ? (
                <div className="text-center py-16 space-y-4">
                  <div className="p-4 bg-white/5 text-gray-500 rounded-full w-16 h-16 mx-auto flex items-center justify-center">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <h4 className="text-base font-bold text-white">No Orders Placed Yet</h4>
                  <p className="text-xs text-gray-400 max-w-sm mx-auto">
                    Explore our curated collection of Single Malts, Rare Casks, and Spirits to place your first order.
                  </p>
                  <button
                    onClick={() => navigate("/shop")}
                    className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-amber-900/30 transition-all"
                  >
                    Explore Spirit Catalog
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((ord) => (
                    <div key={ord._id} className="p-5 bg-white/5 rounded-2xl border border-white/10 space-y-4">
                      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-white/10 text-xs">
                        <div>
                          <span className="text-gray-400">Order Ref: </span>
                          <span className="font-mono font-bold text-white">#{ord._id?.slice(-8)}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase ${
                            ord.orderStatus === 'Delivered'
                              ? "bg-emerald-500/20 text-emerald-400"
                              : "bg-amber-500/20 text-amber-400"
                          }`}>
                            {ord.orderStatus}
                          </span>
                          <span className="text-gray-400">
                            {new Date(ord.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        {ord.items?.map((it, i) => (
                          <div key={i} className="flex items-center justify-between text-xs">
                            <span className="text-white font-medium">{it.name} <span className="text-amber-400">x{it.quantity}</span></span>
                            <span className="font-bold text-white">₹{(it.price * it.quantity)?.toLocaleString()}</span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                        <span className="text-gray-400">Payment: {ord.paymentMethod} ({ord.paymentStatus})</span>
                        <span className="text-base font-black text-amber-400">Total: ₹{ord.totalAmount?.toLocaleString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "info" && <ChangeInfo setActiveTab={setActiveTab} />}
          {activeTab === "avatar" && <ChangeImg />}
          {activeTab === "password" && <ChangePassword />}
          {activeTab === "email" && <ChangeEmail />}
          {activeTab === "settings" && <Setting />}
          {activeTab === "delete" && <Delete />}
        </div>

      </div>
    </div>
  );
}
