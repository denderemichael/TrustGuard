import React from 'react';
import { useAppContext } from '../context/AppContext';

const Reports = () => {
  const { t, sales } = useAppContext();

  const today = new Date().toDateString();
  const todaySales = sales.filter(s => new Date(s.date).toDateString() === today);
  const todayAmount = todaySales.reduce((sum, s) => sum + parseFloat(s.amount), 0);
  const weeklyAmount = sales.reduce((sum, s) => sum + parseFloat(s.amount), 0);

  const methods = ['Cash', 'EcoCash', 'Zipit'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h2 className="text-4xl font-serif text-[var(--color-brand-text)]">{t('reports')}</h2>
        <p className="text-[var(--color-brand-text-muted)] mt-2">Track your sales performance</p>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-[var(--color-brand-accent)] text-white p-8 rounded-[2rem] shadow-lg relative overflow-hidden">
          <div className="absolute -right-10 -top-10 w-48 h-48 bg-white/10 rounded-full blur-2xl"></div>
          <p className="text-white/70 text-sm font-medium uppercase tracking-wider">{t('todaysSales')}</p>
          <h3 className="text-5xl font-serif mt-3">${todayAmount.toFixed(2)}</h3>
          <p className="text-white/60 text-sm mt-4">{todaySales.length} {t('sales').toLowerCase()}</p>
        </div>

        <div className="bg-[#f0eee4] p-8 rounded-[2rem] border border-[#e2e0d8]">
          <p className="text-[var(--color-brand-text-muted)] text-sm font-medium uppercase tracking-wider">{t('weeklySales')}</p>
          <h3 className="text-5xl font-serif mt-3 text-[var(--color-brand-text)]">${weeklyAmount.toFixed(2)}</h3>
          <p className="text-[var(--color-brand-text-muted)] text-sm mt-4">{sales.length} {t('sales').toLowerCase()} total</p>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Payment Breakdown */}
        <div className="bg-white rounded-[2rem] shadow-sm border border-[#e2e0d8] p-8">
          <h4 className="font-serif text-xl text-[var(--color-brand-text)] mb-6">{t('paymentMethod')} Breakdown</h4>
          <div className="space-y-5">
            {methods.map(method => {
              const ms = sales.filter(s => s.method === method);
              const amt = ms.reduce((sum, s) => sum + parseFloat(s.amount), 0);
              const pct = sales.length > 0 ? (ms.length / sales.length) * 100 : 0;
              return (
                <div key={method}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium text-[var(--color-brand-text)]">{t(method.toLowerCase())}</span>
                    <span className="text-[var(--color-brand-text-muted)]">${amt.toFixed(2)} · {ms.length} {t('sales').toLowerCase()}</span>
                  </div>
                  <div className="w-full bg-[#f0eee4] rounded-full h-2.5">
                    <div
                      className="bg-[var(--color-brand-accent)] h-2.5 rounded-full transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
          {sales.length === 0 && (
            <p className="text-center text-[var(--color-brand-text-muted)] italic text-sm mt-6">{t('noSales')}</p>
          )}
        </div>

        {/* Recent Sales List */}
        <div className="bg-white rounded-[2rem] shadow-sm border border-[#e2e0d8] p-8">
          <h4 className="font-serif text-xl text-[var(--color-brand-text)] mb-6">{t('recentTransactions')}</h4>
          <div className="space-y-4">
            {sales.length === 0 && (
              <p className="text-[var(--color-brand-text-muted)] italic text-sm">{t('noSales')}</p>
            )}
            {sales.slice(0, 6).map(sale => (
              <div key={sale.id} className="flex justify-between items-center py-3 border-b border-[#f0eee4] last:border-0">
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 bg-[#f0eee4] rounded-full flex items-center justify-center text-[var(--color-brand-accent)] text-xs font-bold shrink-0">
                    {sale.method.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-medium font-mono uppercase">{sale.refCode || `TXN-${sale.id.toString().slice(-4)}`}</p>
                    <p className="text-xs text-[var(--color-brand-text-muted)]">
                      {new Date(sale.date).toLocaleDateString()} · {new Date(sale.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
                <p className="font-serif font-semibold text-[var(--color-brand-accent)]">+${parseFloat(sale.amount).toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
