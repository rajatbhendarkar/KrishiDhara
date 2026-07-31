import React from 'react';
import { BarChart3, CheckCircle2, AlertTriangle, Cpu, CloudSun, MapPin, ArrowUpRight, Clock, Shield, Sparkles, PlusCircle, Activity, Mic, LogOut } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from 'recharts';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

export const FarmerDashboard = ({ setActiveTab, onOpenVoiceModal }) => {
  const { user, logout } = useAuth();
  const { t } = useLanguage();

  const getRecentUploads = () => {
    try {
      const saved = localStorage.getItem('km_scan_history');
      if (saved) {
        const list = JSON.parse(saved);
        return list.map(item => ({
          id: item.id,
          crop: typeof item.crop_name === 'object' ? item.crop_name.en : item.crop_name,
          disease: typeof item.detected_disease === 'object' ? item.detected_disease.en : item.detected_disease,
          severity: item.severity || 'Medium',
          confidence: `${item.confidence_score || 95}%`,
          status: item.recovery_status || 'Detected',
          date: item.created_at || 'Recently',
          img: item.image_url || 'https://images.unsplash.com/photo-1592417817098-8f3d6eb16431?auto=format&fit=crop&w=400&q=80'
        }));
      }
    } catch (e) {}
    return [];
  };

  const recentUploads = getRecentUploads();
  const totalScans = recentUploads.length;
  const healthyCount = recentUploads.filter(item => (item.disease || '').toLowerCase().includes('healthy')).length;
  const diseasedCount = totalScans - healthyCount;

  const monthlyTrendData = totalScans > 0 ? [
    { month: 'Jan', healthy: 0,  diseased: 0  },
    { month: 'Feb', healthy: 0,  diseased: 0  },
    { month: 'Mar', healthy: 0,  diseased: 0  },
    { month: 'Apr', healthy: 0,  diseased: 0  },
    { month: 'May', healthy: 0,  diseased: 0  },
    { month: 'Jun', healthy: Math.floor(healthyCount / 2), diseased: Math.floor(diseasedCount / 2) },
    { month: 'Jul', healthy: healthyCount, diseased: diseasedCount },
  ] : [
    { month: 'Jan', healthy: 0, diseased: 0 },
    { month: 'Feb', healthy: 0, diseased: 0 },
    { month: 'Mar', healthy: 0, diseased: 0 },
    { month: 'Apr', healthy: 0, diseased: 0 },
    { month: 'May', healthy: 0, diseased: 0 },
    { month: 'Jun', healthy: 0, diseased: 0 },
    { month: 'Jul', healthy: 0, diseased: 0 },
  ];

  // Dynamic Disease Breakdown
  const diseaseCounts = {};
  recentUploads.forEach(item => {
    const dName = item.disease || 'Unknown';
    diseaseCounts[dName] = (diseaseCounts[dName] || 0) + 1;
  });

  const colors = ['#ef4444', '#f97316', '#eab308', '#a855f7', '#3b82f6', '#22c55e'];
  const diseaseData = totalScans > 0
    ? Object.keys(diseaseCounts).map((name, idx) => ({
        name,
        value: diseaseCounts[name],
        color: name.toLowerCase().includes('healthy') ? '#22c55e' : colors[idx % colors.length]
      }))
    : [{ name: 'No Scans Yet', value: 1, color: '#cbd5e1' }];

  const card = "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm";

  const displayLocation = user 
    ? [user.village, user.taluka, user.district, user.state].filter(Boolean).join(', ') || user.location
    : null;

  return (
    <div className="space-y-6 pb-12">

      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm">
        <div>
          <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">{t('dashTitle')}</span>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white" style={{fontFamily:"'Outfit','Noto Sans Devanagari',sans-serif"}}>
            {t('dashWelcome')}, {user?.name || 'Farmer'} 👋
          </h1>
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
            <span>{displayLocation || t('dashLocation')}</span>
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button onClick={() => setActiveTab('doctor')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs shadow-sm transition">
            <PlusCircle className="w-4 h-4" />
            {t('dashNewScan')}
          </button>
          <button onClick={onOpenVoiceModal}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-xs hover:bg-slate-200 dark:hover:bg-slate-700 transition">
            <Mic className="w-4 h-4 text-emerald-500" />
            {t('dashVoiceCmd')}
          </button>
          <button onClick={() => { logout(); setActiveTab('login'); }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 font-bold text-xs border border-rose-200 dark:border-rose-800 transition cursor-pointer shadow-xs">
            <LogOut className="w-4 h-4" />
            <span>{t('navLogout') || 'Logout'}</span>
          </button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: t('metricTotalDiagnoses'), value: totalScans.toString(), sub: totalScans === 0 ? 'No crop scans yet' : `${totalScans} total scans`, color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-slate-800', border: 'border-blue-200 dark:border-slate-700', icon: Activity },
          { label: t('metricHealthyPlants'),  value: healthyCount.toString(), sub: totalScans === 0 ? '0% healthy plants' : `${Math.round((healthyCount / totalScans) * 100)}% healthy`, color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-slate-800', border: 'border-emerald-200 dark:border-slate-700', icon: CheckCircle2 },
          { label: t('metricDiseasedPlants'), value: diseasedCount.toString(), sub: totalScans === 0 ? 'No infections detected' : `${diseasedCount} active treatments`, color: 'text-rose-600 dark:text-rose-400', bg: 'bg-rose-50 dark:bg-slate-800', border: 'border-rose-200 dark:border-slate-700', icon: AlertTriangle },
          { label: t('metricModelAccuracy'),  value: '98.4%', sub: t('metricVerified'), color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-50 dark:bg-slate-800', border: 'border-purple-200 dark:border-slate-700', icon: Sparkles },
        ].map((m, i) => {
          const Icon = m.icon;
          return (
            <div key={i} className={`${card} p-5 space-y-3`}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-600 dark:text-slate-400">{m.label}</span>
                <div className={`w-9 h-9 rounded-xl ${m.bg} border ${m.border} flex items-center justify-center ${m.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <div className={`text-3xl font-black ${m.color}`} style={{fontFamily:"'Outfit',sans-serif"}}>{m.value}</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">{m.sub}</div>
            </div>
          );
        })}
      </div>

      {/* Weather Alert */}
      <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-500/30 rounded-2xl p-5 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-900/50 border border-amber-300 dark:border-amber-700 flex items-center justify-center text-amber-500 shrink-0">
            <CloudSun className="w-7 h-7" />
          </div>
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider">{t('weatherAlertTitle')}</span>
              <span className="bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-400 px-2 py-0.5 rounded text-[10px] font-bold border border-rose-200 dark:border-rose-800">HIGH RISK</span>
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              {user?.district ? `${user.district} Weather Alert: 84% Relative Humidity` : user?.state ? `${user.state} Weather Alert: 84% Relative Humidity` : t('weatherAlertSub')}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">{t('weatherAlertDesc')}</p>
          </div>
        </div>
        <button onClick={() => setActiveTab('weather')}
          className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shrink-0 transition shadow-sm">
          {t('weatherAlertBtn')}
        </button>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* Area Chart */}
        <div className={`${card} lg:col-span-2 p-5 space-y-4`}>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">{t('chartMonthlyTrend')}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">{t('chartMonthlySub')}</p>
            </div>
            <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-lg border border-emerald-200 dark:border-emerald-700">2026</span>
          </div>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyTrendData}>
                <defs>
                  <linearGradient id="gHealthy" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#22c55e" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="gDiseased" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#ef4444" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#fff', borderColor: '#e2e8f0', borderRadius: '10px', fontSize: '12px', color: '#0f172a' }} />
                <Area type="monotone" dataKey="healthy"  stroke="#22c55e" fill="url(#gHealthy)"  name="Healthy" />
                <Area type="monotone" dataKey="diseased" stroke="#ef4444" fill="url(#gDiseased)" name="Diseased" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div className={`${card} p-5 space-y-4`}>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">{t('chartDiseaseBreakdown')}</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">{t('chartDiseaseSub')}</p>
          </div>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={diseaseData} cx="50%" cy="50%" innerRadius={45} outerRadius={72} paddingAngle={3} dataKey="value">
                  {diseaseData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#fff', borderColor: '#e2e8f0', borderRadius: '8px', fontSize: '11px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap gap-x-3 gap-y-1.5 text-[11px]">
            {diseaseData.map((d, i) => (
              <div key={i} className="flex items-center gap-1 text-slate-700 dark:text-slate-300">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: d.color }} />
                {d.name}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Diagnoses + Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* Recent Diagnoses */}
        <div className={`${card} lg:col-span-2 p-5 space-y-4`}>
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">{t('recentDiagnosesTitle')}</h3>
            <button onClick={() => setActiveTab('history')} className="text-xs font-semibold text-emerald-600 hover:underline">
              {t('viewFullHistory')}
            </button>
          </div>
          <div className="space-y-2.5">
            {recentUploads.length > 0 ? (
              recentUploads.map(item => (
                <div key={item.id} onClick={() => setActiveTab('doctor')}
                  className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:border-emerald-500 p-3.5 rounded-xl flex items-center justify-between gap-4 cursor-pointer transition">
                  <div className="flex items-center gap-3">
                    <img src={item.img} alt={item.disease} className="w-11 h-11 rounded-xl object-cover ring-1 ring-slate-200 dark:ring-slate-700" />
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white">{item.disease}</h4>
                      <p className="text-[11px] text-slate-600 dark:text-slate-400">{item.crop} • {item.confidence}</p>
                      <span className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                        <Clock className="w-3 h-3" />{item.date}
                      </span>
                    </div>
                  </div>
                  <div className="text-right space-y-1">
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${
                      item.status === 'Recovered'
                        ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800'
                        : 'bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800'
                    }`}>{item.status}</span>
                    <p className="text-[10px] text-slate-400">Severity: {item.severity}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-6 text-center text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl space-y-2">
                <p>No recent crop scans recorded yet.</p>
                <button
                  onClick={() => setActiveTab('doctor')}
                  className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline"
                >
                  Perform your first AI diagnosis →
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className={`${card} p-5 space-y-4`}>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">{t('quickActionsTitle')}</h3>
          <div className="space-y-3">
            {[
              { tab: 'doctor',  icon: Cpu,     bg: 'bg-emerald-50 dark:bg-slate-800', border: 'border-emerald-200 dark:border-slate-700', color: 'text-emerald-600 dark:text-emerald-400', titleKey: 'quickAction1Title', descKey: 'quickAction1Desc' },
              { tab: 'schemes', icon: Shield,  bg: 'bg-amber-50 dark:bg-slate-800',   border: 'border-amber-200 dark:border-slate-700',   color: 'text-amber-600 dark:text-amber-400',   titleKey: 'quickAction2Title', descKey: 'quickAction2Desc' },
              { tab: 'shops',   icon: MapPin,  bg: 'bg-blue-50 dark:bg-slate-800',    border: 'border-blue-200 dark:border-slate-700',    color: 'text-blue-600 dark:text-blue-400',    titleKey: 'quickAction3Title', descKey: 'quickAction3Desc' },
            ].map((a, i) => {
              const Icon = a.icon;
              return (
                <button key={i} onClick={() => setActiveTab(a.tab)}
                  className="w-full p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:border-emerald-500 text-left transition flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-xl ${a.bg} border ${a.border} flex items-center justify-center ${a.color} shrink-0`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">{t(a.titleKey)}</h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">{t(a.descKey)}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

    </div>
  );
};
