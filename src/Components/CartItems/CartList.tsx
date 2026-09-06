"use client";

import React from "react";
import { useDispatch } from "react-redux";
import { CDN_URL } from "../../../utils/constant";
import { addItem, decrementItem, removeItem } from "../../../utils/cartSlice";
import { CartItem } from "../../../types/types";
import { FiPlus, FiMinus, FiTrash2 } from "react-icons/fi";

interface CartListProps {
  items: CartItem[];
}

const FALLBACK_CART_IMG = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&auto=format&fit=crop&q=80";

const CartList: React.FC<CartListProps> = ({ items }) => {
  const dispatch = useDispatch();

  return (
    <div className="divide-y divide-white/10">
      {items.map((item) => {
        const itemTotal = item.price * item.quantity;
        const imgUrl = item.imageId
          ? item.imageId.startsWith("http")
            ? item.imageId
            : CDN_URL + item.imageId
          : FALLBACK_CART_IMG;

        return (
          <div
            key={item.id}
            className="py-4 flex items-center justify-between gap-4 text-left"
          >
            {/* Thumbnail */}
            <div className="w-16 h-16 rounded-xl bg-slate-900 overflow-hidden flex-shrink-0 border border-white/10">
              <img
                src={imgUrl}
                alt={item.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = FALLBACK_CART_IMG;
                }}
              />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0 space-y-1">
              <h4 className="font-extrabold text-slate-100 text-sm truncate">{item.name}</h4>
              <p className="text-[11px] text-slate-400 truncate">
                {item.restaurantName || "TastyBites Restaurant"}
              </p>
              {item.customizationNotes && (
                <p className="text-[10px] text-amber-400 font-semibold">{item.customizationNotes}</p>
              )}
              <div className="text-xs font-bold text-amber-400">₹{item.price} each</div>
            </div>

            {/* Quantity Controls & Delete */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-slate-900 border border-white/10 px-2 py-1 rounded-xl">
                <button
                  onClick={() => dispatch(decrementItem(item.id))}
                  className="p-1 text-amber-400 hover:text-white"
                >
                  <FiMinus className="text-xs" />
                </button>
                <span className="font-bold text-slate-100 text-xs min-w-[16px] text-center">
                  {item.quantity}
                </span>
                <button
                  onClick={() =>
                    dispatch(
                      addItem({
                        item,
                      })
                    )
                  }
                  className="p-1 text-amber-400 hover:text-white"
                >
                  <FiPlus className="text-xs" />
                </button>
              </div>

              <span className="font-extrabold text-white text-sm min-w-[50px] text-right">
                ₹{itemTotal}
              </span>

              <button
                onClick={() => dispatch(removeItem(item.id))}
                className="p-2 text-slate-500 hover:text-rose-400 rounded-lg transition-colors"
                title="Remove item"
              >
                <FiTrash2 className="text-base" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CartList;
