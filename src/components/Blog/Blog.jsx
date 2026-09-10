import React, { useState } from "react";
import { Sparkles, Clock, User, Bookmark, ArrowUpRight, Share2 } from "lucide-react";
import { toast } from "react-toastify";

const ARTICLES = [
  {
    id: 1,
    title: "The Art of Cask Selection: European vs. American Oak",
    excerpt: "Discover how differing wood grain densities, tannin structures, and sherry seasoning affect the final dram's flavor profile.",
    author: "Hamish MacIntyre",
    role: "Master Distiller",
    date: "Sep 2026",
    readTime: "6 min read",
    category: "Maturation Guide",
    image: "https://images.unsplash.com/photo-1527281400683-1aae777175f8?auto=format&fit=crop&q=80&w=800",
    featured: true
  },
  {
    id: 2,
    title: "How to Nose and Taste Single Malt Like a Master Sommelier",
    excerpt: "Unlocking the delicate aromas of Speyside and the intense peat smoke of Islay with proper glassware and temperature.",
    author: "Elena Rostov",
    role: "Sensory Analyst",
    date: "Aug 2026",
    readTime: "4 min read",
    category: "Tasting Masterclass",
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=800",
    featured: false
  },
  {
    id: 3,
    title: "The Rise of Japanese Single Malts: From Yamazaki to Hakushu",
    excerpt: "How Japanese distillers adapted Scottish heritage using Mizunara oak and pristine mountain spring water to conquer the world.",
    author: "Kenji Takahashi",
    role: "Spirits Historian",
    date: "Jul 2026",
    readTime: "7 min read",
    category: "World Spirits",
    image: "https://images.unsplash.com/photo-1549231482-5cf39d19fba4?auto=format&fit=crop&q=80&w=800",
    featured: false
  },
  {
    id: 4,
    title: "Crafting Elevated Botanical Mocktails for Connoisseurs",
    excerpt: "Zero-proof cocktails with layered complexity: smoked cherry infusions, fresh mint hydrosols, and spiced tonics.",
    author: "Chloe Bennett",
    role: "Mixology Director",
    date: "Jun 2026",
    readTime: "5 min read",
    category: "Botanicals & Mixology",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=800",
    featured: false
  }
];

export default function Blog() {
  const [bookmarked, setBookmarked] = useState([]);

  const toggleBookmark = (id) => {
    setBookmarked((prev) => {
      const exists = prev.includes(id);
      if (exists) {
        toast.info("Removed from reading list");
        return prev.filter((i) => i !== id);
      } else {
        toast.success("Saved to your reading list!");
        return [...prev, id];
      }
    });
  };

  const featuredArticle = ARTICLES.find((a) => a.featured);
  const regularArticles = ARTICLES.filter((a) => !a.featured);

  return (
    <div className="min-h-screen bg-[#040814] text-gray-200 font-sans pt-24 pb-20 px-4 sm:px-8 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
        <span className="text-xs font-bold text-amber-500 uppercase tracking-[0.3em]">WhiskyHub Gazette</span>
        <h1 className="text-4xl sm:text-5xl font-serif font-black text-white">The Connoisseur's Journal</h1>
        <p className="text-xs sm:text-sm text-gray-400">
          Curated essays, distillation insights, sensory masterclasses, and spirit history from world-renowned cellar masters.
        </p>
      </div>

      {/* Featured Article Banner */}
      {featuredArticle && (
        <div className="bg-[#0a1128] rounded-3xl overflow-hidden border border-white/10 shadow-2xl mb-12 grid grid-cols-1 lg:grid-cols-2">
          <div className="relative min-h-[300px] lg:min-h-[420px]">
            <img
              src={featuredArticle.image}
              alt={featuredArticle.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 bg-amber-500 text-slate-950 text-[10px] font-black uppercase px-3 py-1 rounded-lg shadow-md">
              Featured Story
            </div>
          </div>

          <div className="p-8 sm:p-10 flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                {featuredArticle.category}
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-black text-white leading-tight">
                {featuredArticle.title}
              </h2>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                {featuredArticle.excerpt}
              </p>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center text-xs">
                  HM
                </div>
                <div>
                  <p className="text-xs font-bold text-white">{featuredArticle.author}</p>
                  <p className="text-[10px] text-gray-400">{featuredArticle.role} • {featuredArticle.readTime}</p>
                </div>
              </div>

              <button
                onClick={() => toggleBookmark(featuredArticle.id)}
                className={`p-2.5 rounded-xl border transition-all ${
                  bookmarked.includes(featuredArticle.id)
                    ? "bg-amber-500 text-slate-950 border-amber-500"
                    : "bg-white/5 border-white/10 text-gray-400 hover:text-white"
                }`}
                title="Save story"
              >
                <Bookmark className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Grid of Regular Stories */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {regularArticles.map((article) => (
          <div
            key={article.id}
            className="bg-[#0a1128] rounded-3xl overflow-hidden border border-white/10 hover:border-amber-500/30 shadow-xl transition-all duration-300 flex flex-col justify-between group"
          >
            <div>
              <div className="relative h-48 overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-black/70 backdrop-blur-md text-amber-300 text-[9px] font-black uppercase px-2.5 py-1 rounded-md">
                  {article.category}
                </span>
              </div>

              <div className="p-6 space-y-2">
                <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors leading-snug">
                  {article.title}
                </h3>
                <p className="text-xs text-gray-400 line-clamp-2">
                  {article.excerpt}
                </p>
              </div>
            </div>

            <div className="p-6 pt-0 border-t border-white/5 mt-4 flex items-center justify-between text-xs text-gray-400">
              <div>
                <p className="font-semibold text-white">{article.author}</p>
                <p className="text-[10px]">{article.readTime}</p>
              </div>

              <button
                onClick={() => toggleBookmark(article.id)}
                className={`p-2 rounded-lg transition-all ${
                  bookmarked.includes(article.id)
                    ? "bg-amber-500 text-slate-950"
                    : "hover:text-amber-400 text-gray-400"
                }`}
              >
                <Bookmark className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
