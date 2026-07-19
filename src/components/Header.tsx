import React from "react";
import { Sparkles, BadgeCheck, Zap } from "lucide-react";
// @ts-ignore
import heroImage from "../assets/images/real_ratlami_hero_1784106207832.jpg";

export default function Header() {
  return (
    <header className="relative w-full bg-white text-stone-900 overflow-hidden rounded-3xl shadow-lg mb-8 border border-stone-200">
      {/* Visual background pattern with glowing custom lime gradient */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(142,204,9,0.15),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-stone-50 via-white/80 to-transparent"></div>
        {/* Abstract floating bubbles to represent soft drink carbonation */}
        <div className="absolute inset-0 opacity-15 pointer-events-none overflow-hidden">
          <div className="absolute w-2 h-2 bg-brand-lime rounded-full bottom-4 left-1/4 animate-bounce" style={{ animationDelay: "0.2s" }}></div>
          <div className="absolute w-3 h-3 bg-brand-lime rounded-full bottom-12 left-1/3 animate-bounce" style={{ animationDelay: "1s" }}></div>
          <div className="absolute w-1.5 h-1.5 bg-brand-lime rounded-full bottom-8 right-1/4 animate-bounce" style={{ animationDelay: "0.5s" }}></div>
          <div className="absolute w-2.5 h-2.5 bg-brand-lime rounded-full bottom-20 right-1/3 animate-bounce" style={{ animationDelay: "1.5s" }}></div>
        </div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-10 md:py-14 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-10">
        {/* Left text column */}
        <div className="flex-1 space-y-4">
          <div className="inline-flex items-center gap-2 bg-brand-lime-light text-brand-lime-hover border border-brand-lime/30 px-3 py-1 rounded-full text-xs font-mono tracking-wider font-extrabold">
            <Sparkles className="w-3.5 h-3.5 animate-pulse text-brand-lime" />
            INDIA KA DESI THANDA
          </div>
          
          <h1 className="text-3xl md:text-5xl font-sans font-extrabold tracking-tight text-stone-950 leading-tight">
            The Real <span className="text-brand-lime">Ratlami</span>
          </h1>
          <p className="text-stone-600 font-extrabold text-lg font-mono tracking-wide">
            DESI THANDA, REAL RATLAMI
          </p>
          
          <p className="text-stone-600 max-w-2xl text-sm md:text-base leading-relaxed">
            Six legendary flavours. One authentic brand. Made in the spirit of Ratlam — bold, real, and refreshingly desi. Formulated with authentic taste profiles and brought to you by <span className="text-brand-lime font-bold">Swad Beverages</span>, based in Indore.
          </p>

          <div className="flex flex-wrap gap-3 pt-2 justify-center md:justify-start text-xs font-bold text-stone-600">
            <span className="flex items-center gap-1.5 bg-stone-100 px-3 py-1.5 rounded-lg border border-stone-200">
              <Zap className="w-3.5 h-3.5 text-brand-lime" />
              Rs.10 Only
            </span>
            <span className="flex items-center gap-1.5 bg-stone-100 px-3 py-1.5 rounded-lg border border-stone-200">
              <BadgeCheck className="w-3.5 h-3.5 text-brand-lime" />
              FSSAI Approved
            </span>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
            <a
              href="https://ratlamizeera.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-brand-lime hover:bg-brand-lime-hover text-white font-extrabold py-3 px-6 rounded-xl shadow-lg shadow-brand-lime/20 transition-all duration-200 transform active:scale-95 text-sm"
            >
              Visit Official Store (ratlamizeera.com)
            </a>
            <span className="text-xs text-stone-400 font-mono font-bold">
              Parent Entity: Swad Beverages
            </span>
          </div>
        </div>

        {/* Right column: Stunning Hero Bottle Line-up Image */}
        <div className="flex-1 max-w-[420px] md:max-w-[460px] flex items-center justify-center">
          <div className="relative group overflow-hidden rounded-2xl bg-gradient-to-br from-brand-lime/5 to-amber-500/5 p-4 border border-stone-100 shadow-md hover:shadow-xl transition-all duration-300">
            <img 
              src={heroImage} 
              alt="The Real Ratlami soft drink bottle line-up (Ratlami Lychee, Ratlami Mojito, Ratlami Blueberry, Ratlami Nimbu Masala, Ratlami Zeera) over a vibrant yellow splash" 
              referrerPolicy="no-referrer"
              className="w-full h-auto rounded-xl object-contain transform group-hover:scale-[1.03] transition-transform duration-500"
            />
            {/* Soft decorative badge */}
            <span className="absolute bottom-6 right-6 bg-stone-900/90 text-white font-mono text-[9px] font-black tracking-widest px-2 py-1 rounded border border-white/10 uppercase shadow-md">
              The Legendary Range
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
