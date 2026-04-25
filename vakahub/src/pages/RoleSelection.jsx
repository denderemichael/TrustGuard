import React from 'react';
import { motion } from 'framer-motion';
import { Store, UserCircle } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const RoleSelection = () => {
  const { setRole, t } = useAppContext();

  return (
    <div className="min-h-screen bg-[var(--color-brand-bg)] max-w-md mx-auto flex flex-col justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-10">
          <h1 className="text-3xl font-serif text-[var(--color-brand-text)] mb-2">{t('chooseRoleTitle')}</h1>
          <p className="text-[var(--color-brand-text-muted)] text-sm">{t('selectRole')}</p>
        </div>

        <div className="space-y-4">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            onClick={() => setRole('admin')}
            className="w-full bg-white p-6 rounded-3xl border border-[#e2e0d8] shadow-sm hover:shadow-md hover:border-[var(--color-brand-accent)] transition-all flex items-center space-x-4 focus:outline-none"
          >
            <div className="w-12 h-12 rounded-full bg-[#f0eee4] flex items-center justify-center text-[var(--color-brand-accent)]">
              <Store size={24} />
            </div>
            <div className="flex flex-col items-start">
              <span className="text-lg font-semibold text-[var(--color-brand-text)]">{t('adminLogin')}</span>
              <span className="text-xs text-[var(--color-brand-text-muted)] mt-1">{t('onboardAdmin1Desc')}</span>
            </div>
          </motion.button>

          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            onClick={() => setRole('user')}
            className="w-full bg-white p-6 rounded-3xl border border-[#e2e0d8] shadow-sm hover:shadow-md hover:border-[var(--color-brand-accent)] transition-all flex items-center space-x-4 focus:outline-none"
          >
            <div className="w-12 h-12 rounded-full bg-[#f0eee4] flex items-center justify-center text-[var(--color-brand-accent)]">
              <UserCircle size={24} />
            </div>
            <div className="flex flex-col items-start">
              <span className="text-lg font-semibold text-[var(--color-brand-text)]">{t('userLogin')}</span>
              <span className="text-xs text-[var(--color-brand-text-muted)] mt-1">{t('onboardUser1Desc')}</span>
            </div>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default RoleSelection;
