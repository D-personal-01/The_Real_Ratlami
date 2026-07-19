import React, { useState } from "react";
import { Search, Sparkles, AlertCircle, ShoppingBag, Flame, GlassWater, Percent } from "lucide-react";
import { REAL_RATLAMI_PRODUCTS } from "../products";

interface CatalogPanelProps {
  onAskAIAboutProduct: (productName: string) => void;
}

export default function CatalogPanel({ onAskAIAboutProduct }: CatalogPanelProps) {
  const [filter, setFilter] = useState<"all" | "sparkling" | "still">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = REAL_RATLAMI_PRODUCTS.filter((p) => {
    const matchesFilter =
      filter === "all" ||
      (filter === "sparkling" && p.sparkling) ||
      (filter === "still" && !p.sparkling);

    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.ingredients.some((i) => i.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesFilter && matchesSearch;
  });

  // Get badge background color
  const getBadgeStyles = (badge: string) => {
    switch (badge) {
      case "Bestseller":
        return "bg-rose-500/10 text-rose-400 border-rose-500/30";
      case "Signature":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/30";
      case "New":
        return "bg-sky-500/10 text-sky-400 border-sky-500/30";
      case "Classic":
        return "bg-amber-500/10 text-amber-400 border-amber-500/30";
      default:
        return "bg-purple-500/10 text-purple-400 border-purple-500/30";
    }
  };

  return (
    <div className="space-y-6">
      {/* Filters and Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-stone-900 border border-stone-800 p-4 rounded-2xl shadow-xl">
        {/* Category Filters */}
        <div className="flex bg-stone-950 p-1 rounded-xl w-full md:w-auto overflow-x-auto border border-stone-800">
          {(["all", "sparkling", "still"] as const).map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-4 py-2 rounded-lg text-xs font-bold capitalize transition-all duration-150 cursor-pointer whitespace-nowrap ${
                filter === type
                  ? "bg-emerald-500 text-stone-950 shadow-sm"
                  : "text-stone-400 hover:text-white hover:bg-stone-800/50"
              }`}
            >
              {type === "all"
                ? "All Flavours 🌟"
                : type === "sparkling"
                ? "Fizzy Soda 🫧"
                : "Still Drink 🥭"}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input
            type="text"
            placeholder="Search ingredients, names, taste..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-stone-950 border border-stone-800 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 outline-none rounded-xl text-xs text-stone-200 placeholder-stone-500 transition"
          />
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-12 bg-stone-900 border border-stone-800 rounded-3xl space-y-3">
          <AlertCircle className="w-8 h-8 text-stone-500 mx-auto animate-bounce" />
          <p className="text-stone-400 text-sm font-medium">No flavours found matching your search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((p) => (
            <div
              key={p.id}
              className="bg-stone-900 border border-stone-800/80 rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-emerald-950/10 transition-all duration-300 group flex flex-col h-full border-b-4 border-b-stone-800 hover:border-b-emerald-500"
            >
              {/* Product Card Image Container */}
              <div className="relative h-56 w-full overflow-hidden bg-stone-950">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                
                {/* Visual glass gradient sheet */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent"></div>

                {/* Sparkling / Still Indicator Tag */}
                <span className="absolute top-3 left-3 bg-stone-950/90 text-stone-200 font-mono text-[9px] uppercase font-extrabold tracking-wider px-2.5 py-1 rounded-full border border-stone-800">
                  {p.sparkling ? "🫧 Carbonated Soda" : "🥭 Still Beverage"}
                </span>

                {/* Pricing Tag Overlay */}
                <div className="absolute top-3 right-3 bg-emerald-500 text-stone-950 font-sans font-black text-xs px-3 py-1 rounded-full shadow-lg border border-emerald-400 flex items-center gap-1">
                  <Percent className="w-3 h-3 stroke-[3]" />
                  <span>{p.price}</span>
                </div>

                {/* Spicy / Tangy Spiced Gauge Overlay */}
                {p.spicyLevel > 0 && (
                  <div className="absolute bottom-3 right-3 bg-stone-950/90 text-white px-2.5 py-1.5 rounded-xl border border-stone-800 flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
                    <span className="text-[10px] font-bold font-mono">Masala Punch: {p.spicyLevel}/5</span>
                  </div>
                )}
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="font-extrabold text-white text-lg group-hover:text-emerald-400 transition-colors duration-200">
                      {p.name}
                    </h4>
                    <span className={`text-[10px] font-bold tracking-wider px-2 py-0.5 rounded-md border ${getBadgeStyles(p.badge)}`}>
                      {p.badge}
                    </span>
                  </div>
                  
                  <p className="text-amber-400 font-bold text-xs font-mono">{p.tagline}</p>
                  
                  <p className="text-stone-400 text-xs leading-relaxed line-clamp-3">
                    {p.description}
                  </p>
                </div>

                {/* Ingredients chips */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-mono text-stone-500 uppercase tracking-wider block font-bold">
                    Primary Ingredients:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {p.ingredients.map((ing, idx) => (
                      <span
                        key={idx}
                        className="bg-stone-950 text-stone-400 border border-stone-800 px-2 py-0.5 rounded-md text-[10px] font-medium"
                      >
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>

                {/* AI Consult Action */}
                <div className="pt-4 border-t border-stone-800/80 flex gap-2">
                  <button
                    onClick={() => onAskAIAboutProduct(p.name)}
                    className="flex-1 bg-stone-950 hover:bg-emerald-500 text-stone-300 hover:text-stone-950 border border-stone-800 hover:border-emerald-400 font-bold py-2 px-3 rounded-xl transition duration-150 flex items-center justify-center gap-1.5 cursor-pointer text-xs transform active:scale-95 shadow-md"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400 group-hover:text-stone-950" />
                    Ask Taste AI details
                  </button>
                  <a
                    href="https://ratlamizeera.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 font-bold p-2.5 rounded-xl transition duration-150 flex items-center justify-center cursor-pointer transform active:scale-95 shadow-xs"
                    title="Order on official store"
                  >
                    <ShoppingBag className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
