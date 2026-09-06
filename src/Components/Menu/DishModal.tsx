"use client";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../../../utils/cartSlice";
import { MenuItemInfo } from "../../../types/types";
import { CDN_URL } from "../../../utils/constant";
import { FiX, FiShoppingBag, FiInfo, FiZap, FiCheck } from "react-icons/fi";

const FALLBACK_DISH_IMG = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80";

interface DishModalProps {
  info: MenuItemInfo;
  restaurantName?: string;
  onClose: () => void;
}

export const DishModal: React.FC<DishModalProps> = ({ info, restaurantName, onClose }) => {
  const dispatch = useDispatch();
  const [spiceChoice, setSpiceChoice] = useState<string>("Medium");
  const [extraCheese, setExtraCheese] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(1);
  const [added, setAdded] = useState<boolean>(false);

  const basePrice = (info.price || info.defaultPrice || 19900) / 100;
  const totalPrice = (basePrice + (extraCheese ? 40 : 0)) * quantity;

  const handleAdd = () => {
    const customNotes = `Spice: ${spiceChoice}${extraCheese ? " • Extra Cheese" : ""}`;
    for (let i = 0; i < quantity; i++) {
      dispatch(
        addItem({
          item: {
            id: `${info.id}-${extraCheese ? 'cheese' : 'standard'}`,
            name: `${info.name}${extraCheese ? " (Extra Cheese)" : ""}`,
            price: basePrice + (extraCheese ? 40 : 0),
            description: info.description,
            imageId: info.imageId,
            quantity: 1,
            isVeg: info.isVeg ?? true,
            restaurantName: restaurantName || "TastyBites Bistro",
            customizationNotes: customNotes,
          },
          restaurantName,
        })
      );
    }
    setAdded(true);
    setTimeout(() => {
      onClose();
    }, 800);
  };

  const imgUrl = info.imageId
    ? info.imageId.startsWith("http")
      ? info.imageId
      : CDN_URL + info.imageId
    : FALLBACK_DISH_IMG;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-float">
      <div className="glass-card w-full max-w-lg rounded-3xl overflow-hidden border border-white/20 shadow-glass-lg relative flex flex-col max-h-[90vh]">
        {/* Header Image */}
        <div className="relative h-56 w-full bg-slate-900">
          <img
            src={imgUrl}
            alt={info.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = FALLBACK_DISH_IMG;
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/40" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-slate-950/70 text-slate-200 hover:text-white border border-white/10"
          >
            <FiX className="text-xl" />
          </button>

          {/* Veg / Non-Veg Badge */}
          <div className="absolute bottom-4 left-4 flex items-center gap-2">
            <span
              className={`px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                info.isVeg ?? true
                  ? "bg-emerald-500/90 text-slate-950"
                  : "bg-rose-500/90 text-white"
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  info.isVeg ?? true ? "bg-slate-950" : "bg-white"
                }`}
              />
              {info.isVeg ?? true ? "100% Pure Veg" : "Non-Veg"}
            </span>
          </div>
        </div>

        {/* Dish Content Body */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          <div>
            <h3 className="text-xl font-extrabold text-white">{info.name}</h3>
            <p className="text-amber-400 font-black text-lg mt-1">₹{basePrice}</p>
            {info.description && (
              <p className="text-xs text-slate-300 leading-relaxed mt-2">{info.description}</p>
            )}
          </div>

          {/* Nutrition Info Pills */}
          <div className="flex items-center gap-4 text-xs text-slate-400 bg-slate-900/60 p-3 rounded-2xl border border-white/5">
            <span className="flex items-center gap-1 font-semibold">
              <FiZap className="text-amber-400" /> ~{info.calories || 340} Cal
            </span>
            <span className="flex items-center gap-1 font-semibold">
              <FiInfo className="text-purple-400" /> High Quality Ingredients
            </span>
          </div>

          {/* Customization Options */}
          <div className="space-y-3 pt-2 border-t border-white/10">
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
              Spice Level Preference
            </h4>
            <div className="grid grid-cols-3 gap-2">
              {["Mild 🌿", "Medium 🌶️", "Fiery 🌶️🔥"].map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setSpiceChoice(lvl)}
                  className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                    spiceChoice === lvl
                      ? "bg-amber-500/20 text-amber-400 border-amber-500"
                      : "bg-slate-900 text-slate-400 border-white/5 hover:border-white/20"
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>

            {/* Add-ons */}
            <div className="pt-3">
              <label className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-white/10 cursor-pointer hover:border-amber-500/40">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={extraCheese}
                    onChange={(e) => setExtraCheese(e.target.checked)}
                    className="w-4 h-4 accent-amber-500 rounded"
                  />
                  <span className="text-xs font-bold text-slate-200">Extra Mozzarella Cheese</span>
                </div>
                <span className="text-xs font-bold text-amber-400">+₹40</span>
              </label>
            </div>
          </div>
        </div>

        {/* Bottom Footer Actions */}
        <div className="p-4 bg-slate-950 border-t border-white/10 flex items-center justify-between gap-4">
          {/* Quantity Controls */}
          <div className="flex items-center gap-3 bg-slate-900 border border-white/10 rounded-xl px-3 py-1.5">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="text-amber-400 font-black text-lg px-1 hover:scale-125 transition-transform"
            >
              -
            </button>
            <span className="font-extrabold text-sm text-slate-100 min-w-[20px] text-center">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="text-amber-400 font-black text-lg px-1 hover:scale-125 transition-transform"
            >
              +
            </button>
          </div>

          {/* Add Button */}
          <button
            onClick={handleAdd}
            disabled={added}
            className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
              added
                ? "bg-emerald-500 text-slate-950"
                : "btn-neon-amber shadow-glow-amber"
            }`}
          >
            {added ? (
              <>
                <FiCheck className="text-base" /> Added to Order!
              </>
            ) : (
              <>
                <FiShoppingBag className="text-base" /> Add to Order • ₹{totalPrice}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DishModal;
