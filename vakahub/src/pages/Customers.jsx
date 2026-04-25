import React, { useState } from 'react';
import { MessageCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const mockCustomers = [
  { id: 1, name: 'Tendai Moyo', orders: 5, spent: 45.00, location: 'Harare' },
  { id: 2, name: 'Rudo Chikwanda', orders: 2, spent: 12.50, location: 'Bulawayo' },
  { id: 3, name: 'Farai Mutasa', orders: 8, spent: 120.00, location: 'Mutare' },
  { id: 4, name: 'Blessing Dube', orders: 3, spent: 37.00, location: 'Gweru' },
];

const Customers = () => {
  const { t } = useAppContext();
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const handleMessage = (name) => {
    alert(`${t('sendMessage')}: "${t('newStockMsg')}" → ${name}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h2 className="text-4xl font-serif text-[var(--color-brand-text)]">{t('customers')}</h2>
        <p className="text-[var(--color-brand-text-muted)] mt-2">{mockCustomers.length} {t('totalCustomers').toLowerCase()}</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <div className="bg-[var(--color-brand-accent)] text-white p-6 rounded-[2rem] shadow-lg">
          <p className="text-white/70 text-sm uppercase tracking-wider">{t('totalCustomers')}</p>
          <p className="text-4xl font-serif mt-2">{mockCustomers.length}</p>
        </div>
        <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-[#e2e0d8]">
          <p className="text-[var(--color-brand-text-muted)] text-sm uppercase tracking-wider">{t('totalSpent')}</p>
          <p className="text-4xl font-serif mt-2 text-[var(--color-brand-text)]">
            ${mockCustomers.reduce((s, c) => s + c.spent, 0).toFixed(2)}
          </p>
        </div>
        <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-[#e2e0d8]">
          <p className="text-[var(--color-brand-text-muted)] text-sm uppercase tracking-wider">{t('orders')}</p>
          <p className="text-4xl font-serif mt-2 text-[var(--color-brand-text)]">
            {mockCustomers.reduce((s, c) => s + c.orders, 0)}
          </p>
        </div>
      </div>

      {/* Customer Table */}
      <div className="bg-white rounded-[2rem] shadow-sm border border-[#e2e0d8] overflow-hidden">
        <div className="p-6 border-b border-[#f0eee4]">
          <h3 className="font-serif text-xl text-[var(--color-brand-text)]">{t('customers')}</h3>
        </div>
        <div className="divide-y divide-[#f0eee4]">
          {mockCustomers.map(c => (
            <div key={c.id}>
              <div
                onClick={() => setSelectedCustomer(selectedCustomer === c.id ? null : c.id)}
                className="px-6 py-4 flex items-center justify-between hover:bg-[#fcfcfa] transition-colors cursor-pointer"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-[#f0eee4] rounded-full flex items-center justify-center text-[var(--color-brand-accent)] font-serif italic text-lg shrink-0">
                    {c.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-[var(--color-brand-text)]">{c.name}</p>
                    <p className="text-xs text-[var(--color-brand-text-muted)] mt-0.5">{c.location} · {c.orders} {t('orders').toLowerCase()}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-6">
                  <p className="font-serif font-semibold text-[var(--color-brand-accent)] hidden sm:block">${c.spent.toFixed(2)}</p>
                  {selectedCustomer === c.id ? <ChevronUp size={18} className="text-[var(--color-brand-text-muted)]" /> : <ChevronDown size={18} className="text-[var(--color-brand-text-muted)]" />}
                </div>
              </div>

              {selectedCustomer === c.id && (
                <div className="px-6 pb-5 pt-1 bg-[#fcfcfa] border-t border-[#f0eee4]">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="grid grid-cols-3 gap-6">
                      <div>
                        <p className="text-xs text-[var(--color-brand-text-muted)] uppercase tracking-wider">{t('orders')}</p>
                        <p className="font-semibold mt-1 text-[var(--color-brand-text)]">{c.orders}</p>
                      </div>
                      <div>
                        <p className="text-xs text-[var(--color-brand-text-muted)] uppercase tracking-wider">{t('totalSpent')}</p>
                        <p className="font-semibold mt-1 text-[var(--color-brand-text)]">${c.spent.toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-[var(--color-brand-text-muted)] uppercase tracking-wider">City</p>
                        <p className="font-semibold mt-1 text-[var(--color-brand-text)]">{c.location}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleMessage(c.name)}
                      className="bg-[var(--color-brand-accent)] text-white px-5 py-2.5 rounded-xl text-sm font-medium flex items-center space-x-2 shrink-0 hover:bg-[var(--color-brand-accent-hover)] transition-colors"
                    >
                      <MessageCircle size={16} />
                      <span>{t('sendMessage')}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Customers;
