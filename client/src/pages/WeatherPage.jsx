import React, { useState, useEffect } from 'react';
import { 
  CloudSun, Droplets, Wind, CloudRain, AlertTriangle, ShieldCheck, 
  Thermometer, Calendar, RefreshCw, MapPin, Edit3, Sparkles
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

export const WeatherPage = () => {
  const { user } = useAuth();
  const { t } = useLanguage();

  // Construct location from user profile
  const userLocationStr = user 
    ? [user.village, user.taluka, user.district, user.state].filter(Boolean).join(', ')
    : 'Nashik, Maharashtra';

  const userDistrict = user?.district || 'Nashik';

  const [weather, setWeather] = useState({
    location: userLocationStr || 'Nashik, Maharashtra',
    temperature: 28.5,
    feels_like: 30.2,
    humidity: 84,
    wind_speed: '14 km/h',
    rain_prediction: '75% chance of light showers in next 24h',
    condition: 'Partly Cloudy & Humid',
    forecast_5days: [
      { day: 'Today', temp: '28°C', humidity: '84%', condition: 'Humid' },
      { day: 'Tomorrow', temp: '27°C', humidity: '88%', condition: 'Rain' },
      { day: 'Thu', temp: '29°C', humidity: '79%', condition: 'Cloudy' },
      { day: 'Fri', temp: '31°C', humidity: '72%', condition: 'Sunny' },
      { day: 'Sat', temp: '30°C', humidity: '75%', condition: 'Partly Cloudy' }
    ],
    disease_risk: {
      risk_level: 'High',
      high_risk_crops: user?.primaryCrops ? user.primaryCrops.split(',').map(c => c.trim()) : ['Tomato', 'Potato', 'Grapes', 'Cotton'],
      predicted_diseases: ['Late Blight', 'Downy Mildew', 'Powdery Mildew'],
      advisory: `High relative humidity (>80%) in ${userDistrict} combined with warm 25-28°C temperatures accelerates fungal spore reproduction. Spray preventative copper hydroxide before rain.`
    }
  });

  // Update weather location state whenever user profile updates
  useEffect(() => {
    if (user) {
      const formattedLoc = [user.village, user.taluka, user.district, user.state].filter(Boolean).join(', ') || 'Nashik, Maharashtra';
      const crops = user.primaryCrops ? user.primaryCrops.split(',').map(c => c.trim()) : ['Tomato', 'Potato', 'Grapes', 'Cotton'];
      setWeather(prev => ({
        ...prev,
        location: formattedLoc,
        disease_risk: {
          ...prev.disease_risk,
          high_risk_crops: crops,
          advisory: `High relative humidity (>80%) in ${user.district || 'Nashik'} combined with warm 25-28°C temperatures accelerates fungal spore reproduction for ${user.soilType || 'Black'} soil regions. Apply preventative spray before rain.`
        }
      }));
    }
  }, [user]);

  return (
    <div className="space-y-8 pb-16">
      
      {/* Title */}
      <div className="text-center space-y-2">
        <span className="text-xs font-semibold text-emerald-600 dark:text-agri-400 uppercase tracking-wider">
          {t('agrometTag')}
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-outfit">
          {t('weatherTitle')}
        </h1>
        <p className="text-xs text-slate-600 dark:text-slate-400">
          {t('weatherSub')}
        </p>
      </div>

      {/* TOP WEATHER HERO CARD */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">{weather.location}</h2>
                <span className="bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-500" /> {t('syncedFromProfile')}
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">{weather.condition} • {t('forecastForDistrict')} {userDistrict}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="bg-emerald-50 dark:bg-agri-950 text-emerald-700 dark:text-agri-400 px-3 py-1 rounded-full text-xs font-semibold border border-emerald-200 dark:border-agri-500/30">
              {t('liveFeedActive')}
            </span>
          </div>
        </div>

        {/* METRICS GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          
          <div className="bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl space-y-1">
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 text-xs font-medium">
              <Thermometer className="w-4 h-4 text-amber-500" />
              <span>{t('tempLabel')}</span>
            </div>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">{weather.temperature}°C</p>
            <p className="text-[10px] text-slate-500 dark:text-slate-400">{t('feelsLike')} {weather.feels_like}°C</p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl space-y-1">
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 text-xs font-medium">
              <Droplets className="w-4 h-4 text-blue-500" />
              <span>{t('humidityLabel')}</span>
            </div>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{weather.humidity}%</p>
            <p className="text-[10px] text-rose-600 dark:text-rose-400 font-semibold">{t('sporeThreshold')}</p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl space-y-1">
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 text-xs font-medium">
              <CloudRain className="w-4 h-4 text-cyan-500" />
              <span>{t('rainLabel')}</span>
            </div>
            <p className="text-xs font-bold text-slate-900 dark:text-white pt-1">{weather.rain_prediction}</p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl space-y-1">
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 text-xs font-medium">
              <Wind className="w-4 h-4 text-slate-500 dark:text-slate-300" />
              <span>{t('windLabel')}</span>
            </div>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">{weather.wind_speed}</p>
            <p className="text-[10px] text-slate-500 dark:text-slate-400">{t('sporeTransport')}</p>
          </div>

        </div>
      </div>

      {/* DISEASE RISK ASSESSMENT PANEL */}
      <div className="bg-rose-50/70 dark:bg-gradient-to-r dark:from-rose-950/40 dark:via-slate-900 dark:to-amber-950/30 border border-rose-200 dark:border-rose-500/40 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400 flex items-center justify-center border border-rose-300 dark:border-rose-500/40">
              <AlertTriangle className="w-6 h-6 animate-bounce" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700 dark:text-rose-400 bg-rose-100 dark:bg-rose-950 px-2 py-0.5 rounded border border-rose-300 dark:border-rose-500/30">
                {t('sporeRiskTitle')}
              </span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">{t('riskAlertTitle')}</h3>
            </div>
          </div>

          <span className="text-xs font-extrabold px-3 py-1.5 rounded-full bg-rose-600 text-white shadow-md">
            {t('riskLevelHigh')}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">{t('vulnerableCrops')}</h4>
            <div className="flex flex-wrap gap-2">
              {weather.disease_risk.high_risk_crops.map((crop, idx) => (
                <span key={idx} className="bg-amber-100 dark:bg-slate-950 text-amber-800 dark:text-amber-300 px-3 py-1 rounded-xl text-xs font-bold border border-amber-300 dark:border-amber-500/30">
                  {crop}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">{t('predictedOutbreaks')}</h4>
            <div className="flex flex-wrap gap-2">
              {weather.disease_risk.predicted_diseases.map((d, idx) => (
                <span key={idx} className="bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300 px-3 py-1 rounded-xl text-xs font-bold border border-rose-300 dark:border-rose-500/30">
                  {d}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl space-y-1">
          <h4 className="text-xs font-bold text-emerald-700 dark:text-agri-400 uppercase tracking-wider">{t('agriAdvisory')}</h4>
          <p className="text-xs text-slate-800 dark:text-slate-200 leading-relaxed font-medium">{weather.disease_risk.advisory}</p>
        </div>
      </div>

      {/* 5-DAY FORECAST GRID */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl space-y-4 shadow-md">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">{t('outlook5Day')}</h3>
        
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {weather.forecast_5days.map((item, idx) => (
            <div key={idx} className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 p-4 rounded-2xl text-center space-y-2">
              <p className="text-xs font-bold text-slate-900 dark:text-white">{item.day}</p>
              <CloudSun className="w-6 h-6 text-emerald-600 dark:text-agri-400 mx-auto" />
              <p className="text-lg font-extrabold text-slate-900 dark:text-white">{item.temp}</p>
              <p className="text-[10px] text-blue-600 dark:text-blue-400 font-medium">{t('humidityWord')}: {item.humidity}</p>
              <span className="inline-block text-[9px] bg-slate-100 dark:bg-slate-900 px-2 py-0.5 rounded text-slate-600 dark:text-slate-400 font-semibold">{item.condition}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default WeatherPage;
