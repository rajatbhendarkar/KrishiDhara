// Agricultural Expert Panel Controller

const pendingDiagnoses = [
  {
    id: 'diag-1001',
    farmer_name: 'Ramesh Patel',
    phone: '+91 9876543210',
    crop_name: 'Tomato',
    detected_disease: 'Tomato Late Blight (Phytophthora infestans)',
    confidence_score: 96.8,
    severity: 'High',
    image_url: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb16431?auto=format&fit=crop&w=800&q=80',
    expert_verified: false,
    created_at: new Date(Date.now() - 3600000 * 4).toISOString()
  },
  {
    id: 'diag-1002',
    farmer_name: 'Suresh Kumar',
    phone: '+91 9811223344',
    crop_name: 'Rice',
    detected_disease: 'Rice Blast (Magnaporthe oryzae)',
    confidence_score: 97.2,
    severity: 'Critical',
    image_url: 'https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&w=800&q=80',
    expert_verified: false,
    created_at: new Date(Date.now() - 3600000 * 12).toISOString()
  }
];

exports.getPendingReports = async (req, res, next) => {
  try {
    res.json({
      success: true,
      count: pendingDiagnoses.length,
      data: pendingDiagnoses
    });
  } catch (err) {
    next(err);
  }
};

exports.verifyReport = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { expertNotes, recommendedMedicine, isApproved = true } = req.body;

    const report = pendingDiagnoses.find(r => r.id === id);
    if (report) {
      report.expert_verified = isApproved;
      report.expert_notes = expertNotes || 'Approved by senior plant pathologist.';
      report.recommended_medicine = recommendedMedicine;
    }

    res.json({
      success: true,
      message: 'Diagnosis report verified and recommendations sent to farmer.',
      report
    });
  } catch (err) {
    next(err);
  }
};
