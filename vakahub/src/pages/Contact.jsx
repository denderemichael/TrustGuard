import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Phone, Mail, MessageSquare } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const Contact = () => {
  const { t } = useAppContext();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      <div className="text-center mb-16">
        <h2 className="text-5xl font-serif text-[var(--color-brand-text)] italic mb-4">Get in Touch</h2>
        <p className="text-[var(--color-brand-text-muted)] max-w-lg mx-auto">
          Have questions about your order or the escrow system? Our team is here to help you trade safely.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Contact Form */}
        <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-[#e2e0d8]">
          {submitted ? (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-10">
              <div className="w-20 h-20 bg-[#e8faed] rounded-full flex items-center justify-center mx-auto mb-6">
                <Send size={32} className="text-[#2e7d32]" />
              </div>
              <h3 className="text-2xl font-serif font-bold mb-2">Message Sent!</h3>
              <p className="text-[var(--color-brand-text-muted)] text-sm">We'll get back to you within 24 hours.</p>
              <button onClick={() => setSubmitted(false)} className="mt-8 text-[var(--color-brand-accent)] font-bold hover:underline">Send another message</button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-[var(--color-brand-text-muted)] uppercase tracking-widest px-1">Full Name</label>
                <input type="text" required className="w-full bg-[#fcfcfa] border border-[#e2e0d8] p-4 rounded-2xl focus:border-[var(--color-brand-accent)] outline-none" placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-[var(--color-brand-text-muted)] uppercase tracking-widest px-1">Email Address</label>
                <input type="email" required className="w-full bg-[#fcfcfa] border border-[#e2e0d8] p-4 rounded-2xl focus:border-[var(--color-brand-accent)] outline-none" placeholder="john@example.com" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-[var(--color-brand-text-muted)] uppercase tracking-widest px-1">Message</label>
                <textarea required className="w-full bg-[#fcfcfa] border border-[#e2e0d8] p-4 rounded-2xl focus:border-[var(--color-brand-accent)] outline-none h-32" placeholder="How can we help?"></textarea>
              </div>
              <button type="submit" className="w-full bg-[var(--color-brand-accent)] text-white py-5 rounded-2xl font-bold shadow-xl hover:shadow-2xl transition-all flex items-center justify-center space-x-2">
                <Send size={18} />
                <span>Send Message</span>
              </button>
            </form>
          )}
        </div>

        {/* Contact Info */}
        <div className="space-y-8 py-4">
          <div className="space-y-6">
            <h3 className="text-2xl font-serif font-bold italic">Contact Information</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-[#f0eee4] rounded-2xl flex items-center justify-center text-[var(--color-brand-accent)]">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-[var(--color-brand-text-muted)] uppercase tracking-widest">Phone</p>
                  <p className="font-medium">+263 77 123 4567</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-[#f0eee4] rounded-2xl flex items-center justify-center text-[var(--color-brand-accent)]">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-[var(--color-brand-text-muted)] uppercase tracking-widest">Email</p>
                  <p className="font-medium">support@vakahub.co.zw</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8 bg-[#2c3b29] text-white rounded-[2.5rem] shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-10 -mt-10 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
            <MessageSquare size={24} className="mb-4 text-white/60" />
            <h4 className="text-xl font-serif font-bold mb-2 italic">Quick Support via WhatsApp</h4>
            <p className="text-white/60 text-sm mb-6 leading-relaxed">
              Prefer chatting on WhatsApp? Our automated assistant can help with common queries instantly.
            </p>
            <a 
              href="https://wa.me/263771234567" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block bg-white text-[var(--color-brand-text)] px-8 py-3 rounded-xl font-bold text-sm hover:bg-[#f0eee4] transition-colors"
            >
              Open WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
