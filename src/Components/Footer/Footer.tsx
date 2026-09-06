"use client";

import React from "react";
import Link from "next/link";
import { FiHeart, FiZap, FiSend } from "react-icons/fi";

export const Footer: React.FC = () => {
  return (
    <footer className="mt-20 border-t border-white/10 bg-slate-950/80 backdrop-blur-xl text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand Col */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black tracking-tight text-white">
              Tasty<span className="text-amber-500">Bites</span>
            </span>
            <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center gap-1">
              <FiZap className="text-xs" /> AI Powered
            </span>
          </div>
          <p className="text-xs leading-relaxed text-slate-400">
            Next-generation gourmet food ordering experience powered by Gemini AI. Speed, flavor, and elegance delivered straight to your door.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-bold text-slate-100 mb-4 tracking-wide uppercase text-xs">Explore</h4>
          <ul className="space-y-2.5 text-xs">
            <li>
              <Link href="/body" className="hover:text-amber-400 transition-colors">
                Browse Restaurants
              </Link>
            </li>
            <li>
              <Link href="/custom-builder" className="hover:text-amber-400 transition-colors">
                Build Your Bowl
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-amber-400 transition-colors">
                About TastyBites
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-amber-400 transition-colors">
                Contact & Support
              </Link>
            </li>
          </ul>
        </div>

        {/* Operating & Tech */}
        <div>
          <h4 className="font-bold text-slate-100 mb-4 tracking-wide uppercase text-xs">Built With</h4>
          <div className="flex flex-wrap gap-2 text-[11px]">
            <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-white/10 text-slate-300">
              Next.js 15
            </span>
            <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-white/10 text-slate-300">
              React 19
            </span>
            <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-amber-500/30 text-amber-400">
              Gemini AI
            </span>
            <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-white/10 text-slate-300">
              Redux Toolkit
            </span>
            <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-white/10 text-slate-300">
              Tailwind CSS
            </span>
          </div>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="font-bold text-slate-100 mb-4 tracking-wide uppercase text-xs">Stay Hungry</h4>
          <p className="text-xs text-slate-400 mb-3">
            Subscribe for exclusive AI meal deals and promo codes.
          </p>
          <div className="flex items-center gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="glass-input px-3 py-2 text-xs rounded-lg w-full"
            />
            <button className="p-2.5 bg-amber-500 text-slate-950 rounded-lg hover:bg-amber-400 transition-colors font-bold">
              <FiSend className="text-sm" />
            </button>
          </div>
        </div>
      </div>

      <div className="border-t border-white/5 py-6 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between max-w-7xl mx-auto px-6">
        <p>© 2026 TastyBites Inc. All rights reserved.</p>
        <p className="flex items-center gap-1 mt-2 sm:mt-0">
          Crafted with <FiHeart className="text-red-500 fill-red-500" /> for Food Lovers
        </p>
      </div>
    </footer>
  );
};

export default Footer;
