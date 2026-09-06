"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FiCheckCircle, FiClock, FiPhone, FiMapPin, FiNavigation, FiArrowRight } from "react-icons/fi";

const STAGES = [
  { id: 1, label: "Order Confirmed", desc: "Received by restaurant kitchen", icon: "📋" },
  { id: 2, label: "Preparing Meal", desc: "Chef is crafting your gourmet order", icon: "👨‍🍳" },
  { id: 3, label: "Out for Delivery", desc: "Driver picked up and en route", icon: "🛵" },
  { id: 4, label: "Arrived & Delivered", desc: "Enjoy your fresh meal!", icon: "🎉" },
];

export const OrderTracker: React.FC = () => {
  const [currentStage, setCurrentStage] = useState<number>(2);
  const [etaMins, setEtaMins] = useState<number>(18);

  // Auto-advance stage every 12 seconds to simulate live delivery progress
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStage((prev) => {
        if (prev < 4) {
          if (prev === 2) setEtaMins(8);
          if (prev === 3) setEtaMins(2);
          return prev + 1;
        }
        return prev;
      });
    }, 12000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Header Status Card */}
      <div className="glass-panel p-8 rounded-3xl border border-white/10 relative overflow-hidden space-y-4">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/30">
              Live Tracker • Order #TB-8942
            </span>
            <h1 className="text-3xl font-black text-white mt-2">Estimated Arrival</h1>
            <p className="text-xs text-slate-400">Delivery address: 402, Sunset Heights, Satellite</p>
          </div>

          <div className="bg-slate-900/90 p-4 rounded-2xl border border-white/10 text-center flex-shrink-0">
            <span className="text-xs text-slate-400 block font-semibold">ETA</span>
            <span className="text-3xl font-black text-gradient-gold">
              {currentStage === 4 ? "0 Mins" : `${etaMins} Mins`}
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="pt-6">
          <div className="grid grid-cols-4 gap-2 relative">
            {STAGES.map((s) => {
              const isCompleted = currentStage >= s.id;
              const isCurrent = currentStage === s.id;

              return (
                <div key={s.id} className="space-y-2 text-center">
                  <div
                    className={`h-2 rounded-full transition-all duration-500 ${
                      isCompleted
                        ? "bg-gradient-to-r from-amber-500 to-emerald-400 shadow-glow-emerald"
                        : "bg-slate-800"
                    }`}
                  />
                  <div className="flex flex-col items-center">
                    <span className="text-2xl mb-1">{s.icon}</span>
                    <span
                      className={`text-xs font-bold ${
                        isCurrent
                          ? "text-amber-400"
                          : isCompleted
                          ? "text-slate-200"
                          : "text-slate-500"
                      }`}
                    >
                      {s.label}
                    </span>
                    <span className="text-[10px] text-slate-400 hidden sm:block">
                      {s.desc}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Simulated Live Driver & Map Panel */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Simulated GPS Map */}
        <div className="md:col-span-8 glass-card rounded-3xl p-6 border border-white/10 relative overflow-hidden h-72 flex flex-col justify-between bg-slate-900/80">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:16px_16px]" />

          <div className="relative z-10 flex justify-between items-center text-xs font-bold text-slate-300">
            <span className="flex items-center gap-1.5 bg-slate-950/80 px-3 py-1.5 rounded-xl border border-white/10">
              <FiNavigation className="text-amber-400 animate-spin-slow" /> GPS Live Radar Active
            </span>
            <span className="bg-slate-950/80 px-3 py-1.5 rounded-xl border border-white/10 text-emerald-400">
              Optimal Route Calculated
            </span>
          </div>

          {/* Animated Route Visual */}
          <div className="relative z-10 my-auto flex items-center justify-between px-8">
            <div className="text-center">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center text-2xl mx-auto shadow-glow-amber">
                🍳
              </div>
              <span className="text-xs font-bold text-slate-200 mt-1 block">Restaurant</span>
            </div>

            <div className="flex-1 mx-4 h-1 bg-slate-800 rounded-full relative overflow-hidden">
              <div
                className="h-full bg-amber-500 transition-all duration-1000"
                style={{ width: `${(currentStage / 4) * 100}%` }}
              />
            </div>

            <div className="text-center">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-2xl mx-auto shadow-glow-emerald">
                🏠
              </div>
              <span className="text-xs font-bold text-slate-200 mt-1 block">Your Home</span>
            </div>
          </div>

          <div className="relative z-10 text-xs text-slate-400 text-center">
            {currentStage === 4
              ? "Driver has arrived at your door!"
              : "Driver is taking S.G. Highway • Live position updating every 5s"}
          </div>
        </div>

        {/* Driver Contact Card */}
        <div className="md:col-span-4 glass-card rounded-3xl p-6 border border-white/10 space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <h3 className="font-extrabold text-white text-base">Delivery Partner</h3>
            <div className="flex items-center gap-3 bg-slate-900/90 p-3 rounded-2xl border border-white/10">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-400 to-orange-500 flex items-center justify-center text-slate-950 font-black text-lg">
                RK
              </div>
              <div>
                <h4 className="font-bold text-slate-100 text-sm">Ramesh Kumar</h4>
                <p className="text-xs text-amber-400 font-semibold">⭐ 4.9 Rating (1.2k+ deliveries)</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <button
              onClick={() => alert("Calling delivery driver Ramesh Kumar (+91 98765 00000)...")}
              className="w-full btn-neon-emerald py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-glow-emerald"
            >
              <FiPhone className="text-sm" /> Call Delivery Driver
            </button>
            <Link
              href="/body"
              className="block w-full text-center py-3 rounded-xl bg-slate-900 text-slate-300 hover:text-white border border-white/10 text-xs font-bold"
            >
              Back to Restaurants
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTracker;
