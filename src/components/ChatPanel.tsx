import React, { useState, useRef, useEffect } from "react";
import Markdown from "react-markdown";
import { Send, Sparkles, MessageSquare, ArrowRight, GlassWater } from "lucide-react";
import { Message } from "../types";

interface ChatPanelProps {
  messages: Message[];
  onSendMessage: (text: string) => Promise<void>;
  isGenerating: boolean;
}

export default function ChatPanel({ messages, onSendMessage, isGenerating }: ChatPanelProps) {
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isGenerating]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isGenerating) return;
    onSendMessage(input.trim());
    setInput("");
  };

  const starterQuestions = [
    { text: "What are the 6 legendary flavours?", icon: GlassWater },
    { text: "What makes Ratlami Zeera authentic?", icon: Sparkles },
    { text: "Tell me about Swad Beverages in Indore.", icon: MessageSquare },
  ];

  return (
    <div className="flex flex-col h-[600px] bg-white rounded-3xl border border-stone-250 shadow-xl overflow-hidden">
      {/* Header */}
      <div className="bg-stone-50 border-b border-stone-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-brand-lime flex items-center justify-center text-white font-black text-lg shadow-lg shadow-brand-lime/20">
            Z
          </div>
          <div>
            <h3 className="font-bold text-stone-900 text-sm md:text-base flex items-center gap-1.5">
              Zeeshan <span className="text-[9px] uppercase font-mono tracking-wider px-2 py-0.5 rounded-full bg-brand-lime-light text-brand-lime-hover border border-brand-lime/20 font-black">Ambassador</span>
            </h3>
            <p className="text-xs text-stone-500">Official Brand Taste AI</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-brand-lime-hover bg-brand-lime-light px-2.5 py-1 rounded-full border border-brand-lime/20 font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-lime animate-pulse"></span>
          Ready to Guide
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-stone-50/50">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center max-w-sm mx-auto space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-brand-lime-light border border-brand-lime/20 flex items-center justify-center text-brand-lime animate-bounce">
              <GlassWater className="w-8 h-8" />
            </div>
            <div>
              <h4 className="font-extrabold text-stone-900 text-lg">Ask Ambassador Zeeshan!</h4>
              <p className="text-stone-500 text-sm mt-1.5 leading-relaxed">
                Learn about Swad Beverages, the Rs.10 price revolution, still fruit juices vs carbonated sodas, and our secret cumin & lemon spice blends.
              </p>
            </div>

            <div className="w-full space-y-2.5">
              <p className="text-[11px] font-mono uppercase tracking-wider text-stone-400 font-bold">Suggested Questions</p>
              {starterQuestions.map((q, idx) => {
                const Icon = q.icon;
                return (
                  <button
                    key={idx}
                    onClick={() => onSendMessage(q.text)}
                    className="w-full text-left bg-white border border-stone-200 hover:border-brand-lime hover:bg-brand-lime-light/30 p-3.5 rounded-xl transition duration-200 text-xs md:text-sm text-stone-700 flex items-center gap-3 shadow-sm cursor-pointer"
                  >
                    <div className="w-6 h-6 rounded-lg bg-brand-lime-light border border-brand-lime/20 flex items-center justify-center text-brand-lime shrink-0">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <span className="flex-1 font-bold">{q.text}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-stone-400" />
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-3 max-w-[85%] ${
                  m.role === "user" ? "ml-auto flex-row-reverse" : ""
                }`}
              >
                {/* Avatar */}
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 shadow-sm ${
                    m.role === "user"
                      ? "bg-stone-200 text-stone-800 border border-stone-300"
                      : "bg-brand-lime text-white font-black"
                  }`}
                >
                  {m.role === "user" ? "U" : "Z"}
                </div>

                {/* Message Body */}
                <div
                  className={`rounded-2xl p-4 text-sm leading-relaxed shadow-sm ${
                    m.role === "user"
                      ? "bg-brand-lime text-white font-semibold"
                      : "bg-white border border-stone-200 text-stone-850"
                  }`}
                >
                  {m.role === "user" ? (
                    <p className="whitespace-pre-wrap">{m.content}</p>
                  ) : (
                    <div className="markdown-body prose max-w-none text-stone-800 prose-sm prose-emerald">
                      <Markdown>{m.content}</Markdown>
                    </div>
                  )}
                  <span
                    className={`block text-[9px] mt-1.5 font-mono ${
                      m.role === "user" ? "text-white/80 text-right font-black" : "text-stone-400"
                    }`}
                  >
                    {m.timestamp}
                  </span>
                </div>
              </div>
            ))}

            {isGenerating && (
              <div className="flex gap-3 max-w-[80%]">
                <div className="w-8 h-8 rounded-full bg-brand-lime text-white font-black flex items-center justify-center text-xs animate-pulse">
                  Z
                </div>
                <div className="bg-white border border-stone-200 rounded-2xl p-4 shadow-sm flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-brand-lime animate-bounce" style={{ animationDelay: "0ms" }}></span>
                  <span className="w-2 h-2 rounded-full bg-brand-lime animate-bounce" style={{ animationDelay: "150ms" }}></span>
                  <span className="w-2 h-2 rounded-full bg-brand-lime animate-bounce" style={{ animationDelay: "300ms" }}></span>
                </div>
              </div>
            )}
            <div ref={scrollRef} />
          </div>
        )}
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-stone-200 bg-stone-50 flex gap-3 items-center">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isGenerating}
          placeholder="Ask Zeeshan about soft drink flavours, Swad Beverages..."
          className="flex-1 bg-white border border-stone-200 focus:border-brand-lime focus:ring-2 focus:ring-brand-lime/10 outline-none rounded-xl px-4 py-3 text-sm text-stone-850 placeholder-stone-400 focus:bg-white transition-all duration-200"
        />
        <button
          type="submit"
          disabled={!input.trim() || isGenerating}
          className="bg-brand-lime hover:bg-brand-lime-hover disabled:bg-stone-200 disabled:text-stone-400 text-white rounded-xl p-3 shadow-lg hover:shadow-brand-lime/10 transition duration-200 cursor-pointer disabled:cursor-not-allowed transform active:scale-95 flex items-center justify-center shrink-0"
        >
          <Send className="w-4 h-4 text-white stroke-[2.5]" />
        </button>
      </form>
    </div>
  );
}
