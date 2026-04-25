import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Target, DollarSign, CheckCircle, Shield, Zap, Globe } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const Advertise = () => {
  const { t, addAdvertisement, products } = useAppContext();
  const [adText, setAdText] = useState('');
  const [budget, setBudget] = useState('');
  const [selectedProductId, setSelectedProductId] = useState('');
  const [target, setTarget] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [preview, setPreview] = useState(null);

  const calculateTime = (usd) => {
    if (!usd) return 0;
    // 50 cents = 15 minutes of "High Priority" carousel time
    // $1 = 30 minutes
    // $5 = 150 minutes (2.5 hours)
    return (usd / 0.50) * 15;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const product = products.find(p => p.id === parseInt(selectedProductId));
    const newAd = {
      text: adText,
      budget: parseFloat(budget),
      target,
      durationMinutes: calculateTime(parseFloat(budget)),
      productName: product?.name || 'VakaHub Item',
      image: preview || product?.image || '/honey.png',
      productId: selectedProductId
    };
    addAdvertisement(newAd);
    setSubmitted(true);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setPreview(URL.createObjectURL(file));
  };

  return (
    <div className="w-full">
      {/* Hero Banner */}
      <div className="bg-[#2c3b29] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-20 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10 text-center">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm text-white px-5 py-2 rounded-full text-sm font-bold mb-8 border border-white/20">
            <Shield size={14} className="text-amber-400" />
            <span className="uppercase tracking-widest">Start from only $0.50</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-serif mb-6 leading-tight italic font-bold">
            Grow Your Sales Locally
          </h1>
          <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto leading-relaxed">
            Reach thousands of buyers instantly. No 15.5% foreign tax. Pay what you want, get the time you deserve.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Creation Form */}
          <div>
            <h2 className="text-3xl font-serif font-bold text-[var(--color-brand-text)] mb-8 italic">Create Campaign</h2>

            {submitted ? (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-white p-10 rounded-[3rem] shadow-xl border border-[#e2e0d8] text-center">
                <div className="w-20 h-20 bg-[#e8faed] rounded-full flex items-center justify-center mx-auto mb-6 border border-[#2e7d32]/20">
                  <CheckCircle size={40} className="text-[#2e7d32]" />
                </div>
                <h3 className="text-2xl font-serif font-bold mb-3 italic">Ad is Now Live!</h3>
                <p className="text-[var(--color-brand-text-muted)] mb-8 text-sm">Your product is rotating in the main carousel across Zimbabwe.</p>
                <div className="bg-[#fcfcfa] rounded-[2rem] p-6 border border-[#e2e0d8] space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-[#f0eee4]">
                    <span className="text-xs font-bold text-[var(--color-brand-text-muted)] uppercase tracking-widest">Budget Paid</span>
                    <span className="font-bold text-[var(--color-brand-accent)]">${budget}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-xs font-bold text-[var(--color-brand-text-muted)] uppercase tracking-widest">Allocated Time</span>
                    <span className="font-bold text-[#2c3b29]">{calculateTime(parseFloat(budget))} Minutes</span>
                  </div>
                </div>
                <button onClick={() => { setSubmitted(false); setBudget(''); setAdText(''); setPreview(null); }} className="mt-8 text-sm font-bold text-[var(--color-brand-accent)] hover:underline">
                  Launch Another Ad
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white p-10 rounded-[3rem] shadow-sm border border-[#e2e0d8] space-y-8">
                <div className="space-y-4">
                  <label className="text-[10px] font-bold text-[var(--color-brand-text-muted)] uppercase tracking-widest px-1">Select Product to Promote</label>
                  <select 
                    value={selectedProductId}
                    onChange={(e) => setSelectedProductId(e.target.value)}
                    required
                    className="w-full bg-[#fcfcfa] border border-[#e2e0d8] p-4 rounded-2xl focus:border-[var(--color-brand-accent)] outline-none"
                  >
                    <option value="">Choose a product...</option>
                    {products.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                  </select>
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-bold text-[var(--color-brand-text-muted)] uppercase tracking-widest px-1">Catchy Ad Line</label>
                  <input 
                    type="text" 
                    value={adText}
                    onChange={(e) => setAdText(e.target.value)}
                    placeholder="e.g. Fresh Honey directly from Mutare!"
                    required
                    className="w-full bg-[#fcfcfa] border border-[#e2e0d8] p-4 rounded-2xl focus:border-[var(--color-brand-accent)] outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <label className="text-[10px] font-bold text-[var(--color-brand-text-muted)] uppercase tracking-widest px-1">Budget (USD)</label>
                    <input 
                      type="number" 
                      step="0.10"
                      min="0.50"
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      placeholder="min $0.50"
                      required
                      className="w-full bg-[#fcfcfa] border border-[#e2e0d8] p-4 rounded-2xl focus:border-[var(--color-brand-accent)] outline-none"
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-bold text-[var(--color-brand-text-muted)] uppercase tracking-widest px-1">Calculated Exposure</label>
                    <div className="w-full bg-[#f0eee4] p-4 rounded-2xl flex items-center justify-center font-bold text-[var(--color-brand-text)]">
                      {calculateTime(parseFloat(budget))} Mins
                    </div>
                  </div>
                </div>

                <button type="submit" className="w-full bg-[var(--color-brand-accent)] text-white py-5 rounded-2xl font-bold shadow-xl hover:shadow-2xl transition-all">
                  Launch Ad Campaign
                </button>
              </form>
            )}
          </div>

          {/* Pricing Info */}
          <div className="space-y-10">
            <h2 className="text-3xl font-serif font-bold text-[var(--color-brand-text)] italic">How it Works</h2>
            <div className="space-y-6">
              {[
                { title: 'The $0.50 Entry', desc: 'No one is left behind. Start promoting with just 50 cents.' },
                { title: 'Fair Allocation', desc: 'The more you pay, the more times your ad appears in the premium 15-second carousel.' },
                { title: '100% Tax Free', desc: 'Unlike Facebook or Google, we don\'t deduct 15.5% tax. Every cent goes to your reach.' },
              ].map((item, i) => (
                <div key={i} className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-full bg-[#f0eee4] flex items-center justify-center font-bold text-[var(--color-brand-accent)] shrink-0 border border-[#e2e0d8]">
                    {i + 1}
                  </div>
                  <div>
                    <h4 className="font-bold text-[var(--color-brand-text)] mb-1">{item.title}</h4>
                    <p className="text-sm text-[var(--color-brand-text-muted)] leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-[#2c3b29] p-8 rounded-[3rem] text-white shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 -mr-10 -mt-10 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
              <DollarSign size={32} className="mb-4 text-amber-400" />
              <h4 className="text-xl font-serif font-bold italic mb-2">Dynamic Scheduling</h4>
              <p className="text-white/60 text-sm leading-relaxed">
                Our algorithm ensures your ad rotates every 15 seconds. High-budget ads are allocated more "slots" per hour to maximize visibility.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Advertise;
