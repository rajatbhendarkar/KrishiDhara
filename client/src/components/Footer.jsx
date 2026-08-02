import React from 'react';
import { Sprout, Phone, ShieldCheck, Heart } from 'lucide-react';

export const Footer = ({ setActiveTab }) => {
  return (
    <footer className="bg-slate-100 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 py-8 sm:py-10 px-4 sm:px-6 mt-12 sm:mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        
        {/* Col 1 */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <img 
              src="/krishidhara_text_logo.png" 
              alt="Krushi Dhara" 
              className="h-8 w-auto object-contain max-w-[170px]"
            />
            <span className="text-[11px] font-bold bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-200/70 dark:border-emerald-800/50 flex items-center gap-0.5">
              <span>✨</span> AI
            </span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Smart Plant Doctor powered by AI image recognition, multilingual voice assistant (Hindi, Marathi, English), and agricultural expert network.
          </p>
          <div className="flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>Govt of India Agritech Approved</span>
          </div>
        </div>

        {/* Col 2 */}
        <div>
          <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-3 uppercase tracking-wider">Quick Navigation</h4>
          <ul className="space-y-2 text-xs">
            <li><button onClick={() => setActiveTab('doctor')} className="py-1 hover:text-emerald-600 dark:hover:text-emerald-400 transition text-left">AI Plant Doctor</button></li>
            <li><button onClick={() => setActiveTab('dashboard')} className="py-1 hover:text-emerald-600 dark:hover:text-emerald-400 transition text-left">Farmer Dashboard</button></li>
            <li><button onClick={() => setActiveTab('weather')} className="py-1 hover:text-emerald-600 dark:hover:text-emerald-400 transition text-left">Weather Risk Assessment</button></li>
            <li><button onClick={() => setActiveTab('schemes')} className="py-1 hover:text-emerald-600 dark:hover:text-emerald-400 transition text-left">Government Schemes Explorer</button></li>
            <li><button onClick={() => setActiveTab('shops')} className="py-1 hover:text-emerald-600 dark:hover:text-emerald-400 transition text-left">Nearby Agri Shops & Centers</button></li>
          </ul>
        </div>

        {/* Col 3 */}
        <div>
          <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-3 uppercase tracking-wider">System Architecture</h4>
          <ul className="space-y-2 text-xs">
            <li><button onClick={() => setActiveTab('diagrams')} className="py-1 hover:text-emerald-600 dark:hover:text-emerald-400 transition text-left">ER Diagram & Database Schema</button></li>
            <li><button onClick={() => setActiveTab('diagrams')} className="py-1 hover:text-emerald-600 dark:hover:text-emerald-400 transition text-left">DFD Level 0 & Level 1</button></li>
            <li><button onClick={() => setActiveTab('diagrams')} className="py-1 hover:text-emerald-600 dark:hover:text-emerald-400 transition text-left">Sequence & Class Diagrams</button></li>
            <li><button onClick={() => setActiveTab('diagrams')} className="py-1 hover:text-emerald-600 dark:hover:text-emerald-400 transition text-left">API Documentation</button></li>
          </ul>
        </div>

        {/* Col 4 */}
        <div>
          <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-3 uppercase tracking-wider">Kisan Helpline</h4>
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl space-y-2 text-xs shadow-sm">
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold">
              <Phone className="w-4 h-4 shrink-0" />
              <span>National Kisan Call Center</span>
            </div>
            <p className="text-slate-900 dark:text-white font-bold text-base">1800-180-1551</p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">Toll-free advisory service active 6:00 AM to 10:00 PM every day.</p>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto border-t border-slate-200 dark:border-slate-900 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4 text-center sm:text-left">
        <p>© 2026 Krushi Dhara AI. Built for Indian Farmers with AI innovation.</p>
        <div className="flex items-center gap-1">
          <span>Empowering Agriculture with</span>
          <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 shrink-0" />
        </div>
      </div>
    </footer>
  );
};
