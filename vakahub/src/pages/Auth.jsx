import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, ShieldCheck, ArrowRight } from 'lucide-react';
import { auth, db } from '../firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  updateProfile 
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useAppContext } from '../context/AppContext';

const Auth = () => {
  const { t, setRole } = useAppContext();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        // Update profile with name
        await updateProfile(user, { displayName: name });
        
        // Create user doc in Firestore (default role null, will be set in RoleSelection)
        await setDoc(doc(db, 'users', user.uid), {
          uid: user.uid,
          name,
          email,
          role: null,
          createdAt: new Date().toISOString()
        });
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-brand-bg)] flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-sm bg-white rounded-[2.5rem] p-8 shadow-xl border border-[#e2e0d8]"
      >
        <div className="text-center mb-8">
          <h1 className="text-2xl font-serif font-bold italic text-[var(--color-brand-text)]">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h1>
          <p className="text-[var(--color-brand-text-muted)] text-xs mt-2">
            {isLogin ? 'Login to access your secure wallet' : 'Join Zimbabwe\'s most secure marketplace'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-[var(--color-brand-text-muted)] uppercase tracking-widest px-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-brand-text-muted)]" size={16} />
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required 
                  placeholder="John Doe"
                  className="w-full bg-[#fcfcfa] border border-[#e2e0d8] p-3 pl-10 text-sm rounded-xl outline-none focus:border-[var(--color-brand-accent)] transition-all"
                />
              </div>
            </div>
          )}

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-[var(--color-brand-text-muted)] uppercase tracking-widest px-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-brand-text-muted)]" size={16} />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
                placeholder="john@example.com"
                className="w-full bg-[#fcfcfa] border border-[#e2e0d8] p-3 pl-10 text-sm rounded-xl outline-none focus:border-[var(--color-brand-accent)] transition-all"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-[var(--color-brand-text-muted)] uppercase tracking-widest px-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-brand-text-muted)]" size={16} />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
                placeholder="••••••••"
                className="w-full bg-[#fcfcfa] border border-[#e2e0d8] p-3 pl-10 text-sm rounded-xl outline-none focus:border-[var(--color-brand-accent)] transition-all"
              />
            </div>
          </div>

          {error && (
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-rose-500 text-xs font-medium text-center"
            >
              {error}
            </motion.p>
          )}

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-[var(--color-brand-accent)] text-white p-4 rounded-xl font-bold text-sm shadow-lg hover:shadow-xl active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center space-x-2 mt-2"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <span>{isLogin ? 'Login' : 'Get Started'}</span>
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-[var(--color-brand-text-muted)] text-sm font-medium hover:text-[var(--color-brand-accent)] transition-colors"
          >
            {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;
