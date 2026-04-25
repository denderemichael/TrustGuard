import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QrCode, CheckCircle, ShieldCheck, Scan, ArrowRight } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

// Simple visual QR simulation using a grid
const QRDisplay = ({ value }) => {
  // Generate a stable pattern from the value string
  const cells = Array.from({ length: 11 }, (_, row) =>
    Array.from({ length: 11 }, (_, col) => {
      const seed = (value.charCodeAt((row * 11 + col) % value.length) + row + col) % 3;
      // Always fill corners for QR feel
      if ((row < 3 && col < 3) || (row < 3 && col > 7) || (row > 7 && col < 3)) return true;
      return seed === 0;
    })
  );

  return (
    <div className="inline-grid gap-0.5 p-4 bg-white rounded-2xl shadow-inner border border-[#e2e0d8]"
      style={{ gridTemplateColumns: `repeat(11, 1fr)` }}>
      {cells.flat().map((filled, i) => (
        <div key={i} className={`w-4 h-4 rounded-sm ${filled ? 'bg-[var(--color-brand-accent)]' : 'bg-transparent'}`} />
      ))}
    </div>
  );
};

// ---------- BUYER view: generates the QR escrow code ----------
export const BuyerEscrow = ({ product, onClose, onConfirm }) => {
  const { t, updateProduct, role } = useAppContext();
  const [released, setReleased] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState('');

  const isBought = product.status === 'bought' || product.status === 'released';
  const escrowId = `ESC-${product.id}-${product.boughtAt || Date.now().toString(36).toUpperCase()}`;

  const boughtDate = product.boughtAt ? new Date(product.boughtAt) : new Date();
  const expiryDate = new Date(boughtDate);
  expiryDate.setDate(expiryDate.getDate() + 3);

  const handleRelease = () => {
    updateProduct(product.id, { status: 'released' });
    setReleased(true);
  };

  const handleConfirmPayment = () => {
    if (selectedMethod) {
      onConfirm(selectedMethod);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-3xl shadow-2xl max-w-sm w-full p-8 flex flex-col items-center text-center overflow-hidden"
      >
        {!isBought ? (
          <>
            <div className="w-16 h-16 bg-[#f0eee4] rounded-full flex items-center justify-center mb-6">
              <ShieldCheck size={32} className="text-[var(--color-brand-accent)]" />
            </div>
            <h3 className="text-2xl font-serif mb-2">{t('buyNow')}</h3>
            <p className="text-[var(--color-brand-text-muted)] text-sm mb-6">{product.name} - ${product.price}</p>
            
            <div className="w-full space-y-3 mb-8">
              <label className="block text-xs font-bold text-left text-[var(--color-brand-text-muted)] uppercase tracking-widest">{t('paymentMethod')}</label>
              <div className="grid grid-cols-2 gap-3">
                {['EcoCash', 'Zipit'].map(m => (
                  <button key={m} onClick={() => setSelectedMethod(m)}
                    className={`p-4 rounded-2xl border text-sm font-medium transition-all ${selectedMethod === m ? 'border-[var(--color-brand-accent)] bg-[#f0eee4] text-[var(--color-brand-accent)]' : 'border-[#e2e0d8] bg-white text-[var(--color-brand-text)]'}`}>
                    {m}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex w-full gap-3">
              <button onClick={onClose} className="flex-1 p-4 rounded-2xl border border-[#e2e0d8] text-[var(--color-brand-text-muted)] font-medium">
                {t('cancel')}
              </button>
              <button
                onClick={handleConfirmPayment}
                disabled={!selectedMethod}
                className={`flex-1 p-4 rounded-2xl font-bold transition-all ${selectedMethod ? 'bg-[var(--color-brand-accent)] text-white' : 'bg-[#d1cec1] text-white cursor-not-allowed'}`}
              >
                {t('next')}
              </button>
            </div>
          </>
        ) : (released || product.status === 'released') ? (
          <>
            <div className="w-20 h-20 bg-[#e8faed] rounded-full flex items-center justify-center mb-4">
              <CheckCircle size={40} className="text-[#2e7d32]" />
            </div>
            <h3 className="text-2xl font-serif mb-2 text-[var(--color-brand-text)]">{t('fundsReleased')}</h3>
            <p className="text-[var(--color-brand-text-muted)] text-sm">${product.price} paid to seller via {product.paymentMethod}.</p>
            <button onClick={onClose} className="mt-6 w-full bg-[var(--color-brand-accent)] text-white p-4 rounded-2xl font-semibold">
              Done
            </button>
          </>
        ) : (
          <>
            <div className="inline-flex items-center space-x-2 bg-amber-50 text-amber-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-6 border border-amber-200">
              <ShieldCheck size={14} />
              <span>{t('escrowPending')} - {product.paymentMethod}</span>
            </div>

            <h3 className="text-xl font-serif mb-2">{product.name}</h3>
            <p className="text-2xl font-bold text-[var(--color-brand-accent)] mb-4">${product.price}</p>

            <div className="bg-[#fcfcfa] border border-[#e2e0d8] p-4 rounded-2xl mb-6 w-full text-left">
              <h4 className="text-xs font-bold text-[var(--color-brand-text-muted)] uppercase tracking-widest mb-1">{t('escrowHoldTitle')}</h4>
              <p className="text-[10px] text-[var(--color-brand-text-muted)] mb-3 leading-tight">{t('escrowHoldDesc')}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium">{t('daysRemaining')}:</span>
                <span className="text-rose-600 font-bold">3 {t('daysRemaining').split(' ')[0]}</span>
              </div>
            </div>

            <QRDisplay value={escrowId} />

            <p className="text-xs text-[var(--color-brand-text-muted)] mt-4 px-4 leading-relaxed">
              {t('showQr')}
            </p>

            <div className="flex w-full gap-3 mt-6">
              <button onClick={onClose} className="flex-1 p-3 rounded-xl border border-[#e2e0d8] text-[var(--color-brand-text-muted)] text-sm">
                {t('cancel')}
              </button>
              <button
                onClick={handleRelease}
                className="flex-1 p-3 rounded-xl bg-[var(--color-brand-accent)] text-white text-sm font-medium"
              >
                {role === 'user' ? t('claimGoods') : t('releaseFundsSeller')}
              </button>
            </div>
          </>
        )}
      </motion.div>
    </motion.div>
  );
};

// ---------- SELLER view: scan QR to release funds ----------
const EscrowPage = () => {
  const { t, orders, releaseFunds, role, getZiGPrice } = useAppContext();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [scanMode, setScanMode] = useState(false);
  const [manualCode, setManualCode] = useState('');
  const [error, setError] = useState('');

  const activeOrders = orders.filter(o => o.status === 'pending');

  const handleScan = (code) => {
    const order = orders.find(o => o.escrowId === code || o.id === code);
    if (order && order.status === 'pending') {
      const success = releaseFunds(order.id);
      if (success) {
        setScanMode(false);
        setManualCode('');
        setError('');
        // Show success state
      }
    } else {
      setError('Invalid or expired code');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h2 className="text-4xl font-serif text-[var(--color-brand-text)] mb-2 italic">
            {role === 'admin' ? "Merchant Terminal" : "My Active Escrows"}
          </h2>
          <p className="text-[var(--color-brand-text-muted)]">
            {role === 'admin' ? "Scan buyer codes to release pending funds." : "Show these codes to the merchant at handover."}
          </p>
        </div>
        {role === 'admin' && (
          <button 
            onClick={() => setScanMode(!scanMode)}
            className="bg-[var(--color-brand-accent)] text-white px-6 py-3 rounded-2xl font-bold flex items-center space-x-2"
          >
            <Scan size={20} />
            <span>{scanMode ? "Cancel Scan" : "Scan Code"}</span>
          </button>
        )}
      </div>

      {scanMode && (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="mb-12 bg-white p-8 rounded-[2.5rem] shadow-xl border border-[#e2e0d8] flex flex-col items-center">
          <div className="w-64 h-64 bg-[#fcfcfa] border-2 border-dashed border-[var(--color-brand-accent)] rounded-3xl flex items-center justify-center mb-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-[var(--color-brand-accent)] opacity-5 animate-pulse"></div>
            <Scan size={64} className="text-[var(--color-brand-accent)] opacity-30" />
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-[var(--color-brand-accent)] animate-scan"></div>
          </div>
          
          <div className="w-full max-w-xs space-y-4">
            <input 
              type="text" 
              value={manualCode}
              onChange={(e) => setManualCode(e.target.value)}
              placeholder="Enter code manually"
              className="w-full p-4 rounded-xl border border-[#e2e0d8] text-center font-mono uppercase tracking-widest focus:border-[var(--color-brand-accent)] outline-none"
            />
            {error && <p className="text-rose-500 text-xs text-center font-medium">{error}</p>}
            <button 
              onClick={() => handleScan(manualCode)}
              className="w-full bg-[var(--color-brand-accent)] text-white py-4 rounded-xl font-bold"
            >
              Verify & Release Funds
            </button>
          </div>
        </motion.div>
      )}

      <div className="grid gap-6">
        {activeOrders.length === 0 ? (
          <div className="text-center py-20 bg-[#fcfcfa] rounded-[2.5rem] border-2 border-dashed border-[#e2e0d8]">
            <ShieldCheck size={48} className="mx-auto text-[#d1cec1] mb-4" />
            <p className="text-[var(--color-brand-text-muted)] italic">No active escrows found.</p>
          </div>
        ) : (
          activeOrders.map(order => (
            <motion.div 
              key={order.id}
              layoutId={order.id}
              onClick={() => setSelectedOrder(order)}
              className="bg-white p-6 rounded-[2rem] shadow-sm border border-[#e2e0d8] flex items-center justify-between cursor-pointer hover:shadow-md transition-all"
            >
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-[#fcfcfa] rounded-2xl flex items-center justify-center border border-[#e2e0d8]">
                  <ShoppingBag size={24} className="text-[var(--color-brand-accent)]" />
                </div>
                <div>
                  <h4 className="font-bold text-[var(--color-brand-text)]">{order.id}</h4>
                  <p className="text-xs text-[var(--color-brand-text-muted)]">{order.items.length} items · {order.paymentMethod}</p>
                </div>
              </div>
              
              <div className="text-right">
                <p className="text-lg font-bold text-[var(--color-brand-accent)]">${order.totalUsd.toFixed(2)}</p>
                <div className="flex items-center space-x-1 text-rose-500 text-[10px] font-bold uppercase tracking-wider mt-1 justify-end">
                  <Clock size={10} />
                  <Countdown date={order.expiry} />
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      <AnimatePresence>
        {selectedOrder && (
          <OrderModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />
        )}
      </AnimatePresence>
    </div>
  );
};

const Countdown = ({ date }) => {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      const diff = new Date(date) - new Date();
      if (diff <= 0) {
        setTimeLeft('EXPIRED');
        clearInterval(timer);
      } else {
        const h = Math.floor(diff / 3600000);
        const m = Math.floor((diff % 3600000) / 60000);
        const s = Math.floor((diff % 60000) / 1000);
        setTimeLeft(`${h}h ${m}m ${s}s`);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [date]);

  return <span>{timeLeft}</span>;
};

const OrderModal = ({ order, onClose }) => {
  const { getZiGPrice, role, releaseFunds } = useAppContext();
  
  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[110] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
        className="bg-white w-full max-w-md rounded-[3rem] overflow-hidden flex flex-col max-h-[90vh]"
      >
        <div className="p-8 pb-4 flex justify-between items-start">
          <div>
            <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-100 uppercase tracking-widest">
              Pending Escrow
            </span>
            <h3 className="text-2xl font-serif font-bold mt-3 italic">{order.id}</h3>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-[#f0eee4] rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-8 py-4 space-y-6">
          <div className="bg-[#fcfcfa] rounded-3xl p-6 border border-[#e2e0d8] flex justify-center">
            <QRDisplay value={order.escrowId} />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-end border-b border-[#f0eee4] pb-4">
              <span className="text-sm text-[var(--color-brand-text-muted)]">Total Amount</span>
              <div className="text-right">
                <p className="text-2xl font-bold text-[var(--color-brand-accent)]">${order.totalUsd.toFixed(2)}</p>
                <p className="text-sm text-[var(--color-brand-text-muted)]">ZiG {order.totalZig}</p>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-brand-text-muted)]">Items</p>
              {order.items.map((item, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <span>{item.name}</span>
                  <span className="font-medium">${item.price.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 bg-rose-50 rounded-2xl border border-rose-100">
            <p className="text-[10px] text-rose-700 leading-relaxed italic">
              * This code will expire in <Countdown date={order.expiry} />. If not scanned, funds will be eligible for refund.
            </p>
          </div>
        </div>

        <div className="p-8 pt-4">
          {role === 'user' ? (
            <p className="text-center text-xs text-[var(--color-brand-text-muted)] italic">
              Show this QR code to the merchant to release funds.
            </p>
          ) : (
            <button 
              onClick={() => { releaseFunds(order.id); onClose(); }}
              className="w-full bg-[var(--color-brand-accent)] text-white py-4 rounded-2xl font-bold shadow-lg"
            >
              Confirm Handover & Release
            </button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default EscrowPage;
