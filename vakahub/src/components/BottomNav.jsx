import React from 'react';
import { Home, PlusCircle, Package, Users, BarChart2, Settings } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const BottomNav = ({ currentTab, setCurrentTab }) => {
  const { t, role } = useAppContext();

  const adminTabs = [
    { id: 'home', icon: Home, label: t('home') },
    { id: 'record', icon: PlusCircle, label: t('recordSale') },
    { id: 'products', icon: Package, label: t('products') },
    { id: 'customers', icon: Users, label: t('customers') },
    { id: 'settings', icon: Settings, label: t('settings') },
  ];

  const userTabs = [
    { id: 'home', icon: Home, label: t('home') },
    { id: 'products', icon: Package, label: t('products') },
    { id: 'settings', icon: Settings, label: t('settings') },
  ];

  const tabs = role === 'admin' ? adminTabs : userTabs;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#e2e0d8] flex justify-around items-center p-3 z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = currentTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setCurrentTab(tab.id)}
            className={`flex flex-col items-center justify-center w-full space-y-1 transition-colors ${
              isActive ? 'text-[#2c3b29]' : 'text-[#8a9183]'
            }`}
          >
            <Icon size={24} className={isActive ? 'stroke-[2.5px]' : 'stroke-2'} />
            <span className="text-[10px] font-medium tracking-wide">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default BottomNav;
