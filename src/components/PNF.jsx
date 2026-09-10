import React from 'react';
import { Home, ArrowLeft, GlassWater } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function PNF() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-950 via-stone-900 to-amber-950/30 flex items-center justify-center px-6 py-12 relative overflow-hidden mt-15">
      <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-amber-700/30 rounded-full blur-[140px] animate-pulse" />
      <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-amber-900/20 rounded-full blur-[140px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-800/10 rounded-full blur-[100px]" />

      <div className="max-w-xl w-full text-center relative z-10">
        {/* Icon */}
        <div className="mb-8 flex justify-center">
          <div className="relative group">
            <div className="absolute inset-0 bg-amber-600/20 rounded-full blur-xl group-hover:bg-amber-600/30 transition-all duration-300" />
            <span className="absolute inset-0 flex items-center justify-center text-6xl font-black text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">404</span>
          </div>
        </div>

        {/* Text */}
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4 drop-shadow-[0_2px_15px_rgba(0,0,0,0.7)]">
          The Cask is <span className="text-amber-500 drop-shadow-[0_0_20px_rgba(245,158,11,0.4)]">Empty</span>
        </h1>
        <p className="text-stone-300 text-lg mb-10 leading-relaxed max-w-md mx-auto drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]">
          The page you are looking for has been moved, evaporated, or never existed in our cellar. Let's get you back to the good stuff.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center justify-center gap-2 px-8 py-4 border-2 border-stone-700/80 text-stone-200 rounded-2xl hover:bg-stone-800/70 hover:border-amber-700/50 hover:text-white hover:shadow-[0_0_20px_rgba(217,119,6,0.2)] transition-all duration-300 font-bold backdrop-blur-sm"
          >
            <ArrowLeft className="w-4 h-4" /> Go Back
          </button>
          <Link 
            to="/" 
            className="flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-2xl hover:from-amber-500 hover:to-amber-600 hover:shadow-[0_0_30px_rgba(217,119,6,0.5)] hover:scale-105 transition-all duration-300 font-bold shadow-[0_10px_40px_rgba(120,53,15,0.4)]"
          >
            <Home className="w-4 h-4" /> Return Home
          </Link>
        </div>

        {/* Subtle Footer */}
        <div className="mt-16 pt-8 border-t border-stone-700/50">
          <p className="text-stone-500 text-xs uppercase tracking-[0.2em] font-bold drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
            WhiskyVault • Premium Reserves
          </p>
        </div>
      </div>
    </div>
  );
}