import React, { useState } from 'react';
import { Shield, Users, Database, FileText, Activity, Lock, Plus, Trash2, Edit } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('analytics'); // analytics | users | diseases | logs

  const usersList = [
    { id: 'u-1', name: 'Ramesh Patel', email: 'farmer@krishimitra.ai', role: 'farmer', location: 'Nashik', status: 'Active' },
    { id: 'u-2', name: 'Dr. Anita Sharma', email: 'expert@krishimitra.ai', role: 'expert', organization: 'ICAR Pusa', status: 'Active' },
    { id: 'u-3', name: 'Admin Officer', email: 'admin@krishimitra.ai', role: 'admin', location: 'New Delhi', status: 'Active' },
    { id: 'u-4', name: 'Suresh Kumar', email: 'suresh@farm.org', role: 'farmer', location: 'Pune', status: 'Active' }
  ];

  const systemLogs = [
    { id: 'l-1', action: 'USER_LOGIN', user: 'Ramesh Patel', ip: '157.33.19.4', timestamp: '10 mins ago' },
    { id: 'l-2', action: 'DIAGNOSIS_COMPLETED', user: 'AI Vision Engine', ip: 'Internal', timestamp: '25 mins ago' },
    { id: 'l-3', action: 'EXPERT_VERIFIED', user: 'Dr. Anita Sharma', ip: '115.98.2.14', timestamp: '1 hour ago' },
    { id: 'l-4', action: 'SCHEME_BOOKMARKED', user: 'Suresh Kumar', ip: '103.21.12.8', timestamp: '3 hours ago' }
  ];

  return (
    <div className="space-y-8 pb-16">
      
      {/* Admin Banner */}
      <div className="bg-purple-50/70 dark:bg-gradient-to-r dark:from-purple-950/80 dark:via-slate-900 dark:to-slate-900 border border-purple-200 dark:border-purple-500/30 p-6 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-500/20 text-purple-700 dark:text-purple-400 flex items-center justify-center border border-purple-300 dark:border-purple-500/40">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white font-outfit">SaaS System Administration</h1>
            <p className="text-xs text-slate-600 dark:text-slate-400">Manage users, knowledge base, system security logs, and AI SaaS metrics.</p>
          </div>
        </div>

        <span className="bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300 px-3 py-1 rounded-full text-xs font-bold border border-purple-300 dark:border-purple-500/30">
          Super Admin Privileges Granted
        </span>
      </div>

      {/* ADMIN SUB-TABS */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
        {[
          { id: 'analytics', label: 'System Analytics', icon: Activity },
          { id: 'users', label: 'Manage Users & Roles', icon: Users },
          { id: 'diseases', label: 'Disease Knowledge Base', icon: Database },
          { id: 'logs', label: 'System Audit Logs', icon: Lock }
        ].map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
                activeTab === tab.id
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB CONTENT 1: ANALYTICS */}
      {activeTab === 'analytics' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl space-y-2 shadow-md">
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">Total Registered Farmers</span>
            <div className="text-3xl font-extrabold text-slate-900 dark:text-white font-outfit">13,920</div>
            <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">+8.4% month-over-month growth</p>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl space-y-2 shadow-md">
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">Verified Pathologists</span>
            <div className="text-3xl font-extrabold text-blue-600 dark:text-blue-400 font-outfit">140</div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">Average response time: 14 mins</p>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl space-y-2 shadow-md">
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">AI Diagnoses Processed</span>
            <div className="text-3xl font-extrabold text-emerald-600 dark:text-agri-400 font-outfit">42,390</div>
            <p className="text-[11px] text-purple-600 dark:text-purple-400 font-medium">98.4% Precision Rate</p>
          </div>
        </div>
      )}

      {/* TAB CONTENT 2: USERS */}
      {activeTab === 'users' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-950 text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider text-[10px] border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="p-4">User Name & Email</th>
                  <th className="p-4">Role</th>
                  <th className="p-4">Location / Org</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {usersList.map(u => (
                  <tr key={u.id} className="hover:bg-slate-50 dark:hover:bg-slate-950/50">
                    <td className="p-4">
                      <div className="font-bold text-slate-900 dark:text-white">{u.name}</div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400">{u.email}</div>
                    </td>
                    <td className="p-4">
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase ${
                        u.role === 'admin' ? 'bg-purple-100 dark:bg-purple-500/20 text-purple-700 dark:text-purple-400' : u.role === 'expert' ? 'bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400' : 'bg-emerald-100 dark:bg-agri-500/20 text-emerald-700 dark:text-agri-400'
                      }`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="p-4 text-slate-700 dark:text-slate-300">{u.location || u.organization}</td>
                    <td className="p-4"><span className="text-emerald-600 dark:text-emerald-400 font-bold">● Active</span></td>
                    <td className="p-4 text-right space-x-2">
                      <button className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"><Edit className="w-3.5 h-3.5" /></button>
                      <button className="p-1.5 rounded-lg bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-400 hover:text-rose-900 dark:hover:text-rose-200"><Trash2 className="w-3.5 h-3.5" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB CONTENT 3: SYSTEM AUDIT LOGS */}
      {activeTab === 'logs' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-4 shadow-md">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Real-Time Security & Action Audit Trail</h3>
          <div className="space-y-2 font-mono text-xs">
            {systemLogs.map(log => (
              <div key={log.id} className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-3 rounded-xl flex items-center justify-between">
                <span className="text-emerald-700 dark:text-agri-400 font-bold">[{log.action}]</span>
                <span className="text-slate-800 dark:text-slate-200">{log.user}</span>
                <span className="text-slate-500 dark:text-slate-400 text-[10px]">IP: {log.ip}</span>
                <span className="text-slate-400 dark:text-slate-500 text-[10px]">{log.timestamp}</span>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
