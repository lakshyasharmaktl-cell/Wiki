import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('whisky_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [coupon, setCoupon] = useState(null);
  const [discountPercent, setDiscountPercent] = useState(0);

  useEffect(() => {
    try {
      localStorage.setItem('whisky_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error('Failed to sync cart to localStorage', e);
    }
  }, [cartItems]);

  const addToCart = (product, quantity = 1) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find((item) => item.id === product.id || item._id === product._id);
      if (existing) {
        toast.info(`Updated "${product.name}" quantity (${existing.quantity + quantity}) in cart`);
        return prevItems.map((item) =>
          item.id === product.id || item._id === product._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        toast.success(`Added "${product.name}" to your cart`);
        return [
          ...prevItems,
          {
            id: product.id || product._id,
            _id: product._id || product.id,
            name: product.name,
            price: Number(product.price) || 0,
            image: product.image,
            tagline: product.tagline || product.subCategory || '700ml',
            quantity
          }
        ];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prev) => {
      const item = prev.find((i) => i.id === productId || i._id === productId);
      if (item) toast.info(`Removed "${item.name}" from cart`);
      return prev.filter((i) => i.id !== productId && i._id !== productId);
    });
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === productId || item._id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    setCoupon(null);
    setDiscountPercent(0);
    localStorage.removeItem('whisky_cart');
  };

  const applyCoupon = (code) => {
    const trimmed = (code || '').trim().toUpperCase();
    if (trimmed === 'WHISKY20') {
      setCoupon('WHISKY20');
      setDiscountPercent(20);
      toast.success('Coupon WHISKY20 applied! 20% discount added.');
      return { success: true, discount: 20 };
    } else if (trimmed === 'CONNOISSEUR10') {
      setCoupon('CONNOISSEUR10');
      setDiscountPercent(10);
      toast.success('Coupon CONNOISSEUR10 applied! 10% discount added.');
      return { success: true, discount: 10 };
    } else {
      toast.error('Invalid promo code. Try "WHISKY20"');
      return { success: false };
    }
  };

  const removeCoupon = () => {
    setCoupon(null);
    setDiscountPercent(0);
    toast.info('Coupon removed');
  };

  const cartCount = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const cartSubtotal = cartItems.reduce((sum, item) => sum + (Number(item.price) || 0) * (item.quantity || 1), 0);
  const discountAmount = Math.round((cartSubtotal * discountPercent) / 100);
  const shippingFee = cartSubtotal > 5000 || cartSubtotal === 0 ? 0 : 250;
  const cartTotal = Math.max(0, cartSubtotal - discountAmount + shippingFee);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        coupon,
        discountPercent,
        applyCoupon,
        removeCoupon,
        cartCount,
        cartSubtotal,
        discountAmount,
        shippingFee,
        cartTotal
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
