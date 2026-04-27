import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, CreditCard, MapPin, Truck, ShoppingBasket, HeartPulse, Palette, Shirt, Scissors, Sparkles, Laptop, LayoutGrid, ArrowRight, Star, ChevronRight } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const SECTORS = [
  { name: 'All',         icon: <LayoutGrid size={16} /> },
  { name: 'Groceries',   icon: <ShoppingBasket size={16} /> },
  { name: 'Health',      icon: <HeartPulse size={16} /> },
  { name: 'Art',         icon: <Palette size={16} /> },
  { name: 'Clothing',    icon: <Shirt size={16} /> },
  { name: 'Hair',        icon: <Scissors size={16} /> },
  { name: 'Makeup',      icon: <Sparkles size={16} /> },
  { name: 'Electronics', icon: <Laptop size={16} /> },
];

const TESTIMONIALS = [
  { name: 'Rutendo M.', role: 'Harare Shopper', stars: 5, text: 'VakaHub changed how I shop. Money held in escrow, released only when I had goods in hand. Zero stress!' },
  { name: 'Takudzwa N.', role: 'Bulawayo Trader', stars: 5, text: 'Sold 40+ products through VakaHub. The QR release system means customers always trust me. Sales up 3x.' },
];

const Home = ({ setCurrentTab }) => {
  const { t, role, sales, products, addToCart } = useAppContext();
  const [sector, setSector] = useState('All');

  const todaySales = sales
    .filter(s => new Date(s.date).toDateString() === new Date().toDateString())
    .reduce((sum, s) => sum + parseFloat(s.amount), 0);

  const filtered = sector === 'All' ? products : products.filter(p => p.category === sector);

  /* ── ADMIN VIEW ─────────────────────────────── */
  if (role === 'admin') {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-end mb-12 border-b border-[#e2e0d8] pb-6">
          <div>
            <p className="text-[var(--color-brand-text-muted)] text-sm uppercase tracking-wider mb-1">{t('welcome')}</p>
            <h1 className="text-4xl font-serif text-[var(--color-brand-text)]">{t('shopName')} {t('dashboard')}</h1>
          </div>
          <div className="flex gap-3">
            <button onClick={() => setCurrentTab('orders')} className="bg-[#f0eee4] text-[var(--color-brand-accent)] px-5 py-2 rounded-xl border border-[#e2e0d8] text-sm font-medium">🔐 {t('scanQr')}</button>
            <button className="bg-white px-4 py-2 rounded-lg border border-[#e2e0d8] text-sm font-medium">{t('downloadReport')}</button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            { label: t('todaysSales'), value: `$${todaySales.toFixed(2)}`, accent: true },
            { label: t('totalProducts'), value: products.length },
            { label: t('totalCustomers'), value: sales.length },
          ].map((c, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              className={`p-8 rounded-[2rem] shadow-sm relative overflow-hidden ${c.accent ? 'bg-[var(--color-brand-accent)] text-white' : 'bg-white border border-[#e2e0d8]'}`}>
              <p className={`text-sm font-medium uppercase tracking-wider mb-3 ${c.accent ? 'text-white/70' : 'text-[var(--color-brand-text-muted)]'}`}>{c.label}</p>
              <p className={`text-5xl font-serif ${c.accent ? '' : 'text-[var(--color-brand-text)]'}`}>{c.value}</p>
              {!c.accent && <div className="absolute bottom-0 right-0 w-32 h-32 bg-[#f0eee4] opacity-50 rounded-tl-full"/>}
            </motion.div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white rounded-[2rem] border border-[#e2e0d8] p-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-serif text-2xl text-[var(--color-brand-text)]">{t('recentTransactions')}</h3>
              <button className="text-sm text-[var(--color-brand-accent)] hover:underline">{t('viewAll')}</button>
            </div>
            <table className="w-full text-left">
              <thead><tr className="text-[var(--color-brand-text-muted)] text-sm border-b border-[#e2e0d8]">
                <th className="pb-3 font-medium">{t('transactionId')}</th>
                <th className="pb-3 font-medium">{t('time')}</th>
                <th className="pb-3 font-medium">{t('method')}</th>
                <th className="pb-3 font-medium text-right">{t('amount')}</th>
              </tr></thead>
              <tbody className="divide-y divide-[#f0eee4]">
                {sales.length === 0
                  ? <tr><td colSpan="4" className="py-8 text-center text-[var(--color-brand-text-muted)] italic text-sm">{t('noSales')}</td></tr>
                  : sales.slice(0,5).map(s => (
                    <tr key={s.id} className="hover:bg-[#fcfcfa]">
                      <td className="py-4 text-sm font-mono font-medium">{s.refCode || `TXN-${s.id.toString().slice(-4)}`}</td>
                      <td className="py-4 text-sm text-[var(--color-brand-text-muted)]">{new Date(s.date).toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})}</td>
                      <td className="py-4"><span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#f0eee4] text-[var(--color-brand-accent)]">{s.method}</span></td>
                      <td className="py-4 font-serif font-semibold text-right">${parseFloat(s.amount).toFixed(2)}</td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
          <div className="bg-[#f0eee4] rounded-[2rem] border border-[#e2e0d8] p-8">
            <h3 className="font-serif text-2xl text-[var(--color-brand-text)] mb-6">{t('quickActions')}</h3>
            <div className="space-y-4">
              {[{label:t('recordSale'),tab:'record'},{label:t('addProduct'),tab:'products'},{label:t('advertise'),tab:'advertise'},{label:`🔐 ${t('scanQr')}`,tab:'orders'},{label:t('sendSms'),tab:null}]
                .map(a => (
                  <button key={a.label} onClick={() => a.tab && setCurrentTab(a.tab)}
                    className="w-full bg-white p-4 rounded-2xl border border-[#e2e0d8] flex items-center justify-between hover:border-[var(--color-brand-accent)] group transition-all">
                    <span className="font-medium text-[var(--color-brand-text)] text-sm">{a.label}</span>
                    <span className="w-7 h-7 rounded-full bg-[var(--color-brand-bg)] flex items-center justify-center text-[var(--color-brand-accent)] group-hover:bg-[var(--color-brand-accent)] group-hover:text-white transition-colors">→</span>
                  </button>
                ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ── USER LANDING PAGE ─────────────────────── */
  return (
    <div className="w-full">

      {/* HERO */}
      <section className="bg-[var(--color-brand-bg)] pt-16 pb-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div className="lg:w-1/2 z-10">
            <span className="inline-flex items-center gap-2 bg-[var(--color-brand-accent)]/10 text-[var(--color-brand-accent)] text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
              <ShieldCheck size={13}/> 100% Escrow Protected
            </span>
            <h1 className="text-5xl md:text-7xl font-serif text-[var(--color-brand-text)] mb-6 leading-tight italic">
              Discover<br/>Zimbabwe's<br/><span className="not-italic font-bold">Best Local Goods</span>
            </h1>
            <p className="text-lg text-[var(--color-brand-text-muted)] mb-8 max-w-md leading-relaxed">
              Buy and sell with confidence. Your funds stay locked in secure escrow until you personally confirm handover with a QR scan.
            </p>
            <div className="flex flex-wrap gap-4">
              <button onClick={() => setCurrentTab('products')}
                className="bg-[var(--color-brand-accent)] text-white px-8 py-4 rounded-full font-semibold hover:bg-[var(--color-brand-accent-hover)] transition-all flex items-center gap-2 shadow-lg">
                Explore Collection <ArrowRight size={16}/>
              </button>
              <button onClick={() => setCurrentTab('orders')}
                className="bg-white text-[var(--color-brand-text)] px-8 py-4 rounded-full font-semibold border border-[#e2e0d8] hover:border-[var(--color-brand-accent)] transition-all">
                How it Works
              </button>
            </div>
          </div>

          {/* Staggered collage */}
          <div className="lg:w-1/2 grid grid-cols-2 gap-4">
            {products.slice(0,4).map((p,i) => (
              <motion.div key={p.id}
                initial={{ opacity:0, y: i%2===0 ? 30 : -30 }}
                animate={{ opacity:1, y:0 }}
                transition={{ delay: i*0.12, duration:0.6 }}
                className={`overflow-hidden rounded-3xl shadow-lg cursor-pointer group ${i%2!==0?'mt-10':''}`}
                onClick={() => setCurrentTab('products')}>
                <div className="aspect-[4/5] overflow-hidden">
                  {p.image
                    ? <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"/>
                    : <div className="w-full h-full bg-[#f0eee4] flex items-center justify-center text-4xl font-serif italic text-[var(--color-brand-text-muted)]">{p.name.charAt(0)}</div>}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST BADGES */}
      <div className="border-y border-[#e2e0d8] bg-white">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-wrap justify-center gap-8 md:gap-16">
          {[{icon:<ShieldCheck size={16}/>,text:'QR Escrow Protected'},{icon:<CreditCard size={16}/>,text:'EcoCash · Zipit · Cash'},{icon:<MapPin size={16}/>,text:'Local First'},{icon:<Truck size={16}/>,text:'Same-Day Handover'}]
            .map((b,i) => (
              <div key={i} className="flex items-center gap-2 text-[var(--color-brand-text-muted)]">
                <div className="text-[var(--color-brand-accent)]">{b.icon}</div>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em]">{b.text}</span>
              </div>
            ))}
        </div>
      </div>

      {/* TOP SECTORS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-serif italic text-[var(--color-brand-text)]">Top Sectors</h2>
            <p className="text-[var(--color-brand-text-muted)] mt-1 text-sm">Browse Zimbabwe's most active local markets.</p>
          </div>
          <button onClick={() => setCurrentTab('products')} className="hidden md:flex items-center gap-1 text-sm font-semibold text-[var(--color-brand-accent)] hover:underline">
            Explore all <ChevronRight size={14}/>
          </button>
        </div>

        {/* Sector tabs */}
        <div className="flex flex-wrap gap-2 mb-10">
          {SECTORS.map(s => (
            <button key={s.name} onClick={() => setSector(s.name)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold border transition-all ${
                sector === s.name
                  ? 'bg-[var(--color-brand-accent)] text-white border-[var(--color-brand-accent)] shadow'
                  : 'bg-white text-[var(--color-brand-text-muted)] border-[#e2e0d8] hover:border-[var(--color-brand-accent)]'
              }`}>
              {s.icon} {s.name}
            </button>
          ))}
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <AnimatePresence>
            {filtered.slice(0, 8).map((p, i) => (
              <motion.div key={p.id}
                initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:i*0.05 }}
                className="group cursor-pointer" onClick={() => setCurrentTab('products')}>
                <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-[#f0eee4] mb-3 relative shadow-sm group-hover:shadow-xl transition-shadow">
                  <span className="absolute top-3 left-3 z-10 bg-white text-[var(--color-brand-accent)] text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">
                    {p.category}
                  </span>
                  {p.image
                    ? <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"/>
                    : <div className="w-full h-full flex items-center justify-center text-5xl font-serif italic text-[var(--color-brand-text-muted)]">{p.name.charAt(0)}</div>}
                </div>
                <h3 className="font-semibold text-[var(--color-brand-text)] text-sm truncate">{p.name}</h3>
                <div className="flex items-center justify-between mt-1">
                  <p className="text-[var(--color-brand-accent)] font-bold font-serif">${p.price?.toFixed(2)}</p>
                  <button onClick={e => { e.stopPropagation(); addToCart(p); }}
                    className="text-[10px] bg-[var(--color-brand-accent)] text-white px-3 py-1.5 rounded-full font-semibold hover:bg-[var(--color-brand-accent-hover)] transition-colors">
                    Add
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        <div className="flex justify-center mt-12">
          <button onClick={() => setCurrentTab('products')}
            className="border border-[#e2e0d8] text-[var(--color-brand-text-muted)] px-10 py-3.5 rounded-full font-semibold hover:border-[var(--color-brand-accent)] hover:text-[var(--color-brand-accent)] transition-all text-sm">
            Explore all {filtered.length} products →
          </button>
        </div>
      </section>

      {/* FEATURED EDITORIAL */}
      <section className="bg-[#f0eee4] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <h2 className="text-3xl font-serif italic text-[var(--color-brand-text)]">Featured Picks</h2>
            <p className="text-[var(--color-brand-text-muted)] mt-1 text-sm">Hand-selected premium items from local sellers.</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 relative rounded-3xl overflow-hidden cursor-pointer group shadow-lg" style={{minHeight:'420px'}} onClick={() => setCurrentTab('products')}>
              {products[2]?.image && <img src={products[2].bgImage||products[2].image} alt="" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"/>}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"/>
              <div className="absolute bottom-0 left-0 p-8">
                <span className="text-xs font-bold uppercase tracking-widest text-white/60 mb-2 block">{products[2]?.category}</span>
                <h3 className="text-2xl font-serif font-bold text-white mb-2">{products[2]?.name}</h3>
                <p className="text-white/70 text-sm mb-4">Locally sourced · Escrow protected · QR handover</p>
                <div className="flex items-center gap-4">
                  <span className="text-white font-bold text-xl">${products[2]?.price?.toFixed(2)}</span>
                  <button onClick={e=>{e.stopPropagation();if(products[2])addToCart(products[2]);}}
                    className="bg-white text-[var(--color-brand-text)] px-5 py-2 rounded-full text-sm font-semibold hover:bg-[var(--color-brand-accent)] hover:text-white transition-colors">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              {products.slice(5,8).map(p => (
                <div key={p.id} className="bg-white rounded-2xl flex gap-3 p-3 shadow-sm border border-[#e2e0d8] cursor-pointer group hover:shadow-md transition-shadow" onClick={() => setCurrentTab('products')}>
                  <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                    {p.image
                      ? <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
                      : <div className="w-full h-full bg-[#f0eee4] flex items-center justify-center text-2xl font-serif italic text-[var(--color-brand-text-muted)]">{p.name.charAt(0)}</div>}
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col justify-center">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-brand-accent)] mb-1">{p.category}</span>
                    <h4 className="font-semibold text-[var(--color-brand-text)] text-sm truncate">{p.name}</h4>
                    <p className="text-[var(--color-brand-accent)] font-bold font-serif mt-1">${p.price?.toFixed(2)}</p>
                  </div>
                  <ChevronRight size={16} className="text-[#d4d0c4] self-center group-hover:text-[var(--color-brand-accent)] transition-colors"/>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="mb-10">
          <h2 className="text-3xl font-serif italic text-[var(--color-brand-text)]">Trader Highlights</h2>
          <p className="text-[var(--color-brand-text-muted)] mt-1 text-sm">Real buyers & sellers sharing their VakaHub experience.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TESTIMONIALS.map((item,i) => (
            <motion.div key={i}
              initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:i*0.1 }}
              className="bg-[#f0eee4] border border-[#e2e0d8] rounded-3xl p-8">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-12 h-12 rounded-full bg-[var(--color-brand-accent)] flex items-center justify-center text-white font-bold text-lg">
                  {item.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-[var(--color-brand-text)]">{item.name}</p>
                  <p className="text-xs text-[var(--color-brand-text-muted)]">{item.role}</p>
                </div>
              </div>
              <div className="flex gap-0.5 mb-4">
                {Array.from({length:item.stars}).map((_,j) => <Star key={j} size={13} className="fill-amber-400 text-amber-400"/>)}
              </div>
              <p className="text-[var(--color-brand-text-muted)] leading-relaxed italic text-sm">"{item.text}"</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="bg-[var(--color-brand-accent)] py-20">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-serif italic text-white mb-3">Get the Best Deals Straight to You</h2>
          <p className="text-white/70 mb-10 text-sm">Stay updated with the latest drops from local sellers across Zimbabwe.</p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input type="email" placeholder="Enter your email"
              className="flex-1 px-5 py-3.5 rounded-full text-sm bg-white/10 text-white placeholder-white/40 border border-white/20 focus:outline-none focus:border-white/50"/>
            <button className="bg-white text-[var(--color-brand-accent)] px-8 py-3.5 rounded-full font-bold hover:bg-[#f0eee4] transition-colors text-sm">
              Subscribe
            </button>
          </div>
          <p className="text-white/40 text-xs mt-4">We respect your privacy. Unsubscribe anytime.</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
