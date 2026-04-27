import React, { createContext, useState, useEffect, useContext } from 'react';
import { translations } from '../translations';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => localStorage.getItem('vakahub_language') || 'en');
  const [role, setRole] = useState(() => localStorage.getItem('vakahub_role') || null);
  const [sales, setSales] = useState(() => {
    const saved = localStorage.getItem('vakahub_sales');
    return saved ? JSON.parse(saved) : [];
  });
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('vakahub_products');
    const parsed = saved ? JSON.parse(saved) : null;
    
    // Force reset to apply reasonable prices (first item is Grocery, should be <= $15)
    if (parsed && parsed.length >= 105 && parsed[0].price <= 15) return parsed;
    
    const initialProducts = [
      // ... Programmatically generate 105 highly curated items
      ...Array.from({ length: 105 }).map((_, i) => {
        const cats = ['Groceries', 'Health', 'Art', 'Clothing', 'Hair', 'Makeup', 'Electronics'];
        const cat = cats[i % cats.length];
        
        // Highly specific image IDs for each category to ensure "Right Pics"
        const catImages = {
          'Groceries': ['1587049352846-4a222e784d38', '1563911191333-dc2938c8e520', '1622597467825-f3bc36fbdf4e', '1595981267035-7b04ec82359b', '1506368249639-73a05d6f6488'],
          'Health': ['1600857062241-98e5dba7f214', '1598440947619-2c35fc9aa908', '1612817288484-6f916006741a', '1540555700478-4be289fbecee', '1512428815820-22e4d026360f'],
          'Art': ['1590736704728-f4730bb30770', '1554188248-986adbb73be4', '1531259683007-016a7b628fc3', '1549490349-8643362247b5', '1610701596007-11502861dcfa'],
          'Clothing': ['1515377905703-c4788e51af15', '1596755094514-f87034a26cc1', '1539533377285-a41764663ae5', '1521572163474-6864f9cf17ab', '1584917865442-de89df76afd3'],
          'Hair': ['1595475243692-392923ec8970', '1596462502278-27bfdc4033c8', '1522338242992-e1a54906a8da', '1527799820374-dcf8d9d4a3fe', '1582095133179-820ca257ef8a'],
          'Makeup': ['1586771107445-d3ca888129ee', '1599733594230-6b823276abcc', '1570172619644-dfd03ed5d881', '1522335711546-2ebe20558229', '1512496011931-d21ff46aba91'],
          'Electronics': ['1496181133206-80ce9b88a853', '1505740420928-5e560c06d30e', '1523275335684-37898b6baf30', '1484704849700-f032a568e944', '1542291026-7eec264c27ff']
        };

        const names = {
          'Groceries': ['Forest Honey', 'Nyanga Tea', 'Mazoe Crush', 'Dried Mango', 'Millet Grain', 'Chilli Paste', 'Peanut Butter', 'Kapenta', 'Sugar Beans', 'Corn Meal'],
          'Health': ['Aloe Gel', 'Shea Butter', 'Herbal Soap', 'Moringa Powder', 'Detox Tea', 'Clay Mask', 'Lip Balm', 'Body Butter', 'Vitamin C', 'Zinc Caps'],
          'Art': ['Binga Basket', 'Stone Sculpture', 'Batik Wrap', 'Copper Ring', 'Wire Art', 'Clay Vase', 'Woven Rug', 'Beaded Art', 'Wood Carving', 'Abstract'],
          'Clothing': ['Summer Dress', 'Men\'s Shirt', 'Winter Coat', 'Denim Jeans', 'Leather Belt', 'Silk Scarf', 'Cotton Tee', 'Linen Pants', 'Designer Hat', 'Boots'],
          'Hair': ['Lace Wig', 'Silk Braids', 'Human Hair', 'Hair Serum', 'Straightener', 'Hair Oil', 'Curling Iron', 'Braid Gel', 'Wig Cap', 'Comb Set'],
          'Makeup': ['Lipstick Set', 'Foundation', 'Eye Palette', 'Mascara', 'Glow Primer', 'Blush Pink', 'Setting Spray', 'Concealer', 'Eyeliner', 'Nail Polish'],
          'Electronics': ['Smart Laptop', 'Headphones', 'BT Speaker', 'Power Bank', 'USB Drive', 'Mouse Pro', 'Keyboard', 'Smart Watch', 'Tablet Pro', 'Cables']
        };

        const imgId = catImages[cat][i % catImages[cat].length];
        
        const priceRanges = {
          'Groceries': [1, 15],
          'Health': [5, 30],
          'Art': [10, 60],
          'Clothing': [10, 40],
          'Hair': [5, 35],
          'Makeup': [5, 30],
          'Electronics': [20, 100]
        };
        const [min, max] = priceRanges[cat] || [5, 50];
        const price = parseFloat((Math.random() * (max - min) + min).toFixed(2));

        return {
          id: i + 1,
          name: `${names[cat][i % 10]} ${i >= 70 ? 'Premium' : i >= 35 ? 'Elite' : 'Select'}`,
          price: price,
          category: cat,
          image: `https://images.unsplash.com/photo-${imgId}?auto=format&fit=crop&q=80&w=600`,
          bgImage: `https://images.unsplash.com/photo-${imgId}?auto=format&fit=crop&q=80&w=1200`,
          status: 'available',
          sellerId: `shop-${(i % 5) + 1}`,
          sellerName: `Merchant ${(i % 5) + 1}`
        };
      })
    ];
    localStorage.setItem('vakahub_products', JSON.stringify(initialProducts));
    return initialProducts;
  });
  const [userProfile, setUserProfile] = useState(() => {
    const saved = localStorage.getItem('vakahub_profile');
    return saved ? JSON.parse(saved) : { name: 'Simba Blessed', avatar: '', bio: '', joined: new Date().toISOString() };
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
      escrowId: `ESC-${Date.now().toString(36).toUpperCase()}`,
      buyerName: userProfile.name || 'Anonymous Buyer',
      sellerId: items[0]?.sellerId || 'shop-1' // Assuming same seller per checkout for MVP
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
  const [navHistory, setNavHistory] = useState(['home']);

  const navigateTo = (tab) => {
    if (tab === currentTab) return;
    setNavHistory(prev => [...prev, tab]);
    setCurrentTab(tab);
  };

  const goBack = () => {
    if (navHistory.length <= 1) return;
    const newHistory = [...navHistory];
    newHistory.pop(); // Remove current
    const prevTab = newHistory[newHistory.length - 1];
    setNavHistory(newHistory);
    setCurrentTab(prevTab);
  };

  return (
    <AppContext.Provider value={{ 
      language, setLanguage, 
      role, setRole,
      currentTab, setCurrentTab: navigateTo, goBack, canGoBack: navHistory.length > 1,
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
