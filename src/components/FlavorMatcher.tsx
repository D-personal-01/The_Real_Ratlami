import React, { useState } from "react";
import { Sparkles, RefreshCw, Layers, GlassWater, Compass } from "lucide-react";
import { FlavorProfile } from "../types";

interface FlavorMatcherProps {
  onMatch: (profile: FlavorProfile) => Promise<any>;
  isMatching: boolean;
  matchResult: any;
}

export default function FlavorMatcher({ onMatch, isMatching, matchResult }: FlavorMatcherProps) {
  const [profile, setProfile] = useState<FlavorProfile>({
    spicy: 6, // maps to Masala Twist
    tangy: 5, // maps to Tanginess Level
    sweet: 4, // maps to Sweetness Level
    clove: 7, // maps to Fizziness Level
  });

  const [loadingStep, setLoadingStep] = useState(0);

  const loadingMessages = [
    "Blending sun-ripened Alphonso mango pulp...",
    "Squeezing fresh tangy nimbu and limes...",
    "Infusing aromatic hand-roasted cumin (zeera)...",
    "Chilling with crisp carbonated fizz bubbles...",
    "Taste Ambassador AI formulating your perfect Rs.10 thanda match..."
  ];

  React.useEffect(() => {
    let interval: any;
    if (isMatching) {
      setLoadingStep(0);
      interval = setInterval(() => {
        setLoadingStep((prev) => (prev + 1) % loadingMessages.length);
      }, 1400);
    }
    return () => clearInterval(interval);
  }, [isMatching]);

  const handleSliderChange = (key: keyof FlavorProfile, val: number) => {
    setProfile((prev) => ({ ...prev, [key]: val }));
  };

  const handleMatchClick = () => {
    onMatch(profile);
  };

  return (
    <div className="bg-white border border-stone-200 rounded-3xl p-6 shadow-xl flex flex-col md:flex-row gap-8 min-h-[500px]">
      {/* Control Sliders Panel */}
      <div className="flex-1 space-y-6">
        <div>
          <h3 className="font-extrabold text-stone-900 text-lg flex items-center gap-2">
            <GlassWater className="w-5 h-5 text-brand-lime animate-pulse" />
            AI Thanda Profile Matcher
          </h3>
          <p className="text-stone-500 text-xs mt-1 leading-relaxed">
            Configure your dream beverage profile using the sliders below. Zeeshan, our Taste AI, will blend and recommend your ultimate "India Ka Desi Thanda" flavor!
          </p>
        </div>

        <div className="space-y-5 pt-2">
          {/* Fizziness Level */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold text-stone-700">
              <span className="flex items-center gap-1.5">🫧 Fizz & Carbonation</span>
              <span className="text-brand-lime-hover bg-brand-lime-light border border-brand-lime/20 px-2 py-0.5 rounded-sm font-mono text-xs">{profile.clove}/10</span>
            </div>
            <input
              type="range"
              min="0"
              max="10"
              value={profile.clove}
              onChange={(e) => handleSliderChange("clove", parseInt(e.target.value))}
              className="w-full h-2 bg-stone-100 rounded-lg appearance-none cursor-pointer accent-brand-lime"
            />
            <p className="text-[10px] text-stone-400">0 is purely still fruit juices (Mango, Lychee); 10 is high-fizz throat tingling explosion.</p>
          </div>

          {/* Tanginess Level */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold text-stone-700">
              <span className="flex items-center gap-1.5">🍋 Citrus Tangy Sourness</span>
              <span className="text-brand-lime-hover bg-brand-lime-light border border-brand-lime/20 px-2 py-0.5 rounded-sm font-mono text-xs">{profile.tangy}/10</span>
            </div>
            <input
              type="range"
              min="0"
              max="10"
              value={profile.tangy}
              onChange={(e) => handleSliderChange("tangy", parseInt(e.target.value))}
              className="w-full h-2 bg-stone-100 rounded-lg appearance-none cursor-pointer accent-brand-lime"
            />
            <p className="text-[10px] text-stone-400">Zesty lemon extracts, refreshing mint, and crisp fruit acids.</p>
          </div>

          {/* Sweetness Level */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold text-stone-700">
              <span className="flex items-center gap-1.5">🍯 Sweetness Balance</span>
              <span className="text-brand-lime-hover bg-brand-lime-light border border-brand-lime/20 px-2 py-0.5 rounded-sm font-mono text-xs">{profile.sweet}/10</span>
            </div>
            <input
              type="range"
              min="0"
              max="10"
              value={profile.sweet}
              onChange={(e) => handleSliderChange("sweet", parseInt(e.target.value))}
              className="w-full h-2 bg-stone-100 rounded-lg appearance-none cursor-pointer accent-brand-lime"
            />
            <p className="text-[10px] text-stone-400">Nectar-like sweet mango and lychee sugars, or clean light sweet touch in sodas.</p>
          </div>

          {/* Masala Twist */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold text-stone-700">
              <span className="flex items-center gap-1.5">🌶️ Chatpata Masala Punch</span>
              <span className="text-brand-lime-hover bg-brand-lime-light border border-brand-lime/20 px-2 py-0.5 rounded-sm font-mono text-xs">{profile.spicy}/10</span>
            </div>
            <input
              type="range"
              min="0"
              max="10"
              value={profile.spicy}
              onChange={(e) => handleSliderChange("spicy", parseInt(e.target.value))}
              className="w-full h-2 bg-stone-100 rounded-lg appearance-none cursor-pointer accent-brand-lime"
            />
            <p className="text-[10px] text-stone-400">Traditional cumin (zeera), black salt (kala namak), black pepper, and digestive spices.</p>
          </div>
        </div>

        <button
          onClick={handleMatchClick}
          disabled={isMatching}
          className="w-full bg-brand-lime hover:bg-brand-lime-hover disabled:bg-stone-200 disabled:text-stone-400 text-white font-extrabold py-3 px-4 rounded-xl shadow-lg hover:shadow-brand-lime/10 transition-all duration-200 flex items-center justify-center gap-2 transform active:scale-95 cursor-pointer disabled:cursor-not-allowed text-xs mt-4"
        >
          {isMatching ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin text-white" />
              Chilling & Blending...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-white" />
              Formulate Desi Refreshment
            </>
          )}
        </button>
      </div>

      {/* Result Display Panel */}
      <div className="flex-1 bg-stone-50 rounded-2xl border border-stone-200 p-6 flex flex-col justify-center min-h-[250px] relative overflow-hidden">
        {isMatching ? (
          <div className="flex flex-col items-center justify-center text-center space-y-4">
            {/* Spinning/pulsating decorative wheel */}
            <div className="relative w-16 h-16 flex items-center justify-center">
              <div className="absolute inset-0 border-4 border-brand-lime-light border-t-brand-lime rounded-full animate-spin"></div>
              <Sparkles className="w-6 h-6 text-brand-lime animate-pulse" />
            </div>
            <div className="space-y-1.5 px-4">
              <h4 className="font-extrabold text-stone-900 text-sm">Taste Lab Blending</h4>
              <p className="text-stone-500 text-xs animate-pulse font-mono">{loadingMessages[loadingStep]}</p>
            </div>
          </div>
        ) : matchResult ? (
          <div className="space-y-5 animate-fade-in">
            <div>
              <span className="text-[10px] uppercase font-mono tracking-wider px-2.5 py-1 rounded-full bg-brand-lime-light text-brand-lime-hover border border-brand-lime/20 font-black">
                My Desi Match
              </span>
              <h4 className="text-xl font-black text-stone-900 mt-2">Recommended Drinks</h4>
            </div>

            {/* Recommended Products */}
            <div className="space-y-2">
              <span className="text-stone-400 font-mono text-[10px] uppercase tracking-wider block font-bold">Perfect Match Flavours:</span>
              <div className="flex flex-wrap gap-2">
                {matchResult.recommendedProducts?.map((p: string, i: number) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 bg-white border border-stone-200 text-brand-lime-hover px-3 py-1.5 rounded-lg text-xs font-bold shadow-sm"
                  >
                    <Layers className="w-3.5 h-3.5 text-brand-lime" />
                    {p}
                  </span>
                ))}
              </div>
            </div>

            {/* Sensory Description */}
            <div className="bg-white p-4 rounded-xl border border-stone-200 space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-brand-lime-hover">
                <Sparkles className="w-3.5 h-3.5" />
                Taste Ambassador Explanation:
              </div>
              <p className="text-xs text-stone-700 leading-relaxed italic">
                "{matchResult.description}"
              </p>
            </div>

            {/* Pairing Tip */}
            <div className="bg-brand-lime-light p-4 rounded-xl border border-brand-lime/20 space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-brand-lime-hover">
                <Compass className="w-3.5 h-3.5 text-brand-lime" />
                Malwa Refreshment Tip:
              </div>
              <p className="text-xs text-stone-800 leading-relaxed font-semibold">
                {matchResult.pairingTip}
              </p>
            </div>
          </div>
        ) : (
          <div className="text-center max-w-xs mx-auto space-y-3">
            <div className="w-12 h-12 bg-brand-lime-light rounded-full flex items-center justify-center text-brand-lime mx-auto">
              <GlassWater className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-extrabold text-stone-900 text-sm">Taste Matcher Awaiting</h4>
              <p className="text-stone-500 text-xs mt-1 leading-relaxed">
                Configure your preferred sweetness, fizziness, sourness, and masala sliders on the left, and click to reveal your ultimate thanda recommendations.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
