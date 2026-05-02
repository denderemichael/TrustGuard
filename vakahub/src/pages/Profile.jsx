import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, ShieldCheck, Settings, User, LogOut, CheckCircle, Activity } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import Wallet from '../components/Wallet';

const Profile = () => {
  const { t, user, role, orders, logout, setCurrentTab, setShowAddProduct, resetApp } = useAppContext();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.displayName || '');
  const [bio, setBio] = useState('');

  // Simulated AI Trust Score based on role
  const trustScore = role === 'admin' ? 98 : 95;

  const userOrders = orders.filter(o => o.status !== 'pending');

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Header Card */}
      <div className="bg-white rounded-[3rem] shadow-sm border border-[#e2e0d8] overflow-hidden mb-8">
        <div className="h-32 bg-[var(--color-brand-accent)] relative">
          <div className="absolute -bottom-12 left-8">
            <div className="w-24 h-24 rounded-3xl bg-white p-1 shadow-lg border border-[#e2e0d8]">
              <div className="w-full h-full rounded-[1.25rem] bg-[#f0eee4] flex items-center justify-center text-4xl font-serif text-[var(--color-brand-accent)] overflow-hidden">
                {user?.photoURL ? <img src={user.photoURL} alt="" /> : (user?.displayName?.charAt(0) || 'U')}
              </div>
            </div>
          </div>
        </div>

        <div className="pt-16 pb-8 px-8">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center space-x-3">
                <h2 className="text-3xl font-serif font-bold text-[var(--color-brand-text)] italic">
                  {user?.displayName || 'User'}
                </h2>
                <div className="bg-emerald-50 text-emerald-600 px-2 py-1 rounded-lg flex items-center space-x-1 border border-emerald-100">
                  <CheckCircle size={14} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">AI Verified</span>
                </div>
              </div>
              <p className="text-[var(--color-brand-text-muted)] flex items-center space-x-2 mt-2 font-medium">
                <span className="uppercase text-xs tracking-widest font-bold bg-[#f0eee4] px-3 py-1 rounded-full">{role} Account</span>
                <span>·</span>
                <span>{user?.email}</span>
              </p>
              
              <div className="mt-4 flex items-center space-x-2 bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-xl border border-indigo-100 w-fit">
                <Activity size={16} />
                <span className="text-xs font-bold tracking-wide">Google AI Trust Score: {trustScore}%</span>
              </div>
            </div>
            <button 
              onClick={() => setIsEditing(!isEditing)}
              className="text-sm font-bold text-[var(--color-brand-accent)] bg-[#fcfcfa] border border-[#e2e0d8] px-6 py-2 rounded-xl hover:bg-[#f0eee4] transition-colors"
            >
              {isEditing ? 'Save' : 'Edit Profile'}
            </button>
            <button
              onClick={logout}
              className="p-2 rounded-full border border-rose-100 text-rose-500 hover:bg-rose-50 transition-colors"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>

        {isEditing && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="px-8 pb-8 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-[var(--color-brand-text-muted)] uppercase tracking-widest mb-1">Display Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-3 rounded-xl border border-[#e2e0d8] focus:border-[var(--color-brand-accent)] outline-none" />
              </div>
            </div>
            <button className="bg-[var(--color-brand-accent)] text-white px-8 py-3 rounded-xl font-bold text-sm">Save Changes</button>
          </motion.div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Wallet Section */}
        <div className="lg:col-span-1">
          <Wallet />
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
                  <div className="text-center py-16">
                    <div className="w-16 h-16 bg-[#fcfcfa] rounded-full flex items-center justify-center mx-auto mb-4 border border-[#e2e0d8]">
                      <ShoppingBag size={24} className="text-[#d1cec1]" />
                    </div>
                    <p className="text-[var(--color-brand-text-muted)] text-sm italic">No past orders found.</p>
                  </div>
                ) : (
                  userOrders.map(order => (
                    <div key={order.id} className="p-6 rounded-[2rem] border border-[#f0eee4] hover:border-[#e2e0d8] hover:shadow-sm transition-all bg-[#fcfcfa]/50">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[var(--color-brand-accent)] border border-[#e2e0d8] shadow-sm">
                            <ShieldCheck size={20} />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-[var(--color-brand-text)]">{order.id}</p>
                            <p className="text-[10px] text-[var(--color-brand-text-muted)] font-bold uppercase tracking-widest">{new Date(order.date).toLocaleDateString()}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-serif font-bold text-[var(--color-brand-accent)]">${order.totalUsd.toFixed(2)}</p>
                          <span className={`text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-widest ${order.status === 'released' ? 'bg-[#e8faed] text-[#2e7d32]' : 'bg-[#fff8e1] text-[#f57f17]'
                            }`}>
                            {order.status === 'released' ? "Released" : "In Escrow"}
                          </span>
                        </div>
                      </div>
                      <div className="border-t border-[#f0eee4] pt-4">
                        <p className="text-[10px] font-bold text-[var(--color-brand-text-muted)] uppercase tracking-widest mb-2">Items Bought:</p>
                        <div className="flex flex-wrap gap-2">
                          {order.items.map((item, idx) => (
                            <span key={idx} className="bg-white border border-[#e2e0d8] px-3 py-1 rounded-lg text-xs text-[var(--color-brand-text)] shadow-sm">
                              {item.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Add Product", action: () => { setCurrentTab('products'); setShowAddProduct(true); }, icon: <ShoppingBag size={20} /> },
                  { label: "View Orders", action: () => setCurrentTab('orders'), icon: <ShieldCheck size={20} /> },
                  { label: "Business Ads", action: () => setCurrentTab('advertise'), icon: <Settings size={20} /> },
                  { label: "Support Chat", action: () => setCurrentTab('contact'), icon: <User size={20} /> },
                ].map((item, i) => (
                  <button key={i} onClick={item.action} className="flex flex-col items-center justify-center p-6 rounded-[2rem] border border-[#e2e0d8] hover:border-[var(--color-brand-accent)] hover:bg-[#fcfcfa] transition-all group">
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
      
      {/* Dev Reset */}
      <div className="mt-12 text-center">
        <button 
          onClick={resetApp}
          className="text-xs text-[var(--color-brand-text-muted)] hover:text-rose-500 transition-colors"
        >
          Developer: Reset App Data (Show Onboarding)
        </button>
      </div>
    </div>
  );
};

export default Profile;



