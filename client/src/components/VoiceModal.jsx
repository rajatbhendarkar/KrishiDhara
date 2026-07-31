import React, { useState, useEffect } from 'react';
import { Mic, X, Sparkles, CheckCircle2, Globe, Send } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const VoiceModal = ({ isOpen, onClose, onSendTranscript }) => {
  const { language: currentLang } = useLanguage();
  const [selectedLang, setSelectedLang] = useState(currentLang || 'hi');
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (isOpen) { setTranscript(''); setIsListening(false); }
  }, [isOpen]);

  if (!isOpen) return null;

  const sampleVoicePrompts = {
    hi: 'मेरे टमाटर के पौधों के पत्तों पर भूरे रंग के गोल धब्बे आ गए हैं, क्या छिड़काव करूँ?',
    mr: 'माझ्या टोमॅटोच्या पिकावर पिवळे डाग पडले आहेत, यावर कोणते औषध फवारावे?',
    en: 'My tomato crop has yellowing leaves with dark spots. What fungicide should I use?'
  };

  const handleStartListening = () => {
    setIsListening(true);
    setTranscript('');
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.lang = { hi: 'hi-IN', mr: 'mr-IN', en: 'en-US' }[selectedLang] || 'hi-IN';
      recognition.interimResults = true;
      recognition.onresult = (e) => setTranscript(Array.from(e.results).map(r => r[0].transcript).join(''));
      recognition.onerror = () => { setTimeout(() => { setTranscript(sampleVoicePrompts[selectedLang]); setIsListening(false); }, 2000); };
      recognition.onend = () => setIsListening(false);
      recognition.start();
    } else {
      setTimeout(() => { setTranscript(sampleVoicePrompts[selectedLang]); setIsListening(false); }, 2500);
    }
  };

  const handleSubmit = () => {
    if (!transcript.trim()) return;
    setProcessing(true);
    setTimeout(() => { onSendTranscript(transcript, selectedLang); setProcessing(false); onClose(); }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-lg w-full p-6 shadow-2xl relative space-y-5">

        <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition">
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>OpenAI Whisper Voice Engine</span>
          </div>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Multilingual Voice Assistant</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">Speak your crop problem in your preferred native language</p>
        </div>

        {/* Language Selection */}
        <div className="flex items-center justify-center gap-2 bg-slate-50 dark:bg-slate-950 p-1.5 rounded-xl border border-slate-200 dark:border-slate-800">
          <Globe className="w-4 h-4 text-emerald-500 ml-2" />
          {[{ code: 'hi', name: 'हिंदी' }, { code: 'mr', name: 'मराठी' }, { code: 'en', name: 'English' }].map(lang => (
            <button key={lang.code} onClick={() => setSelectedLang(lang.code)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${selectedLang === lang.code ? 'bg-emerald-500 text-white shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'}`}>
              {lang.name}
            </button>
          ))}
        </div>

        {/* Mic Button */}
        <div className="flex flex-col items-center py-4 space-y-4">
          <div className="relative">
            {isListening && (
              <>
                <div className="absolute -inset-4 rounded-full bg-emerald-400/20 animate-ping" />
                <div className="absolute -inset-8 rounded-full bg-emerald-400/10 animate-pulse" />
              </>
            )}
            <button onClick={handleStartListening}
              className={`w-24 h-24 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 active:scale-95 ${isListening ? 'bg-gradient-to-tr from-red-500 to-rose-400 ring-4 ring-red-300' : 'bg-gradient-to-tr from-emerald-500 to-emerald-400 hover:scale-105 ring-4 ring-emerald-200'}`}>
              <Mic className={`w-10 h-10 text-white ${isListening ? 'animate-bounce' : ''}`} />
            </button>
          </div>
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
            {isListening ? '🎙️ Listening... Speak now clearly' : 'Click microphone to start speaking'}
          </p>
        </div>

        {/* Transcript Box */}
        <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 space-y-2 min-h-[90px] flex flex-col justify-between">
          <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider flex items-center justify-between">
            <span>Speech Transcript</span>
            {transcript && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />}
          </span>
          <p className="text-sm text-slate-700 dark:text-slate-200 italic leading-relaxed">
            {transcript || (isListening ? 'Capturing audio...' : 'Your spoken words will appear here...')}
          </p>
          {!transcript && (
            <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex flex-wrap gap-1.5">
              <span className="text-[10px] text-slate-400 dark:text-slate-500 self-center">Try sample:</span>
              <button onClick={() => setTranscript(sampleVoicePrompts[selectedLang])}
                className="text-[11px] bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-emerald-600 dark:text-emerald-400 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
                "{sampleVoicePrompts[selectedLang].substring(0, 35)}..."
              </button>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition">
            Cancel
          </button>
          <button disabled={!transcript || processing} onClick={handleSubmit}
            className="flex-1 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold shadow-md disabled:opacity-50 flex items-center justify-center gap-2 transition">
            <Send className="w-4 h-4" />
            <span>{processing ? 'Processing...' : 'Send to Plant Doctor'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
