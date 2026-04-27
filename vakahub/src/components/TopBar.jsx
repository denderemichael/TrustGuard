import React from 'react';
import { ShoppingBag, Settings, User, Languages, ArrowLeft } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const TopBar = () => {
  const { t, role, cart, currentTab, setCurrentTab, language, setLanguage, goBack, canGoBack } = useAppContext();

  const toggleLanguage = () => {
    const langs = ['en', 'sn', 'nd'];
    const nextIdx = (langs.indexOf(language) + 1) % langs.length;
    setLanguage(langs[nextIdx]);
  };

  const adminTabs = [
    { id: 'home', label: t('dashboard') },
    { id: 'products', label: t('products') },
    { id: 'orders', label: t('orders') },
    { id: 'advertise', label: t('advertise') },
  ];

  const userTabs = [
    { id: 'home', label: t('home') },
    { id: 'products', label: t('collections') },
    { id: 'orders', label: t('myOrders') },
    { id: 'contact', label: t('contact') },
  ];

  const tabs = role === 'admin' ? adminTabs : userTabs;

  return (
    <nav className="w-full bg-[var(--color-brand-bg)] border-b border-[#e2e0d8] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Left: Logo + Back Button */}
          <div className="flex-shrink-0 flex items-center space-x-4">
            {canGoBack && currentTab !== 'home' && (
              <button 
                onClick={goBack}
                className="p-2 bg-white rounded-full border border-[#e2e0d8] text-[var(--color-brand-text)] hover:bg-[#f0eee4] transition-all shadow-sm flex items-center justify-center"
                title="Go Back"
              >
                <ArrowLeft size={18} />
              </button>
            )}
            <div className="cursor-pointer flex items-center space-x-2" onClick={() => setCurrentTab('home')}>
              <span className="font-serif italic text-2xl font-bold text-[var(--color-brand-text)] tracking-tight">
                VakaHub
              </span>
            </div>
          </div>

          {/* Center: Tabs */}
          <div className="hidden md:flex space-x-8 items-center">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setCurrentTab(tab.id)}
                className={`text-sm font-medium transition-colors ${
                  currentTab === tab.id
                    ? 'text-[var(--color-brand-accent)] border-b-2 border-[var(--color-brand-accent)] pb-1'
                    : 'text-[var(--color-brand-text-muted)] hover:text-[var(--color-brand-text)]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Right: Actions */}
          <div className="flex items-center space-x-3">
            {/* Language Switcher */}
            <button 
              onClick={toggleLanguage}
              className="p-2 text-[var(--color-brand-text-muted)] hover:text-[var(--color-brand-accent)] transition-colors flex items-center space-x-1"
              title="Change Language"
            >
              <Languages size={20} strokeWidth={1.5} />
              <span className="text-[10px] font-bold uppercase">{language}</span>
            </button>

            {role === 'user' && (
              <button 
                onClick={() => setCurrentTab('cart')} 
                className="relative p-2 text-[var(--color-brand-text-muted)] hover:text-[var(--color-brand-accent)] transition-colors"
              >
                <ShoppingBag size={22} strokeWidth={1.5} />
                {cart && cart.length > 0 && (
                  <span className="absolute top-0 right-0 bg-[var(--color-brand-accent)] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </button>
            )}
            
            <button 
              onClick={() => setCurrentTab('profile')}
              className={`p-2 rounded-full border transition-all ${
                currentTab === 'profile' 
                  ? 'border-[var(--color-brand-accent)] text-[var(--color-brand-accent)]' 
                  : 'border-transparent text-[var(--color-brand-text-muted)] hover:text-[var(--color-brand-text)]'
              }`}
            >
              <User size={22} strokeWidth={1.5} />
            </button>

            {role === 'admin' && (
              <button onClick={() => setCurrentTab('settings')} className="p-2 text-[var(--color-brand-text-muted)] hover:text-[var(--color-brand-text)]">
                <Settings size={22} strokeWidth={1.5} />
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopBar;
