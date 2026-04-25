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
export const BuyerEscrow = ({ product, onClose }) => {
  const { t, updateProduct, role } = useAppContext();
  const escrowId = `ESC-${product.id}-${Date.now().toString(36).toUpperCase()}`;
  const [released, setReleased] = useState(false);

  const boughtDate = product.boughtAt ? new Date(product.boughtAt) : new Date();
  const expiryDate = new Date(boughtDate);
  expiryDate.setDate(expiryDate.getDate() + 3);

  const handleRelease = () => {
    updateProduct(product.id, { status: 'released' });
    setReleased(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-3xl shadow-2xl max-w-sm w-full p-8 flex flex-col items-center text-center overflow-hidden"
      >
        {released || product.status === 'released' ? (
          <>
            <div className="w-20 h-20 bg-[#e8faed] rounded-full flex items-center justify-center mb-4">
              <CheckCircle size={40} className="text-[#2e7d32]" />
            </div>
            <h3 className="text-2xl font-serif mb-2 text-[var(--color-brand-text)]">{t('fundsReleased')}</h3>
            <p className="text-[var(--color-brand-text-muted)] text-sm">${product.price} paid to seller.</p>
            <button onClick={onClose} className="mt-6 w-full bg-[var(--color-brand-accent)] text-white p-4 rounded-2xl font-semibold">
              Done
            </button>
          </>
        ) : (
          <>
            <div className="inline-flex items-center space-x-2 bg-amber-50 text-amber-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-6 border border-amber-200">
              <ShieldCheck size={14} />
              <span>{t('escrowPending')}</span>
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
const ScanQR = () => {
  const { t } = useAppContext();
  const [scanned, setScanned] = useState(false);
  const [escrowId, setEscrowId] = useState('');

  const handleScan = () => {
    if (!escrowId.trim()) return;
    setScanned(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h2 className="text-3xl font-serif text-[var(--color-brand-text)] mb-2">{t('scanQr')}</h2>
      <p className="text-[var(--color-brand-text-muted)] mb-10">{t('scanInstruction')}</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Scanner Area */}
        <div className="bg-white rounded-3xl shadow-sm border border-[#e2e0d8] p-8 flex flex-col items-center text-center">
          {scanned ? (
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col items-center">
              <div className="w-24 h-24 bg-[#e8faed] rounded-full flex items-center justify-center mb-6">
                <CheckCircle size={48} className="text-[#2e7d32]" />
              </div>
              <h3 className="text-2xl font-serif mb-2">{t('fundsReleased')}</h3>
              <p className="text-[var(--color-brand-text-muted)] mb-4">Escrow: <span className="font-mono text-sm">{escrowId}</span></p>
              <div className="bg-[#f0eee4] rounded-2xl p-4 w-full text-left flex items-start space-x-3">
                <span className="text-xl">💰</span>
                <div>
                  <p className="text-sm font-semibold text-[var(--color-brand-accent)]">{t('savedMoneyText')}</p>
                  <p className="text-xs text-[var(--color-brand-text-muted)] mt-1">{t('noForeignTax')}</p>
                </div>
              </div>
              <button onClick={() => { setScanned(false); setEscrowId(''); }} className="mt-6 text-sm text-[var(--color-brand-text-muted)] underline">
                Scan another
              </button>
            </motion.div>
          ) : (
            <>
              {/* Simulated scanner viewfinder */}
              <div className="relative w-52 h-52 mb-8">
                <div className="absolute inset-0 border-4 border-[var(--color-brand-accent)] rounded-2xl opacity-30 animate-ping"></div>
                <div className="absolute inset-0 border-2 border-[var(--color-brand-accent)] rounded-2xl flex items-center justify-center bg-[#f5f5f0]">
                  <Scan size={64} className="text-[var(--color-brand-accent)] opacity-40" />
                </div>
                {/* Corner marks */}
                {['top-0 left-0', 'top-0 right-0', 'bottom-0 left-0', 'bottom-0 right-0'].map((pos, i) => (
                  <div key={i} className={`absolute ${pos} w-6 h-6 border-[var(--color-brand-accent)] border-2 rounded-sm`}></div>
                ))}
              </div>

              <p className="text-sm text-[var(--color-brand-text-muted)] mb-6">
                Point camera at buyer's screen, or enter the Escrow ID manually below.
              </p>

              <div className="w-full space-y-4">
                <input
                  type="text"
                  value={escrowId}
                  onChange={(e) => setEscrowId(e.target.value)}
                  placeholder="e.g. ESC-1-ABC123"
                  className="w-full bg-[#fcfcfa] border border-[#e2e0d8] p-4 rounded-2xl focus:outline-none focus:border-[var(--color-brand-accent)] text-center font-mono uppercase tracking-widest"
                />
                <button
                  onClick={handleScan}
                  disabled={!escrowId.trim()}
                  className={`w-full p-4 rounded-2xl font-semibold text-white transition-all flex justify-center items-center space-x-2 ${escrowId.trim() ? 'bg-[var(--color-brand-accent)] hover:bg-[var(--color-brand-accent-hover)]' : 'bg-[#d1cec1] cursor-not-allowed'}`}
                >
                  <Scan size={20} />
                  <span>{t('scanQr')} & {t('fundsReleased').split(' ')[0]}</span>
                </button>
              </div>
            </>
          )}
        </div>

        {/* Instructions */}
        <div className="space-y-6">
          <h3 className="font-serif text-2xl text-[var(--color-brand-text)]">How Escrow Handover Works</h3>
          {[
            { icon: '🛍️', step: '1. Buyer Purchases', desc: 'Buyer selects a product and pays via EcoCash, Zipit or Cash. Funds are locked in escrow.' },
            { icon: '📱', step: '2. QR Code Generated', desc: "A unique QR code is shown on the buyer's screen. No money moves until you meet." },
            { icon: '🤝', step: '3. Meet & Inspect', desc: 'Buyer inspects the goods in person and confirms they match the listing.' },
            { icon: '✅', step: '4. Seller Scans, Funds Release', desc: "Seller scans the buyer's QR code. Funds instantly release to the seller's account." },
          ].map((item) => (
            <div key={item.step} className="bg-white p-6 rounded-2xl shadow-sm border border-[#e2e0d8] flex items-start space-x-4">
              <span className="text-2xl shrink-0">{item.icon}</span>
              <div>
                <h4 className="font-semibold text-[var(--color-brand-text)] mb-1">{item.step}</h4>
                <p className="text-sm text-[var(--color-brand-text-muted)] leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScanQR;
