import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from './context/AppContext';
import TopBar from './components/TopBar';
import Chatbot from './components/Chatbot';
import AdPopup from './components/AdPopup';

import LanguageSelection from './pages/LanguageSelection';
import RoleSelection from './pages/RoleSelection';
import Onboarding from './pages/Onboarding';
import Home from './pages/Home';
import Products from './pages/Products';
import Escrow from './pages/Escrow';
import Profile from './pages/Profile';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import Settings from './pages/Settings';

function App() {
  const { language, role, onboarded, currentTab, setCurrentTab } = useAppContext();

  if (!language) return <LanguageSelection />;
  if (!role) return <RoleSelection />;
  if (!onboarded) return <Onboarding />;

  const renderTab = () => {
    switch (currentTab) {
      case 'home':      return <Home setCurrentTab={setCurrentTab} />;
      case 'products':  return <Products />;
      case 'orders':    return <Escrow />;
      case 'cart':      return <Cart setCurrentTab={setCurrentTab} />;
      case 'profile':   return <Profile />;
      case 'contact':   return <Contact />;
      case 'settings':  return <Settings />;
      case 'advertise': return <div className="p-20 text-center text-2xl italic font-serif text-[var(--color-brand-text-muted)]">ZimPulse Ad Exchange Integration Coming Soon...</div>;
      default:          return <Home setCurrentTab={setCurrentTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-brand-bg)] w-full flex flex-col font-sans selection:bg-[var(--color-brand-accent)] selection:text-white">
      <TopBar />
      
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {renderTab()}
          </motion.div>
        </AnimatePresence>
      </main>

      <Chatbot />
      <AdPopup />

      <footer className="py-16 border-t border-[#e2e0d8] bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <span className="font-serif italic text-2xl font-bold text-[var(--color-brand-text)] block mb-4">VakaHub</span>
          <p className="text-[var(--color-brand-text-muted)] text-[10px] font-bold tracking-[0.2em] uppercase">
            &copy; 2026 Zimbabwe · Secure Escrow Commerce · Empowering Local Trade
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
