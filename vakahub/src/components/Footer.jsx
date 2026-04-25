import React from 'react';
import { Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[var(--color-brand-bg)] pt-20 pb-10 border-t border-[#e2e0d8] mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner Section inside Footer */}
        <div className="bg-[var(--color-brand-accent)] rounded-[2rem] p-12 mb-16 flex flex-col md:flex-row items-center justify-between relative overflow-hidden text-white shadow-xl">
          <div className="relative z-10 md:w-1/2">
            <h2 className="text-4xl font-serif mb-4 italic">Stay Updated,<br/>Stay Radiant</h2>
            <p className="text-white/80 mb-8 max-w-sm">Be the first to know about new products, offers, and local commerce tips.</p>
            <div className="flex bg-white/10 rounded-full p-1 border border-white/20 w-full max-w-md">
              <input 
                type="email" 
                placeholder="Your Email" 
                className="bg-transparent text-white px-6 py-3 w-full focus:outline-none placeholder-white/50"
              />
              <button className="bg-white text-[var(--color-brand-accent)] px-8 py-3 rounded-full font-medium transition-transform hover:scale-105">
                Subscribe
              </button>
            </div>
          </div>
          <div className="hidden md:block absolute right-0 bottom-0 opacity-20 transform translate-x-1/4 translate-y-1/4">
            <Mail size={400} strokeWidth={0.5} />
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-[var(--color-brand-text-muted)] border-t border-[#e2e0d8] pt-8">
          <p>© 2026 VakaHub. Powered by LocalFlow.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-[var(--color-brand-text)]">Privacy Policy</a>
            <a href="#" className="hover:text-[var(--color-brand-text)]">Terms of Service</a>
            <a href="#" className="hover:text-[var(--color-brand-text)]">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
