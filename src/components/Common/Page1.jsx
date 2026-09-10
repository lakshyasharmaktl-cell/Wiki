import React, { useMemo, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectFade } from "swiper/modules";
import { useParams, useLocation } from 'react-router-dom';
import {
  ClockIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  BeakerIcon,
  SparklesIcon,
  FireIcon,
  ShoppingBagIcon
} from "@heroicons/react/24/outline";

// Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

// Assuming you have your WHISKY_DATA imported here
import { WHISKY_DATA } from './WhiskyData.jsx';

export default function ViewWhisky() {
  const { whisky_id } = useParams(); // Using ID from URL
  const { pathname } = useLocation();
  const contentRef = useRef(null);

  // 1. FIND THE ACTIVE PRODUCT
  const activeProduct = useMemo(() => {
    return WHISKY_DATA.find(w => w.id === parseInt(whisky_id)) || WHISKY_DATA[0];
  }, [whisky_id]);

  // 2. AUTO SCROLL TO TOP
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  const scrollToContent = () => {
    contentRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#050505] text-slate-200 selection:bg-amber-500/30 font-sans">
      
      {/* --- HERO SECTION --- */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Cinematic Overlays */}
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent via-black/40 to-[#050505]" />
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/80 via-transparent to-transparent" />
        
        <motion.img
          initial={{ scale: 1.2, filter: "blur(10px)" }}
          animate={{ scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.5 }}
          src={activeProduct.image}
          className="w-full h-full object-cover"
          alt={activeProduct.name}
        />

        <div className="absolute inset-0 z-20 flex items-center">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl"
            >
              {activeProduct.bestSeller && (
                <motion.span 
                  className="inline-block px-4 py-1 rounded-full bg-amber-500 text-black text-[10px] font-black tracking-[0.2em] uppercase mb-6"
                >
                  Best Seller Selection
                </motion.span>
              )}
              
              <h1 className="text-6xl md:text-9xl font-black tracking-tighter text-white mb-4 leading-none">
                {activeProduct.name.split(' ')[0]} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-500 to-yellow-600">
                  {activeProduct.name.split(' ').slice(1).join(' ')}
                </span>
              </h1>
              
              <p className="text-xl md:text-3xl text-amber-100/60 font-light mb-10 tracking-widest uppercase">
                {activeProduct.tagline} • Premium Distillation
              </p>

              <div className="flex flex-wrap gap-6">
                <button
                  onClick={scrollToContent}
                  className="group flex items-center gap-3 bg-amber-600 text-white px-10 py-5 rounded-full font-bold transition-all hover:bg-amber-500 shadow-2xl shadow-amber-900/20"
                >
                  View Tasting Notes <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <div className="flex flex-col justify-center">
                  <span className="text-slate-500 text-xs uppercase tracking-widest">Est. Price</span>
                  <span className="text-2xl font-bold text-white">₹{activeProduct.price.toLocaleString()}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Vertical Scroll Indicator */}
        <div className="absolute bottom-10 right-10 z-30 hidden md:block">
           <div className="flex flex-col items-center gap-4">
              <span className="rotate-90 text-[10px] tracking-[0.5em] uppercase text-amber-500/50">Details</span>
              <div className="w-[1px] h-20 bg-gradient-to-b from-amber-500 to-transparent" />
           </div>
        </div>
      </section>

      {/* --- CRAFT SECTION (About) --- */}
      <section ref={contentRef} className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-amber-500 text-sm font-black tracking-[0.3em] uppercase mb-4">The Heritage</h2>
              <h3 className="text-5xl md:text-7xl font-bold text-white mb-8">Crafted for the Discerning.</h3>
              <p className="text-xl text-slate-400 leading-relaxed mb-10">
                Every drop of <span className="text-white">{activeProduct.name}</span> tells a story of patience and precision. Aged to perfection and delivered to your doorstep in <span className="text-amber-500">{activeProduct.time}</span>.
              </p>

              <div className="grid grid-cols-2 gap-4">
                 <div className="p-8 rounded-2xl bg-white/5 border border-white/10">
                    <BeakerIcon className="w-8 h-8 text-amber-500 mb-4" />
                    <p className="text-white font-bold text-xl">42.8% ABV</p>
                    <p className="text-slate-500 text-sm">Perfect Balance</p>
                 </div>
                 <div className="p-8 rounded-2xl bg-white/5 border border-white/10">
                    <SparklesIcon className="w-8 h-8 text-amber-500 mb-4" />
                    <p className="text-white font-bold text-xl">Oak Cask</p>
                    <p className="text-slate-500 text-sm">Mature Finish</p>
                 </div>
              </div>
            </motion.div>

            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-orange-600 rounded-[3rem] blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
              <div className="relative rounded-[3rem] overflow-hidden bg-black border border-white/10">
                <img src={activeProduct.image} alt="Whisky Pour" className="w-full h-[600px] object-contain p-12 hover:scale-105 transition-transform duration-700" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- DELIVERY FEATURES --- */}
      <section className="py-24 bg-gradient-to-b from-[#0a0a0a] to-[#050505] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { title: "Express Delivery", desc: `Arrives in ${activeProduct.time}`, icon: ClockIcon },
              { title: "Secure Packaging", desc: "Shock-proof protection", icon: CheckCircleIcon },
              { title: "Authentic Source", desc: "Direct from distillery", icon: FireIcon },
            ].map((feature, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <feature.icon className="w-12 h-12 text-amber-500 mb-6" />
                <h4 className="text-xl font-bold text-white mb-2">{feature.title}</h4>
                <p className="text-slate-500">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CALL TO ACTION --- */}
      <section className="py-40 text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-amber-500/10 blur-[120px] rounded-full" />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="relative z-10"
        >
          <h3 className="text-6xl md:text-8xl font-black text-white mb-10 tracking-tighter">Elevate Your <br/> Evening.</h3>
          <button className="group relative bg-amber-500 text-black px-16 py-8 rounded-full font-black text-2xl transition-all hover:scale-105 hover:bg-white shadow-2xl">
            <span className="flex items-center gap-4">
              <ShoppingBagIcon className="w-8 h-8" />
              Add to Cart — ₹{activeProduct.price}
            </span>
          </button>
        </motion.div>
      </section>

    </div>
  );
}