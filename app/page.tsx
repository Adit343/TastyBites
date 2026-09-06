"use client";

import React from "react";
import Link from "next/link";
import Body from "../src/Components/Body";
import { FiZap, FiGrid, FiCalendar, FiArrowRight, FiCheckCircle } from "react-icons/fi";

export default function Home() {
  return (
    <div className="space-y-12 pb-12">
      {/* Hero Showcase Section */}
      <section className="relative glass-panel rounded-3xl p-8 sm:p-12 border border-white/10 overflow-hidden">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold">
              <FiZap className="text-sm" /> Powered by Gemini AI Sommelier
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
              Gourmet Flavors <br />
              <span className="text-gradient-gold">Curated by AI</span>
            </h1>

            <p className="text-slate-300 text-base leading-relaxed max-w-xl">
              Experience the future of dining. Personalized food pairings, custom ingredient meal builders, live simulated delivery tracking, and VIP table bookings.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/body"
                className="btn-neon-amber px-6 py-3.5 rounded-2xl text-sm font-bold flex items-center gap-2"
              >
                <span>Browse Restaurants</span>
                <FiArrowRight className="text-base" />
              </Link>
              <Link
                href="/custom-builder"
                className="px-6 py-3.5 rounded-2xl bg-slate-900/90 text-slate-200 hover:text-white border border-white/10 hover:border-amber-500/40 text-sm font-bold flex items-center gap-2 transition-all"
              >
                <FiGrid className="text-amber-400 text-base" />
                <span>Build Custom Bowl</span>
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center gap-6 pt-4 text-xs text-slate-400 font-semibold border-t border-white/10">
              <span className="flex items-center gap-1.5">
                <FiCheckCircle className="text-emerald-400 text-sm" /> 20 Min Average SLA
              </span>
              <span className="flex items-center gap-1.5">
                <FiCheckCircle className="text-emerald-400 text-sm" /> 100% Verified Kitchens
              </span>
              <span className="flex items-center gap-1.5">
                <FiCheckCircle className="text-emerald-400 text-sm" /> 4.9★ Rated Dishes
              </span>
            </div>
          </div>

          {/* Hero Feature Visual Cards */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            <div className="glass-card p-5 rounded-2xl border border-amber-500/30 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center text-xl">
                  👨‍🍳
                </div>
                <div>
                  <h4 className="font-bold text-slate-100 text-sm">TastyAI Sommelier</h4>
                  <p className="text-[11px] text-slate-400">Ask for pairings & keto/protein advice</p>
                </div>
              </div>
              <p className="text-xs text-slate-300 bg-slate-950/70 p-3 rounded-xl border border-white/5 italic">
                "Pair my Cheese Burst Pizza with a sparkling mojito under ₹400..."
              </p>
            </div>

            <div className="glass-card p-5 rounded-2xl border border-purple-500/30 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center text-xl">
                  🥗
                </div>
                <div>
                  <h4 className="font-bold text-slate-100 text-sm">Build Your Own Meal</h4>
                  <p className="text-[11px] text-slate-400">Customize base, proteins, sauces & crunch</p>
                </div>
              </div>
              <Link
                href="/custom-builder"
                className="block text-center text-xs font-bold text-amber-400 hover:underline"
              >
                Launch Builder Studio →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Restaurant Discovery Feed */}
      <section>
        <Body />
      </section>
    </div>
  );
}
