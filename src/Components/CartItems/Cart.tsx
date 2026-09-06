"use client";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../../../utils/cartSlice";
import CartList from "./CartList";
import { RootState } from "../../../types/types";

const Cart: React.FC = () => {
  const cartItems = useSelector((store: RootState) => store.cart.items);
  const dispatch = useDispatch();

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="text-center m-4 p-4">
      <h1 className="text-2xl font-bold">Cart</h1>
      <div className="w-6/12 m-auto">
        <button
          className="p-2 m-2 bg-black text-white rounded-lg hover:bg-gray-800"
          onClick={handleClearCart}
        >
          Clear Cart
        </button>
        <CartList items={cartItems} />
        {cartItems.length === 0 && (
          <h1 className="my-4 text-lg">Cart is empty, Add items to the cart!</h1>
        )}
      </div>
    </div>
  );
};

export default Cart;
