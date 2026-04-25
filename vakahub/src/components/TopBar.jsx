import React from 'react';
import { Search, Heart, ShoppingBag, LogOut, Settings, User } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const TopBar = ({ currentTab, setCurrentTab }) => {
  const { t, role, resetApp } = useAppContext();

  const adminTabs = [
    { id: 'home', label: t('dashboard') },
    { id: 'record', label: t('recordSale') },
    { id: 'products', label: t('products') },
    { id: 'customers', label: t('customers') },
    { id: 'reports', label: t('reports') },
    { id: 'advertise', label: t('advertise') },
    { id: 'profile', label: t('profile') },
  ];

  const userTabs = [
    { id: 'home', label: t('home') },
    { id: 'products', label: t('collections') },
    { id: 'profile', label: t('profile') },
    { id: 'about', label: t('about') },
    { id: 'contact', label: t('contact') },
  ];

  const tabs = role === 'admin' ? adminTabs : userTabs;

  return (
    <nav className="w-full bg-[var(--color-brand-bg)] border-b border-[#e2e0d8] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
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

          <div className="flex-shrink-0 flex items-center justify-center flex-1 md:flex-none cursor-pointer" onClick={() => setCurrentTab('home')}>
            <span className="font-serif italic text-3xl font-semibold text-[var(--color-brand-text)] tracking-wider">
              {role === 'admin' ? t('vakaHubAdmin') : t('vakaHubShop')}
            </span>
          </div>

          <div className="flex items-center space-x-6 text-[var(--color-brand-text)]">
            <button 
              onClick={() => setCurrentTab('profile')} 
              className={`hover:text-[var(--color-brand-accent)] transition-colors ${currentTab === 'profile' ? 'text-[var(--color-brand-accent)]' : ''}`}
            >
              <User size={20} strokeWidth={1.5} />
            </button>
            
            {role === 'user' ? (
              <>
                <button className="hover:text-[var(--color-brand-accent)] transition-colors"><Search size={20} strokeWidth={1.5} /></button>
                <button className="hover:text-[var(--color-brand-accent)] transition-colors relative">
                  <ShoppingBag size={20} strokeWidth={1.5} />
                  <span className="absolute -top-1 -right-2 bg-[var(--color-brand-accent)] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">0</span>
                </button>
              </>
            ) : (
              <>
                <button onClick={() => setCurrentTab('settings')} className="hover:text-[var(--color-brand-accent)] transition-colors"><Settings size={20} strokeWidth={1.5} /></button>
                <button onClick={resetApp} className="hover:text-[var(--color-brand-accent)] transition-colors"><LogOut size={20} strokeWidth={1.5} /></button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopBar;
