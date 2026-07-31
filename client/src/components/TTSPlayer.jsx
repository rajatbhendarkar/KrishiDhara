import React, { useState } from 'react';
import { Volume2, VolumeX, Play, Pause, Globe } from 'lucide-react';

export const TTSPlayer = ({ text, diseaseName }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [lang, setLang] = useState('hi');

  const speakText = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();

      if (isPlaying) {
        setIsPlaying(false);
        return;
      }

      const langCodeMap = { hi: 'hi-IN', mr: 'mr-IN', en: 'en-US' };
      const spokenMsg = lang === 'hi'
        ? `कृषि मित्र निदान परिणाम: ${diseaseName || text}. अनुशंसित उपाय: जैविक खाद और कवकनाशी का समय पर छिड़काव करें।`
        : lang === 'mr'
        ? `कृषी मित्र निदान निकाल: ${diseaseName || text}. सुचवलेले उपाय: सेंद्रिय खते आणि बुरशीनाशकाची योग्य वेळेत फवारणी करा.`
        : `KrishiMitra Diagnosis Result: ${diseaseName || text}. Suggested treatment: Apply organic compost and recommended fungicide on schedule.`;

      const utterance = new SpeechSynthesisUtterance(spokenMsg);
      utterance.lang = langCodeMap[lang] || 'hi-IN';
      utterance.rate = 0.9;

      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);

      setIsPlaying(true);
      window.speechSynthesis.speak(utterance);
    } else {
      alert('Text-to-speech audio reader initialized.');
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-emerald-300 dark:border-agri-500/30 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 shadow-md">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-agri-500/20 border border-emerald-300 dark:border-agri-500/40 flex items-center justify-center text-emerald-600 dark:text-agri-400">
          <Volume2 className="w-5 h-5 animate-pulse" />
        </div>
        <div>
          <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">AI Voice Response Player</h4>
          <p className="text-[11px] text-slate-600 dark:text-slate-400">Listen to diagnosis & treatment instructions in your native language</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Language selector for audio */}
        <select
          value={lang}
          onChange={(e) => setLang(e.target.value)}
          className="bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none"
        >
          <option value="hi">हिंदी (Hindi Audio)</option>
          <option value="mr">मराठी (Marathi Audio)</option>
          <option value="en">English (English Audio)</option>
        </select>

        <button
          onClick={speakText}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white shadow-md transition-all active:scale-95 ${
            isPlaying ? 'bg-amber-600 hover:bg-amber-500' : 'bg-gradient-to-r from-agri-600 to-emerald-600 hover:brightness-110'
          }`}
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
          <span>{isPlaying ? 'Pause Audio' : 'Listen Diagnosis Aloud'}</span>
        </button>
      </div>
    </div>
  );
};
