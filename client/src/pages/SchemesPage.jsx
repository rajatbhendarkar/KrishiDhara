import React, { useState } from 'react';
import { 
  FileText, Search, Filter, Bookmark, ExternalLink, Phone, ShieldCheck, CheckCircle2, Sparkles 
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const SchemesPage = () => {
  const { t, language } = useLanguage();
  const [search, setSearch] = useState('');
  const [selectedState, setSelectedState] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const [schemes, setSchemes] = useState([
    {
      id: 'sch-01',
      scheme_name: {
        en: 'PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)',
        hi: 'पीएम-किसान (प्रधानमंत्री किसान सम्मान निधि)',
        mr: 'पीएम-किसान (प्रधानमंत्री किसान सन्मान निधी)'
      },
      category: 'Income Support',
      state: 'All India',
      crop: 'All Crops',
      benefits: {
        en: 'Direct income support of ₹6,000 per year in 3 equal installments of ₹2,000 transferred directly to bank account.',
        hi: 'बैंक खाते में सीधे हस्तांतरित ₹2,000 की 3 समान किस्तों में ₹6,000 प्रति वर्ष की प्रत्यक्ष आय सहायता।',
        mr: 'बँक खात्यात थेट वर्ग केलेल्या ₹2,000 च्या 3 समान हप्त्यांमध्ये वर्षाला ₹6,000 ची थेट उत्पन्न मदत.'
      },
      eligibility: {
        en: 'Small & Marginal Farmer families owning cultivable land up to 2 hectares.',
        hi: '2 हेक्टेयर तक कृषि योग्य भूमि वाले छोटे और सीमांत किसान परिवार।',
        mr: '2 हेक्टरपर्यंत लागवडीयोग्य जमीन असलेले अल्प व अत्यल्प भूधारक शेतकरी कुटुंब.'
      },
      application_url: 'https://pmkisan.gov.in',
      helpline: '155261 / 011-24300606',
      is_bookmarked: true
    },
    {
      id: 'sch-02',
      scheme_name: {
        en: 'Pradhan Mantri Fasal Bima Yojana (PMFBY)',
        hi: 'प्रधानमंत्री फसल बीमा योजना (PMFBY)',
        mr: 'प्रधानमंत्री पीक विमा योजना (PMFBY)'
      },
      category: 'Crop Insurance',
      state: 'All India',
      crop: 'Food crops, Oilseeds, Commercial crops',
      benefits: {
        en: 'Comprehensive risk insurance against yield losses due to non-preventable risks such as drought, flood, pests & disease.',
        hi: 'सूखा, बाढ़, कीट और बीमारी जैसे अपरिहार्य जोखिमों के कारण उपज हानि के विरुद्ध व्यापक जोखिम बीमा।',
        mr: 'दुष्काळ, महापूर, कीड आणि रोगांसारख्या नैसर्गिक धोक्यांमुळे होणाऱ्या पीक नुकसानीपासून व्यापक विमा संरक्षण.'
      },
      eligibility: {
        en: 'All farmers including sharecroppers and tenant farmers growing notified crops in notified areas.',
        hi: 'अधिसूचित क्षेत्रों में अधिसूचित फसलें उगाने वाले बटाईदार और किरायेदार किसानों सहित सभी किसान।',
        mr: 'अधिसूचित क्षेत्रात अधिसूचित पिके घेणारे कुळ व सर्व शेतकरी.'
      },
      application_url: 'https://pmfby.gov.in',
      helpline: '1800 180 1551',
      is_bookmarked: false
    },
    {
      id: 'sch-03',
      scheme_name: {
        en: 'Maharashtra Crop Pest Protection & Bio-Pesticide Subsidy',
        hi: 'महाराष्ट्र फसल कीट संरक्षण व जैव कीटनाशक सब्सिडी',
        mr: 'महाराष्ट्र पीक कीड संरक्षण आणि सेंद्रिय कीटकनाशक अनुदान'
      },
      category: 'Pesticide Subsidy',
      state: 'Maharashtra',
      crop: 'Cotton, Tomato, Soyabean',
      benefits: {
        en: '50% financial subsidy on government approved organic biopesticides, Neem formulations, and Trichoderma.',
        hi: 'सरकारी अनुमोदित जैविक कीटनाशकों, नीम योगों और ट्राइकोडर्मा पर 50% वित्तीय सब्सिडी।',
        mr: 'शासकीय मान्यताप्राप्त सेंद्रिय कीटकनाशके, कडुनिंब अर्क आणि ट्रायकोव्हिर्डीवर 50% आर्थिक अनुदान.'
      },
      eligibility: {
        en: 'Farmers in Maharashtra registered on Mahadbt with 7/12 land document.',
        hi: 'महाडीबीटी पर 7/12 भूमि दस्तावेज के साथ पंजीकृत महाराष्ट्र के किसान।',
        mr: 'महाडीबीटी पोर्टलवर 7/12 उताऱ्यासह नोंदणीकृत महाराष्ट्रातील शेतकरी.'
      },
      application_url: 'https://mahadbt.maharashtra.gov.in',
      helpline: '022-49150800',
      is_bookmarked: true
    },
    {
      id: 'sch-04',
      scheme_name: {
        en: 'Sub-Mission on Agricultural Mechanization (SMAM)',
        hi: 'कृषि यांत्रीकरण पर उप-मिशन (SMAM)',
        mr: 'कृषी यांत्रिकीकरण उपअभियान (SMAM)'
      },
      category: 'Equipment Subsidy',
      state: 'All India',
      crop: 'All Crops',
      benefits: {
        en: '40% to 50% subsidy on purchase of agricultural drones, power tillers, and battery spray pumps.',
        hi: 'कृषि ड्रोन, पावर टिलर और बैटरी स्प्रे पंप की खरीद पर 40% से 50% की सब्सिडी।',
        mr: 'कृषी ड्रोन, पॉवर टिलर आणि बॅटरी स्प्रे पंपाच्या खरेदीवर 40% ते 50% अनुदान.'
      },
      eligibility: {
        en: 'Individual farmers, SHGs, and Farmer Producer Organizations (FPOs).',
        hi: 'व्यक्तिगत किसान, स्वयं सहायता समूह (SHG) और किसान उत्पादक संगठन (FPO)।',
        mr: 'वैयक्तिक शेतकरी, बचत गट आणि शेतकरी उत्पादक कंपन्या (FPO).'
      },
      application_url: 'https://agrimachinery.nic.in',
      helpline: '1800 180 1551',
      is_bookmarked: false
    }
  ]);

  const toggleBookmark = (id) => {
    setSchemes(prev => prev.map(s => s.id === id ? { ...s, is_bookmarked: !s.is_bookmarked } : s));
  };

  const getLocalizedText = (obj) => {
    if (typeof obj === 'string') return obj;
    return obj[language] || obj['en'] || '';
  };

  const filtered = schemes.filter(s => {
    const name = getLocalizedText(s.scheme_name);
    const ben = getLocalizedText(s.benefits);
    const matchSearch = name.toLowerCase().includes(search.toLowerCase()) || ben.toLowerCase().includes(search.toLowerCase());
    const matchState = selectedState === 'All' || s.state === 'All India' || s.state === selectedState;
    const matchCat = selectedCategory === 'All' || s.category === selectedCategory;
    return matchSearch && matchState && matchCat;
  });

  return (
    <div className="space-y-8 pb-16">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <span className="text-xs font-semibold text-emerald-600 dark:text-agri-400 uppercase tracking-wider">
          {t('subsidiesTag')}
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-outfit">
          {t('schemesTitle')}
        </h1>
        <p className="text-xs text-slate-600 dark:text-slate-400">
          {t('schemesSub')}
        </p>
      </div>

      {/* SEARCH & FILTERS BAR */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-3xl flex flex-col md:flex-row gap-4 items-center justify-between shadow-md">
        
        {/* Search */}
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t('searchSchemePlaceholder')}
            className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 w-full md:w-auto">
          
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-800 dark:text-slate-200 rounded-xl px-3 py-2 focus:outline-none"
          >
            <option value="All">{t('allStates')}</option>
            <option value="Maharashtra">Maharashtra</option>
            <option value="Punjab">Punjab</option>
            <option value="Haryana">Haryana</option>
            <option value="Uttar Pradesh">Uttar Pradesh</option>
          </select>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-800 dark:text-slate-200 rounded-xl px-3 py-2 focus:outline-none"
          >
            <option value="All">{t('allCategories')}</option>
            <option value="Income Support">Income Support</option>
            <option value="Crop Insurance">Crop Insurance</option>
            <option value="Pesticide Subsidy">Pesticide Subsidy</option>
            <option value="Equipment Subsidy">Equipment Subsidy</option>
          </select>

        </div>

      </div>

      {/* SCHEMES CARDS LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/40 p-6 rounded-3xl space-y-4 shadow-lg transition flex flex-col justify-between"
          >
            <div className="space-y-3">
              
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-agri-400 bg-emerald-100 dark:bg-agri-950 px-2.5 py-0.5 rounded border border-emerald-300 dark:border-agri-500/30">
                    {item.category}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1.5 leading-snug">
                    {getLocalizedText(item.scheme_name)}
                  </h3>
                </div>

                <button
                  onClick={() => toggleBookmark(item.id)}
                  className={`p-2 rounded-xl border transition ${
                    item.is_bookmarked
                      ? 'bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 border-amber-300 dark:border-amber-500/40'
                      : 'bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:text-slate-900 dark:hover:text-white'
                  }`}
                  title="Bookmark Scheme"
                >
                  <Bookmark className={`w-4 h-4 ${item.is_bookmarked ? 'fill-amber-400' : ''}`} />
                </button>
              </div>

              <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                <span>{t('stateLabelShort')} <strong className="text-slate-800 dark:text-slate-200">{item.state}</strong></span>
                <span>•</span>
                <span>{t('targetCropsLabel')} <strong className="text-slate-800 dark:text-slate-200">{item.crop}</strong></span>
              </div>

              <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 p-3 rounded-2xl space-y-1">
                <span className="text-[11px] font-semibold text-emerald-700 dark:text-agri-400 uppercase tracking-wider">
                  {t('financialBenefits')}
                </span>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                  {getLocalizedText(item.benefits)}
                </p>
              </div>

              <div className="text-xs text-slate-500 dark:text-slate-400 space-y-1">
                <span className="font-semibold text-slate-700 dark:text-slate-300">
                  {t('eligibilityCriteria')}
                </span>
                <p className="text-slate-700 dark:text-slate-300 text-xs">
                  {getLocalizedText(item.eligibility)}
                </p>
              </div>

            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs gap-3">
              <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                <Phone className="w-3.5 h-3.5 text-emerald-600 dark:text-agri-400" />
                <span>{t('helplineLabel')} {item.helpline}</span>
              </div>

              <a
                href={item.application_url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-agri-600 hover:bg-agri-500 text-white font-bold text-xs transition"
              >
                <span>{t('btnApplyPortal')}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};

export default SchemesPage;
