import React, { useState } from 'react';
import { Sprout, LogIn, Lock, Mail, KeyRound, CheckCircle2, Send, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { apiFetch } from '../utils/api';

export const Login = ({ setActiveTab, onLoginSuccess }) => {
  const { login } = useAuth();
  const [loginMethod, setLoginMethod] = useState('otp'); // 'otp' | 'password' | 'forgot'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('farmer');

  // OTP state
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  // Forgot Password state
  const [forgotStep, setForgotStep] = useState(1); // 1: send OTP, 2: verify OTP & reset password
  const [resetOtp, setResetOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const handleFinishLogin = (targetTab = 'landing') => {
    if (onLoginSuccess) {
      onLoginSuccess(targetTab);
    } else {
      setActiveTab(targetTab);
    }
  };

  const handleSendOTP = async (e) => {
    e.preventDefault();
    if (!email) {
      setErrorMsg('Please enter your email address.');
      return;
    }
    const cleanEmail = email.trim().toLowerCase();
    setIsLoading(true);
    setErrorMsg(null);
    setStatusMsg(null);

    const res = await apiFetch('/auth/send-otp', {
      method: 'POST',
      body: JSON.stringify({ email: cleanEmail })
    });

    setIsLoading(false);
    if (res && res.success) {
      setOtpSent(true);
      if (res.simulated || res.otp_preview) {
        setStatusMsg(`⚠️ Server Demo Mode: OTP code generated. (Demo OTP Code: ${res.otp_preview})`);
      } else {
        setStatusMsg(`📧 Real OTP verification code sent to ${cleanEmail}! Please check your Gmail inbox and Spam folder.`);
      }
    } else if (res && res.offline) {
      setErrorMsg('⚠️ Unable to connect to backend server. Please make sure the backend server (port 5000) is running to send real OTP emails.');
    } else {
      setErrorMsg(res?.message || 'Failed to send OTP email. Please try again.');
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
    
    const userEmailStr = (res?.user?.email || cleanEmail).toLowerCase();
    let cachedProfile = null;
    if (userEmailStr) {
      const saved = localStorage.getItem(`km_user_profile_${userEmailStr}`);
      if (saved) {
        try { cachedProfile = JSON.parse(saved); } catch (e) {}
      }
    }

    const userData = {
      ...(res?.user || {
        id: `usr-${Date.now()}`,
        name: cleanEmail.split('@')[0].toUpperCase(),
        email: cleanEmail,
        role: 'farmer'
      }),
      ...cachedProfile
    };

    login(userData, res?.token || 'mock-jwt-token-2026');
    handleFinishLogin('landing');
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg('Email address and password are required.');
      return;
    }
    const cleanEmail = email.trim().toLowerCase();

    setIsLoading(true);
    setErrorMsg(null);

    const res = await apiFetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email: cleanEmail, password })
    });

    setIsLoading(false);

    if (res && res.success && res.user) {
      const userEmailStr = (res.user.email || cleanEmail).toLowerCase();
      let cachedProfile = null;
      if (userEmailStr) {
        const saved = localStorage.getItem(`km_user_profile_${userEmailStr}`);
        if (saved) {
          try { cachedProfile = JSON.parse(saved); } catch (e) {}
        }
      }

      login({ ...res.user, ...cachedProfile }, res.token);
      handleFinishLogin('landing');
    } else if (res && res.offline) {
      // Offline fallback
      const userEmailStr = cleanEmail;
      let cachedProfile = null;
      if (userEmailStr) {
        const saved = localStorage.getItem(`km_user_profile_${userEmailStr}`);
        if (saved) {
          try { cachedProfile = JSON.parse(saved); } catch (e) {}
        }
      }
      login({ id: `usr-${Date.now()}`, name: cleanEmail.split('@')[0].toUpperCase(), email: cleanEmail, role, ...cachedProfile }, 'mock-jwt-token-2026');
      handleFinishLogin('landing');
    } else {
      setErrorMsg(res?.message || 'Incorrect password or email. Please check your credentials.');
    }
  };

  const handleForgotSendOTP = async (e) => {
    e.preventDefault();
    if (!email) {
      setErrorMsg('Please enter your Gmail address.');
      return;
    }
    const cleanEmail = email.trim().toLowerCase();
    setIsLoading(true);
    setErrorMsg(null);
    setStatusMsg(null);

    const res = await apiFetch('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email: cleanEmail })
    });

    setIsLoading(false);
    if (res && res.success) {
      setForgotStep(2);
      if (res.simulated || res.otp_preview) {
        setStatusMsg(`⚠️ Demo Mode: Password reset OTP generated. (Demo OTP Code: ${res.otp_preview})`);
      } else {
        setStatusMsg(`📧 Password reset OTP sent to ${cleanEmail}! Please check your Gmail inbox and Spam folder.`);
      }
    } else if (res && res.offline) {
      setErrorMsg('⚠️ Unable to connect to backend server. Please make sure the backend server (port 5000) is running.');
    } else {
      setErrorMsg(res?.message || 'Failed to send password reset OTP. Please try again.');
    }
  };

  const handleForgotResetPassword = async (e) => {
    e.preventDefault();
    if (!resetOtp) {
      setErrorMsg('Please enter the 6-digit OTP code.');
      return;
    }
    if (!newPassword || newPassword.length < 6) {
      setErrorMsg('New password must be at least 6 characters long.');
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setErrorMsg('Passwords do not match. Please check your password inputs.');
      return;
    }

    const cleanEmail = email.trim().toLowerCase();
    setIsLoading(true);
    setErrorMsg(null);

    const res = await apiFetch('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({
        email: cleanEmail,
        otp: resetOtp,
        newPassword
      })
    });

    setIsLoading(false);

    if (res && res.success) {
      setLoginMethod('password');
      setPassword('');
      setResetOtp('');
      setNewPassword('');
      setConfirmNewPassword('');
      setForgotStep(1);
      setErrorMsg(null);
      setStatusMsg('✅ Password has been reset successfully! Please sign in below with your new password.');
    } else {
      setErrorMsg(res?.message || 'Failed to reset password. Please check your OTP code.');
    }
  };

  const inputCls = "w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-400";

  return (
    <div className="max-w-md mx-auto py-6 sm:py-12 px-3 sm:px-4">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl sm:rounded-3xl p-5 sm:p-8 space-y-5 sm:space-y-6 shadow-xl">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500 flex items-center justify-center mx-auto text-white shadow-md">
            <Sprout className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Welcome to KrishiMitra AI</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">Sign in with Gmail OTP or password to access farmer services</p>
        </div>

        {/* Login Method Tabs */}
        <div className="flex bg-slate-100 dark:bg-slate-950 p-1 rounded-2xl border border-slate-200 dark:border-slate-800">
          <button
            type="button"
            onClick={() => { setLoginMethod('otp'); setErrorMsg(null); setStatusMsg(null); }}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition flex items-center justify-center gap-1.5 ${
              loginMethod === 'otp'
                ? 'bg-emerald-500 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <KeyRound className="w-3.5 h-3.5" />
            <span>Gmail OTP Login</span>
          </button>
          <button
            type="button"
            onClick={() => { setLoginMethod('password'); setErrorMsg(null); setStatusMsg(null); }}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition flex items-center justify-center gap-1.5 ${
              loginMethod === 'password' || loginMethod === 'forgot'
                ? 'bg-emerald-500 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Password Login</span>
          </button>
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

        {/* GMAIL OTP LOGIN FORM */}
        {loginMethod === 'otp' && (
          !otpSent ? (
            <form onSubmit={handleSendOTP} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">Gmail Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="yourname@gmail.com"
                    className={inputCls}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{isLoading ? 'Sending Gmail OTP...' : 'Send OTP to Gmail'}</span>
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOTP} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">Enter 6-Digit OTP</label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                  <input
                    type="text"
                    maxLength={6}
                    required
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="123456"
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-base font-mono tracking-widest text-slate-900 dark:text-white focus:outline-none focus:border-emerald-400"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>{isLoading ? 'Verifying OTP...' : 'Verify Gmail OTP & Sign In'}</span>
              </button>

              <button
                type="button"
                onClick={() => setOtpSent(false)}
                className="w-full text-center text-xs text-slate-500 hover:underline"
              >
                ← Change Email or Resend OTP
              </button>
            </form>
          )
        )}

        {/* PASSWORD LOGIN FORM */}
        {loginMethod === 'password' && (
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="farmer@krishimitra.ai"
                  className={inputCls}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Password</label>
                <button
                  type="button"
                  onClick={() => {
                    setLoginMethod('forgot');
                    setForgotStep(1);
                    setErrorMsg(null);
                    setStatusMsg(null);
                  }}
                  className="text-xs text-emerald-600 dark:text-emerald-400 font-bold hover:underline"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className={inputCls}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <LogIn className="w-4 h-4" />
              <span>{isLoading ? 'Signing in...' : 'Sign In with Password'}</span>
            </button>
          </form>
        )}

        {/* FORGOT PASSWORD FORM */}
        {loginMethod === 'forgot' && (
          <div className="space-y-4">
            <div className="text-center">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Reset Password via Gmail OTP</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {forgotStep === 1 
                  ? 'Enter your registered Gmail to receive a password reset OTP' 
                  : 'Enter 6-digit OTP sent to your email & create your new password'}
              </p>
            </div>

            {forgotStep === 1 ? (
              <form onSubmit={handleForgotSendOTP} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">Gmail Address</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="yourname@gmail.com"
                      className={inputCls}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{isLoading ? 'Sending Reset OTP...' : 'Send Reset OTP to Gmail'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => { setLoginMethod('password'); setErrorMsg(null); setStatusMsg(null); }}
                  className="w-full text-center text-xs text-slate-500 hover:underline"
                >
                  ← Back to Password Login
                </button>
              </form>
            ) : (
              <form onSubmit={handleForgotResetPassword} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">Enter 6-Digit Gmail OTP</label>
                  <div className="relative">
                    <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                    <input
                      type="text"
                      maxLength={6}
                      required
                      value={resetOtp}
                      onChange={(e) => setResetOtp(e.target.value)}
                      placeholder="123456"
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-base font-mono tracking-widest text-slate-900 dark:text-white focus:outline-none focus:border-emerald-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">New Password (Min 6 chars)</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="password"
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="••••••••"
                      className={inputCls}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">Confirm New Password</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="password"
                      required
                      value={confirmNewPassword}
                      onChange={(e) => setConfirmNewPassword(e.target.value)}
                      placeholder="••••••••"
                      className={inputCls}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>{isLoading ? 'Resetting Password...' : 'Reset Password & Sign In'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => { setForgotStep(1); setErrorMsg(null); setStatusMsg(null); }}
                  className="w-full text-center text-xs text-slate-500 hover:underline"
                >
                  ← Resend OTP or Change Email
                </button>
              </form>
            )}
          </div>
        )}

        {/* Footer Registration Link */}
        <p className="text-center text-xs text-slate-500 dark:text-slate-400">
          Don't have an account?{' '}
          <button
            onClick={() => setActiveTab('register')}
            className="text-emerald-600 font-semibold hover:underline"
          >
            Register Farmer Account
          </button>
        </p>

      </div>
    </div>
  );
};

export default Login;
