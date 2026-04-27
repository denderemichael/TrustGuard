import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, User, ShieldCheck, ShoppingBag, CreditCard, HelpCircle } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const Chatbot = () => {
  const { t, setCurrentTab } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const scrollRef = useRef(null);

  // Initialize first message when opened
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{ id: 1, text: t('botIntro'), sender: 'bot' }]);
    }
  }, [isOpen, messages.length, t]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const QUICK_ACTIONS = [
    { label: 'Escrow Help', key: 'escrow', icon: <ShieldCheck size={14}/> },
    { label: 'How to Pay', key: 'pay', icon: <CreditCard size={14}/> },
    { label: 'My Orders', key: 'order', icon: <ShoppingBag size={14}/> },
    { label: 'General Help', key: 'help', icon: <HelpCircle size={14}/> },
  ];

  const getBotResponse = (txt) => {
    const low = txt.toLowerCase();
    if (low.includes('pay') || low.includes('bhadhara') || low.includes('khokha')) return t('botPay');
    if (low.includes('order') || low.includes('odha') || low.includes('oda')) return t('botOrder');
    if (low.includes('refund') || low.includes('dzosera') || low.includes('buyisela')) return t('botRefund');
    if (low.includes('escrow')) return t('botEscrow');
    if (low.includes('help') || low.includes('rubatsiro') || low.includes('usizo')) return t('botHelp');
    return t('botUnknown');
  };

  const handleSend = (e, customText = null) => {
    if (e) e.preventDefault();
    const textToSend = customText || input;
    if (!textToSend.trim()) return;

    const userMsg = { id: Date.now(), text: textToSend, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    if (!customText) setInput('');

    setTimeout(() => {
      const response = getBotResponse(textToSend);
      setMessages(prev => [...prev, { id: Date.now() + 1, text: response, sender: 'bot' }]);
    }, 600);
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 w-16 h-16 bg-[#2c3b29] text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-[90] border-4 border-white"
      >
        <MessageCircle size={28} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-28 right-8 w-[340px] h-[500px] bg-white rounded-[2.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.2)] border border-[#e2e0d8] flex flex-col overflow-hidden z-[100]"
          >
            <div className="bg-[#2c3b29] p-6 flex justify-between items-center text-white">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/10 rounded-2xl flex items-center justify-center border border-white/10">
                  <ShieldCheck size={20} className="text-white" />
                </div>
                <div>
                  <span className="font-serif font-bold italic block leading-none">Vaka Assistant</span>
                  <span className="text-[10px] text-white/50 uppercase tracking-widest font-bold">Always Online</span>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="bg-white/10 hover:bg-white/20 p-2 rounded-xl transition-colors">
                <X size={18} />
              </button>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 bg-[#fcfcfa]">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                    className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${
                      msg.sender === 'user' 
                        ? 'bg-[var(--color-brand-accent)] text-white rounded-tr-none shadow-md' 
                        : 'bg-white text-[var(--color-brand-text)] rounded-tl-none border border-[#e2e0d8] shadow-sm'
                    }`}
                  >
                    {msg.text}
                  </motion.div>
                </div>
              ))}
              
              {/* Bot typing simulation or Quick Actions at the end */}
              {messages.length > 0 && messages[messages.length - 1].sender === 'bot' && (
                <div className="flex flex-wrap gap-2 mt-4 pt-2 border-t border-[#f0eee4]">
                  {QUICK_ACTIONS.map(action => (
                    <button 
                      key={action.key}
                      onClick={() => handleSend(null, action.label)}
                      className="flex items-center gap-1.5 px-3 py-2 bg-white border border-[#e2e0d8] rounded-full text-[10px] font-bold text-[var(--color-brand-text-muted)] hover:border-[var(--color-brand-accent)] hover:text-[var(--color-brand-accent)] transition-all uppercase tracking-wide"
                    >
                      {action.icon}
                      {action.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <form onSubmit={handleSend} className="p-4 bg-white border-t border-[#f0eee4] flex space-x-2">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me something..."
                className="flex-1 bg-[#fcfcfa] border border-[#e2e0d8] px-5 py-3.5 rounded-2xl text-sm outline-none focus:border-[var(--color-brand-accent)] transition-all"
              />
              <button type="submit" className="bg-[var(--color-brand-accent)] text-white p-3.5 rounded-2xl hover:bg-[var(--color-brand-accent-hover)] transition-all shadow-lg active:scale-95">
                <Send size={20} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
