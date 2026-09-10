import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Award, MapPin, Star, Sparkles, Compass, CheckCircle2, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const slugify = (text) => text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');

const WHISKY_DATA = [
  { 
    id: '12-oak', 
    name: "Sherry Oak 12 Years Old", 
    rating: 4.8, 
    price: 9500,
    image: "https://www.shutterstock.com/image-photo/jakarta-indonesia-september-20-2023photo-260nw-2364194921.jpg",
    color: "Rich Gold",
    nose: "Vanilla with a hint of ginger, dried fruits, sherry sweetness and wood smoke.",
    palate: "Deliciously smooth, with rich dried fruits and sherry, balanced with wood smoke.",
    finish: "Sweet toffee and dried fruits, with wood smoke and spice.",
    abv: "40%",
    cask: "Sherry Seasoned Oak Casks from Jerez"
  },
  { 
    id: '15-double', 
    name: "Double Cask 15 Years Old", 
    rating: 4.9, 
    price: 15400,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6s6ImNuLXbSwbTUggbLU_Ic8LXJTuCRX9bEXH-xKBsEs68iwbD9Yz3aGzLSXgBSCujBZxlwkGEyN7T1Cnxm4_&s&ec=121528423",
    color: "Golden Butterscotch",
    nose: "Dried fruit, toffee and vanilla with smooth oak and baked apple.",
    palate: "Sweet raisin and sultana builds with hints of vanilla, wood spice and citrus.",
    finish: "Warm with ginger turning to caramel and citrus.",
    abv: "43%",
    cask: "American & European Sherry Seasoned Oak"
  },
  { 
    id: 'rare-cask', 
    name: "Rare Cask 2024 Release", 
    rating: 5.0, 
    price: 34500,
    image: "https://t3.ftcdn.net/jpg/05/44/48/66/360_F_544486674_RGqImMsVN41zfsvPHm3gQrSBxuKbdKoL.jpg",
    color: "Ruby Red",
    nose: "Soft notes of opulent vanilla and raisin.",
    palate: "An intense sweet raisin dominates before vanilla and dark chocolate.",
    finish: "Long, rich and velvety.",
    abv: "43%",
    cask: "Hand-picked Sherry Seasoned Oak"
  },
  { 
    id: 'estate', 
    name: "The Macallan Estate", 
    rating: 4.7, 
    price: 28900,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkqtXIbSO0lQwSFKr7gjs9lK6aK6th7ySJbkLT4U0Y1Cp0fBd6oWKKpcnmbCyL9Vba6F6fuzsH9DRgX8ouyRvl&s&ec=121528423",
    color: "Chestnut",
    nose: "Warm, comforting and homely notes of cinnamon.",
    palate: "Soft and warming with wood spice and dry oak.",
    finish: "A sweet yet dry finish with fresh fig.",
    abv: "43%",
    cask: "Rare Spirit containing Homegrown Barley"
  }
].map(item => ({ ...item, slug: slugify(item.name) }));

const PILLARS = [
  { title: "Spiritual Home", desc: "Easter Elchies House, built in 1700 on the Macallan Estate in Speyside.", icon: MapPin },
  { title: "Curiously Small Stills", desc: "Their unique size and shape give the spirit maximum contact with copper.", icon: Shield },
  { title: "The Finest Cut", desc: "Only the finest cut of spirit is selected from the stills to ensure quality.", icon: Award },
];

export default function Maclaan() {
  const [activeIndex, setActiveIndex] = useState(0);
  const { addToCart } = useCart();
  const current = WHISKY_DATA[activeIndex];

  const handleAcquire = () => {
    addToCart({
      _id: current.id,
      name: `The Macallan ${current.name}`,
      price: current.price,
      image: current.image,
      category: "whisky",
      alcoholContent: current.abv
    });
  };

  return (
    <div className="bg-[#050a15] text-white font-sans min-h-screen pt-20">
      
      {/* 1. HERO SHOWCASE SECTION */}
      <section className="min-h-[85vh] flex items-center px-6 sm:px-12 lg:px-24 relative overflow-hidden bg-gradient-to-b from-[#050a15] via-[#0a1128] to-[#070d1e] border-b border-white/5">
        {/* Subtle Watermark */}
        <div className="absolute top-10 right-0 text-[14rem] md:text-[20rem] font-serif font-bold text-white/[0.02] pointer-events-none select-none z-0">
          1824
        </div>
        
        {/* Glow Spheres */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-600/10 rounded-full blur-[140px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[140px] pointer-events-none"></div>

        <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10 py-12">
          
          {/* Left Info Column */}
          <div className="lg:w-1/2 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Speyside Single Malt Heritage</span>
            </div>

            <div className="space-y-2">
              <span className="text-amber-400 tracking-[0.4em] text-xs uppercase font-bold block">The Macallan Distillery</span>
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-black tracking-tight text-white uppercase leading-tight">
                {current.name.split(' ')[0]} <br />
                <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600 bg-clip-text text-transparent">
                  {current.name.split(' ').slice(1).join(' ')}
                </span>
              </h1>
            </div>
            
            {/* Rating and Badges */}
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill={i < Math.floor(current.rating) ? "currentColor" : "none"} className="text-amber-400" />
                ))}
              </div>
              <span className="text-gray-400 text-xs tracking-wider uppercase font-semibold">
                {current.rating} / 5.0 Exceptional Rating
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-white/10 text-amber-300 font-mono">
                {current.abv} ABV
              </span>
            </div>

            {/* Tasting Notes Bento */}
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md space-y-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400 block mb-1">Nose Character</span>
                <p className="text-gray-300 text-sm italic font-serif leading-relaxed">"{current.nose}"</p>
              </div>
              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/10 text-xs">
                <div>
                  <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Cask Maturation</span>
                  <p className="text-white font-semibold truncate">{current.cask}</p>
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Natural Color</span>
                  <p className="text-amber-300 font-semibold">{current.color}</p>
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button 
                onClick={handleAcquire}
                className="px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 rounded-xl uppercase tracking-widest text-xs font-black shadow-xl shadow-amber-900/30 transition-all flex items-center gap-2 active:scale-95"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Acquire Bottle • ₹{current.price?.toLocaleString()}</span>
              </button>

              <Link 
                to="/shop?category=whisky"
                className="px-6 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl uppercase tracking-widest text-xs font-bold transition-all flex items-center gap-2"
              >
                <Compass className="w-4 h-4 text-amber-400" />
                <span>All Single Malts</span>
              </Link>
            </div>
          </div>

          {/* Right Showcase Bottle with Ambient Glow */}
          <div className="lg:w-1/2 flex justify-center items-center relative min-h-[440px] w-full">
            <div className="absolute inset-0 bg-gradient-to-tr from-amber-600/20 to-amber-400/5 blur-[90px] rounded-full"></div>
            
            {/* Ambient Base Pedestal */}
            <div className="relative z-20 flex flex-col items-center">
              <img 
                key={current.id}
                src={current.image} 
                alt={current.name} 
                className="max-h-[460px] w-auto object-contain drop-shadow-[0_20px_40px_rgba(217,119,6,0.3)] transition-all duration-700 animate-in zoom-in-95 hover:scale-105" 
              />
              <div className="w-48 h-4 bg-gradient-to-r from-transparent via-amber-500/40 to-transparent blur-sm rounded-full -mt-2"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE SIX PILLARS OF EXCELLENCE */}
      <section className="py-24 bg-[#070d1e] border-b border-white/5 px-6 sm:px-12 lg:px-24">
        <div className="container mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-amber-400 tracking-[0.4em] text-xs uppercase font-bold">Uncompromising Heritage</span>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold uppercase text-white">The Six Pillars</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Every expression of The Macallan is crafted in Speyside according to legendary principles dating back to 1824.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {PILLARS.map((p, i) => (
              <div 
                key={i} 
                className="group p-8 rounded-2xl bg-[#0a1128] border border-white/10 hover:border-amber-500/40 transition-all hover:-translate-y-1 shadow-xl"
              >
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-6 group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-slate-950 transition-all">
                  <p.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-serif font-bold uppercase mb-3 text-white tracking-wide">{p.title}</h3>
                <p className="text-gray-400 text-xs leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. INTERACTIVE EXPRESSIONS GALLERY SELECTOR */}
      <section className="py-20 bg-[#050a15] border-b border-white/5">
        <div className="container mx-auto px-6 sm:px-12 lg:px-24">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-10">
            <div>
              <span className="text-amber-400 tracking-[0.3em] text-xs uppercase font-bold block mb-1">Interactive Tasting Room</span>
              <h3 className="text-3xl sm:text-4xl font-serif font-bold uppercase text-white">The Rare Vault Selection</h3>
            </div>
            <p className="text-xs text-gray-400 max-w-sm">
              Select any expression below to preview its specific aroma profile, oak cask maturation history, and acquire allocation.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHISKY_DATA.map((whisky, index) => {
              const isSelected = activeIndex === index;
              return (
                <div 
                  key={whisky.id} 
                  onClick={() => setActiveIndex(index)}
                  className={`relative p-6 rounded-2xl transition-all duration-300 cursor-pointer border flex flex-col justify-between ${
                    isSelected 
                      ? 'bg-gradient-to-b from-[#0a1128] to-amber-950/30 border-amber-500 shadow-xl shadow-amber-900/20 scale-[1.02]' 
                      : 'bg-[#0a1128]/60 border-white/10 hover:border-white/20 hover:bg-[#0a1128]'
                  }`}
                >
                  {isSelected && (
                    <div className="absolute top-3 right-3 flex items-center gap-1 text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/30">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Viewing</span>
                    </div>
                  )}

                  <div className="h-44 flex items-center justify-center p-2 mb-4">
                    <img 
                      src={whisky.image} 
                      alt={whisky.name} 
                      className="h-full object-contain drop-shadow-lg group-hover:scale-105 transition-transform" 
                    />
                  </div>

                  <div className="space-y-1.5">
                    <span className="text-[10px] font-mono text-amber-400/80 uppercase">{whisky.abv} • {whisky.color}</span>
                    <h4 className="text-sm font-serif font-bold text-white line-clamp-1">{whisky.name}</h4>
                    <p className="text-xs font-bold text-amber-400">₹{whisky.price?.toLocaleString()}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. HERITAGE STATS BANNER */}
      <section className="py-24 bg-[#070d1e] text-white text-center relative overflow-hidden">
        <div className="max-w-3xl mx-auto px-6 space-y-6 relative z-10">
          <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold uppercase tracking-tight">Crafted in Speyside Since 1824</h2>
          <div className="h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent w-32 mx-auto"></div>
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
            "Our reputation for the extraordinary is characterized by the exceptional oak casks for which The Macallan is renowned throughout the globe."
          </p>
          <div className="pt-4">
            <Link 
              to="/shop" 
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-amber-900/40"
            >
              <Compass className="w-4 h-4" />
              <span>Explore Entire Whisky Vault</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}