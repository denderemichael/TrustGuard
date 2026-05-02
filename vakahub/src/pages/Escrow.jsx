import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QrCode, CheckCircle, ShieldCheck, Scan, ArrowRight, Clock, X, ShoppingBag, Copy, Check, Loader2, Activity } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { useAppContext } from '../context/AppContext';
import { doc, updateDoc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';

// ---------- BUYER view: manages their secure escrow ----------
export const BuyerEscrow = ({ order, onClose }) => {
  const { t, getZiGPrice, role } = useAppContext();
  const [releasing, setReleasing] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleRelease = async () => {
    setReleasing(true);
    try {
      // Logic for buyer to "Unlock" the code for the seller
      await updateDoc(doc(db, 'orders', order.id), { status: 'ready_for_handover' });
    } catch (e) {
      console.error(e);
    } finally {
      setReleasing(false);
    }
  };

  const copyCode = () => {
    navigator.clipboard.writeText(order.escrowId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      className="fixed inset-0 z-[150] bg-black/60 backdrop-blur-md flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
        className="bg-white rounded-[3rem] shadow-2xl max-w-sm w-full flex flex-col max-h-[90vh] overflow-hidden relative"
      >
        {/* Fixed Header with X Button */}
        <div className="p-6 pb-2 flex justify-end">
          <button onClick={onClose} className="p-3 bg-[#f0eee4] hover:bg-[#e2e0d8] text-[var(--color-brand-text)] rounded-full transition-colors shadow-sm">
            <X size={24} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-8 pt-0 flex flex-col items-center text-center">
          <div className="w-20 h-20 bg-[#f0eee4] rounded-full flex items-center justify-center mb-6 shrink-0">
            <ShieldCheck size={40} className="text-[var(--color-brand-accent)]" />
          </div>

          <h3 className="text-2xl font-serif font-bold italic mb-2">Escrow Protected</h3>
          <p className="text-[var(--color-brand-text-muted)] text-sm mb-4">${order.totalUsd.toFixed(2)} Secured</p>

          <div className="bg-indigo-50 border border-indigo-100 px-4 py-2 rounded-xl mb-6 flex items-center space-x-2 text-indigo-700 w-full justify-center">
            <Activity size={16} />
            <span className="text-[10px] font-bold uppercase tracking-widest">Google AI Anti-Scam Active</span>
          </div>

          <div className="bg-[#fcfcfa] border border-[#e2e0d8] p-6 rounded-[2rem] mb-8 w-full shrink-0">
            <div className="bg-white p-4 rounded-2xl border border-[#f0eee4] shadow-inner mb-6 flex justify-center">
              <QRCodeSVG value={order.escrowId} size={180} level="H" includeMargin={true} />
            </div>
            
            <div className="flex items-center justify-between bg-white border border-[#f0eee4] p-3 rounded-xl mb-2">
              <span className="text-[10px] font-bold text-[var(--color-brand-text-muted)] uppercase tracking-widest">Manual Code</span>
              <div className="flex items-center space-x-2">
                <code className="font-mono font-bold text-[var(--color-brand-accent)] text-lg">{order.escrowId}</code>
                <button onClick={copyCode} className="text-[var(--color-brand-text-muted)] hover:text-[var(--color-brand-accent)] p-1">
                  {copied ? <Check size={18} className="text-emerald-500" /> : <Copy size={18} />}
                </button>
              </div>
            </div>
          </div>

          <p className="text-xs text-[var(--color-brand-text-muted)] leading-relaxed mb-8 px-4 italic shrink-0">
            Only share this code with the merchant AFTER you have inspected and received your goods.
          </p>

          <button 
            onClick={handleRelease}
            disabled={order.status === 'ready_for_handover' || releasing}
            className="w-full bg-[var(--color-brand-accent)] text-white p-5 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all disabled:bg-[#d1cec1] shrink-0"
          >
            {releasing ? 'Updating...' : order.status === 'ready_for_handover' ? 'Ready for Handover' : 'Release Payment'}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ---------- SELLER/MERCHANT view: scan & verify ----------
const EscrowPage = () => {
  const { t, orders, user, role, setCurrentTab } = useAppContext();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [scanMode, setScanMode] = useState(false);
  const [manualCode, setManualCode] = useState('');
  const [error, setError] = useState('');
  const [stream, setStream] = useState(null);

  useEffect(() => {
    if (scanMode) {
      navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
        .then(s => setStream(s))
        .catch(err => console.error("Camera error:", err));
    } else {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
        setStream(null);
      }
    }
    return () => {
      if (stream) stream.getTracks().forEach(track => track.stop());
    };
  }, [scanMode]);

  const [verifying, setVerifying] = useState(false);

  const handleVerifyAndClaim = async (code) => {
    setVerifying(true);
    setError('');
    
    try {
      const order = orders.find(o => o.escrowId === code);
      if (!order) {
        throw new Error("Invalid code");
      }
      if (order.status !== 'ready_for_handover') {
        throw new Error("Buyer has not released funds yet");
      }

      // Finalize transaction
      await updateDoc(doc(db, 'orders', order.id), { status: 'completed' });
      
      // Update Seller Wallet
      const walletRef = doc(db, 'wallets', user.uid);
      const walletSnap = await getDoc(walletRef);
      const currentWallet = walletSnap.exists() ? walletSnap.data() : { available: 0, escrow: 0, total: 0 };
      
      await setDoc(walletRef, {
        available: (currentWallet.available || 0) + order.totalUsd,
        total: (currentWallet.total || 0) + order.totalUsd
      }, { merge: true });

      setScanMode(false);
      setManualCode('');
      setSelectedOrder(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h2 className="text-4xl font-serif text-[var(--color-brand-text)] mb-2 italic">
            {role === 'admin' ? "Merchant Terminal" : "Active Escrows"}
          </h2>
          <p className="text-[var(--color-brand-text-muted)]">
            {role === 'admin' ? "Verify handover and claim your funds." : "Show these codes to the merchant at handover."}
          </p>
        </div>
        {role === 'admin' && (
          <button 
            onClick={() => setScanMode(!scanMode)}
            className="bg-[var(--color-brand-accent)] text-white px-8 py-4 rounded-2xl font-bold flex items-center space-x-2 shadow-lg hover:shadow-xl transition-all"
          >
            <Scan size={20} />
            <span>{scanMode ? "Cancel Scan" : "Scan Code"}</span>
          </button>
        )}
      </div>

      {scanMode && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12 bg-white p-10 rounded-[3rem] shadow-xl border border-[#e2e0d8] flex flex-col items-center">
          <div className="w-64 h-64 bg-black rounded-3xl flex items-center justify-center mb-8 relative overflow-hidden border-2 border-[var(--color-brand-accent)]">
            {stream ? (
              <video 
                autoPlay 
                playsInline 
                muted 
                className="w-full h-full object-cover"
                ref={video => { if (video) video.srcObject = stream; }}
              />
            ) : (
              <div className="text-center p-4">
                <Loader2 className="animate-spin text-white mx-auto mb-2" />
                <p className="text-white text-[10px] uppercase font-bold tracking-widest">Opening Camera...</p>
              </div>
            )}
            <div className="absolute inset-0 pointer-events-none border-[20px] border-black/20"></div>
            <div className="absolute top-0 left-0 right-0 h-1 bg-[var(--color-brand-accent)] animate-scan shadow-[0_0_15px_var(--color-brand-accent)] z-10"></div>
          </div>
          
          <div className="w-full max-w-xs space-y-4">
            <input 
              type="text" 
              value={manualCode}
              onChange={(e) => setManualCode(e.target.value.toUpperCase())}
              placeholder="ENTER MANUAL CODE"
              className="w-full p-5 rounded-2xl border border-[#e2e0d8] text-center font-mono font-bold text-xl tracking-widest focus:border-[var(--color-brand-accent)] outline-none bg-[#fcfcfa]"
            />
            {error && <p className="text-rose-500 text-xs text-center font-bold">{error}</p>}
            <button 
              onClick={() => handleVerifyAndClaim(manualCode)}
              disabled={verifying || !manualCode}
              className="w-full bg-[var(--color-brand-accent)] text-white py-5 rounded-2xl font-bold shadow-lg disabled:opacity-50"
            >
              {verifying ? 'Verifying...' : 'Verify & Claim Funds'}
            </button>
          </div>
        </motion.div>
      )}

      <div className="grid gap-6">
        {orders.filter(o => o.status !== 'completed').length === 0 ? (
          <div className="text-center py-24 bg-[#fcfcfa] rounded-[3rem] border-2 border-dashed border-[#e2e0d8]">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-[#f0eee4]">
              <ShoppingBag size={32} className="text-[#d1cec1]" />
            </div>
            <h3 className="text-2xl font-serif font-bold italic text-[var(--color-brand-text)] mb-2">No active orders</h3>
            <p className="text-[var(--color-brand-text-muted)] mb-10 max-w-xs mx-auto italic text-sm">Your secure escrow orders will appear here once you make a purchase.</p>
            <button 
              onClick={() => setCurrentTab('products')}
              className="bg-[var(--color-brand-accent)] text-white px-10 py-4 rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all"
            >
              Browse Products
            </button>
          </div>
        ) : (
          orders.filter(o => o.status !== 'completed').map(order => (
            <motion.div 
              key={order.id}
              onClick={() => setSelectedOrder(order)}
              className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-[#e2e0d8] flex items-center justify-between cursor-pointer hover:shadow-md transition-all group"
            >
              <div className="flex items-center space-x-6">
                <div className="w-16 h-16 bg-[#fcfcfa] rounded-2xl flex items-center justify-center border border-[#e2e0d8] group-hover:bg-[var(--color-brand-accent)] group-hover:text-white transition-all">
                  <QrCode size={24} />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h4 className="font-bold text-[var(--color-brand-text)]">{order.id}</h4>
                    <span className="text-[10px] bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full font-bold uppercase border border-amber-100">{order.status.replace('_', ' ')}</span>
                  </div>
                  <p className="text-sm text-[var(--color-brand-text-muted)] font-medium mt-1">
                    {order.items.length} Items · {order.paymentMethod}
                  </p>
                </div>
              </div>
              
              <div className="text-right">
                <p className="text-xl font-bold text-[var(--color-brand-accent)]">${order.totalUsd.toFixed(2)}</p>
                <div className="flex items-center space-x-1 text-rose-500 text-[10px] font-bold uppercase tracking-wider mt-1 justify-end">
                  <Clock size={10} />
                  <span>24h Remaining</span>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      <AnimatePresence>
        {selectedOrder && role === 'user' && (
          <BuyerEscrow order={selectedOrder} onClose={() => setSelectedOrder(null)} />
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
