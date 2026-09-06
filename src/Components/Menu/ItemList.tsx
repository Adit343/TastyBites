"use client";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CDN_URL } from "../../../utils/constant";
import { addItem, decrementItem } from "../../../utils/cartSlice";
import { ItemListProps, MenuItemCard, RootState } from "../../../types/types";
import DishModal from "./DishModal";
import { FiPlus, FiMinus, FiStar, FiEye } from "react-icons/fi";

const FALLBACK_MENU_IMG = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&auto=format&fit=crop&q=80";

const ItemList: React.FC<ItemListProps> = ({ items, restaurantName }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((store: RootState) => store.cart.items);
  const [selectedDish, setSelectedDish] = useState<any>(null);

  const getItemQuantity = (id: string) => {
    const found = cartItems.find((item) => item.id === id);
    return found ? found.quantity : 0;
  };

  return (
    <div className="divide-y divide-white/10">
      {items.map((item, idx) => {
        const info = item.card.info;
        const price = (info.price || info.defaultPrice || 19900) / 100;
        const qty = getItemQuantity(info.id);

        const imgUrl = info.imageId
          ? info.imageId.startsWith("http")
            ? info.imageId
            : CDN_URL + info.imageId
          : FALLBACK_MENU_IMG;

        return (
          <div
            key={(info.id || idx) + "-" + idx}
            className="py-5 flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center hover:bg-white/[0.02] p-3 rounded-2xl transition-colors"
          >
            {/* Dish Description */}
            <div className="flex-1 space-y-1.5 pr-2">
              <div className="flex items-center gap-2">
                {/* Veg / Non-Veg Marker */}
                <span
                  className={`w-3.5 h-3.5 rounded border flex items-center justify-center p-0.5 ${
                    info.isVeg ?? true
                      ? "border-emerald-500 text-emerald-500"
                      : "border-rose-500 text-rose-500"
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      info.isVeg ?? true ? "bg-emerald-500" : "bg-rose-500"
                    }`}
                  />
                </span>

                <h4 className="font-extrabold text-slate-100 text-base">{info.name}</h4>
              </div>

              <div className="flex items-center gap-3 text-xs">
                <span className="font-extrabold text-amber-400 text-sm">₹{price}</span>
                {info.rating && (
                  <span className="flex items-center gap-1 text-amber-400 font-bold bg-amber-500/10 px-2 py-0.5 rounded">
                    <FiStar className="text-xs fill-current" /> {info.rating}
                  </span>
                )}
              </div>

              {info.description && (
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {info.description}
                </p>
              )}

              {/* Detail view trigger button */}
              <button
                onClick={() => setSelectedDish(info)}
                className="text-[11px] font-bold text-amber-400 hover:underline flex items-center gap-1 mt-1"
              >
                <FiEye className="text-xs" /> Customize & Details
              </button>
            </div>

            {/* Dish Image & Add Button Box */}
            <div className="relative w-full sm:w-32 h-28 flex-shrink-0 bg-slate-900 rounded-xl overflow-hidden border border-white/10 group">
              <img
                src={imgUrl}
                alt={info.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = FALLBACK_MENU_IMG;
                }}
              />

              {/* Add / Quantity Control Button Floating */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 shadow-lg">
                {qty === 0 ? (
                  <button
                    onClick={() =>
                      dispatch(
                        addItem({
                          item: {
                            id: info.id,
                            name: info.name,
                            price,
                            description: info.description,
                            imageId: info.imageId,
                            quantity: 1,
                            isVeg: info.isVeg ?? true,
                            restaurantName: restaurantName || "TastyBites Bistro",
                          },
                          restaurantName,
                        })
                      )
                    }
                    className="px-4 py-1.5 rounded-lg bg-amber-500 text-slate-950 font-black text-xs hover:bg-amber-400 shadow-glow-amber transition-all flex items-center gap-1"
                  >
                    <FiPlus className="text-sm" /> ADD
                  </button>
                ) : (
                  <div className="flex items-center gap-2 bg-slate-950/90 border border-amber-500 text-amber-400 px-2 py-1 rounded-lg">
                    <button
                      onClick={() => dispatch(decrementItem(info.id))}
                      className="p-0.5 hover:text-white"
                    >
                      <FiMinus className="text-xs" />
                    </button>
                    <span className="text-xs font-black text-slate-100 min-w-[14px] text-center">
                      {qty}
                    </span>
                    <button
                      onClick={() =>
                        dispatch(
                          addItem({
                            item: {
                              id: info.id,
                              name: info.name,
                              price,
                              description: info.description,
                              imageId: info.imageId,
                              quantity: 1,
                              isVeg: info.isVeg ?? true,
                              restaurantName: restaurantName || "TastyBites Bistro",
                            },
                            restaurantName,
                          })
                        )
                      }
                      className="p-0.5 hover:text-white"
                    >
                      <FiPlus className="text-xs" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}

      {/* Dish Customization Modal */}
      {selectedDish && (
        <DishModal
          info={selectedDish}
          restaurantName={restaurantName}
          onClose={() => setSelectedDish(null)}
        />
      )}
    </div>
  );
};

export default ItemList;
