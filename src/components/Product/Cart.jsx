import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  Tag, 
  ShieldCheck, 
  CheckCircle2, 
  Clock,
  Truck,
  RefreshCw,
  Sparkles
} from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

const API_BASE = "https://wiki-backend-658m.onrender.com";

export default function Cart() {
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    clearCart,
    cartSubtotal, 
    discountAmount, 
    shippingFee, 
    cartTotal,
    coupon,
    discountPercent,
    applyCoupon,
    removeCoupon
  } = useCart();

  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [couponInput, setCouponInput] = useState("");
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [placedOrder, setPlacedOrder] = useState(null);
  const [loading, setLoading] = useState(false);

  const [checkoutForm, setCheckoutForm] = useState({
    customerName: user?.name || "",
    customerEmail: user?.email || "",
    customerPhone: user?.phone || "+91 7495065304",
    street: user?.address || "742 Model Town, Kaithal",
    city: "Kaithal",
    state: "Haryana",
    pincode: "136027",
    paymentMethod: "COD"
  });

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponInput) return;
    applyCoupon(couponInput);
    setCouponInput("");
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      toast.warning("Your cart is empty.");
      return;
    }

    setLoading(true);
    try {
      const orderPayload = {
        customerName: checkoutForm.customerName,
        customerEmail: checkoutForm.customerEmail,
        customerPhone: checkoutForm.customerPhone,
        shippingAddress: {
          street: checkoutForm.street,
          city: checkoutForm.city,
          state: checkoutForm.state,
          pincode: checkoutForm.pincode
        },
        items: cartItems.map((it) => ({
          productId: it.id || it._id,
          name: it.name,
          price: it.price,
          quantity: it.quantity,
          image: it.image
        })),
        subtotal: cartSubtotal,
        discount: discountAmount,
        shippingFee: shippingFee,
        totalAmount: cartTotal,
        paymentMethod: checkoutForm.paymentMethod
      };

      const res = await axios.post(`${API_BASE}/api/orders`, orderPayload);
      if (res.data?.status) {
        setPlacedOrder(res.data.order);
        clearCart();
        setIsCheckoutOpen(false);
        setIsSuccessModalOpen(true);
        toast.success("Order confirmed!");
      }
    } catch (err) {
      toast.error(err.response?.data?.msg || "Failed to place order.");
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0 && !isSuccessModalOpen) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-[#040814] px-4 pt-24 pb-16 font-sans">
        <div className="bg-[#0a1128] p-8 sm:p-12 rounded-3xl border border-white/10 shadow-2xl text-center max-w-md w-full space-y-4">
          <div className="w-16 h-16 bg-amber-500/10 text-amber-400 rounded-full flex items-center justify-center mx-auto">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-white">Your Cart is Empty</h2>
          <p className="text-xs text-gray-400">
            You have not added any expressions or spirits to your cellar cart yet.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs rounded-2xl shadow-lg shadow-amber-900/30 transition-all"
          >
            <span>Explore Spirits Vault</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#040814] text-gray-200 font-sans pt-24 pb-20 px-4 sm:px-8 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="mb-8">
        <span className="text-xs font-bold text-amber-500 uppercase tracking-widest">Order Review</span>
        <h1 className="text-3xl sm:text-4xl font-serif font-black text-white mt-1">Shopping Bag & Cellar Cart</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Cols: Cart Item List */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id || item._id}
              className="bg-[#0a1128] p-4 sm:p-6 rounded-3xl border border-white/10 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-20 sm:w-20 sm:h-24 object-contain bg-white/5 rounded-2xl p-2 border border-white/10 shrink-0"
                />
                <div>
                  <h3 className="font-bold text-sm text-white">{item.name}</h3>
                  <p className="text-[11px] text-gray-400">{item.tagline || "700ml Single Malt"}</p>
                  <p className="text-sm font-black text-amber-400 mt-1">₹{item.price?.toLocaleString()}</p>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-white/5">
                {/* Quantity Controls */}
                <div className="flex items-center gap-2 bg-[#111c44] px-3 py-1.5 rounded-xl border border-white/10">
                  <button
                    onClick={() => updateQuantity(item.id || item._id, item.quantity - 1)}
                    className="p-1 hover:text-amber-400 text-gray-300"
                    title="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="font-mono text-xs font-bold text-white px-2">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id || item._id, item.quantity + 1)}
                    className="p-1 hover:text-amber-400 text-gray-300"
                    title="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="text-right min-w-[80px]">
                  <p className="text-sm font-black text-white">₹{(item.price * item.quantity)?.toLocaleString()}</p>
                </div>

                <button
                  onClick={() => removeFromCart(item.id || item._id)}
                  className="p-2 text-red-400/80 hover:text-red-300 hover:bg-red-950/30 rounded-xl transition-colors"
                  title="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          <div className="flex justify-between items-center pt-2">
            <Link to="/shop" className="text-xs text-amber-400 font-bold hover:underline flex items-center gap-1">
              ← Add more bottles from catalog
            </Link>
            <button
              onClick={clearCart}
              className="text-xs text-red-400/80 hover:text-red-300 hover:underline"
            >
              Clear Entire Cart
            </button>
          </div>
        </div>

        {/* Right 1 Col: Summary & Coupon */}
        <div className="space-y-6">
          
          {/* Summary Card */}
          <div className="bg-[#0a1128] p-6 rounded-3xl border border-white/10 shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-white pb-3 border-b border-white/10">Summary</h3>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between text-gray-300">
                <span>Subtotal</span>
                <span className="font-bold text-white">₹{cartSubtotal?.toLocaleString()}</span>
              </div>

              {discountPercent > 0 && (
                <div className="flex justify-between text-emerald-400 font-semibold">
                  <span>Promo Discount ({coupon} - {discountPercent}%)</span>
                  <span>- ₹{discountAmount?.toLocaleString()}</span>
                </div>
              )}

              <div className="flex justify-between text-gray-300">
                <span>Temperature-Controlled Courier</span>
                <span className="font-bold text-white">
                  {shippingFee === 0 ? <span className="text-emerald-400">FREE</span> : `₹${shippingFee}`}
                </span>
              </div>
            </div>

            <div className="pt-3 border-t border-white/10 flex justify-between items-baseline">
              <span className="text-sm font-bold text-white">Total Amount</span>
              <span className="text-2xl font-black text-amber-400">₹{cartTotal?.toLocaleString()}</span>
            </div>

            {/* Coupon Code Section */}
            <div className="pt-2">
              {coupon ? (
                <div className="flex items-center justify-between p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-xs text-emerald-400">
                  <span className="font-bold flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5" /> {coupon} Applied!
                  </span>
                  <button onClick={removeCoupon} className="text-red-400 hover:underline text-[10px]">
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Promo Code (try WHISKY20)"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    className="flex-1 px-3 py-2 bg-[#111c44] text-xs text-white uppercase rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-bold rounded-xl transition-all"
                  >
                    Apply
                  </button>
                </form>
              )}
            </div>

            <button
              onClick={() => setIsCheckoutOpen(true)}
              className="w-full py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm rounded-2xl shadow-lg shadow-amber-900/30 transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              <span>Proceed to VIP Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Guarantee Badge */}
          <div className="p-4 bg-white/5 rounded-2xl border border-white/10 space-y-2 text-xs text-gray-400">
            <div className="flex items-center gap-2 text-amber-400 font-bold">
              <ShieldCheck className="w-4 h-4" /> Authenticity Guaranteed
            </div>
            <p className="text-[11px]">
              Every bottle is sourced directly from licensed distilleries and shipped in custom shock-absorbing, climate-shielded cases.
            </p>
          </div>

        </div>

      </div>

      {/* CHECKOUT MODAL */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#0a1128] border border-white/10 rounded-3xl p-6 sm:p-8 max-w-lg w-full my-8 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <div>
                <span className="text-[10px] text-amber-400 font-bold uppercase tracking-widest">Express Cellar Fulfillment</span>
                <h2 className="text-xl font-bold text-white">Shipping & Payment Details</h2>
              </div>
              <button
                onClick={() => setIsCheckoutOpen(false)}
                className="p-2 text-gray-400 hover:text-white rounded-xl bg-white/5"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handlePlaceOrder} className="space-y-4 text-xs">
              <div>
                <label className="block text-amber-500 font-bold mb-1 uppercase">Recipient Name</label>
                <input
                  type="text"
                  required
                  value={checkoutForm.customerName}
                  onChange={(e) => setCheckoutForm({ ...checkoutForm, customerName: e.target.value })}
                  placeholder="Full name"
                  className="w-full px-4 py-2.5 bg-[#111c44] text-white rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-amber-500 font-bold mb-1 uppercase">Email</label>
                  <input
                    type="email"
                    required
                    value={checkoutForm.customerEmail}
                    onChange={(e) => setCheckoutForm({ ...checkoutForm, customerEmail: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#111c44] text-white rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-amber-500 font-bold mb-1 uppercase">Phone</label>
                  <input
                    type="text"
                    required
                    value={checkoutForm.customerPhone}
                    onChange={(e) => setCheckoutForm({ ...checkoutForm, customerPhone: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#111c44] text-white rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-amber-500 font-bold mb-1 uppercase">Delivery Address</label>
                <input
                  type="text"
                  required
                  value={checkoutForm.street}
                  onChange={(e) => setCheckoutForm({ ...checkoutForm, street: e.target.value })}
                  placeholder="House/Apartment, Street address"
                  className="w-full px-4 py-2.5 bg-[#111c44] text-white rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-amber-500 font-bold mb-1 uppercase">City</label>
                  <input
                    type="text"
                    value={checkoutForm.city}
                    onChange={(e) => setCheckoutForm({ ...checkoutForm, city: e.target.value })}
                    className="w-full px-3 py-2 bg-[#111c44] text-white rounded-xl border border-white/10"
                  />
                </div>
                <div>
                  <label className="block text-amber-500 font-bold mb-1 uppercase">State</label>
                  <input
                    type="text"
                    value={checkoutForm.state}
                    onChange={(e) => setCheckoutForm({ ...checkoutForm, state: e.target.value })}
                    className="w-full px-3 py-2 bg-[#111c44] text-white rounded-xl border border-white/10"
                  />
                </div>
                <div>
                  <label className="block text-amber-500 font-bold mb-1 uppercase">Pincode</label>
                  <input
                    type="text"
                    value={checkoutForm.pincode}
                    onChange={(e) => setCheckoutForm({ ...checkoutForm, pincode: e.target.value })}
                    className="w-full px-3 py-2 bg-[#111c44] text-white rounded-xl border border-white/10"
                  />
                </div>
              </div>

              <div>
                <label className="block text-amber-500 font-bold mb-1 uppercase">Payment Option</label>
                <div className="grid grid-cols-2 gap-2">
                  <label className={`p-3 rounded-xl border cursor-pointer flex items-center justify-center gap-2 ${
                    checkoutForm.paymentMethod === "COD" ? "bg-amber-500/20 border-amber-500 text-amber-300 font-bold" : "bg-white/5 border-white/10"
                  }`}>
                    <input
                      type="radio"
                      name="payment"
                      checked={checkoutForm.paymentMethod === "COD"}
                      onChange={() => setCheckoutForm({ ...checkoutForm, paymentMethod: "COD" })}
                      className="hidden"
                    />
                    <span>Pay on Delivery</span>
                  </label>

                  <label className={`p-3 rounded-xl border cursor-pointer flex items-center justify-center gap-2 ${
                    checkoutForm.paymentMethod === "UPI" ? "bg-amber-500/20 border-amber-500 text-amber-300 font-bold" : "bg-white/5 border-white/10"
                  }`}>
                    <input
                      type="radio"
                      name="payment"
                      checked={checkoutForm.paymentMethod === "UPI"}
                      onChange={() => setCheckoutForm({ ...checkoutForm, paymentMethod: "UPI" })}
                      className="hidden"
                    />
                    <span>UPI / NetBanking</span>
                  </label>
                </div>
              </div>

              <div className="p-3 bg-white/5 rounded-xl flex justify-between items-center text-xs">
                <span>Total Payable:</span>
                <span className="text-base font-black text-amber-400">₹{cartTotal?.toLocaleString()}</span>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-amber-900/30 transition-all flex items-center justify-center gap-2"
              >
                {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : null}
                Confirm & Place Order
              </button>
            </form>
          </div>
        </div>
      )}

      {/* SUCCESS CONFIRMATION MODAL */}
      {isSuccessModalOpen && placedOrder && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0a1128] border border-white/10 rounded-3xl p-8 max-w-md w-full text-center space-y-4 shadow-2xl">
            <div className="w-16 h-16 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h2 className="text-2xl font-bold text-white">Order Confirmed!</h2>
            <p className="text-xs text-gray-300">
              Thank you for your order, <strong className="text-white">{placedOrder.customerName}</strong>. Your bottles are being carefully packed by our cellar master.
            </p>

            <div className="p-4 bg-white/5 rounded-2xl text-left text-xs space-y-1.5 border border-white/10">
              <div className="flex justify-between">
                <span className="text-gray-400">Order ID:</span>
                <span className="font-mono font-bold text-amber-400">#{placedOrder._id?.slice(-8)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Total Charged:</span>
                <span className="font-bold text-white">₹{placedOrder.totalAmount?.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Delivery Status:</span>
                <span className="text-emerald-400 font-bold">{placedOrder.orderStatus}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <Link
                to="/dashboard/orders"
                onClick={() => setIsSuccessModalOpen(false)}
                className="py-3 bg-white/5 hover:bg-white/10 text-white font-bold text-xs rounded-xl transition-all"
              >
                Track in Dashboard
              </Link>
              <Link
                to="/shop"
                onClick={() => setIsSuccessModalOpen(false)}
                className="py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl transition-all"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
