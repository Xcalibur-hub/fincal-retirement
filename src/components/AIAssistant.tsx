'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';


interface AIAssistantProps {
  sip: number;
  yearsToRetire: number;
  speak: (t: string) => void;
}

const CHAT_DATA = [
  {
    q: "What are the primary risks?",
    a: "Mutual fund investments are subject to market risks. Returns are not guaranteed, and your principal may fluctuate. Please read all scheme-related documents carefully."
  },
  {
    q: "How do I spot a scam?",
    a: "HDFC Mutual Fund never asks for OTPs or passwords via unofficial links. Always use official HDFC MF platforms for transactions and stay alert against fraud."
  },
  {
    q: "Why does inflation matter?",
    a: "Inflation erodes the value of money. A ₹50,000 expense today will cost much more in the future. We calculate this to ensure your retirement corpus is sufficient."
  },
  {
    q: "Is an early start better?",
    a: "Absolutely. Starting early utilizes the power of compounding. Delaying even by a few years can significantly increase the monthly SIP required to reach your goal."
  },
  {
    q: "What should I do first?",
    a: "HDFC recommends building a 6-month emergency fund and having adequate health insurance before starting your long-term retirement SIP."
  }
];

export default function AIAssistant({ sip, yearsToRetire, speak }: AIAssistantProps) {
  const [activeMsg, setActiveMsg] = useState<string>(
    `Based on your ${yearsToRetire} year horizon, a monthly SIP of ₹${Math.round(sip).toLocaleString()} is your mathematical target.`
  );

  return (
    <div className="mt-8 space-y-4">
     
      <div className="flex flex-wrap gap-2">
        {CHAT_DATA.map((item, idx) => (
          <button
            key={idx}
            onClick={() => {
              setActiveMsg(item.a);
              speak(item.a); 
            }}
            className="text-[10px] font-black border border-slate-200 bg-white px-3 py-2 rounded-full text-[#224c87] hover:bg-[#224c87] hover:text-white transition-all shadow-sm"
          >
            {item.q}
          </button>
        ))}
      </div>

     
      <AnimatePresence mode="wait">
        <motion.div 
          key={activeMsg}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex gap-3 items-start"
        >
          <div className="w-10 h-10 rounded-full bg-[#224c87] flex-shrink-0 flex items-center justify-center border-2 border-white shadow-md">
            <span className="text-white text-[10px] font-black">AI</span>
          </div>

          <div className="relative bg-white p-5 rounded-2xl rounded-tl-none border border-slate-200 shadow-sm flex-1">
            <div className="absolute top-0 -left-2 w-0 h-0 border-t-[12px] border-t-white border-l-[12px] border-l-transparent"></div>
            <p className="text-[10px] font-black text-[#224c87] uppercase tracking-widest mb-2">Assistant Insight</p>
            <p className="text-sm text-slate-700 leading-relaxed font-medium">"{activeMsg}"</p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}