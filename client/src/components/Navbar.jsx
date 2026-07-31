import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { Sprout, Sun, Moon, User, Menu, X, Globe, LogOut } from 'lucide-react';

export const Navbar = ({ activeTab, setActiveTab, onOpenVoiceModal }) => {
  const { user, logout } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const [isDark, setIsDark] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle('dark', next);
  };

  const navItems = [
    { id: 'landing',   label: t('navHome') },
    { id: 'dashboard', label: t('navDashboard') },
    { id: 'doctor',    label: t('navDoctor') },
    { id: 'weather',   label: t('navWeather') },
    { id: 'schemes',   label: t('navSchemes') },
    { id: 'shops',     label: t('navShops') },
    { id: 'history',   label: t('navHistory') },
  ];

  if (!user) {
    navItems.push({ id: 'login', label: t('navLogin') });
  }



  // Helper to split navigation labels into 2 lines for a clean stacked look like the reference image
  const renderMultiLineLabel = (text) => {
    if (!text) return null;
    const parts = text.split(' ');
    if (parts.length === 1) return <span>{text}</span>;
    if (parts.length === 2) {
      return (
        <>
          <span>{parts[0]}</span>
          <span>{parts[1]}</span>
        </>
      );
    }
    if (parts.length >= 3) {
      return (
        <>
          <span>{parts[0]}</span>
          <span>{parts.slice(1).join(' ')}</span>
        </>
      );
    }
    return <span>{text}</span>;
  };

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-slate-950 border-b border-slate-200/80 dark:border-slate-800 shadow-sm py-2 px-4 sm:px-6">
      <div className="max-w-[1850px] mx-auto flex items-center justify-between gap-3 min-h-[72px] sm:min-h-[76px]">

        {/* Logo & Subtitle */}
        <div onClick={() => setActiveTab('landing')} className="flex items-center gap-3 cursor-pointer shrink-0">
          <img 
            src="/krishidhara_logo.jpg" 
            alt="Krushi Dhara Logo" 
            className="w-[56px] h-[56px] sm:w-[62px] sm:h-[62px] rounded-2xl object-cover border-2 border-emerald-500 dark:border-emerald-400 shadow-md shrink-0 hover:scale-105 transition-transform"
          />
          <div className="leading-tight flex flex-col justify-center">
            <div className="flex items-center gap-2">
              <img 
                src="/krishidhara_text_logo.png" 
                alt="कृषिधारा" 
                className="h-9 sm:h-11 w-auto object-contain max-w-[240px] sm:max-w-[270px] dark:brightness-110"
              />
              <span className="text-xs font-bold bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 px-2.5 py-0.5 rounded-full border border-emerald-300 dark:border-emerald-700 flex items-center gap-1 shadow-2xs shrink-0">
                <span className="text-[11px]">✨</span> AI
              </span>
            </div>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 leading-tight max-w-[220px] mt-0.5">
              {t('appSubtitle')}
            </p>
          </div>
        </div>

        {/* Desktop Nav Items */}
        <div className="hidden lg:flex items-center justify-center gap-1 flex-1 px-2">
          {navItems.map(item => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-3.5 py-2 text-xs sm:text-sm font-extrabold leading-tight text-center transition-all flex flex-col items-center justify-center min-w-[76px] min-h-[48px] cursor-pointer ${
                  isActive
                    ? 'bg-[#d2f4ea] dark:bg-emerald-900/50 text-[#047857] dark:text-emerald-300 rounded-2xl border border-emerald-300 dark:border-emerald-700 shadow-xs'
                    : 'text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800/80 rounded-2xl'
                }`}
                style={{ fontFamily: "'Noto Sans Devanagari', 'Inter', sans-serif" }}
              >
                {renderMultiLineLabel(item.label)}
              </button>
            );
          })}
        </div>

        {/* Right Side Controls */}
        <div className="flex items-center gap-3 shrink-0">

          {/* Farmer role badge */}
          {user && (
            <div className="hidden xl:flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-200 shadow-xs">
              <User className="w-4 h-4 text-emerald-500" />
              <span>{t(`role${user.role.charAt(0).toUpperCase() + user.role.slice(1)}`) || user.role}</span>
            </div>
          )}

          {/* Language selector */}
          <div className="flex items-center bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full p-1.5 gap-1 shadow-xs">
            <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500 ml-2 mr-1" />
            {[
              { code: 'en', label: 'EN' },
              { code: 'hi', label: 'HI' },
              { code: 'mr', label: 'MR' }
            ].map(lang => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                className={`px-3 py-1 rounded-full text-xs sm:text-sm font-extrabold transition-all ${
                  language === lang.code
                    ? 'bg-emerald-500 text-white shadow-xs'
                    : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="p-2.5 sm:p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition flex items-center justify-center shadow-xs"
            title="Toggle Theme"
          >
            {isDark ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-700" />}
          </button>

          {/* Auth State Buttons: Login when logged out, Profile & Logout when logged in */}
          {!user ? (
            <button
              onClick={() => setActiveTab('login')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-xs sm:text-sm shadow-md cursor-pointer transition"
            >
              <User className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
              <span>{t('navLogin') || 'Login / Register'}</span>
            </button>
          ) : (
            <>
              <button
                onClick={() => setActiveTab('profile')}
                className="flex items-center gap-2.5 p-1.5 pr-4 rounded-2xl bg-[#9fb7b0] dark:bg-slate-800 text-slate-900 dark:text-white hover:opacity-95 transition shadow-xs cursor-pointer"
              >
                <div className="w-8 h-8 rounded-xl bg-emerald-500 text-white font-black text-sm flex items-center justify-center shadow-xs overflow-hidden">
                  {user.photo || user.profile_pic ? (
                    <img src={user.photo || user.profile_pic} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    user.name ? user.name.charAt(0).toUpperCase() : 'U'
                  )}
                </div>
                <span className="text-xs sm:text-sm font-bold hidden sm:inline text-slate-900 dark:text-white">
                  {user.name ? user.name.split(' ')[0] : 'User'}
                </span>
              </button>

              <button
                onClick={() => {
                  logout();
                  setActiveTab('login');
                }}
                className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800/60 font-bold text-xs sm:text-sm transition cursor-pointer shadow-xs"
                title="Logout session"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden md:inline">{t('navLogout') || 'Logout'}</span>
              </button>
            </>
          )}

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2.5 rounded-2xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 px-4 py-3 space-y-1">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => { setActiveTab(item.id); setMobileOpen(false); }}
              className={`w-full text-left px-3.5 py-2 rounded-xl text-sm font-bold transition ${
                activeTab === item.id
                  ? 'bg-[#d2f4ea] text-[#047857] dark:bg-emerald-900/50 dark:text-emerald-300'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {item.label}
            </button>
          ))}

          {user && (
            <button
              onClick={() => {
                logout();
                setActiveTab('login');
                setMobileOpen(false);
              }}
              className="w-full text-left px-3.5 py-2 rounded-xl text-sm font-bold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/50 flex items-center gap-2 transition"
            >
              <LogOut className="w-4 h-4" />
              <span>{t('navLogout') || 'Logout'}</span>
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

