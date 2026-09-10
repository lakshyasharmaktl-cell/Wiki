import React, { useState } from "react";
import { User, Mail, Lock, Eye, EyeOff, Shield, RefreshCw } from "lucide-react";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Signup() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    gender: "Male",
    role: "user",
    password: "",
    confirmPassword: "",
  });

  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      toast.warning("All fields are required to join WhiskyHub");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    const result = await register({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      gender: formData.gender,
      role: formData.role
    });
    setLoading(false);

    if (result.success) {
      navigate(`/otp/${result.id}`, {
        state: {
          email: formData.email,
          testOtp: result.testOtp,
          id: result.id
        }
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050a15] px-4 py-16">
      <div className="flex w-full max-w-5xl bg-[#0a1128] rounded-3xl shadow-2xl overflow-hidden border border-white/10 mt-12">

        {/* Brand visual panel */}
        <div className="hidden lg:flex lg:w-1/2 relative min-h-[600px] bg-gradient-to-br from-blue-950 via-slate-900 to-amber-950 p-10 flex-col justify-between">
          <img
            src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=1000"
            alt="Whisky Aging"
            className="absolute inset-0 w-full h-full object-cover brightness-40"
          />
          <div className="relative z-10">
            <h1 className="text-2xl font-serif font-black text-amber-400 tracking-wider">WHISKYHUB</h1>
            <p className="text-xs text-blue-200 mt-1 uppercase tracking-widest">VIP Membership</p>
          </div>
          <div className="relative z-10 bg-black/50 backdrop-blur-md p-6 rounded-2xl border border-white/10 space-y-2">
            <h3 className="text-amber-300 font-bold text-sm">Privileges of Membership:</h3>
            <ul className="text-xs text-gray-300 space-y-1.5 list-disc list-inside">
              <li>Access to Rare Single Cask bottlings</li>
              <li>Free priority temperature-controlled delivery</li>
              <li>Invitations to Private Masterclass Tastings</li>
            </ul>
          </div>
        </div>

        {/* Signup Form */}
        <div className="w-full lg:w-1/2 p-8 md:p-12">
          <div className="mb-6">
            <span className="text-xs text-amber-500 font-bold uppercase tracking-widest">Join The Club</span>
            <h2 className="text-3xl font-bold text-white mt-1">Create Account</h2>
            <p className="text-xs text-gray-400 mt-1">Fill your details to receive your 4-digit verification code.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* FULL NAME */}
            <div>
              <label className="block text-xs font-semibold text-amber-500/90 mb-1 uppercase tracking-wider">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  name="name"
                  placeholder="e.g. Johnathan Walker"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full pl-11 pr-4 py-2.5 bg-[#111c44] text-white text-sm rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>

            {/* EMAIL */}
            <div>
              <label className="block text-xs font-semibold text-amber-500/90 mb-1 uppercase tracking-wider">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="email"
                  name="email"
                  placeholder="johnathan@whiskyhub.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-11 pr-4 py-2.5 bg-[#111c44] text-white text-sm rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>

            {/* GENDER SELECTOR */}
            <div>
              <label className="block text-xs font-semibold text-amber-500/90 mb-1 uppercase tracking-wider">
                Gender
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-[#111c44] text-white text-xs rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* PASSWORD */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-amber-500/90 mb-1 uppercase tracking-wider">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                  <input
                    type={showPass ? "text" : "password"}
                    name="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full pl-11 pr-10 py-2.5 bg-[#111c44] text-white text-sm rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  <div
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400"
                  >
                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-amber-500/90 mb-1 uppercase tracking-wider">
                  Confirm
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                  <input
                    type={showConfirmPass ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="w-full pl-11 pr-10 py-2.5 bg-[#111c44] text-white text-sm rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  <div
                    onClick={() => setShowConfirmPass(!showConfirmPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400"
                  >
                    {showConfirmPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </div>
                </div>
              </div>
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 mt-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm rounded-xl shadow-lg shadow-amber-900/30 transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" /> Registering Account...
                </>
              ) : (
                "Create Account & Send OTP"
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-gray-400">
            Already a member?{" "}
            <Link to="/user-login" className="text-amber-400 font-bold hover:underline">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
