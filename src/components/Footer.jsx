import React from 'react';
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-gray-400 py-16 px-6 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Section */}
          <div className="space-y-6">
            <h2 className="text-white text-2xl font-serif font-black tracking-tighter">
              WHISKY<span className="text-amber-600">HUB</span>
            </h2>
            <p className="text-sm leading-relaxed max-w-xs">
              Curating the world's finest spirits since 1994. Experience the art of distillation through our hand-picked collection.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-amber-600 hover:text-white transition-all">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-amber-600 hover:text-white transition-all">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-amber-600 hover:text-white transition-all">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h3 className="text-white font-bold mb-6 uppercase text-xs tracking-widest">Collections</h3>
            <ul className="space-y-4 text-sm font-medium">
              <li><a href="#" className="hover:text-amber-500 transition-colors flex items-center gap-1">Single Malt <ArrowUpRight className="w-3 h-3"/></a></li>
              <li><a href="#" className="hover:text-amber-500 transition-colors flex items-center gap-1">Japanese Whisky <ArrowUpRight className="w-3 h-3"/></a></li>
              <li><a href="#" className="hover:text-amber-500 transition-colors flex items-center gap-1">Rare Releases <ArrowUpRight className="w-3 h-3"/></a></li>
              <li><a href="#" className="hover:text-amber-500 transition-colors flex items-center gap-1">Special Discounts <ArrowUpRight className="w-3 h-3"/></a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-bold mb-6 uppercase text-xs tracking-widest">Customer Care</h3>
            <ul className="space-y-4 text-sm font-medium">
              <li><a href="#" className="hover:text-amber-500 transition-colors">Shipping Policy</a></li>
              <li><a href="#" className="hover:text-amber-500 transition-colors">Track Order</a></li>
              <li><a href="#" className="hover:text-amber-500 transition-colors">Returns & Refunds</a></li>
              <li><a href="#" className="hover:text-amber-500 transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-white font-bold mb-6 uppercase text-xs tracking-widest">Visit Us</h3>
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-amber-600 shrink-0" />
              <p className="text-sm">742 Model Town,<br />kaithal, haryana 136027</p>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-amber-600 shrink-0" />
              <p className="text-sm">+91 74950653047</p>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-amber-600 shrink-0" />
              <p className="text-sm">wikshyhub@gmail.com</p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-gray-500">
            © {currentYear} WhiskyVault Co. All rights reserved. 
          </p>
          <div className="flex items-center gap-4 grayscale opacity-50">
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-4" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-4" />
          </div>
          <p className="text-[10px] text-gray-600 uppercase tracking-widest font-bold">
            Please drink responsibly.
          </p>
        </div>
      </div>
    </footer>
  );
}