import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '../context/AppContext';

const WelcomeIllustration = () => (
  <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <circle cx="200" cy="200" r="160" fill="#f0eee4" />
    <motion.path
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 2, ease: "easeInOut" }}
      d="M100 250 Q200 100 300 250"
      stroke="var(--color-brand-accent)"
      strokeWidth="4"
      strokeLinecap="round"
    />
    <motion.rect
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5 }}
      x="140" y="180" width="120" height="150" rx="20" fill="white" stroke="var(--color-brand-accent)" strokeWidth="3"
    />
    <motion.circle
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 1, type: "spring" }}
      cx="200" cy="120" r="40" fill="white" stroke="var(--color-brand-accent)" strokeWidth="3"
    />
    <circle cx="185" cy="115" r="4" fill="var(--color-brand-accent)" />
    <circle cx="215" cy="115" r="4" fill="var(--color-brand-accent)" />
    <path d="M185 130 Q200 140 215 130" stroke="var(--color-brand-accent)" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const SecurityIllustration = () => (
  <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect x="80" y="80" width="240" height="240" rx="40" fill="#fcfcfa" />
    <motion.path
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1.5 }}
      d="M200 140 V220 M160 180 H240"
      stroke="var(--color-brand-accent)"
      strokeWidth="12"
      strokeLinecap="round"
    />
    <motion.circle
      animate={{ y: [0, -10, 0] }}
      transition={{ repeat: Infinity, duration: 2 }}
      cx="200" cy="200" r="100" stroke="var(--color-brand-accent)" strokeWidth="3" strokeDasharray="10 10"
    />
    <rect x="150" y="240" width="100" height="60" rx="10" fill="var(--color-brand-accent)" />
    <path d="M180 270 L195 285 L220 260" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const QRIllustration = () => (
  <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect x="100" y="100" width="200" height="200" rx="20" fill="white" stroke="var(--color-brand-accent)" strokeWidth="4" />
    <rect x="130" y="130" width="40" height="40" fill="var(--color-brand-accent)" />
    <rect x="230" y="130" width="40" height="40" fill="var(--color-brand-accent)" />
    <rect x="130" y="230" width="40" height="40" fill="var(--color-brand-accent)" />
    <motion.path
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
      d="M180 180 H220 V220 H180 Z"
      fill="var(--color-brand-accent)"
      opacity="0.3"
    />
    <motion.rect
      animate={{ x: [0, 200, 0] }}
      transition={{ duration: 3, repeat: Infinity }}
      x="0" y="195" width="400" height="10" fill="var(--color-brand-accent)" opacity="0.1"
    />
  </svg>
);

const LocalIllustration = () => (
  <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <motion.circle
      animate={{ scale: [1, 1.05, 1] }}
      transition={{ repeat: Infinity, duration: 4 }}
      cx="200" cy="200" r="140" fill="#f0eee4"
    />
    <path d="M120 280 H280 V320 H120 Z" fill="var(--color-brand-accent)" />
    <rect x="140" y="180" width="120" height="100" fill="white" stroke="var(--color-brand-accent)" strokeWidth="3" />
    <path d="M140 180 L200 120 L260 180 Z" fill="white" stroke="var(--color-brand-accent)" strokeWidth="3" />
    <circle cx="200" cy="220" r="20" fill="var(--color-brand-accent)" opacity="0.1" />
    <text x="200" y="228" textAnchor="middle" fill="var(--color-brand-accent)" fontSize="24" fontWeight="bold">ZiG</text>
  </svg>
);

const SLIDES = [
  { Illustration: WelcomeIllustration, titleKey: 'slideTitle1', descKey: 'slideDesc1' },
  { Illustration: SecurityIllustration, titleKey: 'slideTitle2', descKey: 'slideDesc2' },
  { Illustration: QRIllustration, titleKey: 'slideTitle3', descKey: 'slideDesc3' },
  { Illustration: LocalIllustration, titleKey: 'slideTitle4', descKey: 'slideDesc4' },
];

const Onboarding = () => {
  const { setOnboarded, t, setCurrentTab } = useAppContext();
  const [idx, setIdx] = useState(0);
  const { Illustration, titleKey, descKey } = SLIDES[idx];
  const isLast = idx === SLIDES.length - 1;

  const handleFinish = () => {
    setOnboarded(true);
    // Navigate to role selection or login
    setCurrentTab('roleSelection');
  };

  const next = () => isLast ? handleFinish() : setIdx(i => i + 1);

  return (
    <div className="fixed inset-0 z-[100] bg-[var(--color-brand-bg)] flex flex-col overflow-hidden">
      {/* Skip Button */}
      <div className="flex justify-end px-8 pt-12">
        {!isLast && (
          <button
            onClick={handleFinish}
            className="text-[var(--color-brand-text-muted)] font-bold text-sm tracking-widest uppercase hover:text-[var(--color-brand-accent)] transition-colors"
          >
            {t('skip')}
          </button>
        )}
      </div>

      {/* Illustration Area */}
      <div className="flex-1 flex items-center justify-center px-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", damping: 20, stiffness: 100 }}
            className="w-full max-w-[320px] aspect-square"
          >
            <Illustration />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Content Area */}
      <div className="bg-white rounded-t-[3rem] px-8 pb-12 pt-10 shadow-[0_-20px_40px_rgba(0,0,0,0.03)] flex flex-col items-center text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={idx + 'content'}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "circOut" }}
            className="min-h-[140px]"
          >
            <h2 className="text-3xl font-serif font-bold text-[var(--color-brand-text)] mb-4 leading-tight italic">
              {t(titleKey)}
            </h2>
            <p className="text-[var(--color-brand-text-muted)] text-base leading-relaxed max-w-[280px] mx-auto">
              {t(descKey)}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Progress Indicators */}
        <div className="flex space-x-3 my-10">
          {SLIDES.map((_, i) => (
            <motion.div
              key={i}
              animate={{
                width: i === idx ? 32 : 8,
                backgroundColor: i === idx ? 'var(--color-brand-accent)' : '#e2e0d8'
              }}
              className="h-2 rounded-full transition-all duration-300"
            />
          ))}
        </div>

        {/* Action Button */}
        <button
          onClick={next}
          className="w-full max-w-[300px] bg-[var(--color-brand-accent)] text-white py-5 rounded-[2rem] font-bold text-lg shadow-xl hover:shadow-2xl active:scale-[0.98] transition-all flex items-center justify-center space-x-2"
        >
          <span>{isLast ? t('getStarted') : t('next')}</span>
          {!isLast && (
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              →
            </motion.span>
          )}
        </button>
      </div>
    </div>
  );
};

export default Onboarding;



