"use client";

import React from "react";
import { FiZap, FiCheckCircle, FiCpu, FiGlobe, FiUsers, FiAward } from "react-icons/fi";

const About: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-12">
      {/* Header Banner */}
      <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-white/10 relative overflow-hidden space-y-4">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-bold border border-amber-500/30">
          <FiZap className="text-xs" /> Re-engineering Food Discovery
        </div>

        <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
          About <span className="text-gradient-gold">TastyBites</span>
        </h1>
        <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
          TastyBites is a next-generation food platform built with Next.js 15, React 19, and Gemini AI. We bridge culinary passion with cutting-edge artificial intelligence to offer hyper-personalized dish recommendations, custom meal builders, and real-time delivery tracking.
        </p>
      </div>

      {/* Stats Counter Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { icon: FiGlobe, title: "10,000+", subtitle: "Gourmet Orders" },
          { icon: FiUsers, title: "98%", subtitle: "Satisfied Foodies" },
          { icon: FiAward, title: "4.9 ★", subtitle: "Average Dish Rating" },
          { icon: FiCpu, title: "<20 Mins", subtitle: "Average Delivery SLA" },
        ].map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="glass-card p-5 rounded-2xl border border-white/10 text-center space-y-1">
              <Icon className="text-2xl text-amber-400 mx-auto mb-2" />
              <h3 className="text-xl font-black text-white">{stat.title}</h3>
              <p className="text-xs text-slate-400 font-medium">{stat.subtitle}</p>
            </div>
          );
        })}
      </div>

      {/* Tech Stack Breakdown */}
      <div className="glass-card p-8 rounded-3xl border border-white/10 space-y-6">
        <h2 className="text-2xl font-black text-white border-b border-white/10 pb-4 flex items-center gap-2">
          <FiCpu className="text-amber-400" /> Platform Architecture & Stack
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <h3 className="font-bold text-amber-400 text-sm">Frontend Framework</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Built on <strong>Next.js 15 App Router</strong> and <strong>React 19</strong>, leveraging serverless API routes, optimized static rendering, and Redux Toolkit state persistence.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-bold text-amber-400 text-sm">Gemini AI Integration</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Powered by Google Gemini 2.5 Flash API for natural language culinary Sommelier recommendations, wine pairings, and dietary meal structuring.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-bold text-amber-400 text-sm">Glassmorphism Aesthetic</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Cyber-Gourmet theme crafted with Tailwind CSS, backdrop-blur filters, ambient neon glowing accents, and smooth micro-interactions.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-bold text-amber-400 text-sm">Mobile First Engineering</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Fully optimized touch interfaces, responsive navigation drawers, floating AI widgets, and seamless single-hand navigation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
