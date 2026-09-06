"use client";

import React from "react";
import { CDN_URL } from "../../../utils/constant";
import { RestaurantCardProps } from "../../../types/types";
import { FiStar, FiClock, FiHeart, FiTag } from "react-icons/fi";

const DEFAULT_FOOD_IMAGES = [
  "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=80",
];

const RestaurantCard: React.FC<RestaurantCardProps> = ({
  resData,
  isFavorite = false,
  onToggleFavorite,
}) => {
  if (!resData) return null;

  const {
    id,
    cloudinaryImageId,
    name,
    cuisines,
    costForTwo,
    costForTwoMessage,
    avgRating,
    sla,
    promoted,
    discountHeader,
    discountSubHeader,
    locality,
  } = resData;

  const getImageUrl = () => {
    if (!cloudinaryImageId) {
      const idx = Math.abs(id ? id.charCodeAt(0) : 0) % DEFAULT_FOOD_IMAGES.length;
      return DEFAULT_FOOD_IMAGES[idx];
    }
    if (cloudinaryImageId.startsWith("http")) return cloudinaryImageId;
    if (cloudinaryImageId.length < 10) {
      const idx = parseInt(id || "0", 10) % DEFAULT_FOOD_IMAGES.length;
      return DEFAULT_FOOD_IMAGES[idx];
    }
    return CDN_URL + cloudinaryImageId;
  };

  const imageUrl = getImageUrl();
  const displayCost = costForTwoMessage || costForTwo || "₹300 for two";
  const displayTime = sla?.slaString || `${sla?.deliveryTime || 25} mins`;
  const ratingNum = typeof avgRating === "number" ? avgRating : parseFloat(avgRating || "4.5");

  return (
    <div className="glass-card rounded-2xl overflow-hidden group flex flex-col h-full border border-white/10 relative">
      {/* Top Banner Image */}
      <div className="relative h-44 w-full overflow-hidden bg-slate-900">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            (e.target as HTMLImageElement).src = DEFAULT_FOOD_IMAGES[0];
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

        {/* Promoted Badge */}
        {promoted && (
          <span className="absolute top-3 left-3 bg-amber-500/90 backdrop-blur-md text-slate-950 font-extrabold text-[10px] uppercase px-2.5 py-1 rounded-md tracking-wider shadow-md">
            Featured
          </span>
        )}

        {/* Favorite Button */}
        {onToggleFavorite && (
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onToggleFavorite(id);
            }}
            className="absolute top-3 right-3 p-2 rounded-full bg-slate-950/60 backdrop-blur-md text-slate-200 hover:text-rose-500 transition-colors border border-white/10"
          >
            <FiHeart className={`text-base ${isFavorite ? "fill-rose-500 text-rose-500" : ""}`} />
          </button>
        )}

        {/* Discount Badge Pill */}
        {discountHeader && (
          <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-gradient-to-r from-rose-600 to-amber-600 text-white font-black text-xs px-2.5 py-1 rounded-lg shadow-lg">
            <FiTag className="text-xs" />
            <span>{discountHeader} {discountSubHeader || ""}</span>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <h3 className="font-extrabold text-base text-slate-100 group-hover:text-amber-400 transition-colors line-clamp-1">
            {name}
          </h3>
          <p className="text-xs text-slate-400 mt-1 line-clamp-1">
            {cuisines?.join(" • ")}
          </p>
          {locality && (
            <p className="text-[11px] text-slate-500 mt-0.5">{locality}</p>
          )}
        </div>

        {/* Bottom Details Grid */}
        <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs">
          {/* Rating */}
          <div className={`flex items-center gap-1 font-bold px-2 py-0.5 rounded-md ${
            ratingNum >= 4.5
              ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
              : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
          }`}>
            <FiStar className="text-xs fill-current" />
            <span>{avgRating || "4.5"}</span>
          </div>

          {/* SLA Time */}
          <div className="flex items-center gap-1 text-slate-300 font-medium">
            <FiClock className="text-amber-400 text-xs" />
            <span>{displayTime}</span>
          </div>

          {/* Cost */}
          <div className="text-slate-400 font-semibold text-[11px]">
            {displayCost}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
