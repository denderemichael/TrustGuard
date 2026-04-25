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
      { id: 1, name: "Premium Zimbabwe Honey", price: 15.00, image: "/honey.png", bgImage: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=1200", status: 'available', category: 'Groceries' },
      { id: 2, name: "Chipinge Coffee Beans", price: 12.50, image: "/kanva_product_3_1777125168090.png", bgImage: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=1200", status: 'available', category: 'Groceries' },
      { id: 3, name: "Hydra Drops Serum", price: 32.00, image: "/kanva_product_2_1777125005142.png", bgImage: "https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&q=80&w=1200", status: 'available', category: 'Health' },
      { id: 4, name: "Handwoven Basket", price: 45.00, image: "/kanva_product_3_1777125168090.png", bgImage: "https://images.unsplash.com/photo-1590736704728-f4730bb30770?auto=format&fit=crop&q=80&w=1200", status: 'available', category: 'Art' },
      { id: 5, name: "Shona Stone Sculpture", price: 120.00, image: "/kanva_product_2_1777125005142.png", bgImage: "https://images.unsplash.com/photo-1554188248-986adbb73be4?auto=format&fit=crop&q=80&w=1200", status: 'available', category: 'Art' },
      { id: 6, name: "Organic Baobab Powder", price: 18.00, image: "/honey.png", bgImage: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=1200", status: 'available', category: 'Groceries' },
      { id: 7, name: "Batik Print Textile", price: 25.00, image: "/kanva_product_3_1777125168090.png", bgImage: "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&q=80&w=1200", status: 'available', category: 'Clothing' },
      { id: 8, name: "Handmade Herbal Soap", price: 8.00, image: "/kanva_product_2_1777125005142.png", bgImage: "https://images.unsplash.com/photo-1600857062241-98e5dba7f214?auto=format&fit=crop&q=80&w=1200", status: 'available', category: 'Health' },
      { id: 9, name: "Dried Mango Slices", price: 5.50, image: "/honey.png", bgImage: "https://images.unsplash.com/photo-1595981267035-7b04ec82359b?auto=format&fit=crop&q=80&w=1200", status: 'available', category: 'Groceries' },
      { id: 10, name: "Copper Jewelry Set", price: 55.00, image: "/kanva_product_3_1777125168090.png", bgImage: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=1200", status: 'available', category: 'Clothing' }
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

  const t = (key) => {
    return translations[language]?.[key] || translations['en'][key] || key;
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

  const updateProfile = (profile) => {
    setUserProfile(profile);
  };

  const resetApp = () => {
    setLanguage(null);
    setRole(null);
    setOnboarded(false);
    localStorage.clear();
  };

  return (
    <AppContext.Provider value={{ 
      language, setLanguage, 
      role, setRole,
      sales, addSale, 
      products, addProduct, updateProduct,
      userProfile, updateProfile,
      onboarded, setOnboarded,
      resetApp,
      t 
    }}>
      {children}
    </AppContext.Provider>
  );
};
