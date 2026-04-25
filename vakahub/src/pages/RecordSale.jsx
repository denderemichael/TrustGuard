import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, ShieldCheck } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const RecordSale = ({ setCurrentTab }) => {
  const { t, addSale } = useAppContext();
  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState('');
  const [refCode, setRefCode] = useState('');

  const handleNext = () => {
    if (step === 1 && amount && method) setStep(2);
    else if (step === 2 && refCode) setStep(3);
    else if (step === 3) {
      addSale({ amount, method, refCode });
      setCurrentTab('home');
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-serif text-[var(--color-brand-text)] mb-2">{t('recordSale')}</h2>

      {/* Step indicator */}
      <div className="flex items-center space-x-3 mb-10">
        {[1, 2, 3].map(s => (
          <React.Fragment key={s}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${step >= s ? 'bg-[var(--color-brand-accent)] text-white' : 'bg-[#e2e0d8] text-[var(--color-brand-text-muted)]'}`}>{s}</div>
            {s < 3 && <div className={`h-0.5 flex-1 rounded transition-all ${step > s ? 'bg-[var(--color-brand-accent)]' : 'bg-[#e2e0d8]'}`}></div>}
          </React.Fragment>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
            className="bg-white p-8 rounded-3xl shadow-sm border border-[#e2e0d8] space-y-6">
            <div>
              <label className="block text-xs font-medium text-[var(--color-brand-text-muted)] mb-2 uppercase tracking-wider">{t('amount')} ($)</label>
              <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-[#fcfcfa] border border-[#e2e0d8] p-4 rounded-2xl text-2xl focus:outline-none focus:border-[var(--color-brand-accent)] shadow-sm" placeholder="0.00" />
            </div>
            <div>
              <label className="block text-xs font-medium text-[var(--color-brand-text-muted)] mb-3 uppercase tracking-wider">{t('paymentMethod')}</label>
              <div className="grid grid-cols-3 gap-3">
                {['Cash', 'EcoCash', 'Zipit'].map(m => (
                  <button key={m} onClick={() => setMethod(m)}
                    className={`p-4 rounded-2xl border text-sm font-medium transition-all ${method === m ? 'border-[var(--color-brand-accent)] bg-[#f0eee4] text-[var(--color-brand-accent)]' : 'border-[#e2e0d8] bg-white text-[var(--color-brand-text)]'}`}>
                    {t(m.toLowerCase())}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
            className="bg-white p-8 rounded-3xl shadow-sm border border-[#e2e0d8]">
            <label className="block text-xs font-medium text-[var(--color-brand-text-muted)] mb-2 uppercase tracking-wider">{t('refCode')}</label>
            <input type="text" value={refCode} onChange={(e) => setRefCode(e.target.value)}
              className="w-full bg-[#fcfcfa] border border-[#e2e0d8] p-4 rounded-2xl text-xl focus:outline-none focus:border-[var(--color-brand-accent)] uppercase font-mono tracking-widest" placeholder="e.g. MP23X9" />
          </motion.div>
        )}

        {step === 3 && (
          <motion.div key="step3" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-10 rounded-3xl shadow-sm border border-[#e2e0d8] flex flex-col items-center text-center space-y-6">
            <div className="w-24 h-24 bg-[#e8faed] rounded-full flex items-center justify-center shadow-inner">
              <CheckCircle size={48} className="text-[#2e7d32]" />
            </div>
            <div className="inline-flex items-center space-x-2 bg-[#e8faed] text-[#2e7d32] px-4 py-2 rounded-full">
              <ShieldCheck size={16} />
              <span className="text-sm font-semibold">{t('paymentVerified')}</span>
            </div>
            <div>
              <h3 className="text-4xl font-serif mb-1">${parseFloat(amount).toFixed(2)}</h3>
              <p className="text-[var(--color-brand-text-muted)]">via {method}</p>
            </div>
            <div className="p-5 bg-[#f0eee4] rounded-2xl border border-[#e2e0d8] w-full text-left flex items-start space-x-3">
              <span className="text-2xl">💰</span>
              <div>
                <p className="text-sm font-semibold text-[var(--color-brand-accent)]">{t('savedMoneyText')}</p>
                <p className="text-xs text-[var(--color-brand-text-muted)] mt-1">{t('noForeignTax')}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={handleNext}
        disabled={(step === 1 && (!amount || !method)) || (step === 2 && !refCode)}
        className={`w-full mt-8 p-4 rounded-2xl font-semibold text-white transition-all shadow-md text-lg ${
          ((step === 1 && (!amount || !method)) || (step === 2 && !refCode))
            ? 'bg-[#d1cec1] cursor-not-allowed'
            : 'bg-[var(--color-brand-accent)] hover:bg-[var(--color-brand-accent-hover)]'
        }`}
      >
        {step === 1 ? t('next') : step === 2 ? t('verifyPayment') : t('finish')}
      </button>
    </div>
  );
};

export default RecordSale;
