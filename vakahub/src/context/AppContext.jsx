import React, { createContext, useState, useEffect, useContext } from 'react';
import { translations } from '../translations';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => localStorage.getItem('vakahub_language') || null);
  const [role, setRole] = useState(() => localStorage.getItem('vakahub_role') || null); // 'admin' or 'user'
  const [sales, setSales] = useState(() => {
    const saved = localStorage.getItem('vakahub_sales');
    return saved ? JSON.parse(saved) : [];
  });
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('vakahub_products');
    const parsed = saved ? JSON.parse(saved) : null;
    
    // Force reset if we have old data or less than 10 products
    if (parsed && parsed.length >= 10 && parsed[0].bgImage) return parsed;
    
    const initialProducts = [
      { id: 1, name: "Baobab Health Powder", price: 12.50, category: "Health", image: "/honey.png", bgImage: "https://images.unsplash.com/photo-1512428815820-22e4d026360f?auto=format&fit=crop&q=80&w=1200", status: 'available' },
      { id: 2, name: "Harare Summer Dress", price: 25.00, category: "Clothing", image: "/honey.png", bgImage: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=1200", status: 'available' },
      { id: 3, name: "Human Hair Lace Wig", price: 85.00, category: "Hair", image: "/honey.png", bgImage: "https://images.unsplash.com/photo-1595475243692-392923ec8970?auto=format&fit=crop&q=80&w=1200", status: 'available' },
      { id: 4, name: "Matte Lipstick Set", price: 15.00, category: "Makeup", image: "/honey.png", bgImage: "https://images.unsplash.com/photo-1586771107445-d3ca888129ee?auto=format&fit=crop&q=80&w=1200", status: 'available' },
      { id: 5, name: "Smart Laptop Pro", price: 450.00, category: "Electronics", image: "/honey.png", bgImage: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=1200", status: 'available' },
      { id: 6, name: "Organic Forest Honey", price: 8.00, category: "Groceries", image: "/honey.png", bgImage: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=1200", status: 'available' },
      { id: 7, name: "Silk Braiding Hair", price: 5.50, category: "Hair", image: "/honey.png", bgImage: "https://images.unsplash.com/photo-1596462502278-27bfdc4033c8?auto=format&fit=crop&q=80&w=1200", status: 'available' },
      { id: 8, name: "Luxury Foundation", price: 22.00, category: "Makeup", image: "/honey.png", bgImage: "https://images.unsplash.com/photo-1599733594230-6b823276abcc?auto=format&fit=crop&q=80&w=1200", status: 'available' },
      { id: 9, name: "Wireless Headphones", price: 45.00, category: "Electronics", image: "/honey.png", bgImage: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=1200", status: 'available' },
      { id: 10, name: "Cotton Men's Shirt", price: 18.00, category: "Clothing", image: "/honey.png", bgImage: "https://images.unsplash.com/photo-1596755094514-f87034a26cc1?auto=format&fit=crop&q=80&w=1200", status: 'available' },
      { id: 11, name: "Ceramic Hair Straightener", price: 35.00, category: "Hair", image: "/honey.png", bgImage: "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?auto=format&fit=crop&q=80&w=1200", status: 'available' },
      { id: 12, name: "Designer Handbag", price: 120.00, category: "Clothing", image: "/honey.png", bgImage: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=1200", status: 'available' },
      { id: 13, name: "Glow Skin Serum", price: 30.00, category: "Makeup", image: "/honey.png", bgImage: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=1200", status: 'available' },
      { id: 14, name: "Bluetooth Speaker", price: 28.00, category: "Electronics", image: "/honey.png", bgImage: "https://images.unsplash.com/photo-1608351489262-8e70bf40b616?auto=format&fit=crop&q=80&w=1200", status: 'available' },
      { id: 15, name: "Winter Wool Coat", price: 65.00, category: "Clothing", image: "/honey.png", bgImage: "https://images.unsplash.com/photo-1539533377285-a41764663ae5?auto=format&fit=crop&q=80&w=1200", status: 'available' },
    ];
    localStorage.setItem('vakahub_products', JSON.stringify(initialProducts));
    return initialProducts;
  });
  const [userProfile, setUserProfile] = useState(() => {
    const saved = localStorage.getItem('vakahub_profile');
    return saved ? JSON.parse(saved) : { name: '', avatar: '', bio: '', joined: new Date().toISOString() };
  });
  const [onboarded, setOnboarded] = useState(() => localStorage.getItem('vakahub_onboarded') === 'true');

  useEffect(() => {
    if (language) localStorage.setItem('vakahub_language', language);
  }, [language]);

  useEffect(() => {
    if (role) localStorage.setItem('vakahub_role', role);
  }, [role]);

  useEffect(() => {
    localStorage.setItem('vakahub_sales', JSON.stringify(sales));
  }, [sales]);

  useEffect(() => {
    localStorage.setItem('vakahub_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('vakahub_profile', JSON.stringify(userProfile));
  }, [userProfile]);

  useEffect(() => {
    localStorage.setItem('vakahub_onboarded', onboarded);
  }, [onboarded]);

  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('vakahub_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('vakahub_orders');
    return saved ? JSON.parse(saved) : [];
  });
  const [wallets, setWallets] = useState(() => {
    const saved = localStorage.getItem('vakahub_wallets');
    return saved ? JSON.parse(saved) : { buyer: 100, merchant: 0, pending: 0 };
  });

  const ZIG_RATE = 25; // 1 USD = 25 ZiG (Mock rate)

  useEffect(() => {
    localStorage.setItem('vakahub_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('vakahub_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('vakahub_wallets', JSON.stringify(wallets));
  }, [wallets]);

  const t = (key) => {
    return translations[language]?.[key] || translations['en'][key] || key;
  };

  const getZiGPrice = (usd) => (usd * ZIG_RATE).toFixed(2);

  const addToCart = (product) => {
    setCart(prev => [...prev, { ...product, cartId: Date.now() }]);
  };

  const removeFromCart = (cartId) => {
    setCart(prev => prev.filter(item => item.cartId !== cartId));
  };

  const clearCart = () => setCart([]);

  const createOrder = (items, totalUsd, paymentMethod) => {
    const newOrder = {
      id: `ORD-${Date.now().toString(36).toUpperCase()}`,
      items,
      totalUsd,
      totalZig: getZiGPrice(totalUsd),
      paymentMethod,
      status: 'pending', // pending, bought, released, cancelled
      date: new Date().toISOString(),
      expiry: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24h expiry
      escrowId: `ESC-${Date.now().toString(36).toUpperCase()}`
    };
    setOrders(prev => [newOrder, ...prev]);
    // Move funds to pending
    setWallets(prev => ({ ...prev, buyer: prev.buyer - totalUsd, pending: prev.pending + totalUsd }));
    return newOrder;
  };

  const releaseFunds = (orderId) => {
    const order = orders.find(o => o.id === orderId);
    if (order && order.status !== 'released') {
      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: 'released' } : o));
      setWallets(prev => ({ 
        ...prev, 
        pending: prev.pending - order.totalUsd, 
        merchant: prev.merchant + order.totalUsd 
      }));
      return true;
    }
    return false;
  };

  const addSale = (sale) => {
    setSales(prev => [{ ...sale, id: Date.now(), date: new Date().toISOString() }, ...prev]);
  };

  const addProduct = (product) => {
    setProducts(prev => [{ ...product, id: Date.now(), status: 'available' }, ...prev]);
  };

  const updateProduct = (id, updates) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const updateProfile = (profile) => {
    setUserProfile(profile);
  };

  const resetApp = () => {
    setLanguage(null);
    setRole(null);
    setOnboarded(false);
    localStorage.clear();
    window.location.reload();
  };

  const [advertisements, setAdvertisements] = useState(() => {
    const saved = localStorage.getItem('vakahub_ads');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('vakahub_ads', JSON.stringify(advertisements));
  }, [advertisements]);

  const addAdvertisement = (ad) => {
    setAdvertisements(prev => [...prev, { ...ad, id: Date.now(), startTime: Date.now() }]);
  };

  const [currentTab, setCurrentTab] = useState('home');

  return (
    <AppContext.Provider value={{ 
      language, setLanguage, 
      role, setRole,
      currentTab, setCurrentTab,
      sales, addSale, 
      products, addProduct, updateProduct, deleteProduct,
      advertisements, addAdvertisement,
      cart, addToCart, removeFromCart, clearCart,
      orders, createOrder, releaseFunds,
      wallets, getZiGPrice,
      userProfile, updateProfile,
      onboarded, setOnboarded,
      resetApp,
      t 
    }}>
      {children}
    </AppContext.Provider>
  );
};
