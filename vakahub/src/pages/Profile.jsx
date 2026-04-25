import React, { useState } from 'react';
import { User, Camera, Shield, History, MapPin } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const Profile = () => {
  const { t, userProfile, updateProfile, sales, products, role } = useAppContext();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(userProfile.name);
  const [bio, setBio] = useState(userProfile.bio);

  const handleSave = () => {
    updateProfile({ ...userProfile, name, bio });
    setIsEditing(false);
  };

  const myPurchases = products.filter(p => p.status === 'bought');
  const mySales = sales;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white rounded-[2.5rem] shadow-sm border border-[#e2e0d8] overflow-hidden">
        {/* Cover Photo */}
        <div className="h-48 bg-gradient-to-r from-[#2c3b29] to-[#4a5d46] relative">
          <div className="absolute -bottom-16 left-12">
            <div className="w-32 h-32 rounded-3xl bg-white p-1 shadow-lg border border-[#e2e0d8]">
              <div className="w-full h-full rounded-2xl bg-[#f0eee4] flex items-center justify-center text-[var(--color-brand-accent)]">
                {userProfile.avatar ? (
                  <img src={userProfile.avatar} alt="Avatar" className="w-full h-full object-cover rounded-2xl" />
                ) : (
                  <User size={48} />
                )}
              </div>
              <button className="absolute bottom-2 right-2 bg-white p-2 rounded-xl shadow-md border border-[#e2e0d8] text-[var(--color-brand-text-muted)] hover:text-[var(--color-brand-accent)] transition-colors">
                <Camera size={16} />
              </button>
            </div>
          </div>
        </div>

        <div className="pt-20 px-12 pb-12">
          <div className="flex justify-between items-start mb-8">
            <div>
              {isEditing ? (
                <div className="space-y-4">
                  <input 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your Name"
                    className="text-3xl font-serif bg-[#fcfcfa] border border-[#e2e0d8] p-2 rounded-xl focus:outline-none focus:border-[var(--color-brand-accent)] w-full"
                  />
                  <textarea 
                    value={bio} 
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Short bio..."
                    className="text-[var(--color-brand-text-muted)] bg-[#fcfcfa] border border-[#e2e0d8] p-3 rounded-xl focus:outline-none focus:border-[var(--color-brand-accent)] w-full h-24"
                  />
                </div>
              ) : (
                <>
                  <h1 className="text-4xl font-serif text-[var(--color-brand-text)]">{userProfile.name || 'Anonymous Merchant'}</h1>
                  <p className="text-[var(--color-brand-text-muted)] mt-2 max-w-md">{userProfile.bio || 'Building trust in the local marketplace.'}</p>
                </>
              )}
              
              <div className="flex items-center space-x-4 mt-6 text-sm text-[var(--color-brand-text-muted)]">
                <div className="flex items-center space-x-1">
                  <MapPin size={14} />
                  <span>Harare, Zimbabwe</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Shield size={14} className="text-[#2e7d32]" />
                  <span className="text-[#2e7d32] font-medium">Verified Account</span>
                </div>
              </div>
            </div>

            <button 
              onClick={isEditing ? handleSave : () => setIsEditing(true)}
              className="px-6 py-2.5 rounded-full bg-[#f0eee4] text-[var(--color-brand-text)] font-medium hover:bg-[#e2e0d8] transition-colors"
            >
              {isEditing ? t('saveProfile') : t('editProfile')}
            </button>
          </div>

          <div className="bg-rose-50 border border-rose-100 p-4 rounded-2xl mb-12 flex items-start space-x-3">
            <Shield size={20} className="text-rose-500 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-rose-700">{t('accountLimit')}</p>
              <p className="text-xs text-rose-600 mt-0.5">VakaHub uses biometric-linked device IDs to ensure platform integrity.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="font-serif text-2xl text-[var(--color-brand-text)] flex items-center space-x-2">
                <History size={20} />
                <span>{role === 'user' ? t('orders') : t('recentTransactions')}</span>
              </h3>
              <div className="space-y-4">
                {(role === 'user' ? myPurchases : mySales).length > 0 ? (
                  (role === 'user' ? myPurchases : mySales).map((item, i) => (
                    <div key={i} className="p-4 bg-[#fcfcfa] rounded-2xl border border-[#e2e0d8] flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-white rounded-xl border border-[#e2e0d8] overflow-hidden">
                          <img src={item.image} alt="" className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="font-medium text-[var(--color-brand-text)]">{item.name || item.product}</p>
                          <p className="text-xs text-[var(--color-brand-text-muted)]">{new Date(item.boughtAt || item.date).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <p className="font-bold text-[var(--color-brand-accent)]">${item.price || item.amount}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-[var(--color-brand-text-muted)] italic">No history yet.</p>
                )}
              </div>
            </div>

            <div className="bg-[#f0eee4] rounded-[2rem] p-8">
              <h4 className="font-serif text-xl mb-4">Merchant Score</h4>
              <div className="flex items-end space-x-2 mb-6">
                <span className="text-5xl font-serif text-[var(--color-brand-accent)]">98</span>
                <span className="text-lg text-[var(--color-brand-text-muted)] mb-1">/ 100</span>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-xs">
                  <span className="text-[var(--color-brand-text-muted)]">Reliability</span>
                  <span className="font-medium">High</span>
                </div>
                <div className="w-full h-2 bg-white rounded-full overflow-hidden">
                  <div className="h-full bg-[var(--color-brand-accent)] w-[92%]"></div>
                </div>
                <div className="flex justify-between text-xs pt-2">
                  <span className="text-[var(--color-brand-text-muted)]">Release Time</span>
                  <span className="font-medium">&lt; 2 hours</span>
                </div>
                <div className="w-full h-2 bg-white rounded-full overflow-hidden">
                  <div className="h-full bg-[var(--color-brand-accent)] w-[85%]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
