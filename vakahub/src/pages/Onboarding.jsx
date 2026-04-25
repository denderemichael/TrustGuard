import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const Onboarding = () => {
  const { setOnboarded, t, role } = useAppContext();
  const [step, setStep] = useState(0);

  const adminSlides = [
    {
      image: "/onboard_admin_1777125397628.png",
      title: t('onboardAdmin3Title'),
      desc: t('onboardAdmin3Desc'),
    },
    {
      image: null,
      title: t('onboardAdmin1Title'),
      desc: t('onboardAdmin1Desc'),
    },
    {
      image: null,
      title: t('onboardAdmin2Title'),
      desc: t('onboardAdmin2Desc'),
    }
  ];

  const userSlides = [
    {
      image: "/onboard_user_1777125471471.png",
      title: t('onboardUser1Title'),
      desc: t('onboardUser1Desc'),
    }
  ];

  const slides = role === 'admin' ? adminSlides : userSlides;

  const nextStep = () => {
    if (step < slides.length - 1) {
      setStep(step + 1);
    } else {
      setOnboarded(true);
    }
  };

  const skip = () => {
    setOnboarded(true);
  };

  return (
    <div className="min-h-screen bg-[var(--color-brand-bg)] max-w-md mx-auto flex flex-col relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 p-6 flex justify-end z-10">
        <button onClick={skip} className="text-sm font-medium text-[var(--color-brand-text-muted)] focus:outline-none">
          {t('skip')}
        </button>
      </div>

      <div className="flex-1 flex flex-col justify-center px-8 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center text-center"
          >
            {slides[step].image ? (
              <div className="w-64 h-64 mb-8 rounded-3xl overflow-hidden shadow-lg border border-[#e2e0d8]">
                <img src={slides[step].image} alt="Onboarding" className="w-full h-full object-cover" />
              </div>
            ) : (
              <div className="w-64 h-64 mb-8 bg-[#ebe8de] rounded-3xl flex items-center justify-center font-serif italic text-4xl text-[var(--color-brand-accent)] shadow-lg border border-[#e2e0d8]">
                VakaHub
              </div>
            )}
            
            <h2 className="text-3xl font-serif text-[var(--color-brand-text)] mb-4">{slides[step].title}</h2>
            <p className="text-base text-[var(--color-brand-text-muted)] leading-relaxed">
              {slides[step].desc}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="p-8 pb-12">
        <div className="flex justify-center space-x-2 mb-10">
          {slides.map((_, i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === step ? 'w-8 bg-[var(--color-brand-accent)]' : 'w-2 bg-[#d1cec1]'
              }`}
            />
          ))}
        </div>

        <button
          onClick={nextStep}
          className="w-full bg-[var(--color-brand-accent)] hover:bg-[var(--color-brand-accent-hover)] text-white p-4 rounded-2xl font-semibold shadow-md transition-all flex justify-center items-center space-x-2 focus:outline-none"
        >
          <span>{step === slides.length - 1 ? t('finish') : t('next')}</span>
          {step < slides.length - 1 && <ChevronRight size={20} />}
        </button>
      </div>
    </div>
  );
};

export default Onboarding;
