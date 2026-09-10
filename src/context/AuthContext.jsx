import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const AuthContext = createContext();

const API_BASE = 'http://localhost:1234';

const isTokenExpired = (token) => {
  if (!token || typeof token !== 'string') return true;
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return true;
    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    const payload = JSON.parse(jsonPayload);
    if (!payload.exp) return false;
    // Check if exp timestamp (in seconds) is in the past
    return payload.exp * 1000 < Date.now();
  } catch (e) {
    return true;
  }
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize Auth state & validate token expiration
  useEffect(() => {
    try {
      const savedToken = localStorage.getItem('whisky_token');
      const savedUser = localStorage.getItem('whisky_user');

      if (savedToken && savedUser) {
        if (isTokenExpired(savedToken)) {
          console.warn('WhiskyHub session token expired. Clearing local session.');
          localStorage.removeItem('whisky_token');
          localStorage.removeItem('whisky_user');
          delete axios.defaults.headers.common['Authorization'];
          setUser(null);
          setToken(null);
        } else {
          setToken(savedToken);
          setUser(JSON.parse(savedUser));
          axios.defaults.headers.common['Authorization'] = `Bearer ${savedToken}`;
        }
      }
    } catch (e) {
      console.error('Failed to parse auth from localStorage', e);
      localStorage.removeItem('whisky_token');
      localStorage.removeItem('whisky_user');
    } finally {
      setLoading(false);
    }
  }, []);

  // Setup Axios Interceptor for 401 Session Expiry Catching
  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          const isExpired = error.response.data?.isExpired;
          const msg = error.response.data?.msg || 'Session expired. Please sign in again.';
          
          if (isExpired || error.response.data?.msg?.toLowerCase().includes('expired') || error.response.data?.msg?.toLowerCase().includes('invalid token')) {
            console.warn('Session expired - performing automatic safe logout.');
            setUser(null);
            setToken(null);
            localStorage.removeItem('whisky_token');
            localStorage.removeItem('whisky_user');
            delete axios.defaults.headers.common['Authorization'];
            toast.warning('Your session has expired. Please sign in again.');
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, []);

  const login = async (email, password) => {
    try {
      const res = await axios.post(`${API_BASE}/user_login`, { email, password });
      if (res.data?.status) {
        const loggedUser = res.data.user || res.data.DB;
        const authToken = res.data.token;

        setUser(loggedUser);
        setToken(authToken);

        localStorage.setItem('whisky_token', authToken);
        localStorage.setItem('whisky_user', JSON.stringify(loggedUser));
        axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;

        toast.success(res.data.msg || 'Signed in successfully!');
        return { success: true, user: loggedUser };
      }
      return { success: false, msg: res.data?.msg || 'Login failed.' };
    } catch (err) {
      const msg = err.response?.data?.msg || 'Invalid credentials. Please try again.';
      if (err.response?.data?.requiresVerification) {
        return {
          success: false,
          requiresVerification: true,
          id: err.response?.data?.id,
          email: err.response?.data?.email,
          testOtp: err.response?.data?.testOtp,
          msg
        };
      }
      toast.error(msg);
      return { success: false, msg };
    }
  };

  const register = async (formData) => {
    try {
      const res = await axios.post(`${API_BASE}/laxxy`, formData);
      if (res.data?.status) {
        toast.success(res.data.msg || 'Verification code sent to your email!');
        return {
          success: true,
          id: res.data.id,
          name: res.data.name,
          email: res.data.email,
          testOtp: res.data.testOtp
        };
      }
      return { success: false, msg: res.data?.msg || 'Signup failed.' };
    } catch (err) {
      const msg = err.response?.data?.msg || 'Registration failed. Please check your details.';
      toast.error(msg);
      return { success: false, msg };
    }
  };

  const verifyOtp = async (id, otp, email) => {
    try {
      const res = await axios.post(`${API_BASE}/verify_otp/${id || 'user'}`, { otp, email });
      if (res.data?.status) {
        toast.success(res.data.msg || 'Account verified successfully!');
        return { success: true };
      }
      return { success: false, msg: res.data?.msg || 'OTP verification failed.' };
    } catch (err) {
      const msg = err.response?.data?.msg || 'Invalid or expired OTP.';
      toast.error(msg);
      return { success: false, msg };
    }
  };

  const resendOtp = async (id, email) => {
    try {
      const res = await axios.post(`${API_BASE}/resend_otp/${id || 'user'}`, { email });
      if (res.data?.status) {
        toast.success('Fresh OTP sent to your email!');
        return { success: true, testOtp: res.data.testOtp };
      }
      return { success: false, msg: res.data?.msg || 'Failed to resend OTP.' };
    } catch (err) {
      const msg = err.response?.data?.msg || 'Failed to resend OTP.';
      toast.error(msg);
      return { success: false, msg };
    }
  };

  const changeUnverifiedEmail = async (id, oldEmail, newEmail) => {
    try {
      const res = await axios.post(`${API_BASE}/change_unverified_email/${id || 'user'}`, {
        oldEmail,
        newEmail
      });
      if (res.data?.status) {
        toast.success(res.data.msg || 'Email updated! Verification code sent.');
        return {
          success: true,
          email: res.data.email,
          testOtp: res.data.testOtp,
          id: res.data.id
        };
      }
      return { success: false, msg: res.data?.msg || 'Failed to update email.' };
    } catch (err) {
      const msg = err.response?.data?.msg || 'Failed to update email address.';
      toast.error(msg);
      return { success: false, msg };
    }
  };

  const updateUser = (updatedFields) => {
    const newUserData = { ...user, ...updatedFields };
    setUser(newUserData);
    localStorage.setItem('whisky_user', JSON.stringify(newUserData));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('whisky_token');
    localStorage.removeItem('whisky_user');
    delete axios.defaults.headers.common['Authorization'];
    toast.info('Signed out. See you again at WhiskyHub!');
  };

  const demoLogin = async (role = 'user') => {
    if (role === 'admin') {
      return await login('admin@whiskyhub.com', 'Admin@Whisky2026');
    } else {
      return await login('connoisseur@whiskyhub.com', 'User@Whisky2026');
    }
  };

  const isAdmin = user?.role === 'admin';
  const isAuthenticated = !!user && !!token;

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated,
        isAdmin,
        login,
        register,
        verifyOtp,
        resendOtp,
        changeUnverifiedEmail,
        logout,
        updateUser,
        demoLogin
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

