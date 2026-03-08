'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Joyride, { CallBackProps, STATUS, Step, EVENTS, LIFECYCLE } from 'react-joyride';
import { calculateRetirementExpense, calculateRetirementCorpus, calculateRequiredSIP } from '@/lib/formulas';
import AIAssistant from './AIAssistant';

// Fixed: Defined interface to avoid 'any' type error [cite: 210]
interface TranslationContent {
  title: string; age: string; retAge: string; exp: string; sip: string; 
  corpus: string; infExp: string; inf: string; pre: string; post: string; 
  dur: string; v1: string; v2: string; v3: string;
}

const content: Record<string, TranslationContent> = {
  en: { title: "Retirement Gold Planner", age: "Current Age", retAge: "Retire Age", exp: "Monthly Expense", sip: "Required SIP", corpus: "Total Corpus", infExp: "Inflated Expense", inf: "Inflation (%)", pre: "Accumulation Return (%)", post: "Post-Retire Return (%)", dur: "Retirement Duration (Yrs)", v1: "Enter your age and expenses.", v2: "Set your inflation and returns.", v3: "This is your required monthly investment." },
  hi: { title: "रिटायरمنٹ गोल्ड प्लानر", age: "वर्तमान आयु", retAge: "रिटायर आयु", exp: "मासिक खर्च", sip: "आवश्यक SIP", corpus: "कुल कोष", infExp: "महंगाई खर्च", inf: "मुद्रास्फीति (%)", pre: "संचय रिटर्न (%)", post: "रिटायरमेंट के बाद रिटर्न (%)", dur: "रिटायरमेंट अवधि (वर्ष)", v1: "अपनी आयु और खर्च दर्ज करें।", v2: "अपनी मुद्रास्फीति और रिटर्न निर्धारित करें।", v3: "यह आपका आवश्यक मासिक निवेश है।" },
  mr: { title: "निवृत्ती नियोजन कॅल्क्युलेटर", age: "सध्याचे वय", retAge: "निवृत्तीचे वय", exp: "मासिक खर्च", sip: "आवश्यक SIP", corpus: "एकूण निधी", infExp: "महागाई खर्च", inf: "महागाई (%)", pre: "संचय परतावा (%)", post: "निवृत्तीनंतरचा परतावा (%)", dur: "निवृत्ती कालावधी (वर्षे)", v1: "तुमचे वय आणि खर्च प्रविष्ट करा.", v2: "तुमची महागाई आणि परतावा गृहीतके सेट करा.", v3: "ही तुमची आवश्यक मासिक गुंतवणूक आहे।" },
  ta: { title: "ஓய்வூதியத் திட்டமிடுபவர்", age: "தற்போதைய வயது", retAge: "ஓய்வு வயது", exp: "மாதாந்திர செலவு", sip: "தேவையான SIP", corpus: "மொத்த நிதி", infExp: "வீங்கிய செலவு", inf: "பணவீக்கம் (%)", pre: "சேமிப்பு வருவாய் (%)", post: "ஓய்வுக்குப் பிந்தைய வருவாய் (%)", dur: "ஓய்வூதிய காலம் (ஆண்டுகள்)", v1: "உங்கள் வயது மற்றும் செலவுகளை உள்ளிடவும்.", v2: "உங்கள் பணவீக்கம் மற்றும் வருமானத்தை அமைக்கவும்.", v3: "இது உங்களின் தேவையான மாதாந்திர முதலீடு." },
  ur: { title: "ریٹائرمنٹ گولڈ پلانر", age: "موجودہ عمر", retAge: "ریٹائرمنٹ کی عمر", exp: "ماہانہ اخراجات", sip: "ضروری SIP", corpus: "کل فنڈ", infExp: "مہنگائی کے اخراجات", inf: "مہنگائی (%)", pre: "جمع شدہ واپسی (%)", post: "ریٹائرمنٹ کے بعد کی واپسی (%)", dur: "ریٹائرمنٹ کی مدت (سال)", v1: "اپنی عمر اور اخراجات درج کریں۔", v2: "اپنی مہنگائی اور منافع کی شرح متعین کریں۔", v3: "یہ آپ کی مطلوبہ ماہانہ سرمایہ کاری ہے۔" },
  bn: { title: "অবসর পরিকল্পনা ক্যালকুলেটর", age: "বর্তমান বয়স", retAge: "অবসরের বয়স", exp: "মাসিক খরচ", sip: "প্রয়োজনীয় SIP", corpus: "মোট তহবিল", infExp: "মুদ্রাস্ফীতি খরচ", inf: "মুদ্রাস্ফীতি (%)", pre: "সঞ্চয় রিটার্ন (%)", post: "অবসর-পরবর্তী রিটার্ন (%)", dur: "অবসর সময়কাল (বছর)", v1: "আপনার বয়স এবং খরচ লিখুন।", v2: "আপনার মুদ্রাস্ফীতি এবং রিটার্ন সেট করুন।", v3: "এটি আপনার প্রয়োজনীয় মাসিক বিনিয়োগ।" }
};

const languages = [
  { code: 'en', name: 'English', voice: 'en-IN' },
  { code: 'hi', name: 'हिन्दी', voice: 'hi-IN' },
  { code: 'mr', name: 'मराठी', voice: 'hi-IN' },
  { code: 'ta', name: 'தமிழ்', voice: 'ta-IN' },
  { code: 'ur', name: 'اردو', voice: 'ur-PK' },
  { code: 'bn', name: 'বাংলা', voice: 'bn-IN' }
];

export default function Calculator() {
  const [lang, setLang] = useState('en');
  const t = useMemo(() => content[lang] || content['en'], [lang]);
  const [isMounted, setIsMounted] = useState(false);
  const [showEntryPopup, setShowEntryPopup] = useState(true);
  const [runTour, setRunTour] = useState(false);

  useEffect(() => { setIsMounted(true); }, []);

  const speak = (text: string) => {
    if (typeof window === 'undefined') return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    const selectedLang = languages.find(l => l.code === lang);
    utterance.lang = selectedLang?.voice || 'en-IN';
    window.speechSynthesis.speak(utterance);
  };

  const VoiceBtn = ({ label }: { label: string }) => (
    <button onClick={() => speak(label)} className="ml-2 text-[#224c87] hover:text-[#da3832] transition-opacity">🔊</button>
  );

  const [currentAge, setCurrentAge] = useState(30);
  const [retirementAge, setRetirementAge] = useState(60);
  const [monthlyExpenses, setMonthlyExpenses] = useState(50000);
  const [inflation, setInflation] = useState(6);
  const [preReturn, setPreReturn] = useState(12);
  const [postReturn, setPostReturn] = useState(7);
  const [retDuration, setRetDuration] = useState(25);
  const [results, setResults] = useState({ expense: 0, corpus: 0, sip: 0 });

  useEffect(() => {
    const yearsToRetire = Math.max(1, retirementAge - currentAge);
    const annualExp = monthlyExpenses * 12;
    const inflatedExp = calculateRetirementExpense(annualExp, inflation, yearsToRetire);
    const corpus = calculateRetirementCorpus(inflatedExp, postReturn, retDuration);
    const sip = calculateRequiredSIP(corpus, preReturn, yearsToRetire);
    setResults({ expense: inflatedExp / 12, corpus, sip });
  }, [currentAge, retirementAge, monthlyExpenses, inflation, preReturn, postReturn, retDuration]);

  const steps: Step[] = useMemo(() => [
    { target: '#step-inputs', placement: 'right', title: t.age, content: t.v1, disableBeacon: true },
    { target: '#step-variables', placement: 'top', title: t.inf, content: t.v2 },
    { target: '#step-result', placement: 'left', title: t.sip, content: t.v3 }
  ], [t]);

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { index, lifecycle, status, type } = data;
    if (type === EVENTS.TOOLTIP && lifecycle === LIFECYCLE.TOOLTIP) {
       if (index === 0) speak(t.v1);
       if (index === 1) speak(t.v2);
       if (index === 2) speak(t.v3);
    }
    if (status === STATUS.FINISHED || status === STATUS.SKIPPED) setRunTour(false);
  };

  return (
    <div className="max-w-7xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden font-montserrat relative">
      {isMounted && <Joyride callback={handleJoyrideCallback} continuous run={runTour} steps={steps} styles={{ options: { primaryColor: '#224c87', zIndex: 3000 } }} />}

      <AnimatePresence>
        {isMounted && showEntryPopup && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[4000] flex items-center justify-center bg-[#224c87]/95 backdrop-blur-xl p-6">
            <div className="bg-white rounded-3xl p-10 max-w-md w-full border-b-8 border-[#da3832] text-center shadow-2xl">
              <h2 className="text-2xl font-black text-[#224c87] mb-6">Language & Voice</h2>
              <select value={lang} onChange={(e) => setLang(e.target.value)} className="w-full p-4 bg-slate-50 border-2 border-slate-200 rounded-xl font-bold mb-8">
                {languages.map(l => <option key={l.code} value={l.code}>{l.name}</option>)}
              </select>
              <div className="flex flex-col gap-3">
                <button onClick={() => { setShowEntryPopup(false); setTimeout(() => { setRunTour(true); }, 600); }} className="bg-[#224c87] text-white w-full py-4 rounded-xl font-black uppercase text-sm">Start Guided Tour</button>
                <button onClick={() => setShowEntryPopup(false)} className="bg-slate-100 text-[#224c87] w-full py-4 rounded-xl font-black uppercase text-sm">Skip</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <header className="bg-[#224c87] p-4 md:p-8 flex flex-col md:flex-row justify-between items-center border-b-8 border-[#da3832] gap-4">
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="w-12 h-12 md:w-20 md:h-20 bg-white rounded-lg flex items-center justify-center p-1 relative shadow-lg flex-shrink-0">
            <Image src="/OIP.jpg" alt="HDFC Logo" fill className="object-contain p-1" priority />
          </div>
          <h1 className="text-lg md:text-3xl font-black text-white tracking-tight leading-tight">{t.title}</h1>
        </div>
        <select value={lang} onChange={(e) => setLang(e.target.value)} className="w-full md:w-auto bg-white/10 text-white border-2 border-white/20 rounded-lg p-2 text-xs font-black">
          {languages.map(l => <option key={l.code} value={l.code} className="text-[#224c87]">{l.name}</option>)}
        </select>
      </header>

      <main className="grid grid-cols-1 lg:grid-cols-12">
        <section id="step-inputs" className="lg:col-span-7 p-6 md:p-12 bg-slate-50/50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div><label className="flex items-center text-[11px] font-bold text-[#919090] uppercase tracking-widest">{t.age} <VoiceBtn label={t.age} /></label><input type="number" value={currentAge} onChange={(e) => setCurrentAge(+e.target.value)} className="w-full p-4 bg-white border-2 border-slate-200 rounded-xl font-bold text-[#224c87]" /></div>
            <div><label className="flex items-center text-[11px] font-bold text-[#919090] uppercase tracking-widest">{t.retAge} <VoiceBtn label={t.retAge} /></label><input type="number" value={retirementAge} onChange={(e) => setRetirementAge(+e.target.value)} className="w-full p-4 bg-white border-2 border-slate-200 rounded-xl font-bold text-[#224c87]" /></div>
          </div>
          <div className="mb-10"><label className="flex items-center text-[11px] font-bold text-[#919090] uppercase tracking-widest">{t.exp} <VoiceBtn label={t.exp} /></label><input type="number" value={monthlyExpenses} onChange={(e) => setMonthlyExpenses(+e.target.value)} className="w-full p-4 bg-white border-2 border-slate-200 rounded-xl font-black text-2xl md:text-3xl text-[#224c87]" /></div>
          <div id="step-variables" className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-200">
            <div className="bg-white p-3 md:p-4 rounded-xl border-2 border-slate-100 shadow-sm"><label className="flex items-center text-[10px] font-black text-[#919090] uppercase mb-1 tracking-widest">{t.inf} <VoiceBtn label={t.inf} /></label><input type="number" value={inflation} onChange={(e) => setInflation(+e.target.value)} className="w-full font-bold text-[#224c87]" /></div>
            <div className="bg-white p-3 md:p-4 rounded-xl border-2 border-slate-100 shadow-sm"><label className="flex items-center text-[10px] font-black text-[#919090] uppercase mb-1 tracking-widest">{t.pre} <VoiceBtn label={t.pre} /></label><input type="number" value={preReturn} onChange={(e) => setPreReturn(+e.target.value)} className="w-full font-bold text-[#224c87]" /></div>
            <div className="bg-white p-3 md:p-4 rounded-xl border-2 border-slate-100 shadow-sm"><label className="flex items-center text-[10px] font-black text-[#919090] uppercase mb-1 tracking-widest">{t.post} <VoiceBtn label={t.post} /></label><input type="number" value={postReturn} onChange={(e) => setPostReturn(+e.target.value)} className="w-full font-bold text-[#224c87]" /></div>
            <div className="bg-white p-3 md:p-4 rounded-xl border-2 border-slate-100 shadow-sm"><label className="flex items-center text-[10px] font-black text-[#919090] uppercase mb-1 tracking-widest">{t.dur} <VoiceBtn label={t.dur} /></label><input type="number" value={retDuration} onChange={(e) => setRetDuration(+e.target.value)} className="w-full font-bold text-[#224c87]" /></div>
          </div>
        </section>

        <section id="step-result" className="lg:col-span-5 p-6 md:p-12 bg-white border-l" aria-live="polite">
          <div className="bg-slate-50 p-10 rounded-3xl border-l-8 border-[#da3832] mb-10 shadow-inner">
            <p className="flex items-center text-[11px] font-black text-[#919090] uppercase mb-3 tracking-widest">{t.sip} <VoiceBtn label={t.sip} /></p>
            <p className="text-4xl md:text-6xl font-black text-[#da3832]">₹{Math.round(results.sip).toLocaleString()}</p>
          </div>
          <div className="space-y-6 mb-10">
             <div className="flex justify-between border-b pb-5"><span className="text-[11px] font-bold text-[#919090] uppercase">{t.corpus} <VoiceBtn label={t.corpus} /></span><span className="font-black text-[#224c87] text-xl md:text-2xl">₹{(results.corpus / 10000000).toFixed(2)} Cr</span></div>
             <div className="flex justify-between"><span className="text-[11px] font-bold text-[#919090] uppercase">{t.infExp} <VoiceBtn label={t.infExp} /></span><span className="font-black text-[#224c87] text-xl md:text-2xl">₹{Math.round(results.expense).toLocaleString()}</span></div>
          </div>
          <AIAssistant sip={results.sip} yearsToRetire={retirementAge - currentAge} speak={speak} />
        </section>
      </main>

      <footer className="bg-slate-50 p-6 md:p-8 border-t border-slate-200">
        {/* Fixed: Full mandatory disclaimer for compliance [cite: 191-194] */}
        <p className="text-[10px] text-[#919090] text-center italic leading-relaxed max-w-3xl mx-auto font-medium">
          Disclaimer: This tool has been designed for information purposes only. Actual results may vary depending on various factors involved in capital market. Investor should not consider above as a recommendation for any schemes of HDFC Mutual Fund. Past performance may or may not be sustained in future and is not a guarantee of any future returns.
        </p>
      </footer>
    </div>
  );
}