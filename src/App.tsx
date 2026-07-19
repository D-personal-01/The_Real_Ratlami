import React, { useState } from "react";
import Header from "./components/Header";
import ChatPanel from "./components/ChatPanel";
import FlavorMatcher from "./components/FlavorMatcher";
import { Message, FlavorProfile } from "./types";
import { MessageSquare, Sparkles } from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState<"chat" | "matcher">("chat");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  // Flavor Matcher State
  const [isMatching, setIsMatching] = useState(false);
  const [matchResult, setMatchResult] = useState<any>(null);

  // Send message to the server-side proxy
  const handleSendMessage = async (text: string) => {
    const newUserMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const updatedMessages = [...messages, newUserMessage];
    setMessages(updatedMessages);
    setIsGenerating(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages }),
      });
      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: data.content,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } catch (err: any) {
      console.error("Chat error:", err);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: `⚠️ **Connection Error**: I could not reach the taste servers. Please verify that the local dev server is running properly or try again in a moment.`,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } finally {
      setIsGenerating(false);
    }
  };

  // Process flavor profile match via server-side AI
  const handleMatchFlavor = async (profile: FlavorProfile) => {
    setIsMatching(true);
    setMatchResult(null);

    try {
      const response = await fetch("/api/match-flavor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      });
      const data = await response.json();
      setMatchResult(data);
    } catch (err) {
      console.error("Flavor matching error:", err);
      setMatchResult({
        recommendedProducts: ["Ratlami Zeera", "Ratlami Nimbu Masala"],
        description: "Sorry! We experienced a temporary hiccup matching your palate, but you can't go wrong with our classics. Our crisp, carbonated Ratlami Zeera pairs beautifully with our bestseller Nimbu Masala.",
        pairingTip: "Serve ice cold with fresh mint leaves and a light snack of potato chips!",
      });
    } finally {
      setIsMatching(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-850 font-sans selection:bg-brand-lime/20">
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-12">
        {/* Brand Header Banner */}
        <Header />

        {/* Tab Selection Navigation */}
        <div className="flex flex-col items-center space-y-4">
          <div className="text-center">
            <h2 className="text-xl md:text-2xl font-black text-stone-900 tracking-tight">
              Interactive Brand <span className="text-brand-lime">Workspace</span>
            </h2>
            <p className="text-xs text-stone-500 mt-1">
              Engage with our AI Taste Host, tune sliders, and discover your perfect "India Ka Desi Thanda" blend.
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5 bg-white border border-stone-200 p-1.5 rounded-2xl justify-center shadow-sm">
            <button
              onClick={() => setActiveTab("chat")}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs md:text-sm font-bold transition-all duration-200 cursor-pointer ${
                activeTab === "chat"
                  ? "bg-brand-lime text-white shadow-lg shadow-brand-lime/20 font-extrabold"
                  : "text-stone-500 hover:text-stone-800 hover:bg-stone-100"
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              AI Taste Ambassador
            </button>

            <button
              onClick={() => setActiveTab("matcher")}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs md:text-sm font-bold transition-all duration-200 cursor-pointer ${
                activeTab === "matcher"
                  ? "bg-brand-lime text-white shadow-lg shadow-brand-lime/20 font-extrabold"
                  : "text-stone-500 hover:text-stone-800 hover:bg-stone-100"
              }`}
            >
              <Sparkles className="w-4 h-4" />
              Thanda Matcher
            </button>
          </div>
        </div>

        {/* Main Workspace Panels */}
        <main className="transition-all duration-300">
          {activeTab === "chat" && (
            <div className="space-y-4">
              <ChatPanel
                messages={messages}
                onSendMessage={handleSendMessage}
                isGenerating={isGenerating}
              />
            </div>
          )}

          {activeTab === "matcher" && (
            <FlavorMatcher
              onMatch={handleMatchFlavor}
              isMatching={isMatching}
              matchResult={matchResult}
            />
          )}
        </main>

        {/* Brand Footer */}
        <footer className="text-center py-10 border-t border-stone-200 text-stone-400 space-y-3">
          <p className="text-xs font-mono">
            © {new Date().getFullYear()} Swad Beverages. All rights reserved.
          </p>
          <div className="flex justify-center gap-6 text-xs font-medium">
            <a
              href="https://ratlamizeera.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-500 hover:text-brand-lime transition font-bold"
            >
              Official Store (ratlamizeera.com)
            </a>
            <span className="text-stone-300">|</span>
            <span className="text-stone-500">Made with pride in Malwa, Madhya Pradesh</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
