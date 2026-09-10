import React from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, Star, Zap } from "lucide-react";
import { useCart } from "../../context/CartContext";

const WHISKY_DATA = [
  {
    id: 1,
    name: "Macallan 12Y Sherry Oak",
    tagline: "700ml • 40% ABV",
    price: 8450,
    time: "9 MINS",
    image: "https://images.unsplash.com/photo-1584225064536-d0fbc0a10c1c?auto=format&fit=crop&q=80&w=600",
    bestSeller: true,
    origin: "Scotland"
  },
  {
    id: 2,
    name: "Glenfiddich 18 Single Malt",
    tagline: "700ml • 40% ABV",
    price: 10800,
    time: "11 MINS",
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=600",
    bestSeller: true,
    origin: "Scotland"
  },
  {
    id: 3,
    name: "Yamazaki 12 Single Malt",
    tagline: "700ml • 43% ABV",
    price: 22000,
    time: "8 MINS",
    image: "https://images.unsplash.com/photo-1549231482-5cf39d19fba4?auto=format&fit=crop&q=80&w=600",
    origin: "Japan"
  },
  {
    id: 4,
    name: "Johnnie Walker Blue Label",
    tagline: "750ml • 40% ABV",
    price: 18500,
    time: "10 MINS",
    image: "https://images.unsplash.com/photo-1531214159280-079b95d26139?auto=format&fit=crop&q=80&w=600",
    origin: "Scotland"
  },
  {
    id: 5,
    name: "Lagavulin 16 Islay Single Malt",
    tagline: "700ml • 43% ABV",
    price: 11500,
    time: "12 MINS",
    image: "https://images.unsplash.com/photo-1527281400683-1aae777175f8?auto=format&fit=crop&q=80&w=600",
    origin: "Scotland"
  },
  {
    id: 6,
    name: "Virgin Mojito Botanica",
    tagline: "330ml • 0.0% ABV",
    price: 450,
    time: "8 MINS",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=600",
    origin: "Signature Bar"
  },
  {
    id: 7,
    name: "Corona Extra Cerveza Premium",
    tagline: "Pack of 6 (330ml)",
    price: 1350,
    time: "10 MINS",
    image: "https://images.unsplash.com/photo-1608270586620-248524c67de9?auto=format&fit=crop&q=80&w=600",
    origin: "Mexico"
  },
  {
    id: 8,
    name: "Grey Goose French Vodka",
    tagline: "750ml • 40% ABV",
    price: 4950,
    time: "10 MINS",
    image: "https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?auto=format&fit=crop&q=80&w=600",
    origin: "France"
  }
];

export default function Fav() {
  const { addToCart } = useCart();

  return (
    <div className="bg-[#050a15] py-20 px-4 sm:px-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold text-amber-500 uppercase tracking-widest">Hand-Selected Expressions</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-black text-white mt-1">Connoisseur Favorites</h2>
          </div>
          <Link
            to="/shop"
            className="text-xs font-bold text-amber-400 hover:text-amber-300 hover:underline flex items-center gap-1"
          >
            View Complete Cellar →
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {WHISKY_DATA.map((item) => (
            <div
              key={item.id}
              className="group bg-[#0a1128] rounded-3xl overflow-hidden border border-white/10 hover:border-amber-500/40 p-4 sm:p-5 flex flex-col justify-between transition-all duration-300 shadow-xl"
            >
              <div>
                <div className="relative h-44 sm:h-52 bg-white/5 rounded-2xl p-4 flex items-center justify-center overflow-hidden mb-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute bottom-2 left-2 bg-black/70 backdrop-blur-md px-2 py-0.5 rounded-md text-[9px] font-bold text-amber-300 flex items-center gap-1">
                    <Zap className="w-2.5 h-2.5 text-amber-400" /> {item.time}
                  </div>
                </div>

                <p className="text-[10px] text-gray-400 font-semibold">{item.origin}</p>
                <h3 className="text-xs sm:text-sm font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-1">
                  {item.name}
                </h3>
                <p className="text-[10px] text-gray-400 mb-2">{item.tagline}</p>
              </div>

              <div className="pt-2 border-t border-white/10 flex items-center justify-between mt-1">
                <span className="text-xs sm:text-sm font-black text-white">₹{item.price?.toLocaleString()}</span>
                <button
                  onClick={() => addToCart(item, 1)}
                  className="px-3 py-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-[10px] sm:text-xs rounded-xl transition-all shadow-md active:scale-95"
                >
                  ADD
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
