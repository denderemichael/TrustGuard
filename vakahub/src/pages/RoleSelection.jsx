import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Store, CheckCircle, Upload, ShieldCheck, BarChart3, QrCode } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const RoleSelection = () => {
  const { setRole, t } = useAppContext();
  const [hovered, setHovered] = useState(null);

  const roles = [
    {
      id: 'user',
      label: 'I am a Customer',
      sublabel: 'Browse & Buy',
      desc: 'Discover local products and shop with full escrow protection. Your money is safe until you collect your goods.',
      icon: <ShoppingBag size={36} strokeWidth={1.5} />,
      perks: [
        { icon: <ShieldCheck size={15}/>, text: 'Escrow payment protection' },
        { icon: <QrCode size={15}/>, text: 'QR code handover verification' },
        { icon: <ShoppingBag size={15}/>, text: 'Browse 100+ local products' },
      ],
      bg: 'bg-[#f5f5f0]',
      iconBg: 'bg-[var(--color-brand-accent)]',
      border: 'border-[#e2e0d8]',
      activeBorder: 'border-[var(--color-brand-accent)]',
    },
    {
      id: 'admin',
      label: 'I am a Shop Owner',
      sublabel: 'Sell & Manage',
      desc: 'Upload your products, manage your store, and receive payments securely through our escrow system.',
      icon: <Store size={36} strokeWidth={1.5} />,
      perks: [
        { icon: <Upload size={15}/>, text: 'Upload & manage your goods' },
        { icon: <BarChart3 size={15}/>, text: 'Full sales dashboard & reports' },
        { icon: <QrCode size={15}/>, text: 'Scan QR to release funds' },
      ],
      bg: 'bg-[var(--color-brand-accent)]',
      iconBg: 'bg-white/20',
      border: 'border-[var(--color-brand-accent)]',
      activeBorder: 'border-[var(--color-brand-accent-hover)]',
      dark: true,
    },
  ];

  return (
    <div className="min-h-screen bg-[var(--color-brand-bg)] flex flex-col items-center justify-center px-4 py-12">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <span className="font-serif italic text-3xl font-bold text-[var(--color-brand-accent)]">VakaHub</span>
        <h1 className="text-2xl font-bold text-[var(--color-brand-text)] mt-3 mb-2">
          How will you use VakaHub?
        </h1>
        <p className="text-[var(--color-brand-text-muted)] text-sm max-w-xs mx-auto">
          Choose your role to get a personalised experience built for you.
        </p>
      </motion.div>

      {/* Role Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full max-w-2xl">
        {roles.map((role, i) => (
          <motion.button
            key={role.id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.12, duration: 0.4 }}
            onClick={() => setRole(role.id)}
            onMouseEnter={() => setHovered(role.id)}
            onMouseLeave={() => setHovered(null)}
            className={`
              relative w-full text-left p-8 rounded-[2rem] border-2 transition-all duration-300 shadow-sm
              ${role.bg}
              ${hovered === role.id ? role.activeBorder + ' shadow-xl -translate-y-1' : role.border}
              focus:outline-none active:scale-[0.98]
            `}
          >
            {/* Icon */}
            <div className={`w-16 h-16 ${role.iconBg} rounded-2xl flex items-center justify-center mb-6 ${role.dark ? 'text-white' : 'text-white'}`}>
              {role.icon}
            </div>

            {/* Badge */}
            <div className={`inline-block text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3 ${role.dark ? 'bg-white/20 text-white' : 'bg-[var(--color-brand-accent)]/10 text-[var(--color-brand-accent)]'}`}>
              {role.sublabel}
            </div>

            {/* Title */}
            <h2 className={`text-xl font-bold mb-2 ${role.dark ? 'text-white' : 'text-[var(--color-brand-text)]'}`}>
              {role.label}
            </h2>

            {/* Description */}
            <p className={`text-sm leading-relaxed mb-6 ${role.dark ? 'text-white/70' : 'text-[var(--color-brand-text-muted)]'}`}>
              {role.desc}
            </p>

            {/* Perks list */}
            <ul className="space-y-2.5">
              {role.perks.map((perk, j) => (
                <li key={j} className={`flex items-center gap-2.5 text-sm ${role.dark ? 'text-white/80' : 'text-[var(--color-brand-text-muted)]'}`}>
                  <span className={role.dark ? 'text-white' : 'text-[var(--color-brand-accent)]'}>
                    {perk.icon}
                  </span>
                  {perk.text}
                </li>
              ))}
            </ul>

            {/* CTA Arrow */}
            <div className={`absolute bottom-8 right-8 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
              hovered === role.id
                ? (role.dark ? 'bg-white text-[var(--color-brand-accent)]' : 'bg-[var(--color-brand-accent)] text-white')
                : (role.dark ? 'bg-white/20 text-white' : 'bg-[#e2e0d8] text-[var(--color-brand-text-muted)]')
            }`}>
              →
            </div>
          </motion.button>
        ))}
      </div>

      {/* Footer note */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-[var(--color-brand-text-muted)] text-xs mt-8 text-center max-w-xs"
      >
        You can change your role anytime from your profile settings.
      </motion.p>
    </div>
  );
};

export default RoleSelection;
