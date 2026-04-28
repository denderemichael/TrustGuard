import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, ShoppingBag, ShieldCheck, CreditCard, ChevronRight } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import PaymentModal from '../components/PaymentModal';

const Cart = ({ setCurrentTab }) => {
  const { cart, removeFromCart, clearCart, createOrder, getZiGPrice, t } = useAppContext();
  const [showPayment, setShowPayment] = useState(false);

  const totalUsd = cart.reduce((sum, item) => sum + item.price, 0);

  const handlePaymentSuccess = async (method) => {
    await createOrder(cart, totalUsd, method);
    clearCart();
    setCurrentTab('orders');
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center">
        <div className="w-24 h-24 bg-[#fcfcfa] rounded-full flex items-center justify-center mx-auto mb-8 border border-[#e2e0d8]">
          <ShoppingBag size={40} className="text-[#d1cec1]" />
        </div>
        <h2 className="text-4xl font-serif font-bold italic mb-4">Your bag is empty</h2>
        <p className="text-[var(--color-brand-text-muted)] mb-10 max-w-xs mx-auto">Explore our local collections and add items to your cart safely.</p>
        <button 
          onClick={() => setCurrentTab('products')}
          className="bg-[var(--color-brand-accent)] text-white px-10 py-4 rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all"
        >
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-4xl font-serif text-[var(--color-brand-text)] mb-10 italic">Shopping Bag</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          <AnimatePresence>
            {cart.map((item) => (
              <motion.div 
                key={item.cartId}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="bg-white p-6 rounded-[2rem] shadow-sm border border-[#e2e0d8] flex items-center justify-between"
              >
                <div className="flex items-center space-x-5">
                  <div className="w-20 h-20 bg-[#f0eee4] rounded-2xl overflow-hidden border border-[#e2e0d8]">
                    <img src={item.image} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-[var(--color-brand-text)]">{item.name}</h4>
                    <p className="text-xs text-[var(--color-brand-text-muted)] uppercase tracking-widest">{item.category}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-8">
                  <div className="text-right">
                    <p className="text-xl font-bold text-[var(--color-brand-accent)]">${item.price.toFixed(2)}</p>
                    <p className="text-[10px] font-bold text-[var(--color-brand-text-muted)] uppercase">ZiG {getZiGPrice(item.price)}</p>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.cartId)}
                    className="p-3 text-rose-500 hover:bg-rose-50 rounded-xl transition-colors"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-[#e2e0d8] sticky top-32">
            <h3 className="text-xl font-serif font-bold italic mb-6">Order Summary</h3>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-sm">
                <span className="text-[var(--color-brand-text-muted)]">Subtotal</span>
                <span className="font-medium">${totalUsd.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[var(--color-brand-text-muted)]">Escrow Service Fee</span>
                <span className="text-green-600 font-bold uppercase tracking-widest text-[10px]">Free</span>
              </div>
              <div className="pt-4 border-t border-[#f0eee4] flex justify-between items-end">
                <span className="font-bold">Total</span>
                <div className="text-right">
                  <p className="text-3xl font-bold text-[var(--color-brand-accent)]">${totalUsd.toFixed(2)}</p>
                  <p className="text-xs font-bold text-[var(--color-brand-text-muted)] uppercase">ZiG {getZiGPrice(totalUsd)}</p>
                </div>
              </div>
            </div>

            <button 
              onClick={() => setShowPayment(true)}
              className="w-full bg-[var(--color-brand-accent)] text-white py-5 rounded-2xl font-bold shadow-xl hover:shadow-2xl transition-all flex items-center justify-center space-x-2"
            >
              <ShieldCheck size={20} />
              <span>Secure Escrow Payment</span>
            </button>
            
            <p className="text-[9px] text-[var(--color-brand-text-muted)] text-center mt-6 italic">
              Your payment will be held in a secure VakaHub escrow account until you confirm receipt of your order.
            </p>
          </div>
        </div>
      </div>

      <PaymentModal 
        isOpen={showPayment} 
        onClose={() => setShowPayment(false)} 
        totalAmount={totalUsd} 
        onSuccess={handlePaymentSuccess} 
      />
    </div>
  );
};

export default Cart;
