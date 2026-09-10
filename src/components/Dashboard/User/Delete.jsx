import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../../../context/AuthContext";
import { AlertTriangle, Trash2, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";

const API_BASE = "http://localhost:1234";

export default function Delete() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [confirmed, setConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!confirmed) {
      toast.warning("Please check the confirmation box to proceed.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.delete(`${API_BASE}/api/user/delete-account`);
      if (res.data?.status) {
        toast.info("Account deactivated. Thank you for being a part of WhiskyHub.");
        logout();
        navigate("/");
      }
    } catch (err) {
      toast.error("Failed to deactivate account.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#0a1128] p-6 sm:p-8 rounded-3xl border border-red-500/20 shadow-2xl max-w-2xl space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2.5 bg-red-500/10 text-red-400 rounded-xl">
          <AlertTriangle className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">Deactivate WhiskyHub Account</h3>
          <p className="text-xs text-gray-400">Permanently close your connoisseur profile and VIP allocations.</p>
        </div>
      </div>

      <div className="p-4 bg-red-950/20 border border-red-500/30 rounded-2xl text-xs text-gray-300 space-y-2">
        <p className="font-bold text-red-400">Please note:</p>
        <ul className="list-disc list-inside space-y-1 text-gray-400">
          <li>You will forfeit your VIP allocation status and tasting reward points.</li>
          <li>Active orders currently in transit will still be delivered.</li>
          <li>You can register again at any time with a fresh email address.</li>
        </ul>
      </div>

      <label className="flex items-center gap-3 text-xs text-gray-300 cursor-pointer p-2">
        <input
          type="checkbox"
          checked={confirmed}
          onChange={(e) => setConfirmed(e.target.checked)}
          className="w-4 h-4 accent-red-600 rounded"
        />
        <span>I understand that this action will deactivate my WhiskyHub VIP membership.</span>
      </label>

      <div className="flex justify-end pt-4 border-t border-white/10">
        <button
          type="button"
          disabled={!confirmed || loading}
          onClick={handleDelete}
          className="px-6 py-3 bg-red-600 hover:bg-red-500 disabled:opacity-40 text-white font-bold text-xs rounded-xl transition-all shadow-lg shadow-red-950/40 flex items-center gap-2"
        >
          {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
          Deactivate My Account
        </button>
      </div>
    </div>
  );
}
