import React from 'react';
import { motion } from 'framer-motion';
import { useAppContext } from '../context/AppContext';

const LanguageSelection = () => {
  const { setLanguage, t } = useAppContext();

  const languages = [
    { code: 'en', label: 'English', desc: 'Continue in English' },
    { code: 'sn', label: 'Shona', desc: 'Enderera mberi neShona' },
    { code: 'nd', label: 'Ndebele', desc: 'Qhubeka ngesiNdebele' },
  ];

  return (
    <div className="min-h-screen bg-[var(--color-brand-bg)] max-w-md mx-auto flex flex-col justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-[var(--color-brand-accent)] rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-lg">
            <span className="text-white text-3xl font-serif italic">V</span>
          </div>
          <h1 className="text-3xl font-serif text-[var(--color-brand-text)] mb-2">VakaHub</h1>
          <p className="text-[var(--color-brand-text-muted)] text-sm">Choose your language</p>
        </div>

        <div className="space-y-4">
          {languages.map((lang, index) => (
            <motion.button
              key={lang.code}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              onClick={() => setLanguage(lang.code)}
              className="w-full bg-white p-5 rounded-2xl border border-[#e2e0d8] shadow-sm hover:shadow-md hover:border-[var(--color-brand-accent)] transition-all flex flex-col items-start focus:outline-none"
            >
              <span className="text-lg font-semibold text-[var(--color-brand-text)] mb-1">{lang.label}</span>
              <span className="text-sm text-[var(--color-brand-text-muted)]">{lang.desc}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default LanguageSelection;
