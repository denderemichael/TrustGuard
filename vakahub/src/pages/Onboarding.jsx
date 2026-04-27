import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '../context/AppContext';

const S1 = () => (
  <svg viewBox="0 0 300 260" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <ellipse cx="150" cy="210" rx="68" ry="16" stroke="#2c3b29" strokeWidth="2" fill="#f5f5f0"/>
    <path d="M94 155 Q94 210 150 210 Q206 210 206 155" stroke="#2c3b29" strokeWidth="2.5" fill="none"/>
    <path d="M107 115 Q150 88 193 115" stroke="#2c3b29" strokeWidth="2.5" fill="none"/>
    <line x1="107" y1="155" x2="107" y2="115" stroke="#2c3b29" strokeWidth="2.5"/>
    <line x1="193" y1="155" x2="193" y2="115" stroke="#2c3b29" strokeWidth="2.5"/>
    <line x1="130" y1="157" x2="128" y2="208" stroke="#2c3b29" strokeWidth="1.5" opacity="0.4"/>
    <line x1="150" y1="155" x2="150" y2="210" stroke="#2c3b29" strokeWidth="1.5" opacity="0.4"/>
    <line x1="170" y1="157" x2="172" y2="208" stroke="#2c3b29" strokeWidth="1.5" opacity="0.4"/>
    <line x1="98" y1="178" x2="202" y2="178" stroke="#2c3b29" strokeWidth="1.5" opacity="0.4"/>
    <circle cx="150" cy="58" r="26" stroke="#2c3b29" strokeWidth="2.5" fill="white"/>
    <circle cx="143" cy="57" r="3" fill="#2c3b29"/>
    <circle cx="157" cy="57" r="3" fill="#2c3b29"/>
    <path d="M143 68 Q150 74 157 68" stroke="#2c3b29" strokeWidth="2" fill="none"/>
    <rect x="52" y="72" width="54" height="50" rx="8" stroke="#2c3b29" strokeWidth="2" fill="white" transform="rotate(-14 79 97)"/>
    <rect x="56" y="76" width="46" height="30" rx="4" fill="#2c3b29" opacity="0.07" transform="rotate(-14 79 91)"/>
    <circle cx="220" cy="72" r="10" fill="#2c3b29"/>
    <line x1="215" y1="72" x2="225" y2="72" stroke="white" strokeWidth="2"/>
    <line x1="220" y1="67" x2="220" y2="77" stroke="white" strokeWidth="2"/>
    <rect x="196" y="58" width="52" height="48" rx="8" stroke="#2c3b29" strokeWidth="2" fill="white" transform="rotate(12 222 82)"/>
    <rect x="200" y="62" width="44" height="28" rx="4" fill="#2c3b29" opacity="0.07" transform="rotate(12 222 76)"/>
    <circle cx="80" cy="76" r="10" fill="#2c3b29"/>
    <line x1="75" y1="76" x2="85" y2="76" stroke="white" strokeWidth="2"/>
    <line x1="80" y1="71" x2="80" y2="81" stroke="white" strokeWidth="2"/>
  </svg>
);

const S2 = () => (
  <svg viewBox="0 0 300 260" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect x="110" y="35" width="80" height="150" rx="14" stroke="#2c3b29" strokeWidth="2.5" fill="white"/>
    <rect x="115" y="48" width="70" height="100" rx="4" fill="#f5f5f0"/>
    <circle cx="150" cy="173" r="6" stroke="#2c3b29" strokeWidth="2"/>
    <path d="M130 53 L170 53 L170 143 L162 139 L150 144 L138 139 L130 143Z" fill="white" stroke="#2c3b29" strokeWidth="1.5"/>
    <line x1="138" y1="70" x2="162" y2="70" stroke="#2c3b29" strokeWidth="1.5" opacity="0.5"/>
    <line x1="138" y1="82" x2="162" y2="82" stroke="#2c3b29" strokeWidth="1.5" opacity="0.5"/>
    <line x1="138" y1="94" x2="155" y2="94" stroke="#2c3b29" strokeWidth="1.5" opacity="0.5"/>
    <line x1="138" y1="106" x2="162" y2="106" stroke="#2c3b29" strokeWidth="1.5" opacity="0.5"/>
    <line x1="138" y1="118" x2="158" y2="118" stroke="#2c3b29" strokeWidth="1.5" opacity="0.5"/>
    <rect x="42" y="78" width="82" height="50" rx="10" stroke="#2c3b29" strokeWidth="2" fill="white" transform="rotate(-10 83 103)"/>
    <rect x="46" y="82" width="82" height="14" fill="#2c3b29" opacity="0.12" transform="rotate(-10 87 89)"/>
    <circle cx="240" cy="180" r="22" stroke="#2c3b29" strokeWidth="2.5" fill="white"/>
    <text x="240" y="187" textAnchor="middle" fontSize="18" fill="#2c3b29" fontFamily="serif" fontWeight="bold">$</text>
    <circle cx="62" cy="190" r="15" stroke="#2c3b29" strokeWidth="2" fill="white"/>
    <text x="62" y="196" textAnchor="middle" fontSize="13" fill="#2c3b29" fontFamily="serif" fontWeight="bold">$</text>
  </svg>
);

const S3 = () => (
  <svg viewBox="0 0 300 260" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect x="80" y="55" width="130" height="130" rx="10" stroke="#2c3b29" strokeWidth="2.5" fill="white"/>
    <rect x="94" y="69" width="36" height="36" rx="4" stroke="#2c3b29" strokeWidth="2" fill="none"/>
    <rect x="100" y="75" width="24" height="24" rx="2" fill="#2c3b29" opacity="0.18"/>
    <rect x="106" y="81" width="12" height="12" fill="#2c3b29"/>
    <rect x="160" y="69" width="36" height="36" rx="4" stroke="#2c3b29" strokeWidth="2" fill="none"/>
    <rect x="166" y="75" width="24" height="24" rx="2" fill="#2c3b29" opacity="0.18"/>
    <rect x="172" y="81" width="12" height="12" fill="#2c3b29"/>
    <rect x="94" y="135" width="36" height="36" rx="4" stroke="#2c3b29" strokeWidth="2" fill="none"/>
    <rect x="100" y="141" width="24" height="24" rx="2" fill="#2c3b29" opacity="0.18"/>
    <rect x="106" y="147" width="12" height="12" fill="#2c3b29"/>
    <rect x="162" y="135" width="6" height="6" fill="#2c3b29"/>
    <rect x="172" y="135" width="6" height="6" fill="#2c3b29"/>
    <rect x="182" y="135" width="6" height="6" fill="#2c3b29"/>
    <rect x="162" y="145" width="6" height="6" fill="#2c3b29"/>
    <rect x="182" y="145" width="6" height="6" fill="#2c3b29"/>
    <rect x="162" y="155" width="6" height="6" fill="#2c3b29"/>
    <rect x="172" y="155" width="6" height="6" fill="#2c3b29"/>
    <rect x="182" y="155" width="6" height="6" fill="#2c3b29"/>
    <line x1="68" y1="120" x2="210" y2="120" stroke="#2c3b29" strokeWidth="2" strokeDasharray="5 4" opacity="0.35"/>
    <circle cx="240" cy="200" r="30" fill="#2c3b29"/>
    <path d="M227 200 L236 210 L254 190" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const S4 = () => (
  <svg viewBox="0 0 300 260" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect x="80" y="95" width="110" height="105" rx="8" stroke="#2c3b29" strokeWidth="2.5" fill="#f5f5f0"/>
    <line x1="135" y1="95" x2="135" y2="200" stroke="#2c3b29" strokeWidth="2"/>
    <line x1="80" y1="125" x2="190" y2="125" stroke="#2c3b29" strokeWidth="2"/>
    <rect x="96" y="140" width="60" height="34" rx="4" fill="white" stroke="#2c3b29" strokeWidth="1.5"/>
    <line x1="104" y1="152" x2="148" y2="152" stroke="#2c3b29" strokeWidth="1.5" opacity="0.4"/>
    <line x1="104" y1="162" x2="140" y2="162" stroke="#2c3b29" strokeWidth="1.5" opacity="0.4"/>
    <circle cx="220" cy="70" r="25" stroke="#2c3b29" strokeWidth="2.5" fill="white"/>
    <circle cx="213" cy="68" r="2.5" fill="#2c3b29"/>
    <circle cx="225" cy="68" r="2.5" fill="#2c3b29"/>
    <path d="M213 78 Q219 84 225 78" stroke="#2c3b29" strokeWidth="2" fill="none"/>
    <path d="M196 95 L196 120 L206 134" stroke="#2c3b29" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M242 95 L242 120 L206 134" stroke="#2c3b29" strokeWidth="2.5" strokeLinecap="round"/>
    <circle cx="250" cy="125" r="20" fill="#2c3b29"/>
    <path d="M241 125 L247 132 L260 118" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="52" cy="218" r="5" fill="#2c3b29" opacity="0.2"/>
    <circle cx="70" cy="228" r="3" fill="#2c3b29" opacity="0.2"/>
    <circle cx="255" cy="223" r="4" fill="#2c3b29" opacity="0.2"/>
  </svg>
);

const SLIDES = [
  { Illustration: S1, titleKey: 'slideTitle1', descKey: 'slideDesc1' },
  { Illustration: S2, titleKey: 'slideTitle2', descKey: 'slideDesc2' },
  { Illustration: S3, titleKey: 'slideTitle3', descKey: 'slideDesc3' },
  { Illustration: S4, titleKey: 'slideTitle4', descKey: 'slideDesc4' },
];

const Onboarding = () => {
  const { setOnboarded, t } = useAppContext();
  const [idx, setIdx] = useState(0);
  const { Illustration, titleKey, descKey } = SLIDES[idx];
  const isLast = idx === SLIDES.length - 1;

  const next = () => isLast ? setOnboarded(true) : setIdx(i => i + 1);

  return (
    <div className="fixed inset-0 z-[100] bg-white flex flex-col">
      <div className="flex justify-end px-8 pt-8">
        {!isLast && (
          <button onClick={() => setOnboarded(true)}
            className="text-[var(--color-brand-accent)] font-semibold text-sm">
            Skip
          </button>
        )}
      </div>

      <div className="flex-1 flex items-center justify-center px-8">
        <AnimatePresence mode="wait">
          <motion.div key={idx}
            initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.4 }}
            className="w-full max-w-[280px]">
            <Illustration />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="px-8 pb-14 flex flex-col items-center text-center">
        <AnimatePresence mode="wait">
          <motion.div key={idx + 't'}
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <h2 className="text-[22px] font-bold text-[var(--color-brand-text)] mb-2 max-w-[260px] mx-auto leading-snug">
              {t(titleKey)}
            </h2>
            <p className="text-[var(--color-brand-text-muted)] text-sm leading-relaxed max-w-[240px] mx-auto">
              {t(descKey)}
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="flex space-x-2 my-7">
          {SLIDES.map((_, i) => (
            <button key={i} onClick={() => setIdx(i)}
              className={`h-2 rounded-full transition-all duration-300 ${i === idx ? 'w-7 bg-[var(--color-brand-accent)]' : 'w-2 bg-[#d4d0c4]'}`}
            />
          ))}
        </div>

        <button onClick={next}
          className="w-full max-w-[280px] bg-[var(--color-brand-accent)] text-white py-4 rounded-2xl font-bold text-base hover:bg-[var(--color-brand-accent-hover)] active:scale-95 transition-all shadow-lg">
          {isLast ? (t('getStarted') || 'Get Started') : (t('next') || 'Next')}
        </button>
      </div>
    </div>
  );
};

export default Onboarding;
