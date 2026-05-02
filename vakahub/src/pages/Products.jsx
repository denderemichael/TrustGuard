import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, ShoppingBag, Settings, Trash2, ShieldCheck, Upload, Loader2, Image as ImageIcon, CheckCircle, Activity } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const Products = () => {
  const { t, role, products, addProduct, updateProduct, deleteProduct, addToCart, getZiGPrice, showAddProduct, setShowAddProduct } = useAppContext();
  const [editingProduct, setEditingProduct] = useState(null);
  const [uploading, setUploading] = useState(false);
  
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Groceries');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  // Sync local visibility with global trigger
  useEffect(() => {
    if (showAddProduct) {
      setEditingProduct(null);
      setName('');
      setPrice('');
      setCategory('Groceries');
      setImagePreview('');
    }
  }, [showAddProduct]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const uploadImage = async () => {
    if (!imageFile) return null;
    
    const IMGBB_KEY = '55e32aab82cfeae5fa7ecbc03e939dde';
    const formData = new FormData();
    formData.append('image', imageFile);

    const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_KEY}`, {
      method: 'POST',
      body: formData
    });

    const data = await response.json();
    if (data.success) {
      return data.data.url;
    } else {
      throw new Error("ImgBB upload failed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    
    try {
      if (!imageFile && !editingProduct) {
        alert("Please select an image first!");
        setUploading(false);
        return;
      }

      let imageUrl = editingProduct?.image || 'https://via.placeholder.com/400x500?text=No+Image';
      if (imageFile) {
        imageUrl = await uploadImage();
      }

      const productData = { 
        name, 
        price: parseFloat(price), 
        category,
        image: imageUrl,
        bgImage: imageUrl // Use same image for bg if not specified
      };

      if (editingProduct) {
        await updateProduct(editingProduct.id, productData);
      } else {
        await addProduct(productData);
      }
      resetForm();
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setUploading(false);
    }
  };

  const resetForm = () => {
    setName('');
    setPrice('');
    setCategory('Groceries');
    setImageFile(null);
    setImagePreview('');
    setShowAddProduct(false);
    setEditingProduct(null);
  };

  const handleEdit = (p) => {
    setEditingProduct(p);
    setName(p.name);
    setPrice(p.price);
    setCategory(p.category);
    setImagePreview(p.image);
    setShowAddProduct(true);
  };

  const [activeCategory, setActiveCategory] = useState('All');
  
  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  const categories = ['All', 'Groceries', 'Health', 'Art', 'Clothing', 'Hair', 'Makeup', 'Electronics'];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Page Header */}
      <div className="flex justify-between items-end mb-8 border-b border-[#e2e0d8] pb-8">
        <div>
          <h2 className="text-5xl font-serif text-[var(--color-brand-text)] italic">{role === 'admin' ? "Manage Catalog" : "Marketplace Sectors"}</h2>
          <p className="text-[var(--color-brand-text-muted)] mt-2">Discover premium goods across multiple local sectors.</p>
        </div>
        {role === 'admin' && (
          <button 
            onClick={() => setShowAddProduct(true)}
            className="bg-[var(--color-brand-accent)] text-white px-8 py-4 rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center space-x-2"
          >
            <Plus size={20} />
            <span>{t('addProduct')}</span>
          </button>
        )}
      </div>

      {/* Sector Filter */}
      <div className="flex flex-wrap gap-3 mb-12">
        {categories.map(c => (
          <button
            key={c}
            onClick={() => setActiveCategory(c)}
            className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all border ${
              activeCategory === c 
                ? 'bg-[#2c3b29] text-white border-[#2c3b29] shadow-md' 
                : 'bg-white text-[var(--color-brand-text-muted)] border-[#e2e0d8] hover:border-[var(--color-brand-accent)]'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Add/Edit Form Modal */}
      <AnimatePresence>
        {showAddProduct && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[110] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} className="bg-white w-full max-w-lg rounded-[3rem] p-10 shadow-2xl relative">
              <button onClick={resetForm} className="absolute top-8 right-8 p-2 hover:bg-[#f0eee4] rounded-full transition-colors"><X size={20} /></button>
              <h3 className="text-3xl font-serif font-bold mb-8 italic">{editingProduct ? "Edit Product" : t('addProduct')}</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-[var(--color-brand-text-muted)] uppercase tracking-widest px-1">Product Name</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="w-full bg-[#fcfcfa] border border-[#e2e0d8] p-4 rounded-2xl focus:border-[var(--color-brand-accent)] outline-none" placeholder="e.g. Baobab Powder" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-[var(--color-brand-text-muted)] uppercase tracking-widest px-1">Price (USD)</label>
                    <input type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} required className="w-full bg-[#fcfcfa] border border-[#e2e0d8] p-4 rounded-2xl focus:border-[var(--color-brand-accent)] outline-none" placeholder="0.00" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-[var(--color-brand-text-muted)] uppercase tracking-widest px-1">Category</label>
                  <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full bg-[#fcfcfa] border border-[#e2e0d8] p-4 rounded-2xl focus:border-[var(--color-brand-accent)] outline-none appearance-none">
                    {['Groceries', 'Health', 'Art', 'Clothing', 'Hair', 'Makeup', 'Electronics'].map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-[var(--color-brand-text-muted)] uppercase tracking-widest px-1">Product Image</label>
                  <div className="relative group cursor-pointer h-48 rounded-3xl border-2 border-dashed border-[#e2e0d8] hover:border-[var(--color-brand-accent)] transition-all flex flex-col items-center justify-center overflow-hidden bg-[#fcfcfa]">
                    {imagePreview ? (
                      <>
                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Upload className="text-white" size={32} />
                        </div>
                      </>
                    ) : (
                      <div className="text-center p-6">
                        <div className="w-12 h-12 bg-[#f0eee4] rounded-full flex items-center justify-center mx-auto mb-3">
                          <ImageIcon className="text-[var(--color-brand-text-muted)]" size={20} />
                        </div>
                        <p className="text-xs font-bold text-[var(--color-brand-text-muted)]">Click to Upload Image</p>
                        <p className="text-[9px] text-[var(--color-brand-text-muted)] mt-1 italic">PNG, JPG or WEBP</p>
                      </div>
                    )}
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleImageChange}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={uploading}
                  className="w-full bg-[var(--color-brand-accent)] text-white py-5 rounded-2xl font-bold shadow-xl hover:shadow-2xl transition-all disabled:opacity-50 flex items-center justify-center space-x-2"
                >
                  {uploading ? (
                    <><Loader2 className="animate-spin" size={20} /> <span>Processing...</span></>
                  ) : (
                    <span>{editingProduct ? "Save Changes" : t('addProduct')}</span>
                  )}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
        {filteredProducts.map((p) => (
          <motion.div 
            key={p.id}
            layout
            className="group bg-white rounded-[2.5rem] shadow-sm border border-[#e2e0d8] overflow-hidden hover:shadow-xl transition-all duration-500"
          >
            {/* Product Image Area */}
            <div className="h-64 relative overflow-hidden bg-[#f0eee4]">
              <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors"></div>
              <div className="absolute top-4 left-4 bg-[#2c3b29] text-white text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-widest border border-white/20">
                {p.category}
              </div>
              <div className="absolute top-4 left-24 bg-emerald-500/90 backdrop-blur text-white text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-widest flex items-center space-x-1 shadow-sm">
                <CheckCircle size={10} />
                <span>AI Verified</span>
              </div>

              
              {/* Background Hover Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <img src={p.bgImage} alt="" className="w-full h-full object-cover blur-[2px] opacity-30" />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
              </div>

              {/* Actions Overlay for Merchants */}
              {role === 'admin' && (
                <div className="absolute top-4 right-4 flex space-x-2">
                  <button onClick={() => handleEdit(p)} className="bg-white/90 backdrop-blur p-2 rounded-xl text-[var(--color-brand-text)] hover:text-[var(--color-brand-accent)] shadow-sm"><Settings size={16} /></button>
                  <button onClick={() => deleteProduct(p.id)} className="bg-white/90 backdrop-blur p-2 rounded-xl text-rose-600 hover:bg-rose-50 shadow-sm"><Trash2 size={16} /></button>
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="p-8">
              <h3 className="font-serif text-xl font-bold text-[var(--color-brand-text)] mb-1 group-hover:text-[var(--color-brand-accent)] transition-colors">{p.name}</h3>
              <div className="flex items-center space-x-1 text-indigo-600 mb-4 bg-indigo-50 w-fit px-2 py-0.5 rounded-lg border border-indigo-100">
                <Activity size={12} />
                <span className="text-[9px] font-bold uppercase tracking-widest">Trust Score: 98%</span>
              </div>
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-2xl font-bold text-[var(--color-brand-accent)]">${p.price.toFixed(2)}</p>
                  <p className="text-[10px] font-bold text-[var(--color-brand-text-muted)] uppercase tracking-widest">ZiG {getZiGPrice(p.price)}</p>
                </div>
                
                {role === 'user' && (
                  <button 
                    onClick={() => addToCart(p)}
                    className="bg-[#f0eee4] text-[var(--color-brand-text)] p-3 rounded-2xl hover:bg-[var(--color-brand-accent)] hover:text-white transition-all shadow-sm active:scale-90"
                  >
                    <ShoppingBag size={20} />
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Products;
