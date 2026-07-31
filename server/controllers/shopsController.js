// Nearby Agricultural Shops & Krishi Kendra Locator Controller

const SHOPS_DATABASE = [
  {
    id: 'shop-01',
    name: 'Kisan Krishi Seva Kendra',
    type: 'Pesticides & Fertilizer Shop',
    address: 'Station Road, Near APMC Market Yard, Nashik',
    lat: 19.9975,
    lng: 73.7898,
    distance_km: 1.2,
    phone: '+91 98220 11223',
    rating: 4.8,
    reviews_count: 142,
    government_licensed: true,
    available_stock: ['Ridomil Gold MZ', 'Kocide 3000 Fungicide', 'Bio NPK Liquid', 'Neem Oil 10000 PPM'],
    timing: '8:00 AM - 8:00 PM',
    google_maps_url: 'https://www.google.com/maps/search/?api=1&query=Kisan+Krishi+Seva+Kendra+Nashik'
  },
  {
    id: 'shop-02',
    name: 'Mahavir Seeds & Agri Chemical Center',
    type: 'Govt Approved Bio Input Shop',
    address: 'Main Highway, Near Pimpalgaon, Nashik',
    lat: 20.1667,
    lng: 73.9833,
    distance_km: 2.4,
    phone: '+91 98901 44556',
    rating: 4.6,
    reviews_count: 89,
    government_licensed: true,
    available_stock: ['Tilt Propiconazole', 'Dithane M-45', 'Trichoderma Viride', 'Pseudomonas Fluorescens'],
    timing: '7:30 AM - 9:00 PM',
    google_maps_url: 'https://www.google.com/maps/search/?api=1&query=Mahavir+Seeds+Agri+Chemical+Nashik'
  },
  {
    id: 'shop-03',
    name: 'District Krishi Vigyan Kendra (KVK Nashik)',
    type: 'Government Advisory & Testing Center',
    address: 'ICAR KVK Campus, YCMOU Road, Nashik',
    lat: 20.0050,
    lng: 73.7400,
    distance_km: 4.1,
    phone: '0253 2231200',
    rating: 4.9,
    reviews_count: 310,
    government_licensed: true,
    available_stock: ['Free Soil Testing Kit', 'Subsidized Bio-fertilizers', 'Certified Hybrid Seeds', 'Crop Doctor Helpline'],
    timing: '9:30 AM - 5:30 PM (Mon-Sat)',
    google_maps_url: 'https://www.google.com/maps/search/?api=1&query=Krishi+Vigyan+Kendra+Nashik'
  },
  {
    id: 'shop-04',
    name: 'Shetkari Bio-Tech & Organic Store',
    type: 'Organic Farm Products Specialist',
    address: 'Agro Hub Market, Sector 3, Ozar, Nashik',
    lat: 20.0900,
    lng: 73.9200,
    distance_km: 5.5,
    phone: '+91 94239 88776',
    rating: 4.7,
    reviews_count: 67,
    government_licensed: true,
    available_stock: ['Vermi-compost (50kg)', 'Jeevamrut Concentrate', 'Yellow & Blue Sticky Traps', 'Pheromone Lures'],
    timing: '8:00 AM - 7:30 PM',
    google_maps_url: 'https://www.google.com/maps/search/?api=1&query=Shetkari+Bio-Tech+Organic+Store+Ozar'
  },
  {
    id: 'shop-05',
    name: 'National Seeds Corporation (NSC) Depot',
    type: 'Certified Seed Depot',
    address: 'Opposite APMC Cold Storage, Nashik City',
    lat: 19.9880,
    lng: 73.7750,
    distance_km: 6.3,
    phone: '+91 97654 32109',
    rating: 4.8,
    reviews_count: 198,
    government_licensed: true,
    available_stock: ['Certified Wheat HD-2967', 'Hybrid Tomato Arka Rakshak', 'Certified Cotton BG-II', 'Soybean JS-335'],
    timing: '9:00 AM - 6:00 PM',
    google_maps_url: 'https://www.google.com/maps/search/?api=1&query=National+Seeds+Corporation+Depot+Nashik'
  },
  {
    id: 'shop-06',
    name: 'Jain Drip & Micro Irrigation Systems Dealer',
    type: 'Irrigation & Equipment Store',
    address: 'Industrial Estate Bypass Road, Niphad, Nashik',
    lat: 20.0780,
    lng: 74.1080,
    distance_km: 7.8,
    phone: '+91 98231 66778',
    rating: 4.7,
    reviews_count: 112,
    government_licensed: true,
    available_stock: ['Drip Irrigation Lateral Pipes', 'Inline Emitters 2LPH', 'Venturi Injector Set', 'Submersible Pump Starters'],
    timing: '8:30 AM - 8:00 PM',
    google_maps_url: 'https://www.google.com/maps/search/?api=1&query=Jain+Irrigation+Dealer+Nashik'
  },
  {
    id: 'shop-07',
    name: 'IFFCO Kisan E-Bazaar Outlet',
    type: 'IFFCO Cooperative Outlet',
    address: 'Co-operative Bank Building, Chandori Road, Niphad',
    lat: 20.0450,
    lng: 74.0210,
    distance_km: 8.5,
    phone: '+91 99700 44332',
    rating: 4.9,
    reviews_count: 275,
    government_licensed: true,
    available_stock: ['Nano Urea (Liquid)', 'Nano DAP (Liquid)', 'IFFCO Sagarika Seaweed Extract', 'Water Soluble NPK 19:19:19'],
    timing: '8:00 AM - 7:00 PM',
    google_maps_url: 'https://www.google.com/maps/search/?api=1&query=IFFCO+Kisan+Bazaar+Niphad'
  },
  {
    id: 'shop-08',
    name: 'Kisan Agro Machinery & Battery Sprayer Hub',
    type: 'Farm Machinery & Tools',
    address: 'Tractor Market, Main Highway Bypass, Nashik',
    lat: 19.9720,
    lng: 73.8120,
    distance_km: 9.9,
    phone: '+91 98600 77889',
    rating: 4.5,
    reviews_count: 94,
    government_licensed: true,
    available_stock: ['12V Dual Pump Battery Sprayer', 'HTP Power Sprayer Pump', 'Tractor Mounted Boom Nozzles', 'Pruning Shears & Saw'],
    timing: '9:00 AM - 8:30 PM',
    google_maps_url: 'https://www.google.com/maps/search/?api=1&query=Kisan+Agro+Machinery+Sprayer+Nashik'
  },
  {
    id: 'shop-09',
    name: 'GreenEarth Bio-Pesticides & Botanical Lab',
    type: 'Bio-Pesticides & Neem Dealer',
    address: 'Near Milk Dairy Society, Chandori, Nashik',
    lat: 20.0310,
    lng: 74.0050,
    distance_km: 10.6,
    phone: '+91 94215 33221',
    rating: 4.6,
    reviews_count: 53,
    government_licensed: true,
    available_stock: ['Beauveria Bassiana', 'Verticillium Lecanii', 'Neem Seed Kernel Extract 5%', 'Dashparni Arka'],
    timing: '7:00 AM - 7:00 PM',
    google_maps_url: 'https://www.google.com/maps/search/?api=1&query=GreenEarth+Bio+Pesticides+Chandori'
  },
  {
    id: 'shop-10',
    name: 'Vikas Primary Agriculture Co-Operative Society (PACS)',
    type: 'Cooperative Farmers Outlet',
    address: 'Gram Panchayat Bhavan Road, Chandori, Niphad',
    lat: 20.0250,
    lng: 73.9980,
    distance_km: 11.4,
    phone: '0253 2456789',
    rating: 4.7,
    reviews_count: 210,
    government_licensed: true,
    available_stock: ['Subsidized Urea & MOP', 'Single Super Phosphate (SSP)', 'Zaid Season Seeds', 'Farmers Credit Scheme Inputs'],
    timing: '9:00 AM - 5:00 PM',
    google_maps_url: 'https://www.google.com/maps/search/?api=1&query=Vikas+CoOperative+Society+Chandori'
  },
  {
    id: 'shop-11',
    name: 'Agri-Clinic & Soil Diagnostics Centre',
    type: 'Soil & Water Testing Lab',
    address: 'Krishi Bhavan Annex, Nashik District HQ',
    lat: 19.9990,
    lng: 73.7850,
    distance_km: 12.8,
    phone: '+91 98812 99001',
    rating: 4.8,
    reviews_count: 164,
    government_licensed: true,
    available_stock: ['Rapid NPK Soil Testing', 'Irrigation Water Salinity Test', 'Micro-Nutrient Analysis', 'Tissue & Leaf Analysis'],
    timing: '10:00 AM - 5:30 PM (Mon-Fri)',
    google_maps_url: 'https://www.google.com/maps/search/?api=1&query=Agri+Clinic+Soil+Diagnostics+Nashik'
  },
  {
    id: 'shop-12',
    name: 'APMC Yard Wholesale Farmers Input Superstore',
    type: 'APMC Wholesale Farmers Hub',
    address: 'Gate No 2, Main APMC Market Yard, Nashik',
    lat: 19.9950,
    lng: 73.7920,
    distance_km: 14.2,
    phone: '+91 99210 55443',
    rating: 4.6,
    reviews_count: 185,
    government_licensed: true,
    available_stock: ['Bulk Granular Fertilizer 50kg', 'Mulching Sheets 25 Micron', 'Crush Insecticide Nets', 'Plastic Tomato Crates'],
    timing: '6:00 AM - 7:00 PM',
    google_maps_url: 'https://www.google.com/maps/search/?api=1&query=APMC+Market+Yard+Wholesale+Nashik'
  }
];

exports.getNearbyShops = async (req, res, next) => {
  try {
    const { lat, lng, type, search } = req.query;
    let list = [...SHOPS_DATABASE];

    if (type && type !== 'All') {
      list = list.filter(s => s.type.toLowerCase().includes(type.toLowerCase()));
    }
    if (search) {
      list = list.filter(s => 
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.address.toLowerCase().includes(search.toLowerCase()) ||
        s.available_stock.some(item => item.toLowerCase().includes(search.toLowerCase()))
      );
    }

    res.json({
      success: true,
      user_location: { lat: parseFloat(lat) || 20.0, lng: parseFloat(lng) || 73.78 },
      count: list.length,
      data: list
    });
  } catch (err) {
    next(err);
  }
};

