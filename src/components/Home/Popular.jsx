import React from 'react';
import { MapPin, Clock, Bookmark, ShieldCheck, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';

const TOP_WHISKIES = [
  { 
    id: 101, 
    name: "Macallan 18 Double Cask", 
    type: "Single Malt Scotch",
    region: "Speyside, Scotland",
    price: 31500,
    priceStr: "₹31,500",
    age: "18 Years",
    image: "https://images.unsplash.com/photo-1584225064536-d0fbc0a10c1c?auto=format&fit=crop&q=80&w=600",
    tag: "Prestige"
  },
  { 
    id: 102, 
    name: "Yamazaki 12 Single Malt", 
    type: "Japanese Whisky",
    region: "Osaka, Japan",
    price: 22500,
    priceStr: "₹22,500",
    age: "12 Years",
    image: "https://images.unsplash.com/photo-1549231482-5cf39d19fba4?auto=format&fit=crop&q=80&w=600",
    tag: "Rare Release"
  },
  { 
    id: 103, 
    name: "Johnnie Walker Blue Label", 
    type: "Blended Scotch",
    region: "Scotland",
    price: 18500,
    priceStr: "₹18,500",
    age: "Rare Cask",
    image: "https://images.unsplash.com/photo-1531214159280-079b95d26139?auto=format&fit=crop&q=80&w=600",
    tag: "Iconic"
  },
  { 
    id: 104, 
    name: "Glenfiddich 18 Single Malt", 
    type: "Single Malt Scotch",
    region: "Speyside, Scotland",
    price: 10800,
    priceStr: "₹10,800",
    age: "18 Years",
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=600",
    tag: "Best Seller"
  },
  { 
    id: 105, 
    name: "Lagavulin 16 Peated Malt", 
    type: "Islay Single Malt",
    region: "Islay, Scotland",
    price: 11500,
    priceStr: "₹11,500",
    age: "16 Years",
    image: "https://images.unsplash.com/photo-1527281400683-1aae777175f8?auto=format&fit=crop&q=80&w=600",
    tag: "Peated Master"
  },
  { 
    id: 106, 
    name: "Grey Goose French Vodka", 
    type: "Ultra-Premium Vodka",
    region: "Gensac, France",
    price: 4950,
    priceStr: "₹4,950",
    age: "Spring Water",
    image: "https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?auto=format&fit=crop&q=80&w=600",
    tag: "Artisanal"
  }
];

export default function Popular() {
  const { addToCart } = useCart();

  return (
    <div className="bg-[#040814] py-20 px-4 sm:px-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-amber-500 font-bold tracking-[0.2em] uppercase text-xs">
              World-Renowned Labels
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-black text-white leading-tight mt-1">
              Top Curated Selection
            </h2>
          </div>
          <div className="flex items-center gap-2 text-gray-400 pb-2 text-xs">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>100% Verified Cask Provenance</span>
          </div>
        </div>

        {/* Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TOP_WHISKIES.map((whisky, index) => (
            <div 
              key={whisky.id}
              className="group bg-[#0a1128] rounded-3xl overflow-hidden border border-white/10 hover:border-amber-500/40 shadow-xl transition-all duration-500 flex flex-col justify-between"
            >
              <div className="relative h-64 overflow-hidden bg-white/5 p-6 flex items-center justify-center">
                <img 
                  src={whisky.image} 
                  alt={whisky.name}
                  className="h-full object-contain transition-transform duration-500 group-hover:scale-105"
                />
                
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <div className="bg-black/80 text-amber-400 w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs border border-white/10">
                    0{index + 1}
                  </div>
                  <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2.5 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-wider">
                    {whisky.tag}
                  </span>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <p className="text-amber-400 font-bold text-[10px] uppercase tracking-wider mb-1">
                    {whisky.type}
                  </p>
                  <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
                    {whisky.name}
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs text-gray-400">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span className="truncate">{whisky.region}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>{whisky.age}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <div>
                    <span className="text-[9px] text-gray-400 font-bold uppercase">Vault Price</span>
                    <p className="text-xl font-black text-white">{whisky.priceStr}</p>
                  </div>
                  <button 
                    onClick={() => addToCart({ id: whisky.id, name: whisky.name, price: whisky.price, image: whisky.image, tagline: whisky.age }, 1)}
                    className="flex items-center gap-1.5 px-4 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow-md active:scale-95 transition-all"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>ADD</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Private Reserve Collection Banner */}
        <div className="mt-16 bg-gradient-to-r from-blue-950 via-[#0a1128] to-amber-950/60 rounded-3xl p-8 sm:p-12 border border-white/10 relative overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-xl space-y-4">
            <span className="text-xs text-amber-400 font-bold uppercase tracking-widest">Exclusive Access</span>
            <h3 className="text-3xl sm:text-4xl font-serif font-black text-white leading-tight">
              The 2026 Private Cask Release
            </h3>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              Bottled at natural cask strength from non-chill filtered single casks. Exclusive allocations reserved for verified members.
            </p>
            <Link
              to="/the-macallan"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs rounded-2xl shadow-lg shadow-amber-900/30 transition-all"
            >
              <span>Explore The Macallan Heritage</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
