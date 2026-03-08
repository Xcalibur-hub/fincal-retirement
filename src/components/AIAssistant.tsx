'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AIAssistantProps {
  sip: number;
  yearsToRetire: number;
  speak: (t: string) => void;
}

const CHAT_DATA = [
  { q: "What are the primary risks?", a: "Mutual fund investments are subject to market risks. Returns are not guaranteed. Read all scheme-related documents carefully." },
  { q: "How do I spot a scam?", a: "HDFC Mutual Fund never asks for OTPs via unofficial links. Always use official HDFC MF platforms and stay alert against fraud." },
  { q: "Why does inflation matter?", a: "Inflation erodes money's value. We calculate inflated expenses to ensure your retirement corpus remains sufficient over time." },
  { q: "Is an early start better?", a: "Yes. Starting early utilizes compounding. Delaying increases the monthly SIP required to reach the same target." },
  { q: "What should I do first?", a: "HDFC recommends having a 6-month emergency fund and health insurance before starting long-term retirement investments." }
];

export default function AIAssistant({ sip, yearsToRetire, speak }: AIAssistantProps) {
  const [activeMsg, setActiveMsg] = useState<string>(
    `Based on your ${yearsToRetire} year horizon, a monthly SIP of ₹${Math.round(sip).toLocaleString()} is your target.`
  );

  return (
    <div className="mt-8 space-y-4">
      <div className="flex flex-wrap gap-2">
        {CHAT_DATA.map((item, idx) => (
          <button
            key={idx}
            onClick={() => { setActiveMsg(item.a); speak(item.a); }}
            className="text-[10px] font-black border border-slate-200 bg-white px-3 py-2 rounded-full text-[#224c87] hover:bg-[#224c87] hover:text-white transition-all shadow-sm"
          >
            {item.q}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={activeMsg} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex gap-3 items-start">
          <div className="w-10 h-10 rounded-full bg-[#224c87] flex-shrink-0 flex items-center justify-center border-2 border-white shadow-md">
            <span className="text-white text-[10px] font-black">AI</span>
          </div>
          <div className="relative bg-white p-5 rounded-2xl rounded-tl-none border border-slate-200 shadow-sm flex-1">
            <p className="text-[10px] font-black text-[#224c87] uppercase tracking-widest mb-2">Assistant Insight</p>
            {/* Fixed: Escaped quotes for production build */}
            <p className="text-sm text-slate-700 leading-relaxed font-medium">&quot;{activeMsg}&quot;</p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}