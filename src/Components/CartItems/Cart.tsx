"use client";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, applyPromoCode } from "../../../utils/cartSlice";
import CartList from "./CartList";
import { RootState } from "../../../types/types";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  FiShoppingBag,
  FiTrash2,
  FiTag,
  FiCheck,
  FiArrowRight,
  FiZap,
  FiHeart,
} from "react-icons/fi";

const Cart: React.FC = () => {
  const cartItems = useSelector((store: RootState) => store.cart.items);
  const discountCode = useSelector((store: RootState) => store.cart.discountCode);
  const discountAmount = useSelector((store: RootState) => store.cart.discountAmount);

  const dispatch = useDispatch();
  const router = useRouter();

  const [inputCode, setInputCode] = useState<string>("");
  const [tip, setTip] = useState<number>(30);
  const [promoMessage, setPromoMessage] = useState<string>("");

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  let calculatedDiscount = 0;
  if (discountAmount && discountAmount < 1) {
    calculatedDiscount = Math.round(subtotal * discountAmount);
  } else if (discountAmount && discountAmount >= 1) {
    calculatedDiscount = discountAmount;
  }

  const deliveryFee = subtotal > 0 ? (subtotal > 500 ? 0 : 35) : 0;
  const taxes = subtotal > 0 ? Math.round(subtotal * 0.05) : 0;
  const grandTotal = Math.max(0, subtotal + calculatedDiscount + deliveryFee + taxes + tip);

  const handleApplyCode = () => {
    if (!inputCode.trim()) return;
    dispatch(applyPromoCode(inputCode));
    if (inputCode.trim().toUpperCase() === "TASTY20" || inputCode.trim().toUpperCase() === "AICHEF") {
      setPromoMessage("🎉 Promo code applied successfully!");
    } else {
      setPromoMessage("❌ Invalid promo code. Try TASTY20 or AICHEF.");
    }
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    dispatch(clearCart());
    router.push("/order-tracker");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <div className="glass-panel p-8 rounded-3xl border border-white/10 relative overflow-hidden space-y-2">
        <div className="absolute top-0 right-0 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black text-white flex items-center gap-3">
              <FiShoppingBag className="text-amber-400" /> Shopping Cart
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Review your items, apply vouchers, and place your order
            </p>
          </div>

          {cartItems.length > 0 && (
            <button
              onClick={() => dispatch(clearCart())}
              className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-rose-500/20 text-slate-300 hover:text-rose-400 text-xs font-bold border border-white/10 flex items-center gap-1.5 transition-colors"
            >
              <FiTrash2 className="text-xs" /> Clear Cart
            </button>
          )}
        </div>
      </div>

      {cartItems.length === 0 ? (
        <div className="glass-card p-12 text-center rounded-3xl space-y-4 max-w-md mx-auto">
          <div className="w-16 h-16 rounded-full bg-slate-900 flex items-center justify-center mx-auto text-3xl text-amber-400">
            🛒
          </div>
          <h3 className="text-xl font-bold text-slate-100">Your Cart is Empty</h3>
          <p className="text-xs text-slate-400">
            Looks like you haven't added any delicious gourmet dishes yet.
          </p>
          <Link
            href="/body"
            className="btn-neon-amber inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold"
          >
            <span>Explore Menu</span>
            <FiArrowRight />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Items List */}
          <div className="lg:col-span-7 glass-card p-6 rounded-3xl border border-white/10 space-y-6">
            <h3 className="font-extrabold text-base text-slate-100 border-b border-white/10 pb-3">
              Order Items ({cartItems.length})
            </h3>
            <CartList items={cartItems} />
          </div>

          {/* Checkout & Bill Breakdown Sidebar */}
          <div className="lg:col-span-5 space-y-6">
            {/* Promo Voucher Box */}
            <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-3">
              <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                <FiTag className="text-amber-400 text-sm" /> Apply Promo Code
              </h4>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Try TASTY20 or AICHEF"
                  className="glass-input px-3.5 py-2 rounded-xl text-xs flex-1 uppercase"
                  value={inputCode}
                  onChange={(e) => setInputCode(e.target.value)}
                />
                <button
                  onClick={handleApplyCode}
                  className="px-4 py-2 bg-amber-500 text-slate-950 rounded-xl text-xs font-bold hover:bg-amber-400 transition-colors"
                >
                  Apply
                </button>
              </div>
              {promoMessage && (
                <p className="text-xs font-semibold text-amber-400">{promoMessage}</p>
              )}
            </div>

            {/* Delivery Tip Box */}
            <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-3">
              <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                <FiHeart className="text-rose-400 text-sm" /> Add Delivery Tip
              </h4>
              <div className="flex gap-2">
                {[20, 30, 50, 100].map((amount) => (
                  <button
                    key={amount}
                    onClick={() => setTip(amount)}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all ${
                      tip === amount
                        ? "bg-amber-500/20 text-amber-400 border-amber-500"
                        : "bg-slate-900 text-slate-400 border-white/5 hover:border-white/20"
                    }`}
                  >
                    ₹{amount}
                  </button>
                ))}
              </div>
            </div>

            {/* Bill Summary Card */}
            <div className="glass-card p-6 rounded-3xl border border-white/20 space-y-4">
              <h3 className="font-extrabold text-base text-slate-100 border-b border-white/10 pb-3">
                Bill Summary
              </h3>

              <div className="space-y-2.5 text-xs text-slate-300">
                <div className="flex justify-between">
                  <span>Item Subtotal</span>
                  <span className="font-bold text-slate-100">₹{subtotal}</span>
                </div>

                {calculatedDiscount > 0 && (
                  <div className="flex justify-between text-emerald-400 font-bold">
                    <span>Discount ({discountCode})</span>
                    <span>-₹{calculatedDiscount}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Delivery Fee {deliveryFee === 0 && "(FREE)"}</span>
                  <span className="font-bold text-slate-100">
                    {deliveryFee === 0 ? "₹0" : `₹${deliveryFee}`}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Taxes & Restaurant Charges (5%)</span>
                  <span className="font-bold text-slate-100">₹{taxes}</span>
                </div>

                <div className="flex justify-between">
                  <span>Driver Tip</span>
                  <span className="font-bold text-slate-100">₹{tip}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 flex justify-between items-center text-lg font-black text-white">
                <span>Grand Total</span>
                <span className="text-amber-400 text-xl">₹{grandTotal}</span>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full btn-neon-amber py-3.5 rounded-2xl text-xs font-extrabold flex items-center justify-center gap-2 shadow-glow-amber cursor-pointer"
              >
                <span>Place Order & Track Delivery</span>
                <FiArrowRight className="text-base" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
