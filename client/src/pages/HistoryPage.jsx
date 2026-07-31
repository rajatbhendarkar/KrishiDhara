import React, { useState } from 'react';
import { History, Search, FileText, Download, CheckCircle2, Clock, Filter, Eye } from 'lucide-react';
import { generatePDFReport } from '../utils/pdfGenerator';
import { useLanguage } from '../context/LanguageContext';

export const HistoryPage = () => {
  const { t, language } = useLanguage();
  const [search, setSearch] = useState('');
  const [selectedCrop, setSelectedCrop] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  const getInitialHistory = () => {
    try {
      const saved = localStorage.getItem('km_scan_history');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return [];
  };

  const [historyList, setHistoryList] = useState(getInitialHistory);

  const updateStatus = (id, newStatus) => {
    setHistoryList(prev => prev.map(h => h.id === id ? { ...h, recovery_status: newStatus } : h));
  };

  const getLocalized = (val) => {
    if (typeof val === 'string') return val;
    return val?.[language] || val?.['en'] || '';
  };

  const getStatusText = (st) => {
    if (st === 'In Treatment') return t('statusInTreatment');
    if (st === 'Recovered') return t('statusRecovered');
    if (st === 'Detected') return t('statusDetected');
    if (st === 'Crop Lost') return t('statusLost');
    return st;
  };

  const filtered = historyList.filter(item => {
    const cropStr = getLocalized(item.crop_name);
    const diseaseStr = getLocalized(item.detected_disease);
    const matchSearch = diseaseStr.toLowerCase().includes(search.toLowerCase()) || 
                        cropStr.toLowerCase().includes(search.toLowerCase());
    const matchCrop = selectedCrop === 'All' || item.crop_name?.en === selectedCrop || item.crop_name === selectedCrop;
    const matchStatus = selectedStatus === 'All' || item.recovery_status === selectedStatus;
    return matchSearch && matchCrop && matchStatus;
  });

  return (
    <div className="space-y-8 pb-16">
      
      {/* Title */}
      <div className="text-center space-y-2">
        <span className="text-xs font-semibold text-emerald-600 dark:text-agri-400 uppercase tracking-wider">
          {t('historyTitle')}
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-outfit">
          {t('historyTitle')}
        </h1>
        <p className="text-xs text-slate-600 dark:text-slate-400">
          {t('historySub')}
        </p>
      </div>

      {/* FILTER BAR */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-3xl flex flex-col md:flex-row gap-4 items-center justify-between shadow-md">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t('searchHistoryPlaceholder')}
            className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-900 dark:text-white focus:outline-none"
          />
        </div>

        <div className="flex gap-3 w-full md:w-auto">
          <select
            value={selectedCrop}
            onChange={(e) => setSelectedCrop(e.target.value)}
            className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-800 dark:text-slate-200 rounded-xl px-3 py-2 focus:outline-none"
          >
            <option value="All">{t('allCrops') || 'All Crops'}</option>
            <option value="Tomato">Tomato</option>
            <option value="Rice">Rice</option>
            <option value="Wheat">Wheat</option>
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-800 dark:text-slate-200 rounded-xl px-3 py-2 focus:outline-none"
          >
            <option value="All">{t('allStatuses') || 'All Statuses'}</option>
            <option value="In Treatment">{t('statusInTreatment')}</option>
            <option value="Recovered">{t('statusRecovered')}</option>
            <option value="Detected">{t('statusDetected')}</option>
          </select>
        </div>
      </div>

      {/* HISTORY TABLE / CARDS */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="p-4">{t('colCropImage')}</th>
                <th className="p-4">{t('colDisease')}</th>
                <th className="p-4">{t('colMetrics')}</th>
                <th className="p-4">{t('colDate')}</th>
                <th className="p-4">{t('colStatus')}</th>
                <th className="p-4 text-right">{t('colActions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800/80">
              {filtered.length > 0 ? (
                filtered.map(item => (
                  <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-950/50 transition">
                    
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img src={item.image_url} alt={getLocalized(item.crop_name)} className="w-12 h-12 rounded-xl object-cover ring-1 ring-slate-200 dark:ring-slate-700" />
                        <div>
                          <span className="font-bold text-slate-900 dark:text-white text-xs block">{getLocalized(item.crop_name)}</span>
                          <span className="text-[10px] text-slate-500 font-semibold">{item.plant_part}</span>
                        </div>
                      </div>
                    </td>

                    <td className="p-4">
                      <span className="font-bold text-slate-900 dark:text-white block">{getLocalized(item.detected_disease)}</span>
                    </td>

                    <td className="p-4">
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold block">{item.confidence_score}% Match</span>
                      <span className="text-[10px] text-slate-500 font-semibold">{item.severity} Severity</span>
                    </td>

                    <td className="p-4 text-slate-600 dark:text-slate-400 font-medium">
                      {item.created_at || 'Recently'}
                    </td>

                    <td className="p-4">
                      <select
                        value={item.recovery_status}
                        onChange={(e) => updateStatus(item.id, e.target.value)}
                        className={`text-xs font-bold px-2.5 py-1.5 rounded-xl border focus:outline-none cursor-pointer ${
                          item.recovery_status === 'Recovered'
                            ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 border-emerald-300 dark:border-emerald-500/40'
                            : 'bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-400 border-amber-300 dark:border-amber-500/40'
                        }`}
                      >
                        <option value="Detected">{t('statusDetected')}</option>
                        <option value="In Treatment">{t('statusInTreatment')}</option>
                        <option value="Recovered">{t('statusRecovered')}</option>
                        <option value="Crop Lost">{t('statusLost')}</option>
                      </select>
                    </td>

                    <td className="p-4 text-right">
                      <button
                        onClick={() => generatePDFReport({ ...item, crop_name: getLocalized(item.crop_name), detected_disease: getLocalized(item.detected_disease) })}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-white border border-slate-300 dark:border-slate-700 font-bold text-xs transition"
                      >
                        <Download className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                        <span>PDF Report</span>
                      </button>
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-xs text-slate-500 dark:text-slate-400">
                    No scan history recorded yet. AI disease detections performed on the AI Plant Doctor page will appear here.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default HistoryPage;
