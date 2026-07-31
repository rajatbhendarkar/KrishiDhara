// Comprehensive Plant Disease Database & AI Diagnostic Engine
const DISEASE_DATABASE = {
  // COTTON
  'cotton_leaf_curl': {
    crop: 'Cotton',
    disease: 'Cotton Leaf Curl Virus (CLCuV)',
    affected_part: 'Leaf & Stem',
    severity: 'High',
    confidence: 95.8,
    symptoms: [
      'Upward and downward leaf curling with dark green leaf thickening',
      'Dark green enations (cup-like outgrowths) on undersides of leaf veins',
      'Stunted plant growth and severely reduced boll formation'
    ],
    causes: [
      'Cotton Leaf Curl Begomovirus transmitted by Whiteflies (Bemisia tabaci)',
      'Hot dry weather accelerating whitefly vector multiplication'
    ],
    organic_treatment: [
      'Install yellow sticky traps (25 traps/acre) for whitefly vector capture',
      'Spray Neem Seed Kernel Extract 5% (NSKE) every 7-10 days',
      'Foliar spray of Verticillium lecanii bio-insecticide (5g/L water)'
    ],
    chemical_treatment: [
      'Spray Diafenthiuron 50% WP (1.2g/L water) for whitefly control',
      'Foliar spray of Imidacloprid 17.8% SL (0.5ml/L water)',
      'Spiromesifen 22.9% SC (1ml/L water) for nymph control'
    ],
    medicines: ['Polo (Diafenthiuron)', 'Confidor (Imidacloprid)', 'Oberon (Spiromesifen)'],
    recovery_days: 18,
    disease_code: 'COT-LC-01'
  },
  'cotton_pink_bollworm': {
    crop: 'Cotton',
    disease: 'Cotton Pink Bollworm (Pectinophora gossypiella)',
    affected_part: 'Fruit',
    severity: 'Critical',
    confidence: 97.4,
    symptoms: [
      'Rosetted pink flowers that fail to open fully',
      'Bored entry holes on young bolls with brownish frass',
      'Stained lint, damaged seeds, and premature boll dropping'
    ],
    causes: [
      'Larvae of Pink Bollworm moth feeding on developing seeds inside bolls',
      'Late season mono-cropping and unmanaged crop stubble'
    ],
    organic_treatment: [
      'Install Pheromone Traps (Pectino-lure) at 10 traps per acre',
      'Release Trichogramma bactrae egg parasitoid cards (50,000/acre)',
      'Spray Bacillus thuringiensis (Bt) formulation (2g/L water)'
    ],
    chemical_treatment: [
      'Spray Profenofos 50% EC (2ml/L water) at flower initiation stage',
      'Emamectin Benzoate 5% SG (0.5g/L water)',
      'Chlorantraniliprole 18.5% SC (0.3ml/L water)'
    ],
    medicines: ['Curacron (Profenofos)', 'Proclaim (Emamectin)', 'Coragen (Chlorantraniliprole)'],
    recovery_days: 15,
    disease_code: 'COT-PB-02'
  },

  // TOMATO
  'tomato_late_blight': {
    crop: 'Tomato',
    disease: 'Tomato Late Blight (Phytophthora infestans)',
    affected_part: 'Leaf & Fruit',
    severity: 'High',
    confidence: 96.8,
    symptoms: [
      'Large, irregular dark brown water-soaked lesions on leaf surfaces',
      'White cottony fungal growth on undersides during high humidity',
      'Firm dark brown lesions extending into tomato fruit body'
    ],
    causes: [
      'Fungal pathogen Phytophthora infestans',
      'Cool temperatures (15-22°C) combined with high humidity (>85%)'
    ],
    organic_treatment: [
      'Apply Copper Octanoate or Bordeaux mixture spray every 7 days',
      'Spray Neem leaf oil solution (5ml/L water) as preventive coat',
      'Prune lower foliage (first 12 inches) to prevent splash inoculations'
    ],
    chemical_treatment: [
      'Spray Metalaxyl + Mancozeb (2g/L water) immediately upon early symptom',
      'Foliar spray with Cymoxanil + Mancozeb (2.5g/L water)',
      'Rotate with Azoxystrobin (1ml/L) to prevent fungicide resistance'
    ],
    medicines: ['Ridomil Gold (Metalaxyl + Mancozeb)', 'Kocide 3000', 'Amistar SC'],
    recovery_days: 12,
    disease_code: 'TOM-LB-01'
  },
  'tomato_early_blight': {
    crop: 'Tomato',
    disease: 'Tomato Early Blight (Alternaria solani)',
    affected_part: 'Leaf',
    severity: 'Moderate',
    confidence: 94.5,
    symptoms: [
      'Concentric target-board rings on older lower leaves',
      'Yellow halos surrounding dark brown necrotic leaf spots',
      'Premature defoliation leading to fruit sunscald'
    ],
    causes: [
      'Fungal pathogen Alternaria solani',
      'Warm weather (24-29°C) with alternating wet/dry conditions'
    ],
    organic_treatment: [
      'Apply Trichoderma viride bio-fungicide to root zone and leaves',
      'Mulch heavily with dry straw to prevent soil-borne spore splash',
      'Baking soda solution (1 tbsp baking soda + 1 tsp horticultural oil per gallon)'
    ],
    chemical_treatment: [
      'Chlorothalonil 75% WP spray (2g/L water)',
      'Tebuconazole 25.9% EC (1ml/L water)',
      'Mancozeb 75% WP (2.5g/L water)'
    ],
    medicines: ['Kavach (Chlorothalonil)', 'Folicur (Tebuconazole)', 'Dithane M-45'],
    recovery_days: 10,
    disease_code: 'TOM-EB-02'
  },

  // RICE
  'rice_blast': {
    crop: 'Rice',
    disease: 'Rice Blast (Magnaporthe oryzae)',
    affected_part: 'Leaf & Stem',
    severity: 'Critical',
    confidence: 97.2,
    symptoms: [
      'Spindle-shaped elliptical eye spots with whitish-gray centers and reddish-brown borders',
      'Lesions enlarge rapidly causing leaf drying and neck rot on panicles',
      'Empty or partially filled rice grains at harvest'
    ],
    causes: [
      'Magnaporthe oryzae fungal spores carried by wind',
      'Excessive chemical nitrogen fertilizer application'
    ],
    organic_treatment: [
      'Foliar spray of Pseudomonas fluorescens (10g/L water)',
      'Fermented cow dung + Panchagavya liquid spray',
      'Apply potassium sulfate to strengthen silica leaf epidermal layer'
    ],
    chemical_treatment: [
      'Tricyclazole 75% WP (0.6g/L water) - ICAR gold standard for blast',
      'Isoprothiolane 40% EC (1.5ml/L water)',
      'Kasugamycin 3% SL (2ml/L water)'
    ],
    medicines: ['Beam 75 WP (Tricyclazole)', 'Fuji-One (Isoprothiolane)', 'Kasu-B'],
    recovery_days: 14,
    disease_code: 'RICE-BL-01'
  },

  // WHEAT
  'wheat_rust': {
    crop: 'Wheat',
    disease: 'Wheat Stripe / Yellow Rust (Puccinia striiformis)',
    affected_part: 'Leaf',
    severity: 'High',
    confidence: 95.1,
    symptoms: [
      'Linear rows of bright yellow pustules arranged in stripes along leaf veins',
      'Pustules burst open releasing powdery yellow spores',
      'Leaves dry up and turn yellow-brown, drastically dropping yield'
    ],
    causes: [
      'Airborne rust fungal spores traveling long distances',
      'Cool temperature (10-15°C) with persistent night dew'
    ],
    organic_treatment: [
      'Spray sour fermented buttermilk solution (1L in 10L water)',
      'Plant rust-resistant seed varieties (HD-2967, DBW-187)',
      'Foliar spray of bio-sulfur formulation'
    ],
    chemical_treatment: [
      'Propiconazole 25% EC (1ml/L water) at immediate first symptom',
      'Tebuconazole 50% + Trifloxystrobin 25% WG (0.7g/L)',
      'Hexaconazole 5% EC (2ml/L water)'
    ],
    medicines: ['Tilt 25 EC (Propiconazole)', 'Nativo (Tebuconazole+Trifloxystrobin)', 'Contaf 5 EC'],
    recovery_days: 14,
    disease_code: 'WHT-YR-01'
  },

  // SUGARCANE
  'sugarcane_red_rot': {
    crop: 'Sugarcane',
    disease: 'Sugarcane Red Rot (Colletotrichum falcatum)',
    affected_part: 'Stem & Leaf',
    severity: 'Critical',
    confidence: 96.5,
    symptoms: [
      'Yellowing and drooping of 3rd and 4th upper leaves',
      'Longitudinal reddening of internal stalk pith with white transverse spots',
      'Characteristic alcoholic odor when stalk is split open'
    ],
    causes: [
      'Fungal pathogen Colletotrichum falcatum entering via infected seed setts',
      'Waterlogging and poorly drained heavy clay soil'
    ],
    organic_treatment: [
      'Hot water seed sett treatment at 50°C for 2 hours before planting',
      'Soil enrichment with Trichoderma viride bio-agent (2.5kg/acre)',
      'Rogue out and destroy infected cane clumps immediately'
    ],
    chemical_treatment: [
      'Soak seed setts in Carbendazim 50% WP solution (2g/L water)',
      'Soil drenching around clumps with Carbendazim + Mancozeb (2.5g/L)'
    ],
    medicines: ['Bavistin 50 WP', 'Companion (Carbendazim+Mancozeb)', 'Blitox 50'],
    recovery_days: 20,
    disease_code: 'SUG-RR-01'
  },

  // POTATO
  'potato_late_blight': {
    crop: 'Potato',
    disease: 'Potato Late Blight (Phytophthora infestans)',
    affected_part: 'Leaf & Stem',
    severity: 'High',
    confidence: 97.0,
    symptoms: [
      'Water-soaked dark brown leaf lesions expanding rapidly under wet weather',
      'White mildew growth on leaf undersides in high humidity',
      'Reddish-brown dry rot extending inside potato tubers'
    ],
    causes: [
      'Oomycete fungus Phytophthora infestans',
      'High relative humidity (>90%) with cool overcast days (15-20°C)'
    ],
    organic_treatment: [
      'Apply Copper Hydroxide spray (2.5g/L water) as protective coat',
      'Destroy infected haulms (vines) 10 days before harvesting tubers',
      'Spray Neem leaf extract solution (5ml/L water)'
    ],
    chemical_treatment: [
      'Cymoxanil 8% + Mancozeb 64% WP (2.5g/L water)',
      'Dimethomorph 50% WP (1g/L water)',
      'Mandipropamid 23.4% SC (1ml/L water)'
    ],
    medicines: ['Curzate (Cymoxanil)', 'Acrobat (Dimethomorph)', 'Revus'],
    recovery_days: 11,
    disease_code: 'POT-LB-01'
  },

  // GRAPES
  'grape_downy_mildew': {
    crop: 'Grapes',
    disease: 'Grape Downy Mildew (Plasmopara viticola)',
    affected_part: 'Leaf & Fruit',
    severity: 'High',
    confidence: 96.1,
    symptoms: [
      'Yellowish oil-spot lesions on upper leaf surfaces',
      'Dense white cottony downy fungal growth underneath leaves',
      'Brown shriveling and dropping of young berry clusters'
    ],
    causes: [
      'Plasmopara viticola oomycete pathogen',
      'Rainfall combined with high humidity (>85%) during canopy formation'
    ],
    organic_treatment: [
      'Spray 1% Bordeaux mixture solution preventative coat',
      'Foliar spray of Copper Octanoate',
      'Prune canopy leaves for maximum sunlight and air movement'
    ],
    chemical_treatment: [
      'Dimethomorph 50% WP (1g/L water)',
      'Fosetyl-Al 80% WP (2g/L water)',
      'Metalaxyl-M 4% + Mancozeb 64% WG (2g/L water)'
    ],
    medicines: ['Acrobat', 'Aliette (Fosetyl-Al)', 'Ridomil Gold MZ'],
    recovery_days: 12,
    disease_code: 'GRP-DM-01'
  },

  // MANGO
  'mango_anthracnose': {
    crop: 'Mango',
    disease: 'Mango Anthracnose (Colletotrichum gloeosporioides)',
    affected_part: 'Leaf & Fruit',
    severity: 'Moderate',
    confidence: 94.8,
    symptoms: [
      'Dark brown to black necrotic spots on leaves and tender twigs',
      'Blossom blight causing flower drop and un-set fruitlets',
      'Black tear-stain sunken lesions on developing mango fruits'
    ],
    causes: [
      'Colletotrichum gloeosporioides fungus',
      'Frequent rains and heavy dew during flowering and fruit set'
    ],
    organic_treatment: [
      'Spray Neem oil 5ml/L water during pre-flowering stage',
      'Post-harvest hot water fruit dip (52°C for 5 minutes)',
      'Trichoderma viride foliar spray'
    ],
    chemical_treatment: [
      'Carbendazim 50% WP (1g/L water)',
      'Azoxystrobin 18.2% + Difenoconazole 11.4% SC (1ml/L)',
      'Copper Oxychloride 50% WP (3g/L water)'
    ],
    medicines: ['Bavistin 50 WP', 'Amistar Top', 'Blitox 50'],
    recovery_days: 14,
    disease_code: 'MNG-ANT-01'
  },

  // CHILI
  'chili_leaf_curl': {
    crop: 'Chili',
    disease: 'Chili Leaf Curl Virus (ChLCV)',
    affected_part: 'Leaf & Stem',
    severity: 'High',
    confidence: 95.4,
    symptoms: [
      'Severe upward curling, puckering, and size reduction of young leaves',
      'Thickened vein network with stunted bushy plant habit',
      'Drastic reduction in flowering and chili pod yield'
    ],
    causes: [
      'Begomovirus transmitted by Whitefly vectors (*Bemisia tabaci*)'
    ],
    organic_treatment: [
      'Set up yellow sticky traps (25 traps per acre)',
      'Spray Neem Seed Kernel Extract 5% (NSKE)',
      'Plant border barrier rows of maize or sorghum'
    ],
    chemical_treatment: [
      'Imidacloprid 17.8% SL (0.5ml/L water)',
      'Fipronil 5% SC (2ml/L water)',
      'Cyantraniliprole 10.26% OD (1.2ml/L)'
    ],
    medicines: ['Confidor (Imidacloprid)', 'Regent (Fipronil)', 'Benevia'],
    recovery_days: 16,
    disease_code: 'CHL-LC-01'
  },

  // GENERAL HEALTHY
  'healthy_crop': {
    crop: 'General Crop',
    disease: 'Healthy Crop Foliage (No Disease Detected)',
    affected_part: 'Leaf',
    severity: 'Low',
    confidence: 99.2,
    symptoms: [
      'Vibrant green color with uniform cellular density',
      'No fungal spots, leaf curling, wilting, or pest damage visible',
      'Optimal leaf turgor and vigorous physiological growth'
    ],
    causes: [
      'Optimal soil nutrient management & moisture levels',
      'Effective preventive organic crop care'
    ],
    organic_treatment: [
      'Maintain regular vermicompost & organic compost top dressing',
      'Apply preventive Neem oil foliar spray (5ml/L) every 14 days',
      'Maintain proper crop spacing and soil aeration'
    ],
    chemical_treatment: [
      'No chemical pesticides required for healthy plants',
      'Foliar spray of 19-19-19 NPK liquid fertilizer (5g/L) for growth booster'
    ],
    medicines: ['Bio-NPK Liquid Consortium', 'Humic Acid 98% Concentrate'],
    recovery_days: 0,
    disease_code: 'HEALTHY-00'
  }
};

// In-Memory Storage for History
const mockDiagnosesHistory = [
  {
    id: 'diag-1001',
    farmer_name: 'Ramesh Patel',
    crop_name: 'Tomato',
    detected_disease: 'Tomato Late Blight (Phytophthora infestans)',
    confidence_score: 96.8,
    severity: 'High',
    plant_part: 'Leaf',
    image_url: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb16431?auto=format&fit=crop&w=800&q=80',
    symptoms: DISEASE_DATABASE['tomato_late_blight'].symptoms,
    causes: DISEASE_DATABASE['tomato_late_blight'].causes,
    organic_treatment: DISEASE_DATABASE['tomato_late_blight'].organic_treatment,
    chemical_treatment: DISEASE_DATABASE['tomato_late_blight'].chemical_treatment,
    medicines: DISEASE_DATABASE['tomato_late_blight'].medicines,
    recovery_days: 12,
    recovery_status: 'In Treatment',
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'diag-1002',
    farmer_name: 'Suresh Kumar',
    crop_name: 'Rice',
    detected_disease: 'Rice Blast (Magnaporthe oryzae)',
    confidence_score: 97.2,
    severity: 'Critical',
    plant_part: 'Leaf',
    image_url: 'https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&w=800&q=80',
    symptoms: DISEASE_DATABASE['rice_blast'].symptoms,
    causes: DISEASE_DATABASE['rice_blast'].causes,
    organic_treatment: DISEASE_DATABASE['rice_blast'].organic_treatment,
    chemical_treatment: DISEASE_DATABASE['rice_blast'].chemical_treatment,
    medicines: DISEASE_DATABASE['rice_blast'].medicines,
    recovery_days: 14,
    recovery_status: 'In Treatment',
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'diag-1003',
    farmer_name: 'Ramesh Patel',
    crop_name: 'Cotton',
    detected_disease: 'Cotton Leaf Curl Virus (CLCuV)',
    confidence_score: 95.8,
    severity: 'High',
    plant_part: 'Leaf',
    image_url: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&w=800&q=80',
    symptoms: DISEASE_DATABASE['cotton_leaf_curl'].symptoms,
    causes: DISEASE_DATABASE['cotton_leaf_curl'].causes,
    organic_treatment: DISEASE_DATABASE['cotton_leaf_curl'].organic_treatment,
    chemical_treatment: DISEASE_DATABASE['cotton_leaf_curl'].chemical_treatment,
    medicines: DISEASE_DATABASE['cotton_leaf_curl'].medicines,
    recovery_days: 18,
    recovery_status: 'In Treatment',
    created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
  }
];

exports.detectDisease = async (req, res, next) => {
  try {
    const { cropName = 'Tomato', plantPart = 'Leaf', voiceTranscript, imageUrl } = req.body;

    const keys = Object.keys(DISEASE_DATABASE);
    let selectedKey = null;

    // Search by cropName matching
    if (cropName) {
      const matches = keys.filter(k => DISEASE_DATABASE[k].crop.toLowerCase().includes(cropName.toLowerCase()));
      if (matches.length > 0) {
        selectedKey = matches[Math.floor(Math.random() * matches.length)];
      }
    }

    if (!selectedKey) {
      // Pick random default
      selectedKey = keys[Math.floor(Math.random() * keys.length)];
    }

    const diseaseData = DISEASE_DATABASE[selectedKey];
    
    const newRecord = {
      id: `diag-${Date.now()}`,
      farmer_name: req.user?.name || 'Ramesh Patel',
      crop_name: cropName || diseaseData.crop,
      detected_disease: diseaseData.disease,
      confidence_score: diseaseData.confidence,
      severity: diseaseData.severity,
      plant_part: plantPart,
      image_url: imageUrl || 'https://images.unsplash.com/photo-1592417817098-8f3d6eb16431?auto=format&fit=crop&w=800&q=80',
      symptoms: diseaseData.symptoms,
      causes: diseaseData.causes,
      organic_treatment: diseaseData.organic_treatment,
      chemical_treatment: diseaseData.chemical_treatment,
      medicines: diseaseData.medicines,
      recovery_days: diseaseData.recovery_days,
      voice_note_transcript: voiceTranscript || '',
      expert_verified: true,
      recovery_status: 'Detected',
      created_at: new Date().toISOString()
    };

    mockDiagnosesHistory.unshift(newRecord);

    res.status(200).json({
      success: true,
      message: 'AI Crop Disease Diagnosis Complete',
      data: newRecord
    });
  } catch (err) {
    next(err);
  }
};

exports.getHistory = async (req, res, next) => {
  try {
    const { crop, status, search } = req.query;
    let list = [...mockDiagnosesHistory];

    if (crop) {
      list = list.filter(item => item.crop_name.toLowerCase().includes(crop.toLowerCase()));
    }
    if (status) {
      list = list.filter(item => item.recovery_status.toLowerCase() === status.toLowerCase());
    }
    if (search) {
      list = list.filter(item => 
        item.detected_disease.toLowerCase().includes(search.toLowerCase()) ||
        item.crop_name.toLowerCase().includes(search.toLowerCase())
      );
    }

    res.json({
      success: true,
      count: list.length,
      data: list
    });
  } catch (err) {
    next(err);
  }
};

exports.getDiagnosisById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const item = mockDiagnosesHistory.find(d => d.id === id);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Diagnosis report not found.' });
    }
    res.json({ success: true, data: item });
  } catch (err) {
    next(err);
  }
};

exports.updateStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { recovery_status } = req.body;
    const item = mockDiagnosesHistory.find(d => d.id === id);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Diagnosis not found.' });
    }
    if (recovery_status) {
      item.recovery_status = recovery_status;
    }
    res.json({ success: true, message: 'Recovery status updated successfully.', data: item });
  } catch (err) {
    next(err);
  }
};
