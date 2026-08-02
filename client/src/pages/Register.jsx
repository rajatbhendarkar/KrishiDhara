import React, { useState } from 'react';
import { Sprout, UserPlus, CheckCircle2, Send, ShieldCheck, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { apiFetch } from '../utils/api';

export const Register = ({ setActiveTab, onLoginSuccess }) => {
  const { login } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [registeredUserToken, setRegisteredUserToken] = useState(null);
  const [registeredUserData, setRegisteredUserData] = useState(null);

  const handleFinishLogin = (targetTab = 'landing') => {
    if (onLoginSuccess) {
      onLoginSuccess(targetTab);
    } else {
      setActiveTab(targetTab);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setErrorMsg('Full name, Gmail address, and password are required.');
      return;
    }

    if (password.length < 6) {
      setErrorMsg('Password must be at least 6 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match. Please check your password inputs.');
      return;
    }

    const cleanEmail = email.trim().toLowerCase();
    setIsLoading(true);
    setErrorMsg(null);
    setStatusMsg(null);

    const res = await apiFetch('/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        name,
        email: cleanEmail,
        password,
        phone,
        role: 'farmer',
        language: 'hi'
      })
    });

    setIsLoading(false);

    if (res && res.success) {
      setOtpSent(true);
      setRegisteredUserToken(res?.token || 'mock-jwt-token-2026');
      setRegisteredUserData(res?.user || { name, email: cleanEmail, phone, role: 'farmer' });

      if (res.simulated || res.otp_preview) {
        setStatusMsg(`⚠️ Server Demo Mode: Verification code generated. (Demo OTP Code: ${res.otp_preview})`);
      } else {
        setStatusMsg(`📧 Real OTP verification code sent to ${cleanEmail}! Please check your Gmail inbox and Spam folder.`);
      }
    } else if (res && res.offline) {
      setErrorMsg('⚠️ Unable to connect to backend server. Please make sure the backend server (port 5000) is running to send real OTP emails.');
    } else {
      setErrorMsg(res?.message || 'Registration failed. Please check your input details.');
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    if (!otp) {
      setErrorMsg('Please enter the 6-digit OTP code.');
      return;
    }
    const cleanEmail = email.trim().toLowerCase();
    setIsLoading(true);
    setErrorMsg(null);

    const res = await apiFetch('/auth/verify-otp', {
      method: 'POST',
      body: JSON.stringify({ email: cleanEmail, otp })
    });

    setIsLoading(false);
    
    const userToSave = res?.user || registeredUserData || {
      id: `usr-${Date.now()}`,
      name,
      email,
      phone,
      role: 'farmer'
    };

    login(userToSave, res?.token || registeredUserToken || 'mock-jwt-token-2026');
    handleFinishLogin('landing');
  };

  const inputCls = "w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-400";

  return (
    <div className="max-w-md mx-auto py-6 sm:py-12 px-3 sm:px-4">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl sm:rounded-3xl p-5 sm:p-8 space-y-5 sm:space-y-6 shadow-xl">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500 flex items-center justify-center mx-auto text-white shadow-md">
            <Sprout className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Register Farmer Account</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">Create your account with password & Gmail verification</p>
        </div>

        {/* Status Alerts */}
        {statusMsg && (
          <div className="bg-emerald-50 dark:bg-emerald-950/60 p-3 rounded-2xl border border-emerald-200 dark:border-emerald-700 text-xs text-emerald-800 dark:text-emerald-300">
            {statusMsg}
          </div>
        )}
        {errorMsg && (
          <div className="bg-rose-50 dark:bg-rose-950/60 p-3 rounded-2xl border border-rose-200 dark:border-rose-700 text-xs text-rose-800 dark:text-rose-300">
            {errorMsg}
          </div>
        )}

        {/* FORM STEP 1: Registration with Password Creation */}
        {!otpSent ? (
          <form onSubmit={handleRegisterSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className={inputCls}
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">Gmail Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="yourname@gmail.com"
                className={inputCls}
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">Mobile Phone Number</label>
              <input
                type="text"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className={inputCls}
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">Create Password (Min 6 chars)</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-400"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">Confirm Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-400"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <UserPlus className="w-4 h-4" />
              <span>{isLoading ? 'Creating Account...' : 'Create Account & Send Gmail OTP'}</span>
            </button>
          </form>
        ) : (
          /* FORM STEP 2: OTP Verification */
          <form onSubmit={handleVerifyOTP} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">Enter 6-Digit Gmail OTP</label>
              <input
                type="text"
                maxLength={6}
                required
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="123456"
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2.5 text-lg font-mono tracking-widest text-center text-slate-900 dark:text-white focus:outline-none focus:border-emerald-400"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{isLoading ? 'Verifying OTP...' : 'Verify OTP & Log In to Dashboard'}</span>
            </button>
          </form>
        )}

        <p className="text-center text-xs text-slate-500 dark:text-slate-400">
          Already have an account?{' '}
          <button
            onClick={() => setActiveTab('login')}
            className="text-emerald-600 font-semibold hover:underline"
          >
            Sign In
          </button>
        </p>

      </div>
    </div>
  );
};

export default Register;
