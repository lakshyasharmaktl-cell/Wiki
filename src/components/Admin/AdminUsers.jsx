import React from "react";
import { Search, CheckCircle, Trash2 } from "lucide-react";

export default function AdminUsers({
  usersList,
  userSearch,
  setUserSearch,
  userRoleFilter,
  setUserRoleFilter,
  handleToggleRole,
  handleDeleteUser
}) {
  const filteredUsers = usersList.filter((u) => {
    const matchesSearch =
      u.name?.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.email?.toLowerCase().includes(userSearch.toLowerCase());
    const matchesRole = userRoleFilter === "all" || u.role === userRoleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-[#0a1128] p-4 rounded-2xl border border-white/10">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by user name or email..."
            value={userSearch}
            onChange={(e) => setUserSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-[#111c44] rounded-xl text-xs text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>

        <select
          value={userRoleFilter}
          onChange={(e) => setUserRoleFilter(e.target.value)}
          className="px-3 py-2 bg-[#111c44] rounded-xl text-xs text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-amber-500 w-full sm:w-auto"
        >
          <option value="all">All Roles</option>
          <option value="user">Connoisseur (User)</option>
          <option value="admin">Master Distiller (Admin)</option>
        </select>
      </div>

      <div className="bg-[#0a1128] rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#111c44] text-gray-400 font-bold uppercase tracking-wider border-b border-white/10">
              <tr>
                <th className="px-6 py-4">Member Info</th>
                <th className="px-4 py-4">Status</th>
                <th className="px-4 py-4">Assigned Role</th>
                <th className="px-4 py-4">Gender</th>
                <th className="px-4 py-4">Joined Date</th>
                <th className="px-6 py-4 text-right">Role Switch / Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredUsers.map((u) => (
                <tr key={u._id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={u.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300"}
                        alt={u.name}
                        className="w-10 h-10 rounded-full object-cover border border-white/10"
                      />
                      <div>
                        <p className="font-bold text-white text-sm">{u.name}</p>
                        <p className="text-[10px] text-gray-400">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    {u.user?.isVerify ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                        <CheckCircle className="w-3 h-3" /> Verified
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full">
                        Unverified
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase ${
                      u.role === 'admin'
                        ? "bg-red-500/20 text-red-400 border border-red-500/30"
                        : "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                    }`}>
                      {u.role === 'admin' ? "Distiller (Admin)" : "Connoisseur (User)"}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-gray-300">{u.gender || "Male"}</td>
                  <td className="px-4 py-4 text-gray-400">
                    {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : "Active"}
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button
                      onClick={() => handleToggleRole(u._id, u.role)}
                      className={`px-3 py-1.5 rounded-xl font-bold text-[11px] transition-all ${
                        u.role === 'admin'
                          ? "bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 border border-amber-500/30"
                          : "bg-red-500/20 text-red-300 hover:bg-red-500/30 border border-red-500/30"
                      }`}
                    >
                      {u.role === 'admin' ? "Demote to User" : "Promote to Admin"}
                    </button>
                    <button
                      onClick={() => handleDeleteUser(u._id)}
                      className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl transition-all"
                      title="Deactivate Account"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
