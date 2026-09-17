import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.jsx";
import Home from "./components/Home/Home.jsx";
import SignUp from "./components/Auth/Signup.jsx";
import Log from "./components/Auth/Loginpage.jsx";
import Blog from "./components/Blog/Blog.jsx";
import PageNotFound from "./components/PNF.jsx";
import Footer from "./components/Footer.jsx";
import ContactUs from "./components/ContactUs.jsx";
import Otp from "./components/Otpverfication/Otpsection.jsx";
import DashBoard from "./components/Dashboard/Homebashboard.jsx";
import AdminPanel from "./components/Admin/AdminPanel.jsx";
import ProductsPage from "./components/Product/ProductsPage.jsx";
import Cart from "./components/Product/Cart.jsx";
import Maclaan from "./components/Wishky/Maclaan.jsx";

import { AuthProvider, useAuth } from "./context/AuthContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { ThemeProvider, useTheme } from "./context/ThemeContext.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AdminRoute({ children }) {
  const { isAdmin, isAuthenticated, loading } = useAuth();
  if (loading) return null;
  if (!isAuthenticated) return <Navigate to="/user-login" replace />;
  if (!isAdmin) return <Navigate to="/dashboard" replace />;
  return children;
}

function AppContent() {
  const { theme } = useTheme();

  return (
    <div className="bg-[#050a15] text-gray-200 min-h-screen selection:bg-amber-500 selection:text-black transition-colors duration-300">
      <AuthProvider>
        <CartProvider>
          <BrowserRouter>
            <Navbar />
            <ToastContainer
              position="top-right"
              autoClose={2500}
              hideProgressBar={false}
              newestOnTop
              closeOnClick
              pauseOnHover
              draggable
              theme={theme === "light" ? "light" : "dark"}
            />
            <main className="min-h-screen">
              <Routes>
                {/* Public Storefront Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<ProductsPage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/the-macallan" element={<Maclaan />} />
                <Route path="/the-macallan/:id" element={<Maclaan />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/contact-us" element={<ContactUs />} />

                {/* Authentication Routes */}
                <Route path="/user-login" element={<Log />} />
                <Route path="/create-account" element={<SignUp />} />
                <Route path="/otp/:id" element={<Otp />} />
                <Route path="/otp" element={<Otp />} />

                {/* Member Dashboard */}
                <Route path="/dashboard" element={<DashBoard />} />
                <Route path="/dashboard/*" element={<DashBoard />} />

                {/* Administrator Panel (Admin Only) */}
                <Route path="/admin" element={<AdminRoute><AdminPanel /></AdminRoute>} />
                <Route path="/admin/*" element={<AdminRoute><AdminPanel /></AdminRoute>} />

                {/* 404 Fallback */}
                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </main>
            <Footer />
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
