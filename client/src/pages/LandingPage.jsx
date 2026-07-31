import React from 'react';
import { Sprout, Mic, ShieldCheck, Cpu, CloudSun, MapPin, Award, ArrowRight, CheckCircle2, HelpCircle, Star, Users } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const LandingPage = ({ setActiveTab, onOpenVoiceModal }) => {
  const { t, language } = useLanguage();

  const features = [
    { icon: Cpu,        titleKey: 'feat1Title', descKey: 'feat1Desc' },
    { icon: Mic,        titleKey: 'feat2Title', descKey: 'feat2Desc' },
    { icon: CloudSun,   titleKey: 'feat3Title', descKey: 'feat3Desc' },
    { icon: ShieldCheck,titleKey: 'feat4Title', descKey: 'feat4Desc' },
    { icon: MapPin,     titleKey: 'feat5Title', descKey: 'feat5Desc' },
    { icon: Users,      titleKey: 'feat6Title', descKey: 'feat6Desc' },
  ];

  const stats = [
    { value: '45,000+', labelKey: 'stat1' },
    { value: '98.4%',   labelKey: 'stat2' },
    { value: '120+',    labelKey: 'stat3' },
    { value: '₹4.2 Cr', labelKey: 'stat4' },
  ];

  const checks = ['heroCheck1', 'heroCheck2', 'heroCheck3', 'heroCheck4'];

  return (
    <div className="relative space-y-20 pb-16">

      {/* HERO */}
      <section className="relative pt-8 pb-16 overflow-hidden">
        {/* Soft green glow background */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full bg-emerald-100/60 dark:bg-emerald-950/30 blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto px-4 text-center space-y-7">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 dark:bg-slate-900/90 border border-emerald-300 dark:border-emerald-700/50 text-emerald-700 dark:text-emerald-400 text-xs font-semibold shadow backdrop-blur">
            <Sprout className="w-3.5 h-3.5" />
            <span>{t('heroBadge')}</span>
          </div>

          {/* Title */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1] text-slate-900 dark:text-white" style={{fontFamily: "'Outfit', 'Noto Sans Devanagari', sans-serif", fontWeight: 900}}>
            {t('heroTitleLine1')}
            <br />
            <span className="text-emerald-500">{t('heroTitleLine2')}</span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-500 dark:text-slate-300 leading-relaxed" style={{fontFamily: "'Noto Sans Devanagari', 'Inter', sans-serif"}}>
            {t('heroSubtitle')}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => setActiveTab('doctor')}
              className="flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm shadow-lg shadow-emerald-500/30 active:scale-95 transition-all"
            >
              <Mic className="w-4 h-4" />
              <span>{t('heroCtaDoctor')}</span>
            </button>

            <button
              onClick={onOpenVoiceModal}
              className="flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-bold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 active:scale-95 transition-all shadow"
            >
              <Mic className="w-4 h-4 text-emerald-500" />
              <span>{t('heroCtaVoice')}</span>
            </button>
          </div>

          {/* Check badges */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 pt-2">
            {checks.map(key => (
              <div key={key} className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>{t(key)}</span>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* STATS */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 text-center shadow-sm">
          {stats.map((s, i) => (
            <div key={i} className="space-y-1">
              <div className="text-3xl font-extrabold text-emerald-500 font-outfit">{s.value}</div>
              <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">{t(s.labelKey)}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="max-w-7xl mx-auto px-4 space-y-10">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white font-outfit">{t('featuresTitle')}</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm max-w-xl mx-auto">{t('featuresSub')}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div key={i} className="bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 hover:border-emerald-400/50 p-6 rounded-2xl space-y-3 hover:-translate-y-1 transition-all duration-300 group shadow-sm">
                <div className="w-11 h-11 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-slate-800 dark:text-white">{t(f.titleKey)}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{t(f.descKey)}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 space-y-8">
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white font-outfit">{t('testimonialsTitle')}</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">{t('testimonialsSub')}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            { name: 'Ramesh Patel',        location: 'Nashik, Maharashtra', crop: 'Tomato & Grapes',  quoteKey: 'testimonial1' },
            { name: 'Suresh Kumar Sharma', location: 'Karnal, Haryana',     crop: 'Wheat & Paddy',   quoteKey: 'testimonial2' },
            { name: 'Balaji Rao',          location: 'Guntur, Andhra Pradesh', crop: 'Chilli & Cotton', quoteKey: 'testimonial3' },
          ].map((item, i) => (
            <div key={i} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl space-y-3 shadow-sm">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, j) => <Star key={j} className="w-3.5 h-3.5 fill-amber-400" />)}
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-200 italic leading-relaxed">"{t(item.quoteKey)}"</p>
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-bold text-slate-800 dark:text-white">{item.name}</h4>
                  <p className="text-[11px] text-slate-400">{item.location}</p>
                </div>
                <span className="bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 px-2 py-1 rounded text-[10px] font-semibold border border-emerald-200 dark:border-emerald-800">
                  {item.crop}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-4 space-y-5">
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white font-outfit">{t('faqTitle')}</h2>
        </div>
        <div className="space-y-3">
          {[1,2,3,4].map(n => (
            <div key={n} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl space-y-1.5 shadow-sm">
              <h3 className="text-sm font-bold text-slate-800 dark:text-white flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                {t(`faq${n}Q`)}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-300 leading-relaxed pl-6">{t(`faq${n}A`)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="bg-gradient-to-r from-emerald-600 to-emerald-500 rounded-3xl p-10 text-center space-y-5 shadow-xl">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-outfit">{t('ctaTitle')}</h2>
          <p className="text-sm text-emerald-100 max-w-xl mx-auto">{t('ctaSub')}</p>
          <button
            onClick={() => setActiveTab('doctor')}
            className="px-8 py-3.5 rounded-2xl bg-white text-emerald-600 font-bold text-sm shadow-lg hover:bg-emerald-50 transition"
          >
            {t('ctaBtn')}
          </button>
        </div>
      </section>

    </div>
  );
};
