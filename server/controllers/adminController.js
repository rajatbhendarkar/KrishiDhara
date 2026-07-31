// Admin Dashboard Controller for system management, logs, users & analytics

const systemLogs = [
  { id: 'log-01', action: 'USER_LOGIN', user: 'Ramesh Patel (Farmer)', timestamp: new Date(Date.now() - 600000).toISOString(), ip: '157.33.19.4' },
  { id: 'log-02', action: 'DIAGNOSIS_COMPLETED', user: 'AI Engine', timestamp: new Date(Date.now() - 1200000).toISOString(), ip: 'Internal System' },
  { id: 'log-03', action: 'EXPERT_VERIFIED', user: 'Dr. Anita Sharma (Expert)', timestamp: new Date(Date.now() - 3600000).toISOString(), ip: '115.98.2.14' },
  { id: 'log-04', action: 'NEW_SCHEME_ADDED', user: 'Admin Officer', timestamp: new Date(Date.now() - 86400000).toISOString(), ip: '103.21.12.8' }
];

const mockUsersList = [
  { id: 'u-1', name: 'Ramesh Patel', email: 'farmer@krishimitra.ai', role: 'farmer', farm_acres: 4.5, district: 'Nashik', status: 'Active' },
  { id: 'u-2', name: 'Dr. Anita Sharma', email: 'expert@krishimitra.ai', role: 'expert', organization: 'IARI Pusa', rating: 4.9, status: 'Active' },
  { id: 'u-3', name: 'Suresh Kumar', email: 'suresh@farm.org', role: 'farmer', farm_acres: 8.0, district: 'Pune', status: 'Active' },
  { id: 'u-4', name: 'Prof. V. K. Patil', email: 'patil@agri.edu', role: 'expert', organization: 'MPKV Rahuri', rating: 4.8, status: 'Active' }
];

exports.getAnalytics = async (req, res, next) => {
  try {
    const analyticsData = {
      total_users: 14850,
      total_farmers: 13920,
      total_experts: 140,
      total_diagnoses: 42390,
      healthy_plants_count: 28100,
      diseased_plants_count: 14290,
      prediction_accuracy: 97.4,
      disease_breakdown: [
        { disease: 'Late Blight', count: 4200 },
        { disease: 'Early Blight', count: 3100 },
        { disease: 'Rice Blast', count: 2800 },
        { disease: 'Yellow Rust', count: 2100 },
        { disease: 'Powdery Mildew', count: 1200 },
        { disease: 'Healthy', count: 28100 }
      ],
      monthly_trend: [
        { month: 'Jan', diagnoses: 2400 },
        { month: 'Feb', diagnoses: 3100 },
        { month: 'Mar', diagnoses: 4500 },
        { month: 'Apr', diagnoses: 5200 },
        { month: 'May', diagnoses: 6800 },
        { month: 'Jun', diagnoses: 8900 },
        { month: 'Jul', diagnoses: 11490 }
      ]
    };

    res.json({
      success: true,
      data: analyticsData
    });
  } catch (err) {
    next(err);
  }
};

exports.getUsers = async (req, res, next) => {
  try {
    const { role, search } = req.query;
    let list = [...mockUsersList];
    if (role && role !== 'All') {
      list = list.filter(u => u.role === role.toLowerCase());
    }
    if (search) {
      list = list.filter(u => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()));
    }
    res.json({ success: true, count: list.length, data: list });
  } catch (err) {
    next(err);
  }
};

exports.getSystemLogs = async (req, res, next) => {
  try {
    res.json({ success: true, count: systemLogs.length, data: systemLogs });
  } catch (err) {
    next(err);
  }
};
