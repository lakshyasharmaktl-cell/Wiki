import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade, Thumbs } from 'swiper/modules';
import { ChevronLeft, ChevronRight, Play, Pause, ExternalLink } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import 'swiper/css/thumbs';

const WHISKY_DATA = [
  {
    id: 1,
    name: "JAMESON BOLD",
    subtitle: "ESTD 1780 • IRISH WHISKEY",
    desc: "Triple distilled, twice as smooth, one of a kind. A bold expression of Irish craftsmanship with notes of vanilla, toasted wood, and spicy character.",
    img: "https://assets.architecturaldigest.in/photos/6041dbd94cfb7d2fe3ff6b54/16:9/w_2560%2Cc_limit/Whisky-whiskey-scotch-burbon-alcohol.jpg",
    age: "12 Years",
    region: "Ireland",
    color: "#D4A76A",
    type: "Blended"
  },
  {
    id: 2,
    name: "GLENFIDDICH 18",
    subtitle: "SINGLE MALT SCOTCH",
    desc: "Matured in Oloroso sherry and bourbon casks for 18 years. Complex with notes of orchard fruit, baked apple, and rich oak.",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQO9wS4AfqvbBIw62rb3XcKQEtUo6AIGWtl2A&s",
    age: "18 Years",
    region: "Speyside, Scotland",
    rating: 4.9,
    color: "#B8860B",
    type: "Single Malt"
  },
  {
    id: 3,
    name: "MACALLAN 12",
    subtitle: "DOUBLE CASK • SHERRY OAK",
    desc: "Rich honey, citrus, and gentle spice finish. Matured in American and European oak sherry seasoned casks for 12 years.",
    img: "https://images.unsplash.com/photo-1584225064536-d0fbc0a10c1c?auto=format&fit=crop&q=80&w=1600",
    age: "12 Years",
    region: "Speyside, Scotland",
    rating: 4.7,
    color: "#8B4513",
    type: "Single Malt"
  },
  {
    id: 4,
    name: "JOHNNIE WALKER BLUE",
    subtitle: "BLENDED SCOTCH WHISKY",
    desc: "An exquisite blend of Scotland's rarest whiskies. Velvety smooth with deep, rich flavors and a long, smoky finish.",
    img: "https://images.unsplash.com/photo-1531214159280-079b95d26139?auto=format&fit=crop&q=80&w=1600",
    age: "NAS",
    region: "Scotland",
    rating: 5.0,
    color: "#1E3A8A",
    type: "Blended"
  },
  {
    id: 5,
    name: "YAMAZAKI 12",
    subtitle: "JAPANESE SINGLE MALT",
    desc: "Japan's premier single malt whisky. Notes of peach, pineapple, grapefruit, clove, and Japanese oak with a long spicy finish.",
    img: "https://images.unsplash.com/photo-1549231482-5cf39d19fba4?auto=format&fit=crop&q=80&w=1600",
    age: "12 Years",
    region: "Osaka, Japan",
    rating: 4.9,
    color: "#D2691E",
    type: "Single Malt"
  },
  {
    id: 6,
    name: "WOODFORD RESERVE",
    subtitle: "KENTUCKY STRAIGHT BOURBON",
    desc: "A premium small batch Kentucky Straight Bourbon Whiskey. Rich, bold and spicy with a long, smooth finish.",
    img: "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&q=80&w=1600",
    age: "NAS",
    region: "Kentucky, USA",
    rating: 4.6,
    color: "#8B7355",
    type: "Bourbon"
  },
  {
    id: 7,
    name: "LAGAVULIN 16",
    subtitle: "ISLAY SINGLE MALT",
    desc: "Intensely flavored, smoky, with sea-spray and a dry finish. A classic Islay malt from the south shore of the island.",
    img: "https://c4.wallpaperflare.com/wallpaper/779/838/425/glass-drink-alcohol-ice-cubes-wallpaper-preview.jpg",
    age: "16 Years",
    region: "Islay, Scotland",
    rating: 4.8,
    color: "#5D4037",
    type: "Single Malt"
  },
  {
    id: 8,
    name: "REDBREAST 15",
    subtitle: "IRISH SINGLE POT STILL",
    desc: "A rich, full-bodied whiskey with a wonderfully complex spicy and fruity character. Matured in bourbon and sherry casks.",
    img: "https://c4.wallpaperflare.com/wallpaper/612/422/330/drink-jack-daniels-whiskey-wallpaper-preview.jpg",
    age: "15 Years",
    region: "Ireland",
    rating: 4.9,
    color: "#A0522D",
    type: "Single Pot Still"
  },
  {
    id: 9,
    name: "HIBIKI HARMONY",
    subtitle: "JAPANESE BLENDED WHISKY",
    desc: "A harmonious blend of malt and grain whiskies from Yamazaki, Hakushu, and Chita distilleries.",
    img: "https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&q=80&w=1600",
    age: "NAS",
    region: "Japan",
    rating: 4.7,
    color: "#FFD700",
    type: "Blended"
  },
  {
    id: 10,
    name: "BUFFALO TRACE",
    subtitle: "KENTUCKY STRAIGHT BOURBON",
    desc: "An award-winning bourbon with complex aroma of vanilla, mint, and molasses. Smooth with notes of brown sugar and spice.",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUCSO2CpIl9TUQvhwqLaHHO7sm6Mk1sceFow&s",
    age: "NAS",
    region: "Kentucky, USA",
    rating: 4.5,
    color: "#CD853F",
    type: "Bourbon"
  }
];

export default function BigWhiskySwiper() {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [autoplayRunning, setAutoplayRunning] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleAutoplayToggle = () => {
    setAutoplayRunning(!autoplayRunning);
  };

  const ratingStars = (rating) => {
    return (
      <div className="flex items-center gap-1 mt-6   ">
        {[...Array(5)].map((_, i) => (
          <span 
            key={i} 
            className={`text-xl ${i < Math.floor(rating) ? 'text-amber-400' : 'text-blue-300/30'}`}
          >
            ★
          </span>
        ))}
        <span className="ml-2 text-blue-200">{rating.toFixed(1)}</span>
      </div>
    );
  };

  return (
    <div className="relative w-full h-screen max-h-[100vh] bg-gradient-to-br from-blue-950 via-blue-900 to-blue-950 overflow-hidden ">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade, Thumbs]}
        effect="fade"
        loop={true}
        navigation={{
          nextEl: '.custom-next',
          prevEl: '.custom-prev',
        }}
        pagination={{
          clickable: true,
          renderBullet: (index, className) => {
            return `<span class="${className} !w-3 !h-3 !bg-transparent !border-2 !border-amber-400 !mx-2 !opacity-50 hover:!opacity-100 transition-opacity"></span>`;
          },
        }}
        autoplay={autoplayRunning ? { delay: 5000, disableOnInteraction: false } : false}
        thumbs={{ swiper: thumbsSwiper }}
        className="h-full w-full"
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        style={{
          '--swiper-navigation-color': '#fbbf24',
          '--swiper-pagination-color': '#fbbf24',
          '--swiper-pagination-bullet-inactive-color': 'rgba(251, 191, 36, 0.3)',
          '--swiper-pagination-bullet-inactive-opacity': '0.5',
        }}
      >
        {WHISKY_DATA.map((item) => (
          <SwiperSlide key={item.id}>
            <div 
              className="relative h-full w-full flex items-center px-4 md:px-8 lg:px-16 xl:px-24 bg-cover bg-center"
              style={{
                backgroundImage: `linear-gradient(105deg, rgba(11,28,45,0.95) 35%, transparent 70%), url(${item.img})`
              }}
            >
              {/* Content Box */}
              <div className="max-w-2xl z-10 animate-fadeIn ml-4 md:ml-8 lg:ml-16">
                <div className="flex items-center gap-4 mb-4">
                  <span className="px-4 py-1.5 bg-gradient-to-r from-blue-800/30 to-blue-900/30 backdrop-blur-sm rounded-full border border-blue-700/50 text-amber-300 tracking-[2px] text-xs font-bold uppercase">
                    {item.subtitle}
                  </span>
                  <span className="px-3 py-1.5 bg-gradient-to-r from-amber-500/20 to-amber-600/20 backdrop-blur-sm rounded-full border border-amber-500/30 text-amber-300 text-xs font-medium">
                    {item.type}
                  </span>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif text-white leading-[1.1] mb-4">
                  {item.name.split(' ').map((word, i) => (
                    <span key={i} className="block">
                      {word}
                    </span>
                  ))}
                </h1>

                <div className="flex items-center gap-6 mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-amber-300 font-medium">{item.age}</span>
                  </div>
                  <div className="text-blue-200">{item.region}</div>
                </div>

               

                

              </div>

           
            </div>
          </SwiperSlide>
        ))}

        {/* Custom Navigation */}
        <div className="custom-prev absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-gradient-to-r from-blue-900/80 to-blue-800/80 backdrop-blur-sm rounded-full border border-blue-700/50 flex items-center justify-center cursor-pointer transition-all hover:scale-110 hover:border-amber-400/50">
          <ChevronLeft className="w-6 h-6 text-amber-300" />
        </div>
        <div className="custom-next absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-gradient-to-r from-blue-900/80 to-blue-800/80 backdrop-blur-sm rounded-full border border-blue-700/50 flex items-center justify-center cursor-pointer transition-all hover:scale-110 hover:border-amber-400/50">
          <ChevronRight className="w-6 h-6 text-amber-300" />
        </div>

        {/* Autoplay Toggle */}
        <button
          onClick={handleAutoplayToggle}
          className="absolute right-4 md:right-8 top-8 z-20 w-12 h-12 bg-gradient-to-r from-blue-900/80 to-blue-800/80 backdrop-blur-sm rounded-full border border-blue-700/50 flex items-center justify-center cursor-pointer transition-all hover:scale-110 hover:border-amber-400/50"
        >
          {autoplayRunning ? (
            <Pause className="w-5 h-5 text-amber-300" />
          ) : (
            <Play className="w-5 h-5 text-amber-300" />
          )}
        </button>
      </Swiper>

      


      {/* Progress Indicator */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 hidden md:block">
        <div className="text-sm text-blue-300">
          <span className="text-amber-400 font-bold">{activeIndex + 1}</span>
          <span className="mx-2 text-blue-400">/</span>
          <span>{WHISKY_DATA.length}</span>
        </div>
      </div>

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-blue-950/30 via-transparent to-blue-950/10 pointer-events-none" />

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }
        
        .swiper-pagination-bullet {
          background: transparent;
          border: 2px solid var(--swiper-pagination-color, #fbbf24);
          opacity: 0.5;
          width: 12px;
          height: 12px;
          margin: 0 8px !important;
        }
        
        .swiper-pagination-bullet-active {
          opacity: 1;
          background: var(--swiper-pagination-color, #fbbf24);
        }
      `}</style>
    </div>
  );
}