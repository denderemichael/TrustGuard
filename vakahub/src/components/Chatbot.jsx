import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, User, ShieldCheck, ShoppingBag, CreditCard, HelpCircle, Loader2 } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize SDK
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || 'dummy_key');

const SYSTEM_PROMPT = `You are VakaHub Assistant, a friendly and helpful AI for a local Zimbabwean e-commerce platform.
VakaHub features:
- 100% Escrow Protection: Funds are held safely until the buyer scans a QR code upon receiving goods.
- Local First: Focused on Zimbabwean merchants and buyers.
- Zero Foreign Ads Tax: Merchants save 15.5% compared to foreign ad platforms.
- Currencies: Prices shown in USD and ZiG.

Keep answers concise, friendly, and formatted nicely. If you don't know something, tell them to check their Profile or Contact Support.`;

const Chatbot = () => {
  const { t, setCurrentTab } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);
  const chatSessionRef = useRef(null);

  // Initialize first message and Gemini session when opened
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{ id: 1, text: t('botIntro'), sender: 'bot' }]);
    }
    
    if (isOpen && !chatSessionRef.current) {
      try {
        const model = genAI.getGenerativeModel({ 
          model: 'gemini-1.5-flash',
          systemInstruction: SYSTEM_PROMPT
        });
        chatSessionRef.current = model.startChat({ history: [] });
      } catch (error) {
        console.error("Gemini Init Error:", error);
      }
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

  const handleSend = async (e, customText = null) => {
    if (e) e.preventDefault();
    const textToSend = customText || input;
    if (!textToSend.trim()) return;

    const userMsg = { id: Date.now(), text: textToSend, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    if (!customText) setInput('');
    setIsTyping(true);

    try {
      if (!chatSessionRef.current) throw new Error("Chat not initialized");
      const result = await chatSessionRef.current.sendMessage(textToSend);
      const responseText = result.response.text();
      setMessages(prev => [...prev, { id: Date.now() + 1, text: responseText, sender: 'bot' }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { 
        id: Date.now() + 1, 
        text: "I'm having trouble connecting to my AI brain right now. Please make sure your Gemini API key is configured in .env!", 
        sender: 'bot' 
      }]);
    } finally {
      setIsTyping(false);
    }
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

              {isTyping && (
                <div className="flex justify-start">
                  <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white p-4 rounded-2xl rounded-tl-none border border-[#e2e0d8] shadow-sm flex items-center space-x-2">
                    <Loader2 size={16} className="text-[var(--color-brand-accent)] animate-spin" />
                    <span className="text-xs text-[var(--color-brand-text-muted)] italic">Thinking...</span>
                  </motion.div>
                </div>
              )}
              
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
                disabled={isTyping}
                placeholder={isTyping ? "AI is typing..." : "Ask me something..."}
                className="flex-1 bg-[#fcfcfa] border border-[#e2e0d8] px-5 py-3.5 rounded-2xl text-sm outline-none focus:border-[var(--color-brand-accent)] transition-all disabled:opacity-50"
              />
              <button 
                type="submit" 
                disabled={isTyping || !input.trim()}
                className="bg-[var(--color-brand-accent)] text-white p-3.5 rounded-2xl hover:bg-[var(--color-brand-accent-hover)] transition-all shadow-lg active:scale-95 disabled:opacity-50 disabled:active:scale-100"
              >
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
