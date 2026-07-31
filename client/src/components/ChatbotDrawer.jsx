import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Sparkles, RefreshCw } from 'lucide-react';
import { apiFetch } from '../utils/api';
import { useLanguage } from '../context/LanguageContext';

export const ChatbotDrawer = ({ activeDiagnosis }) => {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{
    id: 'm-1', sender: 'ai',
    text: language === 'hi'
      ? 'नमस्ते किसान भाई! मैं आपका कृषि मित्र AI सहायक हूँ। खाद, सिंचाई या कीट नियंत्रण के बारे में पूछें।'
      : language === 'mr'
      ? 'नमस्कार शेतकरी मित्र! मी तुमचा कृषी मित्र AI सहाय्यक आहे. खते, सिंचन किंवा कीटक नियंत्रणाबद्दल विचारा.'
      : 'Hello Farmer! I am your KrishiMitra AI Assistant. Ask me about plant disease, fertilizers, or irrigation.',
    time: 'Just now'
  }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const promptChips = language === 'hi'
    ? ['जैविक खाद की मात्रा?', 'सिंचाई का सही समय?', 'कौन सा कीटनाशक?', 'फसल कटाई सलाह']
    : language === 'mr'
    ? ['सेंद्रिय खताचे प्रमाण?', 'सिंचनाची वेळ?', 'कोणते कीटकनाशक?', 'काढणी सल्ला']
    : ['Fertilizer dose?', 'Best irrigation time?', 'Which pesticide?', 'Harvest advice'];

  const handleSend = async (queryText) => {
    const text = queryText || input;
    if (!text.trim()) return;
    const userMsg = { id: `usr-${Date.now()}`, sender: 'user', text, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setMessages(prev => [...prev, userMsg]);
    if (!queryText) setInput('');
    setLoading(true);
    try {
      const res = await apiFetch('/ai/chat', { method: 'POST', body: JSON.stringify({ message: text, diseaseContext: activeDiagnosis, language }) });
      if (res.success && res.reply) { setMessages(prev => [...prev, res.reply]); }
      else {
        setMessages(prev => [...prev, {
          id: `ai-${Date.now()}`, sender: 'ai',
          text: `KrishiMitra: For ${activeDiagnosis?.detected_disease || 'your query'}, apply 5ml/L Neem Oil emulsion. Spray during evening hours.`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }]);
      }
    } catch { } finally { setLoading(false); }
  };

  return (
    <>
      {/* FAB */}
      <button onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 bg-emerald-500 hover:bg-emerald-600 text-white p-4 rounded-full shadow-xl hover:scale-110 active:scale-95 transition-all flex items-center gap-2.5">
        <Bot className="w-6 h-6" />
        <span className="hidden md:inline font-bold text-xs pr-1">Ask AI Plant Doctor</span>
        <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-red-500 border-2 border-white" />
      </button>

      {/* Drawer */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 md:right-6 z-50 w-[92vw] sm:w-[420px] h-[550px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden">

          {/* Header */}
          <div className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500 flex items-center justify-center text-white shadow-sm">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-800 dark:text-white flex items-center gap-1.5">
                  KrishiMitra AI Bot <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
                </h3>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">Powered by OpenAI GPT Agritech Expert</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800">
              <X className="w-5 h-5" />
            </button>
          </div>

          {activeDiagnosis && (
            <div className="bg-emerald-50 dark:bg-emerald-950 border-b border-emerald-100 dark:border-emerald-800 px-4 py-2 text-xs flex items-center justify-between text-emerald-700 dark:text-emerald-300">
              <span className="truncate font-medium">Context: {activeDiagnosis.detected_disease}</span>
              <span className="text-[10px] bg-emerald-100 dark:bg-emerald-900 px-2 py-0.5 rounded font-bold">ACTIVE</span>
            </div>
          )}

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50 dark:bg-slate-950">
            {messages.map(msg => (
              <div key={msg.id} className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.sender === 'ai' && (
                  <div className="w-7 h-7 rounded-lg bg-emerald-500 flex items-center justify-center text-white shrink-0 mt-1">
                    <Bot className="w-4 h-4" />
                  </div>
                )}
                <div className={`max-w-[80%] rounded-2xl p-3 text-xs leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-emerald-500 text-white rounded-br-none'
                    : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 rounded-bl-none shadow-sm'
                }`}>
                  <p>{msg.text}</p>
                  <span className="block text-[9px] opacity-60 text-right mt-1">{msg.time}</span>
                </div>
                {msg.sender === 'user' && (
                  <div className="w-7 h-7 rounded-lg bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 shrink-0 mt-1">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}
            {loading && (
              <div className="flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400 p-2">
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>AI Expert thinking...</span>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Chips */}
          <div className="p-2 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex flex-wrap gap-1.5">
            {promptChips.map((chip, i) => (
              <button key={i} onClick={() => handleSend(chip)}
                className="text-[10px] bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:border-emerald-400 text-slate-600 dark:text-slate-300 px-2.5 py-1 rounded-full transition">
                + {chip}
              </button>
            ))}
          </div>

          {/* Input */}
          <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="p-3 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex gap-2">
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about fertilizers, symptoms, watering..."
              className="flex-1 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:border-emerald-400" />
            <button type="submit" disabled={!input.trim() || loading}
              className="bg-emerald-500 hover:bg-emerald-600 text-white p-2 rounded-xl disabled:opacity-40 transition">
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
