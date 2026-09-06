"use client";

import React, { useState, useContext, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import useOnlineStatus from "../../../utils/useOnlineStatus";
import UserContext from "../../../utils/UserContext";
import { useSelector } from "react-redux";
import { RootState } from "../../../types/types";
import {
  FiShoppingBag,
  FiUser,
  FiLogOut,
  FiMenu,
  FiX,
  FiZap,
  FiHome,
  FiCompass,
  FiGrid,
  FiInfo,
  FiPhone,
  FiHeart,
  FiClock,
  FiChevronDown,
  FiShield,
} from "react-icons/fi";

export const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);

  const onlineStatus = useOnlineStatus();
  const { loggedInUser, userProfile, logoutUser } = useContext(UserContext);
  const cartItems = useSelector((store: RootState) => store.cart.items);
  const router = useRouter();
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleLogout = () => {
    logoutUser();
    setIsProfileOpen(false);
    router.push("/");
  };

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = [
    { name: "Home", href: "/", icon: FiHome },
    { name: "Explore", href: "/body", icon: FiCompass },
    { name: "Custom Bowl", href: "/custom-builder", icon: FiGrid },
    { name: "About", href: "/about", icon: FiInfo },
    { name: "Contact", href: "/contact", icon: FiPhone },
  ];

  const userInitials = (userProfile?.name || loggedInUser || "User")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/body" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center text-slate-950 font-black text-xl shadow-glow-amber group-hover:scale-105 transition-transform">
              TB
            </div>
            <div>
              <span className="text-2xl font-extrabold text-white tracking-tight">
                Tasty<span className="text-amber-500">Bites</span>
              </span>
              <div className="flex items-center gap-1.5 text-[10px] text-amber-400 font-semibold uppercase tracking-wider">
                <FiZap className="text-xs" /> AI Gourmet
              </div>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? "bg-amber-500/10 text-amber-400 border border-amber-500/30"
                      : "text-slate-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon className="text-base" />
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Actions & Profile Dropdown */}
          <div className="hidden md:flex items-center gap-4">
            {/* Online Status Pill */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-white/10 text-xs text-slate-300">
              <span
                className={`w-2 h-2 rounded-full ${
                  onlineStatus ? "bg-emerald-400 animate-pulse" : "bg-rose-500"
                }`}
              />
              <span>{onlineStatus ? "Live" : "Offline"}</span>
            </div>

            {/* Cart Button */}
            <Link
              href="/cart"
              className="relative p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-white/10 text-slate-200 transition-colors flex items-center gap-2 group"
            >
              <FiShoppingBag className="text-xl group-hover:text-amber-400 transition-colors" />
              {totalCartCount > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-amber-500 text-slate-950 font-black text-xs shadow-glow-amber animate-bounce">
                  {totalCartCount}
                </span>
              )}
            </Link>

            {/* User Profile / Auth State */}
            {loggedInUser ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2.5 bg-slate-900/90 hover:bg-slate-800 pl-2 pr-3 py-1.5 rounded-2xl border border-white/10 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 to-purple-600 flex items-center justify-center text-slate-950 font-black text-xs shadow-glow-amber">
                    {userInitials}
                  </div>
                  <div className="text-left leading-none hidden lg:block">
                    <span className="text-xs font-bold text-slate-100 block">
                      {userProfile?.name || loggedInUser}
                    </span>
                    <span className="text-[10px] text-amber-400 font-semibold">
                      VIP Member
                    </span>
                  </div>
                  <FiChevronDown className="text-slate-400 text-xs" />
                </button>

                {/* Dropdown Menu Panel */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-64 glass-panel rounded-2xl shadow-glass-lg border border-white/15 p-2 space-y-1 z-50 animate-float">
                    <div className="p-3 bg-slate-950/70 rounded-xl border border-white/5 space-y-1">
                      <p className="text-xs font-extrabold text-white">
                        {userProfile?.name || loggedInUser}
                      </p>
                      <p className="text-[11px] text-slate-400 truncate">
                        {userProfile?.email || "adit@tastybites.com"}
                      </p>
                      <div className="flex items-center gap-1.5 pt-1">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-400 border border-amber-500/30">
                          {userProfile?.dietPreference || "All Diets"}
                        </span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-purple-500/20 text-purple-400">
                          Verified User
                        </span>
                      </div>
                    </div>

                    <Link
                      href="/body"
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-200 hover:bg-amber-500/10 hover:text-amber-400 transition-colors"
                    >
                      <FiHeart className="text-amber-400" /> Saved Favorite Spots
                    </Link>

                    <Link
                      href="/order-tracker"
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-200 hover:bg-amber-500/10 hover:text-amber-400 transition-colors"
                    >
                      <FiClock className="text-amber-400" /> Active Order Tracker
                    </Link>

                    <div className="pt-1 border-t border-white/10">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-rose-400 hover:bg-rose-500/10 transition-colors"
                      >
                        <FiLogOut /> Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="btn-neon-amber px-5 py-2.5 text-xs font-extrabold rounded-xl shadow-glow-amber flex items-center gap-1.5"
              >
                <FiUser className="text-sm" /> Sign In / Register
              </Link>
            )}
          </div>

          {/* Mobile Navigation Toggle Button */}
          <div className="flex md:hidden items-center gap-3">
            <Link href="/cart" className="relative p-2 text-slate-200">
              <FiShoppingBag className="text-2xl" />
              {totalCartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-amber-500 text-slate-950 text-xs font-black flex items-center justify-center">
                  {totalCartCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-slate-200 hover:text-amber-400 rounded-lg"
            >
              {isMobileMenuOpen ? <FiX className="text-2xl" /> : <FiMenu className="text-2xl" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden glass-panel border-t border-white/10 p-4 space-y-3 animate-float">
          <div className="flex items-center justify-between px-3 py-2 bg-slate-900 rounded-xl mb-2">
            <span className="text-xs text-slate-400">Status</span>
            <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              {onlineStatus ? "Online" : "Offline"}
            </span>
          </div>

          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-200 hover:bg-amber-500/10 hover:text-amber-400 text-sm font-semibold transition-colors"
              >
                <Icon className="text-lg" />
                {link.name}
              </Link>
            );
          })}

          {loggedInUser ? (
            <div className="pt-2 border-t border-white/10 flex items-center justify-between px-2">
              <span className="text-xs text-slate-300 font-bold">
                Logged in as {userProfile?.name || loggedInUser}
              </span>
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 text-xs bg-rose-500/20 text-rose-400 font-bold rounded-lg border border-rose-500/30"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-center btn-neon-amber py-3 rounded-xl text-sm font-bold mt-2"
            >
              Sign In / Register
            </Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
