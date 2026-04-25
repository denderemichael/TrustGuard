import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, User } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const Chatbot = () => {
  const { t } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I'm your VakaHub assistant. How can I help you today?", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const responses = {
    'how to pay': "To pay, add items to your cart and checkout. Your funds will be held in escrow until you collect your goods.",
    'where is my order': "You can find your active orders and escrow codes in the 'My Orders' section.",
    'refunds': "If a merchant doesn't handover the goods or the code expires, you can request a refund through your profile.",
    'escrow': "Escrow means we hold your money safely until you confirm you've received your items.",
    'zig': "We support both USD and ZiG. The current exchange rate is 1 USD = 25 ZiG.",
    'hello': "Hi there! How can I help you today?",
    'help': "I can help with: 'how to pay', 'where is my order', 'refunds', and 'escrow'."
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { id: Date.now(), text: input, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    // Simulate bot response
    setTimeout(() => {
      const lowerInput = input.toLowerCase();
      let botResponse = "I'm not sure about that. Try asking about 'how to pay', 'orders', or 'refunds'. Type 'help' for more.";
      
      for (const key in responses) {
        if (lowerInput.includes(key)) {
          botResponse = responses[key];
          break;
        }
      }

      setMessages(prev => [...prev, { id: Date.now() + 1, text: botResponse, sender: 'bot' }]);
    }, 600);
  };

  return (
    <>
      {/* Floating Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 w-16 h-16 bg-[#2c3b29] text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-[90]"
      >
        <MessageCircle size={28} />
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-28 right-8 w-80 h-[28rem] bg-white rounded-[2.5rem] shadow-2xl border border-[#e2e0d8] flex flex-col overflow-hidden z-[100]"
          >
            {/* Header */}
            <div className="bg-[#2c3b29] p-6 flex justify-between items-center text-white">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <MessageCircle size={16} />
                </div>
                <span className="font-serif font-bold italic tracking-wide">Vaka Assistant</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-1 rounded-lg">
                <X size={20} />
              </button>
            </div>

            {/* Messages Area */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 bg-[#fcfcfa]">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-4 rounded-2xl text-sm ${
                    msg.sender === 'user' 
                      ? 'bg-[var(--color-brand-accent)] text-white rounded-tr-none' 
                      : 'bg-[#f0eee4] text-[var(--color-brand-text)] rounded-tl-none'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input Area */}
            <form onSubmit={handleSend} className="p-4 bg-white border-t border-[#e2e0d8] flex space-x-2">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me something..."
                className="flex-1 bg-[#fcfcfa] border border-[#e2e0d8] px-4 py-3 rounded-xl text-sm outline-none focus:border-[var(--color-brand-accent)]"
              />
              <button type="submit" className="bg-[var(--color-brand-accent)] text-white p-3 rounded-xl hover:bg-[var(--color-brand-accent-hover)] transition-colors">
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
