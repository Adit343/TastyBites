"use client";

import React from "react";
import ItemList from "./ItemList";
import { RestaurantCategoryProps } from "../../../types/types";

const RestaurantCategory: React.FC<RestaurantCategoryProps> = ({
  data,
  showItems,
  setShowIndex,
}) => {
  const handleClick = () => {
    setShowIndex();
  };

  return (
    <div className="w-full sm:w-6/12 mx-auto my-6 bg-gray-50 shadow-lg p-4 rounded-lg">
      <div
        className="flex justify-between cursor-pointer"
        onClick={handleClick}
      >
        <span className="font-bold text-lg">
          {data.title} ({data.itemCards?.length || 0})
        </span>
        <span>🔽</span>
      </div>
      {showItems && <ItemList items={data.itemCards || []} />}
    </div>
  );
};

export default RestaurantCategory;
