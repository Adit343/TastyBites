import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartState, CartItem, MenuItemCard } from "../types/types";

const initialState: CartState = {
  items: [],
  discountCode: undefined,
  discountAmount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<{ item: MenuItemCard | CartItem; restaurantName?: string }>) => {
      const payload = action.payload;
      let newItem: CartItem;

      if ('card' in payload.item) {
        const info = payload.item.card.info;
        const price = (info.price || info.defaultPrice || 0) / 100;
        newItem = {
          id: info.id,
          name: info.name,
          price,
          description: info.description,
          imageId: info.imageId,
          quantity: 1,
          isVeg: info.isVeg ?? true,
          restaurantName: payload.restaurantName || "TastyBites Restaurant",
        };
      } else {
        newItem = payload.item;
      }

      const existingIndex = state.items.findIndex(i => i.id === newItem.id);
      if (existingIndex >= 0) {
        state.items[existingIndex].quantity += 1;
      } else {
        state.items.push(newItem);
      }
    },
    decrementItem: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const existingIndex = state.items.findIndex(i => i.id === id);
      if (existingIndex >= 0) {
        if (state.items[existingIndex].quantity > 1) {
          state.items[existingIndex].quantity -= 1;
        } else {
          state.items.splice(existingIndex, 1);
        }
      }
    },
    removeItem: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      state.items = state.items.filter(item => item.id !== id);
    },
    applyPromoCode: (state, action: PayloadAction<string>) => {
      const code = action.payload.trim().toUpperCase();
      if (code === "TASTY20") {
        state.discountCode = "TASTY20 (20% OFF)";
        state.discountAmount = 0.20;
      } else if (code === "AICHEF") {
        state.discountCode = "AICHEF (₹100 FLAT OFF)";
        state.discountAmount = 100; // Flat discount marker
      } else {
        state.discountCode = undefined;
        state.discountAmount = 0;
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.discountCode = undefined;
      state.discountAmount = 0;
    },
  },
});

export const { addItem, decrementItem, removeItem, applyPromoCode, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

