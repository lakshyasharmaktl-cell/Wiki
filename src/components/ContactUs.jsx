import React, { useState } from "react";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ShieldCheck, 
  Send, 
  GlassWater, 
  CheckCircle2, 
  RefreshCw 
} from "lucide-react";
import { toast } from "react-toastify";

export default function ContactUs() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    interest: "Private Tasting Booking",
    message: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      toast.success("Inquiry received! Our Private Concierge will reach out within 2 hours.");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#040814] text-gray-200 font-sans pt-24 pb-20 px-4 sm:px-8 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
        <span className="text-xs font-bold text-amber-500 uppercase tracking-[0.3em]">VIP Services</span>
        <h1 className="text-4xl sm:text-5xl font-serif font-black text-white">WhiskyHub Concierge</h1>
        <p className="text-xs sm:text-sm text-gray-400">
          Book private distillery tastings, inquire about rare cask allocations, or connect with our Master Sommelier.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Col: Contact Info & Hours */}
        <div className="space-y-6">
          <div className="bg-[#0a1128] p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl space-y-6">
            <h3 className="text-lg font-bold text-white pb-3 border-b border-white/10">
              Private Cellar & Tasting Room
            </h3>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-amber-500/10 text-amber-400 rounded-xl shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-white">WhiskyHub Cellar HQ</p>
                  <p className="text-gray-400">742 Model Town, Kaithal, Haryana 136027, India</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-amber-500/10 text-amber-400 rounded-xl shrink-0 mt-0.5">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-white">Direct VIP Hotline</p>
                  <p className="text-gray-400">+91 7495065304</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-amber-500/10 text-amber-400 rounded-xl shrink-0 mt-0.5">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-white">Concierge Desk</p>
                  <p className="text-gray-400">concierge@whiskyhub.com</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-amber-500/10 text-amber-400 rounded-xl shrink-0 mt-0.5">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-white">Sommelier Operating Hours</p>
                  <p className="text-gray-400">Mon - Sun: 11:00 AM – 11:00 PM IST</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 bg-gradient-to-br from-amber-950/40 via-[#0a1128] to-blue-950/40 rounded-3xl border border-amber-500/30 shadow-xl space-y-2">
            <h4 className="font-bold text-sm text-amber-400 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" /> Private Sommelier Guarantee
            </h4>
            <p className="text-[11px] text-gray-300">
              Personalized curation for home cellars, weddings, corporate events, and bespoke investment portfolios.
            </p>
          </div>
        </div>

        {/* Right 2 Cols: Form */}
        <div className="lg:col-span-2">
          <div className="bg-[#0a1128] p-6 sm:p-10 rounded-3xl border border-white/10 shadow-2xl">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-white">Inquiry Dispatched to Sommelier</h3>
                <p className="text-xs text-gray-300 max-w-md mx-auto">
                  Thank you, <strong>{form.name}</strong>. Our Private Reserve Director will review your tasting request and connect with you shortly.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: "", email: "", phone: "", interest: "Private Tasting Booking", message: "" }); }}
                  className="px-6 py-2.5 bg-white/5 hover:bg-white/10 text-amber-400 font-bold text-xs rounded-xl"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="pb-2 border-b border-white/10 mb-4">
                  <h3 className="text-xl font-bold text-white">Request Concierge Session</h3>
                  <p className="text-xs text-gray-400">Complete the form below for private tasting bookings and inquiries.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-amber-500 font-bold mb-1 uppercase">Your Name</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="e.g. Lord Charles Stuart"
                      className="w-full px-4 py-3 bg-[#111c44] text-white rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-amber-500 font-bold mb-1 uppercase">Email Address</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="charles@domain.com"
                      className="w-full px-4 py-3 bg-[#111c44] text-white rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-amber-500 font-bold mb-1 uppercase">Phone Number</label>
                    <input
                      type="text"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+91 9876543210"
                      className="w-full px-4 py-3 bg-[#111c44] text-white rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-amber-500 font-bold mb-1 uppercase">Nature of Inquiry</label>
                    <select
                      value={form.interest}
                      onChange={(e) => setForm({ ...form, interest: e.target.value })}
                      className="w-full px-4 py-3 bg-[#111c44] text-white rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    >
                      <option value="Private Tasting Booking">Private Tasting Booking</option>
                      <option value="Rare Cask Allocation">Rare Cask Allocation</option>
                      <option value="Cellar Investment Advice">Cellar Investment Advice</option>
                      <option value="Corporate / Wedding Gifting">Corporate / Wedding Gifting</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-amber-500 font-bold mb-1 uppercase">Special Requests / Bottle Inquiries</label>
                  <textarea
                    rows="4"
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Preferred dates, favorite whisky regions (Speyside, Islay, Highlands), or guest count..."
                    className="w-full px-4 py-3 bg-[#111c44] text-white rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-amber-900/30 transition-all flex items-center justify-center gap-2 active:scale-95"
                >
                  {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                  Dispatch Inquiry to VIP Concierge
                </button>
              </form>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
