import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { BuyerEscrow } from './Escrow';

const Products = () => {
  const { t, products, addProduct, role, updateProduct } = useAppContext();
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [bgImage, setBgImage] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleAdd = (e) => {
    e.preventDefault();
    if (name && price) {
      addProduct({ 
        name, 
        price: parseFloat(price), 
        image: '/honey.png',
        bgImage: bgImage || 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=1200'
      });
      setName('');
      setPrice('');
      setBgImage('');
      setShowForm(false);
    }
  };

  const handleBuy = (p) => {
    if (p.status === 'bought') return;
    updateProduct(p.id, { 
      status: 'bought', 
      boughtAt: new Date().toISOString(),
      escrowDays: 3 
    });
    setSelectedProduct(p);
  };

  return (
    <div className="w-full">
      {/* Escrow modal */}
      {selectedProduct && (
        <BuyerEscrow product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}

      {/* Page Header */}
      <div className="bg-[#ebe8de] border-b border-[#e2e0d8] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
          <div>
            <div className="text-sm text-[var(--color-brand-text-muted)] mb-4 flex space-x-2">
              <span>{t('home')}</span>
              <span>›</span>
              <span>Shop</span>
              <span>›</span>
              <span className="text-[var(--color-brand-text)] font-medium">{t('products')}</span>
            </div>
            <h1 className="text-5xl font-serif text-[var(--color-brand-text)]">{t('products')}</h1>
            <p className="text-[var(--color-brand-text-muted)] mt-4 max-w-lg">{t('browseCollection')}</p>
          </div>
          {role === 'admin' && (
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-[var(--color-brand-accent)] text-white px-6 py-3 rounded-full font-medium shadow-sm hover:bg-[var(--color-brand-accent-hover)] transition-colors flex items-center space-x-2 shrink-0"
            >
              <span>+ {t('addProduct')}</span>
            </button>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col md:flex-row gap-12">
        {/* Sidebar Filters */}
        <div className="w-full md:w-56 shrink-0">
          <h3 className="font-serif text-xl mb-6 text-[var(--color-brand-text)]">{t('filters')}</h3>
          <div className="space-y-8">
            <div>
              <h4 className="text-xs font-medium text-[var(--color-brand-text-muted)] uppercase tracking-wider mb-4">{t('categories')}</h4>
              <div className="space-y-3">
                {[t('all'), t('groceries'), t('clothing'), t('electronics')].map((cat, i) => (
                  <label key={cat} className="flex items-center space-x-3 cursor-pointer group">
                    <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${i === 0 ? 'bg-[var(--color-brand-accent)] border-[var(--color-brand-accent)]' : 'border-[#d1cec1] group-hover:border-[var(--color-brand-accent)]'}`}>
                      {i === 0 && <div className="w-2.5 h-2.5 bg-white rounded-sm"></div>}
                    </div>
                    <span className={i === 0 ? 'font-medium text-[var(--color-brand-text)]' : 'text-[var(--color-brand-text-muted)]'}>{cat}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Product Grid Area */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-8 pb-4 border-b border-[#e2e0d8]">
            <span className="text-[var(--color-brand-text-muted)]">{t('showingResults')}: {products.length}</span>
          </div>

          {showForm && role === 'admin' && (
            <form onSubmit={handleAdd} className="bg-white p-6 rounded-2xl shadow-sm border border-[#e2e0d8] mb-8 flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex-1 w-full">
                  <label className="block text-xs font-medium text-[var(--color-brand-text-muted)] mb-1 uppercase tracking-wider">{t('name')}</label>
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#fcfcfa] border border-[#e2e0d8] p-3 rounded-xl focus:outline-none focus:border-[var(--color-brand-accent)]" required />
                </div>
                <div className="flex-1 w-full">
                  <label className="block text-xs font-medium text-[var(--color-brand-text-muted)] mb-1 uppercase tracking-wider">{t('price')} ($)</label>
                  <input type="number" value={price} onChange={(e) => setPrice(e.target.value)}
                    className="w-full bg-[#fcfcfa] border border-[#e2e0d8] p-3 rounded-xl focus:outline-none focus:border-[var(--color-brand-accent)]" required />
                </div>
                <div className="flex-1 w-full">
                  <label className="block text-xs font-medium text-[var(--color-brand-text-muted)] mb-1 uppercase tracking-wider">{t('bgImage')}</label>
                  <input type="text" value={bgImage} onChange={(e) => setBgImage(e.target.value)}
                    className="w-full bg-[#fcfcfa] border border-[#e2e0d8] p-3 rounded-xl focus:outline-none focus:border-[var(--color-brand-accent)]" placeholder="https://..." />
                </div>
              </div>
              <div className="flex justify-end space-x-3">
                <button type="button" onClick={() => setShowForm(false)} className="px-5 py-3 rounded-xl border border-[#e2e0d8] text-[var(--color-brand-text-muted)] font-medium">{t('cancel')}</button>
                <button type="submit" className="px-8 py-3 rounded-xl bg-[var(--color-brand-accent)] text-white font-medium">{t('add')}</button>
              </div>
            </form>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {products.map(p => (
              <div key={p.id} className="group cursor-pointer">
                <div className="bg-white aspect-[4/5] rounded-3xl shadow-sm border border-[#e2e0d8] flex items-center justify-center mb-4 transition-all group-hover:shadow-md relative overflow-hidden">
                  {/* Background Image on Hover */}
                  {p.bgImage && (
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-cover bg-center"
                      style={{ backgroundImage: `url(${p.bgImage})` }}
                    />
                  )}
                  
                  <button className="absolute top-4 right-4 text-[#d1cec1] hover:text-rose-400 transition-colors z-10">
                    <Heart size={20} />
                  </button>
                  
                  <div className={`absolute top-4 left-4 ${p.status === 'bought' ? 'bg-rose-500' : 'bg-[#2c3b29]'} text-white px-3 py-1 rounded-full text-xs font-semibold z-10`}>
                    {p.status === 'bought' ? t('bought') : t('local')}
                  </div>

                  {p.image ? (
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 relative z-0" />
                  ) : (
                    <div className="w-32 h-32 bg-[#f0eee4] rounded-full flex items-center justify-center text-[var(--color-brand-accent)] font-serif italic text-5xl group-hover:scale-110 transition-transform duration-700 relative z-0">
                      {p.name.charAt(0)}
                    </div>
                  )}

                  {/* Bought Overlay */}
                  {p.status === 'bought' && (
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center z-20">
                      <div className="bg-white/90 px-6 py-2 rounded-full font-serif italic text-rose-600 font-bold border border-rose-200">
                        {t('bought')}
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="text-center">
                  <h3 className="font-medium text-[var(--color-brand-text)] text-lg">{p.name}</h3>
                  <div className="flex items-center justify-center space-x-2 mt-1">
                    <p className="text-[var(--color-brand-accent)] font-serif font-semibold text-xl">${p.price}</p>
                  </div>
                  {role === 'user' && (
                    <button
                      onClick={() => handleBuy(p)}
                      disabled={p.status === 'bought'}
                      className={`mt-3 w-full ${p.status === 'bought' ? 'bg-[#d1cec1] cursor-not-allowed' : 'bg-[var(--color-brand-accent)] hover:bg-[var(--color-brand-accent-hover)]'} text-white py-2.5 rounded-xl text-sm font-medium transition-colors`}
                    >
                      {p.status === 'bought' ? t('bought') : t('buyNow')}
                    </button>
                  )}
                  {p.status === 'bought' && role === 'admin' && (
                    <button
                      onClick={() => setSelectedProduct(p)}
                      className="mt-3 w-full bg-[#2c3b29] text-white py-2.5 rounded-xl text-sm font-medium transition-colors"
                    >
                      {t('releaseFunds')}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
