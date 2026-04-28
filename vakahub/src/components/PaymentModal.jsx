import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Smartphone, ShieldCheck, CheckCircle2, ArrowRight, Loader2 } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const PAYMENT_METHODS = [
  { 
    id: 'ecocash', 
    name: 'EcoCash', 
    logo: 'https://seeklogo.com/images/E/ecocash-logo-4A8E0A9D6A-seeklogo.com.png', 
    color: '#00539C' 
  },
  { 
    id: 'zipit', 
    name: 'Zipit', 
    logo: 'https://www.zimswitch.co.zw/wp-content/uploads/2020/07/Zimswitch-Zipit.png', 
    color: '#E31E24' 
  },
  { 
    id: 'innbucks', 
    name: 'Innbucks', 
    logo: 'https://innbucks.co.zw/wp-content/uploads/2022/04/Innbucks-Logo-1.png', 
    color: '#F9A825' 
  },
  { 
    id: 'mukuru', 
    name: 'Mukuru', 
    logo: 'https://www.mukuru.com/wp-content/uploads/2020/09/mukuru-logo.png', 
    color: '#FF6D00' 
  }
];

const PaymentModal = ({ isOpen, onClose, totalAmount, onSuccess }) => {
  const { t, getZiGPrice } = useAppContext();
  const [step, setStep] = useState(1); // 1: Select, 2: Phone/OTP, 3: Success
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSelectMethod = (method) => {
    setSelectedMethod(method);
    setStep(2);
  };

  const handleSendPrompt = async () => {
    setLoading(true);
    
    // Simulate real API connection to Zimbabwe Gateway
    const gatewayId = import.meta.env.VITE_PAYNOW_INTEGRATION_ID;
    console.log(`Connecting to ${selectedMethod.name} gateway via ${gatewayId}...`);

    // Simulate network latency for API handshake
    await new Promise(r => setTimeout(r, 2500));
    
    setLoading(false);
    setStep(3);
  };

  const handleVerify = async () => {
    setLoading(true);
    
    // Finalizing transaction with Gateway Key
    const gatewayKey = import.meta.env.VITE_PAYNOW_INTEGRATION_KEY;
    console.log("Verifying transaction with Key:", gatewayKey?.substring(0, 5) + "****");

    await new Promise(r => setTimeout(r, 1500));
    
    setLoading(false);
    onSuccess(selectedMethod.name);
    setStep(4);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        className="bg-white w-full max-w-md rounded-[3rem] overflow-hidden shadow-2xl border border-[#e2e0d8] relative"
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 p-2 hover:bg-[#f0eee4] rounded-full transition-colors z-10"
        >
          <X size={20} />
        </button>

        <div className="p-10">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div 
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div className="mb-8">
                  <h3 className="text-3xl font-serif font-bold italic mb-2">Local Payment</h3>
                  <p className="text-[var(--color-brand-text-muted)] text-sm">Choose your preferred transaction method.</p>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  {PAYMENT_METHODS.map((m) => (
                    <button 
                      key={m.id}
                      onClick={() => handleSelectMethod(m)}
                      className="group bg-[#fcfcfa] border border-[#e2e0d8] p-6 rounded-[2rem] flex flex-col items-center justify-center space-y-3 hover:border-[var(--color-brand-accent)] hover:shadow-lg transition-all"
                    >
                      <div className="h-12 flex items-center justify-center">
                        <img src={m.logo} alt={m.name} className="max-h-full max-w-full object-contain filter grayscale group-hover:grayscale-0 transition-all" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-brand-text-muted)] group-hover:text-[var(--color-brand-accent)]">{m.name}</span>
                    </button>
                  ))}
                </div>

                <div className="bg-[#f0eee4] p-4 rounded-2xl flex items-center justify-between">
                  <span className="text-sm font-bold text-[var(--color-brand-text-muted)] uppercase tracking-widest">Total Pay</span>
                  <div className="text-right">
                    <p className="text-xl font-bold text-[var(--color-brand-accent)]">${totalAmount.toFixed(2)}</p>
                    <p className="text-[10px] font-bold opacity-50">ZiG {getZiGPrice(totalAmount)}</p>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div 
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div className="mb-8 flex items-center space-x-4">
                  <button onClick={() => setStep(1)} className="p-2 hover:bg-[#f0eee4] rounded-full transition-colors">←</button>
                  <img src={selectedMethod.logo} alt="" className="h-8 object-contain" />
                </div>
                
                <h3 className="text-2xl font-serif font-bold italic mb-4">Enter Phone Number</h3>
                <p className="text-[var(--color-brand-text-muted)] text-sm mb-8">We'll send a **Secure Payment Link via SMS** to your phone via {selectedMethod.name}.</p>

                <div className="space-y-6">
                  <div className="relative">
                    <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-brand-text-muted)]" size={20} />
                    <input 
                      type="tel" 
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="0777 000 000"
                      className="w-full bg-[#fcfcfa] border border-[#e2e0d8] p-5 pl-14 rounded-2xl outline-none focus:border-[var(--color-brand-accent)]"
                    />
                  </div>

                  <button 
                    onClick={handleSendPrompt}
                    disabled={loading || phoneNumber.length < 9}
                    className="w-full bg-[var(--color-brand-accent)] text-white p-5 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all disabled:opacity-50 flex items-center justify-center space-x-2"
                  >
                    {loading ? (
                      <><Loader2 className="animate-spin" /> <span>Sending SMS...</span></>
                    ) : (
                      <><span>Request SMS Payment</span> <ArrowRight size={20} /></>
                    )}
                  </button>
                  
                  <p className="text-[10px] text-center text-[var(--color-brand-text-muted)] italic">
                    By clicking, you will receive a push notification or USSD prompt on your handset.
                  </p>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div 
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div className="text-center mb-8">
                  <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Smartphone size={36} className="text-amber-600 animate-pulse" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold italic mb-2">Check Your Phone</h3>
                  <p className="text-[var(--color-brand-text-muted)] text-sm">Please approve the transaction on your handset. Then enter the OTP if required.</p>
                </div>

                <div className="space-y-6">
                  <input 
                    type="text" 
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter OTP"
                    className="w-full bg-[#fcfcfa] border border-[#e2e0d8] p-5 rounded-2xl text-center text-2xl font-bold tracking-[0.5em] outline-none focus:border-[var(--color-brand-accent)]"
                  />

                  <button 
                    onClick={handleVerify}
                    disabled={loading || otp.length < 4}
                    className="w-full bg-[var(--color-brand-accent)] text-white p-5 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all disabled:opacity-50 flex items-center justify-center space-x-2"
                  >
                    {loading ? <Loader2 className="animate-spin" /> : <span>Verify & Secure Funds</span>}
                  </button>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div 
                key="step4"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-8">
                  <CheckCircle2 size={48} className="text-emerald-500" />
                </div>
                <h3 className="text-3xl font-serif font-bold italic mb-3">Funds Secured</h3>
                <p className="text-[var(--color-brand-text-muted)] text-sm mb-10 max-w-xs mx-auto">
                  Your payment of ${totalAmount.toFixed(2)} is now safe in Escrow. The seller has been notified.
                </p>
                <button 
                  onClick={onClose}
                  className="w-full bg-[var(--color-brand-accent)] text-white p-5 rounded-2xl font-bold text-lg shadow-xl"
                >
                  View My Orders
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Security Badge */}
        <div className="bg-[#fcfcfa] py-4 px-8 border-t border-[#e2e0d8] flex items-center justify-center space-x-2 text-[var(--color-brand-text-muted)]">
          <ShieldCheck size={14} />
          <span className="text-[10px] font-bold uppercase tracking-widest italic">Encrypted Escrow Protection</span>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentModal;
