import React, { useEffect, useState } from 'react';

export const SplashScreen = ({ onFinish, duration = 1000 }) => {
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Start fading out 250ms before duration ends for a snappy 1-second total splash
    const fadeTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, Math.max(duration - 250, 100));

    // Call onFinish when full duration completes
    const finishTimer = setTimeout(() => {
      if (onFinish) onFinish();
    }, duration);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(finishTimer);
    };
  }, [duration, onFinish]);

  return (
    <div
      className={`fixed inset-0 bg-white text-slate-900 flex flex-col items-center justify-center p-6 select-none transition-opacity duration-300 ${
        isFadingOut ? 'animate-splash-fade-out' : 'animate-splash-fade-in'
      }`}
      style={{
        zIndex: 999999,
        background: 'radial-gradient(circle at center, #ffffff 0%, #f0fdf4 65%, #e6f4ea 100%)'
      }}
    >
      {/* Background Subtle Grid Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#10b981_1.5px,transparent_1.5px)] [background-size:28px_28px] opacity-15 pointer-events-none" />

      {/* Main Container */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center max-w-lg w-full">
        
        {/* Krushidhara Logo Image */}
        <div className="relative mb-6 animate-logo-entrance">
          {/* Soft Green Glow Behind Logo */}
          <div className="absolute -inset-6 bg-emerald-400/25 blur-3xl rounded-full" />
          
          <img
            src="/krushidhara.png"
            alt="Krushidhara"
            className="h-28 sm:h-36 md:h-40 w-auto object-contain relative z-10 filter drop-shadow-[0_12px_28px_rgba(16,185,129,0.25)]"
            onError={(e) => {
              e.target.src = '/krishidhara_text_logo.png';
            }}
          />
        </div>

        {/* Curved Green Animation below the Krushidhara image */}
        <div className="relative w-full max-w-[340px] sm:max-w-[420px] h-[90px] flex items-center justify-center mt-2">
          <svg
            viewBox="0 0 400 90"
            className="w-full h-full text-emerald-600 overflow-visible animate-curve-glow"
          >
            <defs>
              {/* Vibrant Green Linear Gradient for Curve */}
              <linearGradient id="emeraldCurveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#047857" stopOpacity="0.3" />
                <stop offset="25%" stopColor="#10b981" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#22c55e" stopOpacity="1" />
                <stop offset="75%" stopColor="#16a34a" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#065f46" stopOpacity="0.3" />
              </linearGradient>

              {/* Intense Glow Filter */}
              <filter id="greenGlow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Background Curve Track */}
            <path
              d="M 20 50 Q 200 5 380 50"
              fill="none"
              stroke="rgba(16, 185, 129, 0.2)"
              strokeWidth="4"
              strokeLinecap="round"
            />
            
            {/* Dynamic S-Curve Accent Wave Track */}
            <path
              d="M 30 65 Q 200 100 370 65"
              fill="none"
              stroke="rgba(34, 197, 94, 0.15)"
              strokeWidth="3"
              strokeLinecap="round"
            />

            {/* Main Animated Curved Line in Green */}
            <path
              d="M 20 50 Q 200 5 380 50"
              fill="none"
              stroke="url(#emeraldCurveGrad)"
              strokeWidth="6"
              strokeLinecap="round"
              filter="url(#greenGlow)"
              className="animate-curve-draw"
            />

            {/* Flowing Dash Overlay along the Curve */}
            <path
              d="M 20 50 Q 200 5 380 50"
              fill="none"
              stroke="#15803d"
              strokeWidth="4"
              strokeLinecap="round"
              filter="url(#greenGlow)"
              className="animate-curve-flow"
              opacity="0.85"
            />

            {/* Second Intersecting Green Curve for Depth */}
            <path
              d="M 40 60 Q 200 95 360 60"
              fill="none"
              stroke="url(#emeraldCurveGrad)"
              strokeWidth="4"
              strokeLinecap="round"
              filter="url(#greenGlow)"
              className="animate-curve-draw"
              style={{ animationDelay: '0.3s' }}
            />

            {/* Animated Pulsing Light Orb along the Curve Center */}
            <circle cx="200" cy="27" r="5" fill="#16a34a" filter="url(#greenGlow)" className="animate-ping" />
            <circle cx="200" cy="27" r="4" fill="#047857" />
          </svg>
        </div>

        {/* Loading Indicator Text */}
        <div className="mt-4 flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-ping" />
          <span className="text-xs font-bold tracking-widest text-emerald-800 uppercase font-mono">
            Logging In...
          </span>
        </div>

      </div>
    </div>
  );
};

export default SplashScreen;
