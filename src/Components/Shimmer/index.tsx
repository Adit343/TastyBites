import React from "react";

const Shimmer: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="glass-card rounded-2xl p-4 space-y-4 animate-pulse border border-white/10"
        >
          <div className="h-44 bg-slate-900/80 rounded-xl w-full" />
          <div className="space-y-2">
            <div className="h-5 bg-slate-800/80 rounded-lg w-3/4" />
            <div className="h-3 bg-slate-800/60 rounded-md w-1/2" />
          </div>
          <div className="pt-2 border-t border-white/5 flex items-center justify-between">
            <div className="h-4 bg-slate-800/80 rounded w-16" />
            <div className="h-4 bg-slate-800/80 rounded w-16" />
            <div className="h-4 bg-slate-800/80 rounded w-20" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Shimmer;
