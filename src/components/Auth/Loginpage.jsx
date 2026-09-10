import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaLock, FaEnvelope, FaShieldAlt, FaUserCheck, FaGlassWhiskey } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import { RefreshCw } from "lucide-react";

export default function Loginpage() {
  const navigate = useNavigate();
  const { login, demoLogin } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await login(formData.email, formData.password);
    setLoading(false);

    if (result.success) {
      if (result.user?.role === 'admin') {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } else if (result.requiresVerification) {
      navigate(`/otp/${result.id}`, { state: { email: result.email, testOtp: result.testOtp } });
    }
  };

  const handleQuickDemo = async (role) => {
    setLoading(true);
    const result = await demoLogin(role);
    setLoading(false);
    if (result.success) {
      if (role === 'admin') {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050a15] px-4 py-16 font-sans">
      {/* Main Container */}
      <div className="flex w-full max-w-5xl bg-[#0a1128] rounded-3xl shadow-2xl overflow-hidden border border-white/10 mt-12">

        {/* Left Side: Whisky Pour Image & Branding */}
        <div className="hidden lg:flex lg:w-1/2 relative min-h-[550px] bg-gradient-to-br from-amber-950/40 via-blue-950 to-black p-10 flex-col justify-between">
          <img
            src="https://images.unsplash.com/photo-1527281400683-1aae777175f8?auto=format&fit=crop&q=80&w=1000"
            alt="Whisky Pour"
            className="absolute inset-0 w-full h-full object-cover brightness-40 mix-blend-luminosity"
          />
          <div className="relative z-10">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-xl tracking-wider uppercase mb-2">
              <FaGlassWhiskey className="text-2xl" /> WhiskyHub
            </div>
            <span className="text-xs text-blue-300 font-mono tracking-widest uppercase">The Connoisseur Vault</span>
          </div>

          <div className="relative z-10 space-y-3">
            <blockquote className="text-xl font-serif text-white/90 italic leading-snug">
              "Whisky is liquid sunshine, crafted with time, fire and Scottish oak."
            </blockquote>
            <p className="text-xs text-amber-400 font-medium">— Private Reserve Cellar Master</p>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="w-full lg:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-[#0a1128]/95">
          <div className="mb-6">
            <span className="text-xs font-bold text-amber-500 uppercase tracking-widest">Member Portal</span>
            <h2 className="text-3xl font-bold text-white mt-1">Welcome Back</h2>
            <p className="text-sm text-gray-400 mt-1">Sign in to access your reserve collection & dashboard.</p>
          </div>

          {/* 1-Click Quick Demo Sign-in for Testing */}
          <div className="mb-6 p-4 rounded-2xl bg-blue-950/60 border border-blue-800/40">
            <p className="text-xs font-bold text-blue-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <FaShieldAlt className="text-amber-400" /> One-Click Demo Access
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemo('admin')}
                disabled={loading}
                className="px-3 py-2 text-xs font-bold bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 rounded-xl transition-all flex items-center justify-center gap-1.5"
              >
                <FaShieldAlt /> Demo Admin
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo('user')}
                disabled={loading}
                className="px-3 py-2 text-xs font-bold bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/40 rounded-xl transition-all flex items-center justify-center gap-1.5"
              >
                <FaUserCheck /> Demo User
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div className="relative group">
              <label className="block text-xs font-medium text-amber-400/90 mb-1 ml-1 uppercase tracking-wider">
                Email Address
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
                  <FaEnvelope />
                </span>
                <input
                  type="email"
                  name="email"
                  placeholder="name@whiskyhub.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-11 pr-4 py-3 bg-[#111c44] border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all placeholder:text-gray-500 text-sm"
                />
              </div>
            </div>

            {/* Password */}
            <div className="relative group">
              <div className="flex justify-between items-center mb-1 ml-1">
                <label className="block text-xs font-medium text-amber-400/90 uppercase tracking-wider">
                  Password
                </label>
                <span className="text-xs text-amber-400/80 cursor-pointer hover:underline">Forgot?</span>
              </div>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
                  <FaLock />
                </span>
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full pl-11 pr-4 py-3 bg-[#111c44] border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all placeholder:text-gray-500 text-sm"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold rounded-xl transition-all duration-300 shadow-lg shadow-amber-900/30 active:scale-[0.98] flex items-center justify-center gap-2 mt-2"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" /> Signing In...
                </>
              ) : (
                "Sign In to WhiskyHub"
              )}
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="mt-6 text-center text-xs text-gray-400">
            Don't have an account?{" "}
            <Link to="/create-account" className="text-amber-400 font-bold hover:underline">
              Create an Account Free
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
