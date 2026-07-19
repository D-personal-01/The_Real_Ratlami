import React, { useState } from "react";
import { Briefcase, Send, CheckCircle, Mail, HelpCircle, ArrowRight } from "lucide-react";
import { InquiryForm, InquiryResult } from "../types";

interface InquiryPanelProps {
  onSubmitInquiry: (form: InquiryForm) => Promise<InquiryResult>;
  isProcessing: boolean;
  inquiryResult: InquiryResult | null;
}

export default function InquiryPanel({ onSubmitInquiry, isProcessing, inquiryResult }: InquiryPanelProps) {
  const [form, setForm] = useState<InquiryForm>({
    name: "",
    email: "",
    type: "Distributorship Request",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const inquiryTypes = [
    "Distributorship Request",
    "Retail Shop Placement",
    "Wholesale / Bulk Supply",
    "Franchise Query",
    "Event / Marriage Catering",
    "Parent Company (Swad Beverages) Info",
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message || isProcessing) return;
    await onSubmitInquiry(form);
    setSubmitted(true);
  };

  const handleReset = () => {
    setForm({
      name: "",
      email: "",
      type: "Distributorship Request",
      message: "",
    });
    setSubmitted(false);
  };

  return (
    <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 shadow-xl min-h-[500px]">
      <div className="flex items-center gap-2 mb-4">
        <Briefcase className="w-5 h-5 text-emerald-400" />
        <h3 className="font-extrabold text-white text-lg">Partner & Distributorship Portal</h3>
      </div>
      <p className="text-stone-400 text-xs leading-relaxed mb-6">
        Want to become a certified distributor of our Rs. 10 "The Real Ratlami" soft drink range in your pin code or region? Fill out your business details below. Our corporate system at **Swad Beverages** (Indore) will analyze distribution slots and outline a roadmap.
      </p>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Form Column */}
        <div className="flex-1">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-stone-300" htmlFor="name">Full Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={form.name}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., Sunil Choudhary"
                  className="w-full bg-stone-950 border border-stone-850 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 outline-none rounded-xl px-3.5 py-2.5 text-xs text-stone-200 placeholder-stone-600 transition"
                />
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-stone-300" htmlFor="email">Business Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={form.email}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., sunil@choudharydistributors.com"
                  className="w-full bg-stone-950 border border-stone-850 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 outline-none rounded-xl px-3.5 py-2.5 text-xs text-stone-200 placeholder-stone-600 transition"
                />
              </div>
            </div>

            {/* Inquiry Type */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-stone-300" htmlFor="type">Inquiry Type</label>
              <select
                name="type"
                id="type"
                value={form.type}
                onChange={handleInputChange}
                className="w-full bg-stone-950 border border-stone-850 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 outline-none rounded-xl px-3.5 py-2.5 text-xs text-stone-200 transition cursor-pointer"
              >
                {inquiryTypes.map((t, idx) => (
                  <option key={idx} value={t} className="bg-stone-950 text-stone-200">{t}</option>
                ))}
              </select>
            </div>

            {/* Message Details */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-stone-300" htmlFor="message">Your Business / Market Proposal Details</label>
              <textarea
                name="message"
                id="message"
                rows={4}
                value={form.message}
                onChange={handleInputChange}
                required
                placeholder="Mention your retail network size, target supply cities, monthly volume capacities, or event order requirements..."
                className="w-full bg-stone-950 border border-stone-850 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 outline-none rounded-xl px-3.5 py-2.5 text-xs text-stone-200 resize-none placeholder-stone-600 transition"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isProcessing || !form.name || !form.email || !form.message}
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 disabled:from-stone-800 disabled:to-stone-800 disabled:text-stone-500 text-stone-950 font-extrabold py-3 px-4 rounded-xl shadow-lg hover:shadow-emerald-500/10 transition-all duration-200 flex items-center justify-center gap-2 transform active:scale-95 cursor-pointer disabled:cursor-not-allowed text-xs"
            >
              {isProcessing ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-stone-950" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing Business Feasibility...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 text-stone-950" />
                  Submit Inquiry to Corporate Office
                </>
              )}
            </button>
          </form>
        </div>

        {/* AI Action/Result Column */}
        <div className="flex-1 bg-stone-950 rounded-2xl border border-stone-850 p-6 flex flex-col justify-center min-h-[300px] relative">
          {isProcessing ? (
            <div className="flex flex-col items-center justify-center text-center space-y-4 animate-pulse">
              <div className="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-400 rounded-full animate-spin"></div>
              <div className="space-y-1.5">
                <h4 className="font-bold text-white text-sm">Evaluating Proposal Feasibility</h4>
                <p className="text-stone-400 text-xs">AI analyzing regional slot vacancy and drafting Swad Beverages onboarding copy...</p>
              </div>
            </div>
          ) : submitted && inquiryResult ? (
            <div className="space-y-5 animate-fade-in">
              {/* Classified Badge */}
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold mr-2">
                    Classified: {inquiryResult.category}
                  </span>
                </div>
                <button onClick={handleReset} className="text-stone-400 hover:text-emerald-400 text-xs font-bold transition">
                  Reset Form
                </button>
              </div>

              {/* Draft Email */}
              <div className="space-y-1.5">
                <span className="text-stone-500 font-mono text-[10px] uppercase tracking-wider block flex items-center gap-1 font-bold">
                  <Mail className="w-3 h-3 text-emerald-400" />
                  Proposed Automated Draft Reply:
                </span>
                <div className="bg-stone-900 border border-stone-800 p-4 rounded-xl max-h-[220px] overflow-y-auto text-stone-300 text-xs leading-relaxed font-sans whitespace-pre-wrap">
                  {inquiryResult.suggestedResponse}
                </div>
              </div>

              {/* Corporate Next Steps */}
              <div className="space-y-2">
                <span className="text-stone-500 font-mono text-[10px] uppercase tracking-wider block flex items-center gap-1 font-bold">
                  <CheckCircle className="w-3 h-3 text-emerald-400" />
                  Corporate Operations Next Steps:
                </span>
                <ul className="space-y-2">
                  {inquiryResult.actionSteps?.map((step: string, idx: number) => (
                    <li key={idx} className="flex gap-2.5 items-start text-xs text-stone-400">
                      <span className="w-4 h-4 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px] font-bold font-mono shrink-0">
                        {idx + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="text-center max-w-xs mx-auto space-y-3">
              <div className="w-12 h-12 bg-stone-900 rounded-full flex items-center justify-center text-stone-400 border border-stone-800 mx-auto animate-bounce">
                <HelpCircle className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">Corporate Feasibility Room</h4>
                <p className="text-stone-400 text-xs mt-1 leading-relaxed">
                  Fill out the partnership form on the left. The Corporate AI system will immediately run a feasibility check, classify your deal, draft response templates, and lay out execution roadmap actions.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
