import React, { useState, useEffect } from 'react';
import { 
  User, MapPin, Sprout, ShieldCheck, CheckCircle2, Copy, Check, 
  Upload, Calendar, Phone, Mail, Layers, Droplets, Globe, Save, 
  Trash2, Sparkles, CheckSquare, Square, LogOut, X
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { apiFetch } from '../utils/api';

const SOIL_TYPES = [
  { id: 'Black', label: 'Black Soil', desc: 'Regur / Cotton Soil' },
  { id: 'Red', label: 'Red Soil', desc: 'Iron rich / Well-drained' },
  { id: 'Sandy', label: 'Sandy Soil', desc: 'High permeability' },
  { id: 'Loamy', label: 'Loamy Soil', desc: 'Fertile & Silt rich' },
  { id: 'Clay', label: 'Clay Soil', desc: 'High water retention' },
];

const IRRIGATION_SOURCES = ['Well', 'Borewell', 'Canal', 'Drip', 'Rain-fed'];

const WATER_LEVELS = [
  { id: 'Low', label: 'Low', desc: 'Water Scarcity', color: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/30' },
  { id: 'Medium', label: 'Medium', desc: 'Seasonal Supply', color: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30' },
  { id: 'High', label: 'High', desc: 'Abundant Water', color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30' },
];

const INDIAN_STATES = [
  'Andhra Pradesh', 'Assam', 'Bihar', 'Gujarat', 'Haryana', 'Karnataka', 
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Odisha', 'Punjab', 
  'Rajasthan', 'Tamil Nadu', 'Telangana', 'Uttar Pradesh', 'West Bengal', 'Other'
];

export const ProfilePage = ({ setActiveTab }) => {
  const { user, setUser, logout } = useAuth();
  const { language, setLanguage, t } = useLanguage();

  const [saved, setSaved] = useState(false);
  const [copiedId, setCopiedId] = useState(false);

  // Form State initialized from user context with defaults
  const [form, setForm] = useState({
    farmerId: user?.farmerId || '',
    name: user?.name || '',
    photo: user?.photo || user?.profile_pic || '',
    gender: user?.gender || 'Male',
    dob: user?.dob || '',
    phone: user?.phone || '',
    email: user?.email || '',
    state: user?.state || '',
    district: user?.district || '',
    taluka: user?.taluka || '',
    village: user?.village || '',
    pincode: user?.pincode || '',
    landArea: user?.landArea || '',
    landUnit: user?.landUnit || 'Acres',
    farmPlots: user?.farmPlots || '',
    soilType: user?.soilType || 'Black',
    irrigationSource: Array.isArray(user?.irrigationSource) ? user.irrigationSource : [],
    waterAvailability: user?.waterAvailability || 'Medium',
    primaryCrops: user?.primaryCrops || '',
    language: language || user?.language || 'hi'
  });

  useEffect(() => {
    if (user) {
      setForm(prev => ({
        ...prev,
        farmerId: user.farmerId || prev.farmerId,
        name: user.name || prev.name,
        photo: user.photo || user.profile_pic || prev.photo,
        gender: user.gender || prev.gender,
        dob: user.dob || prev.dob,
        phone: user.phone || prev.phone,
        email: user.email || prev.email,
        state: user.state || prev.state,
        district: user.district || prev.district,
        taluka: user.taluka || prev.taluka,
        village: user.village || prev.village,
        pincode: user.pincode || prev.pincode,
        landArea: user.landArea || prev.landArea,
        landUnit: user.landUnit || prev.landUnit,
        farmPlots: user.farmPlots || prev.farmPlots,
        soilType: user.soilType || prev.soilType,
        irrigationSource: Array.isArray(user.irrigationSource) ? user.irrigationSource : prev.irrigationSource,
        waterAvailability: user.waterAvailability || prev.waterAvailability,
        primaryCrops: user.primaryCrops || prev.primaryCrops,
        language: user.language || prev.language
      }));
    }
  }, [user]);

  // Calculate age dynamically from DOB
  const calculateAge = (dobString) => {
    if (!dobString) return null;
    const dobDate = new Date(dobString);
    if (isNaN(dobDate.getTime())) return null;
    const today = new Date();
    let age = today.getFullYear() - dobDate.getFullYear();
    const m = today.getMonth() - dobDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dobDate.getDate())) {
      age--;
    }
    return age >= 0 ? age : null;
  };

  const ageDisplay = calculateAge(form.dob);

  const handleCopyId = () => {
    navigator.clipboard.writeText(form.farmerId);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const handleIrrigationToggle = (source) => {
    setForm(prev => {
      const current = prev.irrigationSource || [];
      if (current.includes(source)) {
        return { ...prev, irrigationSource: current.filter(item => item !== source) };
      } else {
        return { ...prev, irrigationSource: [...current, source] };
      }
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm(prev => ({ ...prev, photo: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const updatedProfile = {
      ...user,
      ...form,
      farm_acres: parseFloat(form.landArea) || user?.farm_acres || 4.5,
      location: form.district && form.state ? `${form.district}, ${form.state}` : user?.location || 'Nashik, Maharashtra'
    };

    // Persist to backend database API
    const res = await apiFetch('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(updatedProfile)
    });

    const userToSave = res?.user || updatedProfile;
    setUser(userToSave);

    if (form.email) {
      localStorage.setItem(`km_user_profile_${form.email.toLowerCase()}`, JSON.stringify(userToSave));
    }

    setLanguage(form.language);
    setSaved(true);
    setTimeout(() => setSaved(false), 4500);
  };

  // Calculate completeness percentage
  const calculateCompletion = () => {
    const requiredFields = [
      'farmerId', 'name', 'gender', 'dob', 'phone', 'email', 
      'state', 'district', 'taluka', 'village', 'pincode', 
      'landArea', 'farmPlots', 'soilType', 'waterAvailability'
    ];
    let filled = 0;
    requiredFields.forEach(field => {
      if (form[field]) filled++;
    });
    if (form.irrigationSource && form.irrigationSource.length > 0) filled++;
    return Math.round((filled / (requiredFields.length + 1)) * 100);
  };

  const completionPercent = calculateCompletion();

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20 relative">
      
      {/* FLOATING SUCCESS TOAST NOTIFICATION */}
      {saved && (
        <div className="fixed top-24 right-4 sm:right-8 z-50 bg-emerald-600 text-white px-6 py-4 rounded-3xl shadow-2xl border-2 border-emerald-300 flex items-center gap-3 animate-bounce max-w-md">
          <CheckCircle2 className="w-8 h-8 text-emerald-200 shrink-0" />
          <div className="flex-1">
            <p className="font-extrabold text-sm sm:text-base">Information Saved Successfully!</p>
            <p className="text-xs text-emerald-100 mt-0.5">आपली माहिती डेटाबेसमध्ये यशस्वीरित्या जतन केली आहे!</p>
          </div>
          <button 
            type="button"
            onClick={() => setSaved(false)} 
            className="p-1 rounded-full hover:bg-emerald-700 transition"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>
      )}

      {/* INLINE SUCCESS BANNER */}
      {saved && (
        <div className="bg-emerald-500/15 border-2 border-emerald-500/40 rounded-3xl p-5 flex items-center gap-4 text-emerald-800 dark:text-emerald-300 shadow-md">
          <CheckCircle2 className="w-7 h-7 text-emerald-500 shrink-0" />
          <div>
            <h4 className="font-extrabold text-base">Your Information is Saved! / आपली माहिती जतन झाली!</h4>
            <p className="text-xs sm:text-sm font-medium mt-0.5">All your profile details and farm preferences are safely saved in the database.</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8">

        {/* SECTION 1: PERSONAL INFORMATION */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl relative">
          
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                <User className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white font-outfit">
                  {t('personalInfoSection')}
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {t('personalInfoSub')}
                </p>
              </div>
            </div>

            {/* Small Cross / Close symbol button */}
            <button
              type="button"
              onClick={() => setActiveTab && setActiveTab('dashboard')}
              className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-rose-100 hover:text-rose-600 dark:hover:bg-rose-950/60 dark:hover:text-rose-400 transition cursor-pointer shadow-xs"
              title="Close Profile"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Photo & Farmer ID Header Row */}
          <div className="flex flex-col sm:flex-row items-center gap-6 p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800">
            {/* Photo Avatar with upload */}
            <div className="relative group shrink-0">
              <img 
                src={form.photo || 'https://images.unsplash.com/photo-1595152772835-219674b2a8a6?auto=format&fit=crop&w=400&q=80'} 
                alt="Farmer Profile" 
                className="w-24 h-24 rounded-2xl object-cover border-2 border-emerald-500 shadow-md"
              />
              <label 
                htmlFor="photo-upload" 
                className="absolute inset-0 bg-slate-900/60 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer text-white text-xs font-bold gap-1"
              >
                <Upload className="w-4 h-4" />
                Change
              </label>
              <input 
                id="photo-upload" 
                type="file" 
                accept="image/*" 
                onChange={handleImageUpload} 
                className="hidden" 
              />
            </div>

            <div className="flex-1 space-y-2 text-center sm:text-left w-full">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">{t('farmerIdLabel')}</span>
                <div className="inline-flex items-center gap-2 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-700/60 px-3 py-1 rounded-xl">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span className="font-mono font-bold text-xs text-emerald-700 dark:text-emerald-300">
                    {form.farmerId}
                  </span>
                  <button 
                    type="button" 
                    onClick={handleCopyId}
                    className="p-1 text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition"
                    title="Copy Farmer ID"
                  >
                    {copiedId ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 text-xs text-slate-500 dark:text-slate-400">
                <span className="bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded-full font-bold text-[11px]">
                  {t('verifiedAadhaar')}
                </span>
              </div>
            </div>
          </div>

          {/* Personal Inputs Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Full Name */}
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-emerald-500" />
                {t('fullNameLabel')} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Ramesh Patel"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition"
              />
            </div>

            {/* Gender */}
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
                {t('genderLabel')} <span className="text-red-500">*</span>
              </label>
              <select
                value={form.gender}
                onChange={(e) => setForm({ ...form, gender: e.target.value })}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 transition"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            </div>

            {/* Date of Birth & Calculated Age */}
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-emerald-500" />
                  {t('dobLabel')} <span className="text-red-500">*</span>
                </span>
                {ageDisplay !== null && (
                  <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-200/60 dark:border-emerald-800/40">
                    Age: {ageDisplay} {t('ageText')}
                  </span>
                )}
              </label>
              <input
                type="date"
                required
                value={form.dob}
                onChange={(e) => setForm({ ...form, dob: e.target.value })}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 transition"
              />
            </div>

            {/* Mobile Number */}
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-emerald-500" />
                {t('mobileLabel')} <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                required
                placeholder="+91 98765 43210"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 transition"
              />
            </div>

            {/* Email Address */}
            <div className="sm:col-span-2">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-emerald-500" />
                {t('emailLabel')}
              </label>
              <input
                type="email"
                placeholder="farmer@krishimitra.ai"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 transition"
              />
            </div>

          </div>

        </div>

        {/* SECTION 2: ADDRESS INFORMATION */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
          
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white font-outfit flex items-center gap-2">
                  {t('addressSection')}
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {t('addressSub')}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            
            {/* State */}
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
                {t('stateLabel')} <span className="text-red-500">*</span>
              </label>
              <select
                value={form.state}
                onChange={(e) => setForm({ ...form, state: e.target.value })}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 transition"
              >
                {INDIAN_STATES.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            {/* District */}
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
                {t('districtLabel')} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Nashik"
                value={form.district}
                onChange={(e) => setForm({ ...form, district: e.target.value })}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 transition"
              />
            </div>

            {/* Taluka / Tehsil */}
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
                {t('talukaLabel')} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Niphad"
                value={form.taluka}
                onChange={(e) => setForm({ ...form, taluka: e.target.value })}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 transition"
              />
            </div>

            {/* Village */}
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
                {t('villageLabel')} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Chandori"
                value={form.village}
                onChange={(e) => setForm({ ...form, village: e.target.value })}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 transition"
              />
            </div>

            {/* PIN Code */}
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5 flex items-center justify-between">
                <span>{t('pincodeLabel')} <span className="text-red-500">*</span></span>
                {form.pincode && form.pincode.length === 6 && (
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">✓ Valid</span>
                )}
              </label>
              <input
                type="text"
                required
                maxLength={6}
                placeholder="e.g. 422306"
                value={form.pincode}
                onChange={(e) => setForm({ ...form, pincode: e.target.value })}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 transition"
              />
            </div>

          </div>

        </div>

        {/* SECTION 3: FARM INFORMATION */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
          
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                <Sprout className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white font-outfit flex items-center gap-2">
                  {t('farmInfoSection')}
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {t('farmInfoSub')}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">

            {/* Land Area & Unit Toggle + Plots */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Total Land Area */}
              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
                  {t('landAreaLabel')} <span className="text-red-500">*</span>
                </label>
                <div className="flex rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    required
                    value={form.landArea}
                    onChange={(e) => setForm({ ...form, landArea: parseFloat(e.target.value) || 0 })}
                    className="flex-1 bg-transparent px-3.5 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none"
                    placeholder="4.5"
                  />
                  <div className="flex border-l border-slate-200 dark:border-slate-800">
                    {['Acres', 'Hectares'].map(unit => (
                      <button
                        key={unit}
                        type="button"
                        onClick={() => setForm({ ...form, landUnit: unit })}
                        className={`px-3 text-xs font-bold transition-colors ${
                          form.landUnit === unit
                            ? 'bg-emerald-500 text-white'
                            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
                        }`}
                      >
                        {unit}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Number of Farm Plots */}
              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-emerald-500" />
                  {t('plotsLabel')} <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  min="1"
                  max="20"
                  required
                  value={form.farmPlots}
                  onChange={(e) => setForm({ ...form, farmPlots: parseInt(e.target.value) || 1 })}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 transition"
                />
              </div>

            </div>

            {/* Soil Type Selection */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
                {t('soilTypeLabel')} <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
                {SOIL_TYPES.map((soil) => {
                  const selected = form.soilType === soil.id;
                  return (
                    <button
                      key={soil.id}
                      type="button"
                      onClick={() => setForm({ ...form, soilType: soil.id })}
                      className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                        selected
                          ? 'bg-emerald-500/10 dark:bg-emerald-950/60 border-emerald-500 text-emerald-800 dark:text-emerald-300 ring-2 ring-emerald-500/30'
                          : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs">{soil.label}</span>
                        {selected && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                      </div>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 leading-tight">
                        {soil.desc}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Irrigation Source */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block flex items-center justify-between">
                <span>{t('irrigationLabel')} <span className="text-red-500">*</span></span>
              </label>
              <div className="flex flex-wrap gap-2">
                {IRRIGATION_SOURCES.map((source) => {
                  const isChecked = (form.irrigationSource || []).includes(source);
                  return (
                    <button
                      key={source}
                      type="button"
                      onClick={() => handleIrrigationToggle(source)}
                      className={`px-4 py-2.5 rounded-2xl border text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                        isChecked
                          ? 'bg-emerald-500 text-white border-emerald-600 shadow-md scale-[1.02]'
                          : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                      }`}
                    >
                      {isChecked ? <CheckSquare className="w-4 h-4 text-white" /> : <Square className="w-4 h-4 text-slate-400" />}
                      <span>{source}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Water Availability */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block flex items-center gap-1.5">
                <Droplets className="w-3.5 h-3.5 text-blue-500" />
                {t('waterLevelLabel')} <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {WATER_LEVELS.map((level) => {
                  const selected = form.waterAvailability === level.id;
                  return (
                    <button
                      key={level.id}
                      type="button"
                      onClick={() => setForm({ ...form, waterAvailability: level.id })}
                      className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                        selected
                          ? `${level.color} border-2 font-bold shadow-md`
                          : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-extrabold uppercase tracking-wider">{level.label}</span>
                        {selected && <CheckCircle2 className="w-4 h-4" />}
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                        {level.desc}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Primary Crops */}
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
                {t('primaryCropsLabel')}
              </label>
              <input
                type="text"
                placeholder="e.g. Tomato, Grapes, Wheat, Sugarcane"
                value={form.primaryCrops}
                onChange={(e) => setForm({ ...form, primaryCrops: e.target.value })}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 transition"
              />
            </div>

          </div>

        </div>

        {/* SECTION 4: APP & LANGUAGE PREFERENCES */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl">
          <div className="flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
            <Globe className="w-5 h-5 text-emerald-500" />
            <h2 className="text-lg font-bold text-slate-900 dark:text-white font-outfit">
              {t('voiceSettingsSection')}
            </h2>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
              {t('preferredLangLabel')}
            </label>
            <select
              value={form.language}
              onChange={(e) => setForm({ ...form, language: e.target.value })}
              className="w-full sm:w-72 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 transition"
            >
              <option value="hi">हिंदी (Hindi)</option>
              <option value="mr">मराठी (Marathi)</option>
              <option value="en">English</option>
            </select>
          </div>
        </div>

        {/* ACTION BAR */}
        <div className="sticky bottom-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200 dark:border-slate-800 p-4 rounded-3xl shadow-2xl flex items-center justify-between gap-4">
          <div>
            {saved ? (
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 animate-pulse">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>{t('saveSuccessMsg')}</span>
              </span>
            ) : (
              <span className="text-xs text-slate-500 dark:text-slate-400">
                Click save to update your parameters instantly.
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                logout();
                if (setActiveTab) setActiveTab('login');
              }}
              className="px-5 py-3.5 rounded-2xl bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800/60 font-bold text-xs uppercase tracking-wider transition cursor-pointer flex items-center gap-2 shadow-xs shrink-0"
            >
              <LogOut className="w-4 h-4" />
              <span>{t('navLogout') || 'Logout'}</span>
            </button>

            <button
              type="submit"
              className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-600 to-emerald-600 hover:from-emerald-600 hover:to-teal-700 text-white font-black text-xs uppercase tracking-wider shadow-lg hover:shadow-emerald-500/25 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>{t('saveProfileBtn')}</span>
            </button>
          </div>
        </div>

      </form>
    </div>
  );
};

export default ProfilePage;
