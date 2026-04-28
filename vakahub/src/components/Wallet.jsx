import React from 'react';
import { motion } from 'framer-motion';
import { Wallet as WalletIcon, ShieldCheck, ArrowUpRight, ArrowDownLeft, Clock } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const Wallet = () => {
  const { wallets, t, getZiGPrice } = useAppContext();

  const balanceItems = [
    { 
      label: 'Available', 
      amount: wallets.available || 0, 
      icon: <ArrowUpRight size={20} className="text-emerald-500" />,
      bg: 'bg-emerald-50',
      text: 'text-emerald-700'
    },
    { 
      label: 'In Escrow', 
      amount: wallets.escrow || 0, 
      icon: <ShieldCheck size={20} className="text-amber-500" />,
      bg: 'bg-amber-50',
      text: 'text-amber-700'
    },
  ];

  return (
    <div className="space-y-6">
      {/* Main Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[var(--color-brand-accent)] rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl" />
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-md">
                <WalletIcon size={24} />
              </div>
              <span className="font-medium opacity-80">Total Balance</span>
            </div>
            <span className="text-xs font-bold uppercase tracking-widest bg-white/10 px-3 py-1 rounded-full">Secure</span>
          </div>

          <div className="mb-2">
            <span className="text-5xl font-bold font-serif italic">${(wallets.total || 0).toFixed(2)}</span>
          </div>
          <div className="text-white/60 font-medium">
            ZiG {getZiGPrice(wallets.total || 0)}
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        {balanceItems.map((item, i) => (
          <motion.div 
            key={item.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-[2rem] border border-[#e2e0d8] shadow-sm"
          >
            <div className={`w-10 h-10 ${item.bg} rounded-xl flex items-center justify-center mb-4`}>
              {item.icon}
            </div>
            <p className="text-xs font-bold text-[var(--color-brand-text-muted)] uppercase tracking-widest mb-1">{item.label}</p>
            <p className={`text-xl font-bold ${item.text}`}>${item.amount.toFixed(2)}</p>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity Section (Placeholder) */}
      <div className="bg-white rounded-[2.5rem] p-8 border border-[#e2e0d8] shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-serif font-bold italic">Security Logs</h3>
          <button className="text-[var(--color-brand-accent)] text-xs font-bold uppercase tracking-widest">View All</button>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-[#fcfcfa] rounded-2xl border border-[#f0eee4]">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-amber-50 rounded-full flex items-center justify-center text-amber-600">
                <Clock size={18} />
              </div>
              <div>
                <p className="text-sm font-bold">Funds Secured</p>
                <p className="text-[10px] text-[var(--color-brand-text-muted)]">Awaiting inspection</p>
              </div>
            </div>
            <span className="font-bold text-amber-600">+$45.00</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wallet;
