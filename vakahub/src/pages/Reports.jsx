import React from 'react';
import { useAppContext } from '../context/AppContext';

const Reports = () => {
  const { t, sales, orders } = useAppContext();

  // Combine manual sales and released escrow orders
  const platformSales = orders.filter(o => o.status === 'released').map(o => ({
    id: o.id,
    amount: o.totalUsd,
    date: o.date,
    method: o.paymentMethod,
    refCode: o.id,
    type: 'platform',
    items: o.items.map(i => i.name).join(', ')
  }));

  const allSales = [...sales.map(s => ({ ...s, type: 'manual' })), ...platformSales].sort((a, b) => new Date(b.date) - new Date(a.date));

  const today = new Date().toDateString();
  const todaySales = allSales.filter(s => new Date(s.date).toDateString() === today);
  const todayAmount = todaySales.reduce((sum, s) => sum + parseFloat(s.amount), 0);
  const totalAmount = allSales.reduce((sum, s) => sum + parseFloat(s.amount), 0);

  const methods = ['Cash', 'EcoCash', 'Zipit'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h2 className="text-4xl font-serif text-[var(--color-brand-text)] italic">Platform Performance</h2>
        <p className="text-[var(--color-brand-text-muted)] mt-2">Combined tracking of manual records and escrow transactions.</p>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <div className="bg-[var(--color-brand-accent)] text-white p-8 rounded-[2.5rem] shadow-lg relative overflow-hidden">
          <div className="absolute -right-10 -top-10 w-48 h-48 bg-white/10 rounded-full blur-2xl"></div>
          <p className="text-white/70 text-[10px] font-bold uppercase tracking-[0.2em]">{t('todaysSales')}</p>
          <h3 className="text-5xl font-serif mt-3 font-bold">${todayAmount.toFixed(2)}</h3>
          <p className="text-white/60 text-xs mt-4">{todaySales.length} Transactions Today</p>
        </div>

        <div className="bg-[#2c3b29] text-white p-8 rounded-[2.5rem] shadow-lg relative overflow-hidden">
          <p className="text-white/70 text-[10px] font-bold uppercase tracking-[0.2em]">Total Revenue</p>
          <h3 className="text-5xl font-serif mt-3 font-bold">${totalAmount.toFixed(2)}</h3>
          <p className="text-white/60 text-xs mt-4">{allSales.length} Total Sales</p>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] border border-[#e2e0d8] flex flex-col justify-between">
          <div>
            <p className="text-[var(--color-brand-text-muted)] text-[10px] font-bold uppercase tracking-[0.2em]">Escrow Health</p>
            <h3 className="text-3xl font-serif mt-2 text-[var(--color-brand-text)] font-bold">{orders.length} Active Orders</h3>
          </div>
          <div className="flex space-x-2 mt-4">
            <div className="bg-green-100 text-green-700 text-[10px] px-3 py-1 rounded-full font-bold">
              {orders.filter(o => o.status === 'released').length} Released
            </div>
            <div className="bg-amber-100 text-amber-700 text-[10px] px-3 py-1 rounded-full font-bold">
              {orders.filter(o => o.status === 'pending').length} Pending
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Payment Methods */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-[2.5rem] shadow-sm border border-[#e2e0d8] p-8">
            <h4 className="font-serif text-xl font-bold text-[var(--color-brand-text)] mb-8 italic">Method Distribution</h4>
            <div className="space-y-6">
              {methods.map(method => {
                const ms = allSales.filter(s => s.method === method);
                const amt = ms.reduce((sum, s) => sum + parseFloat(s.amount), 0);
                const pct = allSales.length > 0 ? (ms.length / allSales.length) * 100 : 0;
                return (
                  <div key={method}>
                    <div className="flex justify-between text-xs mb-2">
                      <span className="font-bold text-[var(--color-brand-text)] uppercase tracking-widest">{method}</span>
                      <span className="text-[var(--color-brand-text-muted)]">${amt.toFixed(2)}</span>
                    </div>
                    <div className="w-full bg-[#f0eee4] rounded-full h-1.5 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        className="bg-[var(--color-brand-accent)] h-full transition-all duration-1000"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Global Transaction History */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-[2.5rem] shadow-sm border border-[#e2e0d8] overflow-hidden">
            <div className="p-8 border-b border-[#f0eee4] flex justify-between items-center">
              <h4 className="font-serif text-xl font-bold text-[var(--color-brand-text)] italic">{t('recentTransactions')}</h4>
              <span className="text-[10px] font-bold text-[var(--color-brand-text-muted)] uppercase tracking-widest">{allSales.length} Records</span>
            </div>
            <div className="divide-y divide-[#f0eee4]">
              {allSales.length === 0 && (
                <div className="p-12 text-center text-[var(--color-brand-text-muted)] italic">No sales recorded yet.</div>
              )}
              {allSales.map(sale => (
                <div key={sale.id} className="p-6 hover:bg-[#fcfcfa] transition-colors flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xs font-bold ${
                      sale.type === 'platform' ? 'bg-[#e8faed] text-[#2e7d32]' : 'bg-[#f0eee4] text-[var(--color-brand-text)]'
                    }`}>
                      {sale.type === 'platform' ? 'ESC' : 'MAN'}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[var(--color-brand-text)]">{sale.items || 'Manual Entry'}</p>
                      <p className="text-[10px] text-[var(--color-brand-text-muted)] uppercase tracking-widest font-medium">
                        {new Date(sale.date).toLocaleDateString()} · {sale.method} · {sale.refCode}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-serif font-bold text-[var(--color-brand-accent)]">+${parseFloat(sale.amount).toFixed(2)}</p>
                    <p className="text-[9px] text-[var(--color-brand-text-muted)] font-bold uppercase tracking-widest">{sale.type}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
