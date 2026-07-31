import React, { useState } from 'react';
import { UserCheck, CheckCircle2, MessageSquare, Video, FileText, Send, Shield, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const ExpertPanel = () => {
  const { user } = useAuth();
  const [selectedReport, setSelectedReport] = useState(null);
  const [expertNote, setExpertNote] = useState('');
  const [recommendedMed, setRecommendedMed] = useState('');
  const [videoCallActive, setVideoCallActive] = useState(false);

  const [pendingReports, setPendingReports] = useState([
    {
      id: 'diag-1001',
      farmer_name: 'Ramesh Patel',
      phone: '+91 98765 43210',
      crop_name: 'Tomato',
      detected_disease: 'Tomato Late Blight',
      confidence: '96.8%',
      severity: 'High',
      img: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb16431?auto=format&fit=crop&w=400&q=80',
      verified: false
    },
    {
      id: 'diag-1002',
      farmer_name: 'Suresh Kumar',
      phone: '+91 98112 23344',
      crop_name: 'Rice',
      detected_disease: 'Rice Blast',
      confidence: '97.2%',
      severity: 'Critical',
      img: 'https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&w=400&q=80',
      verified: false
    }
  ]);

  const handleApprove = (id) => {
    setPendingReports(prev => prev.map(r => r.id === id ? { ...r, verified: true } : r));
    setSelectedReport(null);
    setExpertNote('');
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* Title */}
      <div className="bg-blue-50/70 dark:bg-gradient-to-r dark:from-blue-950/60 dark:via-slate-900 dark:to-slate-900 border border-blue-200 dark:border-blue-500/30 p-6 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-4 shadow-md">
        <div>
          <span className="text-xs font-semibold text-blue-700 dark:text-blue-400 uppercase tracking-wider">Expert Advisory Portal</span>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white font-outfit">
            Welcome, Dr. Anita Sharma (Senior Pathologist)
          </h1>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">Indian Council of Agricultural Research (ICAR) Verified Expert</p>
        </div>

        <div className="flex items-center gap-2 bg-blue-100 dark:bg-blue-500/10 border border-blue-300 dark:border-blue-500/30 px-3 py-1.5 rounded-full text-blue-700 dark:text-blue-400 text-xs font-bold">
          <UserCheck className="w-4 h-4" />
          <span>Active Expert Session</span>
        </div>
      </div>

      {/* 2-COLUMN VIEW: PENDING QUEUE & REPORT REVIEW */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Pending Reports */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl space-y-4 shadow-md">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center justify-between">
              <span>Pending Farmer Diagnoses</span>
              <span className="text-xs bg-emerald-50 dark:bg-agri-950 text-emerald-700 dark:text-agri-400 px-2.5 py-0.5 rounded-full font-bold border border-emerald-200 dark:border-agri-500/30">
                {pendingReports.filter(r => !r.verified).length} Pending
              </span>
            </h3>

            <div className="space-y-3">
              {pendingReports.map(report => (
                <div
                  key={report.id}
                  onClick={() => setSelectedReport(report)}
                  className={`p-4 rounded-2xl border transition cursor-pointer flex items-center justify-between gap-3 ${
                    selectedReport?.id === report.id
                      ? 'bg-blue-50 dark:bg-blue-950/60 border-blue-300 dark:border-blue-500/50 shadow-md'
                      : report.verified
                      ? 'bg-slate-50 dark:bg-slate-950/40 border-slate-200 dark:border-slate-800 opacity-60'
                      : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img src={report.img} alt={report.crop_name} className="w-12 h-12 rounded-xl object-cover" />
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white">{report.detected_disease}</h4>
                      <p className="text-[11px] text-slate-600 dark:text-slate-400">Farmer: {report.farmer_name} • {report.crop_name}</p>
                    </div>
                  </div>

                  {report.verified ? (
                    <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Approved
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold text-amber-700 dark:text-amber-400 bg-amber-100 dark:bg-amber-500/10 px-2 py-0.5 rounded border border-amber-300 dark:border-amber-500/30">
                      Review Needed
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Detailed Review & Tele-Consultation */}
        <div className="lg:col-span-7 space-y-6">
          {selectedReport ? (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl space-y-6 shadow-xl">
              
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">Diagnosis Review: {selectedReport.detected_disease}</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400">Farmer Name: {selectedReport.farmer_name} ({selectedReport.phone})</p>
                </div>

                <button
                  onClick={() => setVideoCallActive(!videoCallActive)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow transition"
                >
                  <Video className="w-4 h-4" />
                  <span>{videoCallActive ? 'End Call' : 'Start Video Call'}</span>
                </button>
              </div>

              {/* Video Call Simulator */}
              {videoCallActive && (
                <div className="relative w-full h-64 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-blue-300 dark:border-blue-500/40 overflow-hidden flex flex-col items-center justify-center p-4 space-y-3">
                  <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-500/20 border border-blue-300 dark:border-blue-400 flex items-center justify-center text-blue-600 dark:text-blue-400 animate-pulse">
                    <Video className="w-8 h-8" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">Live HD Video Tele-Consultation Active</h4>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400">Connected with Ramesh Patel (Farmer Camera Stream)</p>
                </div>
              )}

              {/* Recommendation Form */}
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">Expert Pathology Notes & Observation</label>
                  <textarea
                    rows={3}
                    value={expertNote}
                    onChange={(e) => setExpertNote(e.target.value)}
                    placeholder="Enter custom pathology advice or modified treatment steps..."
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">Recommended Specific Chemical / Fungicide Brand</label>
                  <input
                    type="text"
                    value={recommendedMed}
                    onChange={(e) => setRecommendedMed(e.target.value)}
                    placeholder="e.g. Ridomil Gold @ 2g/L water + Neem Oil 5ml/L"
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => handleApprove(selectedReport.id)}
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-agri-500 to-emerald-600 text-white font-bold text-xs shadow-lg hover:brightness-110 flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Approve & Send to Farmer</span>
                </button>
              </div>

            </div>
          ) : (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-12 rounded-3xl text-center space-y-3 shadow-md">
              <UserCheck className="w-12 h-12 text-slate-400 dark:text-slate-600 mx-auto" />
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">Select a farmer report from the queue</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400">Review symptoms, edit medicine dosages, or start 1-on-1 video call consultation.</p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
