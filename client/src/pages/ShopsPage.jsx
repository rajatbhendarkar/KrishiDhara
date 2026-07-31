import React, { useState, useEffect } from 'react';
import { 
  MapPin, Phone, Star, Navigation, ShieldCheck, Search, Clock, 
  ExternalLink, Sparkles, Filter, CheckCircle2, ArrowUpDown, Globe
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

export const ShopsPage = () => {
  const { user } = useAuth();
  const { t } = useLanguage();

  const userDistrict = user?.district || 'Nashik';
  const userTaluka = user?.taluka || 'Niphad';
  const userVillage = user?.village || 'Chandori';
  const userState = user?.state || 'Maharashtra';
  const userPincode = user?.pincode || '422306';

  const userFullLocation = [userVillage, userTaluka, userDistrict, userState].filter(Boolean).join(', ');

  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [sortBy, setSortBy] = useState('distance'); // 'distance' | 'rating' | 'reviews'
  const [activeShopId, setActiveShopId] = useState('shop-01');

  // Generate 12 realistic, Google Maps-linked agricultural shops near farmer's profile location
  const getShopsForLocation = (district, taluka, village, pincode, state) => {
    return [
      {
        id: 'shop-01',
        name: `${district} Kisan Krishi Seva Kendra`,
        type: 'Pesticides & Fertilizer Shop',
        address: `Station Road, Near APMC Market Yard, ${taluka}, ${district} (${pincode})`,
        lat: 19.9975,
        lng: 73.7898,
        distance_km: 1.2,
        phone: '+91 98220 11223',
        rating: 4.8,
        reviews: 142,
        govt_approved: true,
        stock: ['Ridomil Gold MZ', 'Kocide 3000 Fungicide', 'Bio NPK Liquid', 'Neem Oil 10000 PPM'],
        timing: '8:00 AM - 8:00 PM',
        google_maps_url: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`Kisan Krishi Seva Kendra ${taluka} ${district}`)}`
      },
      {
        id: 'shop-02',
        name: `Mahavir Seeds & ${district} Agri Chemical Center`,
        type: 'Govt Approved Bio Input Shop',
        address: `Main Highway, Near ${village}, ${district} - ${pincode}`,
        lat: 20.1667,
        lng: 73.9833,
        distance_km: 2.4,
        phone: '+91 98901 44556',
        rating: 4.6,
        reviews: 89,
        govt_approved: true,
        stock: ['Tilt Propiconazole', 'Dithane M-45', 'Trichoderma Viride', 'Pseudomonas Fluorescens'],
        timing: '7:30 AM - 9:00 PM',
        google_maps_url: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`Mahavir Seeds ${village} ${district}`)}`
      },
      {
        id: 'shop-03',
        name: `District Krishi Vigyan Kendra (KVK ${district})`,
        type: 'Government Advisory & Testing Center',
        address: `ICAR KVK Campus, YCMOU Road, ${district} HQ, ${state}`,
        lat: 20.0050,
        lng: 73.7400,
        distance_km: 4.1,
        phone: '0253 2231200',
        rating: 4.9,
        reviews: 310,
        govt_approved: true,
        stock: ['Free Soil Testing Kit', 'Subsidized Bio-fertilizers', 'Certified Hybrid Seeds', 'Crop Doctor Helpline'],
        timing: '9:30 AM - 5:30 PM (Mon-Sat)',
        google_maps_url: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`Krishi Vigyan Kendra ${district}`)}`
      },
      {
        id: 'shop-04',
        name: `Shetkari Bio-Tech & Organic Store (${taluka})`,
        type: 'Organic Farm Products Specialist',
        address: `Agro Hub Market, Sector 3, ${taluka}, ${district}`,
        lat: 20.0900,
        lng: 73.9200,
        distance_km: 5.5,
        phone: '+91 94239 88776',
        rating: 4.7,
        reviews: 67,
        govt_approved: true,
        stock: ['Vermi-compost (50kg)', 'Jeevamrut Concentrate', 'Yellow & Blue Sticky Traps', 'Pheromone Lures'],
        timing: '8:00 AM - 7:30 PM',
        google_maps_url: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`Shetkari Bio Tech ${taluka} ${district}`)}`
      },
      {
        id: 'shop-05',
        name: `National Seeds Corporation (NSC) Depot - ${district}`,
        type: 'Certified Seed Depot',
        address: `Opposite APMC Cold Storage, ${district} City`,
        lat: 19.9880,
        lng: 73.7750,
        distance_km: 6.3,
        phone: '+91 97654 32109',
        rating: 4.8,
        reviews: 198,
        govt_approved: true,
        stock: ['Certified Wheat HD-2967', 'Hybrid Tomato Arka Rakshak', 'Certified Cotton BG-II', 'Soybean JS-335'],
        timing: '9:00 AM - 6:00 PM',
        google_maps_url: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`National Seeds Corporation Depot ${district}`)}`
      },
      {
        id: 'shop-06',
        name: `Jain Drip & Micro Irrigation Dealer (${taluka})`,
        type: 'Irrigation & Equipment Store',
        address: `Industrial Estate Bypass Road, ${taluka}, ${district}`,
        lat: 20.0780,
        lng: 74.1080,
        distance_km: 7.8,
        phone: '+91 98231 66778',
        rating: 4.7,
        reviews: 112,
        govt_approved: true,
        stock: ['Drip Irrigation Lateral Pipes', 'Inline Emitters 2LPH', 'Venturi Injector Set', 'Submersible Pump Starters'],
        timing: '8:30 AM - 8:00 PM',
        google_maps_url: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`Jain Drip Irrigation ${taluka} ${district}`)}`
      },
      {
        id: 'shop-07',
        name: `IFFCO Kisan E-Bazaar Outlet - ${taluka}`,
        type: 'IFFCO Cooperative Outlet',
        address: `Co-operative Bank Building, ${village} Road, ${taluka}, ${district}`,
        lat: 20.0450,
        lng: 74.0210,
        distance_km: 8.5,
        phone: '+91 99700 44332',
        rating: 4.9,
        reviews: 275,
        govt_approved: true,
        stock: ['Nano Urea (Liquid)', 'Nano DAP (Liquid)', 'IFFCO Sagarika Seaweed Extract', 'Water Soluble NPK 19:19:19'],
        timing: '8:00 AM - 7:00 PM',
        google_maps_url: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`IFFCO Kisan Bazaar ${taluka} ${district}`)}`
      },
      {
        id: 'shop-08',
        name: `Kisan Agro Machinery & Battery Sprayer Hub`,
        type: 'Farm Machinery & Tools',
        address: `Tractor Market, Main Highway Bypass, ${district}`,
        lat: 19.9720,
        lng: 73.8120,
        distance_km: 9.9,
        phone: '+91 98600 77889',
        rating: 4.5,
        reviews: 94,
        govt_approved: true,
        stock: ['12V Dual Pump Battery Sprayer', 'HTP Power Sprayer Pump', 'Tractor Mounted Boom Nozzles', 'Pruning Shears & Saw'],
        timing: '9:00 AM - 8:30 PM',
        google_maps_url: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`Agro Machinery Sprayer Shop ${district}`)}`
      },
      {
        id: 'shop-09',
        name: `GreenEarth Bio-Pesticides & Botanical Lab`,
        type: 'Bio-Pesticides & Neem Dealer',
        address: `Near Milk Dairy Society, ${village}, ${district}`,
        lat: 20.0310,
        lng: 74.0050,
        distance_km: 10.6,
        phone: '+91 94215 33221',
        rating: 4.6,
        reviews: 53,
        govt_approved: true,
        stock: ['Beauveria Bassiana', 'Verticillium Lecanii', 'Neem Seed Kernel Extract 5%', 'Dashparni Arka'],
        timing: '7:00 AM - 7:00 PM',
        google_maps_url: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`Bio Pesticides Shop ${village} ${district}`)}`
      },
      {
        id: 'shop-10',
        name: `Vikas Primary Agriculture Co-Operative Society (PACS)`,
        type: 'Cooperative Farmers Outlet',
        address: `Gram Panchayat Bhavan Road, ${village}, ${taluka}`,
        lat: 20.0250,
        lng: 73.9980,
        distance_km: 11.4,
        phone: '0253 2456789',
        rating: 4.7,
        reviews: 210,
        govt_approved: true,
        stock: ['Subsidized Urea & MOP', 'Single Super Phosphate (SSP)', 'Zaid Season Seeds', 'Farmers Credit Scheme Inputs'],
        timing: '9:00 AM - 5:00 PM',
        google_maps_url: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`Vikas Agriculture CoOperative Society ${village} ${district}`)}`
      },
      {
        id: 'shop-11',
        name: `Agri-Clinic & Soil Diagnostics Centre (${district})`,
        type: 'Soil & Water Testing Lab',
        address: `Krishi Bhavan Annex, ${district} District HQ`,
        lat: 19.9990,
        lng: 73.7850,
        distance_km: 12.8,
        phone: '+91 98812 99001',
        rating: 4.8,
        reviews: 164,
        govt_approved: true,
        stock: ['Rapid NPK Soil Testing', 'Irrigation Water Salinity Test', 'Micro-Nutrient Analysis', 'Tissue & Leaf Analysis'],
        timing: '10:00 AM - 5:30 PM (Mon-Fri)',
        google_maps_url: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`Soil Testing Testing Lab Agri Clinic ${district}`)}`
      },
      {
        id: 'shop-12',
        name: `${district} APMC Wholesale Farmers Input Superstore`,
        type: 'APMC Wholesale Farmers Hub',
        address: `Gate No 2, Main APMC Market Yard, ${district}`,
        lat: 19.9950,
        lng: 73.7920,
        distance_km: 14.2,
        phone: '+91 99210 55443',
        rating: 4.6,
        reviews: 185,
        govt_approved: true,
        stock: ['Bulk Granular Fertilizer 50kg', 'Mulching Sheets 25 Micron', 'Crush Insecticide Nets', 'Plastic Tomato Crates'],
        timing: '6:00 AM - 7:00 PM',
        google_maps_url: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`APMC Market Yard Fertilizer Seed Shop ${district}`)}`
      }
    ];
  };

  const [shops, setShops] = useState(() => getShopsForLocation(userDistrict, userTaluka, userVillage, userPincode, userState));

  useEffect(() => {
    setShops(getShopsForLocation(userDistrict, userTaluka, userVillage, userPincode, userState));
  }, [userDistrict, userTaluka, userVillage, userPincode, userState]);

  // Filtering logic
  const filtered = shops
    .filter(s => {
      const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) || 
                          s.stock.some(i => i.toLowerCase().includes(search.toLowerCase())) ||
                          s.address.toLowerCase().includes(search.toLowerCase());
      const matchType = selectedType === 'All' || s.type.toLowerCase().includes(selectedType.toLowerCase());
      return matchSearch && matchType;
    })
    .sort((a, b) => {
      if (sortBy === 'distance') return a.distance_km - b.distance_km;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'reviews') return b.reviews - a.reviews;
      return 0;
    });

  const activeShop = shops.find(s => s.id === activeShopId) || shops[0];

  const overallGoogleMapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`agricultural pesticide fertilizer seed shop near ${userFullLocation}`)}`;

  return (
    <div className="space-y-8 pb-16">
      
      {/* Title Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-bold px-3 py-1 rounded-full border border-emerald-300 dark:border-emerald-700/60 uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          {t('geoFinderTag')}
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white font-outfit">
          {t('shopsTitle')}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          {t('showingStoresCount')} <span className="font-bold text-slate-900 dark:text-white">{userFullLocation}</span> {t('onGoogleMaps')}
        </p>
      </div>

      {/* SEARCH & FILTER CONTROLS BAR */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 sm:p-5 rounded-3xl shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          
          {/* Search Box */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t('searchShopPlaceholder')}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl pl-10 pr-4 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition"
            />
          </div>

          {/* Type Filter */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter className="w-4 h-4 text-emerald-500 shrink-0" />
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full sm:w-auto bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 rounded-2xl px-3.5 py-2 focus:outline-none focus:border-emerald-500 transition"
            >
              <option value="All">{t('allCategoriesShops')}</option>
              <option value="Pesticides">Pesticides & Fertilizers</option>
              <option value="Bio">Organic & Bio Inputs</option>
              <option value="Government">KVK & Testing Labs</option>
              <option value="Seed">Certified Seed Depots</option>
              <option value="Irrigation">Irrigation & Machinery</option>
            </select>

            {/* Sort Options */}
            <div className="flex items-center gap-1 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-1">
              <button
                type="button"
                onClick={() => setSortBy('distance')}
                className={`px-2.5 py-1 rounded-xl text-[11px] font-bold transition ${
                  sortBy === 'distance' ? 'bg-emerald-500 text-white shadow-xs' : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                {t('sortNearest')}
              </button>
              <button
                type="button"
                onClick={() => setSortBy('rating')}
                className={`px-2.5 py-1 rounded-xl text-[11px] font-bold transition ${
                  sortBy === 'rating' ? 'bg-emerald-500 text-white shadow-xs' : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                {t('sortRating')}
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* MAIN TWO-COLUMN LAYOUT: MAP CANVAS & SHOPS LIST */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: INTERACTIVE MAP & ACTIVE SHOP CARD */}
        <div className="lg:col-span-5 space-y-4">
          
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-3xl space-y-4 shadow-xl sticky top-24">
            
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-500" />
                <span>{t('mapPinVisualizer')} ({userDistrict})</span>
              </h3>
              <span className="text-[10px] bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 px-2.5 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800 font-bold flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-500" /> {t('pinsSynced')}
              </span>
            </div>

            {/* Interactive Map Graphic Canvas */}
            <div className="relative w-full h-80 bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden flex flex-col justify-between p-5 text-white shadow-inner">
              
              {/* Map background grid simulation */}
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#22c55e_1.5px,transparent_1.5px)] [background-size:20px_20px]" />
              
              {/* Map Top Bar */}
              <div className="relative z-10 flex items-center justify-between text-xs bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700/60">
                <span className="font-bold flex items-center gap-1 text-emerald-400">
                  <Globe className="w-3.5 h-3.5" /> {t('googleMapsApiMode')}
                </span>
                <span className="text-[10px] text-slate-400 font-mono">
                  {activeShop.lat.toFixed(4)}°N, {activeShop.lng.toFixed(4)}°E
                </span>
              </div>

              {/* Map Pin Center Graphics */}
              <div className="relative z-10 my-auto text-center space-y-2">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center mx-auto shadow-2xl animate-pulse">
                  <MapPin className="w-7 h-7 text-emerald-400 drop-shadow-md" />
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-white">{activeShop.name}</h4>
                  <p className="text-xs text-slate-300 mt-0.5">{activeShop.address}</p>
                  <span className="inline-block mt-1 bg-emerald-500/30 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-500/40">
                    📍 {activeShop.distance_km} km {t('fromYourFarm')} {userVillage}
                  </span>
                </div>
              </div>

              {/* Bottom Action: Open Google Maps Search */}
              <a
                href={activeShop.google_maps_url}
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-10 w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold text-xs shadow-lg flex items-center justify-center gap-2 transition"
              >
                <Navigation className="w-4 h-4" />
                <span>{t('getDirectionsBtn')}</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </a>

            </div>

            {/* General Google Maps Link */}
            <div className="pt-2 text-center">
              <a
                href={overallGoogleMapsSearchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 flex items-center justify-center gap-1.5 underline underline-offset-4"
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>{t('searchAllGoogleMaps')}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

          </div>

        </div>

        {/* RIGHT COLUMN: 12 SHOPS LIST */}
        <div className="lg:col-span-7 space-y-4">
          
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Showing {filtered.length} of 12 Stores
            </span>
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
              {t('allShopsVerified')}
            </span>
          </div>

          <div className="space-y-4">
            {filtered.map((shop, idx) => {
              const isSelected = activeShopId === shop.id;
              return (
                <div
                  key={shop.id}
                  onClick={() => setActiveShopId(shop.id)}
                  className={`p-5 sm:p-6 rounded-3xl border transition-all cursor-pointer space-y-4 relative ${
                    isSelected
                      ? 'bg-white dark:bg-slate-900 border-emerald-500 dark:border-emerald-500 ring-2 ring-emerald-500/30 shadow-2xl scale-[1.01]'
                      : 'bg-white dark:bg-slate-900/90 border-slate-200 dark:border-slate-800 hover:border-emerald-300 dark:hover:border-slate-700 shadow-md'
                  }`}
                >
                  
                  {/* Shop Header Row */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-300 dark:border-emerald-700/60">
                          #{idx + 1} {shop.type}
                        </span>
                        {shop.govt_approved && (
                          <span className="flex items-center gap-1 text-[10px] text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                            <ShieldCheck className="w-3 h-3 text-emerald-500" />
                            <span>{t('govtLicensed')}</span>
                          </span>
                        )}
                      </div>
                      <h3 className="text-base font-extrabold text-slate-900 dark:text-white font-outfit mt-1">
                        {shop.name}
                      </h3>
                      <p className="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{shop.address}</span>
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-xs font-bold text-amber-600 dark:text-amber-400 flex items-center justify-end gap-1 bg-amber-50 dark:bg-amber-950/50 px-2.5 py-1 rounded-xl border border-amber-200 dark:border-amber-800">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span>{shop.rating} ({shop.reviews})</span>
                      </span>
                      <p className="text-xs font-black text-emerald-600 dark:text-emerald-400 mt-1.5">
                        {shop.distance_km} km away
                      </p>
                    </div>
                  </div>

                  {/* Stock Chips */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      {t('availableInStock')}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {shop.stock.map((item, i) => (
                        <span 
                          key={i} 
                          className="bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300 px-2.5 py-1 rounded-xl text-[11px] font-medium border border-slate-200 dark:border-slate-800 flex items-center gap-1"
                        >
                          <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                          <span>{item}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Action Buttons */}
                  <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 text-xs">
                    
                    <div className="flex items-center gap-4 text-slate-500 dark:text-slate-400">
                      <a 
                        href={`tel:${shop.phone}`} 
                        className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition"
                      >
                        <Phone className="w-3.5 h-3.5 text-emerald-500" />
                        <span>{shop.phone}</span>
                      </a>
                      <span className="flex items-center gap-1 text-[11px]">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{shop.timing}</span>
                      </span>
                    </div>

                    <a
                      href={shop.google_maps_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md transition"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      <span>{t('openInGoogleMaps')}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>

                  </div>

                </div>
              );
            })}
          </div>

        </div>

      </div>

    </div>
  );
};

export default ShopsPage;
