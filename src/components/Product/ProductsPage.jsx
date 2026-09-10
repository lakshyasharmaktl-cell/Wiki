import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import axios from "axios";
import { 
  Search, 
  SlidersHorizontal, 
  ShoppingBag, 
  Star, 
  Sparkles, 
  ShieldCheck, 
  Flame, 
  Check, 
  Clock,
  Compass
} from "lucide-react";
import { useCart } from "../../context/CartContext";

const API_BASE = "http://localhost:1234";

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get("category") || "all";
  const filterParam = searchParams.get("filter") || "";

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");

  const { addToCart } = useCart();

  useEffect(() => {
    setSelectedCategory(categoryParam);
  }, [categoryParam]);

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, sortBy]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      let url = `${API_BASE}/api/products?`;
      if (selectedCategory && selectedCategory !== "all") {
        url += `category=${selectedCategory}&`;
      }
      if (filterParam === "bestseller") {
        url += `bestSeller=true&`;
      }
      if (sortBy === "price_asc") url += `sort=price_asc&`;
      if (sortBy === "price_desc") url += `sort=price_desc&`;
      if (sortBy === "rating") url += `sort=rating&`;

      const res = await axios.get(url);
      if (res.data?.status) {
        setProducts(res.data.products);
      }
    } catch (e) {
      console.error("Error fetching catalog", e);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    setSearchParams(cat === "all" ? {} : { category: cat });
  };

  const displayedProducts = products.filter((p) => {
    return p.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.subCategory?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.origin?.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const categories = [
    { id: "all", label: "All Spirits & Drinks" },
    { id: "whisky", label: "Single Malts & Whiskies" },
    { id: "mocktails", label: "Botanical Mocktails" },
    { id: "beers", label: "Craft & Imported Beers" },
    { id: "spirits", label: "Vodka & Rums" }
  ];

  return (
    <div className="min-h-screen bg-[#040814] text-gray-200 font-sans pt-24 pb-20 px-4 sm:px-8 max-w-7xl mx-auto">
      
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
        <span className="text-xs font-bold text-amber-500 uppercase tracking-[0.3em]">Curated Cellar Catalog</span>
        <h1 className="text-4xl sm:text-5xl font-serif font-black text-white">The Connoisseur's Vault</h1>
        <p className="text-xs sm:text-sm text-gray-400">
          Discover hand-selected single malt scotches, rare releases, botanical mocktails, and artisanal spirits.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#0a1128] p-4 sm:p-6 rounded-3xl border border-white/10 shadow-2xl mb-10 space-y-4">
        
        {/* Category Pills */}
        <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => handleCategoryChange(c.id)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap ${
                selectedCategory === c.id
                  ? "bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md shadow-amber-900/30"
                  : "bg-white/5 hover:bg-white/10 text-gray-300"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Search & Sort Row */}
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between pt-2 border-t border-white/10">
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by bottle name, age, or region (e.g. Speyside, Islay)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-[#111c44] text-xs text-white rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
            <span className="text-xs text-gray-400">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3.5 py-2 bg-[#111c44] text-xs text-white rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="featured">Featured Picks</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="rating">Top Rated (★ 5.0)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="text-center py-24 space-y-3">
          <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-xs text-amber-400 font-bold uppercase tracking-widest">Opening the Vault...</p>
        </div>
      ) : displayedProducts.length === 0 ? (
        <div className="text-center py-20 bg-[#0a1128] rounded-3xl border border-white/10 p-8 space-y-3">
          <Compass className="w-10 h-10 text-gray-500 mx-auto" />
          <h3 className="text-lg font-bold text-white">No Spirits Found</h3>
          <p className="text-xs text-gray-400">Try changing your search keywords or switching categories.</p>
          <button
            onClick={() => { setSearchQuery(""); setSelectedCategory("all"); }}
            className="px-5 py-2 bg-amber-500 text-slate-950 text-xs font-bold rounded-xl"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayedProducts.map((item) => (
            <div
              key={item._id || item.id}
              className="group bg-[#0a1128] rounded-3xl overflow-hidden border border-white/10 hover:border-amber-500/40 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
            >
              {/* Image & Badges */}
              <div className="relative h-64 bg-white/5 p-6 flex items-center justify-center overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full max-h-52 object-contain group-hover:scale-105 transition-transform duration-500"
                />

                {item.bestSeller && (
                  <span className="absolute top-4 left-4 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 text-[10px] font-black uppercase px-2.5 py-1 rounded-lg shadow-md">
                    Best Seller
                  </span>
                )}

                <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] font-bold text-amber-300 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-amber-400" /> {item.deliveryTime || "10 MINS"}
                </div>
              </div>

              {/* Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center justify-between text-[11px] text-gray-400 mb-1">
                    <span className="uppercase font-bold tracking-wider text-amber-400/90">{item.subCategory || item.category}</span>
                    <span className="flex items-center gap-1 text-amber-400 font-bold">
                      <Star className="w-3 h-3 fill-amber-400" /> {item.rating || 4.8}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors leading-snug line-clamp-2">
                    {item.name}
                  </h3>

                  <p className="text-[11px] text-gray-400 mt-1">
                    {item.origin} • {item.age || "Matured"} • {item.abv}
                  </p>

                  {item.tastingNotes?.nose && (
                    <p className="text-[10px] text-gray-400/80 italic mt-2 line-clamp-2 border-l border-amber-500/40 pl-2">
                      "{item.tastingNotes.nose}"
                    </p>
                  )}
                </div>

                {/* Price & Add to Cart button */}
                <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-[9px] text-gray-400 font-bold uppercase">Vault Price</span>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-lg font-black text-white">₹{item.price?.toLocaleString()}</span>
                      {item.originalPrice && (
                        <span className="text-[10px] text-gray-500 line-through">₹{item.originalPrice?.toLocaleString()}</span>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => addToCart(item, 1)}
                    className="flex items-center gap-1.5 px-4 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow-md shadow-amber-900/20 active:scale-95 transition-all"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>ADD</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
