"use client";

import React from "react";
import { useDispatch } from "react-redux";
import { CDN_URL } from "../../../utils/constant";
import { removeItem } from "../../../utils/cartSlice";
import { ItemListProps, MenuItemCard } from "../../../types/types";

const CartList: React.FC<ItemListProps> = ({ items }) => {
  const dispatch = useDispatch();

  const handleRemoveItem = (_item: MenuItemCard) => {
    dispatch(removeItem());
  };

  return (
    <div>
      {items.map((item, idx) => (
        <div
          key={item.card.info.id + "-" + idx}
          className="p-2 m-2 border-gray-200 border-b-2 shadow-lg flex flex-col md:flex-row justify-between text-left"
        >
          <div className="md:w-9/12">
            <div className="py-2 font-bold">
              <span>{item.card.info.name}</span>
              <span>
                {" "} - ₹
                {(item.card.info.price || 0) / 100 || (item.card.info.defaultPrice || 0) / 100}
              </span>
            </div>
            <p className="text-xs text-gray-600">{item.card.info.description}</p>
          </div>
          <div className="md:w-3/12 p-4 flex flex-col items-center">
            {item.card.info.imageId && (
              <img
                src={CDN_URL + item.card.info.imageId}
                alt={item.card.info.name}
                className="w-full h-auto mb-2 md:mb-0 rounded"
              />
            )}
            <button
              className="p-1 rounded-lg bg-black text-white shadow-lg mt-2 md:mt-0 hover:bg-gray-800"
              onClick={() => handleRemoveItem(item)}
            >
              Remove -
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartList;
