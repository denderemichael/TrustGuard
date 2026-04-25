import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const slides = [
  {
    id: 1,
    title: "Shop Safely in Zimbabwe",
    desc: "Connect with local traders and merchants with 100% confidence.",
    image: "https://images.unsplash.com/photo-1534452283744-08cd54092454?auto=format&fit=crop&q=80&w=1200",
    color: "bg-[#2c3b29]"
  },
  {
    id: 2,
    title: "Secure Escrow Payments",
    desc: "Your money is held safely in escrow until you personally inspect and collect your items.",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&q=80&w=1200",
    color: "bg-[#e5a01d]"
  },
  {
    id: 3,
    title: "Scan to Confirm",
    desc: "Simply show your unique QR code to the merchant at handover to release funds instantly.",
    image: "https://images.unsplash.com/photo-1595079676339-1534801ad6cf?auto=format&fit=crop&q=80&w=1200",
    color: "bg-amber-600"
  },
  {
    id: 4,
    title: "Dual Currency Support",
    desc: "Always see prices in both USD and ZiG. No hidden fees, no confusion.",
    image: "https://images.unsplash.com/photo-1580519542036-c47de6196ba5?auto=format&fit=crop&q=80&w=1200",
    color: "bg-teal-700"
  }
];

const Onboarding = () => {
  const { setOnboarded, t } = useAppContext();
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(prev => prev + 1);
    } else {
      setOnboarded(true);
    }
  };

  const slide = slides[currentSlide];

  return (
    <div className="fixed inset-0 z-[100] bg-white flex flex-col">
      <div className="flex-1 relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="absolute inset-0 flex flex-col"
          >
            <div className="h-[60%] relative">
              <img src={slide.image} alt="" className="w-full h-full object-cover" />
              <div className={`absolute inset-0 ${slide.color} opacity-20`}></div>
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
            </div>
            
            <div className="flex-1 px-8 py-10 flex flex-col items-center text-center">
              <h2 className="text-3xl font-serif font-bold text-[var(--color-brand-text)] mb-4 italic">
                {slide.title}
              </h2>
              <p className="text-[var(--color-brand-text-muted)] leading-relaxed max-w-xs">
                {slide.desc}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="px-8 pb-12 flex flex-col items-center">
        {/* Indicators */}
        <div className="flex space-x-2 mb-8">
          {slides.map((_, i) => (
            <div 
              key={i} 
              className={`h-1.5 rounded-full transition-all duration-300 ${i === currentSlide ? 'w-8 bg-[var(--color-brand-accent)]' : 'w-2 bg-[#e2e0d8]'}`}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          className="w-full bg-[var(--color-brand-accent)] text-white py-5 rounded-2xl text-lg font-bold shadow-xl hover:shadow-2xl transition-all flex items-center justify-center space-x-3 active:scale-95"
        >
          <span>{currentSlide === slides.length - 1 ? t('getStarted') : t('next')}</span>
          <ArrowRight size={20} />
        </button>

        {currentSlide < slides.length - 1 && (
          <button 
            onClick={() => setOnboarded(true)}
            className="mt-6 text-[var(--color-brand-text-muted)] font-medium hover:text-[var(--color-brand-text)]"
          >
            {t('skip')}
          </button>
        )}
      </div>
    </div>
  );
};

export default Onboarding;
