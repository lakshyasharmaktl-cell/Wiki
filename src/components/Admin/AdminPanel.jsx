import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  LayoutDashboard,
  Package,
  Users,
  ShoppingBag,
  Plus,
  Shield,
  RefreshCw,
  ShieldAlert,
  Lock,
  ArrowRight,
  Activity,
  Server,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  ChevronRight
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

import AdminOverview from "./AdminOverview";
import AdminProducts from "./AdminProducts";
import AdminUsers from "./AdminUsers";
import AdminOrders from "./AdminOrders";

const API_BASE = "http://localhost:1234";

export default function AdminPanel() {
  const { user, isAdmin, demoLogin } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(false);

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalVerifiedUsers: 0,
    totalAdmins: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    recentUsers: [],
    recentOrders: []
  });

  const [products, setProducts] = useState([]);
  const [productSearch, setProductSearch] = useState("");
  const [productCategoryFilter, setProductCategoryFilter] = useState("all");
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productForm, setProductForm] = useState({
    name: "",
    category: "whisky",
    subCategory: "Single Malt",
    tagline: "700ml • 40% ABV",
    price: "",
    originalPrice: "",
    discountPercent: 0,
    stock: 50,
    deliveryTime: "10 MINS",
    image: "",
    origin: "Scotland",
    age: "12 Years",
    abv: "40%",
    rating: 4.8,
    description: "",
    bestSeller: false,
    isFeatured: true
  });

  const [usersList, setUsersList] = useState([]);
  const [userSearch, setUserSearch] = useState("");
  const [userRoleFilter, setUserRoleFilter] = useState("all");
  const [ordersList, setOrdersList] = useState([]);

  useEffect(() => {
    if (isAdmin) {
      fetchStats();
      fetchProducts();
      fetchUsers();
      fetchOrders();
    }
  }, [isAdmin]);

  const fetchStats = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/admin/stats`);
      if (res.data?.status) setStats(res.data.stats);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/admin/products`);
      if (res.data?.status) setProducts(res.data.products);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/admin/users`);
      if (res.data?.status) setUsersList(res.data.users);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/admin/orders`);
      if (res.data?.status) setOrdersList(res.data.orders);
    } catch (err) {
      console.error(err);
    }
  };

  const handleOpenAddProduct = () => {
    setEditingProduct(null);
    setProductForm({
      name: "",
      category: "whisky",
      subCategory: "Single Malt",
      tagline: "700ml • 40% ABV",
      price: "",
      originalPrice: "",
      discountPercent: 0,
      stock: 50,
      deliveryTime: "10 MINS",
      image: "https://images.unsplash.com/photo-1527281400683-1aae777175f8?auto=format&fit=crop&q=80&w=600",
      origin: "Scotland",
      age: "12 Years",
      abv: "40%",
      rating: 4.8,
      description: "Fine handcrafted spirit matured in seasoned casks.",
      bestSeller: false,
      isFeatured: true
    });
    setIsProductModalOpen(true);
  };

  const handleOpenEditProduct = (prod) => {
    setEditingProduct(prod);
    setProductForm({
      name: prod.name,
      category: prod.category,
      subCategory: prod.subCategory || "",
      tagline: prod.tagline || "",
      price: prod.price,
      originalPrice: prod.originalPrice || prod.price,
      discountPercent: prod.discountPercent || 0,
      stock: prod.stock !== undefined ? prod.stock : 50,
      deliveryTime: prod.deliveryTime || "10 MINS",
      image: prod.image,
      origin: prod.origin || "Scotland",
      age: prod.age || "12 Years",
      abv: prod.abv || "40%",
      rating: prod.rating || 4.8,
      description: prod.description || "",
      bestSeller: prod.bestSeller || false,
      isFeatured: prod.isFeatured || false
    });
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = async (e) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        const res = await axios.put(`${API_BASE}/api/admin/products/${editingProduct._id}`, productForm);
        if (res.data?.status) {
          toast.success("Spirit details updated in vault!");
          setIsProductModalOpen(false);
          fetchProducts();
          fetchStats();
        }
      } else {
        const res = await axios.post(`${API_BASE}/api/admin/products`, productForm);
        if (res.data?.status) {
          toast.success("New spirit added to WhiskyHub catalog!");
          setIsProductModalOpen(false);
          fetchProducts();
          fetchStats();
        }
      }
    } catch (err) {
      toast.error("Failed to save product.");
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to remove this spirit from catalog?")) return;
    try {
      const res = await axios.delete(`${API_BASE}/api/admin/products/${id}`);
      if (res.data?.status) {
        toast.success("Product removed from vault.");
        fetchProducts();
        fetchStats();
      }
    } catch (err) {
      toast.error("Failed to delete product.");
    }
  };

  const handleToggleUserRole = async (userId, currentRole) => {
    const newRole = currentRole === "admin" ? "user" : "admin";
    try {
      const res = await axios.put(`${API_BASE}/api/admin/users/${userId}/role`, { role: newRole });
      if (res.data?.status) {
        toast.success(`User role changed to ${newRole.toUpperCase()}!`);
        fetchUsers();
        fetchStats();
      }
    } catch (err) {
      toast.error("Failed to update user role.");
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to deactivate this member account?")) return;
    try {
      const res = await axios.delete(`${API_BASE}/api/admin/users/${userId}`);
      if (res.data?.status) {
        toast.success("User account deactivated.");
        fetchUsers();
        fetchStats();
      }
    } catch (err) {
      toast.error("Failed to deactivate user.");
    }
  };

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      const res = await axios.put(`${API_BASE}/api/admin/orders/${orderId}/status`, { orderStatus: newStatus });
      if (res.data?.status) {
        toast.success(`Order status updated to ${newStatus}`);
        fetchOrders();
      }
    } catch (err) {
      toast.error("Failed to update order status.");
    }
  };

  // --- 1. UNAUTHORIZED SECURITY GATE SCREEN (When user is NOT an admin) ---
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-[#050a15] text-gray-200 font-sans pt-28 pb-20 px-4 flex items-center justify-center">
        <div className="max-w-xl w-full bg-gradient-to-b from-[#0a1128] to-[#040814] p-8 sm:p-12 rounded-3xl border border-red-500/30 shadow-2xl text-center space-y-6 relative overflow-hidden">
          
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-amber-500 to-red-600"></div>
          <div className="w-20 h-20 bg-red-950/60 border border-red-500/40 rounded-3xl mx-auto flex items-center justify-center text-red-400 shadow-xl shadow-red-950/50 animate-pulse">
            <Lock className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-red-400 font-bold block">
              Security Protocol • Level 1 Clearance Required
            </span>
            <h1 className="text-3xl font-serif font-black text-white">Distiller Access Restricted</h1>
            <p className="text-xs text-gray-400 max-w-md mx-auto leading-relaxed">
              This terminal is reserved exclusively for authorized Master Distillers and Platform Administrators. You are currently logged in with standard member privileges.
            </p>
          </div>

          <div className="p-4 bg-white/5 rounded-2xl border border-white/10 text-left space-y-2 text-xs">
            <div className="flex items-center justify-between text-gray-400">
              <span>Active Account:</span>
              <span className="text-white font-semibold">{user?.email || "Guest Session"}</span>
            </div>
            <div className="flex items-center justify-between text-gray-400">
              <span>Assigned Role:</span>
              <span className="text-amber-400 font-bold uppercase">{user?.role || "Visitor"}</span>
            </div>
            <div className="flex items-center justify-between text-gray-400">
              <span>Required Role:</span>
              <span className="text-red-400 font-bold uppercase">Administrator (Admin)</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => demoLogin("admin")}
              className="w-full sm:w-auto px-6 py-3.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold text-xs rounded-xl shadow-lg shadow-red-950/50 transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Authorize Master Admin (Demo)</span>
            </button>
            <Link
              to="/"
              className="w-full sm:w-auto px-6 py-3.5 bg-white/5 hover:bg-white/10 text-gray-300 font-bold text-xs rounded-xl transition-all"
            >
              Return to Storefront
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // --- 2. AUTHORIZED MASTER DISTILLER COMMAND & CONTROL CENTER ---
  return (
    <div className="min-h-screen bg-[#040814] text-gray-200 font-sans pt-24 pb-16 px-4 sm:px-8 max-w-7xl mx-auto">
      
      {/* Elevated Master Command Header */}
      <div className="relative bg-gradient-to-r from-red-950/70 via-[#0a1128] to-amber-950/40 p-6 sm:p-8 rounded-3xl border border-red-500/30 shadow-2xl mb-8 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-amber-400 to-red-500"></div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex flex-wrap items-center gap-2.5 mb-2">
              <span className="flex items-center gap-1.5 px-3 py-1 bg-red-950/80 border border-red-500/40 text-red-400 rounded-full text-[10px] font-mono font-black uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
                Master Control Center
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1 bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 rounded-full text-[10px] font-mono font-semibold">
                <Server className="w-3 h-3" /> MongoDB Atlas Synced
              </span>
              <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-300 rounded-full text-[10px] font-mono font-semibold">
                Port: 1234 Online
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-serif font-black text-white tracking-tight">
              Distiller Administration Panel
            </h1>
            <p className="text-xs text-gray-300 mt-1">
              Command station for <span className="text-amber-400 font-bold">{user?.name || "Admin"}</span> ({user?.email}) • Super Administrator Clearance
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                fetchStats();
                fetchProducts();
                fetchUsers();
                fetchOrders();
                toast.info("Command center telemetry updated.");
              }}
              className="p-3.5 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white rounded-2xl transition-all border border-white/10"
              title="Refresh All Database Telemetry"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={handleOpenAddProduct}
              className="flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs rounded-2xl transition-all shadow-xl shadow-amber-900/40 active:scale-95 uppercase tracking-wider"
            >
              <Plus className="w-4 h-4 font-black" />
              <span>Add New Spirit</span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-2 p-2 bg-[#0a1128] rounded-2xl border border-white/10 mb-8 overflow-x-auto shadow-xl">
        {[
          { id: "overview", label: "Executive Overview", icon: LayoutDashboard },
          { id: "products", label: `Spirit Vault (${products.length})`, icon: Package },
          { id: "users", label: `Member & Role Directory (${usersList.length})`, icon: Users },
          { id: "orders", label: `Order Dispatch Tracker (${ordersList.length})`, icon: ShoppingBag }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2.5 px-6 py-3 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === tab.id
                ? "bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-lg shadow-amber-900/30"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Render Active Tab */}
      {activeTab === "overview" && (
        <AdminOverview stats={stats} setActiveTab={setActiveTab} handleOpenAddProduct={handleOpenAddProduct} />
      )}
      {activeTab === "products" && (
        <AdminProducts
          products={products}
          productSearch={productSearch}
          setProductSearch={setProductSearch}
          productCategoryFilter={productCategoryFilter}
          setProductCategoryFilter={setProductCategoryFilter}
          handleOpenAddProduct={handleOpenAddProduct}
          handleOpenEditProduct={handleOpenEditProduct}
          handleDeleteProduct={handleDeleteProduct}
        />
      )}
      {activeTab === "users" && (
        <AdminUsers
          usersList={usersList}
          userSearch={userSearch}
          setUserSearch={setUserSearch}
          userRoleFilter={userRoleFilter}
          setUserRoleFilter={setUserRoleFilter}
          handleToggleRole={handleToggleRole}
          handleDeleteUser={handleDeleteUser}
        />
      )}
      {activeTab === "orders" && (
        <AdminOrders ordersList={ordersList} handleUpdateOrderStatus={handleUpdateOrderStatus} />
      )}

      {/* ADD / EDIT PRODUCT MODAL */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#0a1128] border border-white/10 rounded-3xl p-6 sm:p-8 max-w-2xl w-full my-8 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <h2 className="text-xl font-bold text-white">
                {editingProduct ? "Edit Spirit Details" : "Add New Spirit to Catalog"}
              </h2>
              <button
                onClick={() => setIsProductModalOpen(false)}
                className="p-2 text-gray-400 hover:text-white rounded-xl bg-white/5"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-amber-500 font-bold mb-1 uppercase">Spirit Name</label>
                  <input
                    type="text"
                    required
                    value={productForm.name}
                    onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                    placeholder="e.g. Macallan 18 Year Double Cask"
                    className="w-full px-4 py-2.5 bg-[#111c44] text-white text-xs rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs text-amber-500 font-bold mb-1 uppercase">Category</label>
                  <select
                    value={productForm.category}
                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#111c44] text-white text-xs rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="whisky">Whisky</option>
                    <option value="mocktails">Mocktail</option>
                    <option value="beers">Beer</option>
                    <option value="spirits">Spirit</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs text-amber-500 font-bold mb-1 uppercase">Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={productForm.price}
                    onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                    placeholder="18500"
                    className="w-full px-4 py-2.5 bg-[#111c44] text-white text-xs rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs text-amber-500 font-bold mb-1 uppercase">MSRP (₹)</label>
                  <input
                    type="number"
                    value={productForm.originalPrice}
                    onChange={(e) => setProductForm({ ...productForm, originalPrice: e.target.value })}
                    placeholder="21000"
                    className="w-full px-4 py-2.5 bg-[#111c44] text-white text-xs rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs text-amber-500 font-bold mb-1 uppercase">Stock</label>
                  <input
                    type="number"
                    value={productForm.stock}
                    onChange={(e) => setProductForm({ ...productForm, stock: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#111c44] text-white text-xs rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs text-amber-500 font-bold mb-1 uppercase">Origin</label>
                  <input
                    type="text"
                    value={productForm.origin}
                    onChange={(e) => setProductForm({ ...productForm, origin: e.target.value })}
                    placeholder="Speyside, Scotland"
                    className="w-full px-4 py-2.5 bg-[#111c44] text-white text-xs rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs text-amber-500 font-bold mb-1 uppercase">Age</label>
                  <input
                    type="text"
                    value={productForm.age}
                    onChange={(e) => setProductForm({ ...productForm, age: e.target.value })}
                    placeholder="18 Years"
                    className="w-full px-4 py-2.5 bg-[#111c44] text-white text-xs rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs text-amber-500 font-bold mb-1 uppercase">ABV (%)</label>
                  <input
                    type="text"
                    value={productForm.abv}
                    onChange={(e) => setProductForm({ ...productForm, abv: e.target.value })}
                    placeholder="43%"
                    className="w-full px-4 py-2.5 bg-[#111c44] text-white text-xs rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-amber-500 font-bold mb-1 uppercase">Image URL</label>
                <input
                  type="text"
                  required
                  value={productForm.image}
                  onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-4 py-2.5 bg-[#111c44] text-white text-xs rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs text-amber-500 font-bold mb-1 uppercase">Description</label>
                <textarea
                  rows="3"
                  value={productForm.description}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                  placeholder="Tasting notes and cask details..."
                  className="w-full px-4 py-2.5 bg-[#111c44] text-white text-xs rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-amber-500"
                ></textarea>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-5 py-2.5 bg-white/5 hover:bg-white/10 text-gray-300 font-bold text-xs rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-amber-900/30 transition-all flex items-center gap-2"
                >
                  {editingProduct ? "Save Changes" : "Publish to Catalog"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
