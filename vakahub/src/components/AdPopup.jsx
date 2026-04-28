import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, ShoppingBag, ChevronRight, ChevronLeft } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const AdPopup = () => {
  const { advertisements = [], products = [], addToCart, role } = useAppContext();
  const [show, setShow] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Combine merchant ads with some default product promotions
  const allAds = [
    ...advertisements,
    ...products.slice(0, 3).map(p => ({
      id: `default-${p.id}`,
      text: `Featured: ${p.name}`,
      image: p.image,
      productName: p.name,
      price: p.price,
      isDefault: true
    }))
  ];

  useEffect(() => {
    if (role !== 'user' || allAds.length === 0) return;

    // Show popup after a delay
    const initialTimer = setTimeout(() => {
      setShow(true);
    }, 5000);

    // Carousel rotation every 15 seconds
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % allAds.length);
    }, 15000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, [allAds.length, role]);

  const handleClose = () => {
    setShow(false);
    // Reappear after 5 minutes (300,000 ms)
    setTimeout(() => {
      setShow(true);
    }, 300000);
  };

  if (allAds.length === 0 || !show) return null;

  const currentAd = allAds[currentIndex];

  const handleNext = () => setCurrentIndex(prev => (prev + 1) % allAds.length);
  const handlePrev = () => setCurrentIndex(prev => (prev - 1 + allAds.length) % allAds.length);

  return (
    <AnimatePresence mode="wait">
      <motion.div 
        key={currentAd.id}
        initial={{ opacity: 0, x: 50, scale: 0.9 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        exit={{ opacity: 0, x: -50, scale: 0.9 }}
        transition={{ duration: 0.5 }}
        className="fixed bottom-32 right-8 z-[80] w-80 bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-[#e2e0d8] overflow-hidden group"
      >
        {/* Progress Bar (15s) */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-[#f0eee4] z-10">
          <motion.div 
            key={currentIndex}
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 15, ease: "linear" }}
            className="h-full bg-[var(--color-brand-accent)]"
          />
        </div>

        <div className="h-40 relative overflow-hidden">
          <img src={currentAd.image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
          
          <div className="absolute top-4 left-4 bg-amber-400 text-black text-[9px] font-bold px-3 py-1 rounded-full flex items-center space-x-1 uppercase tracking-widest border border-white/20">
            <Sparkles size={10} />
            <span>{currentAd.isDefault ? "Featured" : "Sponsored"}</span>
          </div>

          <button 
            onClick={handleClose} 
            className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white p-1.5 rounded-full transition-colors z-20"
          >
            <X size={14} />
          </button>

          {/* Navigation Arrows */}
          <div className="absolute inset-0 flex items-center justify-between px-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button onClick={handlePrev} className="bg-white/90 p-1.5 rounded-full shadow-md text-[var(--color-brand-text)] hover:text-[var(--color-brand-accent)]">
              <ChevronLeft size={16} />
            </button>
            <button onClick={handleNext} className="bg-white/90 p-1.5 rounded-full shadow-md text-[var(--color-brand-text)] hover:text-[var(--color-brand-accent)]">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <h4 className="font-serif font-bold text-lg text-[var(--color-brand-text)] leading-tight">{currentAd.text}</h4>
            <p className="text-[10px] text-[var(--color-brand-text-muted)] uppercase tracking-widest mt-1 font-bold">
              {currentAd.productName}
            </p>
          </div>
          
          <div className="flex justify-between items-center pt-2">
            <div>
              <p className="text-xs text-[var(--color-brand-text-muted)] italic">Verified Local Trader</p>
            </div>
            <button 
              onClick={() => { 
                const p = products.find(prod => prod.id === parseInt(currentAd.productId) || prod.name === currentAd.productName);
                if (p) addToCart(p);
              }}
              className="bg-[var(--color-brand-accent)] text-white px-5 py-2.5 rounded-xl font-bold text-xs shadow-lg hover:shadow-xl transition-all flex items-center space-x-2 active:scale-95"
            >
              <ShoppingBag size={14} />
              <span>Shop Now</span>
            </button>
          </div>
        </div>

        {/* Counter */}
        <div className="px-6 pb-4 flex justify-center space-x-1.5">
          {allAds.map((_, i) => (
            <div 
              key={i} 
              className={`h-1 rounded-full transition-all duration-300 ${i === currentIndex ? 'w-4 bg-[var(--color-brand-accent)]' : 'w-1 bg-[#e2e0d8]'}`} 
            />
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AdPopup;
