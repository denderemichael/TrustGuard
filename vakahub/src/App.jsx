import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';
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
import Advertise from './pages/Advertise';
import Settings from './pages/Settings';

import Auth from './pages/Auth';

function App() {
  const { language, role, onboarded, currentTab, setCurrentTab, user, loading, notifications } = useAppContext();

  if (!language) return <LanguageSelection />;
  if (!onboarded) return <Onboarding />;
  if (loading) return <div className="min-h-screen flex items-center justify-center bg-[var(--color-brand-bg)]">Loading...</div>;
  if (!user) return <Auth />;
  if (!role) return <RoleSelection />;

  const renderTab = () => {
    switch (currentTab) {
      case 'home':      return <Home />;
      case 'products':  return <Products />;
      case 'orders':    return <Escrow />;
      case 'cart':      return <Cart setCurrentTab={setCurrentTab} />;
      case 'profile':   return <Profile />;
      case 'contact':   return <Contact />;
      case 'advertise': return <Advertise />;
      case 'settings':  return <Settings />;
      default:          return <Home />;
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
      
      {/* Notifications Overlay */}
      <div className="fixed bottom-8 left-8 z-[300] space-y-4 max-w-sm w-full pointer-events-none">
        <AnimatePresence>
          {notifications && notifications.map(n => (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, x: -50, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8, x: -20 }}
              className="bg-white p-6 rounded-3xl shadow-2xl border border-[#e2e0d8] flex items-start space-x-4 pointer-events-auto"
            >
              <div className="w-10 h-10 bg-[#f0eee4] rounded-full flex items-center justify-center shrink-0">
                <ShieldCheck className="text-[var(--color-brand-accent)]" size={20} />
              </div>
              <div>
                <h4 className="font-bold text-sm text-[var(--color-brand-text)]">{n.title}</h4>
                <p className="text-xs text-[var(--color-brand-text-muted)] mt-1">{n.message}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

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
