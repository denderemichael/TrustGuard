import React, { useState } from 'react';
import { Globe, Shield, HelpCircle, LogOut, RefreshCw, Bell, Fingerprint, User, CreditCard } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const Settings = () => {
  const { t, language, setLanguage, role, resetApp, userProfile, updateProfile } = useAppContext();
  const [profileData, setProfileData] = useState(userProfile);
  const [prefs, setPrefs] = useState({ notifications: true, biometrics: false });

  const handleProfileSave = () => {
    updateProfile(profileData);
  };

  const Toggle = ({ active, onToggle }) => (
    <button 
      onClick={onToggle}
      className={`w-12 h-6 rounded-full transition-all relative ${active ? 'bg-[var(--color-brand-accent)]' : 'bg-[#d4d0c4]'}`}
    >
      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${active ? 'left-7' : 'left-1'}`} />
    </button>
  );

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h2 className="text-4xl font-serif text-[var(--color-brand-text)] font-bold italic">{t('settings')}</h2>
        <p className="text-[var(--color-brand-text-muted)] mt-2">Manage your VakaHub preferences and account</p>
      </div>

      <div className="space-y-6 pb-20">
        {/* Language Section */}
        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-[#e2e0d8]">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-12 h-12 bg-[#f0eee4] rounded-2xl flex items-center justify-center text-[var(--color-brand-accent)]">
              <Globe size={24} />
            </div>
            <div>
              <p className="font-bold text-lg text-[var(--color-brand-text)]">{t('chooseLanguage')}</p>
              <p className="text-xs text-[var(--color-brand-text-muted)]">Instant localization for all features</p>
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
                className={`p-4 rounded-2xl border-2 text-sm font-bold transition-all ${
                  language === lang.code
                    ? 'border-[var(--color-brand-accent)] bg-[#f0eee4] text-[var(--color-brand-accent)]'
                    : 'border-[#f0eee4] bg-white text-[var(--color-brand-text-muted)] hover:border-[var(--color-brand-accent)]'
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </div>

        {/* Account Section */}
        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-[#e2e0d8]">
          <div className="flex items-center space-x-4 mb-8">
            <div className="w-12 h-12 bg-[#f0eee4] rounded-2xl flex items-center justify-center text-[var(--color-brand-accent)]">
              <User size={24} />
            </div>
            <p className="font-bold text-lg text-[var(--color-brand-text)]">{t('account')}</p>
          </div>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-brand-text-muted)] px-1">{t('name')}</label>
              <input 
                type="text" 
                value={profileData.name}
                onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                className="w-full bg-[#fcfcfa] border border-[#e2e0d8] p-4 rounded-2xl focus:border-[var(--color-brand-accent)] outline-none font-medium"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-brand-text-muted)] px-1">Bio</label>
              <textarea 
                value={profileData.bio}
                onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                className="w-full bg-[#fcfcfa] border border-[#e2e0d8] p-4 rounded-2xl focus:border-[var(--color-brand-accent)] outline-none font-medium h-24 resize-none"
              />
            </div>
            <button 
              onClick={handleProfileSave}
              className="w-full bg-[var(--color-brand-accent)] text-white py-4 rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all"
            >
              {t('saveProfile')}
            </button>
          </div>
        </div>

        {/* Preferences */}
        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-[#e2e0d8]">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Bell size={20} className="text-[var(--color-brand-text-muted)]" />
                <span className="font-bold text-[var(--color-brand-text)]">{t('notifications')}</span>
              </div>
              <Toggle 
                active={prefs.notifications} 
                onToggle={() => setPrefs({...prefs, notifications: !prefs.notifications})} 
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Fingerprint size={20} className="text-[var(--color-brand-text-muted)]" />
                <span className="font-bold text-[var(--color-brand-text)]">{t('biometrics')}</span>
              </div>
              <Toggle 
                active={prefs.biometrics} 
                onToggle={() => setPrefs({...prefs, biometrics: !prefs.biometrics})} 
              />
            </div>
          </div>
        </div>

        {/* Info Rows */}
        <div className="bg-[#f0eee4] p-8 rounded-[2.5rem] border border-[#e2e0d8]">
          <div className="space-y-4">
            {[
              { label: t('offlineMode'), value: '✅ Active' },
              { label: t('dataStorage'), value: 'Local Device' },
              { label: t('taxSavings'), value: '0% DSWT' },
            ].map(row => (
              <div key={row.label} className="flex justify-between items-center text-sm">
                <span className="font-bold text-[var(--color-brand-text-muted)] uppercase tracking-widest text-[10px]">{row.label}</span>
                <span className="font-bold text-[var(--color-brand-text)]">{row.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Reset */}
        <button
          onClick={resetApp}
          className="w-full bg-rose-50 text-rose-600 p-6 rounded-[2rem] font-bold border border-rose-100 flex items-center justify-center space-x-3 hover:bg-rose-100 transition-all group"
        >
          <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span>{t('resetData')}</span>
        </button>
      </div>
    </div>
  );
};

export default Settings;
