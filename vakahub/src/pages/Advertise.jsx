import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Target, DollarSign, CheckCircle, Shield, Zap, Globe } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const Advertise = () => {
  const { t } = useAppContext();
  const [adText, setAdText] = useState('');
  const [budget, setBudget] = useState('');
  const [target, setTarget] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="w-full">
      {/* Hero Banner */}
      <div className="bg-[var(--color-brand-accent)] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-20 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-white/30">
              <Shield size={14} />
              <span>No DSWT (15.5%)</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-serif mb-6 leading-tight italic">
              {t('adHeadline')}
            </h1>
            <p className="text-xl text-white/80 mb-10 max-w-2xl leading-relaxed">
              {t('adSub')}
            </p>
            <div className="grid grid-cols-3 gap-6">
              {[
                { icon: DollarSign, label: 'Pay Per Click', val: '$1 / click' },
                { icon: Zap, label: 'Local Reach', val: 'Harare · Bulawayo' },
                { icon: Globe, label: 'Publisher Network', val: '5+ Platforms' },
              ].map((item) => (
                <div key={item.label} className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/20">
                  <item.icon size={24} className="mb-3 text-white/70" />
                  <p className="text-lg font-semibold">{item.val}</p>
                  <p className="text-white/60 text-sm mt-1">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* Ad Creation Form */}
          <div>
            <h2 className="text-3xl font-serif text-[var(--color-brand-text)] mb-8">{t('createCampaign')}</h2>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white p-10 rounded-3xl shadow-sm border border-[#e2e0d8] text-center"
              >
                <div className="w-20 h-20 bg-[#e8faed] rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle size={40} className="text-[#2e7d32]" />
                </div>
                <h3 className="text-2xl font-serif mb-3 text-[var(--color-brand-text)]">Campaign Submitted!</h3>
                <p className="text-[var(--color-brand-text-muted)] mb-6">Your ad is now running across local platforms. No 15.5% DSWT deducted.</p>
                <div className="bg-[#f0eee4] rounded-2xl p-4 text-left">
                  <div className="flex justify-between py-2 border-b border-[#e2e0d8]">
                    <span className="text-sm text-[var(--color-brand-text-muted)]">Budget</span>
                    <span className="font-semibold">${budget}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-[#e2e0d8]">
                    <span className="text-sm text-[var(--color-brand-text-muted)]">Target</span>
                    <span className="font-semibold">{target || 'All Zimbabwe'}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-sm text-[var(--color-brand-text-muted)]">Est. Clicks</span>
                    <span className="font-semibold text-[var(--color-brand-accent)]">{budget ? Math.floor(budget) : '—'} clicks</span>
                  </div>
                </div>
                <button
                  onClick={() => { setSubmitted(false); setAdText(''); setBudget(''); setPreview(null); setTarget(''); }}
                  className="mt-6 text-sm text-[var(--color-brand-accent)] underline"
                >
                  Create another campaign
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl shadow-sm border border-[#e2e0d8] space-y-6">
                {/* Image Upload */}
                <div>
                  <label className="block text-xs font-medium text-[var(--color-brand-text-muted)] mb-2 uppercase tracking-wider">{t('uploadAd')}</label>
                  <div className="border-2 border-dashed border-[#e2e0d8] rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer hover:border-[var(--color-brand-accent)] transition-colors relative overflow-hidden">
                    {preview ? (
                      <img src={preview} alt="Ad Preview" className="w-full h-40 object-cover rounded-xl" />
                    ) : (
                      <>
                        <Upload size={32} className="text-[#d1cec1] mb-3" />
                        <p className="text-sm text-[var(--color-brand-text-muted)]">Click to upload your ad image</p>
                      </>
                    )}
                    <input type="file" accept="image/*" onChange={handleImageChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                  </div>
                </div>

                {/* Ad Text */}
                <div>
                  <label className="block text-xs font-medium text-[var(--color-brand-text-muted)] mb-2 uppercase tracking-wider">{t('adText')}</label>
                  <input
                    type="text"
                    value={adText}
                    onChange={(e) => setAdText(e.target.value)}
                    placeholder="e.g. Best prices in Harare!"
                    className="w-full bg-[#fcfcfa] border border-[#e2e0d8] p-4 rounded-2xl focus:outline-none focus:border-[var(--color-brand-accent)]"
                    required
                  />
                </div>

                {/* Target */}
                <div>
                  <label className="block text-xs font-medium text-[var(--color-brand-text-muted)] mb-2 uppercase tracking-wider">{t('targetAudience')}</label>
                  <select
                    value={target}
                    onChange={(e) => setTarget(e.target.value)}
                    className="w-full bg-[#fcfcfa] border border-[#e2e0d8] p-4 rounded-2xl focus:outline-none focus:border-[var(--color-brand-accent)]"
                  >
                    <option value="">All Zimbabwe</option>
                    <option value="Harare">Harare</option>
                    <option value="Bulawayo">Bulawayo</option>
                    <option value="Mutare">Mutare</option>
                    <option value="Gweru">Gweru</option>
                  </select>
                </div>

                {/* Budget */}
                <div>
                  <label className="block text-xs font-medium text-[var(--color-brand-text-muted)] mb-2 uppercase tracking-wider">{t('budget')}</label>
                  <input
                    type="number"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    min="10"
                    max="100"
                    placeholder="e.g. 50"
                    className="w-full bg-[#fcfcfa] border border-[#e2e0d8] p-4 rounded-2xl focus:outline-none focus:border-[var(--color-brand-accent)]"
                    required
                  />
                  {budget && (
                    <p className="text-xs text-[var(--color-brand-text-muted)] mt-2">
                      Estimated {Math.floor(budget)} clicks @ $1/click. Publisher earns $0.60/click. You keep the margin.
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full bg-[var(--color-brand-accent)] hover:bg-[var(--color-brand-accent-hover)] text-white p-4 rounded-2xl font-semibold shadow-md transition-all"
                >
                  {t('launchAd')}
                </button>
              </form>
            )}
          </div>

          {/* How It Works */}
          <div>
            <h2 className="text-3xl font-serif text-[var(--color-brand-text)] mb-8">How It Works</h2>
            <div className="space-y-6">
              {[
                { step: '01', title: 'Set Your Budget', desc: 'Choose from $10 to $100. Pay only for real local clicks. No DSWT deducted.' },
                { step: '02', title: 'Upload Your Ad', desc: 'Add an image and a catchy line. We place it across 5+ local blogs and apps.' },
                { step: '03', title: 'Track Your ROI', desc: 'See how many clicks you got and how much you saved vs. foreign platforms.' },
              ].map((item) => (
                <div key={item.step} className="flex space-x-6">
                  <div className="text-4xl font-serif text-[#e2e0d8] font-bold shrink-0 w-12">{item.step}</div>
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#e2e0d8] flex-1">
                    <h4 className="font-semibold text-[var(--color-brand-text)] mb-2">{item.title}</h4>
                    <p className="text-sm text-[var(--color-brand-text-muted)] leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Tax Comparison */}
            <div className="mt-8 bg-[#f0eee4] rounded-3xl p-8 border border-[#e2e0d8]">
              <h3 className="font-serif text-xl mb-6 text-[var(--color-brand-text)]">Tax Comparison</h3>
              <div className="space-y-4">
                {[
                  { name: 'Google Ads', tax: '15.5%', color: '#e57373', budget: '$100', keeps: '$84.50' },
                  { name: 'Meta / Facebook', tax: '15.5%', color: '#e57373', budget: '$100', keeps: '$84.50' },
                  { name: 'VakaHub (Local)', tax: '0%', color: '#2e7d32', budget: '$100', keeps: '$100.00' },
                ].map((row) => (
                  <div key={row.name} className="bg-white p-4 rounded-2xl flex justify-between items-center">
                    <div>
                      <p className="font-medium text-sm">{row.name}</p>
                      <p className="text-xs text-[var(--color-brand-text-muted)] mt-0.5">On $100 budget</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-[var(--color-brand-text-muted)]">Tax: <span style={{ color: row.color }} className="font-bold">{row.tax}</span></p>
                      <p className="font-serif font-semibold" style={{ color: row.color }}>Keeps: {row.keeps}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Advertise;
