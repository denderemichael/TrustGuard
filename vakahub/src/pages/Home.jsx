import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, CreditCard, MapPin, Truck, ShoppingBasket, HeartPulse, Palette, Shirt, Scissors, Sparkles, Laptop, LayoutGrid } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const Home = ({ setCurrentTab }) => {
  const { t, role, sales, products } = useAppContext();

  const todaySalesAmount = sales
    .filter(s => new Date(s.date).toDateString() === new Date().toDateString())
    .reduce((sum, s) => sum + parseFloat(s.amount), 0);

  // ─── CUSTOMER VIEW ───────────────────────────────────────────────
  if (role === 'user') {
    return (
      <div className="w-full">
        {/* Hero */}
        <div className="relative bg-[#ebe8de] overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 flex flex-col md:flex-row items-center gap-16">
            <div className="md:w-1/2 z-10">
              <h1 className="text-5xl md:text-7xl font-serif text-[var(--color-brand-text)] mb-6 leading-tight italic whitespace-pre-line">
                {t('heroTitle')}
              </h1>
              <p className="text-lg text-[var(--color-brand-text-muted)] mb-8 max-w-md leading-relaxed">
                {t('heroSub')}
              </p>
              <button
                onClick={() => setCurrentTab('products')}
                className="bg-[var(--color-brand-accent)] text-white px-8 py-4 rounded-full text-lg font-medium shadow-lg hover:shadow-xl transition-all hover:bg-[var(--color-brand-accent-hover)]"
              >
                {t('exploreCollection')}
              </button>
            </div>

            {/* Hero image collage */}
            <div className="md:w-1/2 relative flex justify-center items-center gap-4">
              <div className="w-44 h-60 rounded-[2rem] overflow-hidden shadow-xl border border-[#e2e0d8] mt-8">
                <img src="/kanva_product_2_1777125005142.png" alt="Product" className="w-full h-full object-cover" />
              </div>
              <div className="w-44 h-60 rounded-[2rem] overflow-hidden shadow-xl border border-[#e2e0d8] -mt-8">
                <img src="/kanva_product_3_1777125168090.png" alt="Product" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>

        {/* Trust badges */}
        <div className="bg-white border-y border-[#e2e0d8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-wrap justify-center gap-8 md:gap-16">
            {[
              { icon: <ShieldCheck size={20} />, text: 'QR Escrow Protected' },
              { icon: <CreditCard size={20} />, text: 'EcoCash · Zipit · Cash' },
              { icon: <MapPin size={20} />, text: 'Local First' },
              { icon: <Truck size={20} />, text: 'Same-Day Handover' }
            ].map((b, i) => (
              <div key={i} className="flex items-center space-x-3 text-[var(--color-brand-text-muted)]">
                <div className="text-[var(--color-brand-accent)]">{b.icon}</div>
                <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em]">{b.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Browse by Sector */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="mb-12">
            <h2 className="text-3xl font-serif text-[var(--color-brand-text)] italic">Browse by Sector</h2>
            <p className="text-[var(--color-brand-text-muted)] mt-2">Explore specialized local markets across Zimbabwe.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {[
              { name: 'All', icon: <LayoutGrid size={24} />, color: 'bg-gray-100' },
              { name: 'Groceries', icon: <ShoppingBasket size={24} />, color: 'bg-emerald-50' },
              { name: 'Health', icon: <HeartPulse size={24} />, color: 'bg-rose-50' },
              { name: 'Art', icon: <Palette size={24} />, color: 'bg-amber-50' },
              { name: 'Clothing', icon: <Shirt size={24} />, color: 'bg-blue-50' },
              { name: 'Hair', icon: <Scissors size={24} />, color: 'bg-purple-50' },
              { name: 'Makeup', icon: <Sparkles size={24} />, color: 'bg-pink-50' },
              { name: 'Electronics', icon: <Laptop size={24} />, color: 'bg-cyan-50' },
            ].map((sector) => (
              <button 
                key={sector.name}
                onClick={() => setCurrentTab('products')}
                className="group flex flex-col items-center justify-center p-6 rounded-[2.5rem] border border-[#e2e0d8] hover:border-[var(--color-brand-accent)] hover:shadow-xl transition-all bg-white"
              >
                <div className={`w-14 h-14 ${sector.color} rounded-[1.5rem] flex items-center justify-center text-[var(--color-brand-text)] mb-4 group-hover:scale-110 transition-transform`}>
                  {sector.icon}
                </div>
                <span className="text-[9px] font-bold uppercase tracking-widest text-[var(--color-brand-text-muted)] group-hover:text-[var(--color-brand-text)]">
                  {sector.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Featured Products */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-serif text-[var(--color-brand-text)]">{t('featuredCollections')}</h2>
              <p className="text-[var(--color-brand-text-muted)] mt-2">{t('curatedForYou')}</p>
            </div>
            <button onClick={() => setCurrentTab('products')} className="text-[var(--color-brand-accent)] font-medium hover:underline hidden md:block">
              {t('viewAll')}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.slice(0, 4).map(p => (
              <div key={p.id} className="group cursor-pointer" onClick={() => setCurrentTab('products')}>
                <div className="bg-white aspect-[4/5] rounded-3xl shadow-sm border border-[#e2e0d8] flex items-center justify-center mb-4 transition-all group-hover:shadow-md relative overflow-hidden">
                  <div className="absolute top-3 left-3 bg-[#2c3b29] text-white px-2.5 py-0.5 rounded-full text-[11px] font-semibold z-10">{t('local')}</div>
                  {p.image ? (
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  ) : (
                    <div className="w-24 h-24 bg-[#f0eee4] rounded-full flex items-center justify-center text-[var(--color-brand-accent)] font-serif italic text-4xl">
                      {p.name.charAt(0)}
                    </div>
                  )}
                </div>
                <h3 className="font-medium text-[var(--color-brand-text)] text-lg">{p.name}</h3>
                <p className="text-[var(--color-brand-accent)] font-serif font-semibold text-xl mt-1">${p.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ─── ADMIN DASHBOARD ─────────────────────────────────────────────
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-end mb-12 border-b border-[#e2e0d8] pb-6">
        <div>
          <p className="text-[var(--color-brand-text-muted)] text-sm uppercase tracking-wider mb-1">{t('welcome')}</p>
          <h1 className="text-4xl font-serif text-[var(--color-brand-text)]">{t('shopName')} {t('dashboard')}</h1>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setCurrentTab('escrow')}
            className="bg-[#f0eee4] text-[var(--color-brand-accent)] px-5 py-2 rounded-xl border border-[#e2e0d8] text-sm font-medium hover:bg-[#e2e0d8] transition-colors"
          >
            🔐 {t('scanQr')}
          </button>
          <button className="bg-white px-4 py-2 rounded-lg border border-[#e2e0d8] text-sm font-medium shadow-sm hover:bg-[#fcfcfa]">
            {t('downloadReport')}
          </button>
          <div className="w-12 h-12 bg-white rounded-full flex justify-center items-center border border-[#e2e0d8] shadow-sm">
            <span className="font-serif font-bold text-xl text-[var(--color-brand-accent)]">MS</span>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="bg-[var(--color-brand-accent)] text-white p-8 rounded-[2rem] shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl"></div>
          <p className="text-white/80 text-sm font-medium uppercase tracking-wider">{t('todaysSales')}</p>
          <h2 className="text-5xl font-serif mt-3">${todaySalesAmount.toFixed(2)}</h2>
          <p className="text-white/60 text-xs mt-4">{t('fromYesterday')}</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="bg-white p-8 rounded-[2rem] shadow-sm border border-[#e2e0d8] relative overflow-hidden">
          <p className="text-[var(--color-brand-text-muted)] text-sm font-medium uppercase tracking-wider mb-3">{t('totalProducts')}</p>
          <p className="text-5xl font-serif text-[var(--color-brand-text)]">{products.length}</p>
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-[#f0eee4] opacity-50 rounded-tl-full"></div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="bg-white p-8 rounded-[2rem] shadow-sm border border-[#e2e0d8] relative overflow-hidden">
          <p className="text-[var(--color-brand-text-muted)] text-sm font-medium uppercase tracking-wider mb-3">{t('totalCustomers')}</p>
          <p className="text-5xl font-serif text-[var(--color-brand-text)]">12</p>
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-[#f0eee4] opacity-50 rounded-tl-full"></div>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Transactions */}
        <div className="lg:col-span-2 bg-white rounded-[2rem] shadow-sm border border-[#e2e0d8] p-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-serif text-2xl text-[var(--color-brand-text)]">{t('recentTransactions')}</h3>
            <button className="text-sm font-medium text-[var(--color-brand-accent)] hover:underline">{t('viewAll')}</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[var(--color-brand-text-muted)] text-sm border-b border-[#e2e0d8]">
                  <th className="pb-3 font-medium">{t('transactionId')}</th>
                  <th className="pb-3 font-medium">{t('time')}</th>
                  <th className="pb-3 font-medium">{t('method')}</th>
                  <th className="pb-3 font-medium text-right">{t('amount')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f0eee4]">
                {sales.length === 0 && (
                  <tr>
                    <td colSpan="4" className="py-8 text-center text-[var(--color-brand-text-muted)] italic text-sm">{t('noSales')}</td>
                  </tr>
                )}
                {sales.slice(0, 5).map((sale) => (
                  <tr key={sale.id} className="hover:bg-[#fcfcfa] transition-colors">
                    <td className="py-4 text-sm font-medium uppercase font-mono">{sale.refCode || `TXN-${sale.id.toString().slice(-4)}`}</td>
                    <td className="py-4 text-sm text-[var(--color-brand-text-muted)]">
                      {new Date(sale.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td className="py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#f0eee4] text-[var(--color-brand-accent)]">
                        {sale.method}
                      </span>
                    </td>
                    <td className="py-4 font-serif font-semibold text-right">${parseFloat(sale.amount).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="lg:col-span-1 bg-[#f0eee4] rounded-[2rem] shadow-inner border border-[#e2e0d8] p-8">
          <h3 className="font-serif text-2xl text-[var(--color-brand-text)] mb-6">{t('quickActions')}</h3>
          <div className="space-y-4">
            {[
              { label: t('recordSale'), tab: 'record' },
              { label: t('addProduct'), tab: 'products' },
              { label: t('advertise'), tab: 'advertise' },
              { label: `🔐 ${t('scanQr')}`, tab: 'escrow' },
              { label: t('sendSms'), tab: null },
            ].map((action) => (
              <button
                key={action.label}
                onClick={() => action.tab && setCurrentTab(action.tab)}
                className="w-full bg-white p-4 rounded-2xl shadow-sm border border-[#e2e0d8] flex items-center justify-between hover:border-[var(--color-brand-accent)] transition-all group"
              >
                <span className="font-medium text-[var(--color-brand-text)] text-sm">{action.label}</span>
                <span className="w-7 h-7 rounded-full bg-[var(--color-brand-bg)] flex items-center justify-center text-[var(--color-brand-accent)] group-hover:bg-[var(--color-brand-accent)] group-hover:text-white transition-colors text-lg">
                  →
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
