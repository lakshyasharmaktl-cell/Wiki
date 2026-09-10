import React from 'react';
import { Tag, Timer, Percent, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { toast } from 'react-toastify';

const DISCOUNTED_ITEMS = [
  {
    id: 201,
    name: "Laphroaig 10 Year Islay Malt",
    originalPrice: 5850,
    price: 3520,
    originalPriceStr: "₹5,850",
    discountPriceStr: "₹3,520",
    savings: "40% OFF",
    image: "https://images.unsplash.com/photo-1527281400683-1aae777175f8?auto=format&fit=crop&q=80&w=600",
    endsIn: "12h 30m"
  },
  {
    id: 202,
    name: "Smoked Botanical Ginger Mojito",
    originalPrice: 650,
    price: 450,
    originalPriceStr: "₹650",
    discountPriceStr: "₹450",
    savings: "30% OFF",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=600",
    endsIn: "05h 15m"
  },
  {
    id: 203,
    name: "Corona Extra Cerveza 6-Pack",
    originalPrice: 1750,
    price: 1350,
    originalPriceStr: "₹1,750",
    discountPriceStr: "₹1,350",
    savings: "23% OFF",
    image: "https://images.unsplash.com/photo-1608270586620-248524c67de9?auto=format&fit=crop&q=80&w=600",
    endsIn: "08h 45m"
  }
];

export default function Discount() {
  const { addToCart, applyCoupon } = useCart();

  const handleCopyCode = () => {
    applyCoupon("WHISKY20");
  };

  return (
    <div className="bg-[#050a15] text-gray-200 font-sans py-20 px-4 sm:px-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Flash Sale Header Banner */}
        <div className="bg-gradient-to-r from-amber-950/60 via-[#0a1128] to-amber-900/40 p-8 sm:p-12 rounded-3xl border border-amber-500/30 text-center relative overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 border border-amber-500/30 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">
              <Percent className="w-3.5 h-3.5" /> 24-Hour Flash Sale
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-black text-white leading-tight">
              The Connoisseur’s Allocation
            </h2>
            <p className="text-xs sm:text-sm text-gray-300">
              Limited-time reserve price reductions on select craft labels.
            </p>
          </div>
        </div>

        {/* Discount Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {DISCOUNTED_ITEMS.map((item) => (
            <div
              key={item.id}
              className="group bg-[#0a1128] rounded-3xl overflow-hidden border border-white/10 hover:border-amber-500/40 shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div className="relative h-64 bg-white/5 p-6 flex items-center justify-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full object-contain group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-red-600 text-white font-black px-3 py-1 rounded-xl text-xs shadow-md">
                  {item.savings}
                </div>
                <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-md text-amber-300 px-2.5 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1">
                  <Timer className="w-3 h-3 text-amber-400" /> {item.endsIn}
                </div>
              </div>

              <div className="p-6 space-y-4">
                <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors">
                  {item.name}
                </h3>

                <div className="flex items-center gap-3">
                  <span className="text-2xl font-black text-amber-400">{item.discountPriceStr}</span>
                  <span className="text-xs text-gray-500 line-through font-bold">{item.originalPriceStr}</span>
                </div>

                <button
                  onClick={() => addToCart({ id: item.id, name: item.name, price: item.price, image: item.image, tagline: item.savings }, 1)}
                  className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Claim This Deal</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Promo Code Box */}
        <div className="bg-[#0a1128] border-2 border-dashed border-amber-500/40 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-left">
            <div className="p-3.5 bg-amber-500/10 text-amber-400 rounded-2xl shrink-0">
              <Tag className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white">Extra 20% Off Welcome Voucher</h4>
              <p className="text-xs text-gray-400">Click to apply coupon <strong className="text-amber-400">WHISKY20</strong> at checkout.</p>
            </div>
          </div>
          
          <button
            onClick={handleCopyCode}
            className="px-6 py-3 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 font-mono font-bold text-sm tracking-widest rounded-2xl transition-all whitespace-nowrap"
          >
            APPLY WHISKY20
          </button>
        </div>

      </div>
    </div>
  );
}
