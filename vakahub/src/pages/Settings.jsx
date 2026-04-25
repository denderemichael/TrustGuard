import React from 'react';
import { Globe, Shield, HelpCircle, LogOut, RefreshCw } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const Settings = () => {
  const { t, language, setLanguage, role, resetApp } = useAppContext();

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h2 className="text-4xl font-serif text-[var(--color-brand-text)]">{t('settings')}</h2>
        <p className="text-[var(--color-brand-text-muted)] mt-2">Manage your VakaHub preferences</p>
      </div>

      <div className="space-y-6">
        {/* Language */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-[#e2e0d8]">
          <div className="flex items-center space-x-3 mb-5">
            <div className="w-10 h-10 bg-[#f0eee4] rounded-full flex items-center justify-center text-[var(--color-brand-accent)]">
              <Globe size={20} />
            </div>
            <div>
              <p className="font-medium text-[var(--color-brand-text)]">{t('chooseLanguage')}</p>
              <p className="text-xs text-[var(--color-brand-text-muted)]">Changes apply instantly across the entire app</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[
              { code: 'en', label: 'English' },
              { code: 'sn', label: 'Shona' },
              { code: 'nd', label: 'Ndebele' },
            ].map(lang => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                className={`p-4 rounded-2xl border text-sm font-medium transition-all ${
                  language === lang.code
                    ? 'border-[var(--color-brand-accent)] bg-[#f0eee4] text-[var(--color-brand-accent)]'
                    : 'border-[#e2e0d8] bg-white text-[var(--color-brand-text)] hover:border-[var(--color-brand-accent)]'
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </div>

        {/* Account Info */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-[#e2e0d8]">
          <div className="flex items-center space-x-3 mb-5">
            <div className="w-10 h-10 bg-[#f0eee4] rounded-full flex items-center justify-center text-[var(--color-brand-accent)]">
              <Shield size={20} />
            </div>
            <p className="font-medium text-[var(--color-brand-text)]">Account Details</p>
          </div>
          <div className="space-y-0 divide-y divide-[#f0eee4]">
            {[
              { label: 'Role', value: role === 'admin' ? t('adminLogin') : t('userLogin') },
              { label: 'Language', value: t('language') },
              { label: 'Offline Mode', value: '✅ Active' },
              { label: 'Data Storage', value: 'Local Device' },
              { label: 'Tax Savings', value: '0% DSWT (vs 15.5% foreign)' },
            ].map(row => (
              <div key={row.label} className="flex justify-between items-center py-3">
                <span className="text-sm text-[var(--color-brand-text-muted)]">{row.label}</span>
                <span className="text-sm font-medium text-[var(--color-brand-text)]">{row.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Help */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-[#e2e0d8] flex items-center justify-between cursor-pointer hover:bg-[#fcfcfa] transition-colors">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-[#f0eee4] rounded-full flex items-center justify-center text-[var(--color-brand-accent)]">
              <HelpCircle size={20} />
            </div>
            <p className="font-medium text-[var(--color-brand-text)]">Help & Support</p>
          </div>
          <span className="text-[var(--color-brand-text-muted)]">→</span>
        </div>

        {/* Reset */}
        <button
          onClick={resetApp}
          className="w-full bg-[#fff0f0] text-[#d32f2f] p-5 rounded-3xl font-medium border border-[#ffebee] flex items-center justify-center space-x-3 hover:bg-[#ffebee] transition-colors"
        >
          <LogOut size={20} />
          <span>Reset App & Clear All Data</span>
        </button>
      </div>
    </div>
  );
};

export default Settings;
