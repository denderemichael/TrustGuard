const generateProducts = () => {
  const categories = ['Groceries', 'Health', 'Art', 'Clothing', 'Hair', 'Makeup', 'Electronics'];
  const items = [];
  
  const imgMap = {
    'Groceries': 'food',
    'Health': 'wellness',
    'Art': 'craft',
    'Clothing': 'fashion',
    'Hair': 'salon',
    'Makeup': 'cosmetics',
    'Electronics': 'tech'
  };

  const names = {
    'Groceries': ['Forest Honey', 'Baobab Powder', 'Nyanga Tea', 'Mazoe Orange', 'Kapenta Dried', 'Peanut Butter', 'Chilli Sauce', 'Dried Mango', 'Biltong Pro', 'Millet Grain'],
    'Health': ['Shea Butter', 'Aloe Vera Gel', 'Moringa Caps', 'Herbal Soap', 'Detox Tea', 'Eucalyptus Oil', 'Honey Lip Balm', 'Clay Mask', 'Vitamin Serum', 'Body Butter'],
    'Art': ['Binga Basket', 'Stone Sculpture', 'Batik Print', 'Copper Pot', 'Wooden Mask', 'Beaded Necklace', 'Wire Art', 'Clay Vase', 'Woven Rug', 'Animal Carving'],
    'Clothing': ['Cotton Shirt', 'Summer Dress', 'Winter Coat', 'Denim Jeans', 'Leather Belt', 'Wool Scarf', 'Silk Scarf', 'Linen Pants', 'Designer Hat', 'Ankara Skirt'],
    'Hair': ['Lace Wig', 'Silk Braids', 'Human Hair', 'Hair Serum', 'Straightener', 'Hair Oil', 'Curling Iron', 'Braid Gel', 'Wig Cap', 'Comb Set'],
    'Makeup': ['Matte Lipstick', 'Foundation', 'Eye Palette', 'Mascara Black', 'Glow Primer', 'Blush Pink', 'Setting Spray', 'Concealer', 'Eye Liner', 'Nail Polish'],
    'Electronics': ['Smart Laptop', 'Headphones', 'BT Speaker', 'Power Bank', 'USB Drive', 'Mouse Pro', 'Keyboard', 'Smart Watch', 'Tablet X', 'Camera Lens']
  };

  let idCounter = 1;
  for (let i = 0; i < 15; i++) {
    categories.forEach(cat => {
      const nameIdx = i % 10;
      const price = (Math.random() * 100 + 5).toFixed(2);
      const imgId = 100 + idCounter;
      items.push({
        id: idCounter++,
        name: `${names[cat][nameIdx]} ${i > 9 ? '(Batch 2)' : ''}`,
        price: parseFloat(price),
        category: cat,
        image: `https://images.unsplash.com/photo-${imgId === 101 ? '1587049352846-4a222e784d38' : '15' + (imgId * 12345).toString().slice(0,8)}?auto=format&fit=crop&q=80&w=600`, // Pseudo-random but real looking URLs
        bgImage: `https://images.unsplash.com/photo-${16 + (imgId * 54321).toString().slice(0,8)}?auto=format&fit=crop&q=80&w=1200`,
        status: 'available'
      });
    });
  }
  
  // Specific High Quality Fixed Images for the first few to ensure look
  const firstFew = [
    { id: 1, name: "Premium Baobab Powder", price: 12.50, category: "Health", image: "https://images.unsplash.com/photo-1512428815820-22e4d026360f?auto=format&fit=crop&q=80&w=600", bgImage: "https://images.unsplash.com/photo-1512428815820-22e4d026360f?auto=format&fit=crop&q=80&w=1200", status: 'available' },
    { id: 2, name: "Harare Summer Dress", price: 25.00, category: "Clothing", image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=600", bgImage: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=1200", status: 'available' },
    { id: 3, name: "Human Hair Lace Wig", price: 85.00, category: "Hair", image: "https://images.unsplash.com/photo-1595475243692-392923ec8970?auto=format&fit=crop&q=80&w=600", bgImage: "https://images.unsplash.com/photo-1595475243692-392923ec8970?auto=format&fit=crop&q=80&w=1200", status: 'available' },
    { id: 4, name: "Matte Lipstick Set", price: 15.00, category: "Makeup", image: "https://images.unsplash.com/photo-1586771107445-d3ca888129ee?auto=format&fit=crop&q=80&w=600", bgImage: "https://images.unsplash.com/photo-1586771107445-d3ca888129ee?auto=format&fit=crop&q=80&w=1200", status: 'available' },
    { id: 5, name: "Smart Laptop Pro", price: 450.00, category: "Electronics", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=600", bgImage: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=1200", status: 'available' },
  ];

  return [...firstFew, ...items.slice(5, 105)];
};

const initialProducts = generateProducts();
