import React, { useState } from 'react';
import { useAppContext } from './context/AppContext';
import TopBar from './components/TopBar';
import Footer from './components/Footer';

import LanguageSelection from './pages/LanguageSelection';
import RoleSelection from './pages/RoleSelection';
import Onboarding from './pages/Onboarding';
import Home from './pages/Home';
import RecordSale from './pages/RecordSale';
import Products from './pages/Products';
import Customers from './pages/Customers';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import Advertise from './pages/Advertise';
import Escrow from './pages/Escrow';
import Profile from './pages/Profile';

function App() {
  const { language, role, onboarded } = useAppContext();
  const [currentTab, setCurrentTab] = useState('home');

  if (!language) return <LanguageSelection />;
  if (!role) return <RoleSelection />;
  if (!onboarded) return <Onboarding />;

  const renderTab = () => {
    switch (currentTab) {
      case 'home':      return <Home setCurrentTab={setCurrentTab} />;
      case 'record':    return <RecordSale setCurrentTab={setCurrentTab} />;
      case 'products':  return <Products />;
      case 'customers': return <Customers />;
      case 'reports':   return <Reports />;
      case 'settings':  return <Settings />;
      case 'advertise': return <Advertise />;
      case 'escrow':    return <Escrow />;
      case 'profile':   return <Profile />;
      default:          return <Home setCurrentTab={setCurrentTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-brand-bg)] w-full flex flex-col font-sans">
      <TopBar currentTab={currentTab} setCurrentTab={setCurrentTab} />
      <main className="flex-grow">
        {renderTab()}
      </main>
      <Footer />
    </div>
  );
}

export default App;
