// Government Schemes Database & Search Controller

const SCHEMES_DATABASE = [
  {
    id: 'sch-01',
    scheme_name: 'PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)',
    category: 'Income Support',
    state: 'All India',
    crop: 'All Crops',
    benefits: 'Direct income support of ₹6,000 per year in 3 equal installments into farmer bank accounts.',
    eligibility: 'Small & Marginal Farmer families owning cultivable land up to 2 hectares.',
    application_url: 'https://pmkisan.gov.in',
    helpline: '155261 / 011-24300606',
    is_bookmarked: true
  },
  {
    id: 'sch-02',
    scheme_name: 'Pradhan Mantri Fasal Bima Yojana (PMFBY)',
    category: 'Crop Insurance',
    state: 'All India',
    crop: 'Food crops, Oilseeds, Annual Commercial crops',
    benefits: 'Comprehensive risk insurance against crop loss due to drought, pest/disease outbreak, flood.',
    eligibility: 'All farmers including sharecroppers and tenant farmers growing notified crops.',
    application_url: 'https://pmfby.gov.in',
    helpline: '1800 180 1551',
    is_bookmarked: false
  },
  {
    id: 'sch-03',
    scheme_name: 'Maharashta Crop Pest Protection Subsidy',
    category: 'Pesticide Subsidy',
    state: 'Maharashtra',
    crop: 'Cotton, Tomato, Soyabean',
    benefits: '50% subsidy on government approved organic biopesticides and Trichoderma formulations.',
    eligibility: 'Farmers in Maharashtra with registered 7/12 land extract.',
    application_url: 'https://mahadbt.maharashtra.gov.in',
    helpline: '022-49150800',
    is_bookmarked: true
  },
  {
    id: 'sch-04',
    scheme_name: 'Sub-Mission on Agricultural Mechanization (SMAM)',
    category: 'Equipment Subsidy',
    state: 'All India',
    crop: 'All Crops',
    benefits: '40% to 50% subsidy on purchase of agricultural drones, power tillers, and spray pumps.',
    eligibility: 'Individual farmers, SHGs, and Farmers Producer Organizations (FPOs).',
    application_url: 'https://agrimachinery.nic.in',
    helpline: '1800 180 1551',
    is_bookmarked: false
  },
  {
    id: 'sch-05',
    scheme_name: 'Paramparagat Krishi Vikas Yojana (PKVY)',
    category: 'Organic Farming',
    state: 'All India',
    crop: 'Organic Produce',
    benefits: 'Financial assistance of ₹50,000 per hectare for organic inputs, soil testing, and certification.',
    eligibility: 'Farmers forming clusters of 50 or more acres for certified organic farming.',
    application_url: 'https://pgsindia-ncof.gov.in',
    helpline: '0120-2465403',
    is_bookmarked: false
  }
];

exports.getSchemes = async (req, res, next) => {
  try {
    const { state, crop, category, search } = req.query;
    let list = [...SCHEMES_DATABASE];

    if (state && state !== 'All') {
      list = list.filter(s => s.state === 'All India' || s.state.toLowerCase() === state.toLowerCase());
    }
    if (crop && crop !== 'All') {
      list = list.filter(s => s.crop.includes('All') || s.crop.toLowerCase().includes(crop.toLowerCase()));
    }
    if (category && category !== 'All') {
      list = list.filter(s => s.category.toLowerCase() === category.toLowerCase());
    }
    if (search) {
      list = list.filter(s => 
        s.scheme_name.toLowerCase().includes(search.toLowerCase()) ||
        s.description?.toLowerCase().includes(search.toLowerCase())
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

exports.toggleBookmark = async (req, res, next) => {
  try {
    const { id } = req.params;
    const item = SCHEMES_DATABASE.find(s => s.id === id);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Scheme not found' });
    }
    item.is_bookmarked = !item.is_bookmarked;
    res.json({
      success: true,
      message: item.is_bookmarked ? 'Scheme bookmarked' : 'Bookmark removed',
      is_bookmarked: item.is_bookmarked
    });
  } catch (err) {
    next(err);
  }
};
