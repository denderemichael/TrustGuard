import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Wallet, ShoppingBag, ShieldCheck, Settings, User, X } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const Profile = () => {
  const { t, userProfile, updateProfile, role, wallets, orders } = useAppContext();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(userProfile.name);
  const [bio, setBio] = useState(userProfile.bio);

  const handleSave = () => {
    updateProfile({ ...userProfile, name, bio });
    setIsEditing(false);
  };

  const userOrders = orders.filter(o => o.status !== 'pending');

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Header Card */}
      <div className="bg-white rounded-[3rem] shadow-sm border border-[#e2e0d8] overflow-hidden mb-8">
        <div className="h-32 bg-[var(--color-brand-accent)] relative">
          <div className="absolute -bottom-12 left-8">
            <div className="w-24 h-24 rounded-3xl bg-white p-1 shadow-lg border border-[#e2e0d8]">
              <div className="w-full h-full rounded-[1.25rem] bg-[#f0eee4] flex items-center justify-center text-4xl font-serif text-[var(--color-brand-accent)] overflow-hidden">
                {userProfile.avatar ? <img src={userProfile.avatar} alt="" /> : userProfile.name.charAt(0) || 'V'}
              </div>
            </div>
          </div>
        </div>
        
        <div className="pt-16 pb-8 px-8 flex justify-between items-start">
          <div className="space-y-1">
            <div className="flex items-center space-x-3">
              <h2 className="text-3xl font-serif font-bold text-[var(--color-brand-text)] italic">
                {userProfile.name || "VakaHub User"}
              </h2>
              <span className="bg-[#ebe8de] text-[var(--color-brand-text-muted)] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest border border-[#d1cec1]">
                {role === 'admin' ? "Merchant" : "Buyer"}
              </span>
            </div>
            <p className="text-[var(--color-brand-text-muted)] text-sm max-w-sm">{userProfile.bio || "No bio yet."}</p>
          </div>
          <button 
            onClick={() => setIsEditing(!isEditing)}
            className="px-6 py-2 rounded-full border border-[#e2e0d8] text-sm font-medium hover:bg-[#fcfcfa] transition-colors"
          >
            {isEditing ? "Cancel" : "Edit Profile"}
          </button>
        </div>

        {isEditing && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="px-8 pb-8 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-[var(--color-brand-text-muted)] uppercase tracking-widest mb-1">Display Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-3 rounded-xl border border-[#e2e0d8] focus:border-[var(--color-brand-accent)] outline-none" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-[var(--color-brand-text-muted)] uppercase tracking-widest mb-1">Short Bio</label>
                <input type="text" value={bio} onChange={(e) => setBio(e.target.value)} className="w-full p-3 rounded-xl border border-[#e2e0d8] focus:border-[var(--color-brand-accent)] outline-none" />
              </div>
            </div>
            <button onClick={handleSave} className="bg-[var(--color-brand-accent)] text-white px-8 py-3 rounded-xl font-bold text-sm">Save Changes</button>
          </motion.div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Wallet Section */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-[#2c3b29] text-white p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-white/5 rounded-full blur-2xl"></div>
            <div className="flex items-center space-x-2 text-white/60 text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
              <Wallet size={12} />
              <span>Available Wallet</span>
            </div>
            <h3 className="text-4xl font-serif font-bold italic">
              ${role === 'admin' ? wallets.merchant.toFixed(2) : wallets.buyer.toFixed(2)}
            </h3>
            <p className="text-white/40 text-[10px] mt-4">Safe & Tax-Free Transactions</p>
          </div>

          {role === 'user' && wallets.pending > 0 && (
            <div className="bg-amber-50 border border-amber-100 p-6 rounded-[2rem]">
              <div className="flex items-center space-x-2 text-amber-700 text-[10px] font-bold uppercase tracking-widest mb-1">
                <ShieldCheck size={12} />
                <span>Pending Escrow</span>
              </div>
              <p className="text-2xl font-bold text-amber-800">${wallets.pending.toFixed(2)}</p>
            </div>
          )}
        </div>

        {/* History / Features Section */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-[2.5rem] border border-[#e2e0d8] p-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-serif font-bold italic">{role === 'admin' ? "Business Settings" : "Order History"}</h3>
            </div>

            {role === 'user' ? (
              <div className="space-y-4">
                {userOrders.length === 0 ? (
                  <p className="text-center py-10 text-[var(--color-brand-text-muted)] text-sm italic">No past orders found.</p>
                ) : (
                  userOrders.map(order => (
                    <div key={order.id} className="flex justify-between items-center p-4 rounded-2xl border border-[#f0eee4] hover:border-[#e2e0d8] transition-colors">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-xl bg-[#fcfcfa] flex items-center justify-center text-[var(--color-brand-accent)] border border-[#e2e0d8]">
                          <ShoppingBag size={18} />
                        </div>
                        <div>
                          <p className="text-sm font-bold">{order.id}</p>
                          <p className="text-[10px] text-[var(--color-brand-text-muted)]">{new Date(order.date).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-[var(--color-brand-accent)]">${order.totalUsd.toFixed(2)}</p>
                        <span className="text-[9px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full uppercase">Completed</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Add Product", tab: 'products', icon: <ShoppingBag size={20} /> },
                  { label: "View Orders", tab: 'orders', icon: <Wallet size={20} /> },
                  { label: "Business Ads", tab: 'advertise', icon: <Settings size={20} /> },
                  { label: "Support Chat", tab: 'chatbot', icon: <User size={20} /> },
                ].map((item, i) => (
                  <button key={i} className="flex flex-col items-center justify-center p-6 rounded-[2rem] border border-[#e2e0d8] hover:border-[var(--color-brand-accent)] hover:bg-[#fcfcfa] transition-all group">
                    <div className="text-[var(--color-brand-text-muted)] group-hover:text-[var(--color-brand-accent)] transition-colors mb-3">
                      {item.icon}
                    </div>
                    <span className="text-xs font-bold text-[var(--color-brand-text-muted)] group-hover:text-[var(--color-brand-text)] uppercase tracking-wider">{item.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
