"use client";

import React from "react";
import ItemList from "./ItemList";
import { RestaurantCategoryProps } from "../../../types/types";
import { FiChevronDown } from "react-icons/fi";

const RestaurantCategory: React.FC<RestaurantCategoryProps> = ({
  data,
  showItems,
  setShowIndex,
  restaurantName,
}) => {
  const itemCount = data.itemCards?.length || 0;

  return (
    <div className="w-full glass-card rounded-2xl p-5 border border-white/10 overflow-hidden transition-all">
      <div
        className="flex items-center justify-between cursor-pointer select-none"
        onClick={setShowIndex}
      >
        <h3 className="font-extrabold text-base sm:text-lg text-slate-100 flex items-center gap-2">
          <span>{data.title}</span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-slate-900 text-amber-400 font-bold border border-white/10">
            {itemCount}
          </span>
        </h3>
        <div
          className={`p-2 rounded-full bg-slate-900 border border-white/10 text-amber-400 transition-transform duration-300 ${
            showItems ? "rotate-180 bg-amber-500/20" : ""
          }`}
        >
          <FiChevronDown className="text-lg" />
        </div>
      </div>

      {showItems && (
        <div className="mt-4 pt-4 border-t border-white/10">
          <ItemList items={data.itemCards || []} restaurantName={restaurantName} />
        </div>
      )}
    </div>
  );
};

export default RestaurantCategory;
