import React, { createContext, useState, useEffect, useContext } from 'react';
import { translations } from '../translations';
import { auth, db } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc, addDoc, updateDoc, onSnapshot, collection, query, where, orderBy, deleteDoc, serverTimestamp } from 'firebase/firestore';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState(() => localStorage.getItem('vakahub_language') || 'en');
  const [role, setRole] = useState(null);
  const [onboarded, setOnboarded] = useState(() => localStorage.getItem('vakahub_onboarded') === 'true');
  
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [wallets, setWallets] = useState({ available: 0, escrow: 0, total: 0 });
  const [cart, setCart] = useState([]);
  const [currentTab, setCurrentTab] = useState('home');
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [navHistory, setNavHistory] = useState(['home']);
  const [userProfile, setUserProfile] = useState({ name: '', bio: '' });

  const ZIG_RATE = 25;

  // 1. Auth Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        setUser(authUser);
        // Fetch user data/role from Firestore
        const userRef = doc(db, 'users', authUser.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setRole(userSnap.data().role);
        }
      } else {
        setUser(null);
        setRole(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  // 2. Role Sync
  const updateRole = async (newRole) => {
    if (user) {
      await setDoc(doc(db, 'users', user.uid), { role: newRole }, { merge: true });
      setRole(newRole);
    }
  };

  const saveOnboarded = (val) => {
    localStorage.setItem('vakahub_onboarded', val ? 'true' : 'false');
    setOnboarded(val);
  };

  // 3. Firestore Listeners for Data
  useEffect(() => {
    if (!user) return;
    const qProducts = query(collection(db, 'products'), orderBy('createdAt', 'desc'));
    const unsubProducts = onSnapshot(qProducts, (snap) => {
      setProducts(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    // Listen for orders (related to this user)
    const qOrders = role === 'admin' 
      ? query(collection(db, 'orders'), where('sellerId', '==', user.uid), orderBy('date', 'desc'))
      : query(collection(db, 'orders'), where('buyerId', '==', user.uid), orderBy('date', 'desc'));
    
    const unsubOrders = onSnapshot(qOrders, (snap) => {
      setOrders(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    // Listen for wallet
    const unsubWallet = onSnapshot(doc(db, 'wallets', user.uid), (doc) => {
      if (doc.exists()) setWallets(doc.data());
      else setWallets({ available: 0, escrow: 0, total: 0 });
    });

    return () => {
      unsubProducts();
      unsubOrders();
      unsubWallet();
    };
  }, [user, role]);

  // Utility functions
  const t = (key) => translations[language]?.[key] || translations['en'][key] || key;
  const getZiGPrice = (usd) => (usd * ZIG_RATE).toFixed(2);

  const navigateTo = (tab) => {
    if (tab === currentTab) return;
    setNavHistory(prev => [...prev, tab]);
    setCurrentTab(tab);
  };

  const goBack = () => {
    if (navHistory.length <= 1) return;
    const newHistory = [...navHistory];
    newHistory.pop();
    setCurrentTab(newHistory[newHistory.length - 1]);
    setNavHistory(newHistory);
  };

  const logout = () => signOut(auth);

  const [notifications, setNotifications] = useState([]);

  const addNotification = (title, message, type = 'success') => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 5000);
  };

  const createOrder = async (items, totalUsd, paymentMethod) => {
    if (!user) return;
    
    const orderId = `ORD-${Date.now().toString(36).toUpperCase()}`;
    const escrowId = `ESC-${Date.now().toString(36).toUpperCase()}`;
    
    const newOrder = {
      id: orderId,
      items: items.map(({ cartId, ...rest }) => rest),
      totalUsd,
      totalZig: getZiGPrice(totalUsd),
      paymentMethod,
      status: 'pending',
      date: new Date().toISOString(),
      expiry: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      escrowId,
      buyerId: user.uid,
      buyerName: user.displayName || 'Anonymous Buyer',
      sellerId: items[0]?.sellerId || 'shop-1'
    };

    try {
      await setDoc(doc(db, 'orders', orderId), newOrder);
      
      const walletRef = doc(db, 'wallets', user.uid);
      const walletSnap = await getDoc(walletRef);
      const currentWallet = walletSnap.exists() ? walletSnap.data() : { available: 0, escrow: 0, total: 0 };
      
      await setDoc(walletRef, {
        available: Math.max(0, currentWallet.available - totalUsd),
        escrow: (currentWallet.escrow || 0) + totalUsd,
        total: currentWallet.total || 0
      }, { merge: true });

      addNotification("Funds Secured", `$${totalUsd.toFixed(2)} has been moved to your Escrow Wallet safely.`);
      return true;
    } catch (error) {
      console.error("Order creation failed:", error);
      return false;
    }
  };

  const addProduct = async (data) => {
    if (!user) return;
    const id = Date.now().toString();
    await setDoc(doc(db, 'products', id), {
      ...data,
      id,
      sellerId: user.uid,
      createdAt: new Date().toISOString()
    });
    addNotification("Product Added", `${data.name} is now live in the marketplace.`);
  };

  const updateProduct = async (id, data) => {
    await setDoc(doc(db, 'products', id), data, { merge: true });
    addNotification("Product Updated", `${data.name} has been updated.`);
  };

  const deleteProduct = async (id) => {
    await deleteDoc(doc(db, 'products', id));
    addNotification("Product Deleted", "The item has been removed from your shop.");
  };

  const updateProfile = (data) => {
    setUserProfile(data);
    addNotification("Profile Updated", "Your profile has been saved successfully.");
  };

  const resetApp = async () => {
    await signOut(auth);
    localStorage.clear();
    window.location.reload();
  };

  const addAdvertisement = async (adData) => {
    // For now, we simulate adding an advertisement
    addNotification("Campaign Created", "Your advertisement is now active.");
  };

  return (
    <AppContext.Provider value={{ 
      user, loading,
      language, setLanguage, 
      role, setRole: updateRole,
      onboarded, setOnboarded: saveOnboarded,
      showAddProduct, setShowAddProduct,
      products, orders, wallets, cart,
      currentTab, setCurrentTab: navigateTo, goBack, canGoBack: navHistory.length > 1,
      t, getZiGPrice, logout,
      createOrder, notifications,
      addProduct, updateProduct, deleteProduct,
      userProfile, updateProfile, resetApp, addAdvertisement,
      addToCart: (p) => setCart(prev => [...prev, { ...p, cartId: Date.now() }]),
      removeFromCart: (id) => setCart(prev => prev.filter(i => i.cartId !== id)),
      clearCart: () => setCart([])
    }}>
      {children}
    </AppContext.Provider>
  );
};
