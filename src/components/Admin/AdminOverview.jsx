import React from "react";
import { 
  DollarSign, 
  Package, 
  Users, 
  ShoppingBag, 
  TrendingUp, 
  CheckCircle, 
  ShieldCheck, 
  Activity, 
  Database,
  ArrowUpRight,
  Sparkles,
  Zap
} from "lucide-react";

export default function AdminOverview({ stats, setActiveTab, handleOpenAddProduct }) {
  return (
    <div className="space-y-8">
      
      {/* 4 Main KPI Telemetry Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Gross Sales */}
        <div className="p-6 bg-[#0a1128] rounded-3xl border border-emerald-500/20 shadow-2xl relative overflow-hidden group hover:border-emerald-500/40 transition-all">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl group-hover:bg-emerald-500/10 transition-all pointer-events-none"></div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Gross Vault Revenue</span>
            <div className="p-2.5 bg-emerald-500/10 text-emerald-400 rounded-2xl border border-emerald-500/20">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <h3 className="text-3xl font-serif font-black text-white">₹{stats.totalRevenue?.toLocaleString()}</h3>
          <div className="flex items-center justify-between mt-3 text-xs">
            <span className="text-emerald-400 font-bold flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" /> +24.8% growth
            </span>
            <span className="text-gray-500 text-[10px]">Real-time orders</span>
          </div>
        </div>

        {/* Total Products */}
        <div className="p-6 bg-[#0a1128] rounded-3xl border border-amber-500/20 shadow-2xl relative overflow-hidden group hover:border-amber-500/40 transition-all">
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-2xl group-hover:bg-amber-500/10 transition-all pointer-events-none"></div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Spirit Cellar Stock</span>
            <div className="p-2.5 bg-amber-500/10 text-amber-400 rounded-2xl border border-amber-500/20">
              <Package className="w-5 h-5" />
            </div>
          </div>
          <h3 className="text-3xl font-serif font-black text-white">{stats.totalProducts} <span className="text-xs font-sans text-gray-400 font-normal">Bottles</span></h3>
          <div className="flex items-center justify-between mt-3 text-xs">
            <span className="text-amber-400 font-semibold">Active in Storefront</span>
            <button onClick={() => setActiveTab("products")} className="text-[10px] text-amber-300 hover:underline flex items-center gap-0.5">
              Manage <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Registered Users */}
        <div className="p-6 bg-[#0a1128] rounded-3xl border border-blue-500/20 shadow-2xl relative overflow-hidden group hover:border-blue-500/40 transition-all">
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl group-hover:bg-blue-500/10 transition-all pointer-events-none"></div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Connoisseur Members</span>
            <div className="p-2.5 bg-blue-500/10 text-blue-400 rounded-2xl border border-blue-500/20">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <h3 className="text-3xl font-serif font-black text-white">{stats.totalUsers}</h3>
          <div className="flex items-center justify-between mt-3 text-xs">
            <span className="text-blue-300 font-semibold">{stats.totalVerifiedUsers} verified • {stats.totalAdmins} admins</span>
            <button onClick={() => setActiveTab("users")} className="text-[10px] text-blue-300 hover:underline flex items-center gap-0.5">
              Roles <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Total Orders */}
        <div className="p-6 bg-[#0a1128] rounded-3xl border border-purple-500/20 shadow-2xl relative overflow-hidden group hover:border-purple-500/40 transition-all">
          <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 rounded-full blur-2xl group-hover:bg-purple-500/10 transition-all pointer-events-none"></div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Orders & Tastings</span>
            <div className="p-2.5 bg-purple-500/10 text-purple-400 rounded-2xl border border-purple-500/20">
              <ShoppingBag className="w-5 h-5" />
            </div>
          </div>
          <h3 className="text-3xl font-serif font-black text-white">{stats.totalOrders}</h3>
          <div className="flex items-center justify-between mt-3 text-xs">
            <span className="text-purple-300 font-semibold">Track & Dispatch</span>
            <button onClick={() => setActiveTab("orders")} className="text-[10px] text-purple-300 hover:underline flex items-center gap-0.5">
              Fulfill <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Grid: Recent Registrations & Quick Management Console */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Recent Registered Club Members */}
        <div className="p-6 sm:p-8 bg-[#0a1128] rounded-3xl border border-white/10 shadow-2xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
              <div>
                <h3 className="text-lg font-serif font-bold text-white">Recent Member Signups</h3>
                <p className="text-xs text-gray-400">Newly registered connoisseurs and their clearance status.</p>
              </div>
              <button 
                onClick={() => setActiveTab("users")} 
                className="text-xs font-bold text-amber-400 hover:text-amber-300 bg-amber-500/10 px-3 py-1.5 rounded-xl border border-amber-500/30 transition-colors"
              >
                View Full Directory
              </button>
            </div>

            <div className="space-y-3">
              {stats.recentUsers && stats.recentUsers.length > 0 ? (
                stats.recentUsers.map((u) => (
                  <div key={u._id} className="flex items-center justify-between p-3.5 bg-white/5 hover:bg-white/10 rounded-2xl transition-all border border-white/5">
                    <div className="flex items-center gap-3">
                      <img
                        src={u.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300"}
                        alt={u.name}
                        className="w-10 h-10 rounded-full object-cover border border-amber-500/30 shrink-0"
                      />
                      <div className="overflow-hidden">
                        <p className="text-xs font-bold text-white truncate">{u.name}</p>
                        <p className="text-[10px] text-gray-400 truncate">{u.email}</p>
                      </div>
                    </div>
                    <span className={`text-[9px] font-black uppercase px-2.5 py-1 rounded-full border ${
                      u.role === 'admin' 
                        ? "bg-red-500/20 text-red-400 border-red-500/40" 
                        : "bg-blue-500/20 text-blue-300 border-blue-500/30"
                    }`}>
                      {u.role === 'admin' ? "Master Admin" : "VIP Member"}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-xs text-gray-400 text-center py-6">No recent signups found.</p>
              )}
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 mt-6 flex items-center justify-between text-xs text-gray-400">
            <span>Live Sync with User Controller</span>
            <span className="text-amber-400 font-semibold">{stats.totalVerifiedUsers} Active Accounts</span>
          </div>
        </div>

        {/* Master Command Actions & System Health */}
        <div className="p-6 sm:p-8 bg-[#0a1128] rounded-3xl border border-white/10 shadow-2xl flex flex-col justify-between">
          <div>
            <div className="pb-4 border-b border-white/10 mb-5">
              <h3 className="text-lg font-serif font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <span>Executive Command Console</span>
              </h3>
              <p className="text-xs text-gray-400 mt-0.5">
                Quickly adjust inventory parameters, role permissions, and order flows.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              
              <button
                onClick={handleOpenAddProduct}
                className="p-5 rounded-2xl bg-gradient-to-br from-amber-500/15 to-amber-950/20 border border-amber-500/30 hover:border-amber-400 text-left transition-all hover:scale-[1.02] group"
              >
                <div className="p-2.5 rounded-xl bg-amber-500 text-slate-950 w-fit mb-3 group-hover:scale-110 transition-transform shadow-md">
                  <Package className="w-5 h-5 font-bold" />
                </div>
                <h4 className="text-sm font-bold text-white">Add New Spirit</h4>
                <p className="text-[11px] text-gray-400 mt-1">Publish single malts & rare casks to public catalog</p>
              </button>

              <button
                onClick={() => setActiveTab("users")}
                className="p-5 rounded-2xl bg-gradient-to-br from-blue-500/15 to-blue-950/20 border border-blue-500/30 hover:border-blue-400 text-left transition-all hover:scale-[1.02] group"
              >
                <div className="p-2.5 rounded-xl bg-blue-500 text-slate-950 w-fit mb-3 group-hover:scale-110 transition-transform shadow-md">
                  <ShieldCheck className="w-5 h-5 font-bold" />
                </div>
                <h4 className="text-sm font-bold text-white">Manage Roles</h4>
                <p className="text-[11px] text-gray-400 mt-1">Grant or revoke administrator privileges with 1-click</p>
              </button>

              <button
                onClick={() => setActiveTab("orders")}
                className="p-5 rounded-2xl bg-gradient-to-br from-purple-500/15 to-purple-950/20 border border-purple-500/30 hover:border-purple-400 text-left transition-all hover:scale-[1.02] group"
              >
                <div className="p-2.5 rounded-xl bg-purple-500 text-slate-950 w-fit mb-3 group-hover:scale-110 transition-transform shadow-md">
                  <ShoppingBag className="w-5 h-5 font-bold" />
                </div>
                <h4 className="text-sm font-bold text-white">Dispatch Orders</h4>
                <p className="text-[11px] text-gray-400 mt-1">Update tracking status for wine & whisky orders</p>
              </button>

              <button
                onClick={() => setActiveTab("products")}
                className="p-5 rounded-2xl bg-gradient-to-br from-emerald-500/15 to-emerald-950/20 border border-emerald-500/30 hover:border-emerald-400 text-left transition-all hover:scale-[1.02] group"
              >
                <div className="p-2.5 rounded-xl bg-emerald-500 text-slate-950 w-fit mb-3 group-hover:scale-110 transition-transform shadow-md">
                  <Zap className="w-5 h-5 font-bold" />
                </div>
                <h4 className="text-sm font-bold text-white">Audit Inventory</h4>
                <p className="text-[11px] text-gray-400 mt-1">Inspect pricing, ABV specs, and cask maturation data</p>
              </button>
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between text-xs text-gray-400 gap-2">
            <span className="font-mono">WhiskyHub Distiller Engine v2.8.0</span>
            <span className="text-emerald-400 flex items-center gap-1 font-bold">
              <CheckCircle className="w-4 h-4" /> All Master Systems Operational
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}

